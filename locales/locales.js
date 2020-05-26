export const localeName = {
  en: 'English'
};

export const selectLocale = (defLocale, cookie) => {
  const selected = cookie.lang;

  const browserLanguage =
    (typeof navigator !== 'undefined' &&
      (navigator.browserLanguage || navigator.language)) ||
    defLocale;

  const lang2 = browserLanguage.toLowerCase().substr(0, 2);
  const lang5 = browserLanguage.toLowerCase().substr(0, 5);

  const locale =
    selected ||
    (localeName[lang5] && lang5) ||
    (localeName[lang2] && lang2) ||
    'en';

  return locale;
};
