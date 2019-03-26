function ajaxSearchMovies() {

  var inputUsr = $("#input-movies");
  var inpVal = inputUsr.val();

  var outData = {

    api_key : "9a91df29ebcb30ccb6b8d083a5400a47",
    language : "it-IT",
    query : inpVal
  }

  $.ajax({

    url : "https://api.themoviedb.org/3/search/movie",
    method : "GET",
    data : outData,
    success : function (data) {

      var ul = $(".cont-film");
      ul.remove();
      var arrayRes = data.results;

      for (var i = 0; i < arrayRes.length; i++) {

        var el = arrayRes[i];
        var title = el.title;
        var orgTit = el.original_title;
        var lang = el.original_language;
        var voto = el.vote_average;
        var img = el.poster_path;
        addDataMovie(title, orgTit, lang, voto, img);
        inputUsr.val("");
      }
    },
    error : function (request, state, error) {

      console.log("request", request),
      console.log("state", state),
      console.log("error", error)
    },
  });
}

function ajaxSearchSeries() {

  var inputUsr = $("#input-movies");
  var inpVal = inputUsr.val();

  var outData = {

    api_key : "9a91df29ebcb30ccb6b8d083a5400a47",
    language : "it-IT",
    query : inpVal
  }

  $.ajax({

    url : "https://api.themoviedb.org/3/search/tv",
    method : "GET",
    data : outData,
    success : function (data) {

      var ul = $(".cont-serie");
      ul.remove();
      var arrayRes = data.results;

      for (var i = 0; i < arrayRes.length; i++) {

        var el = arrayRes[i];
        var name = el.name;
        var nameTit = el.original_name;
        var lang = el.original_language;
        var votoS = el.vote_average;
        var img = el.poster_path;
        addDataSeries(name, nameTit, lang, votoS, img);
        inputUsr.val("");
      }
    },
    error : function (request, state, error) {

      console.log("request", request),
      console.log("state", state),
      console.log("error", error)
    },
  });
}

function getPostherImgM(img) {

  $.ajax({

    url : "https://image.tmdb.org/t/p/w92" + img,
    method : "GET",
    success : function(data, state) {

      var data = {

        img : img
      }
    },
    error : function(request, state, error) {

      console.log("request", request),
      console.log("state", state),
      console.log("error", error)
    }
  });
}

function getFlagM(lang) {

  var langLi = $(".lang_m").last();
  if (lang == "it" || lang == "IT") {

    lang = "<img src='imgs/italy.png'>";
    langLi.append(lang);
  } else if (lang == "US" || lang == "us") {

    lang = "<img src='imgs/united_states.png'>";
    langLi.append(lang);
  } else if (lang == "de" || lang == "DE") {

    lang = "<img src='imgs/germany.png'>";
    langLi.append(lang);
  } else if (lang == "en" || lang == "EN") {

    lang = "<img src='imgs/united_kingdom.png'>";
    langLi.append(lang);
  } else if (lang == "fr" || lang == "FR") {

    lang = "<img src='imgs/france.png'>";
    langLi.append(lang);
  } else {

    lang = "<img src='imgs/pirate.png'>";
    langLi.append(lang);
  }
}

function addDataMovie(title, orgTit, lang, voto, img) {

  var data = {

    title : title,
    orgTit : orgTit,
    lang : getFlagM(lang),
    img : getPostherImgM(img)
  }

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var ulMovies = compiled(data);
  var ul = $(".films");
  ul.append(ulMovies);

  var intVote = Math.ceil(voto/2);
  addStarsVoteM(intVote);
}

function getFlagS(lang) {

  var langLi = $(".lang_m").last();
  if (lang == "it" || lang == "IT") {

    lang = "<img src='imgs/italy.png'>";
    langLi.append(lang);
  } else if (lang == "US" || lang == "us") {

    lang = "<img src='imgs/united_states.png'>";
    langLi.append(lang);
  } else if (lang == "de" || lang == "DE") {

    lang = "<img src='imgs/germany.png'>";
    langLi.append(lang);
  } else if (lang == "en" || lang == "EN") {

    lang = "<img src='imgs/united_kingdom.png'>";
    langLi.append(lang);
  } else if (lang == "fr" || lang == "FR") {

    lang = "<img src='imgs/france.png'>";
    langLi.append(lang);
  } else {

    lang = "<img src='imgs/pirate.png'>";
    langLi.append(lang);
  }
}

function addDataSeries(name, nameTit, lang, votoS) {

  var data = {

    name : name,
    nameTit : nameTit,
    lang : getFlagS(lang),
    // img : getPostherImgM(img)
  }

  var template = $("#series-template").html();
  var compiled = Handlebars.compile(template);
  var ulSeries = compiled(data);
  var ul = $(".series");
  ul.append(ulSeries);

  var intVote = Math.ceil(votoS/2);
  addStarsVoteS(intVote);
}

// fatto con Nikolas
// function addStarsVote(voto) {
//   var html = "";
//   var liBox = $(".list-stars").last();
//
//   for (var i = 1; i <= 5; i++) {
//     if (voto >= i) {
//
//       html += "<i class='fas fa-star'></i>";
//     } else {
//
//       html += "<i class='far fa-star'></i>";
//     }
//   }
//   return html;
// }


//mio tentativo
function addStarsVoteM(voto) {

  var stellaVuota = "<i class='far fa-star'></i>";
  var stellaPiena = "<i class='fas fa-star'></i>";
  var liBox = $(".list-stars-M").last();//funzione last() per prendere sempre ultimo li

  for (var i = 1; i <= 5; i++) {//ciclo per appendere cinque stelle: Se voto è maggiore o uguale al contatore i

    if (voto >= i) {

      liBox.append(stellaPiena);
    } else {

      liBox.append(stellaVuota);
    }
  }
}

function addStarsVoteS(voto) {

  var stellaVuota = "<i class='far fa-star'></i>";
  var stellaPiena = "<i class='fas fa-star'></i>";
  var liBox = $(".list-stars-S").last();//funzione last() per prendere sempre ultimo li

  for (var i = 1; i <= 5; i++) {//ciclo per appendere cinque stelle: Se voto è maggiore o uguale al contatore i

    if (voto >= i) {

      liBox.append(stellaPiena);
    } else {

      liBox.append(stellaVuota);
    }
  }
}

function init() {

  var searchBtn = $("#btn-movies");
  searchBtn.click(ajaxSearchMovies);
  searchBtn.click(ajaxSearchSeries);

  var inputBtn = $("#input-movies");
  inputBtn.on("keyup", function(e) {

    if (e.keyCode == 13) {

      ajaxSearchMovies();
      ajaxSearchSeries();
    }
  })
}

$(document).ready(init);







//<i class="fas fa-flag"></i>   bandierina nera
//<i class="far fa-flag"></i>   bandierina bianca
//<i class="fas fa-flag-usa"></i> bandierina USA
//<i class="fas fa-flag-checkered"></i> bandierina race
