import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import HomePage from './views/Home/Home.jsx';
import DetailPage from './views/Detail/Detail.jsx';
import NavBar from "./components/NavBar/NavBar.jsx";
import FormRecipe from './views/FormRecipe/FormRecipe.jsx';
//import Search from './components/Search/Search.jsx';



function App() {
  const { pathname } = useLocation();

  return (
    <div className="app">
      {pathname!='/' && <NavBar/>}
    <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/recipe/:recipeName" element={<Search />} /> */}
          <Route path="/recipe/:recipeId" element={<DetailPage />} />
          <Route path="/create" element={<FormRecipe />} />
    </Routes>
    </div>
  );
};

export default App;

