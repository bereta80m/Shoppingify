"use client";
import React, { useEffect, useRef } from "react";
import { BsCalendar4Range } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { UseGlobal } from "../context/GlobalContext";
import Dialog from "../context/Dialog";

function ShopHistory() {
  const { historyData, historyList, datosStatistic, setDatosStatistic } = UseGlobal();


  return (
    <div style={{
      overflow: "auto",
      scrollbarWidth: "none",                                        
      msOverflowStyle: "none"}} className="h-screen pb-16">
      {historyList &&
        Object.keys(historyList).map((date, index) => (
          <>
            <h1 className="pt-14 pb-5">{monthNames[date.split('-')[1]- 1]  } {date.split('-')[0]}</h1>
            <ul  key={index} className="grid grid-cols-1 gap-6  ">
              {historyList[date].map((item, index) => (
                <li key={item._id} className="flex border-2 justify-between items-center bg-white py-5 rounded-xl shadow-lg px-5">
                  <p className="lg:text-base  md:text-sm font-semibold  truncate ">{item.name}</p>
                  <div className="flex items-center gap-8 ">
                    <BsCalendar4Range className="text-[rgb(193,193,196)] text-xl  xxs:hidden xs:hidden lg:block md:block sm:block" />
                    <p className="text-[#c1c1c4] lg:text-base  md:text-sm lg:w-44 md:w-20 sm:w-20 xs:w-16 xxs:hidden xs:hidden lg:block md:block sm:block  truncate">{new Date(item.createdAt).toDateString()}</p>
                    <span className={`truncate border-2 ${item.completed ? 'border-[#56ccf2] text-[#56ccf2] ' : ' border-[#eb5757] text-[#eb5757] ' } lg:text-base md:text-sm px-3 py-1 rounded-xl  `}>
                      {item.completed ? 'Completed' : 'Cancelled'}
                    </span>
                    <Link href={`${item._id}`}>
                      <MdArrowForwardIos className="text-3xl text-[#f9a109] cursor-pointer" />
                    </Link>
                  </div>
                </li>
              ))}

            </ul>
          </>
        ))}
              
    </div>
  );
}

export default ShopHistory;

export const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


