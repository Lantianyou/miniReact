function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.forEach(child => {
        return typeof child === 'object' ? child: createTextElement(child)
      })
    }
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children:[]
    }
  }
}

function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT' ?
      document.createElement("") :
      document.createElement(element.type)
  
  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => 
      dom[name] = element.props[name]
  )

  element.props.children.forEach(child =>
    render(child, dom)
  )
  container.appendChild(dom)
}

const Didact = {
  createElement,
  render
}
/** */
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"))


const container = document.getElementById('root')

const node = document.createElement(element.type)
node['title'] = element.props.title

const text = document.createTextNode("")
text['nodeValue'] = element.props.children

node.appendChild(text)
container.appendChild(node)