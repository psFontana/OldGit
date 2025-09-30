import { useState } from "react";
import Input from "./components/Input";

function App() {
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copiar");
  const [customSize, setCustomSize] = useState(12);
  const [showInput, setShowInput] = useState(false);

  const passwordSize = showInput ? customSize : 8;

  function generate() {
    const characters =
      "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?";
    let newPassword = "";
    for (let i = 0; i < passwordSize; i++) {
      const position = Math.floor(Math.random() * characters.length);
      newPassword += characters[position];
    }
    setPassword(newPassword);
    setCopy("Copiar");
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopy("Copiado!");
  }

  return (
    <>
      <h1>Gerador de senhas 2000!</h1>
      <div>
        <label htmlFor="showInput">Customizar tamanho:</label>
        <input
          type="checkbox"
          id="showInput"
          value={showInput}
          onChange={() => {
            setShowInput((currentState) => !currentState);
          }}
        />
      </div>
      {showInput && (
        <div>
          <label htmlFor="customSize">Tamanho da senha:</label>
          <Input customSize={customSize} setCustomSize={setCustomSize} />
        </div>
      )}
      <button
        onClick={() => {
          generate();
        }}
      >
        Gerar senha de {showInput ? customSize : 8} caracteres!
      </button>
      <button
        onClick={() => {
          copyToClipboard();
        }}
      >
        {copy}
      </button>
      <div>{password}</div>
    </>
  );
}

export default App;
