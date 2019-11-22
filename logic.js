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
                return response.json();
            }
            // if(response.status)
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    if(responseJson.status == 'failure'){
        return $('#js-error-message').text(responseJson.message);
    }
    else if(responseJson.pairingText == ''){
        return $('#js-error-message').text(`Could not find pairing information at this time`);
    }
    let list = responseJson.pairedWines;
    let products = responseJson.productMatches;
    $('#results-list').empty();
    for (let i = 0; i < list.length; i++) {
        $('#results-list').append(
            `<li>
            <h3> ${i +1}. ${list[i]}</h3>
            </li>`
        )
    };
    $('#results-list').append(`<li><p>${responseJson.pairingText}</p></li>`);
    $('#results-list').append(`<li><h2>Placeholder for 2nd API</h2></li>`);
    for(let i = 0; i < products.length;i++){
        $('#results-list').append(
            `<li class="card">
            <h3 class="center">${products[i].title}</h3>
            <img src=${products[i].imageUrl} alt="${products[i].title} image">
            <p class="card-text">${products[i].description}</p>
            <h4>${products[i].price}</h4>
            <div class="row">
                <p>Average Rating: <span class="maroon-info">${products[i].averageRating.toFixed(2)}</span> </p>
                <p>Reviews:  <span class="maroon-info">${products[i].averageRating.toFixed(2)}</span></p>
                <p>Score: <span class="maroon-info">${products[i].score.toFixed(2)}</span> </p>
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