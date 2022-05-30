import { Box, Button, TextField } from "@material-ui/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { UserAuthState } from "../context/UserAuthContextProvider";
import { auth } from "../pages/firebaseApp";

const SignUp = ({ handleClose }: { handleClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = UserAuthState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ result });
      setAlert({
        open: true,
        message: `Sign up successful. Welcome ${result.user.email}`,
        type: "success",
      });
      // to close the modal automatically after successful sign-up.
      handleClose();
    } catch (err: any) {
      setAlert({
        open: true,
        message: err.message,
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e: any) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
