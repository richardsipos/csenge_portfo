import React from 'react'
import './Qanda.scss'
import { qanda } from '../../assets/data';



import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Qanda = () => {
  return (
    <div className='qandaPage'>
      <div className="qandaCardsrow">
        {/* <div className="qandaCardsColumn"> */}
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            effect={"fade"}
            loop={true}
            navigation={true}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {qanda[0].images.map((imgsrc, index) => (
              <SwiperSlide className="swiper-slide">
                {" "}
                <img src={imgsrc} alt={`Swiper Image ${index}`} />{" "}
              </SwiperSlide>
            ))}
          </Swiper>
        {/* </div> */}
        <div className="qandaCardsColumn">
          szia almafa
        </div>
        {/* <div className="qandaCardsColumn"> */}
        <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            effect={"fade"}
            loop={true}
            navigation={true}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {qanda[0].images.map((imgsrc, index) => (
              <SwiperSlide className="swiper-slide">
                {" "}
                <img src={imgsrc} alt={`Swiper Image ${index}`} />{" "}
              </SwiperSlide>
            ))}
          </Swiper>
        {/* </div> */}
      </div>
      <div className="qandaCardsrow">
        <div className="qandaCardsColumn">
          szia almafa
        </div>
       {/* <div className="qandaCardsColumn"> */}
       <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            effect={"fade"}
            loop={true}
            navigation={true}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {qanda[0].images.map((imgsrc, index) => (
              <SwiperSlide className="swiper-slide">
                {" "}
                <img src={imgsrc} alt={`Swiper Image ${index}`} />{" "}
              </SwiperSlide>
            ))}
          </Swiper>
        {/* </div> */}
        <div className="qandaCardsColumn">
          szia almafa
        </div>
      </div>
      <div className="qandaCardsrow">
        {/* <div className="qandaCardsColumn"> */}
        <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            effect={"fade"}
            loop={true}
            navigation={true}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {qanda[0].images.map((imgsrc, index) => (
              <SwiperSlide className="swiper-slide">
                {" "}
                <img src={imgsrc} alt={`Swiper Image ${index}`} />{" "}
              </SwiperSlide>
            ))}
          </Swiper>
        {/* </div> */}
        <div className="qandaCardsColumn">
          szia almafa
        </div>
        {/* <div className="qandaCardsColumn"> */}
        <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            effect={"fade"}
            loop={true}
            navigation={true}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {qanda[0].images.map((imgsrc, index) => (
              <SwiperSlide className="swiper-slide">
                {" "}
                <img src={imgsrc} alt={`Swiper Image ${index}`} />{" "}
              </SwiperSlide>
            ))}
          </Swiper>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Qanda