import React, { useState } from 'react';
import ScrollBox from '../../../../components/ScrollBox/ScrollBox';
import RecordCard from './RecordCard';
import RecordEcharts from './RecordEcharts';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/Record.scss';

const Record = () => {
  // 下拉選單
  const [select, setSelect] = useState('All');
  const option = ['All', 'Products', 'Customized'];

  // 篩選CSS
  let products = '';
  let customized = '';

  if (select === 'Products') {
    products = '';
  } else {
    products = 'd-none';
  }
  if (select === 'Customized') {
    customized = '';
  } else {
    customized = 'd-none';
  }
  if (select === 'All') {
    products = '';
    customized = '';
  }

  return (
    <>
      <div className="w-100 h-100  d-flex flex-warp">
        <div className="col-12 col-xl-6 h-100">
          <div className="d-flex justify-content-end px-3 h-5">
            <section className="recordFilter pt-2">
              <select
                value={select}
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
              >
                {option.map((v, i) => {
                  return (
                    <option
                      key={uuidv4()}
                      value={v}
                      className="recordFilterOption"
                    >
                      {v}
                    </option>
                  );
                })}
              </select>
            </section>
          </div>
          <div className="h-95">
            <ScrollBox>
              <RecordCard products={products} customized={customized} />
            </ScrollBox>
          </div>
        </div>

        <div className="col-xl-6 h-100 recordEchartsBox">
          <RecordEcharts />
        </div>
      </div>
    </>
  );
};

export default Record;
