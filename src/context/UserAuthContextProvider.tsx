import { Color } from "@material-ui/lab/Alert";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../pages/firebaseApp";

type TypeOfAlert = {
  open: boolean;
  message: string;
  type: Color;
};

type TypeOfUserAuthContext = {
  alert: TypeOfAlert;
  setAlert: React.Dispatch<React.SetStateAction<TypeOfAlert>>;
  user: any;
};

const UserAuthContext = createContext<TypeOfUserAuthContext>({
  alert: { open: false, message: "", type: "info" },
  setAlert: () => {},
  user: null,
});

const UserAuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<any>("");
  const [alert, setAlert] = useState<TypeOfAlert>({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <UserAuthContext.Provider value={{ alert, setAlert, user }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;

export const UserAuthState = () => useContext(UserAuthContext);
