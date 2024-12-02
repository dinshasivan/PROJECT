import React from "react";

const Title = ({ title, titleStyle }) => {
  return (
    <div className={`${titleStyle} pb-20`}>
      <span
        className="h2 capitalize pb-1 relative after:w-2/3 after:h-1 after:bg-secondary after:absolute after:bottom-1 
        after:right-0 after:rounded text-2xl font-sans font-bold"
      >
        {title}
      </span>
    </div>
  );
};

export default Title;
