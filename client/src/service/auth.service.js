import axios from 'axios'

export default class AuthService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'https://fourketta-api.herokuapp.com/api',
            withCredentials: true
        })
    }
    signup = (newUser) => this.apiHandler.post('/signup', newUser)
    login = user => this.apiHandler.post(`/login`, user)
    logout = () => this.apiHandler.post(`/logout`)
    isLoggedIn = () => this.apiHandler.get(`/loggedin`)
    searchFriends = friendUserName => this.apiHandler.get(`/searchFriends?username=${friendUserName}`)
    findUserById = userId => this.apiHandler.get(`/author?user_Id=${userId}`)
    findByName = userName => this.apiHandler.get(`/userData?username=${userName}`)
    addFriend = (userId, friendId) => this.apiHandler.put(`/addFriends?user_Id=${userId}&friend_Id=${friendId}`)
    deleteFriend = (user, friend_id) => this.apiHandler.put(`/deleteFriend?friend_Id=${friend_id}`, user)
    addFavorite = (userId, recipeId) => this.apiHandler.put(`/favRecipe?user_Id=${userId}&recipe_Id=${recipeId}`)
    deleteFavorite = (user, recipeId) => this.apiHandler.put(`/deleteFav?recipe_Id=${recipeId}`, user)
    updateUser = (userId, userImg) => this.apiHandler.put(`/updateUserImg?user_Id=${userId}`, userImg)
    deleteUser = userId => this.apiHandler.get(`/deleteUser?user_Id=${userId}`)


}


