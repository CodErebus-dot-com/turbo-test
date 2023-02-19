import { AppProps } from 'next/app';
import Head from 'next/head';
// import { Header } from '@genesis/ui-kit';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Genesis-next-app!</title>
      </Head>
      <div className="app">
        <header className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Genesis_logo.svg" alt="Genesis logo" width="75" height="50" />
          <h1>Welcome to Genesis-next-app!</h1>
        </header>
        <p>or</p>
        {/* <Header/> */}
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
