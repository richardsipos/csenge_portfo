import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import About  from './pages/About/About.jsx'
import Home   from  './pages/Home/Home.jsx'
import Recipes  from  './pages/Recipes/Recipes.jsx'
import Qanda  from './pages/Qanda/Qanda.jsx'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const components = {
  about: About,
  home : Home,
  recipes: Recipes,
  qanda: Qanda,
  login: Login,
  register: Register,
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
  {
    path: "/register",
    element: <Register name="register" />,
  },
  {
    path: "/login",
    element: <Login name="login"/>,
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="app">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
    </div>
  );
}

export default App;
