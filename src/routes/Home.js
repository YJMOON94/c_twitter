import { dbService, storageService } from "myBase";
import React, { useEffect, useState, useRef } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <NweetFactory userObj={userObj} />
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
