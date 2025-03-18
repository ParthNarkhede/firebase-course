import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';;
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
  const [moviesList, setMoviesList] = useState([]);

  const [addMovie, setAddMovie] = useState("");
  const [addDate, setAddDate] = useState(null);
  const [addIMDB, setAddIMDB] = useState(0)


  const [updMovie, setUpdMovie] = useState("");

  const collectionMovie = collection(db, 'movies');

  const addMovieToDB = async () => {
    try {
      await addDoc(collectionMovie, { title: addMovie, releaseYear: addDate, IMDB: addIMDB, uid: auth?.currentUser?.uid });
      getMovies();
    } catch (err) {
      console.error(err);
    }
  }

  const getMovies = async () => {
    try {
      const data = await getDocs(collectionMovie);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(filteredData);
      setMoviesList(filteredData);
    } catch (err) {
      console.error("getMovies: ", err);
    }
  }

  const deleteMovie = async (id) => {

    const movDoc = doc(db, 'movies', id);
    await deleteDoc(movDoc);
    getMovies();

  }

  const updateMovie = async (id) => {
    const movDoc = doc(db, 'movies', id);
    await updateDoc(movDoc, { title: updMovie, releaseYear: addDate, IMDB: addIMDB });
    getMovies();
  }


  useEffect(() => {
    getMovies();
  }, []);


  return (
    <div className="App"><Auth />
      {/* <div> */}

      <div>
        <input type="text" placeholder='Title' onChange={(e) => setAddMovie(e.target.value)} />
        <input type="date" placeholder='Release Date' onChange={(e) => setAddDate(Date(e.target.value))} />
        <input type="number" placeholder='IMDB' onChange={(e) => setAddIMDB(e.target.value)} />
        <button onClick={addMovieToDB}>Add Movie</button>
      </div>
      {moviesList.map((mov) => (

        <div key={mov.id}>
          {/* <li >...</li> */}
          <h2>{mov.title}</h2>
          {/* <p>Date : {mov.releaseYear.toDate().toLocaleString("en-US")}</p> */}
          <p>Date:
            {mov.releaseYear
              ? new Date(mov.releaseYear.seconds ? mov.releaseYear.seconds * 1000 : mov.releaseYear).toLocaleDateString("en-US")
              : "N/A"}
          </p>
          <p>IMDB : {mov.IMDB}</p>
          <button onClick={() => deleteMovie(mov.id)}>Delete</button>
          <input text="text" placeholder="Edit" onChange={(e) => setUpdMovie(e.target.value)} />
          <button onClick={() => updateMovie(mov.id)}>Edit</button>
        </div>
      ))}
      {/* </div> */}
    </div>

  )
}

export default App
