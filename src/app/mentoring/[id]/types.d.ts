declare module '*/app/mentoring/[id]/page.tsx' {
    interface PageProps {
        params: { id: string };
        searchParams?: { [key: string]: string | string[] | undefined };
    }
}