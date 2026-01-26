export type LocaleCode = "en" | "ru" | "be" | "uk";

export function getLocaleCode(): LocaleCode {
    for (const language of navigator.languages) {
        const locale = new Intl.Locale(language);
        switch (locale.language) {
            // In case if english is present and it's priority is higher
            case "en":
                return "en";
            case "az": // Azerbaijani
            case "kk": // Kazakh
            case "tg": // Tajik
            case "ky": // Kyrgyz
            case "ru": // Russian
                return "ru";
            case "be":
                return "be";
            case "uk":
                return "uk";
        }
    }
    return "en";
}
