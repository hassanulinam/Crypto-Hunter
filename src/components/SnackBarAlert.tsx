import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { UserAuthState } from "../context/UserAuthContextProvider";

const SnackBarAlert = () => {
  const { alert, setAlert } = UserAuthState();

  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBarAlert;
