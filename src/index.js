import Didact from "./didreact";

const { useState } = Didact;
function Counter(props) {
  const [state, setState] = useState(0);
  return (
    <h1>
      count {state} {props.name}
      <button onClick={() => setState((state) => state + 1)}>click</button>
    </h1>
  );
}
/** @jsx Didact.createElement */
const element = <Counter name="foo">hi</Counter>;

const container = document.getElementById("root");
Didact.render(element, container);
