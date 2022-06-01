import { Color } from "@material-ui/lab/Alert";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../pages/firebaseApp";

type TypeOfAlert = {
  open: boolean;
  message: string;
  type: Color;
};

type TypeOfUserAuthContext = {
  alert: TypeOfAlert;
  setAlert: React.Dispatch<React.SetStateAction<TypeOfAlert>>;
  user: User | null;
  watchlist: string[];
};

const UserAuthContext = createContext<TypeOfUserAuthContext>({
  alert: { open: false, message: "", type: "info" },
  setAlert: () => {},
  user: null,
  watchlist: [],
});

const UserAuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [alert, setAlert] = useState<TypeOfAlert>({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) setWatchlist(coin.data().coins);
        else {
          console.error("No Items in Watchlist");
          setWatchlist([]);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <UserAuthContext.Provider value={{ alert, setAlert, user, watchlist }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;

export const UserAuthState = () => useContext(UserAuthContext);
