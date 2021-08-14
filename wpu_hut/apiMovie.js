// function getData(url, success, error) {
//   const xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       success(xhr.response);
//     } else if (xhr.status === 404) {
//       error();
//     }
//   };

//   xhr.open("get", url);
//   xhr.send();
// }

// getData("http://www.omdbapi.com/?apikey=15a20b3e&s=harry potter", (result) => {
//   const data = JSON.parse(result).Search;
//   let movies = document.querySelector(".movie-container");
//   let cards = (movies.innerHTML = "");
//   data.forEach((a) => {
//     cards += `<div class="col-md-4 my-5">
//       <div class="card">
//         <img src="${a.Poster}" class="card-img-top" />
//         <div class="card-body">
//           <h5 class="card-title">${a.Title}</h5>
//           <h6 class="card-subtitle mb-2 text-muted">${a.Year}</h6>
//           <a href="#" class="btn btn-primary">Show Details</a>
//         </div>
//       </div>
//     </div>`;
//   });
// });

// menggunakan JQuery
// membuat tombol search
// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=15a20b3e&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = "";
//       movies.forEach((result) => {
//         cards += showCards(result);
//       });
//       $(".movie-container").html(cards);

//       // ketika tombol details di click
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=15a20b3e&i=" +
//             $(this).data("imdbid"),
//           success: (result) => {
//             const movieDetails = showDetails(result);
//             $(".modal-body").html(movieDetails);
//           },
//           error: (err) => {
//             console.log(err.responseText);
//           },
//         });
//       });
//     },
//     error: (err) => {
//       console.log(err.responseText);
//     },
//   });
// });

// menggunakan Fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   let inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=15a20b3e&s=" + inputKeyword.value).then(
//     (response) => {
//       response.json().then((response) => {
//         const movies = response.Search;
//         let cards = "";
//         movies.forEach((result) => {
//           cards += showCards(result);
//           const movieContainer = document.querySelector(".movie-container");
//           movieContainer.innerHTML = cards;

//           const modalDetailButton = document.querySelectorAll(
//             ".modal-detail-button"
//           );
//           modalDetailButton.forEach((btn) => {
//             btn.addEventListener("click", function () {
//               const imdbid = this.dataset.imdbid;
//               fetch("http://www.omdbapi.com/?apikey=15a20b3e&i=" + imdbid).then(
//                 (response) => {
//                   response.json().then((result) => {
//                     const movieDetails = showDetails(result);
//                     const modalBody = document.querySelector(".modal-body");
//                     modalBody.innerHTML = movieDetails;
//                   });
//                 }
//               );
//             });
//           });
//         });
//       });
//     }
//   );
// });

// Merapikan kodingan
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUi(movies);
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=15a20b3e&s=" + keyword)
    .then((response) => {
      if (!response) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw Error(response.Error);
      }
      return response.Search;
    });
}

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetails = await getMovieDetail(imdbid);
    updateUiDetaile(movieDetails);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=15a20b3e&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUiDetaile(result) {
  const movieDetails = showDetails(result);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetails;
}

function updateUi(movies) {
  let cards = "";
  movies.forEach((result) => {
    cards += showCards(result);
  });
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCards(result) {
  return `<div class="col-md-3 my-3">
    <div class="card">
      <img src="${result.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${result.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${result.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
        data-bs-target="#moviesdetails" data-imdbid="${result.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showDetails(result) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${result.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${result.Title}</h4></li>
          <li class="list-group-item">
            <strong>Directors : </strong>${result.Director}
          </li>
          <li class="list-group-item">
            <strong>Actors : </strong>${result.Actors}
          </li>
          <li class="list-group-item">
            <strong>Writer : </strong>${result.Writer}
          </li>
          <li class="list-group-item">
            <strong>Plot : </strong>${result.Plot}
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}
