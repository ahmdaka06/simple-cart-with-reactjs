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
      <div className='container mx-auto mt-5 px-5'>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-10">
          <Product addToCart={addToCart} />
          <Cart carts={carts} addToCart={addToCart} reduceCartItem={reduceCartItem} removeCartItem={removeCartItem} />
          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Product name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Color
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Category
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="py-4 px-6">
                            Sliver
                        </td>
                        <td class="py-4 px-6">
                            Laptop
                        </td>
                        <td class="py-4 px-6">
                            $2999
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td class="py-4 px-6">
                            White
                        </td>
                        <td class="py-4 px-6">
                            Laptop PC
                        </td>
                        <td class="py-4 px-6">
                            $1999
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="py-4 px-6">
                            Black
                        </td>
                        <td class="py-4 px-6">
                            Accessories
                        </td>
                        <td class="py-4 px-6">
                            $99
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
        
      

      </div>
      
    </div>
  )
}

export default App
