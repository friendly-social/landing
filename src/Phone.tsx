import "./Phone.css";
import type { JSXElement } from "solid-js";

interface PhoneProps {
    children: JSXElement;
    class: string;
}

export function Phone(props: PhoneProps): JSXElement {
    return (
        <div class={props.class}>
            <div class="phone">{props.children}</div>
        </div>
    );
}
