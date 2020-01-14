# Options Menu Workshop [![Netlify Status](https://api.netlify.com/api/v1/badges/17186340-a975-4bc5-9e7f-6f5f8cb6b273/deploy-status)](https://app.netlify.com/sites/options-menu-workshop/deploys)

> Let's build a fully tested, accessible, reusable menu button component together

## `whoami`

Hey, I'm Harris Schneiderman! I am a web developer with a _focus_ on accessibility.

- UI Engineer [@dequesystems](https://twitter.com/@dequesystems)
- W3C ARIA Working Group
- github.com/schne324
- [@theHarrisius](https://twitter.com/@theHarrisius)

## What we're covering today...

1. What is ARIA?
1. Gather requirements from the [ARIA Authoring Practices for menu button](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton)
   - [menu button example/demo](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menu-button/menu-button-actions.html)
1. Create unit test cases based on above resources
1. Implement actual tests/assertions
1. All tests failing
1. Start to build out the component based on the unit test cases
1. Tests passing
1. Spin up component demo page
1. automated/manual a11y tests
1. Make it look awesome!
1. Deploy demo to netlify?

### What is ARIA?

> the Accessible Rich Internet Applications suite of web standards.

_ARIA defines a way to make Web content and Web applications more accessible to people with disabilities_

#### Roles / States / Properties

- **Role:** _what the element is_ (`role="checkbox"`)
- **State:** _the current state of the element_ (`aria-checked="true"`)
- **Property:** _essential attributes of the nature of the element - less likely to change than states_ (`aria-describedby="checkbox-help"`)

```html
<div id="checkbox-label">
  I agree to the terms and conditions
</div>
<p id="checkbox-help">
  You can read the
  <a href="./terms">full terms and conditions</a>
</p>
<div
  role="checkbox"
  aria-checked="true"
  aria-labelledby="checkbox-label"
  aria-describedby="checkbox-help"
></div>
```

#### [The 5 rules of ARIA](https://www.w3.org/TR/using-aria/#NOTES)

1. Use native HTML elements whenever possible (`<button />` instead of `<div role="button" />`)
1. Do not change native semantics, unless you really have to (`<div role=tab><h2>heading tab</h2></div>` instead of`<h2 role=tab>heading tab</h2>`)
1. All interactive ARIA controls must be usable with the keyboard

   ```html
   <div role="button" tabindex="0">Click me!</div>
   ```

   ```js
   document
     .querySelector('[role=button')
     .addEventListener('keydown', e => {
       if (e.key !== ' ' && e.key !== 'Enter') {
         return
       }

       e.target.click()
     })
   ```

1. Do not use `role="presentation"` or `aria-hidden="true"` on a focusable element (don't do this: `<button role=presentation>press me</button>`)
1. All interactive elements must have an accessible name (`<div role="checkbox" aria-label="Foo" />`)

### Building an options menu component

---

#### Gathering requirements

> [WAI-ARIA Authoring Practices](https://w3.org/TR/wai-aria-practices-1.1/) is a guide for understanding how to use WAI-ARIA to create an accessible Rich Internet Application.

- definition of widget
- examples
- keyboard interaction
- roles, states and properties

#### Creating unit test cases

We can easily map out our tests by copying/pasting the requirements provided by the authoring practices

```js
describe('menu button', () => {
  describe('Down Arrow', () => {
    test.todo(
      'Opens menu and moves focus to first menuitem'
    )
  })
})
```

_see `index.test.js` for more tests_

#### Implement tests

Now that we have all of our test cases, let's put them to work

```js
describe('Down Arrow', () => {
  test('Opens menu and moves focus to first menuitem', () => {
    // create a simulated down arrow keydown event
    const downArrow = simulant('keydown', {
      key: 'ArrowDown'
    })
    // fire down arrow on the menu button
    simulant.fire(button, downArrow)
    // ensure the menu is opened
    expect(menu.classList.contains(ACTIVE_CLASS)).toBe(true)
    // ensure the first item is currently focused
    expect(document.activeElement).toBe(menuItems[0])
  })
})
```

_see `index.test.js` for more tests_

#### Test driven development

**TDD:** Writing tests that fail before writing any functionality.

This will allow us to focus on the requirements **first**...

- avoids over engineering
- catches bugs/issues right away
- avoids the testing specific implementation and facilitates testing the desired functionality instead

As we build out the functionality, our tests will start passing!

## Setup

<details>
<summary>prereqs</summary>

- [`node / npm`](https://nodejs.org/)
- [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

</details>

```sh
# NOTE: you can fork it if you want!
$ git clone git@github.com:schne324/options-menu-workshop.git
$ cd options-menu-workshop
$ git checkout origin/start
$ git checkout -b start
```

<details>
  <summary>or copy and paste this</summary>

```sh
git clone git@github.com:schne324/options-menu-workshop.git && cd options-menu-workshop && git checkout origin/start && git checkout -b start
```

</details>

### Install dependencies...

```sh
$ yarn
# or if you prefer npm, execute: npm install
```

## Running tests

```sh
$ yarn test
# or if you prefer npm, execute: npm test
```

## Running demo server

```sh
$ yarn dev
# or if you prefer npm, execute: npm run dev
```

navigate in browser to [`localhost:1234`](http://localhost:1234)
