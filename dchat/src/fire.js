import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCihYLhqVcWZNETkFMR7qUt9EFSXCgW8B4",
    authDomain: "dchat-bab01.firebaseapp.com",
    projectId: "dchat-bab01",
    storageBucket: "dchat-bab01.appspot.com",
    messagingSenderId: "939894489711",
    appId: "1:939894489711:web:a9f9a219683defb173439a"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire