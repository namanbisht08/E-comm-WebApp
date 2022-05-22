import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  console.log(product._id);
  const Imageurl = product
    ? `${API}product/photo/${product._id}`
    : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  console.log(Imageurl);

  return (
    <div className="rounded border border-success p-2">
      <img
        src={Imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
