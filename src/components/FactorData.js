import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";

const FD = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);

  const detailsList = {
    "P/E": "P/E",
    "P/B": "P/B",
    "EV/RV": "EV/RV",
    "P/S TTM": "P/S TTM",
    "\u0394Rev": "\u0394Rev",
  };

  const formatNumber = (number) => {
    return Number(number).toFixed(2);
  };

  return (
    <Card>
      <ul
        className={`w-full h-full flex flex-col justify-between divide-y-1 ${
          darkMode ? "divide-gray-800" : null
        }`}
      >
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="flex-1 flex justify-between items-center">
              <span>{detailsList[item]}</span>
              <span className="font-bold">
                {item === "marketCapitalization"
                  ? `${formatNumber(details[item])}B`
                  : formatNumber(details[item])}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default FD;
