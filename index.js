'use strict';

const searchTerm= $('#js-search').val();

function displayResults(responseJson) {
  console.log(responseJson);
  //$('#insertUsername').append(`${searchTerm}`)
  //$('#results-list').empty();
  //$('#results').empty();
  //$('#results').append(`
    //<h3>Search Results For ${searchTerm}</h3>
  //  `);

  for (let i=0; i<responseJson.length; i++){

    $('#results-list').append(
      `<li>
      <p>Repo Name:<a href="${responseJson[i].name}"></a></p>
      <p>Link:<a href="${responseJson[i].html_url}"></a></p>

      </li>`);

      $('#results').removeclass('hidden');
    }
}

function getResults() {

  fetch(`https://api.github.com/users/${searchTerm}/repos`)
    .then(response=> {
      if (response.ok) {
        return response.Json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`)
      });
}

function formWatch() {
  $('#js-submit').submit(function(e) {
    e.preventDefault();
    getResults();
  });
}
$(formWatch());
