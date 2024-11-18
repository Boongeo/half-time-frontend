import { Github, Linkedin } from "lucide-react";

export const socialLogin = [
    {
        id: 'github',
        name: 'Github',
        icon: Github,
        bgColor: 'white',
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: Linkedin,
        bgColor: 'white',
    },
    {
        id: 'google',
        name: 'Google',
        icon: '/icons/google.png',
        bgColor: 'white',
    },
] as const;