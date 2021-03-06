import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Nathan_components/ProductCard';
import Scroll from 'react-scroll';
import './Carts.scss';
import OffcanvasPage from './Nathan_components/OffcanvasPage';
import CartMuiTabs from './Nathan_components/CartMuiTabs';
import axios from 'axios';
import CustomCard from './Nathan_components/CustomCard';
import LessonCard from './Nathan_components/LessonCard';
import AuthContext from '../../components/AuthContext';

const Carts = (props) => {
  const {
    productTotalQty,
    lessonTotalQty,
    customTotalQty,
    setProductTotalQty,
    setLessonTotalQty,
    setCustomTotalQty,
  } = props;
  // set nevigate hook
  const navigate = useNavigate();
  // 取得判斷會員的state
  const { auth, token } = useContext(AuthContext);
  const [loginMemberID, setLoginMemberID] = useState(0);

  // re-render 各種商品的依賴項
  const [productDep, setProductDep] = useState(0);
  const [customDep, setCustomDep] = useState(0);
  const [lessonDep, setLessonDep] = useState(0);

  // 3台購物車的data
  const [productCartItems, setProductCartItems] = useState([]);
  const [customCartItems, setCustomCartItems] = useState([]);
  const [lessonCartItems, setLessonCartItems] = useState([]);

  // 3台購物車的價錢
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [lessonTotalPrice, setLessonTotalPrice] = useState(0);
  const [customTotalPrice, setCustomTotalPrice] = useState(0);
  // 獲取購物車內product的資料
  useEffect(() => {
    // 未登入會員 導向login
    if (!auth) {
      alert('請先登入會員');
      navigate('/login');
    }
    axios
      .get('http://localhost:3000/member/memberself', {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 確認拿到會員資料再拿購物車商品
        setLoginMemberID(res.data.sid);
        axios
          .get(`http://localhost:3000/carts?type=product&memID=${res.data.sid}`)
          .then((response) => {
            // console.log(response.data.result);
            setProductCartItems(response.data.result);
            // get product total price
            setProductTotalPrice(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                    return init + obj.item_price;
                  }, 0)
                : 0
            );
            // get product qty
            setProductTotalQty(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                    return init + obj.quantity;
                  }, 0)
                : 0
            );
          });
      });
  }, [productDep]);
  // 獲取購物車內custom的資料
  useEffect(() => {
    axios
      .get('http://localhost:3000/member/memberself', {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 確認拿到會員資料再拿購物車商品
        axios
          .get(`http://localhost:3000/carts?type=custom&memID=${res.data.sid}`)
          .then((response) => {
            // console.log(response.data.result);
            setCustomCartItems(response.data.result);
            // get custom total price
            setCustomTotalPrice(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                    return init + obj.item_price;
                  }, 0)
                : 0
            );
            // get custom qty
            setCustomTotalQty(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                    return init + obj.quantity;
                  }, 0)
                : 0
            );
          });
      });
  }, [customDep]);
  // 獲取購物車內lesson的資料
  useEffect(() => {
    axios
      .get('http://localhost:3000/member/memberself', {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 確認拿到會員資料再拿購物車商品
        axios
          .get(`http://localhost:3000/carts?type=lesson&memID=${res.data.sid}`)
          .then((response) => {
            // console.log(response.data.result);
            setLessonCartItems(response.data.result);
            // get lesson total price
            setLessonTotalPrice(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                    return init + obj.item_price;
                  }, 0)
                : 0
            );
            // get lesson qty
            setLessonTotalQty(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                    return init + obj.quantity;
                  }, 0)
                : 0
            );
          });
      });
  }, [lessonDep]);

  // Tabs所有選項
  const cartItemArr = ['PRODUCTS', 'CUSTOMIZED', 'LESSONS'];
  const [selectItem, setSelectItem] = useState('PRODUCTS');
  return (
    <>
      <div className="carts-bg w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0 d-flex">
          <div className="col-12 col-md-10 h-100">
            <div className="tabs-section w-100">
              <div className="w-100 h-100 d-none d-md-block">
                <CartMuiTabs
                  selectItem={selectItem}
                  setSelectItem={setSelectItem}
                />
              </div>
              <div className="carts-tabs-wrap w-100 h-100 p-4 d-md-none">
                <select
                  onChange={(e) => {
                    setSelectItem(e.target.value);
                  }}
                  value={selectItem}
                  className="carts-selection w-100 h-100"
                >
                  {cartItemArr.map((v, i) => {
                    return (
                      <Fragment key={i}>
                        <option value={v}>{v}</option>
                      </Fragment>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="carts-card-section w-100">
              <div className="carts-card-wrap w-100 h-100 px-4 px-md-0">
                <div className="card-scroll-list-wrap">
                  <div
                    style={{
                      left:
                        selectItem === 'PRODUCTS'
                          ? '-0%'
                          : selectItem === 'CUSTOMIZED'
                          ? '-100%'
                          : '-200%',
                    }}
                    className="card-scroll-list"
                  >
                    <Scroll.Element className="products-card-scroll">
                      {productCartItems.map((v, i) => {
                        return (
                          <ProductCard
                            key={v.sid}
                            singleItem={v}
                            singleInd={i}
                            productCartItems={productCartItems}
                            setProductCartItems={setProductCartItems}
                            productDep={productDep}
                            setProductDep={setProductDep}
                          />
                        );
                      })}
                    </Scroll.Element>
                    <Scroll.Element className="customized-card-scroll">
                      {customCartItems.map((v, i) => {
                        return (
                          <CustomCard
                            key={v.sid}
                            singleItem={v}
                            singleInd={i}
                            customCartItems={customCartItems}
                            setCustomCartItems={setCustomCartItems}
                            customDep={customDep}
                            setCustomDep={setCustomDep}
                          />
                        );
                      })}
                    </Scroll.Element>
                    <Scroll.Element className="lesson-card-scroll">
                      {lessonCartItems.map((v, i) => {
                        return (
                          <LessonCard
                            key={v.sid}
                            singleItem={v}
                            customCartItems={customCartItems}
                            setLessonCartItems={setLessonCartItems}
                            lessonDep={lessonDep}
                            setLessonDep={setLessonDep}
                          />
                        );
                      })}
                    </Scroll.Element>
                  </div>
                </div>
              </div>
            </div>
            <div className="total-count-section w-100">
              <div className="total-count-wrap h-100 m-0">
                <div className="total-top-grid w-100 d-flex">
                  <div className="cart-total-title col-4 h-100 d-flex justify-content-center align-items-center">
                    <span>TOTAL</span>
                  </div>
                  <div className="cart-total-title col-4 h-100 d-flex justify-content-center align-items-center">
                    <span>ITEMS</span>
                  </div>
                  <div className="cart-total-title col-4 h-100 d-flex justify-content-center align-items-center"></div>
                </div>
                <div className="total-bottom-grid w-100 d-flex">
                  <div className="cart-total-text col-4 h-100 d-flex justify-content-center align-items-center">
                    {/* total price */}
                    <span>
                      ${productTotalPrice + lessonTotalPrice + customTotalPrice}
                    </span>
                  </div>
                  <div className="cart-total-text col-4 h-100 d-flex justify-content-center align-items-center">
                    {/* total counts */}
                    <span>
                      {productTotalQty + lessonTotalQty + customTotalQty}
                    </span>
                  </div>
                  <div className="col-4 h-100 d-flex justify-content-start align-items-center btn-check-wrap">
                    <OffcanvasPage
                      loginMemberID={loginMemberID}
                      setProductDep={setProductDep}
                      setCustomDep={setCustomDep}
                      setLessonDep={setLessonDep}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none col-md-2  h-100"></div>
        </div>
      </div>
    </>
  );
};

export default Carts;
