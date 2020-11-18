const sourceURL = 'https://api.nps.gov/api/v1/parks';
const apiKey = 'IFPvrwci5NG47ZUfz32lb1vGuY2tYzN9Mg75JNd1';

function submitForm() {
    console.log('submit ran')
    $('#parkForm').submit(e =>{
        e.preventDefault();
        const userInput = $('#stateName').val();
        const numResults = $('#maxNumber').val();
        getSearchResults(userInput,numResults);
    })
}

function formatQueryParameters(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getSearchResults(query, maxResults) {
    console.log('get search ran')
    const params = {
        key: apiKey,
        stateCode: query,
        limit: maxResults
    };
    const queryString = formatQueryParameters(params);
    const url = sourceURL + '?' + queryString;

    fetch(url)
    .then(response =>{
        if (response.ok){
            return response.json();
        }
    })
    .then(response => renderParkResults(response.data))
    .catch(err =>alert('Please try again'))
}

function renderParkResults(parkList){
    console.log(parkList);
    $('#results-list').html("");
    $('#results').text("Check your search result below:");
    parkList.forEach(item =>{
    $('#results-list').append(`<li><h3>${item.fullName}</h3>
    <p>${item.description}</p><a href=${item.url}>Park's Website</a><div id="addresses"><h5>${item.addresses[0].type}:</h5><p class="addresses">${item.addresses[0].line1}</p><p class="addresses">${item.addresses[0].city}</p><p class="addresses">${item.addresses[0].stateCode}</p>
    <p class="addresses">${item.addresses[0].city}, ${item.addresses[0].stateCode}, ${item.addresses[0].postalCode}</p></div></li>`)
    });
}

function init() {
    console.log('initializing');
    submitForm();
}

$(init)