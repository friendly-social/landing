import type { JSXElement } from "solid-js";

interface IconButtonProps {
    src: string;
    onclick: () => void;
}

export function IconButton({src, onclick}: IconButtonProps): JSXElement {
    return <button onclick={onclick}><img src={src}/></button>
}
