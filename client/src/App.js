import { useState, useEffect } from "react";
import Dictaphone from './components/Dictaphone'

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="App">
      <Dictaphone />
    </div>
  );
}

export default App;