import React, { Component } from "react";

export class FormularioCadastro extends Component {
  render() {
    return (
      <form>
        <input type="Text" placeholder="Título" />
        <textarea placeholder="Escreva a sua nota." />
        <button>Criar Nota</button>
      </form>
    );
  }
}
