import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import About  from './pages/About/About.jsx'
import Home   from  './pages/Home/Home.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";


const components = {
  about: About,
  home : Home
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
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
