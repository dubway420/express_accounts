import './App.css';
import extractData from './extractors'
// import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import {placeholder, currencies, categories} from './constants' 

const React = require('react')

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  setProgress(m) {


    if (m.progress !== 0 && m.progress !== 0.5 && m.progress !== 1){
 
     var prog = "Progress: " + Math.round(m.progress*100) + "%"
     this.setState({progress: prog})
    }
   }
 
   worker = createWorker({
     logger: m => this.setProgress(m),
   });



  doOCR = async () => {
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    const { data: { text } } = await this.worker.recognize(this.state.file);

    console.log(text)

    var extracted = extractData(String(text))

    this.setState({money: (currencies[extracted.money.currency].symbol + extracted.money.value),
                   category: extracted.category})

    if (extracted.date){
      this.setState({progress: "Date: " + extracted.date.day + "/" + extracted.date.month + "/" + extracted.date.year});
    }
    else {
      this.setState({progress: "Cannot detect date"});
    }

  };

  handleChange(event) {
    
    this.setState({money: placeholder});
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      
    })

    this.doOCR()

  }

  setText(input){
    
    console.log("out:" + input)

    if (!input) {
      return "Please select a receipt"   
    } 
    else { 
      return input
    }

  }

  render() {
    
    return (
      <div className="container">
        <p>{this.setText(this.state.money)}</p>
        <p>{this.state.progress}</p>
        <p>{this.state.category}</p>
        <input type="file" onChange={this.handleChange}/>
        <img src={this.state.file} className='logo' alt=""/>
        
      </div>
    );
  }
}

export default App

