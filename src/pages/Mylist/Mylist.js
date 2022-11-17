import React from "react";
import StyleEdit from "../../components/StyleEdit";
import "./mylist.scss";

const Mylist = ({ userObj, userStyle }) => {
  return (
    <div className="Mylist">
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
