import React, { seState, useEffect }from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import './../App.css'

class Navbar extends React.Component {
  constructor(){
    super();
      this.state = {
        darkMode: false,
        dropdownMenu: false
      }
  }
  toggleDarkMode = () => {
   
  }

  setDarkMode = () => {
    // this.setState({
    //   darkMode: !this.state.darkMode
    // });
    console.log(localStorage.getItem('theme'));
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('body').classList.remove('dark');
      this.state.darkMode = false;
      localStorage.setItem('theme', 'light');
    } else {
      document.querySelector('body').classList.add('dark');
      this.state.darkMode = true;
      localStorage.setItem('theme', 'dark');
    }
  }
  setDrowdownMenu = () => {
    this.setState({
      dropdownMenu: !this.state.dropdownMenu
    });
  }
  
  render() {
    return (
      <div className='container mx-auto'>
        <div className="navbar bg-transparent">
          <div className="navbar-start">
            <div className="dropdown">
              <label className="btn btn-ghost lg:hidden text-gray-900 dark:text-gray-100" onClick={() => this.setDrowdownMenu(!this.state.dropdownMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-slate-900">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl dark:text-gray-100 ">Final Project</a>
          </div>
          <div className="navbar-end">
            <ul>
              <li>
                <BsFillMoonStarsFill
                  onClick={() => this.setDarkMode()}
                  className='cursor-pointer text-2xl dark:text-gray-100' 
                />
              </li>
            </ul>
          </div>
        </div>
        <div className='container'>
          <ul className={`menu w-100 p-2 rounded-box ${this.state.dropdownMenu ? '' : 'hidden'} lg:hidden`}>
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
      </div>
    )
  }
}


export default Navbar
