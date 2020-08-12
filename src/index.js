import Didact from './didreact'


function App(props) {
  return <h1>{props.name}</h1>
}
/** @jsx Didact.createElement */
const element = <App name="foo" >hi</App>

const container = document.getElementById('root')
Didact.render(element, container)