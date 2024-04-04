import "./Home.css";

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect, useState } from "react";
import { searchFilms } from "../../services/apiCalls";
export const Home = () => {
  //Instancia de Redux en modo lectura para home

  const searchRdx = useSelector(searchData);

  const [movies, setMovies] = useState([]);

  const rootPath = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    const bringMovies = async () => {
      console.log("hola");
      const fetched = await searchFilms(searchRdx.criteria);

      if (fetched.data.results.length > 0) {
        setMovies(fetched.data.results);
      }
    };

    if (searchRdx !== "") {
      bringMovies();
    }
  }, [searchRdx]);

  return (
    <div className="home-design">
      {movies.length > 0 ? (
        <div className="videoclub">{movies.slice(0,5).map((movie) => {
          return (
            <div key={movie.id}><img className="carlosManda" src={`${rootPath}${movie.poster_path}`} alt={movie.id} /></div>
          )
        })}</div>
      ) : (
        <div>No hay peli</div>
      )}
    </div>
  );
};
