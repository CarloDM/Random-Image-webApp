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
  <footer class="debug3">
    <div class="my_container d-flex">

      <h1>footer</h1>
  
      <input class="section_height_in"
      type="range" min="150" max="400" v-model="store.sectionsHeight">

    </div>


  </footer>
</template>

<style lang="scss" scoped>
.section_height_in{
  width: 100px;
}

</style>