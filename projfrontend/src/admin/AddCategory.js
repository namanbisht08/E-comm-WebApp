import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin DashBoard Home 🏠
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setSuccess("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  // const successCard = () => {
  //   return (
  //     success && (
  //       <div className="row mt-2">
  //         <div className="col-md-6 offset-sm-3 text-left">
  //           <div className="alert alert-success">
  //             <h2>New Category Created</h2>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   );
  // };

  // const errorCard = () => {
  //   error && (
  //     <div className="row mt-2">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div className="alert alert-danger">
  //           <h2>Category creation failed</h2>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const errorCard = () => {
    error &&
      toast.error("Category creation failed !!", {
        theme: "colored",
      });
  };

  const successCard = () => {
    success &&
      toast.success("New Category Created !!", {
        theme: "colored",
      });
  };

  return (
    <Base
      title="Create a Category here"
      description="Add a new category for new T-shirt"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-md-2">
          <h1>
            {successCard()}
            {errorCard()}
            {myCategoryForm()}
            {goBack()}
            <ToastContainer
              autoClose={3000}
              style={{ width: "330px", fontSize: "20px" }}
            />
          </h1>
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
