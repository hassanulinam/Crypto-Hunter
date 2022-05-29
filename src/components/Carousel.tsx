import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoinsUrl } from "../config/api";
import { CryptoState } from "../context/CryptoContextProvider";
const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursror: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const responsiveItems = {
  0: { items: 2 },
  512: { items: 4 },
};

export const numberWithCommas = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Carousel = () => {
  const [trending, setTrending] = useState<any>([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async (): Promise<any> => {
    const { data } = await axios.get(TrendingCoinsUrl(currency));
    setTrending(data);
    console.log("Fetching Trending Coins...");
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const classes = useStyles();
  const items = trending.map((coin: any) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>{coin?.symbol} &nbsp;</span>
        <span
          style={{
            color: profit ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"} {coin?.price_change_percentage_24h}
        </span>
        <span>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsiveItems}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
