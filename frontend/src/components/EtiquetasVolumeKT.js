// src/components/CSVUploader.js

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import Barcode from 'react-barcode';

const estiloTd = { border: '1px solid #000', padding: '4px', textAlign: 'left', paddingLeft: '20px', paddingRight: '20px' };
const estiloTdNegrito = { ...estiloTd, fontWeight: 'bold', paddingBottom: '15px', paddingTop: '15px' };

const EtiquetasVolumeKT = () => {
    const [data, setData] = useState([]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (event) => {
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
                <div className="label-container-a4">
                    {data.map((item, index) => (
                        item.caixa !== '' && (
                            <div
                                key={index}
                                className="label-etiq-a4"
                                style={{
                                    width: '210mm',
                                    height: '297mm',
                                    margin: '0mm auto',
                                    padding: '0mm',
                                    boxSizing: 'border-box',
                                    border: '1px solid #000',
                                    pageBreakAfter: 'always',
                                    background: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    minHeight: '297mm',
                                    maxWidth: '208mm'
                                }}>
                                <table style={{ marginTop: '0px', width: '100%', borderCollapse: 'collapse', fontSize: '38px', marginBottom: '10px' }}>
                                    <colgroup>
                                        <col style={{ width: '50%' }} />
                                        <col style={{ width: '30%' }} />
                                        <col style={{ width: '20%' }} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td style={estiloTdNegrito}>Origin:</td>
                                            <td style={estiloTd} colSpan="2">{item.origem}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Tobacco type:</td>
                                            <td style={estiloTd}>{item.desc}</td>
                                            <td style={{ ...estiloTd, textAlign: 'right' }}>{String(item.tipo).padStart(2, '0')}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Grade:</td>
                                            <td style={estiloTd} colSpan="2">{item.grade}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Crop :</td>
                                            <td style={estiloTd} colSpan="2">{item.ano}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Purchase Order:</td>
                                            <td style={estiloTd} colSpan="2">{item.order}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Carton No.:</td>
                                            <td style={estiloTd} colSpan="2">{item.numero}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Net weight:</td>
                                            <td style={estiloTd} colSpan="2">{item.net}</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Tare:</td>
                                            <td style={estiloTd} colSpan="2">{String(item.tare).replace(',', '.')}kg</td>
                                        </tr>
                                        <tr>
                                            <td style={estiloTdNegrito}>Gross weight:</td>
                                            <td style={estiloTd} colSpan="2">{String(item.gross).replace(',', '.')}kg</td>

                                        </tr>
                                        <tr>
                                            <td style={{ ...estiloTdNegrito, fontSize: '40px', textAlign: 'center' }} colSpan="3">
                                                {item.tipo + ' ' +
                                                    String(item.grade).trim().padStart(7, '0') + ' ' +
                                                    String(item.ano).substring(2, 4) + ' ' +
                                                    String(item.order)?.split('/')[0].trim().padStart(5, '0') + ' ' +
                                                    String(item.numero).padStart(4, '0') + ' ' +
                                                    String(item.net).padEnd(5, '0')}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
                                    <Barcode
                                        value={
                                            item.tipo +
                                            String(item.grade).trim().padStart(7, '0') +
                                            String(item.ano).substring(2, 4) +
                                            String(item.order)?.split('/')[0].trim().padStart(5, '0') +
                                            String(item.numero).padStart(4, '0') +
                                            String(item.net).padEnd(5, '0')
                                            || ''}
                                        height={100} width={2.7} fontSize={18}
                                        format='CODE128'
                                        displayValue={false}
                                    />
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
            <style>{`
                @media print {
                    body, html, #root, .label-container-a4 {
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 0;
                        background: #fff;
                    }
                    .label-etiq-a4 {
                        page-break-after: always;
                        width: 190mm !important;
                        height: 277mm !important;
                        margin: 0 auto !important;
                        box-sizing: border-box;
                    }
                }
            `}</style>
        </div>
    );
};

export default EtiquetasVolumeKT;
