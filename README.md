# Firebase Authentication in nextJs app
 Implement firebase login in nextJs app. run `npm i` and then `npm run dev`. There are two pages: http://localhost:3000/example1 and http://localhost:3000/example2 .
 
      In example1 and example2, please observe how the id token
      keeps changing on page reloads. For example2, in every page reload, id
      token changes. But for example1, id token does not change same way after
      reloading the page. No need to worry since id tokens get refreshed by
      server when fetching. But in browser, an id token can stay in memory till
      it expires and refresh is needed. Server does not store id token and so,
      getIdToken refreshes the token. This does not invalidate old id tokens
      which have not yet expired. So no worries!
     
      Tip  For the purpose of using id tokens on client side, call
           getIdToken() in browser. Do not pass id token as props from SSR since it
           is not reliable and its refreshing is unhandled. For security purposes too,
           id token used by SSR must not be returned in response in anyway. any api
           call must also never return any id token in response. Potential security
           bugs can kill your business :O
           <br /> in example2, only for demo purpose, id token is returned by SSR as
           prop. Sending id tokens as props or in api responses is highly unsafe.

