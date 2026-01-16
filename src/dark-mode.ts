const document = window.document.documentElement;

export function isDarkMode(): boolean {
    if (localStorage.theme === "dark") return true;
    if ("theme" in localStorage) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function updateClassList(): void {
    document.classList.toggle("dark", isDarkMode());
}

export function setLightTheme(): void {
    localStorage.theme = "light";
    updateClassList();
}

export function setDarkTheme(): void {
    localStorage.theme = "dark";
    updateClassList();
}
