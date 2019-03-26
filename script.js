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

      var arrayRes = data.results;
      console.log(arrayRes);
      for (var i = 0; i < arrayRes.length; i++) {

        var el = arrayRes[i];
        var title = el.title;
        var orgTit = el.original_title;
        var lang = el.original_language;
        var voto = el.vote_average;
        addDataMovie(title, orgTit, lang, voto);
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

function addDataMovie(title, orgTit, lang, voto) {

    var data = {

      title : title,
      orgTit : orgTit,
      lang : lang,
      //voto : vote //addStarsVote(intVote)
    }

    var template = $("#film-template").html();
    var compiled = Handlebars.compile(template);
    var ulMovies = compiled(data);

    var ul = $(".films");//.text("") per risolvere bug una nuova ricerca che non sovrascrive la precedente...ma non ci siamo ancora!!
    ul.append(ulMovies);

    var intVote = Math.round(voto/2);
    addStarsVote2(intVote);
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
function addStarsVote2(voto) {

  var data = {//passa con Handlebars html completo

    star : "<i class='far fa-star'></i>"//stella vuota

  };

  var liBox = $(".list-stars").last();//funzione last() per prendere sempre ultimo li
  for (var i = 1; i <= 5; i++) {//ciclo per appendere cinque stelle: Se voto è maggiore o uguale al contatore i

    if (voto >= i) {

      var piena = data.star;
      piena = "<i class='fas fa-star'></i>"
      liBox.append(piena);
    } else {

      var vuota = data.star;
      liBox.append(vuota);
    }
  }
}

function init() {

  var input = $("#btn-movies");
  input.click(ajaxSearchMovies);
}

$(document).ready(init);




















//
