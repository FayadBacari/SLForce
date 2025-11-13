import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCpAc2eSBziXt6ZVOunZxSjNr6Vn_pB8oU',
  authDomain: 'slforce-ddf5b.firebaseapp.com',
  projectId: 'slforce-ddf5b',
  storageBucket: 'slforce-ddf5b.firebasestorage.app',
  messagingSenderId: '883308316735',
  appId: '1:883009d73047561ed108a',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
