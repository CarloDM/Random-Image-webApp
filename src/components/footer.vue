  <script>
  import { store } from '../data/store';
  export default {
    name:'Footer',
    data(){
      return{
        store,
      }
    },
    watch:{},
    methods:{},
    computed:{},
    mounted(){}
  }
  </script>

<template>
  <footer class="">
    <div class="my_container_small d-flex justify-content-between align-items-center h-75 ">

        <h1>footer</h1>
      
        <input class="section_height_in"
        type="range" min="150" max="380" v-model="store.sectionsHeight">

    </div>
    
    <div class="credits w-100 h-25 text-center  bg-black">

        <span>made whit &hearts; by 
          <a href="https://github.com/CarloDM" target="_black">Carlo De Mauro</a>
        </span>

    </div>
  </footer>
</template>

<style lang="scss" scoped>
.section_height_in{
  width: 100px;
}
.credits{
  background-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(40,40,40,1) 100%);;
}

</style>