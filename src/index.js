import Didact from './didreact'

/** @jsx Didact.createElement */
function App(props) {
  return <h1>hi {props.name}</h1>
}
const element = <App name="foo" />
const container = document.getElementById('root')
Didact.render(element, container)