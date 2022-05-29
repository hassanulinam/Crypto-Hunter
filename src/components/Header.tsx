import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursror: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => navigate("/")}
          >
            Crypto Hunter
          </Typography>

          <Select
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e: any) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
