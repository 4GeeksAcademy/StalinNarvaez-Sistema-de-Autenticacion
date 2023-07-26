import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
      <div className="mt-4">
        <Link to="/login">
          <button className="btn btn-primary m-2">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-outline-danger m-2">Signup</button>
        </Link>
      </div>
    </div>
  );
};