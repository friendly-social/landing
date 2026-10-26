import "./App.css";
import { getLocaleCode } from "./index.locale.ts";
import type { Locale } from "./App.locale.tsx";
import { getLocale } from "./App.locale.tsx";
import searchX from "/search-x-accent.svg";
import searchXDark from "/search-x-accent-dark.svg";
import sparkles from "/sparkles-accent.svg";
import sparklesDark from "/sparkles-accent-dark.svg";
import noCreeps from "/no-creeps-accent.svg";
import noCreepsDark from "/no-creeps-accent-dark.svg";
import confidential from "/confidential-accent.svg";
import confidentialDark from "/confidential-accent-dark.svg";
import appIconBanner from "/app-icon-banner.svg";
import appIconBannerDark from "/app-icon-banner-dark.svg";
import constructionBlack from "/construction-black.svg";
import constructionWhite from "/construction-white.svg";
import network from "/network.svg";
import networkDark from "/network-dark.svg";
import web1 from "/web-1.png";
import web1Dark from "/web-1-dark.png";
import web2 from "/web-2.png";
import web2Dark from "/web-2-dark.png";
import webAccent from "/web-accent.svg";
import webAccentDark from "/web-accent-dark.svg";
import { Phone } from "./Phone.tsx";
import type { SearchParams } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";
import type { JSXElement } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { OpenDropdown } from "./OpenDropdown.tsx";
import { useTheme } from "./theme.ts";

