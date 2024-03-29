import { Button, CircularProgress, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChartUrl } from "../config/api";
import { CryptoState } from "../context/CryptoContextProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import chartDays from "../config/days";
import SelectDaysButton from "./SelectDaysButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coinId }: { coinId: string }) => {
  const [historicalData, setHistoricalData] = useState<number[][]>([]);
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  const fetchHistoricalData = async (): Promise<void> => {
    const { data } = await axios.get(
      HistoricalChartUrl(coinId, days, currency)
    );
    setHistoricalData(data.prices);
    setFlag(true);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return (
    <div className={classes.container}>
      {!historicalData || flag === false ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectDaysButton
                key={day.value}
                selected={day.value === days}
                onClick={() => setDays(day.value)}
                label={day.label}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
