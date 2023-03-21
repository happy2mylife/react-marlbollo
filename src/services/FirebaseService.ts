import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { ref, set } from "firebase/database";
import { IBattingResult } from "../pages/GameResult";
import { auth, db, provider } from "./firebase";

export class FirebaseService {
  private constructor() {}

  static login() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user: User = result.user;
        console.log("signin成功！ ", user.displayName);
        return user.displayName;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log("firebase login error: ", error.message);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  static logout() {
    return auth.signOut();
  }

  static async updatePlayerResult(
    gameId: string,
    battingResult: IBattingResult[]
  ) {
    const dbRef = ref(db, `/results/${gameId}/players`);
    await set(dbRef, battingResult);
    return;
  }
}
