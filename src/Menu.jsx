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
    <div className="relative flex-1">
      <button
        id="menu-toggle"
        onClick={() => {
            setIsOpen(!isOpen);
            transformButton();
        }}
        className="inline-block px-3 py-2 text-base font-medium bg-gray-500 text-gray-700 hover:bg-gray-400 focus:outline-none focus:text-gray-900 focus:bg-gray-400"
      >
        <div id="toggle-icon">
            <div id="menu-toggle-bar1"></div>
            <div id="menu-toggle-bar2"></div>
            <div id="menu-toggle-bar3"></div>
        </div>
      </button>
      <CSSTransition in={isOpen} timeout={300} classNames="menu" unmountOnExit>
        <div className='w-[200px] h-[100%] top-[50px] bg-[#343c49] text-white fixed p-0 tansition-transform duration-500'>
        {/* <div className="fixed left-0 h-[100vh] py-2 w-48 bg-gray-500 rounded-r shadow-xl"> */}
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            Settings
          </a>
        </div>
      </CSSTransition>
      <div className="inline-block">
        Inline Text
      </div>
    </div>
  );
}

export default Menu;