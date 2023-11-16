import i18n, { i18n as I18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

import tranEn from './files/en.json';
import tranKo from './files/ko.json';
import tranCh from './files/ch.json';
import tranHk from './files/hk.json';

type Props = {
    locale: string
}

const resources = {
    en: { translation: tranEn },
    ko: { translation: tranKo },
    ch: { translation: tranCh },
    hk: { translation: tranHk },
};

export const createI18n = ({ locale }: Props): I18n => {
    i18n.use(initReactI18next).init({
        resources,
        lng: locale,
        fallbackLng: 'ko',
        interpolation: {
            escapeValue: false,
        },
    });

    return i18n;
};

export const languages = ['en', 'ko', 'ch', 'hk'];

export type Languages = typeof languages[number]; // 'en' | 'ko'
