import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Theme, Drawer, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserAuthState } from "../../context/UserAuthContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/firebaseApp";
import { CryptoState } from "../../context/CryptoContextProvider";
import { numberWithCommas } from "../Carousel";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  wlistCoin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
}));

type Anchor = "top" | "left" | "bottom" | "right";

export default function UserSideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({ right: false });
  const { user, setAlert, watchlist, removeFromWatchlist } = UserAuthState();
  const { coins, symbol } = CryptoState();
  const anchor: Anchor = "right";

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout successful",
    });
    toggleDrawer(anchor, false);
  };

  return (
    <div>
      <>
        <Avatar
          onClick={toggleDrawer(anchor, true)}
          style={{
            height: 38,
            width: 38,
            marginLeft: 15,
            cursor: "pointer",
            backgroundColor: "#EEBC1D",
          }}
          src={user?.photoURL as string}
          alt={(user?.displayName || user?.email) as string}
        />
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          <div className={classes.container}>
            <div className={classes.profile}>
              <Avatar
                className={classes.picture}
                src={user?.photoURL as string}
                alt={(user?.displayName || user?.email) as string}
              />
              <span
                style={{
                  width: "100%",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bolder",
                  wordWrap: "break-word",
                }}
              >
                {user?.displayName || user?.email}
              </span>
              <div className={classes.watchlist}>
                <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                  Watchlist
                </span>
                {coins.map((c: any) => {
                  if (watchlist.includes(c.id)) {
                    return (
                      <div className={classes.wlistCoin}>
                        <span>{c?.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          {symbol}{" "}
                          {numberWithCommas(c?.current_price.toFixed(2))}
                        </span>
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          fontSize="small"
                          onClick={() => removeFromWatchlist(c)}
                        />
                      </div>
                    );
                  }
                  return <></>;
                })}
              </div>
            </div>
            <Button
              variant="contained"
              className={classes.logout}
              onClick={logOut}
            >
              Logout
            </Button>
          </div>
        </Drawer>
      </>
    </div>
  );
}
