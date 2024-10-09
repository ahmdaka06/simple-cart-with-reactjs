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
        <div className="overflow-x-auto relative">
          <div className="card-custom">
            <div className="card-body">
              <h2 className="card-title">Produk</h2>
              <hr />
              <div className="overflow-x-auto relative">
              <table className="table w-full  dark:text-slate-900">
                  <thead>
                    <tr>
                      <th>Nama Produk</th>
                      <th>Harga</th>
                      <th className='text-center'>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    products.map((product) => (
                    <tr key={product.id}>
                      <td>{ product.name }</td>
                      <td>{ product.price }</td>
                      <td className='text-center'>
                        <button className="btn btn-sm btn-success" onClick={() => addToCart(product)}><md.MdAddShoppingCart /></button>
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
        
    )
}
export default Product;