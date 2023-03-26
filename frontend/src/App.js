import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import AllRoute from './MainRouter/AllRoute';

let auth=JSON.parse(localStorage.getItem("isAuth")) || false;

function App() {
  const [isAuth,setIsAuth]=React.useState(auth);
  return (
    <div className="App">
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <AllRoute isAuth={isAuth} setIsAuth={setIsAuth}/>
    </div>
  );
}

export default App;
