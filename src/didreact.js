function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}


function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createDOM(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT' ?
      document.createTextNode("") :
      document.createElement(fiber.type)
  
  const isProperty = key => key !== 'children'
  Object
    .keys(fiber.props)
    .filter(isProperty)
    .forEach(name =>
      dom[name] = fiber.props[name]
  );

  return dom
}

function render(element, container) {
  // set nextUnitOfWork to the root of the dom tree
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }
  nextUnitOfWork = wipRoot
}

let nextUnitOfWork = null;
let wipRoot = null

function commitRoot() {
  commitRoot(wipRoot)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
}
requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber)
  }
  // create new fibers

  const elements = fiber.props.children
  let index = 0

  let prevSibling = null
  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sbling = newFiber
    }

    prevSibling = newFiber
    index++
  }
  // return nextUnitOfWork
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sbling) {
      return nextFiber.sibling
    } 
    nextFiber = nextFiber.parent
  }
}

const Didact = {
  createElement,
  render
}

export default Didact