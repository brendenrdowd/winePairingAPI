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
    $('#results-list').empty();
    for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
        $('#results-list').append(
            `<li>
            <h3>${list[i]}</h3>
            </li>`
        )
    };
    $('#results-list').append(`<li><p>${responseJson.pairedText}</p></li>`)
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