axios
  .get("http://localhost:9000/api/personajes", {
    responseType: "json",
  })
  .then(function (res) {
    if (res.status == 200) {
      console.log(res.data);
      pagina(res.data);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
function pagina(pers) {
  const burger = document.getElementById("menuburger");
  const nav = document.querySelector("nav");
  const cont = document.querySelector(".contenedor");
  burger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });
  pers.forEach((Element) => {
    const div = document.createElement("div");
    var ClaseRaza = Element.raza.split(" ")[0];
    div.classList.add("foto", ClaseRaza);
    div.innerHTML = `<h3> ${Element.nombre} </h3> <img src= "../${Element.picture}"> <h6>${Element.status}</h6>`;
    cont.appendChild(div);
    const status = Element.status;
    if (status === "Héroe") {
      div.style.backgroundColor = "#007bff";
    } else if (status === "Villano") {
      div.style.backgroundColor = "#8b0000";
    } else if (status === "Antihéroe") {
      div.style.backgroundColor = "#808080";
    } else {
      div.style.backgroundColor = "#00ff00";
    }
    div.addEventListener("click", function () {
      mostrarMas(Element, pers);
    });
  });
}

function mostrarMas(info, array) {
  const contador = array.indexOf(info);

  const cont = document.querySelector(".contenedor");
  const foto = document.querySelectorAll(".foto");
  for (let i = 0; i < foto.length; i++) {
    foto[i].style.display = "none";
  }
  const masInfo = document.createElement("div");
  masInfo.classList.add("masInfo");
  cont.appendChild(masInfo);
  var inf = `<img src= "../${info.picture}"> <div class="datos"> <div class="info"> <h4> Nombre:</h4> <p> ${info.nombre} </p> </div>
    <div class="info"> <h4> Raza:</h4> <p>${info.raza} </p> </div>
   <div class="info"> <h4> Bando: </h4> <p>${info.status} </p> </div> `;
  if (info.planeta) {
    inf += `<div class="info"><h4> Planeta de nacimiento: </h4> <p>${info.planeta} </p></div> `;
  }
  if (info.habilidad) {
    inf += `<div class="info"> <h4> Habilidad definitiva:</h4> <p>${info.habilidad} </p> </div>`;
  }
  if (info.transformaciones.length != 0) {
    inf += `<div class="info"><h4> Cantidad de transformaciones: </h4>  <p> ${info.transformaciones.length}</p> </div>`;
    inf += `<div class="info"> <h4> Transformaciones: </h4></div>`;
    for (i = 0; i < info.transformaciones.length; i++) {
      inf += `<div class="info"> <p>${info.transformaciones[i]} </p> </div> `;
    }
  } else {
    inf += `<div class="info"><h4> Cantidad de transformaciones:</h4> 0 </div>`;
  }
  inf += `</div>`;
  masInfo.innerHTML += inf;
  const galeria = document.querySelector(".galeria");
  const nav = document.querySelector("nav");
  nav.style.display = "none";
  galeria.style.display = "none";

  const btn = document.createElement("button");
  btn.innerHTML = "Volver";
  btn.classList.add("volver");
  masInfo.appendChild(btn);
  btn.addEventListener("click", function () {
    masInfo.remove();
    for (i = 0; i < foto.length; i++) {
      foto[i].style.display = "block";
    }
    nav.style.display = "flex";
    galeria.style.display = "flex";
  });
  if (contador < array.length - 1) {
    const sigBtn = document.createElement("button");
    sigBtn.innerHTML = "&#8594;";
    sigBtn.id = "next";
    sigBtn.classList.add("arrow");
    masInfo.appendChild(sigBtn);
    sigBtn.addEventListener("click", function () {
      masInfo.remove();
      mostrarMas(array[contador + 1], array);
    });
  }
  if (contador >= 1) {
    const atBtn = document.createElement("button");
    atBtn.classList.add("arrow");
    atBtn.innerHTML = "&#8592;";
    atBtn.id = "back";
    masInfo.appendChild(atBtn);
    atBtn.addEventListener("click", function () {
      masInfo.remove();
      mostrarMas(array[contador - 1], array);
    });
  }
}

function filtro(evt, raza) {
  const personaje = document.getElementsByClassName("foto");
  const btn = document.querySelectorAll("a");
  for (let i = 0; i < personaje.length; i++) {
    if (personaje[i].classList.contains(raza)) {
      personaje[i].style.display = "block";
    } else {
      personaje[i].style.display = "none";
    }
  }
  for (i = 0; i < btn.length; i++) {
    btn[i].classList.remove("active");
    evt.target.classList.add("active");
  }
}

let imagen = [
  "imagen/gogeta.jpg",
  "imagen/vegetto.jpg",
  "imagen/GotenksSj3.jpg",
];
var index = 0;
const image = document.querySelector(".slider");
const sigSld = document.getElementById("sliderAlante");
const atSld = document.getElementById("sliderAtras");
image.src = imagen[index];

sigSld.addEventListener("click", function () {
  clearInterval(intervalo);
  siguiente();
  intervalo = setInterval(siguiente, 3000);
});
function siguiente() {
  index++;
  if (index == imagen.length) {
    index = 0;
  }
  image.src = imagen[index];
}
var intervalo = setInterval(siguiente, 3000);

atSld.addEventListener("click", function () {
  index--;
  if (index < 0) {
    index = imagen.length - 1;
  }
  image.src = imagen[index];
});
