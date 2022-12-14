import react, { useState, useEffect } from 'react'
import './App.css'
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import Navbar from './component/Navbar'
import axios from 'axios';


function App() {
  // state
  const [products, setProducts] = useState([]);
  let [carts, setCarts] = useState([]);
 
  
  let localCarts = JSON.parse(localStorage.getItem('carts'));
  let listCarts = localCarts ?? []

  let listProducts = async () => {
    let request = await axios.get(`../json/product.json`);
    let response = request.data;
    setProducts(response);
  }

  const addToCart = async (item) => {
    // console.log(items);
    const index = listCarts.findIndex(cart => {
      return cart.id == item.id;
    });
    if (index !== -1) {
      listCarts[index].quantity = listCarts[index].quantity + 1;
    } else {
      listCarts.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }
    setCarts(listCarts)
    localStorage.setItem('carts', JSON.stringify(listCarts));
    // console.log(carts);
  }

  const removeCartItem = async (id) => {
    console.log(id);
    const carts = listCarts.filter(i => i.id !== id);
    setCarts(carts)
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  const reduceCartItem = async (id) => {
    const index = listCarts.findIndex(cart => {
      return cart.id == id;
    });
    if (index !== -1) {
      listCarts[index].quantity = listCarts[index].quantity == 1 ? 1 : listCarts[index].quantity - 1;
    }
    setCarts(listCarts)
    localStorage.setItem('carts', JSON.stringify(listCarts));
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      // setDarkMode(true);
      document.querySelector('body').classList.add('dark');
    } else {
      // setDarkMode(false);
      document.querySelector('body').classList.remove('dark');
    }
    listProducts();
    setCarts(listCarts)
  }, []);
  return (
    <div className="w-full dark:text-white">
      <Navbar />
      <div className='container mx-auto mt-5'>
        <div className="flex-auto py-24">
          <div className="grid lg:grid-cols-2 lg:gap-2 sm:grid-cols-1 sm:gap-5">
            <div className="card w-full bg-base-100 dark:bg-slate-800 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Produk</h2>
                <hr />
                <div className="overflow-x-auto">
                  <table className="table w-full  dark:text-slate-900">
                    <thead>
                      <tr>
                        <th>Nama Produk</th>
                        <th className='text-center'>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      products.map((index, id) => (
                      <tr>
                        <td>{ index.name }</td>
                        <td className='text-center'>
                          <button className="btn btn-custom-primary" onClick={() => addToCart(index)}><md.MdAddShoppingCart /></button>
                        </td>
                      </tr>
                      ))
                    }
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card w-full bg-base-100 dark:bg-slate-800 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Keranjang</h2>
                <hr />
                <div className="overflow-x-auto">
                  <table className="table w-full  dark:text-slate-900">
                    <thead>
                      <tr>
                        <th>Nama Produk</th>
                        <th>Jumlah</th>
                        <th className='text-center'>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      carts.map((index, id) => (
                      <tr>
                        <td>{ index.name }</td>
                        <td>{ index.quantity }</td>
                        <td className='text-center'>
                          <button className="btn btn-sm btn-success mx-2" onClick={() => addToCart(index)}><fa.FaPlusCircle /></button>
                          <button className="btn btn-sm btn-warning mx-2" onClick={() => reduceCartItem(index.id)}><fa.FaMinusCircle /></button>
                          <button className="btn btn-sm btn-error mx-2" onClick={() => removeCartItem(index.id)}><fa.FaTrash /></button>
                        </td>
                      </tr>
                      ))
                    }
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
