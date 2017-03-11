/**
 * 我们既可以使用./components/goods/goods.vue
 * 也可以使用components/goods/goods.vue
 * 原因就在于webpack.base.conf.js中定义了component这个路径别名
 */
import Vue from "vue";
import App from "./App";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import goods from "components/goods/goods";
import ratings from "components/ratings/ratings";
import seller from "components/seller/seller";
import 'common/stylus/index.styl';
//往Vue中注册全局插件
Vue.use(VueRouter);
Vue.use(VueResource);
var app = Vue.extend(App);
var router = new VueRouter({
    linkActiveClass: 'active'//默认当前的link classname为v-link-active
});
router.map({
    // 与router.go('/seller');的效果相同
    '/': {
        component: seller
    },
    '/goods': {
        component: goods
    },
    '/ratings': {
        component: ratings
    },
    '/seller': {
        component: seller
    }
});
router.start(app, '#app');
//设置默认的首页
// router.go('/seller');
/**
 * import是es6里面的语法
 * import后面接导入的模块,from表示从哪里导入
 *      如果from后面接的文件是export default,只导出了一个模块,则可以写成import aaa的形式
 *      否则就要写成import {aaa,bbb} 的形式
 * from有三种形式,相对路径,绝对路径,模块名
 *      如果是相对路径与绝对路径的话,则后缀名通常可以不写;
 *      如果是模块名(即package.json中的key)的话,实际上对应的是node_modules文件夹下的文件夹
 *
 */