import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth';
  import { auth } from './firebase.config';
  
  export const authService = {
    // Register new user
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    // Login existing user
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    // Logout user
    async logout() {
      try {
        await signOut(auth);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };
  
  