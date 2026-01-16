import "./App.css";
import appIcon from "/app-icon.svg";
import appIconDark from "/app-icon-dark.svg";
import darkMode from "/dark-mode.svg";
import lightMode from "/light-mode.svg";
import type { JSXElement } from "solid-js";
import { isDarkMode } from "./dark-mode.ts";
import { IconButton } from "./IconButton.tsx";

export function App(): JSXElement {
    return (
        <>
        <div class="surface">
            <Toolbar />
            {/* <h1 class="text-3xl font-fold underling text-accent"> */}
            {/*     Friendly */}
            {/* </h1> */}
        </div>
        </>
    );
}

function Toolbar(): JSXElement {
    const appIconThemed = isDarkMode()
        ? appIconDark
        : appIcon;
    const switchTheme = isDarkMode()
        ? lightMode
        : darkMode;
    return <div class="toolbar">
        <div class="flex align-middle">
            <img class="rounded-xl" src={appIconThemed} alt="Friendly Icon"/>
            <h1 class="px-5 text-primary">Friendly</h1>
        </div>
        <div class="flex">
        <IconButton src={switchTheme} onclick={() => {}}/>
        </div>
    </div>
}
