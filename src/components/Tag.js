import React, { useState } from "react";

export default function Tag ({color, tag, onTagEdit, onTagDelete, editable, active, clickable, onTagClick=()=>{console.log('hehe')}}) {
  const [editing, setEditing] = useState(active);
  const [tagText, setTagText] = useState(tag);
  
  const handleEdit = () => {
    if (tagText != null) {
      console.log(tagText);
      if (editing) 
        if(!onTagEdit(tagText)) onTagDelete()
      setEditing(!editing);
    }
  };
  return (
    <div
      className={`btn btn-${color} m-1 ${editable ? "flex-grow-1" : ""}`}
      style={{ borderRadius: "20px" }} onClick={(e) => {
        if (!e.target.classList.contains("fa"))
          onTagClick(tag);
      }}
    >
      {editing ? (
        <>
          <input
            type="text"
            className="form-control form-control-sm"
            value={tagText}
            onChange={(event) => setTagText(event.target.value)}
            autoFocus
          />
          <span className="fa fa-check ml-1" onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }} />
          <span className="fa fa-times" onClick={onTagDelete} />
        </>
      ) : (
        <>
          <span className="mr-1">{tag}</span>
          {editable && (
            <>
              <span
                className="fa fa-pencil mr-1"
                onClick={() => setEditing(true)}
              />
              <span className="fa fa-times" onClick={onTagDelete} />
            </>
          )}
        </>
      )}
    </div>
  );
};