import { createEffect, createSignal } from "solid-js";

export type Theme = "light" | "dark";

export function useTheme(): () => Theme {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const [theme, setTheme] = createSignal<Theme>(
        darkQuery.matches ? "dark" : "light",
    );

    createEffect(() => {
        const listener: () => void = () => {
            setTheme(darkQuery.matches ? "dark" : "light");
        };
        darkQuery.addEventListener("change", listener);
        return (): void => darkQuery.removeEventListener("change", listener);
    });

    return theme;
}
