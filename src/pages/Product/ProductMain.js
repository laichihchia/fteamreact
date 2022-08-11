import React, { useState, useEffect } from 'react';
import FilterBox from './components/FilterBox';
import ToolBox from './components/ToolBox';
import './styles/ProductMain.scss';
import axios from './commons/axios';
import ProductList from './components/ProductList';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const ProductMain = (props) => {
  const {
    data,
    setData,
    favoritesNum,
    setFavoritesNum,
    cartTotalDep,
    setCartTotalDep,
  } = props;

  // 原始資料
  //  {
  //     sid:0,
  //     img:'',
  //     name:'',
  //     brand:'',
  //     price:0,
  //  }

  // post發給後端，先給預設參數，api要加上判斷如果不等於null才執行我要的sql語法
  // API還有兩個參數預設 : 1. orderField = "sid";  2. sort='ASC';
  const [filter, setFilter] = useState({
    categoryId: 0,
    brand: [],
    color: [],
    price: 0,
    orderfield: '',
    sort: '',
    page: 1,
    where: '',
    priceRange: [],
    searchName: '',
    check: false,
    perPage: 15,
  });

  // 複合篩選的文字顯示
  const [messages, setMessages] = useState([]);

  // 瀏覽器重新渲染拿到該會員收藏過的商品
  const [whoFavorites, setWhoFavorites] = useState([]);

  // 商品搜尋
  const searchProducts = (text) => {
    setFilter({ ...filter, searchName: text });
  };

  const getPage = () => {
    setFilter({
      ...filter,
      perPage:
        data.page >= data.totalPages ? data.perPage + 0 : data.perPage + 15,
    });
  };

  console.log('filter==', filter);

  useEffect(() => {
    axios
      .get('/product', {
        params: {
          categoryId: filter.categoryId,
          brand: filter.brand,
          color: filter.color,
          price: filter.price,
          orderfield: filter.orderfield,
          sort: filter.sort,
          page: filter.page,
          where: filter.where,
          priceRange: filter.priceRange,
          searchName: filter.searchName,
          perPage: filter.perPage,
        },
      })
      .then((res) => {
        setData(res.data);
      });
    //  ----------------------------------------------------------
    window.addEventListener('scroll', function () {
      let navY = this.scrollY;
      let bodyHeight = document.body.scrollHeight;
      let windowHeight = window.innerHeight;
      let scorllPercent = Math.round(
        (navY / (bodyHeight - windowHeight)) * 100
      );

      if (scorllPercent === 100) {
        getPage();
      }
      // console.log('windowHeight==', windowHeight);
      // console.log('bodyHeight==', bodyHeight);
      // console.log('scrollY==', navY);
      console.log('scorllPercent', scorllPercent);
    });
  }, [filter]);

  useEffect(() => {}, []);

  console.log('dada==', data);

  return (
    <div className="bg w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="work-area col-10 text-danger">
        <ToolBox filter={filter} setFilter={setFilter} />
        <FilterBox
          filter={filter}
          setFilter={setFilter}
          messages={messages}
          setMessages={setMessages}
          searchProducts={searchProducts}
        />

        <div className="d-flex productText p-0 m-0">
          {messages.map((msg) => {
            return (
              <button
                className="button-38"
                key={Math.random() * 100}
                onClick={() => {
                  setMessages(
                    messages.filter((v) => {
                      return v !== msg;
                    })
                  );

                  if (filter.brand.includes(msg)) {
                    const brandLikeList = filter.brand.filter((v, i) => {
                      return v !== msg;
                    });
                    setFilter({ ...filter, brand: brandLikeList });
                  }

                  if (filter.color.includes(msg)) {
                    const colorLikeList = filter.color.filter((v, i) => {
                      return v !== msg;
                    });
                    setFilter({ ...filter, color: colorLikeList });
                  }

                  if (filter.orderfield.includes('name')) {
                    setFilter({
                      ...filter,
                      orderfield: '',
                      sort: '',
                    });
                  }
                  if (filter.orderfield.includes('price')) {
                    setFilter({
                      ...filter,
                      orderfield: '',
                      sort: '',
                    });
                  }
                }}
              >
                {msg}
              </button>
            );
          })}

          <button
            className="button-38 resetBtn"
            style={{ display: messages.length === 0 ? 'none' : '' }}
            onClick={() => {
              setFilter({
                ...filter,
                categoryId: 0,
                brand: [],
                color: [],
                price: 0,
                orderfield: '',
                sort: '',
                page: 1,
                where: '',
                priceRange: [],
              });
              setMessages([]);
            }}
          >
            Reset All Filters
          </button>
        </div>

        <div className="product-list p-0 m-0 d-flex flex-wrap">
          <TransitionGroup component={null}>
            {data && data.rows
              ? data.rows.map((r) => {
                  return (
                    <CSSTransition
                      classNames="product-item"
                      timeout={300}
                      key={r.id}
                    >
                      <ProductList
                        sid={r.sid}
                        img={r.img}
                        name={r.name}
                        brand={r.brand}
                        price={r.price}
                        info={r.info}
                        data={data}
                        setData={setData}
                        favoritesNum={favoritesNum}
                        setFavoritesNum={setFavoritesNum}
                        whoFavorites={whoFavorites}
                        setWhoFavorites={setWhoFavorites}
                        cartTotalDep={cartTotalDep}
                        setCartTotalDep={setCartTotalDep}
                      />
                    </CSSTransition>
                  );
                })
              : null}
          </TransitionGroup>
        </div>

        <div className="row paginationBox p-0 m-0">
          <div className="col-4">
            <button
              className="button-38"
              style={{
                display: 'none',
              }}
              onClick={getPage}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
