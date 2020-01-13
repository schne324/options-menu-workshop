import simulant from 'simulant'
import axe from 'axe-core'
import MenuButton, {
  ACTIVE_CLASS,
  MENU_ITEM_SELECTOR
} from './'
import fixture from './demo/fixture'

const { document } = global.window
global.document = document

let button, menu, menuItems

beforeEach(() => {
  document.body.innerHTML = fixture
  button = document.getElementById('trigger')
  menu = document.getElementById('menu')
  new MenuButton(button, menu)
  menuItems = [...menu.querySelectorAll(MENU_ITEM_SELECTOR)]
})

afterEach(async () => {
  const { violations } = await axe.run(document.body)
  if (violations.length) {
    console.log(violations)
  }
  expect(violations.length).toBe(0)
  global.document.body.innerHTML = ''
})

describe('trigger button', () => {
  describe('Down Arrow', () => {
    test('Opens menu and moves focus to first menuitem', () => {
      const downArrow = simulant('keydown', {
        key: 'ArrowDown'
      })
      simulant.fire(button, downArrow)
      expect(menu.classList.contains(ACTIVE_CLASS)).toBe(
        true
      )
      expect(document.activeElement).toBe(
        menu.querySelector('[role=menuitem]')
      )
    })
  })

  describe('Space', () => {
    test('Opens menu and moves focus to first menuitem', () => {
      const space = simulant('keydown', { key: ' ' })
      simulant.fire(button, space)
      expect(menu.classList.contains(ACTIVE_CLASS)).toBe(
        true
      )
      expect(document.activeElement).toBe(
        menu.querySelector('[role=menuitem]')
      )
    })
  })

  describe('Clicking / pressing enter', () => {
    test('Opens menu and moves focus to first menuitem', () => {
      button.click()
      expect(menu.classList.contains(ACTIVE_CLASS)).toBe(
        true
      )
      expect(document.activeElement).toBe(menuItems[0])
    })
  })

  describe('Up Arrow', () => {
    test('Opens menu and moves focus to last menuitem', () => {
      const up = simulant('keydown', {
        key: 'ArrowUp'
      })
      simulant.fire(button, up)
      expect(menu.classList.contains(ACTIVE_CLASS)).toBe(
        true
      )
      expect(document.activeElement).toBe(menuItems[3])
    })
  })

  describe('Roles/stats/props', () => {
    test('has aria-haspopup="true"', () => {
      expect(button.getAttribute('aria-haspopup')).toBe(
        'true'
      )
    })
    test('Refers to the menu in aria-controls', () => {
      expect(button.getAttribute('aria-controls')).toBe(
        menu.id
      )
    })
    test('sets aria-expanded="true" when menu is opened', () => {
      button.click() // open the menu
      expect(button.getAttribute('aria-expanded')).toBe(
        'true'
      )
    })
    test('sets aria-expanded="false" when menu is closed', () => {
      expect(button.getAttribute('aria-expanded')).toBe(
        'false'
      )
    })
  })
})

describe('menu', () => {
  describe('Enter', () => {
    test('Closes the menu and sets focus to the menu button', () => {
      button.click()
      const enter = simulant('keydown', {
        key: 'Enter'
      })
      simulant.fire(menuItems[0], enter)
      expect(menu.classList.contains(ACTIVE_CLASS)).toBe(
        false
      )
      expect(document.activeElement).toBe(button)
    })
  })

  describe('Escape', () => {
    test('Closes the menu and sets focus to the menu button', () => {
      button.click()
      const escape = simulant('keydown', {
        key: 'Escape'
      })
      simulant.fire(menuItems[0], escape)
      expect(menu.classList.contains(ACTIVE_CLASS)).toBe(
        false
      )
      expect(document.activeElement).toBe(button)
    })
  })

  describe('Up Arrow', () => {
    test('Moves focus to the previous menu item', () => {
      button.click()
      menuItems[2].focus()
      const up = simulant('keydown', {
        key: 'ArrowUp'
      })
      simulant.fire(menuItems[2], up)
      expect(document.activeElement).toBe(menuItems[1])
    })

    test('If focus is on the first menu item, moves focus to the last menu item', () => {
      button.click()
      menuItems[0].focus()
      const up = simulant('keydown', {
        key: 'ArrowUp'
      })
      simulant.fire(menuItems[0], up)
      expect(document.activeElement).toBe(
        menuItems[menuItems.length - 1]
      )
    })
  })

  describe('Down Arrow', () => {
    test('Moves focus to the next menu item', () => {
      button.click()
      menuItems[2].focus()
      const down = simulant('keydown', {
        key: 'ArrowDown'
      })
      simulant.fire(menuItems[2], down)
      expect(document.activeElement).toBe(menuItems[3])
    })
    test('If focus is on the last menu item, moves focus to the first menu item', () => {
      button.click()
      menuItems[menuItems.length - 1].focus()
      const down = simulant('keydown', {
        key: 'ArrowDown'
      })
      simulant.fire(menuItems[menuItems.length - 1], down)
      expect(document.activeElement).toBe(menuItems[0])
    })
  })

  describe('Home', () => {
    test('Moves focus to the first menu item', () => {
      button.click()
      menuItems[1].focus()
      const home = simulant('keydown', {
        key: 'Home'
      })
      simulant.fire(menuItems[1], home)
      expect(document.activeElement).toBe(menuItems[0])
    })
  })

  describe('End', () => {
    test('Moves focus to the last menu item', () => {
      button.click()
      menuItems[1].focus()
      const end = simulant('keydown', {
        key: 'End'
      })
      simulant.fire(menuItems[1], end)
      expect(document.activeElement).toBe(
        menuItems[menuItems.length - 1]
      )
    })
  })

  describe('roles/states/props', () => {
    test('The menu is labeled by the menu button (aria-labelledby)', () => {
      expect(menu.getAttribute('aria-labelledby')).toBe(
        button.id
      )
    })
    test('each item has role=menuitem', () => {
      expect(
        menuItems.every(
          item => item.getAttribute('role') === 'menuitem'
        )
      ).toBe(true)
    })
    test('each item has tabIndex="-1"', () => {
      expect(
        menuItems.every(
          item => item.getAttribute('tabindex') === '-1'
        )
      ).toBe(true)
    })
  })
})
