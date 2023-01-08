import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react';
import './Menu.css'

const transformButton = () => {
    let parent = document.getElementById("menu-toggle");
    parent.classList.toggle("change");
}

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const event = new CustomEvent('emit', { detail: { id: inputValue } });

  const handleClick = () => {
    setIsOpen(!isOpen);
    transformButton();
  }

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.dispatchEvent(event);
  }

  return ( 
    <div className="absolute inline-block h-12 w-full m-0 p-0 bg-[#64c5b1]">
      <button
        id="menu-toggle"
        onClick={handleClick}
        className="inline-block h-full w-12 px-[6px] text-base font-medium bg-[#64c5b1] hover:bg-[#54a594] focus:outline-none float-left"
      >
        <div id="toggle-icon">
            <div id="menu-toggle-bar1"></div>
            <div id="menu-toggle-bar2"></div>
            <div id="menu-toggle-bar3"></div>
        </div>
      </button>
      <CSSTransition in={isOpen} timeout={300} classNames="slide-in-menu" unmountOnExit>
      <div id="menu"
        className="fixed left-0 h-[100vh] w-48 bg-gray-700 rounded-r top-12 z-50">
        <div
          className="cursor-pointer text-sm text-white p-[10px] w-[100%] h-12 rounded-bl-lg border-b-[3px] border-[#2c313e] hover:bg-[#2c313e] hover:rounded-r"
          id="home-menu-item">
          <i className="fa-solid fa-house !w-[25px]"></i>Home
        </div>
        <div
          className="cursor-pointer text-sm text-white p-[10px] w-[100%] h-12 rounded-bl-lg border-b-[3px] border-[#2c313e] hover:bg-[#2c313e]"
          id="stats-menu-item">
          <i className="fa-solid fa-chart-column !w-[25px]"></i>Stats
        </div>
        <div
          className="cursor-pointer text-sm text-white p-[10px] w-[100%] h-12 rounded-bl-lg border-b-[3px] border-[#2c313e] hover:bg-[#2c313e]"
          id="users-menu-item">
          <i className="fa-solid fa-user !w-[25px]"></i>Users
        </div>
        <div
          className="absolute bottom-12 cursor-pointer text-sm text-white p-[10px] w-[100%] h-12 rounded-bl-lg border-b-[3px] border-[#2c313e] hover:bg-[#2c313e]"
          id="settings-menu-item">
          <i className="fa-solid fa-screwdriver-wrench !w-[25px]"></i>Settings
        </div>
      </div>
      </CSSTransition>
      <div
        id="input-box"
        className="align-middle h-full py-[5px] w-[80%] inline-block float-right"
      >
        <button className="inline-block float-right relative bottom-full h-12 pb-[10px] px-[3px] top-0 mx-2 rounded z-1">
          <FontAwesomeIcon 
            icon={faCircleUser} 
            href="#"
            className="h-full w-full bg-[#64c5b1] text-[#54a594] hover:text-white" />
        </button>
        
        <form 
          className="flex items-center float-right w-[50%] z-10 max-w-[200px]"
          onSubmit={handleSubmit}
        >   
            <label htmlFor="simple-search" className="sr-only text-white">User ID</label>
            <div className="relative w-full m-0">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                </div>
                <input 
                  type="text" 
                  id="simple-search" 
                  onChange={handleChange}
                  className="bg-[#54a594] border border-white text-white text-sm rounded-l-full focus:outline-none block w-full h-8 pl-10 p-2.5 placeholder-white" 
                  placeholder="Search" 
                  required
                >
                </input>
            </div>
            <button type="submit" className="px-2 h-8 text-sm font-medium border border-white text-white bg-[#54a594] rounded-r-full hover:bg-[#64c5b1] focus:outline-none focus:bg-[#76ebd3]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only text-white">Search</span>
            </button>
        </form>
      </div>
    </div>
  );
}

export default Menu;