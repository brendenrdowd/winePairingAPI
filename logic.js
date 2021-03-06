const store ={
    searchUrl:"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food=",
    recoURL: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation?minRating=0.7&number=5&wine=",
    BRENDEN_KEY:"fT7bfv7YGGmshOWpHRupMoc5eXzLp1mUWeEjsn9TtTgMefEoGe",
    OLEG_KEY: "c850e6ab0emsh9017fe66e6abe0dp17c4f0jsn0a8aa63ab92f"
}



function formatQuery(query) {
    let newQuery = "";
    for (let i = 0; i < query.length; i++) {
        query[i] == " " ? newQuery += "%20" : newQuery += query[i];
    }
    return newQuery;
}

function getPairing(query) {
    $('#js-error-message').text(``);
    const q = formatQuery(query);
    const url = store.searchUrl + q;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": store.BRENDEN_KEY
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function getRecommendations(wine) {
    $('js-error-message').text('');
    const q = formatQuery(wine);
    const url = store.recoURL + q;
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": store.OLEG_KEY 
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayRecommendations(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    if (responseJson.status == 'failure') {
        return $('#js-error-message').text(responseJson.message);
    }
    else if (responseJson.pairingText == '') {
        return $('#js-error-message').text(`Could not find pairing information at this time`);
    }
    let list = responseJson.pairedWines;
    $('#results-list').empty();
    $('#reco-list').empty();
    $('#results-list').append(`<li><p>${responseJson.pairingText}</p></li>`);
    for (let i = 0; i < list.length; i++) {
        $('#results-list').append(
            `<li>
                <a class="js-reco" href="#" data-value="${list[i]}">${list[i]}</a>
            </li>`
        )
    };
    $('#results').removeClass('hidden');
}

function displayRecommendations(responseJson) {
    const wines = responseJson.recommendedWines;
    errorMessage = $('#js-error-message');
    errorMessage.text(`Could not find wines at this time`);
    if (responseJson.recommendedWines.length == 0) {
        return $('#js-error-message').text(`Could not find wines at this time`);
    }
    $('#reco-list').empty();
    for (let i = 0; i < wines.length; i++) {
        $('#reco-list').append(
            `<li class="spacing">
                <h3 class="spacing">${wines[i].title}</h3>
                <img src=${wines[i].imageUrl} alt="${wines[i].title}">
                <p class="card-text spacing">${wines[i].description}</p>
                <h4>${wines[i].price}</h4>
                <div class="row spacing">
                    <p>Average Rating: <span class="maroon-info">${wines[i].averageRating.toFixed(2)}</span> </p>
                    <p>Reviews:  <span class="maroon-info">${wines[i].averageRating.toFixed(2)}</span></p>
                    <p>Score: <span class="maroon-info">${wines[i].score.toFixed(2)}</span> </p>
                </div>
                <a class="center" target="_blank" href=${wines[i].link}>link</a>
            </li>`
        );
    }
}

function watchLink() {
    $('#results-list').on('click', '.js-reco', function (event) {
        event.preventDefault();
        const wine = $(this).data("value");
        getRecommendations(wine);
        return false;
    });
}

function watchForm() {
    // brenden
    $('form').submit(event => {
        event.preventDefault();

        const query = $('#query').val();
        getPairing(query)
    })
}

function intialize(){
    $(watchForm)
    $(watchLink)
}

$(intialize)
