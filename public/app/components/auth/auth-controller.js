
let _authService = {}

//DRAW TO LOG USER ON
function drawLoggedOn() {
  console.log('not logged in')
  document.getElementById('auth').innerHTML = `
  <form onsubmit="app.controllers.authContoller.login(event)">
      <input type="username" name="username" placeholder="username" required>
      <input type="password" name="password" placeholder="password" required>
      <button class="btn btn-secondary btn-sm" type="submit" style="height: 2rem">Login</button>
    </form>
    <p onclick="app.controllers.authContoller.showRegister()">Click to Register</p>
    `
  document.getElementById('log').innerHTML = `
  <button class="btn btn-danger btn-sm" onclick="app.controllers.authContoller.showRegister()">Register</button>
  <i class="fas fa-times" onclick="app.controllers.authContoller.mainBar()"></i>`
}


//DRAW A REGISTION FORM
function drawRegistraionFrom() {
  console.log('registering');
  document.getElementById('auth').innerHTML = `
  <form onsubmit="app.controllers.authContoller.register(event)">
      <input type="text" name="email" placeholder="email" required>
      <input type="text" name="username" placeholder="username" required>
      <input type="password" name="password" placeholder="password" required>
      <button class="btn btn-danger btn-sm" type="submit">Register</button>
    </form>
    <p onclick="app.controllers.authContoller.showLogin()">Existing User?</p>
    `
  document.getElementById('log').innerHTML = `
  <button class="btn btn-secondary btn-sm" onclick="app.controllers.authContoller.showLogin()" style="height: 2rem">Login</button>
  <i class="fas fa-times" onclick="app.controllers.authContoller.mainBar()"></i>`
}

//AFTER A USER IS LOGGED IN
function drawLoggedOut() {
  console.log('logged in');
  document.getElementById('log').innerHTML = `<button onclick="app.controllers.authContoller.logout()">logout</button>`
  document.getElementById('auth').innerHTML = ''
}

function drawFail(err) {
  throw new Error(err)
}

function drawMainBar() {
  document.getElementById('auth').innerHTML = ''
  document.getElementById('log').innerHTML = `
  <button class="btn btn-secondary btn-sm" onclick="app.controllers.authContoller.showLogin()" style="height: 2rem">Login</button>
        <button class="btn btn-danger btn-sm" onclick="app.controllers.authContoller.showRegister()">Register</button>`
}

export default class AuthController {
  constructor(auth) {
    _authService = auth
    _authService.authenticate(drawLoggedOut, drawFail)
  }
  login(event) {
    event.preventDefault();
    let creds = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    _authService.login(creds, drawLoggedOut)
  }

  register(event) {
    event.preventDefault();
    let creds = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    _authService.register(creds, drawLoggedOut)
  }

  logout() {
    _authService.logout(drawLoggedOn)
  }
  showRegister() {
    drawRegistraionFrom()
  }
  showLogin() {
    drawLoggedOn()
  }
  mainBar() {
    drawMainBar()
  }
}