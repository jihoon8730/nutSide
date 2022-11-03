import React from "react";

const StyleEdit = ({ myStyleObj, isOwner }) => {
  return (
    <div>
      {isOwner === myStyleObj.createId ? (
        <>
          <div>{myStyleObj.comment}</div>
          <div>{myStyleObj.top}</div>
          <div>{myStyleObj.bottom}</div>
          <div>{myStyleObj.sns}</div>
          <button>Delete</button>
          <button>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default StyleEdit;
