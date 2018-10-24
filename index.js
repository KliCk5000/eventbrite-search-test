const EVENTBRITE_API_URL = "https://www.eventbriteapi.com/v3/";
const GOOGLE_MAPS_API_URL = "";
const GOOGLE_CALENDAR_API_URL = "";
const EVENTBRITE_KEY = "JRKAA3O73D" + "DJB47QH5OT";
const GMAPS_KEY = "";
const GCAL_KEY = "";

// Get Events list
function getEventsList(location, maxDistance) { 
  // -setup query
  const params = {
    'location.address': location,
    'location.within': maxDistance + 'mi',
    token: EVENTBRITE_KEY,
  };
  // -put url together (FormatQueryParams)
  const queryString = formatQueryParams(params);
  const url = `${EVENTBRITE_API_URL}events/search/?${queryString}`;
 
  console.log(url);

  // -FETCH
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

// Display results
function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-results-list').empty();

  for (let obj in responseJson.events) {
    $('.js-results-list').append(
      `<li><h3><a href="${responseJson.events[obj].url}">${responseJson.events[obj].name.text}</a></h3>
      <p>Description: ${responseJson.events[obj].description.text}</p>
      </li>
      `
    );
  }

  $('.js-results').removeClass('hidden');
}

// Watch for event submit on button
// (send info to function)
function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const location = $('.js-location').val();
    const maxDistance = $('.js-max-distance').val();

    getEventsList(location, maxDistance);
  });
}

// Jquery watch form
$(watchForm);