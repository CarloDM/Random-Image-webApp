  <script>
  import {store} from '../data/store';
  import {myFunction} from '../function/basicFunction';
  import baseComponent from '../components/base-component.vue'
  export default {
    name:'App',
    data(){
      return{
        store,
      }
    },
    components:{baseComponent},
    watch:{},
    methods:{},
    computed:{},
    mounted(){
      myFunction('Ciao');
    }
  }
  </script>

<template>
  <div class="main_wrapper container debug2">

    <baseComponent/>

  </div>
</template>

<style lang="scss">

</style>