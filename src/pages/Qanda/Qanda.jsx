import React from 'react'
import './Qanda.scss'
import { qanda } from '../../assets/data';
import bambus_qa  from '../../assets/img/bambus_qa.jpg'


const Qanda = () => {
  return (
    <div className='qandaPage'>
      <div className="qandaCol1">
        <div className="qandaRow">
          {qanda.slice(0, 10).filter((qa, index) => index % 2 === 0).map((qa, index) => (
            <div className="questionAnswer" key={index}>
              <h4>{qa.questions}</h4>
              <p>{qa.answers}</p>
            </div>
          ))}
        </div>
        <div className="qandaDetails">
          <h5>Only advices</h5>
        <p>Neked az jó, amikor a hajad kakaó,
          A kezed a kalács, a szemed apanázs,
          Pizsamád és a konyha, mamád telefonja,
          Tisztán tartod a lakást.</p>
        </div>
      </div>
      <div className="qandaCol2">
        <img src={bambus_qa}></img>
      </div>
      <div className="qandaCol3">
        <div className="qandaDetails">
          <h5>Ask me anything:</h5>
          <p>Nekem meg a döcögő bókok, a kacagó kócok,
            A vacogó violák, a pocakos triolák kellenek,
            Az elásított szeretlekek, a vétlen kis véletlenek.</p>
        </div>
        <div className="qandaRow">
          {qanda.slice(0, 10).filter((qa, index) => index % 2 === 1).map((qa, index) => (
            <div className="questionAnswer" key={index}>
              <h4>{qa.questions}</h4>
              <p>{qa.answers}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Qanda