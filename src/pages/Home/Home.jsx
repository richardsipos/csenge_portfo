import './Home.scss'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { recipes } from '../../assets/data';
import { blogs } from '../../assets/data';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { HiChevronUp,HiChevronDown } from "react-icons/hi2";


const Home = () => {

  const [blogMiddle, setBlogMiddle] = useState(1);

  const handleArrowDown = () => {
    if (blogMiddle < blogs.length - 2) {
      console.log(blogMiddle)
      setBlogMiddle(blogMiddle + 1);
    }
  };

  const handleArrowUp = () => {
    if (blogMiddle > 1) {
      setBlogMiddle(blogMiddle - 1);
    }
  };

  return (
    <div className='homePage'>
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
      
      <div className="blogPosts">
        <div className="title">
          <p>Latest news!</p>
        </div>
        <div className="posts">
          <div className="readScreen">
              <Swiper className="mySwiperLeftFull" >
                {blogs[blogMiddle].images.map((img,index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <img src={img} alt="" />
                    </SwiperSlide>
                  ))}
              </Swiper>
          </div>
          <div className="scrollScreen">
                {blogMiddle > 1 ? <HiChevronUp className={'topArrow' + ' arrow'} onClick={handleArrowUp}/> : ""} 
                <Swiper className="mySwiper" >  
                  {blogs[blogMiddle-1].images.map((img,index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <img src={img} alt="" className='upper'/>
                    </SwiperSlide>
                  ))}
                  
                </Swiper>
                <Swiper className="mySwiperMiddle" >
                  {blogs[blogMiddle].images.map((img,index) => (
                      <SwiperSlide key={index} className="swiper-slide">
                        <img src={img} alt="" />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper className="mySwiper" > 
                  {blogs[blogMiddle+1].images.map((img,index) => (
                      <SwiperSlide key={index} className="swiper-slide">
                        <img src={img} className='bottom' alt="" />
                      </SwiperSlide>
                    ))}
                    
                </Swiper>
                {blogMiddle<blogs.length-2 ? <HiChevronDown className={'bottomArrow' + ' arrow'} onClick={handleArrowDown}/> : ""}
                
          </div>

        </div>
        
      </div>
      <div className="qanda">
          <h1>Do you have a question? Contact me without remorse!</h1>
          <h2>But ofc check first if the question was already answered on my Q&A page</h2>
          
          <a href="/qanda"><button>Q&A</button></a>
      </div>
      <div className="recipes">
        <div className="homeText">
          <h2>Curious of new recipes? Check mines out!!! </h2>
          <a href="/recipes"><button>Recipes</button></a>
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
          <h2>If you only want to find out more about me, just check out my about page.</h2>
          <a href="/about"><button>About Me</button></a>
        </div>
      </div>
    </div>

  )
}

export default Home
