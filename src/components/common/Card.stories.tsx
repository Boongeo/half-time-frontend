import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Card from './Card';

const meta: Meta = {
    title: 'Components/Card',
    component: Card,
    argTypes: {
        className: { control: 'text' },
        hasLogo: { control: 'boolean' },
        hasMainTitle: { control: 'boolean' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        mainTitle: { control: 'text'},
        fullWidth: { control: 'boolean'}
    },
};

export default meta;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

// 기본 텍스트 카드
export const Default = Template.bind({});
Default.args = {
    children: '기본 카드 내용',
    hasLogo: false,
    hasMainTitle: false,
    fullWidth: false
};

// 텍스트 + 이미지 카드
export const WithLogo = Template.bind({});
WithLogo.args = {
    children: '로고가 포함된 카드',
    hasLogo: true,
    hasMainTitle: false,
    title: '카드 제목',
    subtitle: '카드 소제목',
    fullWidth: false
};

// 이미지 제외, 제목만 포함된 카드
export const WithTitle = Template.bind({});
WithTitle.args = {
    children: '카드의 제목이 포함된 카드',
    hasLogo: false,
    hasMainTitle: true,
    mainTitle: '카드의 제목이 포함된 카드',
    fullWidth: true
};
