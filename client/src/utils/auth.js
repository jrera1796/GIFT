import decode from 'jwt-decode'; //decode a token and get the user's info

class AuthService { //new class to instantial a user
  getProfile() { return decode(this.getToken()); }

  loggedIn() { //check if user is logged in
    const token = this.getToken(); //check for saved token and valid
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) { //check for expired token
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { return true; }
      else { return false; }
    } catch (err) { return false; }
  }

  getToken() { return localStorage.getItem('id_token'); } //get token from localStorage

  login(idToken) { //save token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token'); //clean token and profile form localStorage
    window.location.assign('/'); //reload the page and reset the state of app
  }
}

export default new AuthService();