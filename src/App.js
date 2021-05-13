import './App.css';
import extractTotal from './extractors'
// import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import {placeholder} from './constants' 

const React = require('react')

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  worker = createWorker({
    logger: m => console.log(m),
  });

  doOCR = async () => {
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    const { data: { text } } = await this.worker.recognize(this.state.file);
    this.setState({text: extractTotal(text)});

  };

  handleChange(event) {
    
    this.setState({text: placeholder});
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      
    })

    this.doOCR()

  }
  render() {
    return (
      <div className="container">
        <input type="file" onChange={this.handleChange}/>
        <img src={this.state.file} className='logo'/>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default App

// import React, { useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import './App.css';
// import image from './rec6.jpeg'
// import valueWrapper from './extractors'
// import {placeholder} from './constants' 

// function handleChange(event) {
//     this.setState({
//       file: URL.createObjectURL(event.target.files[0])
//     })
//   }

// function App() {

//   const worker = createWorker({
//     logger: m => console.log(m),
//   });
//   const doOCR = async () => {
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     const { data: { text } } = await worker.recognize(image);
//     setOcr(text);
//   };
//   const [ocr, setOcr] = useState(placeholder);
//   useEffect(() => {
//     doOCR();
//   });

  
//   return (
//     <div className="App" className="container">
      

          

//       <img src={image} alt="Italian Trulli" className='logo'></img>
//       <p>{valueWrapper(ocr)}</p>
//     </div>
//   );
// }



// export default App;