// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.use(VueResource)

//过滤章内容，截取前70个作为内容缩略
Vue.filter('strCut',function(str){
	 if (!str) { return ''}
  str = $(str).text();
  return str.substring(0,70)+"..."
})
//过滤文章发表时间
Vue.filter('timeStr',function(str){
	if (!str) { return ''}
    var time=new Date(str);
    return time.getMonth()+" 月"+time.getDate()+" 日  "+time.getHours()+":"+time.getMinutes()
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})




