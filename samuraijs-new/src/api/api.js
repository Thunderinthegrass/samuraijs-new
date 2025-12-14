import axios from "axios";
import { key } from "../dat";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': key,
  }
})

export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 3) => {
    return instance.get(`users?page=${ currentPage }&count=${ pageSize }`)
    .then(response => response.data)//чтобы в компонент не передавать весь ответ с кучей данных, вычленяем из ответа тшолько нужные нам данные, и в компонент передаем толькj их
  },
  getPageChange: (page, pageSize) => {
    return instance.get(`users?page=${ page }&count=${ pageSize }`)
    .then(response => response.data)
  },
  getPageSize: (pageSize) => {
    return instance.get(`users?page=${ 1 }&count=${ pageSize }`)
    .then(response => response.data)
  },
  getFollow: (userId) => {
    return instance.post(`follow/${ userId }`)
  },
  getUnfollow: (userId) => {
    return instance.delete(`follow/${ userId }`)
  },
  getUserProfile: (userId) => {
    return instance.get(`profile/${ userId }`)
    // .then(response => response)
  },
  getStatus: (userId) => {
    return instance.get(`profile/status/${ userId }`)
  },
  updateStatus: (status) => {
    return instance.put(`profile/status`, { status })
  }
}

export const authAPI = {
  getUserData() {
    return instance.get(`auth/me`)
    // .then(response => console.log(response))
  },
  login(email, password, rememberMe) {
    return instance.post('/auth/login', { email, password, rememberMe });
  },
  logout() {
    return instance.delete('/auth/login');
  }
}

