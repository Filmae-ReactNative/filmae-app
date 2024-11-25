import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
  signOut,
} from "firebase/auth";
import { doc, setDoc, deleteDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1bP05yz0_N8LDdbfMtJu4aI8JOGhfnUA",
  authDomain: "projeto-filmeae.firebaseapp.com",
  projectId: "projeto-filmeae",
  storageBucket: "projeto-filmeae.firebasestorage.app",
  messagingSenderId: "176199878447",
  appId: "1:176199878447:web:2dc4f30acc1a93606803da",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const fazerLogin = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

export const excluirConta = async () => {
  try {
    const user = auth.currentUser;

    await deleteDoc(doc(db, "usuarios", user.uid));

    await deleteUser(user);

    return true;
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    throw error;
  }
};

export const fazerLogout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Erro no logout:", error);
    throw error;
  }
};

export { auth, db };
