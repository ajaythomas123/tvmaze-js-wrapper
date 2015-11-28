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

  function schedule(countryCode, date) {
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

  function fullSchedule() {
    return getJSON(rootURL + "/schedule/full");
  }

  function shows(id) {
    return getJSON(rootURL + "/shows/" + id);
  }

  function showEpisodeList(id) {
    return getJSON(rootURL + "/shows/" + id + "/episodes");
  }

  function episodeByNumber(id, season, number) {
    return getJSON(rootURL + "/shows/" + id + "/episodebynumber?season=" +
      season + "&number=" + number);
  }

  function episodeByDate (id, date) {
    return getJSON(rootURL + "/shows/" + id + "/episodesbydate?date=" + date);
  }

  function showCast(id) {
    return getJSON(rootURL + "/shows/" + id + "/cast");
  }

  function showAKAs(id) {
    return getJSON(rootURL + "/shows/" + id + "/akas");
  }

  function showIndex(num) {
    return getJSON(rootURL + "/shows?page=" + num);
  }

  function personInfo(id, embed) {
    var apiURL = "/people/" + id;
    if (embed) {
      apiURL = "/people/" + id + "?embed=castcredits";
    }
    return getJSON(rootURL + apiURL);
  }

  function personCastCredits(id, embed) {
    var apiURL = "/people/" + id + "/castcredits";
    if (embed) {
      apiURL = "/people/" + id + "/castcredits?embed=show";
    }
    return getJSON(rootURL + apiURL);
  }

  function personCrewCredits(id, embed) {
    var apiURL = "/people/" + id + "/crewcredits";
    if (embed) {
      apiURL = "/people/" + id + "/crewcredits?embed=show";
    }
    return getJSON(rootURL + apiURL);
  }

  function showUpdates() {
    return getJSON(rootURL + "/updates/shows");
  }

  var publicAPI = {
    showSearch: showSearch,
    singleSearch: singleSearch,
    showLookup: showLookup,
    peopleSearch: peopleSearch,
    schedule: schedule,
    fullSchedule: fullSchedule,
    shows: shows,
    showEpisodeList: showEpisodeList,
    episodeByNumber: episodeByNumber,
    episodeByDate: episodeByDate,
    showCast: showCast,
    showAKAs: showAKAs,
    showIndex: showIndex,
    personInfo: personInfo,
    personCastCredits: personCastCredits,
    personCrewCredits: personCrewCredits,
    showUpdates: showUpdates
  };

  return publicAPI;
})();
