/**
 * Документы мини-центра.
 *
 * Как добавить документ:
 *  • PDF-файл положите в public/documents/ и укажите url: "/documents/имя-файла.pdf", type: "pdf";
 *  • ссылку на Google Drive, Cloud Mail.ru или другой сервис укажите целиком, type: "link".
 *
 * Пример:
 *  {
 *    id: "charter",
 *    titleKz: "Жарғы",
 *    titleRu: "Устав",
 *    url: "/documents/charter.pdf",
 *    type: "pdf",
 *  },
 */
export type KindergartenDocument = {
  id: string;
  titleKz: string;
  titleRu: string;
  url: string;
  type: "pdf" | "link";
};

export const documents: KindergartenDocument[] = [];
