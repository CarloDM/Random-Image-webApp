  <script>
  import {store} from '../data/store';
  import OptionBar from './partials/option-bar.vue';
  import ImgCard from './partials/img-card.vue';
  export default {
    name:'MainSection',
    data(){
      return{
        store,
      }
    },
    components:{OptionBar,ImgCard},
    watch:{
      'store.sectionsRatios'(n,o){
        if(n !=o){
          console.log('main ratio ---->', store.sectionsRatios )
        }
      }
    },
    methods:{
      ratioChange(value){
        console.warn(value);
        store.sectionsRatios = [value];
      }
    },
    computed:{},
    mounted(){
      this.ratio = 2,
      console.log(this.ratio)
      this.ratio = 1
      console.log(this.ratio)
    }
  }
  </script>

<template>
  <section class="main_section debug3">

    
    <div class=" w-100 d-flex flex-column">
      <OptionBar @ratio-change="ratioChange" />

      <div class="d-flex" >
        <ImgCard
        :ratio="store.sectionsRatios[0]"
        />
        <ImgCard
        :ratio="store.sectionsRatios[0]"
        />
        <ImgCard
        :ratio="store.sectionsRatios[0]"
        />
      </div>

      

    </div>


  </section>
</template>

<style lang="scss" scoped>
.main_section{
  width: 100%;
  height: 400px;
  margin-top: 5px;
  overflow: hidden;
}

</style>