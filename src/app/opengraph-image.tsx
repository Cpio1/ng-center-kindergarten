import { ImageResponse } from "next/og";

export const alt = "NG-CENTER";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Брендовая обложка для соцсетей (без фото — до появления реальных материалов).
export default function OpengraphImage() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 90px",
        background:
          "linear-gradient(160deg, #bfe9fb 0%, #e3f5fd 40%, #fff4dc 80%, #fff9ef 100%)",
        color: "#25364a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: -3,
          }}
        >
          NG<span style={{ color: "#d9533e" }}>-</span>CENTER
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 44,
            fontWeight: 700,
            color: "#55657a",
          }}
        >
          Almaty · 1–6
        </div>
        <div style={{ display: "flex", marginTop: 36, gap: 16 }}>
          {["#ffc94a", "#83d5f5", "#ff8b78", "#a7dfc2", "#c8b6f4"].map((c) => (
            <div
              key={c}
              style={{ width: 44, height: 44, borderRadius: 22, background: c }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          width: 300,
          height: 300,
          display: "flex",
        }}
      >
        {rays.map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              left: 138,
              top: 0,
              width: 24,
              height: 60,
              borderRadius: 12,
              background: "#ffc94a",
              transformOrigin: "12px 150px",
              transform: `rotate(${r}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 60,
            width: 180,
            height: 180,
            borderRadius: 90,
            background: "#ffc94a",
          }}
        />
      </div>
    </div>,
    size,
  );
}
