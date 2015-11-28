var TVMaze = (function tvMaze() {
  'use strict';

  var rootURL = "http://api.tvmaze.com";

  function getJSON(url) {
    return new Promise(function(resolve, reject){
      var req = new XMLHttpRequest();
      req.open("GET", url);
      req.responseType = 'json';
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("Network Error"));
      };

      req.send();
    });
  }

  function showSearch(query) {
    return getJSON(rootURL + "/search/shows?q=" + query);
  }

  function singleSearch(query) {
    return getJSON(rootURL + "/singlesearch/shows?q=" + query);
  }

  function showLookup(id, option) {
    return getJSON(rootURL + "/lookup/shows?" + option + "=" + id);
  }

  function peopleSearch(query) {
    return getJSON(rootURL + "/search/people?q=" + query);
  }

  function schedule(countryCode, date){
    var schedURL = "/schedule";
    if(countryCode && date) {
      schedURL += "?country=" + countryCode + "&date=" + date;
    }
    else if (countryCode && !date) {
      schedURL += "?country=" + countryCode;
    }
    else if (!countryCode && date) {
      schedURL += "?date=" + date;
    }

    return getJSON(rootURL + schedURL);
  }

  var publicAPI = {
    showSearch: showSearch,
    singleSearch: singleSearch,
    showLookup: showLookup,
    peopleSearch: peopleSearch,
    schedule: schedule
  };

  return publicAPI;
})();