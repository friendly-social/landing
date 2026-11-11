import * as solid from "solid-js";

export function create(query: string): solid.Accessor<boolean> {
    const mediaQueryList = window.matchMedia(query);
    const [matches, setMatches] = solid.createSignal(mediaQueryList.matches);

    solid.createEffect(() => {
        const handler = (event: MediaQueryListEvent): void => {
            setMatches(event.matches);
        };
        mediaQueryList.addEventListener("change", handler);
        solid.onCleanup(() => {
            mediaQueryList.removeEventListener("change", handler);
        });
    });

    return matches;
}
