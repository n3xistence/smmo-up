import React, { useState } from 'react';
import Menu from './components/Menu/Menu'
import Display from './components/Display/Display'

const handleEmit = () => {
  console.log("emited")
}

function App() {
  return (
    <>
      <Menu />
      <div className="h-full w-full bg-gray-500">
        <Display user={{ id: "261266" }} />
      </div>
    </>
  );
}

export default App;
