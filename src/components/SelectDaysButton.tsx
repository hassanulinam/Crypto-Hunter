import { makeStyles } from "@material-ui/core";
import React from "react";

type TypeOfProps = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const SelectDaysButton = ({ children, selected, onClick }: TypeOfProps) => {
  const useStyles = makeStyles({
    selectBtn: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: "10px 20px",
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      margin: 5,
    },
  });

  const classes = useStyles();

  return (
    <span
      style={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        width: "22%",
        margin: 5,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectDaysButton;
