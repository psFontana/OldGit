import StatusText from "./components/StatusText";
import { Subtitle } from "./components/Subtitle";
import Title from "./components/Title";

function sum(a, b) {
  return a + b;
}

export default function App() {
  const status = true;

  return (
    <div>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  );
}
