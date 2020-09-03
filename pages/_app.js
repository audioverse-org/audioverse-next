import '../styles/globals.css'
import React from "react";
import '../styles/styles.scss'

function MyApp({ Component, pageProps }) {
  return <div className={'template-base'}>
    <header className={'template-base__header'}><h1>AudioVerse</h1></header>
    <div className={'template-base__content'}>
      <Component {...pageProps} />
    </div>
  </div>
}

export default MyApp
