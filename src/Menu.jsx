import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react';
import './Menu.css'

const transformButton = () => {
    let parent = document.getElementById("menu-toggle");
    parent.classList.toggle("change");
}

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>    
    <div className="relative inline-block h-[7vh] w-full bg-[#64c5b1]">
      <button
        id="menu-toggle"
        onClick={() => {
            setIsOpen(!isOpen);
            transformButton();
        }}
        className="inline-block h-full w-[8vh] px-[11px] text-base font-medium bg-[#64c5b1] hover:bg-[#54a594] focus:outline-none float-left"
      >
        <div id="toggle-icon">
            <div id="menu-toggle-bar1"></div>
            <div id="menu-toggle-bar2"></div>
            <div id="menu-toggle-bar3"></div>
        </div>
      </button>
      <CSSTransition in={isOpen} timeout={300} classNames="slide-in-menu" unmountOnExit>
        <div className="fixed left-0 h-[100vh] w-48 bg-gray-700 rounded-r top-[7vh]">
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-100 rounded-tr"
          >  
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-100"
          >
            Settings
          </a>
        </div>
      </CSSTransition>
      <div
        id="app-name" 
        className="inline-block h-full py-[14px] px-[11px] w-[50%] align-middle text-white"
      >
          SMMO Player Data
      </div>
      <div
        id="input-box"
        className="align-middle h-full py-[5px] inline-block float-right px-[2vh]"
      >
      
        <form class="flex items-center">   
            <label for="simple-search" class="sr-only text-white">User ID</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" class="bg-[#54a594] border border-white text-white text-sm rounded-l-full focus:outline-none block w-full pl-10 p-2.5 placeholder-white" placeholder="Search" required></input>
            </div>
            <button type="submit" class="p-2.5 text-sm font-medium border border-white text-white bg-[#54a594] rounded-r-full hover:bg-[#64c5b1] focus:outline-none focus:bg-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="sr-only text-white">Search</span>
            </button>
        </form>

      </div>
    </div>
    <br></br>
    </>
  );
}

export default Menu;