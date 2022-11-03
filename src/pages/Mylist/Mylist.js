import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import StyleEdit from "../../components/StyleEdit";

const Postlist = ({ userObj }) => {
  console.log(userObj);
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
