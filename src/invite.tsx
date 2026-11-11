import {
    createEffect,
    createSignal,
    onCleanup,
    type JSXElement,
} from "solid-js";
import { Loader } from "./svg-loader";
import * as friendlyClient from "./friendly-client";
import * as inviteLocale from "./invite.locale";
import * as mediaQuery from "./media-query";
import * as markdown from "./markdown";
import { getLocaleCode } from "./index.locale";
import { useNavigate, useParams } from "@solidjs/router";
import { AppIconBanner } from "./svg-app-icon-banner";
import { Unlink } from "./svg-unlink";
import classes from "./invite.module.css";

type State =
    | {
          loading: false;
          data: friendlyClient.FriendsAddDetailsResult;
      }
    | {
          loading: true;
          data?: undefined;
      };

export function Invite(): JSXElement {
    const params = useParams();
    const navigate = useNavigate();

    createEffect(() => {
        if (typeof params.token !== "string") {
            navigate("/");
        }
    });

    return (
        <>
            {typeof params.token === "string" ? (
                <InviteGuarded token={params.token} />
            ) : null}
        </>
    );
}

interface InviteGuardedProps {
    token: string;
}

function InviteGuarded(props: InviteGuardedProps): JSXElement {
    const locale = inviteLocale.getLocale(getLocaleCode());
    const [invite, setInvite] = createSignal<State>({ loading: true });

    const inviteOk = (): friendlyClient.FriendsAddDetailsResultOk =>
        invite().data as friendlyClient.FriendsAddDetailsResultOk;

    createEffect(() => {
        let cancel = false;
        const token = props.token;
        void (async () => {
            while (true) {
                const io = await friendlyClient.friendsAddDetails({ token });
                if (cancel) break;
                if (io.ok) {
                    console.log(io);
                    setInvite({
                        loading: false,
                        data: io.data,
                    });
                    break;
                }
            }
        })();
        onCleanup(() => {
            cancel = true;
        });
    });

    return (
        <div
            style={`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 100dvh;
            position: relative;
            padding-top: 5rem;
            `}
        >
            <Toolbar />
            {invite().loading ? (
                <Loader
                    style={{
                        color: "var(--color-accent)",
                        animation: "rotation 1s linear infinite",
                    }}
                />
            ) : invite().data!.type === "ok" ? (
                <InviteOk
                    data={inviteOk()}
                    locale={locale}
                    token={props.token}
                    onExpire={() =>
                        setInvite({
                            loading: false,
                            data: { type: "expired" },
                        })
                    }
                />
            ) : (
                <InviteExpired locale={locale} />
            )}
        </div>
    );
}

interface InviteOkProps {
    locale: inviteLocale.Locale;
    token: string;
    data: friendlyClient.FriendsAddDetailsResultOk;
    onExpire: () => void;
}

function InviteOk(props: InviteOkProps): JSXElement {
    const [expiration, setExpiration] = createSignal<string | null>(null);

    const avatarUrl = (): string | null =>
        props.data.avatar
            ? friendlyClient.createImageUrl(props.data.avatar)
            : null;
    const avatarFallback = (): string =>
        getAvatarFallbackForNickname(props.data.nickname)

    const small = mediaQuery.create("(max-width: 35rem)");
    const deeplink = encodeURIComponent(`add/${props.token}`);
    const url = friendlyClient.createDeeplinkUrl(deeplink);

    createEffect(() => {
        const expiration = Date.parse(props.data.expiration);
        const nudge = (): void => {
            const duration = expiration - Date.now();
            if (duration < 0) {
                props.onExpire();
                return;
            }
            const seconds = String(Math.floor((duration / 1_000) % 60));
            const minutes = String(Math.floor((duration / 1_000 / 60) % 60));
            const hours = Math.floor(duration / 1_000 / 60 / 60);
            const display =
                `${hours}:` +
                minutes.padStart(2, "0") +
                ":" +
                seconds.padStart(2, "0");
            setExpiration(display);
        };
        nudge();
        const intervalId = window.setInterval(() => nudge(), 500);
        onCleanup(() => window.clearInterval(intervalId));
    });

    return (
        <div
            style={`
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            `}
        >
            <h1 style="text-align: center; margin-bottom: 1rem;">
                {props.locale.expiresIn} {expiration()}
            </h1>
            <div
                style={`
                height: 100%;
                width: 100%;
                max-width: 30rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                `}
            >
                <div
                    style={`
                    height: ${small() ? "7rem" : "10rem"};
                    width: ${small() ? "7rem" : "10rem"};
                    border-radius: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--color-muted);
                    color: var(--color-secondary);
                    `}>
                    {avatarUrl()
                        ? <img
                            style="width: 100%; height: 100%;"
                            src={avatarUrl()!}
                        />
                        : <p style={`font-size: ${small() ? "2rem" : "4rem"}`}>
                            {avatarFallback()}
                          </p>
                    }
                </div>
                <p class="text-lg" style="font-weight: bold;">
                    {props.data.nickname}
                </p>
                <markdown.Component style="width: 100%;">
                    {props.data.description}
                </markdown.Component>
                <button
                    style={`
                    width: 100%;
                    height: 3rem;
                    background: var(--color-accent);
                    border-radius: 0.5rem;
                    color: white;
                    font-weight: bold;
                    margin-top: 1rem;
                    `}
                    onClick={() => window.open(url, "_blank")}
                >
                    {props.locale.continueInWeb}
                </button>
            </div>
        </div>
    );
}

interface InviteExpiredProps {
    locale: inviteLocale.Locale;
}

function InviteExpired(props: InviteExpiredProps): JSXElement {
    const url = "https://getfriend.ly";
    return (
        <div
            style={`
            height: 100%;
            width: 100%;
            max-width: 40rem;
            padding: 0 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            `}
        >
            <Unlink style="height: 3.5rem; width: 3.5rem;" />
            <p style="font-weight: bold; font-size: 1.25rem;">
                {props.locale.expired}
            </p>
            <p style="text-align: center;">{props.locale.expiredDescription}</p>
            <button
                class={classes.goHome}
                onClick={() => window.open(url, "_self")}
            >
                {props.locale.goHome}
            </button>
        </div>
    );
}

function Toolbar(): JSXElement {
    const navigate = useNavigate();

    return (
        <div
            style={`
            position: fixed;
            top: 0;
            padding: 0.5rem;
            width: 100%;
            `}
        >
            <div
                style={`
                height: 3.75rem;
                width: 100%;
                display: flex;
                flex-direction: row;
                padding: 0.5rem;
                background-color: color-mix(
                    in srgb,
                    var(--color-group-background) 80%,
                    transparent
                );
                backdrop-filter: blur(10px);
                border-radius: 0.5rem;
                border-width: 1px;
                border-color: var(--color-muted);
                align-items: center;
                `}
            >
                <AppIconBanner
                    onClick={() => navigate("/")}
                    style={`
                        height: 100%;
                        width: auto;
                        cursor: pointer;
                        padding: 0.25rem;
                    `}
                />
            </div>
        </div>
    );
}

export function getAvatarFallbackForNickname(
    nickname: string,
): string {
    if (nickname.trim().length === 0) return "";
    const words = nickname.toUpperCase().split(' ');
    return words
        .slice(0, 2)
        .map(word => word[0])
        .join('');
}
