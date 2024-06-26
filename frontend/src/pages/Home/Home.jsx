import "./Home.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { recipes } from "../../assets/data";
// import { blogs } from "../../assets/data";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { HiChevronUp, HiChevronDown } from "react-icons/hi2";

const Home = () => {
  //Backend part

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleUpload = async () => {
    setUploading(true);
    try {
      const maxId =
        data.reduce((max, recipe) => (recipe.id > max ? recipe.id : max), 0) +
        1;
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file, "blogs", maxId);
          return url;
        })
      );
      setUploading(false);
      const imageLinks = images.map((image) => String(image));
      return imageLinks;
    } catch (err) {
      return [];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageLinks = await handleUpload();

      await newRequest.post("/blogs", {
        images: imageLinks,
      });

      refetch();
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      newRequest.get(`/blogs`).then((res) => {
        return res.data.sort((a, b) => b.id - a.id);
      }),
  });

  const [blogMiddle, setBlogMiddle] = useState(1);

  const handleArrowDown = () => {
    if (blogMiddle < data.length - 2) {
      setBlogMiddle(blogMiddle + 1);
    }
  };

  const handleArrowUp = () => {
    if (blogMiddle > 1) {
      setBlogMiddle(blogMiddle - 1);
    }
  };

  return (
    <div className="homePage">
      <div className="firstPreview">
        <div className="motivationalImage">
          <img src={recipes[0].images[0]}></img>
        </div>
        <div className="motivationalQuoute">
          <h1>Mondom mivan!</h1>
        </div>
      </div>
      <div className="firstPreview">
        <div className="motivationalQuoute">
          <h1>Igenis fontos az egeszseges kajalas!</h1>
        </div>
        <div className="motivationalImage">
          <img src={recipes[0].images[0]}></img>
        </div>
      </div>
      {currentUser && currentUser.isAdmin && (
        <div className="adminSection">
          <div className="createBlogPost">
            <p>Add new blogposts:</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="">Upload Images:</label><br/>
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              /><br/>
              <br/>
              <button type="submit">Create</button>
            </form>
          </div>
          <div className="deleteBlogPost">
            <div className="deleteBlogPost">
              {isLoading
                ? "loading"
                : error
                ? "Something went wrong!"
                : data.map((blog, index) => (
                    <div className="deleteBlogRow" key={blog.id}>
                      <div className="deleteBlogPostForm">
                        <img src={blog.images[0]} alt={`Blog ${blog.id}`} />
                        <button
                          onClick={async () => {
                            if (isDeleting) return;
                            setIsDeleting(true);
                            try {
                              await newRequest.delete(`/blogs/${blog.id}`);
                              setIsDeleting(false);
                              refetch();
                            } catch (error) {
                              if (error.response && error.response.status === 404) {
                                console.error("Blog post not found:", error);
                              } else {
                                console.error("Error deleting blog post:", error);
                              }
                            } 
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
      <div className="blogPosts">
        <div className="title">
          <p>Latest news!</p>
        </div>
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong!"
          :  (
          <div className="posts">
            <div className="readScreen">
              <Swiper className="mySwiperLeftFull">
                {data[blogMiddle].images.map((img, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img src={img} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="scrollScreen">
              {blogMiddle > 1 ? (
                <HiChevronUp
                  className={"topArrow" + " arrow"}
                  onClick={handleArrowUp}
                />
              ) : (
                ""
              )}
              <div className="upperImageScroll">
                {data[blogMiddle-1] 
                ? <img src={data[blogMiddle-1].images[0]} className="top" alt="" />
                : (
                    <img src="" className="top" alt="" />
                )}
              </div>  
               
              <div className="middleImageScroll">
                {data[blogMiddle] 
                ? <img src={data[blogMiddle].images[0]} className="middle" alt="" />
                : (
                    <img src="" className="middle" alt="" />
                )}
              </div>
              <div className="bottomImageScroll">
                {data[blogMiddle+1] 
                ? <img src={data[blogMiddle+1].images[0]} className="bottom" alt="" />
                : (
                    <img src="" className="bottom" alt="" />
                )}
              </div>
                

              {blogMiddle < data.length - 2 ? (
                <HiChevronDown
                  className={"bottomArrow" + " arrow"}
                  onClick={handleArrowDown}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          )}
        </div>
      <div className="qanda">
        <h1>Do you have a question? Contact me without remorse!</h1>
        <h2>
          But ofc check first if the question was already answered on my Q&A
          page
        </h2>

        <a href="/qanda">
          <button>Q&A</button>
        </a>
      </div>
      <div className="recipes">
        <div className="homeText">
          <h2>Curious of new recipes? Check mines out!!! </h2>
          <a href="/recipes">
            <button>Recipes</button>
          </a>
        </div>
        <div className="homeImg">
          <div className="imgAndCaption">
            <img src={recipes[0].images[0]}></img>
            <p>~With love!~</p>
          </div>
        </div>
      </div>
      <div className="about">
        <div className="homeImg">
          <div className="imgAndCaption">
            <img src={recipes[0].images[0]}></img>
            <p>~With love!~</p>
          </div>
        </div>
        <div className="homeText">
          <h2>
            If you only want to find out more about me, just check out my about
            page.
          </h2>
          <a href="/about">
            <button>About Me</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
