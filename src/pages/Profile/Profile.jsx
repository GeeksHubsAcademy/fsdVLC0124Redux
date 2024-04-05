import "./Profile.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { uploadFile } from "../../services/apiCalls";

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //Conectamos con Redux en modo lectura

  const rdxUser = useSelector(userData);

  useEffect(() => {
    console.log(rdxUser);
    if (!rdxUser.credentials.token) {
      navigate("/");
    }
  }, [rdxUser]);

  const uploading = async (e) => {
    if (e.target.files[0]) {
      //flag de cargando..........
      setLoading(true);
      try {
        const fetched = await uploadFile(e.target.files[0]);

        if (fetched.success) {
          setLoading(false);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="profile-design">
      <div>{rdxUser?.credentials?.user?.name}</div>
      <div>{rdxUser?.credentials?.user?.roleName}</div>
      
      {loading 
        ? (<div>SPINNER DE CARGA</div>)

        : (<input type="file" onChange={(e) => uploading(e)} name="photo" />)
      }
    </div>
  );
};
