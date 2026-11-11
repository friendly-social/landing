import type { LocaleCode } from "./index.locale.ts";

export interface Locale {
    expiresIn: string;
    continueInWeb: string;
    expired: string;
    expiredDescription: string;
    goHome: string;
}

const enLocale: Locale = {
    expiresIn: "Invitation expires in",
    continueInWeb: "Continue",
    expired: "This link is expired",
    expiredDescription:
        "You were invited to a private networking app, but invitations only last for 24 hours. Ask for a new one if you are determined to join",
    goHome: "Go home",
};

const ruLocale: Locale = {
    expiresIn: "Приглашение действительно ещё",
    continueInWeb: "Продолжить",
    expired: "Это приглашение устарело",
    expiredDescription:
        "Вы были приглашены в приватное сообщество, но приглашение действительно только в течение 24 часов. Попросите новое, если вы всё ещё намерены присоединиться",
    goHome: "На главную",
};

const beLocale: Locale = {
    expiresIn: "Запрашэнне сапраўднае яшчэ",
    continueInWeb: "Працягнуць",
    expired: "Гэта запрашэнне састарэла",
    expiredDescription:
        "Вас запрасілі ў прыватную супольнасць, але запрашэнне дзейнічае толькі на працягу 24 гадзін. Папрасіце новае, калі вы ўсё яшчэ хочаце далучыцца",
    goHome: "На галоўную",
};

const ukLocale: Locale = {
    expiresIn: "Запрошення дійсне ще",
    continueInWeb: "Продовжити",
    expired: "Це запрошення застаріло",
    expiredDescription:
        "Вас запросили до приватної спільноти, але запрошення дійсне лише протягом 24 годин. Попросіть нове, якщо ви все ще хочете приєднатися",
    goHome: "На головну",
};

export function getLocale(code: LocaleCode): Locale {
    switch (code) {
        case "en":
            return enLocale;
        case "ru":
            return ruLocale;
        case "be":
            return beLocale;
        case "uk":
            return ukLocale;
        default:
            assert(code);
    }
}

function assert(code: never): never {
    throw new Error(`Unknown locale ${code}`);
}
