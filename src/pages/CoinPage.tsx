import { Button, LinearProgress, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Carousel";
import CoinInfo from "../components/CoinInfo";
import { SingleCoinUrl } from "../config/api";
import { CryptoState } from "../context/CryptoContextProvider";
import { UserAuthState } from "../context/UserAuthContextProvider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    overflowY: "auto",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>("");
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const { user, setAlert, watchlist } = UserAuthState();
  const inWatchlist = watchlist.includes(coin?.id);

  const fetchCoinDetails = async (): Promise<void> => {
    const { data } = await axios.get(SingleCoinUrl(id));
    setCoin(data);
    console.log(data.description.en);
  };

  useEffect(() => {
    fetchCoinDetails();
  }, [currency]);

  const addToWatchlist = async () => {
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

  const removeFromWatchlist = async () => {
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

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(coin?.description.en.split(". ").splice(0, 4).join(". "))}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading} variant="h5">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading} variant="h5">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
              )
                .toString()
                .slice(0, -8)}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      {/* chart */}
      <CoinInfo coinId={coin.id} />
    </div>
  );
};

export default CoinPage;
