import fixture from './fixture'
import MenuButton from '../'

const app = document.getElementById('app')
app.innerHTML = fixture
const button = document.getElementById('trigger')
const menu = document.getElementById('menu')
new MenuButton(button, menu)
