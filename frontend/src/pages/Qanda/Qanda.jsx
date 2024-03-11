import React, { useEffect, useRef, useState } from "react";
import "./Qanda.scss";
import { qanda } from "../../assets/data";
import bambus_qa from "../../assets/img/bambus_qa.jpg";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

const Qanda = () => {
  const [open, setOpen] = useState(false);
  const [openQandaPreview, setOpenQandaPreview] = useState(false);
  const [chooseQanda, setChooseQanda] = useState(null);
  const minRef = useRef();
  const maxRef = useRef();

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["qandas"],
    queryFn: () =>
      newRequest.get(`/qandas`).then((res) => {
        console.log(search);
        console.log(res);
        return res.data;
      }),
  });

  const handleSave = async () => {
    try {
      // Perform the PATCH request with the updated form data
      await newRequest.patch(`/qandas/${chooseQanda.id}`,chooseQanda);
      // Refetch the data to update the UI
      refetch();
    } catch (error) {
      console.error("Error updating Q&A pair:", error);
    }
  };


  return (
    <div className="qandaPage">
      {currentUser && currentUser.isAdmin && (
        <div className="adminDashboard">
          <div className="adminTitle">
            Admin Dashboard
          </div>
          <div className="functions">
          <div className="createQanda">
            <button onClick={() => setOpen(!open)}>Create Q&A</button>
            {open && (
              <div className="createQandaForm">
                <input type="text" placeholder="Question" ref={minRef} />
                <input type="text" placeholder="Answer" ref={maxRef} />
                <button
                  onClick={async () => {
                    newRequest.post("/qandas", {
                      questions: minRef.current.value,
                      answers: maxRef.current.value,
                    });
                    refetch();
                    setOpen(false);
                  }}
                >
                  Create
                </button>
              </div>
            )}
          </div>
          <div className="deleteQanda">
           { isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : data.map((qanda) => ( 
                <div className="deleteQandaForm" key={qanda.id}>
                  <h4>{qanda.questions}</h4>
                  <button
                    onClick={async () =>{
                      await newRequest.delete(`/qandas/${qanda.id}`);
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                </div>
            ))}
          </div>
          <div className="chooseQanda">
          
          <select onChange={(e) => {
                setOpenQandaPreview(false);
                setChooseQanda(data.find(qanda => qanda.id == e.target.value));            
              }}>
          
              {
               !isLoading && data.map((qanda) => (
                  <option value={qanda.id}>{qanda.questions}</option>
                ))
              }
            </select>
            <button onClick={()=>setOpenQandaPreview(true)}>Preview</button>
            {openQandaPreview &&
              <div className="previewQanda">
                OPEN PREVIEW
                {console.log(chooseQanda)}
                <div className="chooseQandaTitle">
                  {chooseQanda.title}
                </div>
                <div className="chooseQandaQuestions">
                  {chooseQanda.questions}
                </div>
                <div className="chooseQandaAnswers">
                  {chooseQanda.answers}
                </div>
                <div className="chooseQandaDisplay">
                  <label>Display </label>
                  <input
                    type="checkbox"
                    checked={chooseQanda.display}
                    onChange={()=>setChooseQanda({...chooseQanda, display: !chooseQanda.display})}
                  />
                </div>
                <button onClick={handleSave}>Save</button>
              </div>
              
            }
            
          </div>
          </div>
          
        </div>
      )}
      <div className="qandaPageTitle">
        <h1>Q&A</h1>
      </div>
      <div className="qandaPageContent">
        <div className="qandaCol1">
          <div className="qandaRow">
            {isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : data
                  .map((qanda) => ( qanda.display === true &&
                    <div className="questionAnswer" key={qanda.id}>
                      <h4>{qanda.questions}</h4>
                      <p>{qanda.answers}</p>
                    </div>
                  ))}
          </div>
          <div className="qandaDetails">
            <h5>Only advices</h5>
            <p>
              Neked az jó, amikor a hajad kakaó, A kezed a kalács, a szemed
              apanázs, Pizsamád és a konyha, mamád telefonja, Tisztán tartod a
              lakást.
            </p>
          </div>
        </div>
        <div className="qandaCol2">
          <img src={bambus_qa}></img>
        </div>
        <div className="qandaCol3">
          <div className="qandaDetails">
            <h5>Ask me anything:</h5>
            <p>
              Nekem meg a döcögő bókok, a kacagó kócok, A vacogó violák, a
              pocakos triolák kellenek, Az elásított szeretlekek, a vétlen kis
              véletlenek.
            </p>
          </div>
          <div className="qandaRow">
            {qanda
              .slice(0, 10)
              .filter((qa, index) => index % 2 === 1)
              .map((qa, index) => (
                <div className="questionAnswer" key={index}>
                  <h4>{qa.questions}</h4>
                  <p>{qa.answers}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qanda;
