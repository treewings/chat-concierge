import classNames from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { Button, Icon, UserAvatar } from "../../../components/Component";
import { currentTime, findUpper, getHospital, getNomeHospital, apiUrl, truncate } from "../../../utils/Utils";
// import { ChatContext } from "./ChatContext";
import { useParams } from "react-router-dom";

import { MeChat, MetaChat, YouChat } from "./ChatPartials";
import axios from "axios";

const ChatBody = ({ id, mobileView, setMobileView, setSelectedId }) => {
  // const { deleteConvo, propAction, chatState } = useContext(ChatContext);
  // const [chat, setChat] = chatState;
  const [Uchat, setUchat] = useState({});
  const [sidebar, setsidebar] = useState(false);
  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef(null);
  const params = useParams();

  const [chat, setChat] = useState([
    {
      id: 1,
      name: "Concierge",
      convo: [
        {
          id: "chat_1",
          chat: ["Seja bem vindo(a).<br> Digite <b>oi</b> para iniciar uma conversa."],
          // me: false,
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const scrollHeight = messagesEndRef.current.scrollHeight;
      const height = messagesEndRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [Uchat]);

  const resizeFunc = () => {
    if (window.innerWidth > 1550) {
      setsidebar(true);
    } else {
      setsidebar(false);
    }
  };

  useEffect(() => {
    chat.forEach((item) => {
      if (item.id === id) {
        setUchat(item);
      }
    });
  }, [id, chat]);

  useEffect(() => {
    window.addEventListener("resize", resizeFunc);
    resizeFunc();
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  }, []);

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onTextSubmit = async (e) => {
    e.preventDefault();

    const telefone = localStorage.getItem("telefone");

    const response = await axios.get(`${apiUrl()}/${getHospital(params.hospital)}?numero=${telefone}&message=${inputText}`);

    let allChat = chat;
    let index = allChat.find((item) => item.id === id);
    let defaultChat = Uchat;
    let text = truncate(inputText, 74);
    let newChatItem;
    if (inputText !== "") {
      if (defaultChat.convo.length === 0) {
        newChatItem = {
          id: `chat_${defaultChat.convo.length + 2}`,
          me: true,
          chat: [text],
          date: `${currentTime()}`,
        };
        defaultChat.convo = [...defaultChat.convo, newChatItem];
      } else {
        if (defaultChat.convo[defaultChat.convo.length - 1].me === true) {
          newChatItem = {
            id: `chat_${defaultChat.convo.length + 2}`,
            me: true,
            chat: [...defaultChat.convo[defaultChat.convo.length - 1].chat, text],
            date: `${currentTime()}`,
          };
          defaultChat.convo[defaultChat.convo.length - 1] = newChatItem;
        } else {
          let newChatItem = {
            id: `chat_${defaultChat.convo.length + 2}`,
            me: true,
            chat: [text],
            date: `${currentTime()}`,
          };
          defaultChat.convo = [...defaultChat.convo, newChatItem];
        }
      }
    }
    allChat[index] = defaultChat;

    setChat([...allChat]);
    setUchat({ ...defaultChat });

    if(response.data.message){
      let newChatItem = {
        id: `chat_${defaultChat.convo.length + 3}`,
        me: false,
        chat: [response.data.message],
        date: `${currentTime()}`,
      };
      defaultChat.convo = [...defaultChat.convo, newChatItem];
    }
    setInputText("");
  };

  const chatBodyClass = classNames({
    // "nk-chat-body": true,
    "show-chat": mobileView,
    // "profile-shown": sidebar && window.innerWidth > 1550,
  });

  return (
    <div>
      {Object.keys(Uchat).length > 0 && (
        <div className={chatBodyClass}>
          <div className="nk-chat-head" style={{position: "fixed", zIndex: 1, width: "100%"}}>
            <ul className="nk-chat-head-info">
              <li className="nk-chat-head-user">
                <div className="user-card">
                  <UserAvatar image={Uchat.image} theme={Uchat.theme} text={findUpper(Uchat.name)}></UserAvatar>
                  <div className="user-info">
                    <div className="lead-text">{Uchat.nickname ? Uchat.nickname : Uchat.name}</div>
                    <div className="sub-text">
                      <span className="me-1">{getNomeHospital(params.hospital)} </span>{" "}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <SimpleBar className="nk-chat-panel" style={{paddingTop: "10vh", paddingBottom: "10vh"}} scrollableNodeProps={{ ref: messagesEndRef }}>
            {Uchat.convo.map((item, idx) => {
              if (item.me) {
                return <MeChat key={idx} item={item} chat={Uchat}></MeChat>;
              } else if (item.meta) {
                return <MetaChat key={idx} item={item.meta.metaText}></MetaChat>;
              } else {
                return <YouChat key={idx} item={item} chat={Uchat}></YouChat>;
              }
            })}
          </SimpleBar>
          <div className="nk-chat-editor" style={{position: "fixed", bottom: 0, width: "100%"}}>
            <div className="nk-chat-editor-form">
              <div className="form-control-wrap">
                <textarea
                  className="form-control form-control-simple no-resize"
                  rows="1"
                  id="default-textarea"
                  onChange={(e) => onInputChange(e)}
                  value={inputText}
                  placeholder="Envie sua mensagem..."
                  onKeyDown={(e) => {
                    e.code === "Enter" && onTextSubmit(e);
                  }}
                ></textarea>
              </div>
            </div>
            <ul className="nk-chat-editor-tools g-2">
              <li>
                <Button color="primary" onClick={(e) => onTextSubmit(e)} className="btn-round btn-icon">
                  <Icon name="send-alt"></Icon>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBody;
