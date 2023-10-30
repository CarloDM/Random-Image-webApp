  <script>
  import {store} from '../data/store';
  import {myFunction} from '../function/basicFunction';
  import Header from '../components/header.vue';
  import Main from '../components/main.vue';
  import Footer from '../components/footer.vue';
  export default {
    name:'App',
    data(){
      return{
        store,
      }
    },
    components:{Header,Main,Footer},
    watch:{},
    methods:{},
    computed:{},
    mounted(){
      myFunction('Ciao');
    }
  }
  </script>

<template>
  <div class="main_wrapper">

    <Main/>
    <Footer/>

  </div>
</template>

<style lang="scss">

</style>