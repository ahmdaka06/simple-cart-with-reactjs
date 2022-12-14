import React, { useState, useEffect } from 'react'
import * as md from "react-icons/md";
import './../App.css'
import axios from "axios";

const Product  = ({addToCart}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts();
    }, []);
    let listProducts = async () => {
        let request = await axios.get(`../json/product.json`);
        let response = request.data;
        setProducts(response);
    }
    return (
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
                  products.map((product) => (
                  <tr key={product.id}>
                    <td>{ product.name }</td>
                    <td className='text-center'>
                      <button className="btn btn-custom-primary" onClick={() => addToCart(product)}><md.MdAddShoppingCart /></button>
                    </td>
                  </tr>
                  ))
                }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
}
export default Product;