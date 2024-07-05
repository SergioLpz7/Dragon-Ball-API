const transformacion = document.getElementById("check");
const inputContainer = document.getElementById("inputs");
const agregarMas = document.getElementById("mas");

transformacion.addEventListener("click", function () {
  if (transformacion.checked) {
    agregarMas.style.display = "block";
    crearInput();
  } else {
    const inp = document.querySelectorAll("#DivInp");
    for (i = 0; i < inp.length; i++) {
      inp[i].remove();
    }
  }
});

agregarMas.addEventListener("click", function () {
  if (transformacion.checked) {
    crearInput();
  }
});

function crearInput() {
  const divInp = document.createElement("div");
  inputContainer.appendChild(divInp);
  const nuevoInput = document.createElement("input");
  const x = document.createElement("button");
  divInp.appendChild(nuevoInput);
  divInp.appendChild(x);
  divInp.id = "DivInp";
  x.innerHTML = "&times;";
  nuevoInput.id = "transformaciones";
  nuevoInput.name = "transformaciones";
  x.addEventListener("click", function () {
    divInp.remove();
  });
}

const formulario = document.getElementById("enviar");
formulario.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const fechaFormulario = new FormData(formulario);
  console.log("envio de formulario" + [...fechaFormulario]);
  axios
    .post("http://localhost:9000/api/personajes", fechaFormulario)
    .then(exito())
    .catch((res) => console.log(res));
});
function exito() {
  const cont = document.getElementById("enviar");
  cont.style.display = "none";
  const exito = document.createElement("div");
  document.body.appendChild(exito);
  exito.classList.add("cont-exito");
  var info = `<h1> Felicidades, su personaje se ha dado de alta con éxito </h1>`;
  exito.innerHTML = info;
  const volver = document.createElement("button");
  volver.innerHTML = "volver";
  exito.appendChild(volver)
  volver.addEventListener("click", function() {
    exito.remove()
    cont.style.display = "flex"
  })
}
