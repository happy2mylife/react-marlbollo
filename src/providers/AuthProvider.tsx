import { User, NextOrObserver } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";

export const AuthContext = React.createContext<User | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const observer: NextOrObserver<User> = (user) => {
      setCurrentUser(user);
    };
    // ログイン状態の変化を検知できる
    // return に記載することでコンポーネントのマウント・アンマウント時に実行される・・？
    return auth.onAuthStateChanged(observer);
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
