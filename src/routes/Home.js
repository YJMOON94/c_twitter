import { dbService } from "myBase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";

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
      <section>
        <h2>Nweet Section</h2>
        {nweets.map((nweet) => {
          return (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              OwnId={nweet.user === userObj.uid}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
