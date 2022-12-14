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
  }, [carts]);

  const addToCart = async (item) => {
    const index = carts.findIndex(cart => {
      return cart.id == item.id;
    });
    if (index !== -1) {
      carts[index].quantity = carts[index].quantity + 1;
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

  const removeCartItem = async (id) => {
    setCarts(carts.filter(i => i.id !== id))
  }

  const reduceCartItem = async (id) => {
    const index = carts.findIndex(cart => {
      return cart.id == id;
    });
    if (index !== -1) {
      carts[index].quantity = carts[index].quantity == 1 ? 1 : carts[index].quantity - 1;
    }
    setCarts([...carts])
  }
  
  return (
    <div className="w-full dark:text-white">
      <Navbar />
      <div className='container mx-auto mt-5'>
        <div className="flex-auto py-24">
          <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1 sm:gap-5">
            <Product addToCart={addToCart} />
            <Cart carts={carts} addToCart={addToCart} reduceCartItem={reduceCartItem} removeCartItem={removeCartItem} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
