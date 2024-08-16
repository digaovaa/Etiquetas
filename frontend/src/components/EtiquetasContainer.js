// src/components/CSVUploader.js

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import QRCode from 'qrcode.react';

const EtiquetasContainer = () => {
    const [data, setData] = useState([]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            // Converta o arquivo lido para uma string UTF-8
            const decoder = new TextDecoder("utf-8");
            const utf8Text = decoder.decode(new Uint8Array(event.target.result));

            Papa.parse(utf8Text, {
                header: true,
                delimiter: ";",
                complete: (results) => {
                    setData(results.data);
                }
            });
        }
        reader.readAsArrayBuffer(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            {data.length === 0 && (
                <>
                    <div {...getRootProps()} style={{ border: '2px dashed #000', padding: '20px', textAlign: 'center' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Etiquetas de Container</span>
                        <input {...getInputProps()} />
                        <p>Arraste e solte o arquivo CSV aqui, ou clique para selecionar o arquivo</p>
                    </div>
                    <button onClick={() => window.location.reload()} style={{ width: '100px', height: '50px', color: '#fff', backgroundColor: 'grey', border: '1px solid #000', borderRadius: '5px' }}>Voltar</button>
                </>
            )}
            {(data.length > 0) && (
                <div className="label-container">
                    {data.map((item, index) => (
                        <div key={index} className="label-cont" style={{ pageBreakAfter: 'always' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '21px', height: '50%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #000', padding: '10px', width: '100%', height: '100%' }}>
                                    {item.container1 && <QRCode value={item.container1} size={230} />}
                                    <div style={{ marginTop: '10px' }}>
                                        <div style={{ fontSize: '9px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{item.container1}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #000', padding: '10px', width: '100%', height: '100%' }}>
                                    {item.container2 && <QRCode value={item.container2} size={230} />}
                                    <div style={{ marginTop: '10px' }}>
                                        <div style={{ fontSize: '9px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{item.container2}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '50%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #000', padding: '10px', width: '100%', height: '100%' }}>
                                    {item.container3 && <QRCode value={item.container3} size={230} />}
                                    <div style={{ marginTop: '10px' }}>
                                        <div style={{ fontSize: '9px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{item.container3}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #000', padding: '10px', width: '100%', height: '100%' }}>
                                    {item.container4 && <QRCode value={item.container4} size={230} />}
                                    <div style={{ marginTop: '10px' }}>
                                        <div style={{ fontSize: '9px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{item.container4}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EtiquetasContainer;
