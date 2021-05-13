import {currencies, placeholder} from './constants'


function detectCurrency(words) {

    var detected = -1
    var first_index = -1
    var num = -1

    for (var i = 0; i < currencies.length; i++) {
        
        var currency_symbol = currencies[i].symbol;

        // console.log("\n ======= \n", currency_symbol.replace(/\\\$/,"$"), "\n ======= \n")

        var found = words.match(RegExp(currency_symbol));

        if (found) {
            console.log(currencies[i].name + " found!")
            if (detected > -1) {console.log("Warning, currency " + currencies[detected].name + " previously found")};
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
      values.push(parseFloat(words.substring(start+1, end)))

      start = words.indexOf(symbol, end)

    }

    return "Total value: " + symbol + String(Math.max(...values));
  } else {

    return "No currency detected! Please try a different receipt image."
  }

}

function valueWrapper(words) {

  if (words === placeholder) {

    return words
  } 

  else {
    return extractTotal(words)
  }


}


export default extractTotal
