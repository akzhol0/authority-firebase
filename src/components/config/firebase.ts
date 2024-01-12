import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7WRAA5_OrnNd16p7Ir9M-2kSpdtMlfcQ",
  authDomain: "clothes-database-11ee3.firebaseapp.com",
  projectId: "clothes-database-11ee3",
  storageBucket: "clothes-database-11ee3.appspot.com",
  messagingSenderId: "167029126033",
  appId: "1:167029126033:web:ba2aac96605975241a6030"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);