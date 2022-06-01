import { Color } from "@material-ui/lab/Alert";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
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
  addToWatchlist: (coin: any) => Promise<void>;
  removeFromWatchlist: (coin: any) => Promise<void>;
};

const UserAuthContext = createContext<TypeOfUserAuthContext>({
  alert: { open: false, message: "", type: "info" },
  setAlert: () => {},
  user: null,
  watchlist: [],
  addToWatchlist: async (coin: any) => {},
  removeFromWatchlist: async (coin: any) => {},
});

const UserAuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [alert, setAlert] = useState<TypeOfAlert>({
    open: false,
    message: "",
    type: "success",
  });

  // to sync the user login data...
  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
      else setUser(null);
    });
  }, []);

  // to keep watchlist in sync with fireDatabase.
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

  const addToWatchlist = async (coin: any) => {
    const coinRef = doc(db, "watchlist", user!.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} has been added to watchlist !`,
        type: "success",
      });
    } catch (err: any) {
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async (coin: any) => {
    const coinRef = doc(db, "watchlist", user!.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((coinId) => coinId !== coin.id),
        },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} has been remove from watchlist !`,
        type: "warning",
      });
    } catch (err: any) {
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      });
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        alert,
        setAlert,
        user,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;

export const UserAuthState = () => useContext(UserAuthContext);
