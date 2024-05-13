/* 1 */
import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Buscador from "./Buscador";
/* 2 */
function MiApi() {
  const URL = "https://api.disneyapi.dev/character";
  const [peliculas, setPeliculas] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const data = await fetch(URL);
      const result = await data.json();


/* devuelve datos filtrados del json que cumplan con la condicion de tener informacion dentro del array  */
      const filteredData = result.data.filter(
        (item) =>
          item.imageUrl !== undefined &&
          item.name !== undefined &&
          item.films.length > 0
      );
      setPeliculas(filteredData);
    } catch (error) {
      console.log("No trae datos");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let personajesAmostrar = [];

  if (search === "") {
    personajesAmostrar = peliculas;
  } else {
    personajesAmostrar = peliculas.filter((pelicula) =>
      pelicula.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  personajesAmostrar = personajesAmostrar.slice().sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <>
     <div className="tituloyinput"><h1>Peliculas de Disney</h1>

      <Buscador prop={{search: search , change:(e) => setSearch(e.target.value)}}> </Buscador> 
      </div> 
      <div className="container">
        {personajesAmostrar.length === 0 ? (
          <p>Debes incluir nombre del personaje </p>
        ) : (
          personajesAmostrar.map((pelicula, index) => (
            <Card className="bg-dark text-white">
              <Card.Img variant="top" src={pelicula.imageUrl} style={{width:"100%", height:"8vw", objectFit:"cover"}} />
              <Card.Body style={{height:"7vw"}}>
                <Card.Title>{pelicula.name}</Card.Title>
                <Card.Text>
                  {pelicula.films.length > 0 && (
                    <p>
                      Peliculas:{" "}
                      {pelicula.films.map((pelicula, index) => (
                        <span key={index}>{pelicula}</span>
                      ))}
                    </p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default MiApi;

