
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue');
import {Form, HasError, AlertError} from 'vform'
window.Form=Form;
window.Fire=new Vue();
import Swal from 'sweetalert2'
window.Swal=Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
window.Toast= Toast;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from "vue-router";
import DashboardComponent from "./components/DashboardComponent";
import ProfileComponent from "./components/ProfileComponent";
import UsersComponent from "./components/UsersComponent";

Vue.use(VueRouter)

let routes=[
    {path: '/dashboard', component:DashboardComponent},
    {path: '/profile', component:ProfileComponent},
    {path: '/users',component:UsersComponent},

];

const router = new VueRouter({
    routes, // short for `routes: routes`
    mode:'history'
})
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
