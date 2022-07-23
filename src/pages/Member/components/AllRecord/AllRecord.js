import React, { useState } from 'react';
import MuiTabs from './MuiTabs';
import '../../styles/AllRecord.scss';
import Collect from './Collect';

const AllRecord = () => {
  const [selectItem, setSelectItem] = useState('COLLECT');
  let moveTrain = 'translateX(0%)';
  if (selectItem === 'RECORD') {
    moveTrain = 'translateX(-25%)';
  }
  if (selectItem === 'MY LESSON') {
    moveTrain = 'translateX(-50%)';
  }
  if (selectItem === 'CHAT') {
    moveTrain = 'translateX(-75%)';
  }
  console.log(moveTrain);
  return (
    <>
      <MuiTabs selectItem={selectItem} setSelectItem={setSelectItem} />
      <div className="w-100 h-90 memberAllRecordWrap">
        <div
          className="h-100 d-flex"
          style={{
            width: '400%',
            transform: moveTrain,
            transition: '0.5s ease',
          }}
        >
          <div className="w-25">
            <Collect />
          </div>
          <div className="w-25 bg-dark"></div>
          <div className="w-25 bg-dark"></div>
          <div className="w-25 bg-dark"></div>
        </div>
      </div>
    </>
  );
};

export default AllRecord;
