import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Cus_product_card from './Cus_product_card_sample';
import Cus_product_card_wheel from './Cus_product_card_wheel';
import Cus_product_card_fcolor from './Cus_product_card_fcolor';
import Cus_product_card_name from './Cus_product_card_name';
import axios from 'axios';

// `member_id`,
// `custom_product_name`,
// `wheel_style`,
// `carrier`,
// `front_color`,
// `back_style`,
// `back_text`,
// `back_sticker`,
// `back_filter`,
// `back_img`,
// `price`,
// `created_date`

function Customized_add(props) {
  const { lastInsertID, setLastInsertID } = props;
  const [member_id, setMember_id] = useState('');
  const [custom_product_name, setCustom_product_name] = useState('');
  const [wheel_style, setWheel_style] = useState('');
  const [carrier, setCarrier] = useState('');
  const [front_color, setFront_color] = useState('');
  const [back_style, setBack_style] = useState('');
  const [back_text, setBack_text] = useState('');
  const [back_sticker, setBack_sticker] = useState('');
  const [back_filter, setBack_filter] = useState('');
  const [back_img, setBack_img] = useState('');
  const [price, setPrice] = useState('');
  const [created_date, setCreated_date] = useState('');

  const addCustome = () => {
    console.log(
      member_id +
        custom_product_name +
        wheel_style +
        carrier +
        front_color +
        back_style +
        back_text +
        back_sticker +
        back_filter +
        back_img +
        price
    );

    axios
      .post('http://localhost:3000/custom', {
        member_id: member_id,
        custom_product_name: custom_product_name,
        wheel_style: wheel_style,
        carrier: carrier,
        front_color: front_color,
        back_style: back_style,
        back_text: back_text,
        back_sticker: back_sticker,
        back_filter: back_filter,
        back_img: back_img,
        price: price,
        // created_date:created_date
      })
      .then((res) => {
        console.log(res.data.insertId);
        setLastInsertID(res.data.insertId);
      });
  };

  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="cus_matte w-100 h-100 ovweflow-hidden">
        <img src="/imgs/Customized/cus_bg_05.jpg" className="cus-bg" />
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        <div className="cus_container">
          <div className="w-100 vh-mb-100 h-100">
            <div className="cus-product-container">
              <div className="main_img_container">
                <img
                  src="/imgs/Customized/cus_name_board.png"
                  className="cus_board_main"
                />
              </div>
            </div>
          </div>

          <div className="cus_card_container">
            <p>
              member_id:{member_id} |custom_product_name:{custom_product_name} |
              wheel_style:{wheel_style}{' '}
            </p>
            <p>
              carrier:{carrier} | front_color:{front_color} | back_text:
              {back_text} | back_text:{back_text}
            </p>
            <br />
            <p>
              back_sticker:{back_sticker} | back_filter:{back_filter} |
              back_img:{back_img} | price:{price}
            </p>

            <div className="step-control">
              <Link to={'/customized/create'}>
                <button className="skbtn-prev"></button>
              </Link>

              <Link to={'/customized/create/wheel'} onClick={addCustome}>
                <button className="skbtn-next"></button>
              </Link>
            </div>

            <div className="cus_card">
              <div className="cus_product_card">
                <h3 className="text-black">Project Name</h3>
                <input
                  type="text"
                  placeholder="memberid(暫時)"
                  className="viv-input"
                  onChange={(event) => {
                    setMember_id(event.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Give your board a name"
                  className="viv-input"
                  onChange={(event) => {
                    setCustom_product_name(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customized_add;
