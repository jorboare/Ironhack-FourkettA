import axios from 'axios'

export default class AuthService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }
    signup = (newUser) => this.apiHandler.post('/signup', newUser)
    login = user => this.apiHandler.post(`/login`, user)
    logout = () => this.apiHandler.post(`/logout`)
    isLoggedIn = () => this.apiHandler.get(`/loggedin`)
    friends = userId => this.apiHandler.get(`/getFriends?user_Id=${userId}`)
    findAuthor = userId => this.apiHandler.get(`/author?user_Id=${userId}`)
    findByName = userName => this.apiHandler.get(`/userData?username=${userName}`)
    updateUser = (userId, userData) => this.apiHandler.put(`/updateUser?user_Id=${userId}`, userData)
    deleteUser = userId => this.apiHandler.get(`/deleteUser?user_Id=${userId}`)

}


