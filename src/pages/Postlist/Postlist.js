import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Postlist = ({ userObj }) => {
  console.log(userObj.uid);
  const [userStyle, setUserStyle] = useState([]);
  console.log(userStyle);

  // getStyle Read
  const getStyle = async () => {
    const querySnapshot = await getDocs(collection(db, `nutside`));
    querySnapshot.forEach((doc) => {
      const userStyleObject = {
        ...doc.data(),
        id: doc.id,
      };
      // array return
      setUserStyle((prev) => [userStyleObject, ...prev]);
    });
  };
  useEffect(() => {
    getStyle();
  }, []);

  return (
    <div>
      {userStyle.map((styleInfo) => {
        return (
          <div key={styleInfo.createId}>
            <div>{styleInfo.comment}</div>
            <div>{styleInfo.top}</div>
            <div>{styleInfo.bottom}</div>
            <div>{styleInfo.sns}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Postlist;
