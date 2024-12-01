import {JwtPayload} from "@/types/core/auth";

export function decodeToken(token: string | null): JwtPayload | null {
    if (!token) return null;

    try {
        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64').toString('ascii');
        const decoded = JSON.parse(payload) as JwtPayload;

        if (!decoded.sub || !decoded.exp) {
            return null;
        }

        return {
            sub: decoded.sub,
            exp: decoded.exp
        };
    } catch {
        return null;
    }
}