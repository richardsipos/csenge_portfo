import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import About  from './pages/About/About.jsx'
import Home   from  './pages/Home/Home.jsx'
import Recipes  from  './pages/Recipes/Recipes.jsx'
import Qanda  from './pages/Qanda/Qanda.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";


const components = {
  about: About,
  home : Home,
  recipes: Recipes,
  quandan: Qanda
}

function Layout(props){
  const TargetComponent = components[props.name]
  return(
    <>
      <Navbar/>
      <TargetComponent/>
      <Footer/>
    </>
  );
}

const router = createBrowserRouter ([
  {
    path:"/",
    element: <Layout name="home"/>,
    children:[],
  },
  {
    path:"/about",
    element: <Layout name="about"/>,
    children:[],
  },
  {
    path:"/recipes",
    element: <Layout name="recipes"/>,
    children:[],
  },
  {
    path:"/qanda",
    element: <Layout name="qanda"/>,
    children:[],
  },
]);

function App() {
  return (
    <div className="app">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
