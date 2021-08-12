// menrubah object ke JSON
let family = {
  nama: "jauharuddin",
  age: "26",
  email: "jauharnotes@gmail.com",
};

console.log(JSON.stringify(family));

// merubah JSON ke object menggunakan AJAX
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let menues = JSON.parse(this.responseText);
    console.log(menues);
  }
};
xhr.open("GET", "pizza.json", true);
xhr.send();
