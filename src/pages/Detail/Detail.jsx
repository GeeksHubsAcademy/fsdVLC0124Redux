import "./Detail.css";

import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";
import { useEffect } from "react";

export const Detail = () => {

    const detailRdx = useSelector(detailData)

    useEffect(()=> {
        console.log(detailRdx)
    }, [detailRdx])

    return (
        <div>{detailRdx.peli.original_title}</div>
    )
}