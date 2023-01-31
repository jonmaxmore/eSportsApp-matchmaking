import { Suspense, useEffect } from 'react';
import { BrowserRouter, MemoryRouter, HashRouter } from 'react-router-dom'
import { AuthContextProvider } from '@AuthContext/store'
import SearchProvider from './context/SearchMatch'

import RenderRoute from '@Routes/_RenderRoute';
import SearchOppoProvider from '@Context/SearchOppoMatch';
import SearchTimerProvider from '@Context/SearchTimer';
import firebaseApp from '@Config/firebase.config';
import { getMessaging, getToken } from "firebase/messaging";
import FriendChatProvider from '@Context/Friend/FriendChat';
import WalletProvider from '@Context/Wallet/Wallet';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
function App() {
  useEffect(() => {

    

    const messaging = getMessaging(firebaseApp);
    getToken(messaging,
      { vapidKey: 'BPpgaCtjdE2y1zCYF9pdLdv7myWkjZ7TGBZO_xkNRlS-wjynZtha1XtuWMgakxBtG42VYBCR1XbJ8c94uTw1NEE' }
    ).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log(currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  })
  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      {/*  <HashRouter> */}
      <Suspense fallback={loading}>
        <AuthContextProvider>
          <SearchProvider>
            <SearchOppoProvider>
              <FriendChatProvider>
                <WalletProvider>
                  <RenderRoute />
                </WalletProvider>
              </FriendChatProvider>
            </SearchOppoProvider>
          </SearchProvider>
        </AuthContextProvider >
      </Suspense>
      {/* </HashRouter> */}
      {/*</BrowserRouter>  */}
    </HashRouter>
  );
}

export default App;