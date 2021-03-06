import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import { red } from '@mui/material/colors';

import './Cus_product_confirm.scss';

function Cus_product_confirm(props) {
  const {lastInsertID,setLastInsertID} = props
  const [cusData,setCusData]=useState({})


  

 useEffect(()=>{
  console.log(lastInsertID);
   axios.get(`http://localhost:3000/custom/confirm?sid=${lastInsertID}`).then((res)=>{
  console.log(res.data)
   setCusData(res.data[0])
   })

 },[])


  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0">
          <div className="d-flex flex-wrap px-5">
            <div className="left col-12 col-sm-6 p-0 pe-sm-5 ">
           

              
              <h2>CUSTOM PRODUCT <br/> DETAIE</h2>
              <p>Created at {cusData.created_date} </p>
              <div className="cusdetail-pic col-12 col-sm-6">
                <img
                  src={`http://localhost:3000/custom/${cusData.back_img}`}
                  className="img-fluid"
                />
               
              </div>

              <div className="attribuies">
                <p>Project Name</p>
                <h3>{cusData.custom_product_name}</h3>
              </div>
  
            </div>
            <div className="right col-12 col-sm-6 d-flex flex-column ">
              <div className="cus-confirm-detail">
              
                <div className="attribuies">
                  <h4>Wheel</h4>
                  <div className="attribuie">
                    <img
                      src={`/imgs/Customized/display_${cusData.wheel_style}.png`}
                      className="cus-deteil-img"
                    />
                    <p>{cusData.wheel_style}</p>
                  </div>
                </div>

                <div className="attribuies">
                  <h4>Carrier</h4>
                  <div className="attribuie">
                    <img
                      src={`/imgs/Customized/carrier_${cusData.carrier}.png`}
                      className="cus-deteil-img"
                    />
                    <p>{cusData.carrier}</p>
                  </div>
                </div>

                <div className="attribuies">
                  <h4>Front Deck Color</h4>
                  <div className="attribuie">
                    <div
                      className="cus-deteil-color"
                      style={{ backgroundColor: `${cusData.front_color}` }}
                    ></div>
                    <p>{cusData.front_color}</p>
                  </div>
                </div>

                <div className="attribuies">
                  <h4>Back Picture</h4>
                  <div className="back-details">
                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/${cusData.back_style}.png`}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_style}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/pattern/${cusData.back_pattern}.png`}
                          style={{ backgroundColor: '#123456' }}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_pattern}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <div
                          className="cus-deteil-color"
                          style={{ backgroundColor: `${cusData.back_color}` }}
                        ></div>
                        <p>{cusData.back_color}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/sticker/${cusData.back_sticker}.png`}
                          style={{ backgroundColor: '#123456' }}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_sticker}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/sticker/Dot.png`}
                          style={{ backgroundColor: '#123456' }}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_text}</p>
                      </div>
                    </div>
                    
    
                  </div>
                </div>
              </div>

              <div className="detail_btn">
                <Link to={'/customized/explore'}>
                  <button className="viv-btn">Explore</button>
                </Link>
                <button className="viv-btn">Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cus_product_confirm;
