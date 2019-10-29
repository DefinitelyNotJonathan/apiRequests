'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p>${responseJson[i].html_url}</p>
      </li>`
    )};
  //display the results section
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  const queryString = `${query}/repos`

  const url = searchURL + queryString;

  console.log(url);

  fetch(url)
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

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
