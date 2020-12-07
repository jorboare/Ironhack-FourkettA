import axios from 'axios'

export default class AuthService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api'
        })
    }
    signup = (newUser) => this.apiHandler.post('/signup', newUser)
    login = user => this.apiHandler.post(`/login`, user)
    logout = () => this.apiHandler.post(`/logout`)
    isLoggedIn = () => this.apiHandler.get(`/loggedin`)
}
