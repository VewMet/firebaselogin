import * as React from "react";
import initAuth from "../initAuth";
import "../styles/globals.css";
import { AppProps } from "next/app";
initAuth();
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
