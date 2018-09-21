import Vue from 'vue'
import Router from 'vue-router'
const Catagory = () => import('../pages/Catagory');
const Avator = () => import('../pages/Avator')
const Comment = () => import('../pages/Comment')
const Detail = () => import('../pages/Detail')
const Article = () => import('../pages/Article')

import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise;
}

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/catagory',
      name: 'Catagory',
      component: Catagory
    },
    {
      path: '/avator',
      name: 'Avator',
      component: Avator
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})