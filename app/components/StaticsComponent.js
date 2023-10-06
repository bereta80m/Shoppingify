"use client";
import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import ProgressBar from "./ProgressBar";
import { UseGlobal } from "../context/GlobalContext";
import Dialog from "../context/Dialog";

function StaticsComponent() {
  const { datosStatistic } = UseGlobal();
  const FilterByName =
    datosStatistic?.length >= 1 &&
    datosStatistic.map(({ name, quantity }) => ({ name, quantity }));

  const FilterByCategory =
    datosStatistic?.length >= 1 &&
    datosStatistic.map(({ category, quantity }) => ({ category, quantity }));
  const [enumFull, setEnumFull] = useState({});
  const [enumNames, setEnumNames] = useState({});

  useEffect(() => {
    const HandleMonths = () => {
      const categoryTotals = {};
      FilterByCategory &&
        FilterByCategory.map((items, index) => {
          const { category, quantity, date } = items;

          if (categoryTotals[category]) {
            categoryTotals[category].TotalQuantity += quantity;
            categoryTotals[category].createdAt = date;
          } else {
            categoryTotals[category] = {
              TotalQuantity: quantity,
              createdAt: date,
            };
          }
        });
      const FoodTotalArray = Object.entries(categoryTotals).map(
        ([category, { TotalQuantity }]) => ({ category, TotalQuantity })
      );
      FoodTotalArray.sort((a, b) => b.TotalQuantity - a.TotalQuantity);
      if (FoodTotalArray) {
        setEnumFull(FoodTotalArray);
      }
    };
    HandleMonths();
  }, [datosStatistic]);

  useEffect(() => {
    const HandleGetByName = () => {
      const FoodTotal = {};
      FilterByName &&
        FilterByName.map((items) => {
          const { name, quantity } = items;
          if (FoodTotal[name]) {
            FoodTotal[name].TotalQuantity += quantity;
          } else {
            FoodTotal[name] = {
              TotalQuantity: quantity,
            };
          }
        });
      const FoodTotalArray = Object.entries(FoodTotal).map(
        ([name, { TotalQuantity }]) => ({ name, TotalQuantity })
      );
      FoodTotalArray.sort((a, b) => b.TotalQuantity - a.TotalQuantity);
      if (FoodTotalArray) {
        setEnumNames(FoodTotalArray);
      }
    };
    HandleGetByName();
  }, [datosStatistic]);
  return (
    <div
      style={{
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="h-screen pb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2  col-span-2 gap-5 ">
        <div className="grid px-5">
          <h1 className="text-2xl font-semibold">Top Items</h1>

          {enumNames &&
            Object.keys(enumNames).map((name) => {
              {
                console.log();
              }
              return (
                <ProgressBar
                  name={enumNames[name].name}
                  color="f9a109"
                  progress={enumNames[name].TotalQuantity}
                />
              );
            })}
        </div>

        <div className="grid px-5 ">
          <h1 className="text-2xl font-semibold">Top Categories</h1>
          {enumFull &&
            Object.keys(enumFull).map((category) => {
              return (
                <ProgressBar
                  name={enumFull[category].category}
                  color="56ccf2"
                  progress={enumFull[category].TotalQuantity}
                />
              );
            })}
        </div>
      </div>

      <div className="lg:max-w-4xl md:max-w-4xl sm:max-w-xl xs:max-w-md xxs:max-w-xs  ">
        <Charts />
      </div>
      <Dialog />
    </div>
  );
}

export default StaticsComponent;
