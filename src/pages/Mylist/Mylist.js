import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import StyleEdit from "../../components/StyleEdit";

const Mylist = ({ userObj, userStyle, setUserStyle }) => {
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

export default Mylist;
