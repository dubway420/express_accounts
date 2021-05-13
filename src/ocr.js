// // import React, { useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import valueWrapper from './extractors'
// import {placeholder} from './constants' 


// function OCR(image, useEffect, useState) {

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

//       <p>{valueWrapper(ocr)}</p>

//   );
  
// }

// export default OCR;