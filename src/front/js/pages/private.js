import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/index.css";

import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate()

    const [authState, setAuthState] = useState({
        user: null,
        userAuth: false,
        loading: true
    })

    const checkUser = async (token) => {
        const checkApiUrl = store.apiUrl + "private";

        const requestAuth = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await fetch(checkApiUrl, requestAuth);
        const respJson = await response.json();

        let auth = {
            check: false,
            user: null,
            msg: ""
        }

        if (!response || !response.ok) auth.msg = respJson.msg;
        else {
            auth.check = true;
            auth.user = respJson.logged_in_as;
            auth.msg = "User successfully authenticated"
        }

        return auth
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        const userAuth = async () => {
            const checkIn = await checkUser(token);

            if(!checkIn.check) setAuthState(prev => ({...prev, loading: false}));
            else {
                setAuthState((prev) => ({
                        ...prev,
                        user: checkIn.user,
                        userAuth: true,
                        loading: false
                })
            )}
        }

        userAuth()
        
    }, []);

    
    console.log(authState)
    if (!authState.userAuth && authState.loading) return <h1>... loading</h1>;
    if (!authState.userAuth && !authState.loading) {
        window.alert("Login again")
        navigate("/login");
    }

    const handleLogout = () => {
      // Eliminar el token de sesión al cerrar sesión
      sessionStorage.removeItem("token");
      // Redirigir al usuario a la página de login
      navigate("/login");
    };

    return (
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
          <div className="container py-5">
              <div className="card mx-auto" style={{ maxWidth: "400px" }}>
                  <img src={rigoImageUrl} className="card-img-top" alt="Rigo Baby" />
                  <div className="card-body">
                      <h1 className="card-title">Bienvenido a tu página privada!</h1>
                  </div>
                  <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
              </div>
          </div>
      </section>
  );
};