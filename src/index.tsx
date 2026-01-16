/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import { App } from "./App.tsx";
import { updateClassList } from "./dark-mode.ts";

updateClassList();

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element was not found");
}

render(() => <App />, root);
