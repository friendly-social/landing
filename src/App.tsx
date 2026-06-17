import "./App.css";
import { getLocaleCode } from "./index.locale.ts";
import type { Locale } from "./App.locale.tsx";
import { getLocale } from "./App.locale.tsx";
import searchX from "/search-x-accent.svg";
import sparkles from "/sparkles-accent.svg";
import noCreeps from "/no-creeps-accent.svg";
import confidential from "/confidential-accent.svg";
import appIconBanner from "/app-icon-banner.svg";
import construction from "/construction-primary.svg";
import iphone1 from "/iphone-1.png";
import network from "/network.svg";
import iphone2 from "/iphone-2.png";
import web1 from "/web-1.png";
import web2 from "/web-2.png";
import android1 from "/android-1.png";
import android2 from "/android-2.png";
import appleAccent from "/apple-accent.svg";
import androidAccent from "/android-accent.svg";
import webAccent from "/web-accent.svg";
import { Phone } from "./Phone.tsx";
import type { SearchParams } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";
import type { JSXElement } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { OpenDropdown } from "./OpenDropdown.tsx";

export function App(): JSXElement {
    const localeCode = getLocaleCode();
    const locale = getLocale(localeCode);
    const [platforms, setPlatforms] = createSignal<HTMLElement | undefined>();

    const [search] = useSearchParams();
    createEffect(() => {
        startRedirect({ search });
    });

    return (
        <div class="surface">
            <Toolbar platforms={platforms()} locale={locale} search={search} />
            <Content locale={locale} setPlatforms={setPlatforms} />
        </div>
    );
}

interface StartRedirectParams {
    search: SearchParams;
}

function startRedirect(params: StartRedirectParams): void {
    const reference = params.search.reference;
    if (!reference) return;
    const url = `friendly://${reference}`;
    const href = window.location.href;
    window.location.href = url;
    setTimeout(() => {
        window.location.href = href;
    }, 100);
}

interface ToolbarProps {
    platforms: HTMLElement | undefined;
    search: SearchParams;
    locale: Locale;
}

function Toolbar(props: ToolbarProps): JSXElement {
    const locale = (): Locale => props.locale;
    const hasReference = (): boolean => props.search.reference != null;
    return (
        <div class="toolbar-container">
            <div class="toolbar">
                <img class="icon" src={appIconBanner} alt={locale().iconAlt} />
                <div class="buttons">
                    <OpenDropdown
                        hasRedirect={hasReference()}
                        platforms={props.platforms}
                        deeplink={(search) => startRedirect({ search })}
                    />
                </div>
            </div>
        </div>
    );
}

interface ContentProps {
    setPlatforms: (element: HTMLElement) => void;
    locale: Locale;
}

function Content(props: ContentProps): JSXElement {
    return (
        <div class="content">
            <div class="h-[64px]" />
            <div class="section-spacer" />
            <img class="network" src={network} />
            <div class="section-spacer" />
            <WhatIsFriendly locale={props.locale} />
            <div class="section-spacer" />
            <div class="section-spacer" />
            <Platforms
                locale={props.locale}
                setPlatforms={props.setPlatforms}
            />
            <hr class="prefooter" />
            <Footer locale={props.locale} />
        </div>
    );
}

interface WhatIsFriendlyProps {
    locale: Locale;
}

function WhatIsFriendly(props: WhatIsFriendlyProps): JSXElement {
    const locale = (): Locale => props.locale;
    return (
        <div class="what-is-friendly">
            <h1 class="title-centered">{locale().whatIsFriendly.title}</h1>
            <p>{locale().whatIsFriendly.body}</p>
            <div class="section-spacer" />
            <div class="friendly-chip-grid">
                <NoGlobalSearch locale={props.locale} />
                <NoCreeps locale={props.locale} />
                <NaturalFit locale={props.locale} />
                <Confidential locale={props.locale} />
            </div>
        </div>
    );
}

interface NoGlobalSearchProps {
    locale: Locale;
}

