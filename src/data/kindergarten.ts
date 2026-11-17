/**
 * Реальные данные мини-центра NG-CENTER.
 * Меняйте значения здесь — они используются во всех разделах сайта.
 */
export const kindergarten = {
  legalName: "ТОО мини-центр «NG-CENTER»",
  name: "NG-CENTER",
  phoneDisplay: "+7 701 708 81 82",
  phoneHref: "tel:+77017088182",
  whatsappNumber: "77017088182",
  hours: "08:00–19:00",
  ageRange: "1–6",
  groupsCount: 2,
  mealsPerDay: 5,
  /** Ссылка на Instagram. Пока не предоставлена — кнопка не показывается. */
  instagram: null as string | null,
  address: {
    kk: "Алматы қаласы, Наурызбай ауданы, Қалқаман-2 шағынауданы, Мұсабаев көшесі, 24",
    ru: "г. Алматы, Наурызбайский район, мкр. Калкаман-2, ул. Мусабаева, 24",
  },
  addressShort: {
    kk: "Алматы, Наурызбай ауданы, Қалқаман-2, Мұсабаев к-сі, 24",
    ru: "Алматы, Наурызбайский р-н, Калкаман-2, ул. Мусабаева, 24",
  },
  /**
   * Точные координаты не предоставлены, поэтому 2GIS открывается поиском по адресу.
   * Когда появится проверенная ссылка на организацию в 2GIS — вставьте её сюда.
   */
  twoGisUrl: null as string | null,
  twoGisQuery: "Калкаман-2, улица Мусабаева, 24",
} as const;

export type Lang = "kk" | "ru";

export const whatsappMessage: Record<Lang, string> = {
  kk: "Сәлеметсіз бе! NG-CENTER шағын орталығы туралы ақпарат алғым келеді.",
  ru: "Здравствуйте! Хотел(а) бы узнать подробнее о мини-центре NG-CENTER.",
};

export const whatsappUrl = (lang: Lang) =>
  `https://wa.me/${kindergarten.whatsappNumber}?text=${encodeURIComponent(whatsappMessage[lang])}`;

export const twoGisUrl = () =>
  kindergarten.twoGisUrl ??
  `https://2gis.kz/almaty/search/${encodeURIComponent(kindergarten.twoGisQuery)}`;

export const sections = [
  "home",
  "about",
  "nutrition",
  "gallery",
  "documents",
  "contacts",
] as const;
export type SectionId = (typeof sections)[number];
