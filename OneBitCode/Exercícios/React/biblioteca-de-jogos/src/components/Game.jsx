import PropTypes from "prop-types";

Game.propTypes = {
  title: PropTypes.string.isRequired,
  capa: PropTypes.string.isRequired,
  removerJogo: PropTypes.func.isRequired,
};

export default function Game({ titulo, capa, removerJogo }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <img src={capa} alt={`Capa do jogo ${titulo}`} />
      <button onClick={removerJogo}>Remover</button>
    </div>
  );
}
