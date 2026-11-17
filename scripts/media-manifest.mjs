// Собирает список медиафайлов из папки public и записывает его в src/generated/media.json.
// Запускается автоматически перед `npm run dev` и `npm run build` (в том числе на Vercel).
//
//  • public/main-page.(png|jpg|jpeg|webp)   — главное фото первого экрана
//  • public/main-page2.(mp4|webm|mov)       — видео (можно положить и .mp4, и .webm)
//  • public/main-page2-poster.(jpg|png|webp) — необязательная обложка видео
//  • public/gallery/*                       — фотографии галереи
//    Если папка gallery пуста, в галерею попадают фотографии из корня public
//    (кроме главного фото, обложки видео и служебных картинок).
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pub = path.join(root, "public");
const IMAGE = /\.(jpe?g|png|webp)$/i;
const HERO = /^main-page\.(jpe?g|png|webp)$/i;
const POSTER = /^main-page2-poster\.(jpe?g|png|webp)$/i;
const VIDEO = /^main-page2\.(mp4|webm|mov)$/i;
const SERVICE = /^(favicon|icon|apple-icon|logo|og|opengraph|twitter|placeholder|vercel|next|file|globe|window)([-_.].*)?\.[a-z]+$/i;

/** Размеры PNG / WebP / JPEG без сторонних зависимостей (с учётом EXIF-поворота). */
function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    let rotated = false;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      const len = buf.readUInt16BE(offset + 2);
      if (marker === 0xe1 && buf.toString("ascii", offset + 4, offset + 8) === "Exif") {
        rotated = exifRotated(buf, offset + 10);
      }
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        return rotated ? { width: height, height: width } : { width, height };
      }
      offset += 2 + len;
    }
  }
  return null;
}

function exifRotated(buf, tiff) {
  try {
    const le = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let i = 0; i < count; i++) {
      const entry = ifd + 2 + i * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8) >= 5;
    }
  } catch {
    /* повреждённый EXIF — считаем, что поворота нет */
  }
  return false;
}

/** URL с корректным кодированием пробелов и нестандартных символов. */
const toSrc = (dir, name) => "/" + [dir, name].filter(Boolean).map(encodeURIComponent).join("/");

async function files(dir) {
  try {
    return (await readdir(path.join(pub, dir))).filter((f) => !f.startsWith("."));
  } catch {
    return [];
  }
}

async function describe(dir, name) {
  const size = imageSize(await readFile(path.join(pub, dir, name))) ?? { width: 1600, height: 1200 };
  return { name, src: toSrc(dir, name), ...size };
}

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
const rootFiles = (await files("")).sort(byName);
const galleryFiles = (await files("gallery")).sort(byName);

const heroName = rootFiles.find((f) => HERO.test(f));
const hero = heroName ? await describe("", heroName) : null;

const posterName = rootFiles.find((f) => POSTER.test(f));
const videoSources = rootFiles
  .filter((f) => VIDEO.test(f))
  // webm первым (легче), затем mp4 (Safari), затем mov
  .sort((a, b) => ["webm", "mp4", "mov"].indexOf(a.split(".").pop().toLowerCase()) - ["webm", "mp4", "mov"].indexOf(b.split(".").pop().toLowerCase()))
  .map((f) => {
    const ext = f.split(".").pop().toLowerCase();
    return { src: toSrc("", f), type: ext === "mov" ? "video/quicktime" : `video/${ext}` };
  });
const video = videoSources.length ? { sources: videoSources, poster: posterName ? toSrc("", posterName) : null } : null;

const fromGallery = galleryFiles.filter((f) => IMAGE.test(f) && !HERO.test(f) && !POSTER.test(f));
const gallery = fromGallery.length
  ? await Promise.all(fromGallery.map((f) => describe("gallery", f)))
  : await Promise.all(
      rootFiles
        .filter((f) => IMAGE.test(f) && !HERO.test(f) && !POSTER.test(f) && !SERVICE.test(f) && !/^main-page2\./i.test(f))
        .map((f) => describe("", f)),
    );

await mkdir(path.join(root, "src", "generated"), { recursive: true });
await writeFile(
  path.join(root, "src", "generated", "media.json"),
  JSON.stringify({ hero, video, gallery }, null, 2) + "\n",
);

console.log(
  `[media] главное фото: ${hero?.src ?? "—"} · видео: ${video ? video.sources.map((s) => s.src).join(", ") : "—"} · галерея: ${gallery.length} фото`,
);
