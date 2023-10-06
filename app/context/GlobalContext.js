"use client";
import React, { createContext, useContext, useEffect, useLayoutEffect, useReducer, useState } from "react";
import Reducer, { initialState } from "../reducer/Reducer";
import useProductsHook from "../customHooks/useProductsHook";
import { UseDialog } from "./DialogContext";
import { toast } from 'react-toastify';

const GlobalContext = createContext({});

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { HandleCloseSideDialog } = UseDialog();
  const [inputName, setInputName] = useState("")
  const {allProducts, setAllProducts} = useProductsHook("api/products")
  const [myChanges, setMyChanges] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editar, setEditar] = useState(false)
  const [itemsAdded, setItemsAdded] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [resizeWith, setResizeWith] = useState(true)
  const [historyData, setHistoryData] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [completedTask, setCompletedTask] = useState([])
  const [datosStatistic, setDatosStatistic] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [currentValue, setCurrentValue] = useState("");

  const HandleResize = () => {
    if (window.innerWidth <= 960) {
      setResizeWith(false)
    }
    else{
      setResizeWith(true)
    }
  }
  useEffect(() => {
    const HandleGetHistory =async () =>{
        const response = await fetch("/api/myprod-list")
        if (response.ok) {
          const data = await response.json()
          setHistoryData(data.products)
        }
    }
    HandleGetHistory()
    }, [])

  useEffect(() => {
    window.addEventListener('resize', HandleResize)

    return () => {
      window.removeEventListener('resize', HandleResize)
    }
  },[])

  const [getProductValues, setGetProductValues] = useState({
    name: "",
    note:"",
    image:"",
    category:"",
    checked:false,
  })


  const HandleAddNewProducts =async (e)=>{
    const payload = {
      name:getProductValues.name,
      description:getProductValues.note,
      imageURL:getProductValues.image,
      category:getProductValues.category?.toLowerCase(),
      price:"35.99",
      checked:false,
    }
    setMyChanges(payload)
    const response = await fetch('api/add-products',{
      method: 'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...payload})
  })
  
  if (response.ok) {
      console.log("Success")
      toast.success("Successfully Added");
  }
  }


  useEffect(() => {
    if (allProducts?.products) {
      setAllProducts(({...allProducts, products:[...allProducts?.products, myChanges]}))
    }
  }, [myChanges])

  const HandleSubmit = (e)=>{
    e.preventDefault()
    if (inputName !== "") {
      toast.success("Successfully Saved");
      const currentName = localStorage.getItem("NewCartName")
      const PreviousCartName = currentName ? currentName : null
      try {
        if (currentName) {
          localStorage.removeItem("NewCartName")
          localStorage.removeItem(PreviousCartName)
        }
        localStorage.setItem(inputName, JSON.stringify(state.cart));
        localStorage.setItem("NewCartName", inputName)
      } catch (error) {
        console.log(error)
        toast.error("Error please refresh and try again ");

      }
    }
  }



  const HandlePost = async({status})=>{
    const NewList = completedTask.map(({updatedAt, createdAt,__v,...rest})=> ({updatedAt, createdAt,__v,...rest}))
    const timestamp = Date.now();
    const currentDate = new Date(timestamp).toISOString()

    const payload = {
      name:localStorage.getItem("NewCartName") || inputName,
      products:NewList,
      completed:status,
      createdAt:currentDate,
      updatedAt:currentDate
    }
    
    const response = await fetch("/api/product-list",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    })
    if (response.ok) {
      const data = await response.json()
      console.log("response successfully returned")
      try {
        setHistoryData([...historyData,payload])
      } catch (error) {
        console.log("there was an error on confirm")
      }
    }
  }


  const HandleAddItem = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    toast.success(`Successfully Added ${item.name}`);
  };

  const HandleRemove = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
    toast.success(`Successfully Removed ${item.name}`);
  };
  const HandleIncrease = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
    toast.success(`Successfully Increased to ${item.quantity + 1}`);
  };
  const HandleDecrease = (item) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
    toast.success(`Successfully Decreased to ${item.quantity - 1}`);
  };
  const HandleClear = (item) => {
    dispatch({ type: "CLEAR_CART", payload: item });
    toast.success(`Successfully Cleared`);
  }
  useEffect(() => {
    const Handlereduce = ()=>{
      const FullData = Object.entries(historyList).reduce((acc,[,items])=>{
        const prodData = items.map((prod)=> ({name: prod.name, completed:prod.completed, products:prod.products, createdAt:prod.createdAt }))
        const Response = prodData.flatMap((it)=> it.products.map(({name,quantity,category})=> ({date:it.createdAt, name,quantity,completed:it.completed,category})))
        return Response.filter((i)=> i.completed !== false)
      },{})
      setDatosStatistic(FullData)
    }


    Handlereduce()
  }, [historyList])

  useEffect(() => {
    const currentName = localStorage.getItem("NewCartName")
    const CartSaved = JSON.parse(localStorage.getItem(currentName))

    const HandleSavedLst = ()=>{
      try {
        if (state?.cart.length === 0 && CartSaved) {
          state.cart = [...CartSaved]
        }
        
      } catch (error) {
        console.log("error:",error)
      }
    }
    HandleSavedLst()
  }, [])

  useEffect(() => {
    const HandleHistoryList = () => {
      //console.log(historyData)
      return historyData?.reduce((acc, item) => {
        const dateObj = new Date(item.createdAt);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const NewDate = year + "-" + month;
        //const date = dateObj.toLocaleDateString()

        if (!acc[NewDate]) {
          acc[NewDate] = [];
        }
        acc[NewDate].push(item);
        setHistoryList(acc);
        return acc;
      }, {});
    };
    HandleHistoryList();
  }, [historyData]);

  return (
    <GlobalContext.Provider
      value={{
        HandleAddItem,
        HandleRemove,
        HandleIncrease,
        HandleDecrease,
        state,
        inputName, setInputName,
        HandleSubmit,
        HandleClear,
        getProductValues, setGetProductValues,
        HandleAddNewProducts,
        allProducts,
        selectedProduct, setSelectedProduct,
        editar, setEditar,
        itemsAdded, setItemsAdded,
        isChecked, setIsChecked,
        dispatch,resizeWith,
        historyData, setHistoryData,
        historyList, setHistoryList,
        completedTask, setCompletedTask,
        HandlePost,
        datosStatistic, setDatosStatistic,
        searchValue, setSearchValue,
        currentValue, setCurrentValue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
export const UseGlobal = () => useContext(GlobalContext);


