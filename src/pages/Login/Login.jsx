import "./Login.css";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { loginService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
//Redux

import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const navigate = useNavigate();

  //Instancia de Redux para escritura
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
    const fetched = await loginService(user);

    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        user: decodificado,
      };

      dispatch(login({ credentials: passport }));

      setTimeout(()=> {
        navigate("/")
      }, 500)
    }
  };

  return (
    <div className="login-design">
      <CInput
        type="email"
        name="email"
        value={user.email || ""}
        changeEmit={inputHandler}
      />
      <CInput
        type="password"
        name="password"
        value={user.password || ""}
        changeEmit={inputHandler}
      />
      <button onClick={loginMe}>Login</button>
    </div>
  );
};
