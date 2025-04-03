import React from "react";
import "./Tag.css";

const Tag = ({ tagName, selected, selectTag }) => {
  return (
    <button
      type="button"
      className={`tag ${selected ? 'selected' : ''}`}
      style={{ backgroundColor: selected ? getTagColor(tagName) : '#f9f9f9' }}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};



export default Tag;