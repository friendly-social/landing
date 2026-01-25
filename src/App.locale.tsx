import type { LocaleCode } from "./index.locale.ts";
import type { JSXElement } from "solid-js";

export interface Locale {
    appName: string;
    iconAlt: string;
    openInApp: string;
    download: string;
    whatIsFriendly: {
        title: string;
        body: string;
    };
    noGlobalSearch: {
        title: string;
        body: string;
    };
    noCreeps: {
        title: string;
        body: string;
    };
    naturalFit: {
        title: string;
        body: string;
    };
    confidential: {
        title: string;
        body: string;
    };
    platforms: {
        title: string;
        forIos: JSXElement;
        forAndroid: JSXElement;
        forWeb: JSXElement;
    };
    footer: {
        underConstruction: string;
    };
}

const enLocale: Locale = {
    appName: "Friendly",
    iconAlt: "Friendly Icon",
    openInApp: "Open in App...",
    download: "Download",
    whatIsFriendly: {
        title: "What is Friendly?",
        body: "They say you are connected to anyone with 6 degrees of separation. But instead of chasing the entire world, why not try to focus on expanding the network you already have? Friendly is a private social network built on real connections.",
    },
    noGlobalSearch: {
        title: "No global search",
        body: "No AI slope, no fake reactions, no popularity. Find people through real connections, not by searching for strangers.",
    },
    noCreeps: {
        title: "No creeps",
        body: "Only people connected through mutual friends can reach you. No random messages, no unsolicited attention.",
    },
    naturalFit: {
        title: "Natural fit",
        body: "Shared connections create a natural context, so conversations start easier and feel more genuine.",
    },
    confidential: {
        title: "Confidential",
        body: "Your profile is only visible to people that are close to you, staying inside your trusted network.",
    },
    platforms: {
        title: "How to use?",
        forIos: (
            <>
                Friendly for <b>iOS</b>
            </>
        ),
        forAndroid: (
            <>
                Friendly for <b>Android</b>
            </>
        ),
        forWeb: (
            <>
                Friendly for <b>Web</b>
            </>
        ),
    },
    footer: {
        underConstruction: "This project is under construction",
    },
};

const ruLocale: Locale = {
    appName: "Friendly",
    iconAlt: "Иконка Friendly",
    openInApp: "Открыть в приложении...",
    download: "Скачать",
    whatIsFriendly: {
        title: "Что такое Friendly?",
        body: "Говорят, все люди в мире разделены всего шестью рукопожатиями. Но вместо того чтобы пытаться охватить весь мир, почему бы не уделить внимание расширению уже существующего круга знакомств? Friendly – это приватная социальная сеть, построенная на реальных связях.",
    },
    noGlobalSearch: {
        title: "Без глобального поиска",
        body: "Никаких фейковых реакций и гонок за популярностью. Новые знакомства начинаются через существующие связи.",
    },
    noCreeps: {
        title: "Без странных людей",
        body: "Связаться с вами возможно только через общих друзей. Никакого спама и нежелательного внимания.",
    },
    naturalFit: {
        title: "Особая атмосфера",
        body: "Благодаря доверенной сети создаётся общий контекст, поэтому всегда есть о чём поговорить с новыми знакомыми.",
    },
    confidential: {
        title: "Свобода самовыражения",
        body: "Ваш профиль виден только людям из близкого круга, что позволяет сохранять личное пространство.",
    },
    platforms: {
        title: "Как начать использовать?",
        forIos: (
            <>
                Friendly для <b>iOS</b>
            </>
        ),
        forAndroid: (
            <>
                Friendly для <b>Android</b>
            </>
        ),
        forWeb: (
            <>
                Friendly для <b>Web</b>
            </>
        ),
    },
    footer: {
        underConstruction: "Проект находится в разработке",
    },
};

export function getLocale(code: LocaleCode): Locale {
    switch (code) {
        case "en":
            return enLocale;
        case "ru":
            return ruLocale;
        default:
            assert(code);
    }
}

function assert(code: never): never {
    throw new Error(`Unknown locale ${code}`);
}
