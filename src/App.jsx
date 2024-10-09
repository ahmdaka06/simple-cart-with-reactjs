import react, { useState, useEffect } from 'react'
import './App.css'

import Navbar from './component/Navbar'
import Product from './component/Product'
import Cart from './component/Cart';
import axios from 'axios';

function App() {
  // state
  const initCart = () => JSON.parse(localStorage.getItem('carts')) || [];
  const [carts, setCarts] = useState(initCart);
  const [products, setProducts] = useState([]);

  // hooks
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      // setDarkMode(true);
      document.querySelector('body').classList.add('dark');
    } else {
      // setDarkMode(false);
      document.querySelector('body').classList.remove('dark');
    }
    window.localStorage.setItem('carts', JSON.stringify(carts))
    listProducts();
  }, [carts]);

  const addToCart = async (item) => {
    const index = carts.findIndex(cart => {
      return cart.id == item.id;
    });
    if (index !== -1) {
      const productPrice = products.find(p => p.id == item.id).price;
      carts[index].quantity = carts[index].quantity + 1;
      carts[index].price = productPrice * carts[index].quantity;
      setCarts([...carts])
    } else {
      setCarts([...carts, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      }]);
    }
  }

  const listProducts = async () => {
    try {
      const response = await fetch('../json/product.json');
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching product list:', error);
      return [];
    }
  }

  const removeCartItem = async (id) => {
    setCarts(carts.filter(i => i.id !== id))
  }

  const reduceCartItem = async (id) => {
    const index = carts.findIndex(cart => {
      return cart.id == id;
    });
    const productPrice = products.find(p => p.id == id).price;
    if (index !== -1) {
      carts[index].quantity = carts[index].quantity == 1 ? 1 : carts[index].quantity - 1;
      carts[index].price = carts[index].quantity == 1 ? productPrice : carts[index].price - productPrice;
    }
    setCarts([...carts])
  }

  const totalCart = () => {
    return carts.reduce((total, item) => total + item.price, 0);
  }
  
  return (
    <div className="h-max lg:h-screen md:h-screen sm:h-full w-full dark:text-white">
      <Navbar />
      <div className='container mx-auto mt-5 px-5'>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-10">
          <Product 
            addToCart={addToCart} 
            products={products}
          />
          <Cart 
            carts={carts} 
            addToCart={addToCart} 
            reduceCartItem={reduceCartItem} 
            removeCartItem={removeCartItem}  
            totalCart={totalCart}
          />
        </div>
        
      

      </div>
      
    </div>
  )
}

export default App
