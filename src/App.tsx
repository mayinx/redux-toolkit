// import { useState } from 'react'
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice.ts";
import { useFetchBreedsQuery } from "./features/dogs/dogs-api-slice";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [numDogs, setNumDogs] = useState(20);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  function handleClick() {
    dispatch(amountAdded(5));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <div>
          <p>Dogs to fetch</p>
          <select
            value={numDogs}
            onChange={(e) => {
              setNumDogs(Number(e.target.value));
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <p>
          <div>Number of dogs fetched: {data.length}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => {
                return (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <img src={breed.image.url} height={250} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
