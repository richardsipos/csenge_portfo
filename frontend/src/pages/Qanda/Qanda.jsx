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
  const [isDeleting, setIsDeleting] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["qandas"],
    queryFn: () =>
      newRequest.get(`/qandas`).then((res) => {
        return res.data;
      }),
  });

  const handleSave = async () => {
    try {
      await newRequest.patch(`/qandas/${chooseQanda.id}`,chooseQanda);
      refetch();
    } catch (error) {
      console.error("Error updating Q&A pair:", error);
    }
  };

  const handleCreateQanda = async () => {
    try {
      await newRequest.post("/qandas", {
        questions: minRef.current.value,
        answers: maxRef.current.value,
      });
      setOpen(false);
      refetch(); // Fetch the updated data after posting a new Q&A
    } catch (error) {
      console.error("Error creating Q&A pair:", error);
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
                <button onClick={handleCreateQanda}>
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
                      if (isDeleting) return;
                          setIsDeleting(true);
                          try {
                            await newRequest.delete(`/qandas/${qanda.id}`);
                            setIsDeleting(false);
                            refetch();
                          } catch (error) {
                            if (error.response && error.response.status === 404) {
                              console.error("Qanda post not found:", error);
                            } else {
                              console.error("Error deleting qanda post:", error);
                            }
                          } ;
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
            <button onClick={()=>setOpenQandaPreview(!openQandaPreview)}>Preview</button>
            {openQandaPreview &&
              <div className="previewQanda">
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
                  .filter((qanda, index) => index % 2 === 0)
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
          {isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : data
                  .filter((qanda, index) => index % 2 === 1)
                  .map((qanda) => ( qanda.display === true &&
                    <div className="questionAnswer" key={qanda.id}>
                      <h4>{qanda.questions}</h4>
                      <p>{qanda.answers}</p>
                    </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qanda;
