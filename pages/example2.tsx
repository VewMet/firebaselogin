import type { NextPage } from "next";
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import React from "react";

const Home: NextPage = (props: any) => {
  return (
    <>
      Dear {props.name}, welcome home!
      <p>It is {props.weather}</p>
      The id token is fetched by the server. Server can use the id token for
      authorization, etc, before rendering the response. The id token:
      <br />
      {props.idToken}
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();
  // given below is an example of calling api with id token
  const response = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const data = await response.json();
  return {
    props: {
      weather: data.weather,
      name: data.name,
      idToken: data.idToken,
    },
  };
});

export default withAuthUser()(Home);

/*
you can use below default export instead of above default export also. Try!

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => (
    <div style={{ height: "3px", width: "400px", backgroundColor: "green" }} />
  ),
})(Home);
*/
