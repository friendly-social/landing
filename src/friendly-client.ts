const baseUrl = "https://api.getfriend.ly";

export type IO<T> = { ok: false; error: unknown } | { ok: true; data: T };

export interface FileDescriptor {
    id: string;
    accessHash: string;
}

export function createImageUrl(file: FileDescriptor): string {
    return `https://api.getfriend.ly/files/download/${file.id}/${file.accessHash}`;
}

export type Deeplink = {
    type: "add";
    token: string;
};

export function createDeeplinkUrl(deeplink: string): string {
    return `https://web.getfriend.ly/redirect/${deeplink}`;
}

export interface FriendsAddDetailsOptions {
    token: string;
}

export type FriendsAddDetailsResult =
    | FriendsAddDetailsResultExpired
    | FriendsAddDetailsResultOk;

export interface FriendsAddDetailsResultExpired {
    type: "expired";
}

export interface FriendsAddDetailsResultOk {
    type: "ok";
    nickname: string;
    description: string;
    interests: string[];
    avatar?: FileDescriptor;
    expiration: string;
}

export async function friendsAddDetails({
    token,
}: FriendsAddDetailsOptions): Promise<IO<FriendsAddDetailsResult>> {
    try {
        const request = await fetch(`${baseUrl}/friends/add/details/${token}`);
        const response = (await request.json()) as FriendsAddDetailsResult;
        return { ok: true, data: response };
    } catch (error) {
        return { ok: false, error };
    }
}

export interface FriendsAddDetailsResponse {
    nickname: string;
}
