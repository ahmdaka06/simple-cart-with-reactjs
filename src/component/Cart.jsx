import React from 'react'
import * as md from "react-icons/md";
import './../App.css'
import * as fa from "react-icons/fa";
import { currencyIDR } from './../utils/currency';

const Cart  = ({carts, addToCart, reduceCartItem, removeCartItem, products}) => {
    return (
        <div className="card-custom">
            <div className="card-body">
              <h2 className="card-title">Keranjang</h2>
              <hr />
              <div className="overflow-x-auto relative">
                <table className="table w-full  dark:text-slate-900">
                  <thead>
                    <tr>
                      <th>Nama Produk</th>
                      <th>Jumlah</th>
                      <th className="text-center">Harga</th>
                      <th className='text-center'>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    carts.map((cart) => (
                    <tr key={cart.id}>
                      <td>{ cart.name }</td>
                      <td>{ cart.quantity }</td>
                      <td>{ currencyIDR(cart.price) }</td>
                      <td className='text-center'>
                        <button 
                            className="btn btn-sm btn-success mx-2" 
                            onClick={
                                () => addToCart(cart)
                            }>
                            <fa.FaPlusCircle />
                        </button>
                        <button 
                            className="btn btn-sm btn-warning mx-2" 
                            onClick={
                                () => reduceCartItem(cart.id, )
                            } 
                            disabled={cart.quantity === 1}>
                            <fa.FaMinusCircle />
                        </button>
                        <button 
                            className="btn btn-sm btn-error mx-2" 
                            onClick={
                                () => 
                                removeCartItem(cart.id)
                            }>
                            <fa.FaTrash />
                        </button>
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
export default Cart;