import React from 'react';

export interface IModalStatus {
    type: string;
    title: string;
    isShow: boolean;
}

export interface IModal {
    toggle: (type: string, title: string, isShow: boolean) => void;
    title?: string;
    children?: React.ReactNode
}
