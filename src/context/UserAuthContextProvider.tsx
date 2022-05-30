import { Color } from "@material-ui/lab/Alert";
import { createContext, useContext, useState } from "react";

type TypeOfAlert = {
  open: boolean;
  message: string;
  type: Color;
};

type TypeOfUserAuthContext = {
  alert: TypeOfAlert;
  setAlert: React.Dispatch<React.SetStateAction<TypeOfAlert>>;
};

const UserAuthContext = createContext<TypeOfUserAuthContext>({
  alert: { open: false, message: "", type: "info" },
  setAlert: () => {},
});

const UserAuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState("");
  const [alert, setAlert] = useState<TypeOfAlert>({
    open: false,
    message: "",
    type: "success",
  });

  return (
    <UserAuthContext.Provider value={{ alert, setAlert }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;

export const UserAuthState = () => useContext(UserAuthContext);
