export type LocaleCode = "en" | "ru";

export function getLocaleCode(): LocaleCode {
    const locale = new Intl.Locale(navigator.language);
    switch (locale.language) {
        case "en":
            return "en";
        case "ru":
            return "ru";
        default:
            return "en";
    }
}
