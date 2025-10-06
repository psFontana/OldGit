import { useState } from "react";

export default function useGameCollection() {
  const [jogos, setJogos] = useState(() => {
    return JSON.parse(localStorage.getItem("jogos")) || [];
  });

  function adicionarJogo(titulo, capa) {
    const id = Math.floor(Math.random() * 10000);
    const novoJogo = { id, titulo, capa };
    setJogos([...jogos, novoJogo]);
    localStorage.setItem("jogos", JSON.stringify([...jogos, novoJogo]));
  }

  function removerJogo(id) {
    setJogos((jogos) => jogos.filter((jogo) => jogo.id !== id));
    localStorage.setItem(
      "jogos",
      JSON.stringify(jogos.filter((jogo) => jogo.id !== id))
    );
  }
  return { adicionarJogo, removerJogo, jogos };
}
