import React from "react";

const Error: React.FC = () => {
  localStorage.removeItem('token');
  return (
    <div>
      Error page
    </div>
  );
};

export default Error;
