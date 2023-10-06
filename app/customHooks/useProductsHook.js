import React, { useEffect, useState } from 'react'

export default function useProductsHook(api) {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch(api)
        if (response.ok) {
            const data = await response.json()
            setAllProducts(data)
        }
        
    }
    fetchProducts()
    }, [])
    
    return {allProducts, setAllProducts}
}
