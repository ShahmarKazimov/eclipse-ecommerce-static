import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./components/header/header"
import Footer from "./components/footer/footer";
import './App.css'
import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {

  return (
    <Provider store={store}>

    <div>
      <div>
        <Header />
      </div>
      <Outlet />
      <div className=''>
        <Footer />
      </div>
    </div>
    </Provider>
  )

}

export default App