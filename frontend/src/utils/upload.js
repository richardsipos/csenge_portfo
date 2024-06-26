import axios from "axios";

const upload = async (file,from,idToUse) => {
  const data = new FormData();

  const fileName = `${idToUse}_1.png`;
  data.append("file", file);
  
  if(from === "recipes"){
    data.append("upload_preset", "recipes");
  }else if(from === "blogs"){
    data.append("upload_preset", "csenge_portfo_blogs");
  }

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dyei5xnce/image/upload", data);// import.meta.env.VITE_UPLOAD_LINK
    const { url } = res.data;
    return url;
  } catch (err) {
    console.error(err);
  }
};

export default upload;