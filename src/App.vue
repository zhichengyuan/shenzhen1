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
        this.batchGet();
  },
  methods: {
      //请求批次列表
        batchGet() {
            var that = this;
            this.$axios({
                method: 'get',
                url: "http://193.112.22.34:8480/phbip_mock/choose_house/batch/list",
                data: {},
            })
            .then(function (response) {
                console.log(response);
                
            })
            .catch(function (error) {
                console.log(error);
            })
        },
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
