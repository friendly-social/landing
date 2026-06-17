import "./OpenDropdown.css";
import type { JSXElement } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { getLocale } from "./OpenDropdown.locale.tsx";
import { getLocaleCode } from "./index.locale.ts";
import type { SearchParams } from "@solidjs/router";

export interface OpenDropdownProps {
    hasRedirect: boolean;
    platforms: HTMLElement | undefined;
    deeplink: (search: SearchParams) => void;
}

export function OpenDropdown(props: OpenDropdownProps): JSXElement {
    const [open, setOpen] = createSignal(false);
    const locale = getLocale(getLocaleCode());
    const [search] = useSearchParams();

    let ref!: HTMLDivElement;

    createEffect(() => {
        const handleOutsideClick = (e: Event): void => {
            if (!ref.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return (): void =>
            document.removeEventListener("mousedown", handleOutsideClick);
    });

    function onDownloadClick(): void {
        setOpen(false);
        props.platforms?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    function onWebClick(): void {
        if (search.reference) {
            const reference = encodeURIComponent(search.reference as string);
            window.location.href = `https://web.getfriend.ly/redirect/${reference}`;
            return;
        }
        window.location.href = "https://web.getfriend.ly";
    }

    return (
        <div class="open-dropdown" ref={ref}>
            <button onClick={() => setOpen(!open())}>{locale.open}</button>
            <ul style={{ display: open() ? "block" : "none" }}>
                <li>
                    <button onClick={onWebClick}>
                        <img src="web-accent.svg" /> <p>{locale.openInWeb} </p>
                    </button>
                </li>
                <li>
                    {props.hasRedirect && (
                        <button onClick={() => props.deeplink(search)}>
                            <img src="external-link-accent.svg" />{" "}
                            <p>{locale.openInApp} </p>
                        </button>
                    )}
                </li>
                <li>
                    <button onClick={onDownloadClick}>
                        <img src="download-accent.svg" />{" "}
                        <p>{locale.download} </p>
                    </button>
                </li>
            </ul>
        </div>
    );
}
