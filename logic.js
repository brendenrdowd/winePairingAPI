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
    let res = responseJson.pairedWines;
    $('#results-list').empty();
    console.log(res);
    for (let i = 0; i < res.length; i++) {
        $('#results-list').append(
            `<li>
            <h3>${res[i].pairedWines}</h3>
            </li>`
        )
    };
    $('#results-list').append('<p>${res[i].pairedText}</p>')
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