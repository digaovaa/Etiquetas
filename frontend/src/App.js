import './App.css';
import EtiquetasContainer from './components/EtiquetasContainer';
import EtiquetasVolume from './components/EtiquetasVolume';
import { useEffect, useState } from 'react';
import logo from './logo.png';

function App() {
  const [etiqueta, setEtiqueta] = useState('1');

  useEffect(() => {
    console.log("Etiqueta", etiqueta);
  }, [etiqueta]);

  return (
    <div className="App">
      {etiqueta === '1' && (
        <>
          <img src={logo} alt="logo" style={{ width: '180px', height: '100px', marginTop: '10px' }} />
          <div>
            Impressão de etiquetas

          </div>
          <br />
        </>
      )
      }
      <div>
        {etiqueta === '1' && (
          <button onClick={() => setEtiqueta('container')} style={{ width: '100px', height: '50px', marginRight: '10px', color: '#fff', backgroundColor: 'red', border: '1px solid #000', borderRadius: '5px' }}>Container</button>
        )}
        {etiqueta === '1' && (
          <button onClick={() => setEtiqueta('volume')} style={{ width: '100px', height: '50px', color: '#fff', backgroundColor: 'blue', border: '1px solid #000', borderRadius: '5px' }}>Volume</button>
        )}
      </div>
      <div>
        <>
          {etiqueta === "container" && (
            <>
              <EtiquetasContainer />
            </>
          )}
          {etiqueta === "volume" && (
            <EtiquetasVolume />
          )}
        </>

      </div>
    </div >
  );
}

export default App;