function NoGlobalSearch(props: NoGlobalSearchProps): JSXElement {
    return (
        <div class="chip">
            <img src={searchX} />
            <h2>{props.locale.noGlobalSearch.title}</h2>
            <p>{props.locale.noGlobalSearch.body}</p>
        </div>
    );
}

interface NoCreepsProps {
    locale: Locale;
}

function NoCreeps(props: NoCreepsProps): JSXElement {
    return (
        <div class="chip">
            <img src={noCreeps} />
            <h2>{props.locale.noCreeps.title}</h2>
            <p>{props.locale.noCreeps.body}</p>
        </div>
    );
}

interface NaturalFitProps {
    locale: Locale;
}

function NaturalFit(props: NaturalFitProps): JSXElement {
    return (
        <div class="chip">
            <img src={sparkles} />
            <h2>{props.locale.naturalFit.title}</h2>
            <p>{props.locale.naturalFit.body}</p>
        </div>
    );
}

interface ConfidentialProps {
    locale: Locale;
}

function Confidential(props: ConfidentialProps): JSXElement {
    return (
        <div class="chip">
            <img src={confidential} />
            <h2>{props.locale.confidential.title}</h2>
            <p>{props.locale.confidential.body}</p>
        </div>
    );
}

interface PlatformsProps {
    setPlatforms: (element: HTMLElement) => void;
    locale: Locale;
}

function Platforms(props: PlatformsProps): JSXElement {
    return (
        <div ref={props.setPlatforms} class="platform-grid-container">
            <h1 class="title-centered">{props.locale.platforms.title}</h1>
            <div class="platform-grid">
                <Android locale={props.locale} />
                <Ios locale={props.locale} />
                <Web locale={props.locale} />
            </div>
        </div>
    );
}

interface AndroidProps {
    locale: Locale;
}

function Android(props: AndroidProps): JSXElement {
    return (
        <a
            class="platform"
            href="https://github.com/friendly-social/android/releases/download/nightly/friendly-latest.apk"
            target="_blank"
        >
            <div class="platform-demos">
                <Phone class="phone-1">
                    <img src={android1} />
                </Phone>
                <Phone class="phone-2">
                    <img src={android2} />
                </Phone>
            </div>
            <div class="platform-label">
                <img src={androidAccent} />
                <p>{props.locale.platforms.forAndroid}</p>
            </div>
        </a>
    );
}

interface IosProps {
    locale: Locale;
}

function Ios(props: IosProps): JSXElement {
    return (
        <a
            class="platform"
            href="https://testflight.apple.com/join/vevpjcZ8"
            target="_blank"
        >
            <div class="platform-demos">
                <Phone class="phone-1">
                    <img src={iphone1} />
                </Phone>
                <Phone class="phone-2">
                    <img src={iphone2} />
                </Phone>
            </div>
            <div class="platform-label">
                <img src={appleAccent} />
                <p>{props.locale.platforms.forIos}</p>
            </div>
        </a>
    );
}

interface WebProps {
    locale: Locale;
}

function Web(props: WebProps): JSXElement {
    return (
        <a class="platform" href="https://web.getfriend.ly" target="_blank">
            <div class="platform-demos">
                <div class="tablet">
                    <img src={web2} />
                </div>
                <Phone class="tablet-phone">
                    <img src={web1} />
                </Phone>
            </div>
            <div class="platform-label">
                <img class="p-[3px]" src={webAccent} />
                <p>{props.locale.platforms.forWeb}</p>
            </div>
        </a>
    );
}

interface FooterProps {
    locale: Locale;
}

function Footer(props: FooterProps): JSXElement {
    const github = "https://github.com/friendly-social";

    return (
        <div class="footer">
            <img src={construction} />
            <p>{props.locale.footer.underConstruction}</p>
            <p>
                GitHub:{" "}
                <b>
                    <a href={github}>friendly-social</a>
                </b>
            </p>
        </div>
    );
}
