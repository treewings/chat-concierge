import React, { useContext, useEffect, useState } from "react";
import ContentAlt from "../../../layout/content/ContentAlt";
import Head from "../../../layout/head/Head";
import ChatBody from "./ChatBody";
import { ChatContext } from "./ChatContext";
import { chatData } from "./ChatData";

const Chat = () => {
  const [mainTab, setMainTab] = useState("Chats");
  const [selectedId, setSelectedId] = useState(1);
  const [filterTab, setFilterTab] = useState("messages");
  const [filteredChatList, setFilteredChatList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [favState, setFavState] = useState(false);
  const [favFilter, setFavFilter] = useState([]);
  const [favFilterText, setFavFilterText] = useState("");
  const [mobileView, setMobileView] = useState(false);

  const { chatState, fav } = useContext(ChatContext);

  const [chat, setChat] = chatState;
  const [favData] = fav;

  // Filtering users by search
  useEffect(() => {
    if (filterText !== "") {
      const filteredObject = chatData.filter((item) => {
        return item.name.toLowerCase().includes(filterText.toLowerCase());
      });
      setFilteredChatList([...filteredObject]);
    } else {
      setFilteredChatList([...chatData]);
    }
  }, [filterText, setFilteredChatList]);

  // Filtering favourite users by search
  useEffect(() => {
    if (favFilterText !== "") {
      const filteredObject = favData.filter((item) => {
        return item.name.toLowerCase().includes(favFilterText.toLowerCase()) && item.fav === false;
      });
      setFavFilter([...filteredObject]);
    } else {
      setFavFilter([]);
    }
  }, [favFilterText, favData]);

  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };

  const favInputSearchChange = (e) => {
    setFavFilterText(e.target.value);
  };

  const onFilterClick = (prop) => {
    setFilterTab(prop);
  };

  const chatItemClick = (id) => {
    let data = chat;
    const index = data.findIndex((item) => item.id === id);
    const dataSet = data.find((item) => item.id === id);
    if (dataSet.unread === true) {
      data[index].unread = false;
      setChat([...data]);
    }
    setSelectedId(id);
    if (window.innerWidth < 860) {
      setMobileView(false);
    }
  };

  return (
    <>
      <Head title="Concierge"></Head>
      <ContentAlt>
        <ChatBody id={selectedId} setSelectedId={setSelectedId} setMobileView={setMobileView} mobileView={mobileView} />
      </ContentAlt>
    </>
  );
};

export default Chat;
