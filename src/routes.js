import addProduct from './components/addProduct.vue';
import addUser from './components/addUser.vue';
import showProduct from './components/showProduct.vue';
import showProducts from './components/showProducts.vue';
import showUser from './components/showUser.vue';
import showUsers from './components/showUsers.vue';

export default [
  { path: '/', component: showUsers },
  { path: '/users/add', component: addUser },
  { path: '/users/:id', component: showUser },
  { path: '/products/add', component: addProduct },
  { path: '/products', component: showProducts },
  { path: '/products/:pid', component: showProduct },
];
