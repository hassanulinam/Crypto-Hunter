import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { UserAuthState } from "../context/UserAuthContextProvider";
import { auth } from "../pages/firebaseApp";

const Login = ({ handleClose }: { handleClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = UserAuthState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login successful. Welcome ${result.user.email}`,
        type: "success",
      });
      // automatically close modal after successful login.
      handleClose();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: 20,
      }}
    >
      <TextField
        variant="outlined"
        label="Enter Email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
