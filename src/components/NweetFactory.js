import React, { useState, useRef } from "react";
import { storageService, dbService } from "myBase";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    try {
      if (attachment !== "" || attachment !== null) {
        const attachmentRef = storageService
          .ref()
          .child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }
    } catch (error) {
      console.log(error);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      user: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
    fileInput.current.value = "";
  };
  // input 값 실시간 가져오기
  const onChange = (event) => {
    // 구조분해할당
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // file 미리보기
  const fileInput = useRef();
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClaerAttatchment = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind"
        maxLength={120}
        value={nweet}
        onChange={onChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="Nweet" />
      {attachment && (
        <>
          <img src={attachment} width="50px" />
          <button onClick={onClaerAttatchment}>clear</button>
        </>
      )}
    </form>
  );
};

export default NweetFactory;
