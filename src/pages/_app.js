import '@/styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>QUNAR</title>
        <link rel="icon" href="/qunar-logo-circle.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

