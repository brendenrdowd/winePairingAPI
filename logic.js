const searchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food="


function getPairing(query) {
    // brenden
    const url = searchUrl + query;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "fT7bfv7YGGmshOWpHRupMoc5eXzLp1mUWeEjsn9TtTgMefEoGe"
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('ok')
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    let list = responseJson.pairedWines;
    let products = responseJson.productMatches;
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < list.length; i++) {
        $('#results-list').append(
            `<li>
            <h3>${list[i]}</h3>
            </li>`
        )
    };
    $('#results-list').append(`<li><p>${responseJson.pairingText}</p></li>`);
    $('#results-list').append(`<li><h2>Placeholder for 2nd API</h2></li>`);
    for(let i = 0; i < products.length;i++){
        $('#results-list').append(
            `<li class="card">
            <img class="center" src=${products[i].imageUrl} alt="product image">
            <h3 class="center">${products[i].title}</h3>
            <p>${products[i].description}</p>
            <p>${products[i].price}</p>
            <div class="row">
                <p>Average Rating: ${products[i].averageRating}</p>
                <p>Reviews: ${products[i].ratingCount}</p>
                <p>Score: ${products[i].score}</p>
            </div>
            <a class="center" href=${products[i].link}>link</a>
            </li>`
        )
    }
    $('#results').removeClass('hidden');
}


function watchForm() {
    // brenden
    $('form').submit(event => {
        event.preventDefault();
        const query = $('#query').val();
        getPairing(query)
    })
}

$(watchForm)