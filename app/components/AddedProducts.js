"use client";
//Struggle Here
//Struggle Here
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "../context/ToggleButton";
import { UseGlobal } from "../context/GlobalContext";
import CheckboxList from "./Buttons/CheckboxList";

function AddedProducts() {
  const {
    state,
    HandleAddItem,
    editar,
    setEditar,
    itemsAdded,
    setItemsAdded,
    setIsChecked,
    dispatch,
    completedTask,
    setCompletedTask,
  } = UseGlobal();
  const containerRef = useRef(null);

  const ScrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const handleCheckboxChange = (e, item, index) => {
    const updatedItemNowchecked = { ...item };
    updatedItemNowchecked.checked = !updatedItemNowchecked.checked;
    // Create a copy of itemsAdded for modification
    const updatedGroupedProducts = { ...itemsAdded };
    console.log(updatedGroupedProducts)
    if(updatedItemNowchecked.checked){
      setCompletedTask([...completedTask,updatedItemNowchecked])
    }
    else{
      const Filtro = completedTask?.filter((it)=> it._id !== item._id )
      setCompletedTask(Filtro)
    }

    // Update the checked status in the copied itemsAdded object
    updatedGroupedProducts[item.category][index] = updatedItemNowchecked;
    setItemsAdded(updatedGroupedProducts);
    const newList = Object.keys(updatedGroupedProducts)
      .map((category) => updatedGroupedProducts[category])
      .flat();
    setIsChecked(
      Object.keys(itemsAdded).some((category) =>
        itemsAdded[category].some((item) => item.checked === true)
      )
    );
    dispatch({ type: "UPDATE_CART", payload: newList });
  };

  useEffect(() => {
    const groupProductsByCategory = () => {
      return state?.cart?.reduce((grouped, product) => {
        const category = product.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(product);
        setItemsAdded(grouped);
        return grouped;
      }, {});
    };
    groupProductsByCategory();
  }, [state?.cart]);

  useEffect(() => {
    ScrollToBottom();
  }, [HandleAddItem]);


  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col gap-5 SideRightBar pb-16 "
      style={{
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {itemsAdded &&
        Object.keys(itemsAdded).map((category, index) => (
          <>
            <h1 className="text-gray-500 px-3">
              {category === "fruit" ? "Fruit and vegetables" : category}
            </h1>
            <ul key={index} className="grid grid-cols-1 gap-6 ">
              {itemsAdded[category].map((item, index) => (
                <li
                  className="flex justify-between  gap-3 items-center px-3"
                  key={item._id}
                >
                  {editar && (
                    <label key={item._id}>
                      <input
                        type="checkbox"
                        name={item.name}
                        className="w-6 h-6 "
                        onChange={(e) => handleCheckboxChange(e, item, index)}
                      />
                    </label>
                  )}
                  <p
                    className={`text-xl truncate ${
                      item.checked && " line-through "
                    }`}
                  >
                    {item.name}
                  </p>
                  <ToggleButton item={item} />
                </li>
              ))}
            </ul>
          </>
        ))}
    </div>
  );
}

export default AddedProducts;
