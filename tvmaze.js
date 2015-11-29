/**
 * @overview A promise-based JavaScript wrapper for the [TVmaze API]{@link http://www.tvmaze.com/api}.
 * @author Ajay Thomas <ajaythomas123@gmail.com>
 * @license MIT
 */
var TVmaze = (function tvMaze() {
  /**
   * @module TVmaze
   */
  'use strict';

  var rootURL = "http://api.tvmaze.com";

  /**
   * Retrieve the JSON API response.
   *
   * @param {String} url The API request URL.
   * @returns {Promise.<Array.<Object>>} Array of objects.
   * @memberof module:TVmaze
   * @private
   */
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

  /**
   * Retrieve search results.
   *
   * @param {String} query The search query.
   * @returns {Promise.<Array.<Object>|Object>} Search results.
   * @memberof module:TVmaze
   */
  function showSearch(query) {
    return getJSON(rootURL + "/search/shows?q=" + query);
  }

  /**
   * Retrieve a single search result.
   *
   * @param {String} query The search query.
   * @returns {Promise.<Object>} Single search result.
   * @memberof module:TVmaze
   */
  function singleSearch(query) {
    return getJSON(rootURL + "/singlesearch/shows?q=" + query);
  }

  /**
   * Retrieve information about the show from [TVRage]{@link http://www.tvrage.com} or
   * [TheTVDB]{@link http://www.thetvdb.com}.
   *
   * @param {Number} id The show's TVRage or TheTVDB ID.
   * @param {String} source Either <b>tvrage</b> or <b>thetvdb</b>.
   * @returns {Promise.<Object>} Information about the show.
   * @memberof module:TVmaze
   */
  function showLookup(id, source) {
    return getJSON(rootURL + "/lookup/shows?" + source + "=" + id);
  }

  /**
   * Retrieve a list of people.
   *
   * @param {String} query The search query.
   * @returns {Promise.<Array.<Object>|Object>} List of people.
   * @memberof module:TVmaze
   */
  function peopleSearch(query) {
    return getJSON(rootURL + "/search/people?q=" + query);
  }

  /**
   * Retrieve a complete list of episodes that air in a given country on a given
   * day.
   *
   * @param {String|null} countryCode ISO 3166-1 code of the country. If set to
   * null, it returns the schedule for the US.
   * @param {String|null} date ISO 8601 formatted date. If set to null, it
   * returns the schedule for the current day.
   * @returns {Promise.<Array.<Object>>}
   * @memberof module:TVmaze
   */
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

  /**
   * Retrieve a list of all future episodes known to TVmaze, regardless of their
   * country.
   *
   * @returns {Promise.<Array.<Object>>} List of all future episodes.
   * @memberof module:TVmaze
   */
  function fullSchedule() {
    return getJSON(rootURL + "/schedule/full");
  }

  /**
   * Retrieve all primary information for a given show.
   *
   * @param {Number} id TVmaze ID of the show.
   * @returns {Promise.<Object>} Primary information for a given show.
   * @memberof module:TVmaze
   */
  function shows(id) {
    return getJSON(rootURL + "/shows/" + id);
  }

  /**
   * Retrieve a complete list of episodes for the given show.
   * 
   * @param {Number} id TVmaze ID of the show.
   * @param {Boolean|null} specials If <b>true</b>, the list will include
   * specials.
   * @returns {Promise.<Array.<Object>>} Complete list of episodes for the
   * given show.
   * @memberof module:TVmaze
   */
  function showEpisodeList(id, specials) {
    var apiURL = "/shows/" + id + "/episodes";
    if (specials) {
      apiURL += "?specials=1";
    }
    return getJSON(rootURL + "/shows/" + id + "/episodes");
  }

  /**
   * Retrieve one specific episode of the show given the season and episode
   * number.
   *
   * @param {Number} id TVmaze ID of the show.
   * @param {Number} season Season number.
   * @param {Number} episode Episode number.
   * @returns {Promise.<Object>} Information about the episode.
   * @memberof module:TVmaze
   */
  function episodeByNumber(id, season, episode) {
    return getJSON(rootURL + "/shows/" + id + "/episodebynumber?season=" +
      season + "&number=" + episode);
  }

  /**
   * Retrieve all episodes of the show that have aired on a specific date.
   * 
   * @param {Number} id TVmaze ID of the show.
   * @param {String} date ISO 8601 formatted date.
   * @returns {Promise.<Array.<Object>|Object>}
   * @memberof module:TVmaze
   */
  function episodeByDate (id, date) {
    return getJSON(rootURL + "/shows/" + id + "/episodesbydate?date=" + date);
  }

  /**
   * Retrieve a list of main cast for the show.
   *
   * @param {Number} id TVmaze ID of the show.
   * @returns {Promise.<Array.<Object>>} List of main cast for the show.
   * @memberof module:TVmaze
   */
  function showCast(id) {
    return getJSON(rootURL + "/shows/" + id + "/cast");
  }

  /**
   * Retrieve a list of aliases for the show.
   *
   * @param {Number} id TVmaze ID of the show.
   * @returns {Promise.<Array.<Object>|Object>} List of aliases for the show.
   * @memberof module:TVmaze
   */
  function showAKAs(id) {
    return getJSON(rootURL + "/shows/" + id + "/akas");
  }

  /**
   * Retrieve a list of all shows in the TVmaze database, with all primary
   * information included. This endpoint is paginated with a maximum of 250
   * results per page. Pagination is based on show ID.
   * 
   * @param {Number} pageNumber The page number.
   * @returns {Promise.<Array.<Object>>} List of shows in the TVmaze database.
   * @memberof module:TVmaze
   */
  function showIndex(pageNumber) {
    return getJSON(rootURL + "/shows?page=" + pageNumber);
  }

  /**
   * Retrieve all primary information for a given person.
   *
   * @param {Number} id TVmaze ID of the person.
   * @param {Boolean|null} embed If <b>true</b>, embeds cast credits for the person.
   * @returns {Promise.<Object>} All primary information for a given person.
   * @memberof module:TVmaze
   */
  function personInfo(id, embed) {
    var apiURL = "/people/" + id;
    if (embed) {
      apiURL += "?embed=castcredits";
    }
    return getJSON(rootURL + apiURL);
  }

  /**
   * Retrieve all (show-level) cast credits for a person.
   *
   * @param {Number} id TVmaze ID of the show.
   * @param {Boolean|null} embed If <b>true</b>, embeds full information for the shows
   * and characters.
   * @returns {Promise.<Array.<Object>|Object>} All (show-level) cast credits.
   * @memberof module:TVmaze
   */
  function personCastCredits(id, embed) {
    var apiURL = "/people/" + id + "/castcredits";
    if (embed) {
      apiURL += "?embed=show";
    }
    return getJSON(rootURL + apiURL);
  }

  /**
   * Retrive all (show-level) crew credits for a person.
   *
   * @param {Number} id TVmaze ID of the show.
   * @param {Boolean|null} embed If <b>true</b>, embeds full information for the
   * shows.
   * @returns {Promise.<Array.<Object>|Object>} All (show-level) crew credits.
   * @memberof module:TVmaze
   */
  function personCrewCredits(id, embed) {
    var apiURL = "/people/" + id + "/crewcredits";
    if (embed) {
      apiURL += "?embed=show";
    }
    return getJSON(rootURL + apiURL);
  }

  /**
   * Retrieve a list of all shows in the TVmaze database and the timestamp
   * when they were last updated.
   *
   * @returns {Promise.<Object>} A list of all shows in the TVmaze database
   * and the timestamp when they were updated.
   * @memberof module:TVmaze
   */
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
