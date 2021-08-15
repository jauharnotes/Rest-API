function allMenu() {
  $.getJSON("pizza.json", function (data) {
    let menu = data.menu;
    $.each(menu, function (i, data) {
      $("#cards").append(
        '<div class="col-md-4"><div class="card mb-4"><img src="menu/' +
          data.gambar +
          '" class="card-img-top" /><div class="card-body"><h5 class="card-title">' +
          data.nama +
          '</h5><p class="card-text">' +
          data.deskripsi +
          "</p><h5>" +
          data.harga +
          '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>'
      );
    });
  });
}

allMenu();

$(".nav-link").on("click", function () {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");

  let kategori = $(this).html();
  $("h1").html(kategori);

  if (kategori == "All Menu") {
    allMenu();
    return;
  }

  $.getJSON("pizza.json", function (data) {
    let menu = data.menu;
    let content = "";
    $.each(menu, function (i, data) {
      if (data.kategori == kategori.toLowerCase()) {
        console.log(kategori);
        content +=
          '<div class="col-md-4"><div class="card mb-4"><img src="menu/' +
          data.gambar +
          '" class="card-img-top" /><div class="card-body"><h5 class="card-title">' +
          data.nama +
          '</h5><p class="card-text">' +
          data.deskripsi +
          "</p><h5>" +
          data.harga +
          '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>';
      }
    });

    $("#cards").html(content);
  });
});
