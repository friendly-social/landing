/* @refresh reload */
import { render } from "solid-js/web";
import { HashRouter } from "@solidjs/router";
import "./index.css";
import { App } from "./App.tsx";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element was not found");
}

render(() => <HashRouter root={App} />, root);
