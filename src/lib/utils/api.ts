export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};