import './App.css';
import EtiquetasContainerSumatra from './components/EtiquetasContainerSumatra';
import EtiquetasVolumeSumatra from './components/EtiquetasVolumeSumatra';
import { useEffect, useState } from 'react';
import logo from './logo.png';
import EtiquetasVolumeKT from './components/EtiquetasVolumeKT';

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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {etiqueta === '1' && (
          <button
            onClick={() => setEtiqueta('containerSumatra')}
            style={{
              width: '100px',
              height: '50px',
              marginRight: '10px',
              color: '#fff',
              backgroundColor: 'red',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            disabled={etiqueta === 'containerSumatra'}
          >
            Container Sumatra
          </button>
        )}
        {etiqueta === '1' && (
          <button
            onClick={() => setEtiqueta('volumeSumatra')}
            style={{
              width: '100px',
              height: '50px',
              marginRight: '10px',
              color: '#fff',
              backgroundColor: 'blue',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            disabled={etiqueta === 'volumeSumatra'}
          >
            Volume Sumatra
          </button>
        )}
        {etiqueta === '1' && (
          <button
            onClick={() => setEtiqueta('volumeKT')}
            style={{ 
              width: '100px', 
              height: '50px', 
              color: '#fff', 
              backgroundColor: 'blue', 
              border: '1px solid #000', 
              borderRadius: '5px',
              marginRight: '10px'
            }}
            disabled={etiqueta === 'volumeKT'}
          >
            Volume KT
          </button>
        )}
      </div>
      <div>
        <>
          {etiqueta === "containerSumatra" && (
            <>
              <EtiquetasContainerSumatra />
            </>
          )}
          {etiqueta === "volumeSumatra" && (
            <EtiquetasVolumeSumatra />
          )}
          {etiqueta === "volumeKT" && (
            <EtiquetasVolumeKT />
          )}
        </>

      </div>
    </div >
  );
}

export default App;