export function App(): JSXElement {
    const localeCode = getLocaleCode();
    const locale = getLocale(localeCode);
    const [platforms, setPlatforms] = createSignal<HTMLElement | undefined>();

    const [search] = useSearchParams();
    createEffect(() => {
        onWebClick({ search });
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

function onWebClick(params: StartRedirectParams): void {
    const search = params.search;
    if (search.reference) {
        const reference = encodeURIComponent(search.reference as string);
        window.location.href = `https://web.getfriend.ly/redirect/${reference}`;
        return;
    }
}
// function startRedirect(params: StartRedirectParams): void {
//     const reference = params.search.reference;
//     if (!reference) return;
//     const url = `friendly://${reference}`;
//     const href = window.location.href;
//     window.location.href = url;
//     setTimeout(() => {
//         window.location.href = href;
//     }, 100);
// }

interface ToolbarProps {
    platforms: HTMLElement | undefined;
    search: SearchParams;
    locale: Locale;
}

function Toolbar(props: ToolbarProps): JSXElement {
    const locale = (): Locale => props.locale;
    const theme = useTheme();
    // const hasReference = (): boolean => props.search.reference != null;
    return (
        <div class="toolbar-container">
            <div class="toolbar">
                {theme() === "light" ? (
                    <img
                        class="icon"
                        src={appIconBanner}
                        alt={locale().iconAlt}
                    />
                ) : (
                    <img
                        class="icon"
                        src={appIconBannerDark}
                        alt={locale().iconAlt}
                    />
                )}
                <div class="buttons">
                    <OpenDropdown />
                    {/* hasRedirect={hasReference()} */}
                    {/* platforms={props.platforms} */}
                    {/* deeplink={(search) => startRedirect({ search })} */}
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
    const theme = useTheme();
    return (
        <div class="content">
            <div class="h-[64px]" />
            <div class="section-spacer" />
            {theme() === "light" ? (
                <img class="network" src={network} />
            ) : (
                <img class="network" src={networkDark} />
            )}
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
    const theme = useTheme();
    return (
        <div class="chip">
            {theme() === "light" ? (
                <img src={searchX} />
            ) : (
                <img src={searchXDark} />
            )}
            <h2>{props.locale.noGlobalSearch.title}</h2>
            <p>{props.locale.noGlobalSearch.body}</p>
        </div>
    );
}

interface NoCreepsProps {
    locale: Locale;
}

function NoCreeps(props: NoCreepsProps): JSXElement {
    const theme = useTheme();
    return (
        <div class="chip">
            {theme() === "light" ? (
                <img src={noCreeps} />
            ) : (
                <img src={noCreepsDark} />
            )}
            <h2>{props.locale.noCreeps.title}</h2>
            <p>{props.locale.noCreeps.body}</p>
        </div>
    );
}

interface NaturalFitProps {
    locale: Locale;
}

function NaturalFit(props: NaturalFitProps): JSXElement {
    const theme = useTheme();
    return (
        <div class="chip">
            {theme() === "light" ? (
                <img src={sparkles} />
            ) : (
                <img src={sparklesDark} />
            )}
            <h2>{props.locale.naturalFit.title}</h2>
            <p>{props.locale.naturalFit.body}</p>
        </div>
    );
}

interface ConfidentialProps {
    locale: Locale;
}

function Confidential(props: ConfidentialProps): JSXElement {
    const theme = useTheme();
    return (
        <div class="chip">
            {theme() === "light" ? (
                <img src={confidential} />
            ) : (
                <img src={confidentialDark} />
            )}
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
                {/* <Android locale={props.locale} /> */}
                {/* <Ios locale={props.locale} /> */}
                <Web locale={props.locale} />
            </div>
        </div>
    );
}

// interface AndroidProps {
//     locale: Locale;
// }
//
// function Android(props: AndroidProps): JSXElement {
//     return (
//         <a
//             class="platform"
//             href="https://github.com/friendly-social/android/releases/download/nightly/friendly-latest.apk"
//             target="_blank"
//         >
//             <div class="platform-demos">
//                 <Phone class="phone-1">
//                     <img src={android1} />
//                 </Phone>
//                 <Phone class="phone-2">
//                     <img src={android2} />
//                 </Phone>
//             </div>
//             <div class="platform-label">
//                 <img src={androidAccent} />
//                 <p>{props.locale.platforms.forAndroid}</p>
//             </div>
//         </a>
//     );
// }
//
// interface IosProps {
//     locale: Locale;
// }
//
// function Ios(props: IosProps): JSXElement {
//     return (
//         <a
//             class="platform"
//             href="https://testflight.apple.com/join/vevpjcZ8"
//             target="_blank"
//         >
//             <div class="platform-demos">
//                 <Phone class="phone-1">
//                     <img src={iphone1} />
//                 </Phone>
//                 <Phone class="phone-2">
//                     <img src={iphone2} />
//                 </Phone>
//             </div>
//             <div class="platform-label">
//                 <img src={appleAccent} />
//                 <p>{props.locale.platforms.forIos}</p>
//             </div>
//         </a>
//     );
// }
//
interface WebProps {
    locale: Locale;
}

function Web(props: WebProps): JSXElement {
    const theme = useTheme();
    return (
        <a class="platform" href="https://web.getfriend.ly" target="_blank">
            <div class="platform-demos">
                <div class="tablet">
                    {theme() === "light" ? (
                        <img src={web2} />
                    ) : (
                        <img src={web2Dark} />
                    )}
                    <Phone class="tablet-phone">
                        {theme() === "light" ? (
                            <img src={web1} />
                        ) : (
                            <img src={web1Dark} />
                        )}
                    </Phone>
                </div>
            </div>
            <div class="platform-label">
                {theme() === "light" ? (
                    <img class="p-[3px]" src={webAccent} />
                ) : (
                    <img class="p-[3px]" src={webAccentDark} />
                )}
                <p>{props.locale.platforms.forWeb}</p>
            </div>
        </a>
    );
}

interface FooterProps {
    locale: Locale;
}

function Footer(props: FooterProps): JSXElement {
    const theme = useTheme();
    const git = "https://git.getfriend.ly";

    return (
        <div class="footer">
            {theme() === "light" ? (
                <img src={constructionBlack} />
            ) : (
                <img src={constructionWhite} />
            )}
            <p>{props.locale.footer.underConstruction}</p>
            <p>
                Git:{" "}
                <b>
                    <a href={git}>git.getfriend.ly</a>
                </b>
            </p>
        </div>
    );
}
