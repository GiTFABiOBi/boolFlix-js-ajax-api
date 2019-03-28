// CHIAMATA AJAX FILM
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
      var benvenutoTitle = $(".benvenuto").remove();
      var h2 = $(".box-data > h2.mov");
      h2.html("<span>FILM ORIGINALI BOOLFLIX</span>");
      var arrayRes = data.results;

      for (var i = 0; i < arrayRes.length; i++) {

        var el = arrayRes[i];
        var title = el.title;
        var orgTit = el.original_title;
        var lang = el.original_language;
        var voto = el.vote_average;
        var img = el.poster_path;
        var descr = el.overview;
        addDataMovie(title, orgTit, lang, voto, img, descr);
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
// AGGIUNGE DATI HTML DEI FILM
function addDataMovie(title, orgTit, lang, voto, img, descr) {

  var images = addPosterImg(img);
  var intVote = Math.ceil(voto/2);
  var rating = addStarsVote(intVote);
  var data = {

    title : title,
    orgTit : orgTit,
    lang : getFlag(lang),
    pathImg : images,
    rating : rating,
    overview : descr
  }

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var ulMovies = compiled(data);
  var ul = $(".films");
  ul.append(ulMovies);

}
// CHIAMATA AJAX SERIE TV
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
      var h2 = $(".box-data > h2.ser");
      h2.html("<span>SERIE ORIGINALI BOOLFLIX</span>");
      var arrayRes = data.results;

      for (var i = 0; i < arrayRes.length; i++) {

        var el = arrayRes[i];
        var name = el.name;
        var nameTit = el.original_name;
        var lang = el.original_language;
        var votoS = el.vote_average;
        var img = el.poster_path;
        var descr = el.overview;
        addDataSeries(name, nameTit, lang, votoS, img, descr);
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
// AGGIUNGE DATI HTML SERIE TV
function addDataSeries(name, nameTit, lang, votoS, img, descr) {

  var images = addPosterImg(img);
  var intVote = Math.ceil(votoS/2);
  var rating = addStarsVote(intVote);
  var data = {

    name : name,
    nameTit : nameTit,
    lang : getFlag(lang),
    pathImg : images,
    rating : rating,
    overview : descr
  }

  var template = $("#series-template").html();
  var compiled = Handlebars.compile(template);
  var ulSeries = compiled(data);
  var ul = $(".series");
  ul.append(ulSeries);
}
// AGGIUNGE LOCANDINA O LOCANDINA IMG NON PRESENTE
function addPosterImg(img) {

  var noLocand = "<div class='no-img'><span>immagine non disponibile</span></div>";
  var images = "";

    if (img == null) {

      images += noLocand;
    } else {

      images += "<div class='poster' style=\"background:url('https://image.tmdb.org/t/p/w342" + img + "');background-size:cover;\"></div>";
    }

  return images;
}
//AGGIUNGE BANDIERA NAZIONALITA'
function getFlag(lang) {

  if (lang == "it" || lang == "IT") {

    lang = "<img src='imgs/italy.png'>";
  } else if (lang == "US" || lang == "us") {

    lang = "<img src='imgs/united_states.png'>";
  } else if (lang == "de" || lang == "DE") {

    lang = "<img src='imgs/germany.png'>";
  } else if (lang == "en" || lang == "EN") {

    lang = "<img src='imgs/united_kingdom.png'>";
  } else if (lang == "fr" || lang == "FR") {

    lang = "<img src='imgs/france.png'>";
  } else {

    lang = "<span>Lingua: </span>" + lang;
  }

  return lang;
}
// AGGIUNGE STELLE IN BASE AL VOTO MEDIO
function addStarsVote(voto) {

  var stellaVuota = "<i class='far fa-star'></i>";
  var stellaPiena = "<i class='fas fa-star'></i>";
  var str = "";

  for (var i = 1; i <= 5; i++) {//ciclo per appendere cinque stelle: Se voto è maggiore o uguale al contatore i

    if (voto >= i) {

      str += stellaPiena;
    } else {

      str += stellaVuota;
    }
  }

  return str;
}
// AGGIUNGE STELLE(fatto con Nikolas)
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
function init() {
  //evento click
  var searchBtn = $("#btn-movies");
  searchBtn.click(ajaxSearchMovies);
  searchBtn.click(ajaxSearchSeries);
  //evento enter tastiera
  var inputBtn = $("#input-movies");
  inputBtn.on("keyup", function(e) {

    if (e.keyCode == 13) {

      ajaxSearchMovies();
      ajaxSearchSeries();
    }
  });
}

$(document).ready(init);
