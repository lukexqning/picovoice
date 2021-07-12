var capitalCache;
var codeMap;


// First fetch all of the data for all countries. This reduces the need for multiple API calls to just 1.
// Since there are < 300 countries in the world, storage required is acceptable.
function fetchAll() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then(response => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    // Store both the country's information and its 3 letter code since all border information are for 
    // the 3 letter codes.
    .then(data => {
      [capitalCache, codeMap] = data.reduce((obj, countryObj) => {
        obj[0][countryObj.alpha3Code] = {
          name: countryObj.alpha3Code,
          borders: countryObj.borders,
          capital: countryObj.capital
        };
        obj[1][countryObj.name.toLowerCase()] = countryObj.alpha3Code;
        return obj
      }, [{}, {}])
    })
    .catch(error => {
      console.log(error);
    })
}


// Check the local cache for the desired country, otherwise return a message requesting for a new country
function search() {
  var country = document.getElementById('country').value;
  var text;
  var code = codeMap[country.toLowerCase()];
  var data = capitalCache[country.toUpperCase()];
  // if the user has given a full name, we use the map to find the 3 letter code first
  if (code) {
    var capitals = [capitalCache[code].capital];
    for (neigh of capitalCache[code].borders) {
      capitals.push(capitalCache[neigh].capital);
    }
    text = `The capital of ${country} and its neighbours are ${capitals.join(', ')}`
  }
  // if the user has given a 3 letter code, we don't use the map
  else if (data) {
    var capitals = [data.capital];
    for (neigh of data.borders) {
      capitals.push(capitalCache[neigh].capital);
    }
    text = `The capital of ${country} and its neighbours are ${capitals.join(', ')}`
  }
  // if the country is not found, we return an error
  else {
    text = "The country you have searched for could not be found. Please try again!"
  }
  // display the result in the DOM
  document.getElementById("result").innerHTML = text;
}


fetchAll();