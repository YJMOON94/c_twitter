import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // 뉴잇 실시간 업데이트
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapShot) => {
      const nweetsArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetsArray);
    });
  }, []);
  // firebase db에 nweet 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      user: userObj.uid,
    });
    setNweet("");
  };
  // input 값 실시간 가져오기
  const onChange = (event) => {
    // 구조분해할당
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        <ul>
          {nweets.map((nweet) => {
            return (
              <li key={nweet.id}>
                <h4>{nweet.text}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
