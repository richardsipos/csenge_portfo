import axios from "axios";

const upload = async (file,from,idToUse) => {
  const data = new FormData();

  const fileName = `${idToUse}1.png`;
  data.append("file", file);
  
  if(from === "recipes"){
    data.append("upload_preset", "recipes");
  }   

  try {
    console.log("Before axios post upload.js")
    const res = await axios.post("https://api.cloudinary.com/v1_1/dyei5xnce/image/upload", data);// import.meta.env.VITE_UPLOAD_LINK
    console.log("After axios post upload.js")
    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;