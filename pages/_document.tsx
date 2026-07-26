import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* ── Site Favicon & Icons ── */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* ── Preconnect for performance ── */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

          {/* ── Search Engine Verification ── */}
          {/* Replace the content values below with your actual verification tokens from each platform */}
          {/* Google Search Console: https://search.google.com/search-console */}
          {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
            <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
          )}
          {/* Bing Webmaster Tools: https://www.bing.com/webmasters */}
          {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
            <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
          )}
          {/* Yandex Webmaster: https://webmaster.yandex.com */}
          {process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION && (
            <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION} />
          )}

          {/* ── Global SEO signals ── */}
          <meta name="theme-color" content="#ef4444" />
          <meta name="color-scheme" content="dark light" />
          <link rel="author" href="https://www.rebelroot.xyz" />

        </Head>
        <body className="next-light-theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
