import "./Detail.css";

import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Detail = () => {
  const detailRdx = useSelector(detailData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!detailRdx?.peli?.id) {
      navigate("/");
    }
  }, [detailRdx]);

  //Renderizado condicional &&
  return <div className="detail-design">{detailRdx?.peli?.id && detailRdx.peli.original_title}</div>;
};
