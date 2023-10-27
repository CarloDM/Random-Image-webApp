  <script>
  import {store} from '../data/store';
  import OptionBar from './partials/option-bar.vue';
  import ImgCard from './partials/img-card.vue';
  export default {
    name:'MainSection',
    data(){
      return{
        store,
        isDragging: false,
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
      },

      startScrolling(event){
        this.isDragging = true;
      },

      scrollCards(event){
        const scrollableDiv = this.$refs.scrollable;
        if(this.isDragging){
          scrollableDiv.scrollLeft -= event.movementX * 1.5 ; 
        }
        // event.preventDefault();
      },

      endScrolling(){
        this.isDragging = false;
      },

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
  <section class="main_section position-relative ">

    <div class=" w-100 d-flex flex-column">
      <OptionBar @ratio-change="ratioChange" />

      <div  class="cards_container position-relative d-flex "
      ref="scrollable"

      @mousedown="startScrolling"
      @mousemove="scrollCards"
      @mouseleave="endScrolling"
      @mouseup="endScrolling"
      
      >

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
    <div class="overlay position-absolute w-100  "></div>


  </section>
</template>

<style lang="scss" scoped>
@use '../scss/_variables.scss' as *;
.main_section{
  width: 100%;
  height: 400px;
  margin-top: 5px;
  overflow: hidden;
  cursor:grab;

  &:active{
    cursor:grabbing;
  }
}

.cards_container{
  overflow: hidden;

  // box-shadow: inset 0px 0px 10px 10px $bg_black_80;
}

.overlay{
  pointer-events: none;
  top: 30px;
  left: 0px;
  height: calc(400px - 30px);
  background: linear-gradient(90deg, 
              $bg_black_80 0%,
              rgba(0,0,0,0) 1%, 
              rgba(0,0,0,0) 99%, 
              $bg_black_80 100%);

}

</style>