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
        <div class="overflow-x-auto relative"><div className="card-custom">
        <div className="card-body">
          <h2 className="card-title">Produk</h2>
          <hr />
          <div class="overflow-x-auto relative">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
      </div></div>
        
    )
}
export default Product;