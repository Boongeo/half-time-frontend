import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    // stories 파일의 경로를 정확하게 지정
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

    // Storybook에 추가할 애드온들
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "@storybook/addon-webpack5-compiler-babel",
        "@chromatic-com/storybook"
    ],

    // 사용하려는 프레임워크에 맞는 설정
    framework: {
        name: "@storybook/nextjs", // React를 사용하는 경우
        options: {},
    },

    // 정적 파일을 Storybook이 서빙할 수 있도록 설정
    staticDirs: ["../public"], // public 폴더를 정적으로 서빙

    // 자동으로 문서화할 때 필요한 설정
    docs: {},
};

export default config;
