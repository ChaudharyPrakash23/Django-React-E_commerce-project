import { createContext, useContext, useState,useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const[total,setTotal]=useState(0);

    // fetch cart form backend

    const fetchCart= async()=>{
      try{
        const res=await fetch(`${BASEURL}/api/cart/`)
        if(!res.ok){
            throw new Error("failed to fetch cart")
        }
        const data=await res.json();
        setCartItems(data.item || [])
        setTotal(data.total || 0)
      }catch(error){
        console.error("Error fetching cart",error);
      }
    }
    useEffect(()=>{
        fetchCart();
    },[]);

    // Add Product to cart
    const addToCart =async (product) => {
        try{
            await fetch(`${BASEURL}/api/cart/add`,{
                method:'POST',
                headers:{
                    "content-type":"appliction/json",
                },
                body:JSON.stringify({product_id:productid})
            })
            fetchCart()
        }catch(error){
            console.log("Error adding to cart",error)
        }
    };

    // Remove product from cart
    const removeFromCart =async (itemId) => {
        try{
            await fetch(`${BASEURL}/api/cart/remove`,{
                 method:'POST',
                headers:{
                    "content-type":"appliction/json",
                },
                body:JSON.stringify({item_id:itemId})
            })
            fetchCart()
        }catch(error){
            console.log("Error removing cart",error)
        }
    };

    const updateQuantity=async (itemId,quantity)=>{
        if(quantity<1){
            await removeFromCart(itemId)
        }
        try{
            await fetch(`${BASEURL}/api/cart/update/`,{
                method:'POST',
                 headers:{
                    "content-type":"appliction/json",
                },
                body:JSON.stringify({item_id:itemId,quantity})

            })
            fetchCart()
        }catch(error){
            console.log('error updating cart', error)
        }
    }

    return (
        <CartContext.Provider value={{ cartItems,total,addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);