import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";

const Login = ({ handleClose }: { handleClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: 16,
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
