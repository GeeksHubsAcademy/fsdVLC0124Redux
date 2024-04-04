import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import { updateDetail } from "../../app/slices/detailSlice";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect, useState } from "react";
import { popularFilms, searchFilms } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  //Instancia de Redux en modo lectura para home

  const searchRdx = useSelector(searchData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const rootPath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const bringMovies = async () => {
      let fetched;
      if (searchRdx.criteria !== "") {
        fetched = await searchFilms(searchRdx.criteria);
      } else {
        fetched = await popularFilms();
      }

      if (fetched.data.results.length > 0) {
        setMovies(fetched.data.results);
      }
    };

    bringMovies();
  }, [searchRdx.criteria]);

  const manageDetail = (peli) => {
    //1. guardamos en RDX
    dispatch(updateDetail({ peli }));

    //2. navegamos a la vista de detalle
    navigate("/detail");
  };

  return (
    <div className="home-design">
      {movies.length > 0 ? (
        <div className="videoclub">
          {movies.slice(0, 5).map((movie) => {
            return (
              <div key={movie.id} onClick={() => manageDetail(movie)}>
                <img
                  className="carlosManda"
                  src={`${rootPath}${movie.poster_path}`}
                  alt={movie.id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>No hay peli</div>
      )}
    </div>
  );
};
