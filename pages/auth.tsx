import React from "react";
import Link from "next/link";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
} from "@firebase/auth";
import { FirebaseApp, getApps } from "@firebase/app";
import { withAuthUser, AuthAction } from "next-firebase-auth";

const Login = (_props: any) => {
  const authApp: FirebaseApp = getApps()[0];
  if (!authApp) {
    return <></>;
  }
  const auth = getAuth(authApp);
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: () => <>LOADING</>,
})(Login);
