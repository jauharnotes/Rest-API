function searchButton() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "15a20b3e",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          if (i < 9) {
            $("#movie-list").append(
              `
                    <div class="col-md-4">
                    <div class="card mb-4">
                    <img src=` +
                data.Poster +
                ` class="card-img-top" alt="poster">
                    <div class="card-body">
                      <h5 class="card-title">` +
                data.Title +
                `</h5>
                      <h6 class="card-subtitle mb-2 text-muted">` +
                data.Year +
                `</h6>
                  <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
                data.imdbID +
                `">See Details..</a>
                    </div>
                  </div>
                        </div>
                `
            );
          }
          $("#search-input").val("");
        });
      } else {
        $("#movie-list").html(
          `
              <div class="col">
                  <h1 class="text-center"> ` +
            result.Error +
            ` </h1>
                  </div>
            `
        );
      }
    },
  });
}

$("#button-search").on("click", function () {
  searchButton();
});

$("#search-input").on("keyup", function (e) {
  if (e.which === 13) {
    searchButton();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  //   console.log($(this).data("id"));
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "15a20b3e",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="` +
            movie.Poster +
            `" class="img-fluid">
                        </div>

                        <div class="col-md-8">
                        <ul class="list-group">
                        <li class="list-group-item"><h2>` +
            movie.Title +
            `</h2></li>
                        <li class="list-group-item">Released: ` +
            movie.Released +
            `</li>
                        <li class="list-group-item">Genre: ` +
            movie.Genre +
            `</li>
                        <li class="list-group-item">Director: ` +
            movie.Director +
            `</li>
                        <li class="list-group-item">Writer: ` +
            movie.Writer +
            `</li>
                        <li class="list-group-item">Actors: ` +
            movie.Actors +
            `</li>
                        <li class="list-group-item">Plot: ` +
            movie.Plot +
            `</li>
                      </ul>
                        </div>
                    </div>
                </div>
            `
        );
      }
    },
  });
});
