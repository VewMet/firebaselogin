import type { NextPage } from "next";
import { withAuthUser, AuthAction, useAuthUser } from "next-firebase-auth";
import React, { useState } from "react";

const Home: NextPage = (props: any) => {
  const [idToken, setIdToken] = useState("getting-token");
  // to get the idToken ::
  const AuthUser = useAuthUser();
  (async () => {
    // this code block runs in browser, not server
    const idToken = (await AuthUser.getIdToken()) || "no-token";
    setIdToken(idToken);
  })();

  return (
    <>
      Welcome home!
      <p>It is {props.weather}</p>
      <br />
      The id token is:
      <br />
      {idToken}
      <br />
      <br />
      <b>Note </b>
      This page i.e, example1, gets the id token after the render finishes in
      browser. Then authorization or other firebase services can be used by the
      client. In example2, the id token is fetched directly in Server Side
      Rendering, and can be used for server side authorization.
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

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => (
    <div style={{ height: "3px", width: "400px", backgroundColor: "green" }} />
  ),
})(Home);
