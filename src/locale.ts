export interface Locale {
    appName: string;
}

let defaultLocale: Locale = {
    appName: "Friendly",
};

export function getLocale(): Locale {
    // todo: later migrate this to signal
    return defaultLocale
}
