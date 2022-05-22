import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "namanbisht84@gmail.com",
    password: "namsb54321",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      loading: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  // const loadingMessage = () => {
  //   return (
  //     loading && (
  //       <div className="row">
  //         <div className="col-md-6 offset-sm-3 text-left">
  //           <div className="alert alert-info">
  //             <h2>Loading...</h2>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   );
  // };

  const loadingMessage = () => {
    loading &&
      toast.warn("Loading...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1900,
      });
  };

  // const errorMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div
  //           className="alert alert-danger"
  //           style={{ display: error ? "" : "none" }}
  //         >
  //           {error}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const errorMessage = () => {
    error && toast.error(error, { autoClose: 6000, delay: 2200 });
  };

  const signInForm = () => {
    return (
      <div className="row mt-4">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <div class="d-grid gap-2 mt-3">
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {errorMessage()}
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
      <ToastContainer
        autoClose={3000}
        style={{ width: "330px", fontSize: "20px" }}
      />

      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
