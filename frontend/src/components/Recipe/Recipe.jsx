import React from "react";
import "./Recipe.scss";
import Logo_csenge from "../../assets/img/logo_csenge.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Recipe = ({ props }) => {
  return (
    <div className="recipe">
      {props.id % 2 === 0 ? (
        <div className="recipeTopEven">
          <Swiper
            spaceBetween={30}
            slidesPerView={props.images.length}
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
            {props.images.length > 0 ? (
              props.images.map((imgsrc, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <img src={imgsrc} alt={`Swiper Image ${index}`} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="swiper-slide">
                <img src={Logo_csenge} alt="placeholder" />
              </SwiperSlide>
            )}
          </Swiper>

          <div className="ingredients">
            <h2>{props.title}</h2>
            <ul>
              {props.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="recipeTopOdd">
          <div className="ingredients">
            <h2>{props.title}</h2>
            <ul>
              {props.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
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
            {props.images.map((imgsrc, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <img src={imgsrc} alt={`Swiper Image ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="recipeBottom">
        <h2>Elkészítés:</h2>
        <p>{props.preparation}</p>
      </div>
    </div>
  );
};

export default Recipe;
