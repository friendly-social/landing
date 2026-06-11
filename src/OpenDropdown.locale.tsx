import type { LocaleCode } from "./index.locale.ts";

export interface Locale {
    open: string;
    openInApp: string;
    openInWeb: string;
    download: string;
}

const enLocale: Locale = {
    open: "Open in...",
    openInApp: "Open in App",
    openInWeb: "Open in Browser",
    download: "Download",
};

const ruLocale: Locale = {
    open: "Открыть в...",
    openInApp: "Открыть в приложении",
    download: "Скачать",
    openInWeb: "Открыть в браузере",
};

const beLocale: Locale = {
    open: "Адкрыць у...",
    openInApp: "Адкрыць у праграме",
    download: "Спампаваць",
    openInWeb: "Вэб-версія",
};

const ukLocale: Locale = {
    open: "Відкрити в...",
    openInApp: "Відкрити в застосунку",
    download: "Завантажити",
    openInWeb: "Вебверсія",
};

export function getLocale(code: LocaleCode): Locale {
    switch (code) {
        case "en":
            return enLocale;
        case "ru":
            return ruLocale;
        case "be":
            return beLocale;
        case "uk":
            return ukLocale;
        default:
            assert(code);
    }
}

function assert(code: never): never {
    throw new Error(`Unknown locale ${code}`);
}
