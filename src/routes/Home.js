import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // 뉴잇 가져오기
  const getNweets = async () => {
    const dbnweets = await dbService.collection("nweets").get();
    dbnweets.forEach((doc) => {
      const NweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [NweetObject, ...prev]);
    });
  };
  // 뉴잇 실시간 업데이트
  useEffect(() => {
    getNweets();
  }, []);
  // firebase db에 nweet 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
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

  console.log(nweets);
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
                <h4>{nweet.nweet}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
