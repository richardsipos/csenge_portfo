import './Home.scss'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { recipes } from '../../assets/data';
import PaginatedItems from '../../components/Paginator/PaginatedItems.jsx'


const Home = () => {
  
  return (
    <div className='homePage'>
      <div className="firstPreview">
        <img className="motivationalImage" src={recipes[0].images[0]}></img>
        <div className="motivationalQuoute">
          <h1>Mondom mivan!</h1>
        </div>
      </div>
      <div className="firstPreview">
        <div className="motivationalQuoute">
          <h1>Igenis fontos az egeszseges kajalas!</h1>
        </div>
        <img className="motivationalImage" src={recipes[0].images[0]}></img>
      </div>
      
      <div className="blogPosts">
        <div className="title">
          <h1>Legujabb infok!</h1>
        </div>
        <div className="posts">
          {/* <PaginatedItems itemsPerPage={4} />, */}
        </div>
      </div>
    </div>
  )
}

export default Home