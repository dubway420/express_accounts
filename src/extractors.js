import {currencies, placeholder} from './constants'


function detectCurrency(words) {

    var detected = -1
    var first_index = -1
    var num = -1

    for (var i = 0; i < currencies.length; i++) {
        
        var currency_symbol = currencies[i].symbol;

        // console.log("\n ======= \n", currency_symbol.replace(/\\\$/,"$"), "\n ======= \n")

        var found = words.match(RegExp(currency_symbol));

        if (found && detected == -1) {
            
            detected = i;
            first_index = found.index;
            num = (words.match(RegExp(currency_symbol, "ig")).length);

        };
      }

  return [detected, first_index, num]    
}

function extractTotal(words) {

  var currency_info = detectCurrency(words);

  if (currency_info[0] > -1) { 

    var values = []

    var start = currency_info[1];
    
    var symbol = currencies[currency_info[0]].symbol.replace(/\\\$/,"\$")

    for (var i = 0; i < currency_info[2]; i++) {

      var end = words.indexOf(" ", start)

      // console.log(parseFloat(words.substring(start+1, end)), Number.isFinite(parseFloat(words.substring(start+1, end))))
      
      if (Number.isFinite(parseFloat(words.substring(start+1, end)))) {
        values.push(parseFloat(words.substring(start+1, end)))
      }

      start = words.indexOf(symbol, end)

    }

 
    return "Total value: " + symbol + String(Math.max(...values));
  } else {

    return "No currency detected! Please try a different receipt image."
  }

}

function getDate(d)
{
    console.log(d)

    var day, month, year;

    var result = d.match(/\d{2}([\/.-])\d{2}\1\d{2}/);
    
    console.log("result 2: " + result)

    if(null != result) {
      dateSplitted = result[0].split(result[1]);
      day = dateSplitted[0];
      month = dateSplitted[1];
      year = dateSplitted[2];
  }

    result = d.match(/\d{2}([\/.-])\d{2}\1\d{4}/);
    
    if(null != result) {
        
        var dateSplitted = result[0].split(result[1]);
        day = dateSplitted[0];
        month = dateSplitted[1];
        year = dateSplitted[2];
    }
    
    if(month>12) {
        var aux = day;
        day = month;
        month = aux;
    }
    
    return day+"/"+month+"/"+year;
}


function getData(words) {

  return [extractTotal(words), getDate(words)]
}

export default getData
