export type LocaleCode = "en" | "ru";

export function getLocaleCode(): LocaleCode {
    for (const language of navigator.languages) {
        const locale = new Intl.Locale(language);
        switch (locale.language) {
            // In case if english is present and it's priority is higher
            case "en":
                return "en"
            case "az": // Azerbaijani
            case "kk": // Kazakh
            case "tg": // Tajik
            case "ky": // Kyrgyz
            case "be": // Belarusian
            case "uk": // Ukrainian
            case "ru": // Russian
                return "ru";
        }
    }
    return "en";
}
