import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../../components/AuthContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/LessonCard.scss';
import EmptyBox from './EmptyBox';

const LessonCard = () => {
  const { auth, token } = useContext(AuthContext);
  const [lessonCard, setLessonCard] = useState([]);
  useEffect(() => {
    if (!auth) {
      return;
    } else {
      axios
        .get('http://localhost:3000/member/lesson', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLessonCard(res.data);
        });
    }
  }, [auth, token]);
  // 計算還剩幾天
  // console.log(
  //   Object.values(lessonCard).map((v, i) =>
  //     parseInt((new Date(v.duringtime_end) - new Date()) / 1000 / 60 / 60 / 24)
  //   )
  // );
  return (
    <>
      {lessonCard.length === 0 ? (
        <EmptyBox />
      ) : (
        lessonCard.map((v, i) => {
          return (
            <div className="m-2 lessonCard m-3" key={uuidv4()}>
              <div className="d-flex align-items-center text-center lessonhead">
                <p className="col-3 m-0">{v.name}</p>
                <p className="col-3 m-0">
                  <span>Begin</span> {v.duringtime_begin}
                </p>
                <p className="col-3 m-0">
                  <span>End</span> {v.duringtime_end}
                </p>
                <p className="col-3 m-0">
                  <span className="leftoverDaysNumber">
                    {/* 毫秒換算成剩下天數 */}
                    {parseInt(
                      (new Date(v.duringtime_end) - new Date()) /
                        1000 /
                        60 /
                        60 /
                        24
                    )}
                  </span>
                  <span> Days</span>
                </p>
              </div>
              <div className="d-flex justify-content-center align-items-center lessonbody">
                <table className="table w-90">
                  <thead>
                    <tr>
                      <th scope="col">Teacher</th>
                      <th scope="col">Category</th>
                      <th scope="col">Location</th>
                      <th scope="col">Quota</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{v.teacherName}</td>
                      <td>{v.type}</td>
                      <td>{v.location}</td>
                      <td>{v.quota}</td>
                      <td>$ {v.truePrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default LessonCard;
