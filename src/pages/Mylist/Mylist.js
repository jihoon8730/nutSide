import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import StyleEdit from "../../components/StyleEdit";

const Postlist = ({ userObj }) => {
  const [userStyle, setUserStyle] = useState([]);

  // getStyle Read
  useEffect(() => {
    const q = query(collection(db, "nutside"), orderBy("createAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const userStyleArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStyle(userStyleArr);
    });
  }, []);

  return (
    <div>
      {userStyle.map((styleInfo) => {
        return (
          <StyleEdit
            key={styleInfo.id}
            myStyleObj={styleInfo}
            isOwner={userObj.uid}
          />
        );
      })}
    </div>
  );
};

export default Postlist;
