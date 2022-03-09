import { init } from "next-firebase-auth";
const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    //firebaseAuthEmulatorHost: "localhost:9099",
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.REACT_APP_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.PRIVATE_KEY,
      },
      databaseURL: process.env.REACT_APP_DATABASE_URL,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_REACT_APP_API_KEY, // required
      authDomain: process.env.NEXT_PUBLIC_REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_REACT_APP_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_REACT_APP_APP_ID,
    },
    cookies: {
      name: "MyApp", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      /*keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],*/
      httpOnly: false,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: false, // set this to false in local (non-HTTPS) development
      signed: false,
    },
  });
};

export default initAuth;
