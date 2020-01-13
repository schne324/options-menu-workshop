export const MENU_ITEM_SELECTOR = 'li, [role="menuitem"]'
export const ACTIVE_CLASS = 'active'
let i

export default class MenuButton {
  constructor(button, menu) {
    this.menu = menu
    this.menuItems = [
      ...document.querySelectorAll(MENU_ITEM_SELECTOR)
    ]
    this.button = button
    menu.id = menu.id || `menu-${i}`
    button.id = button.id || `button-${i}`
    i++

    // menu button attrs
    this.button.setAttribute('aria-controls', menu.id)
    this.button.setAttribute('aria-expanded', 'false')

    // menu / menuitems attrs
    this.menu.setAttribute('aria-labelledby', button.id)
    this.menuItems.forEach(item => {
      item.tabIndex = -1
    })

    // attach events
    button.addEventListener(
      'keydown',
      this.onButtonKeydown.bind(this)
    )
    button.addEventListener(
      'click',
      this.onButtonClick.bind(this)
    )
    menu.addEventListener(
      'keydown',
      this.onMenuKeydown.bind(this)
    )
  }

  /**
   * Handles keydowns on the menu
   * @param {Object} e
   */
  onMenuKeydown(e) {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        e.preventDefault()
        // TODO!
        break
      case 'ArrowDown': {
        // TODO!
        break
      }
      case 'ArrowUp': {
        // TODO!
        break
      }
      case 'Home':
        // TODO!
        break
      case 'End':
        // TODO!
        break
    }
  }

  /**
   * Handles keydowns on the button (trigger)
   * @param {Object} e
   */
  onButtonKeydown(e) {
    switch (e.key) {
      case 'ArrowUp':
        // TODO!
        break
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        e.preventDefault()
        // TODO!
        break
    }
  }

  onButtonClick() {
    // TODO!
  }
}
