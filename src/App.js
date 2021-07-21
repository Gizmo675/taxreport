import './App.css';
import React from 'react'
import { parse } from 'papaparse'

function App() {

  const [taxes, setTaxes] = React.useState([])

  const drop = event => {
    // event.stopPropagation();
    event.preventDefault();
    Array.from(event.dataTransfer.files).forEach( async (file) => {
      const text = await file.text();
      const result = parse(text, {header: true});
      setTaxes(()=> [...result.data]);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id='container'>
          <h1>Taxreport</h1>
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={drop}
            // onDrop={(event) => {
            //   event.preventDefault();
            //   event.stopPropagation();
            //   // console.log(e.dataTransfer.files);
            //   // Array.from(e.dataTransfer.files).forEach( async (file) => {
            //   //   const text = await file.text();
            //   //   const result = parse(text, {header: true});
            //   //   setTaxes(()=> [...result.data]);
            //   // })
            // }}
          >
            Dépose ton taxreport
          </div>
          <div className="result">
            <div>
              {/* <p>taux TVA :</p> */}
              {taxes.map((taxe)=>(
                <ul key={taxe['Transaction ID']} >{taxe['Tax Rate']}</ul>
              ))}
            </div>
            <div>
              {/* <p>CA :</p> */}
              {taxes.map((taxe)=>(
                <ul key={taxe.SKU} >{taxe['OUR_PRICE Tax Inclusive Selling Price']}</ul>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;