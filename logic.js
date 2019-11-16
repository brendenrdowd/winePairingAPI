const searchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food="


function getPairing(query){
    // brenden
    fetch(searchUrl + query)
.then(response => {
	console.log(response);
})
.then(response => displayResults(response))
.catch(err => {
	console.log(err);
});
}

function displayResults(responseJson){
    // oleg
}

function watchForm(){
    // brenden
}

$(watchForm)