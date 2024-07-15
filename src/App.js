import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Detail from "./components/Detail";
import "./App.css";

function App() {
  const [state, setState] = useState({
    s: "sherlock",
    results: [],
    selected: {},
  });

  const apiurl = "https://www.omdbapi.com/?apikey=d5b12fe2";

  const searchInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        // Fetch ratings for each movie
        const fetchRatings = results.map((result) =>
          axios(apiurl + "&i=" + result.imdbID).then(({ data }) => ({
            ...result,
            imdbRating: data.imdbRating,
          }))
        );

        Promise.all(fetchRatings).then((resultsWithRatings) => {
          setState((prevState) => ({
            ...prevState,
            results: resultsWithRatings,
          }));
        });
      });
    }
  };

  const openDetail = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MoviesLand</h1>
      </header>
      <main>
        <Search searchInput={searchInput} search={search} />

        <div className="container">
          {state.results.map((e) => (
            <div className="item block" onClick={() => openDetail(e.imdbID)} key={e.imdbID}>
              <img src={e.Poster} alt={e.Title} />
              <div className="item-details">
                <h3>{e.Title}</h3>
                <span className="rating">{e.imdbRating}</span>
              </div>
            </div>
          ))}
        </div>

        {typeof state.selected.Title != "undefined" ? (
          <Detail selected={state.selected} closeDetail={closeDetail} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
