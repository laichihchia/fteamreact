import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Orders/Orders.scss';
import OrderMuiTabs from './components/OrderMuiTabs';
import Scroll from 'react-scroll';
import OrderCard from './components/OrderCard';
import AuthContext from '../../components/AuthContext';
import axios from 'axios';
const Orders = () => {
  const navigate = useNavigate();
  const { auth, token } = useContext(AuthContext);
  const [loginMemberID, setLoginMemberID] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    if (!auth) {
      alert('請先登入會員');
      navigate('/login');
    }
    axios
      .get('http://localhost:3000/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoginMemberID(res.data.sid);
        axios
          .get(`http://localhost:3000/orders?memID=${res.data.sid}`)
          .then((res) => {
            if (res.data.success) {
              setAllOrders(res.data.result);
            }
          });
      });
  }, []);
  return (
    <>
      <div className="orders-bg w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0 d-flex">
          <div className="col-12 col-md-10 h-100">
            <div className="w-100 h-10">
              <OrderMuiTabs
                setAllOrders={setAllOrders}
                loginMemberID={loginMemberID}
              />
            </div>
            <div className="w-100 d-flex justify-content-center order-section">
              <Scroll.Element className="orders-card-scroll">
                {allOrders.map((v, i) => {
                  return <OrderCard key={v.sid} singleOrder={v} />;
                })}
              </Scroll.Element>
            </div>
          </div>
          <div className="d-none col-md-2 h-100"></div>
        </div>
      </div>
    </>
  );
};

export default Orders;
