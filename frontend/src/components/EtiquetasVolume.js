// src/components/CSVUploader.js

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import QRCode from 'qrcode.react';

const EtiquetasVolume = () => {
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
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Etiquetas de Volume</span>
                        <input {...getInputProps()} />
                        <p>Arraste e solte o arquivo CSV aqui, ou clique para selecionar o arquivo</p>
                    </div>
                    <button onClick={() => window.location.reload()} style={{ width: '100px', height: '50px', color: '#fff', backgroundColor: 'grey', border: '1px solid #000', borderRadius: '5px' }}>Voltar</button>
                </>
            )}
            {data.length > 0 && (
                <div className="label-container">
                    {data.map((item, index) => (
                        <>
                            {item.caixa !== '' && (
                                <div key={index} className="label-etiq" style={{ pageBreakAfter: 'always', border: '1px solid #000', boxSizing: 'border-box' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #000', margin: -21, marginBottom: '20px', maxHeight: '34mm', height: '100%', paddingLeft: '20px' }}>
                                        <strong style={{ fontSize: '24px' }}>ORDER NO.:</strong>
                                        <span style={{ fontSize: 92, marginLeft: '350px', fontWeight: 'bold' }}>{item.order}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #000', margin: -21, marginBottom: '20px', height: '38mm', paddingLeft: '20px' }}>
                                        <strong style={{ fontSize: '24px' }}>GRADE:</strong>
                                        <span style={{ fontSize: '92px', marginLeft: '250px', fontWeight: 'bold' }}>{item.grade}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #000', margin: -21, marginBottom: '10px', height: '76mm', paddingLeft: '20px' }}>
                                        <strong style={{ fontSize: '24px' }}>CARTON NO.:</strong>
                                        <span style={{ fontSize: '92px', marginLeft: 'auto', fontWeight: 'bold' }}>{item.numero}</span>
                                        <div style={{ marginLeft: 'auto', flexDirection: 'column', paddingRight: '20px' }}>
                                            <QRCode value={item.caixa} size={230} />
                                            <div style={{ marginTop: '10px' }}>
                                                <div style={{ fontSize: '12px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{item.caixa}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '10mm', paddingLeft: '40px', paddingRight: '110px', marginBottom: '-10px' }}>
                                        <div><strong style={{ fontSize: '24px' }}>GROSS</strong></div>
                                        <div><strong style={{ fontSize: '24px' }}>TARE</strong></div>
                                        <div><strong style={{ fontSize: '24px' }}>NET</strong></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '18mm' }}>
                                        <div><span style={{ fontSize: '60px', fontWeight: 'bold' }}>{item.gross}</span><span style={{ fontSize: '40px', fontWeight: 'bold' }}> Kgs</span></div>
                                        <div><span style={{ fontSize: '60px', fontWeight: 'bold' }}>{item.tare}</span><span style={{ fontSize: '40px', fontWeight: 'bold' }}> Kgs</span></div>
                                        <div><span style={{ fontSize: '60px', fontWeight: 'bold' }}>{item.net}</span><span style={{ fontSize: '40px', fontWeight: 'bold' }}> Kgs</span></div>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EtiquetasVolume;
