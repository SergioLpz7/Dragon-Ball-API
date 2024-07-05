axios
  .get("http://localhost:9000/api/personajes", {
    responseType: "json",
  })
  .then(function (res) {
    if (res.status == 200) {
      datos(res.data);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
const cont = document.querySelector(".cont");
function datos(inf) {
  inf.forEach((element) => {
    let html = `<div class="linea"> 
      <img src="../${element.picture}"> 
      <div class="dato"> <label> Nombre </label> <input class="inp" id="nombre${element._id}" name="nombre" value="${element.nombre}"> </div>
      <div class="dato"> <label> Raza </label> <input class="inp" id="raza${element._id}" name="raza" value="${element.raza}"> </div>
      <div class="dato"> <label> Bando </label> <input class="inp" id="status${element._id}" name="status" value="${element.status}"> </div>
      <div class="dato"> <label> Planeta </label> <input class="inp" id="planeta${element._id}" name="planeta" value="${element.planeta}"> </div>
      <div class="dato"> <label> Habilidad </label> <input class="inp" id="habilidad${element._id}" name="habilidad" value="${element.habilidad}"> </div>
      <div class="transformacion ${element._id}"> <label> Transformación </label>`;

    for (let i = 0; i < element.transformaciones.length; i++) {
      html += `<div class="inp-cruz"> <input class="inp" id="transformaciones${element._id}" name="transformaciones" value="${element.transformaciones[i]}"> <button class="cruz">&times;</button> </div>`;
    }

    html += `<button class="mas"> + </button> </div> <input type="checkbox" id="id" name="${element._id}"> </div>`;

    cont.innerHTML += html;
  });
  const mas = document.getElementsByClassName("mas");
  for (i = 0; i < mas.length; i++) {
    mas[i].addEventListener("click", function (evt) {
      const linea = evt.target.closest(".linea");
      const ev = linea.querySelector(".transformacion");
      const idPers = ev.classList.value.split(" ")[1];
      console.log(idPers);
      const nuInp = document.createElement("input");
      nuInp.classList.add("inp");
      nuInp.name = "transformaciones";
      nuInp.id = "transformaciones" + idPers;
      const ic = document.createElement("div");
      ic.classList.add("inp-cruz");
      const x = document.createElement("button");
      x.innerHTML = "&times;";
      x.classList.add("cruz");
      ic.appendChild(nuInp);
      ic.appendChild(x);
      ev.insertBefore(ic, evt.target);
      x.addEventListener("click", function (event) {
        borrarInp(event);
      });
    });
    const x = document.querySelectorAll(".cruz");
    for (j = 0; j < x.length; j++) {
      x[j].addEventListener("click", function (event) {
        borrarInp(event);
      });
    }
  }
  const Dbtn = document.createElement("div");
  Dbtn.id = "Div-Btn";
  const borrar = document.createElement("button");
  cont.appendChild(Dbtn);
  borrar.innerHTML = "Delete";
  borrar.classList.add("delete");
  Dbtn.appendChild(borrar);
  borrar.addEventListener("click", function () {
    eliminar();
  });

  const act = document.createElement("button");
  act.innerHTML = "Update";
  act.classList.add("update");
  Dbtn.appendChild(act);
  act.addEventListener("click", function () {
    actulizar();
  });
}

function borrarInp(event) {
  const ic = event.target.closest(".inp-cruz");
  ic.remove();
}

function eliminar() {
  const box = document.querySelectorAll('input[type="checkbox"]:checked');

  box.forEach((check) => {
    const id = check.name;
    axios
      .delete(`http://localhost:9000/api/personajes/${id}`)
      .then(exitoDelete());
  });
}

function actulizar() {
  const box = document.querySelectorAll('input[type="checkbox"]:checked');

  box.forEach((check) => {
    const id = check.name;
    const transformaciones = [];

    const inputs = document.querySelectorAll("#transformaciones" + id);
    for (i=0; i<inputs.length; i++){
      transformaciones.push(inputs[i].value)
    }
    // inputs.forEach((input) => {
    //   transformaciones.push(input.value);
    // });
    axios
      .put(`http://localhost:9000/api/personajes/${id}`, {
        nombre: document.getElementById("nombre" + id).value,
        raza: document.getElementById("raza" + id).value,
        status: document.getElementById("status" + id).value,
        planeta: document.getElementById("planeta" + id).value,
        habilidad: document.getElementById("habilidad" + id).value,
        transformaciones: transformaciones,
      })
      .then(exiotoUpdate());
  });
}
function exitoDelete() {
  const cont = document.querySelector(".cont");
  cont.style.display = "none";
  const mensajeExistente = document.querySelector(".exito");
  if (mensajeExistente) {
    return; 
  }
  const div = document.createElement("div");
  document.body.appendChild(div)
  div.classList.add("exito");
  var info = `<h1> Felicidades, su personaje se ha eliminado con éxito </h1>`;
  div.innerHTML = info
  const volver = document.createElement("button");
  volver.innerHTML = "volver";
  div.appendChild(volver)
  volver.addEventListener("click", function() {
    location.reload()
  })
}
function exiotoUpdate() {
  const cont = document.querySelector(".cont");
  cont.style.display = "none";
  const mensajeExistente = document.querySelector(".exito");
  if (mensajeExistente) {
    return;
  }
  const div = document.createElement("div");
  document.body.appendChild(div)
  div.classList.add("exito");
  var info = `<h1> Felicidades, su personaje se ha actualizado con éxito </h1>`;
  div.innerHTML = info
  const volver = document.createElement("button");
  volver.innerHTML = "volver";
  div.appendChild(volver)
  volver.addEventListener("click", function() {
    location.reload()
  })
}
