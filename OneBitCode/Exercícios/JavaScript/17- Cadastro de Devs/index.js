function createLabel(text, htmlFor) {
  let label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.innerText = text;
  return label;
}

function createInput(id, value, name, type = "text", placeholder = "") {
  let input = document.createElement("input");
  input.id = id;
  input.value = value;
  input.name = name;
  input.type = type;
  input.placeholder = placeholder;
  return input;
}
let devs = [];
let btnAdd = document.getElementById("add");
let form = document.getElementById("form");
let quantidadeLis = 0;

btnAdd.addEventListener("click", function (ev) {
  let ul = document.getElementById("tecnologias");
  let li = document.createElement("li");
  let liIndex = quantidadeLis;
  quantidadeLis++;
  li.id = "input-" + liIndex;
  li.className = "input";

  let tecLabel = createLabel("Nome: ", li.id);
  let tecInput = createInput(li.id, "", "tecName");

  let expLabel = createLabel(" Experiência: ");
  let id1 = "exp-" + liIndex + ".1";
  let explabel1 = createLabel("0 à 2 Anos", id1);
  let expRadio1 = createInput(id1, "0 à 2 Anos", "exp" + liIndex, "radio");
  let id2 = "exp-" + liIndex + ".2";
  let explabel2 = createLabel("3 à 4 Anos", id2);
  let expRadio2 = createInput(id2, "3 à 4 Anos", "exp" + liIndex, "radio");
  let id3 = "exp-" + liIndex + ".3";
  let explabel3 = createLabel("5+ Anos", id3);
  let expRadio3 = createInput(id3, "5+ Anos", "exp" + liIndex, "radio");

  let btnRmv = document.createElement("button");
  btnRmv.type = "button";
  btnRmv.innerText = "Remover";
  btnRmv.addEventListener("click", function () {
    ul.removeChild(li);
  });
  li.append(
    tecLabel,
    tecInput,
    expLabel,
    expRadio1,
    explabel1,
    expRadio2,
    explabel2,
    expRadio3,
    explabel3,
    btnRmv
  );
  ul.appendChild(li);
});

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let tecnologias = [];
  let nomeCompleto = document.getElementById("nomeCompleto");
  let inputs = document.querySelectorAll(".input");

  inputs.forEach(function (li) {
    let tecName = document.querySelector(
      "#" + li.id + " input[name='tecName']"
    ).value;
    let tecExp = document.querySelector(
      "#" + li.id + ' input[type="radio"]:checked'
    ).value;

    tecnologias.push({ nome: tecName, experiencia: tecExp });
  });

  let novoDev = { nome: nomeCompleto.value, tecnologias: tecnologias };
  devs.push(novoDev);
  alert("Usuário Cadastrado");

  nomeCompleto.value = "";

  inputs.forEach(function (li) {
    li.remove();
  });
  console.log(devs);
});
