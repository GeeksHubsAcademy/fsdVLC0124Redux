import "./Header.css";
import { CLink } from "../CLink/CLink";

//RDX

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect } from "react";

export const Header = () => {
  //Instancia de conexion a modo lectura
  const rdxUser = useSelector(userData);

  //Instancia de conexion a modo escritura
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(rdxUser, " credenciales pasaporte");
  }, [rdxUser]);
  return (
    <div className="header-design">
      <CLink path="/" title="Home" />
      {rdxUser?.credentials?.token ? (
        <div className="navigator-design">
          <CLink path="/profile" title={rdxUser?.credentials?.user?.name} />
          <div
            className="out-design"
            onClick={() => dispatch(logout({ credentials: "" }))}
          >
            log out
          </div>
        </div>
      ) : (
        <div className="navigator-design">
          <CLink path="/login" title="Login" />
          <CLink path="/register" title="Register" />
        </div>
      )}
    </div>
  );
};
