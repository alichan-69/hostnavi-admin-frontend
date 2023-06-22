import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ja">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="bg-backGround">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
