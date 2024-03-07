import React, { useEffect, useRef, useState } from "react";
import "./Qanda.scss";
import { qanda } from "../../assets/data";
import bambus_qa from "../../assets/img/bambus_qa.jpg";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";


const Qanda = () => {

  const [sort, setSort] = useState("id");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["qandas"],
    queryFn: () => newRequest.get(`/qandas`).then((res) => {
          console.log(search)
          console.log(res);
          return res.data;
        }),
      
      // newRequest
      //   .get(
      //     `/qandas${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
      //   )
      //   .then((res) => {
      //     console.log(search)
      //     console.log(res);
      //     return res.data;
      //   }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };


  return (
    <div className="qandaPage">
      <div className="qandaPageTitle">
        <h1>Q&A</h1>
      </div>
      <div className="qandaPageContent">
        <div className="qandaCol1">
          <div className="qandaRow">


            {/* {qanda
              .slice(0, 10)
              .filter((qa, index) => index % 2 === 0)
              .map((qa, index) => (
                <div className="questionAnswer" key={index}>
                  <h4>{qa.questions}</h4>
                  <p>{qa.answers}</p>
                </div>
              ))} */}
            {console.log(data)}
            {isLoading ? (
              "loading"
            ) : error ? (
              "Something went wrong!"
            ) : ( data
              .slice(0, 10)
              .filter((qanda, index) => index % 2 === 0)
              .map((qanda) => 
                <div className="questionAnswer" key={qanda.id}>
                  <h4>{qanda.questions}</h4>
                  <p>{qanda.answers}</p>
                </div>
              )
            )}


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
