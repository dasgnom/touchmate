import showUsers from './components/showUsers.vue'
import addUser from './components/addUser.vue'
import showUser from './components/showUser.vue'
import addProduct from './components/addProduct.vue'


export default [
  { path: '/', component: showUsers },
  { path: '/users/add', component: addUser },
  { path: '/users/:id', component: showUser },
  { path: '/products/add', component: addProduct },
]
