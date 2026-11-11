/* @refresh reload */
import { render } from "solid-js/web";
import { HashRouter, Route } from "@solidjs/router";
import "./index.css";
import { App } from "./App.tsx";
import { Invite } from "./invite.tsx";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element was not found");
}

render(
    () => (
        <HashRouter>
            <Route path="/" component={App} />
            <Route path="/invite/:token" component={Invite} />
        </HashRouter>
    ),
    root,
);
