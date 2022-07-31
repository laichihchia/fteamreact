import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  Fragment,
  useMemo,
} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../../../components/AuthContext';
import { MemberContext } from '../../../../App';
import '../../styles/Chat.scss';

const Chat = ({ selectItem }) => {
  console.log(15987);
  // 拿到token 存資料用
  const { token } = useContext(AuthContext);
  // 拿到使用者資訊
  const { member } = useContext(MemberContext);
  // 有暱稱顯示暱稱 沒暱稱顯示姓名
  let chatName = member.mem_nickname;
  if (member.mem_nickname === '') {
    chatName = member.mem_name;
  }
  // 設置message
  const [messageState, setMessageState] = useState({
    message: '',
  });
  // socket.io即時聊天用的
  const [chat, setChat] = useState([]);
  // 從資料庫拿出過往聊天紀錄渲染用的
  const [chatAll, setChatAll] = useState([]);

  const socketRef = useRef(null);

  // 讓聊天室置底
  const scrollDown = useRef(null);
  const scrollToBottom = () => {
    if (!scrollDown.current) {
      return;
    }
    scrollDown.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  // 因為有新訊息時才呼叫置底涵式，若沒新訊息，當使用者點擊CHAT頁面就先呼叫一次
  useEffect(() => {
    if (selectItem !== 'CHAT') {
      return;
    }
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, [selectItem]);

  // 拿到所有過去聊天紀錄
  useEffect(() => {
    axios.get('http://localhost:3000/member/chat').then((res) => {
      setChatAll(res.data);
    });
  }, []);

  useEffect(() => {
    // 呼叫聊天室置底的涵式
    scrollToBottom();
    // 與聊天室Sever的連接
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on('message', ({ name, message, sid, img }) => {
      setChat([...chat, { name, message, sid, img }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  // 紀錄訊息欄位的值
  const onTextChange = (e) => {
    setMessageState({ [e.target.name]: e.target.value });
  };

  //點擊表單提交時
  const onMessageSubmit = (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault();
    const { message } = messageState;
    // 如果沒有訊息就中斷
    if (!message) {
      return;
    }
    // 把訊息存進資料庫
    axios
      .post(
        'http://localhost:3000/member/chat',
        {
          message: message,
        },
        {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
    // 要在後端(message 自己設置的)那邊傳入{ name, message, sid, img }
    socketRef.current.emit('message', {
      name: chatName,
      message,
      sid: member.sid,
      img: member.mem_avatar,
    });
    // 把原有默認提交功能停止
    setMessageState({ message: '' });
  };

  // socket.io渲染聊天室
  const renderChat = () => {
    return chat.map(({ name, message, sid, img }) => (
      <Fragment key={uuidv4()}>
        {/* 判斷對話是不是使用者本人 */}
        {sid !== member.sid ? (
          <div className="d-flex align-items-center pt-2 pb-2" ref={scrollDown}>
            <img src={`http://localhost:3000/avatar/${img}`} alt="" />
            <h3 style={{ marginLeft: '1%' }}>
              {name}
              <span> : {message}</span>
            </h3>
          </div>
        ) : (
          <div
            className="d-flex justify-content-end align-items-center pt-2 pb-2"
            ref={scrollDown}
          >
            <h3 style={{ marginRight: '1%' }}>
              <span style={{ marginRight: '5px' }}>{message} :</span>
            </h3>
            <img src={`http://localhost:3000/avatar/${img}`} alt="" />
          </div>
        )}
      </Fragment>
    ));
  };

  return (
    <div className="h-100 d-flex justify-content-center pt-4">
      <div className="h-90 w-70 memberChat">
        <div className="h-90 chatScroll">
          {/* 過往聊天紀錄 */}
          {chatAll.map((v, i) => {
            return (
              <Fragment key={uuidv4()}>
                {/* 判斷對話是不是使用者本人 */}
                {v.mem_sid !== member.sid ? (
                  <div
                    className="d-flex align-items-center pt-2 pb-2"
                    ref={scrollDown}
                  >
                    <img
                      src={`http://localhost:3000/avatar/${v.mem_avatar}`}
                      alt=""
                    />
                    <h3 style={{ marginLeft: '1%' }}>
                      {v.mem_nickname ? v.mem_nickname : v.mem_name}
                      <span> : {v.message}</span>
                    </h3>
                  </div>
                ) : (
                  <div
                    className="d-flex justify-content-end align-items-center pt-2 pb-2"
                    ref={scrollDown}
                  >
                    <h3 style={{ marginRight: '1%' }}>
                      <span style={{ marginRight: '5px' }}>{v.message} : </span>
                    </h3>
                    <img
                      src={`http://localhost:3000/avatar/${v.mem_avatar}`}
                      alt=""
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
          {/* socket.io的即時渲染 */}
          {renderChat()}
        </div>
        <form
          onSubmit={onMessageSubmit}
          className="w-100 d-flex justify-content-center align-items-center"
        >
          <input
            name="message"
            onChange={onTextChange}
            value={messageState.message}
            placeholder="Say something"
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
