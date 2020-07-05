import React from 'react';
import './App.css';
import NasaApod from './components/nasa/apod';

function App() {
  const api_key = 'kvUO022XDgLt13CjQ9S1X0dn3ReRBgybuOvwa4M6';
  return (
    <div className="App">
      <header className="App-header">
        <h1>Esta é o meu SPA que consome a api.nasa.gov</h1>
      </header>
      <main className="App-main">
        <NasaApod api_key={api_key}/>
      </main>
      <footer>
        Não caprichei no CSS pois não era pré requisito
      </footer>
    </div>
  );
}

export default App;
