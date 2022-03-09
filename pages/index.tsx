import type { NextPage } from "next";
import { useAuthUser } from "next-firebase-auth";
import React from "react";

const Home: NextPage = (props: any) => {
  return (
    <>
      This page has no auth. Click on the two example links:
      <br />
      <br />
      <a href="http://localhost:3000/example1">
        <button>Example 1 - client side token fetch</button>
      </a>
      <br />
      <br />
      <a href="http://localhost:3000/example2">
        <button>Example 2 - server side token fetch</button>
      </a>
      <br />
      <br />
      <b>Note </b> In example1 and example2, please observe how the id token
      keeps changing on page reloads. For example2, in every page reload, id
      token changes. But for example1, id token does not change same way after
      reloading the page. No need to worry since id tokens get refreshed by
      server when fetching. But in browser, an id token can stay in memory till
      it expires and refresh is needed. Server does not store id token and so,
      getIdToken refreshes the token. This does not invalidate old id tokens
      which have not yet expired. So no worries!
      <br />
      <b>Tip </b> For the purpose of using id tokens on client side, call
      getIdToken() in browser. Do not pass id token as props from SSR since it
      is not reliable and its refresh is unhandled. For security purposes too,
      id token used by SSR must not be returned in response in anyway. any api
      call must also never return any id token in response. Potential security
      bugs can kill your business :O
      <br /> in example2, only for demo purpose, id token is returned by SSR as
      prop. Sending id tokens as props or in api responses is highly unsafe.
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      weather: "Sunny Wonderful day",
    }, // will be passed to the page component as props
  };
}

export default Home;
