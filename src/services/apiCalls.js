const root = "http://localhost:4000/api/";
const rootTMDB = "https://api.themoviedb.org/3/";
const apiKey = "210d6a5dd3f16419ce349c9f1b200d6d";

import axios from "axios";

export const loginService = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}auth/login`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    //SI NECESITASE TOKEN
    if(data.message === "Token Error"){
      dispatch(logout({ credentials: "" }))
    }

    return data;
  } catch (error) {
    return error;
  }
};

// export const userProfile = async (token) => {
//   //PLACEHOLDER FUNCION
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   };

//   try {
//     const response = await fetch(`${root}auth/login`, options);

//     const data = await response.json();

//     if (!data.success) {
//       throw new Error(data.message);
//     }

//     //SI NECESITASE TOKEN
//     if(data.message === "Token Error"){
//       dispatch(logout({ credentials: "" }))
//     }

//     return data;
//   } catch (error) {
//     return error;
//   }
// };

export const searchFilms = async (criteria) => {
  try {
    const response = await axios.get(
      `${rootTMDB}search/movie?api_key=${apiKey}&language=en-US&query=${criteria}&page=1&include_adult=false`
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const popularFilms = async () => {
  try {
    const response = await axios.get(
      `${rootTMDB}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    return response;
  } catch (error) {
    return error;
  }
};
