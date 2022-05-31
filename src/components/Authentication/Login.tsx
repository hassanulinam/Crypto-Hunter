import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { UserAuthState } from "../../context/UserAuthContextProvider";
import { auth } from "../../pages/firebaseApp";

const Login = ({ handleClose }: { handleClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        type={showPassword ? "" : "password"}
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((show) => !show)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
