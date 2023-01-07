import React from 'react';

import Menu from './components/Menu/Menu'
import Display from './components/Display/Display'

function App() {
  return (
    <>
      <Menu />
        <div className="h-full w-full bg-gray-500">
          <Display />
        </div>
    </>
  );
}

export default App;
