import "./App.css";
import searchX from "/search-x-accent.svg";
import sparkles from "/sparkles-accent.svg";
import noCreeps from "/no-creeps-accent.svg";
import confidential from "/confidential-accent.svg";
import appIconBanner from "/app-icon-banner.svg";
import construction from "/construction-primary.svg";
import iphone1 from "/iphone-1.png";
import network from "/network.svg";
import iphone2 from "/iphone-2.png";
import appleAccent from "/apple-accent.svg";
import androidAccent from "/android-accent.svg";
import webAccent from "/web-accent.svg";
import { Phone } from "./Phone.tsx";
import type { JSXElement } from "solid-js";

export function App(): JSXElement {
    return (
        <div class="surface">
            <Toolbar />
            <Content />
        </div>
    );
}

function Toolbar(): JSXElement {
    return (
        <div class="toolbar-container">
            <div class="toolbar">
                <a class="icon" href="#">
                    <img src={appIconBanner} alt="Friendly Icon" />
                </a>
                {/* <div class="flex"> */}
                {/*     <button class="accent">Open in app...</button> */}
                {/* </div> */}
            </div>
        </div>
    );
}

function Content(): JSXElement {
    return (
        <div class="content">
            <div class="h-[64px]" />
            <div class="section-spacer" />
            <img class="network" src={network} />
            <div class="section-spacer" />
            <WhatIsFriendly />
            <div class="section-spacer" />
            <div class="section-spacer" />
            <Platforms />
            <hr class="prefooter" />
            <Footer />
        </div>
    );
}

function WhatIsFriendly(): JSXElement {
    return (
        <div class="what-is-friendly">
            <h1 class="title-centered">What is Friendly?</h1>
            <p>
                They say you are connected to anyone with 6 degrees of
                separation. But instead of chasing the entire world, why not to
                focus on expanding the network you already have? Friendly is a
                private social network built on real connections.
            </p>
            <div class="section-spacer" />
            <div class="friendly-chip-grid">
                <NoGlobalSearch />
                <NoCreeps />
                <NaturalFit />
                <Confidential />
            </div>
        </div>
    );
}

function NoGlobalSearch(): JSXElement {
    return (
        <div class="chip">
            <img src={searchX} />
            <h2>No global search</h2>
            <p>
                No AI slope, no fake reactions, no popularity. Find people
                through real connections, not by searching for strangers.
            </p>
        </div>
    );
}

function NoCreeps(): JSXElement {
    return (
        <div class="chip">
            <img src={noCreeps} />
            <h2>No creeps</h2>
            <p>
                Only people connected through mutual friends can reach you. No
                random messages, no unsolicited attention.
            </p>
        </div>
    );
}

function NaturalFit(): JSXElement {
    return (
        <div class="chip">
            <img src={sparkles} />
            <h2>Natural fit</h2>
            <p>
                Shared connections create a natural context, so conversations
                start easier and feel more genuine.
            </p>
        </div>
    );
}

function Confidential(): JSXElement {
    return (
        <div class="chip">
            <img src={confidential} />
            <h2>Confidential</h2>
            <p>
                Your profile is only visible to people that are close to you,
                staying inside your trusted network.
            </p>
        </div>
    );
}

function Platforms(): JSXElement {
    return (
        <div class="platform-grid-container">
            <h1 class="title-centered">How to use?</h1>
            <div class="platform-grid">
                <Android />
                <Ios />
                <Web />
            </div>
        </div>
    );
}

function Android(): JSXElement {
    return (
        <div class="platform">
            <div class="platform-demos">
                <Phone class="phone-1">
                    <img src={iphone1} />
                </Phone>
                <Phone class="phone-2">
                    <img src={iphone2} />
                </Phone>
            </div>
            <a
                class="platform-label"
                href="https://github.com/friendly-social/android"
                target="_blank"
            >
                <img src={androidAccent} />
                <p>
                    Friendly for <b>Android</b>
                </p>
            </a>
        </div>
    );
}

function Ios(): JSXElement {
    return (
        <div class="platform">
            <div class="platform-demos">
                <Phone class="phone-1">
                    <img src={iphone1} />
                </Phone>
                <Phone class="phone-2">
                    <img src={iphone2} />
                </Phone>
            </div>
            <a
                class="platform-label"
                href="https://github.com/friendly-social/ios"
                target="_blank"
            >
                <img src={appleAccent} />
                <p>
                    Friendly for <b>iOS</b>
                </p>
            </a>
        </div>
    );
}

function Web(): JSXElement {
    return (
        <div class="platform">
            <div class="platform-demos">
                <Phone class="phone-1">
                    <img src={iphone1} />
                </Phone>
                <Phone class="tablet">
                    <img src={iphone2} />
                </Phone>
            </div>
            <a
                class="platform-label"
                href="https://github.com/friendly-social/web"
                target="_blank"
            >
                <img class="p-[3px]" src={webAccent} />
                <p>
                    Friendly for <b>Web</b>
                </p>
            </a>
        </div>
    );
}

function Footer(): JSXElement {
    const github = "https://github.com/friendly-social";

    return <div class="footer">
        <img src={construction} />
        <p>This project is under construction.</p>
        <p>GitHub: <b><a href={github}>friendly-social</a></b></p>
    </div>
}
