"use client";
import React, { useEffect, useState } from "react";
import { BsCalendar4Range } from "react-icons/bs";
import { UseGlobal } from "../context/GlobalContext";
import { useSearchParams } from "next/navigation";
import Dialog from "../context/Dialog";

function ComponentsProducts({ params }) {
  const { historyList } = UseGlobal();

const elementosConMismoID = Object.entries(historyList).reduce((result, [key, elementos]) => {
  const elementosFiltrados = elementos.filter((elemento) => elemento._id === params.id);
  return result.concat(elementosFiltrados);
}, []);
  
const ProducReduce = elementosConMismoID[0]?.products.reduce((grouped, item)=> {
  const category = item.category
  if (!grouped[category]) {
    grouped[category] = []
  }
  grouped[category].push(item)
  return grouped
},{})


  return (
    <>
      <h1 className=" text-2xl"> {elementosConMismoID[0]?.name} </h1>
      <div className="flex items-center gap-4 pt-5 ">
        <BsCalendar4Range className="text-[#c1c1c4] text-xl" />
        <p className="text-[#c1c1c4]">Mon 24.7.2020</p>
      </div>
     {ProducReduce && Object.keys(ProducReduce).map((category, index) => (
        <>
          <h1 className=" text-xl font-semibold pt-10 pb-2"> {category}</h1>
          <ul key={index} className="grid grid-cols-1 w-full md:grid-cols-2 gap-6 ">
            {ProducReduce[category].map((item) => (
              <li className="flex  items-center justify-between px-5  col-span-1  bg-white py-5 rounded-xl shadow-lg ">
                <p className="truncate  ">{item.name}</p>
                <span className="text-[#f9a109] truncate">{item.quantity} pcs</span>
              </li>
            ))}
          </ul>
        </>
      ))}
               

    </>
  );
}

export default ComponentsProducts;

/*
     console.log("elementosConMismoID",elementosConMismoID)

      if (historyList.hasOwnProperty(fechaFiltrada)) {
        try {
          const valores = historyList[fechaFiltrada];
          setValuesFrom(fechas);
          const Result = valores[0]?.products.reduce((grouped, item) => {
            const category = item.category;
            if (!grouped[category]) {
              grouped[category] = [];
            }
            grouped[category].push(item);
            setObjectCategories(grouped);
            return grouped;
          }, {});
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("La fecha no se encontró en el objeto.");
      }

<h1 className=" text-xl font-semibold pt-10 pb-2"> Beverages </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li className="flex items-center justify-between px-5  bg-white py-5 rounded-xl shadow-lg ">
          <p className="">2 x soft drink</p>
          <span className="text-[#f9a109]">3 pcs</span>
        </li>
        <li className="flex items-center justify-between px-5  bg-white py-5 rounded-xl shadow-lg ">
          <p className="">Beer</p>
          <span className="text-[#f9a109]">1 pcs</span>
        </li>
      </ul>
*/
