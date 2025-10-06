import { useState } from "react";
import TextInput from "./TextInput";

export default function NewGameForm({ adicionarJogo }) {
  const [titulo, setTitulo] = useState("");
  const [capa, setCapa] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    adicionarJogo(titulo, capa);
    setTitulo("");
    setCapa("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="titulo"
        label="Título"
        value={titulo}
        onChange={setTitulo}
      />
      <TextInput id="capa" label="Capa" value={capa} onChange={setCapa} />
      <button type="submit"> Adicionar</button>
    </form>
  );
}
