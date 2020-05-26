import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import withDarkMode, { useDarkMode } from 'next-dark-mode';
import { darken, lighten } from 'polished';
import { parseCookies } from 'nookies';
import { selectLocale } from '../locales/locales';

import 'ress/dist/ress.min.css';

const lightTheme = {
  background: '#e3e3e3',
  text: '#030303',
  boxShadow: '#121212',
  lighten: lighten,
  darken: darken
};

const darkTheme = {
  background: '#121212',
  text: '#f3f3f3',
  boxShadow: '#e3e3e3',
  lighten: darken,
  darken: lighten
};

const GlobalStyle = createGlobalStyle({
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: 400,
    fontStyle: 'normal',
    color: ({ theme: { text } }) => text,
    background: ({ theme: { background } }) => background
  },
  '.icon': {
    position: 'relative',
    top: '3px',
    color: ({ theme: { text } }) => text
  },
  '::-webkit-scrollbar': {
    width: '6px',
    height: '6px'
  },
  '::-webkit-scrollbar-thumb': {
    background: ({ theme: { background, darken } }) => darken(0.9, background),
    border: 'none'
  }
});

const App = ({ Component, pageProps, locale }) => {
  const { darkModeActive } = useDarkMode();

  return (
    <ThemeProvider theme={darkModeActive ? darkTheme : lightTheme}>
      <Head>
        <title>My birthdate anime</title>
      </Head>
      <GlobalStyle />

      <IntlProvider
        locale={locale}
        messages={require(`../locales/${locale}.json`)}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const locale = selectLocale(
    ctx?.req?.headers['accept-language'],
    parseCookies(ctx)
  );
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, locale };
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  locale: PropTypes.string
};

export default withDarkMode(App);
