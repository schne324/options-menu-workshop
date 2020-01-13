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
    this.button.setAttribute('aria-haspopup', 'true')
    this.button.setAttribute('aria-controls', menu.id)
    this.button.setAttribute('aria-expanded', 'false')

    // menu / menuitems attrs
    this.menu.setAttribute('role', 'menu')
    this.menu.setAttribute('aria-labelledby', button.id)
    this.menuItems.forEach(item => {
      item.setAttribute('role', 'menuitem')
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

  onMenuKeydown(e) {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        e.preventDefault()
        this.closeMenu()
        break
      case 'ArrowDown': {
        const currentIndex = this.menuItems.indexOf(
          e.target
        )
        this.menuItems[
          currentIndex === this.menuItems.length - 1
            ? 0
            : currentIndex + 1
        ].focus()
        break
      }
      case 'ArrowUp': {
        const currentIndex = this.menuItems.indexOf(
          e.target
        )
        this.menuItems[
          currentIndex === 0
            ? this.menuItems.length - 1
            : currentIndex - 1
        ].focus()
        break
      }
      case 'Home':
        this.menuItems[0].focus()
        break
      case 'End':
        this.menuItems[this.menuItems.length - 1].focus()
        break
    }
  }

  onButtonKeydown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.openMenu(this.menuItems.length - 1)
        break
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.openMenu()
        break
    }
  }

  onButtonClick() {
    this.openMenu()
  }

  openMenu(focusIndex = 0) {
    this.button.setAttribute('aria-expanded', 'true')
    this.menu.classList.add(ACTIVE_CLASS)
    this.menuItems[focusIndex].focus()
  }

  closeMenu() {
    this.button.setAttribute('aria-expanded', 'false')
    this.menu.classList.remove(ACTIVE_CLASS)
    this.button.focus()
  }
}
