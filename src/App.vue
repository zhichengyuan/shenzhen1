<template>
  <div id="app">
    <router-view/>
    <Pop v-if="isPop"></Pop>
  </div>
</template>

<script>
import Pop from '@/components/pop'
export default {
  name: 'App',
  data() {
    return {
      isPop:false
    }
  },
  mounted:function (){
  },
  methods: {
     
  },
  components:{
              Pop:Pop
        }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
  color: #666;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
