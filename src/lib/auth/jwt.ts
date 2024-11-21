import {JwtPayload} from "@/types/auth";

export function decodeToken(token: string | null): JwtPayload | null {
    if (!token) return null;

    try {
        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64').toString('ascii');
        const decoded = JSON.parse(payload) as JwtPayload;

        if (decoded.role && !['user', 'mentor', 'admin'].includes(decoded.role)) {
            return null;
        }

        if (!decoded.sub || !decoded.email || !decoded.exp) {
            return null;
        }

        return decoded as JwtPayload;
    } catch {
        return null;
    }
}