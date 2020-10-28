import React, { useState } from 'react';
import './App.css';
import './fontawesome/css/all.css';

// Components
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'
import Options from './components/Options'

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
  const [changePhoto, setChangePhoto] = useState(false)
  const [URLinput, setURLinput] = useState('')
  // auth.currentUser.photoURL is null

  const changePhotoURL = async(e) => {
    e.preventDefault()
    const messageRef = firestore.collection('messages').where('uid', '==', auth.currentUser.uid);
    console.log(messageRef)
    //const query = messageRef.
    await messageRef.update({ photoURL: URLinput})
    setChangePhoto(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mess</h1>
        { auth.currentUser && <Options auth={auth} setChangePhoto={setChangePhoto} /> }
      </header>
      { user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} /> }

      { auth.currentUser && changePhoto && <div className="dropdownBlocker" onClick={() => setChangePhoto(!changePhoto)}></div>}
      { auth.currentUser && changePhoto &&
          <div className="option-photo" onSubmit={changePhotoURL}>
              <form className="settings">
                  <div><label>Photo URL</label>
                  <input type="text" onChange={e => setURLinput(e.target.value)} value={URLinput}></input></div>
                  <div className="save-button"><button onClick={changePhotoURL}>Save</button></div>
              </form>
          </div>
      }
    </div>
  );
}

export default App;
