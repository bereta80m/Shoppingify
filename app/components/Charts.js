"use client";
import { Card, Title, LineChart } from "@tremor/react";
import { UseGlobal } from "../context/GlobalContext";
import { useEffect, useRef, useState } from "react";

function Charts() {
  const { itemsAdded, datosStatistic } = UseGlobal();
  const FilterByCategory =
    datosStatistic?.length >= 1 &&
    datosStatistic.map(({ category, quantity, date }) => ({
      date,
      category,
      quantity,
    }));
  const dataFormatter = (number) => {
    return " " + Intl.NumberFormat("us").format(number).toString();
  };

  const dateFormatterNe =
    FilterByCategory &&
    FilterByCategory.reduce((acc, items) => {
      const { quantity, date } = items;
      const GetMonth = date.split("-")[1] - 1;

      if (!acc[months[GetMonth]]) {
        acc[months[GetMonth]] = 0;
      }
      acc[months[GetMonth]] += quantity;
      return acc;
    }, {});
  const currentMonth = new Date().getMonth(); // Get the current month index (0-11)
  const monthsArray = [...Array(12).keys()].map((index) => ({
    year: months[index],
    "Food Growth Rate":
      index === currentMonth ? dateFormatterNe[months[index]] || 0 : 0,
  }));

  useEffect(() => {
    console.log(dateFormatterNe);
  }, [dateFormatterNe]);

  return (
    <Card className="" decoration="bottom" decorationColor="orange">
      <Title>Monthly Summary</Title>
      <LineChart
        className="mt-6"
        data={monthsArray}
        index="year"
        categories={["Food Growth Rate"]}
        colors={["orange"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default Charts;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

