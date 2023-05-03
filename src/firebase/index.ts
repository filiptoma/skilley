import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBzT3jZnkkRoByNgkeqAbQhYlEEgvdZL5o',
  authDomain: 'skilley-pb175.firebaseapp.com',
  projectId: 'skilley-pb175',
  storageBucket: 'skilley-pb175.appspot.com',
  messagingSenderId: '130256712400',
  appId: '1:130256712400:web:5e5c1510c6b04348f8e4d5',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
