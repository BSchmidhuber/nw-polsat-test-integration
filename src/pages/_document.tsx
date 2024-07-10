import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const metadata = {
  title: 'Next.js EXP Example',
};

class MyDocument extends Document {
  render() {
    return (
      <React.StrictMode>
        <Html>
          <Head>
            <title>{metadata.title}</title>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </React.StrictMode>
    )
  }
}

export default MyDocument;
