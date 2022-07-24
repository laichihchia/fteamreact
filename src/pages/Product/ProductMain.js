import React, { useState, useEffect, useRef } from 'react';
import FilterBox from './components/FilterBox';
import ToolBox from './components/ToolBox';
import './styles/ProductMain.scss';
import axios from './commons/axios';
import ProductList from './components/ProductList';
import { Link, useLocation } from 'react-router-dom';
import Pagination from './components/Pagination';
const ProductMain = () => {
  // 原始資料
  const [data, setData] = useState({});
  const location = useLocation();
  const usp = new URLSearchParams(location.search);
  const [filter, setFilter] = useState({
    categoryId: null,
    brand: null,
    color: null,
    price: null,
    orderfield: null,
    sort: null,
    page: 1,
  });

  const getPageData = async (event, gotoPage) => {
    if (event) {
      event.preventDefault();
    }
    setFilter({ ...filter, page: gotoPage });
    console.log(filter);
    axios.post('/product', { filter }).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getPageData(null, +usp.get('page') || 1, filter);
  }, [location]);

  return (
    <div className="bg w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="work-area col-10 text-danger">
        <ToolBox
          setData={setData}
          getPageData={getPageData}
          filter={filter}
          setFilter={setFilter}
        />
        <FilterBox />
        <div className="row product-list p-0 m-0">
          {data && data.rows
            ? data.rows.map((r) => {
                return (
                  <ProductList
                    sid={r.sid}
                    img={r.img}
                    name={r.name}
                    brand={r.brand}
                    price={r.price}
                  />
                );
              })
            : null}
        </div>

        <div className="row paginationBox p-0 m-0">
          <div className="col-4">
            {data && data.totalPages ? (
              <Pagination page={data.page} totalPages={data.totalPages} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
