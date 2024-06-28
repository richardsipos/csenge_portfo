import axios from "axios";
// console.log(process.env.urlReactApp)



const newRequest = axios.create({
  baseURL: "http://localhost:8800/api/",        //Development
  // baseURL: "https://csengealmasi.com/api/",  //Production
  withCredentials: true, 
})

export default newRequest;