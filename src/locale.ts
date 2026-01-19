export interface Locale {
    appName: string;
}

const defaultLocale: Locale = {
    appName: "Friendly",
};

export function getLocale(): Locale {
    // todo: later migrate this to signal
    return defaultLocale;
}
