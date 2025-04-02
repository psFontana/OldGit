import StatusText from "./components/StatusText";
import { Subtitle } from "./components/Subtitle";
import Title from "./components/Title";
import "./styles/globals.css"
import styles from "./App.module.css"

function sum(a, b) {
  return a + b;
}

export default function App() {
  return (
    <div
      className={styles.app}
      style={{
        textAlign: "center"
      }}
    >
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  );
}
