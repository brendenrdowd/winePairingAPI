const searchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food="
const recoURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation?minRating=0.7&number=5&wine="

function formatQuery(query){
    let newQuery = "";
    for(let i = 0;i<query.length;i++){
        query[i] == " " ? newQuery += "%20" : newQuery += query[i];
    }
    return newQuery;
}

function getPairing(query) {
    // brenden
    const q = formatQuery(query);
    const url = searchUrl + q;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "fT7bfv7YGGmshOWpHRupMoc5eXzLp1mUWeEjsn9TtTgMefEoGe" //brenden api key
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
    const q = formatQuery(wine);
    console.log('hitting GR function',wine)
    const url = recoURL + q;
    console.log("URL:",url)
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "2145f85faemshaf2d21d064b7729p1c43f8jsn554d2c587e96" //Oleg api key
        }
    })
        .then(response => {
            if (response.ok) {
                console.log("ok")
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
    let products = responseJson.productMatches;
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
    // for (let i = 0; i < products.length; i++) {
    //     $('#results-list').append(
    //         `<li class="card">
    //         <h3 class="center">${products[i].title}</h3>
    //         <img src=${products[i].imageUrl} alt="${products[i].title} image">
    //         <p class="card-text">${products[i].description}</p>
    //         <h4>${products[i].price}</h4>
    //         <div class="row">
    //             <p>Average Rating: <span class="maroon-info">${products[i].averageRating.toFixed(2)}</span> </p>
    //             <p>Reviews:  <span class="maroon-info">${products[i].averageRating.toFixed(2)}</span></p>
    //             <p>Score: <span class="maroon-info">${products[i].score.toFixed(2)}</span> </p>
    //         </div>
    //         <a class="center" href=${products[i].link}>link</a>
    //         </li>`
    //     )
    // }
    $('#results').removeClass('hidden');
}

function displayRecommendations(responseJson) {
    console.log('firing DR',responseJson);
    const wines = responseJson.recommendedWines;
    $('#reco-list').empty();    
    for (let i = 0; i < wines.length; i++) {
        $('#reco-list').append(
            `<li>
                <div>
                    <h3 class="center">${wines[i].title}</h3>
                    <img src=${wines[i].imageUrl} alt="${wines[i].title} image">
                    <p class="card-text">${wines[i].description}</p>
                    <h4>${wines[i].price}</h4>
                    <div class="row">
                        <p>Average Rating: <span class="maroon-info">${wines[i].averageRating.toFixed(2)}</span> </p>
                        <p>Reviews:  <span class="maroon-info">${wines[i].averageRating.toFixed(2)}</span></p>
                        <p>Score: <span class="maroon-info">${wines[i].score.toFixed(2)}</span> </p>
                    </div>
                    <a class="center" href=${wines[i].link}>link</a>
                </div>
            </li>`
        );
    }
}

function watchLink(){
    $('#results-list').on('click','.js-reco',function(event){ 
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

$(watchForm)
$(watchLink)