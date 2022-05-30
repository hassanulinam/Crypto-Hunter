import { Button, makeStyles } from "@material-ui/core";
import React from "react";

type TypeOfProps = {
  selected: boolean;
  label: string;
  onClick: () => void;
};

const SelectDaysButton = ({ selected, label, onClick }: TypeOfProps) => (
  <Button
    variant={selected ? "contained" : "outlined"}
    style={{
      backgroundColor: selected ? "#EEBC1D" : "",
      borderColor: "#EEBC1D",
    }}
    onClick={onClick}
  >
    {label}
  </Button>
);

export default SelectDaysButton;
