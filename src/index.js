import Didact from './didreact'

/** @jsx Didact.createElement */
const element = <h1 name="foo" >hi</h1>

const container = document.getElementById('root')
Didact.render(element, container)