import addProduct from './components/addProduct.vue';
import addUser from './components/addUser.vue';
import editUser from './components/editUser.vue';
import showProduct from './components/showProduct.vue';
import showProducts from './components/showProducts.vue';
import showStats from './components/showStats.vue';
import showUser from './components/showUser.vue';
import showUsers from './components/showUsers.vue';

export default [
  { path: '/', component: showUsers, props: true },
  { path: '/stats', component: showStats, props: true },
  { path: '/users/add', component: addUser, props: true },
  { path: '/users/:id', component: showUser, props: true },
  { path: '/users/:id/edit', component: editUser, props: true },
  { path: '/products/add', component: addProduct, props: true },
  { path: '/products', component: showProducts, props: true },
  { path: '/products/:pid', component: showProduct, props: true },
];
