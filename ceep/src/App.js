import React from "react";
import ListaDeNotas from "./components/ListaDeNotas";

function App() {
  return (
    <section>
      <form>
        <input type="Text" placeholder="Título"/>
        <textarea placeholder="Escreva a sua nota." />
        <button>Criar Nota</button>
      </form>
      <ListaDeNotas/>
    </section>
  );
}

export default App;
