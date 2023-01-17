import { dbService, storageService } from "myBase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, OwnId }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are tou sure");
    if (ok) {
      try {
        await dbService.doc(`nweets/${nweetObj.id}`).delete();
        if (nweetObj.attachmentUrl !== "") {
          await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
      } catch (error) {
        window.alert("네트워크 오류");
      }
    }
  };
  const toggleEditClick = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <article key={nweetObj.id}>
      {editing ? (
        <>
          {OwnId && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  value={newNweet}
                  placeholder="What is your nweet"
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditClick}>Cancle</button>
            </>
          )}
        </>
      ) : (
        <>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" />
          )}

          <h4>{nweetObj.text}</h4>
          {OwnId && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditClick}>Update Nweet</button>
            </>
          )}
        </>
      )}
    </article>
  );
};

export default Nweet;
