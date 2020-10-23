import React, { useState } from 'react';
import './App.css';
import './fontawesome/css/all.css';

// Components
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp(ApiKey())

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const [menu, setMenu] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mess</h1>
        {user ? ( auth.currentUser ?
          <div>
            <div className="options" onClick={() => setMenu(!menu)}>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            {menu && <div className="dropdownBlocker" onClick={() => setMenu(!menu)}></div> }
            {menu && <div className="dropdownMenu"><button onClick={() => auth.signOut()}>Sign out</button></div> }
          </div>
        : '') : ''}
      </header>
      {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
    </div>
  );
}

export default App;
