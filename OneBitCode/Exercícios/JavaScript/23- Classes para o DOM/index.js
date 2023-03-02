import Component from "./Component.js";
import Input from "./Input.js";
import Label from "./Label.js";
import Form from "./Form.js";

const title = new Component("h1", "body", { textContent: "Olá, Mundo!" });
console.log(title);
title.render();

const form = new Form("body");
const label = new Label("Nome: ", form, { htmlFor: "nameInput" });
const input = new Input(form, { id: "nameInput", name: "name" });
form.render();
label.render();
form.addChildren(input);
