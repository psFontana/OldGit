import Game from "./components/Game";
import NewGameForm from "./components/NewGameForm";
import useGameCollection from "./hooks/useGameCollection";

function App() {
  const { adicionarJogo, removerJogo, jogos } = useGameCollection();
  return (
    <>
      <h1>Biblioteca de Jogos</h1>
      <NewGameForm adicionarJogo={adicionarJogo} />
      <div className="jogos">
        {jogos.map((jogo) => (
          <Game
            key={jogo.id}
            titulo={jogo.titulo}
            capa={jogo.capa}
            removerJogo={() => removerJogo(jogo.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
