"use client";
import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress, name, color,}) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(progress);
  }, [progress]);

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ">
            {name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xl font-semibold inline-block ">
            {width}%
          </span>
        </div>
      </div>
      <div className="flex h-2 mb-4 overflow-hidden text-xs bg-[#e0e0e0] rounded">
        <div
          style={{ width: `${width}%` }}
          className={`flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap ${color === '56ccf2' ? 'bg-[#56ccf2]' : 'bg-[#f9a109]'}`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

