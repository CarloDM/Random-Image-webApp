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
    // watch:{
    //   'store.sectionsRatios'(n,o){
    //     if(n !=o){
    //       console.log('main ratio ---->', store.sectionsRatios )
    //     }
    //   }
    // },
    methods:{
      ratioChange(value, id){
        console.warn(value, id);
        let sectionEdit = store.sections.find((section) => section.id == id);
        sectionEdit.ratio = value;
      },

      startScrolling(event){
        this.isDragging = true;
      },
      scrollCards(event){
        const scrollableDiv = event.target;
        if(this.isDragging){
          scrollableDiv.scrollLeft -= event.movementX * 1.5 ; 
        }
        // event.preventDefault();
      },
      sendId(sectionId){
        console.log(sectionId);
      },
      handleScroll(event, sectionId ){
        const scrollableDiv = event.target;
        const scrollPosition = scrollableDiv.scrollLeft;
        const maxScroll = scrollableDiv.scrollWidth - scrollableDiv.clientWidth;

        if (scrollPosition >= maxScroll * 0.9) {
          let sectionEdit = store.sections.find((section) => section.id == sectionId);
          sectionEdit.number += 1;
          console.log('section:',sectionId,'number of Photo',sectionEdit.number)
        }
      },
      endScrolling(){
        this.isDragging = false;
      },

    },
    computed:{},
    mounted(){}
  }
  </script>

<template>
  
  <section class="main_section position-relative "
  v-for="(sect) in store.sections" :key="sect.id"
  >

    <div class=" w-100 d-flex flex-column">
      <OptionBar @ratio-change="ratioChange"
      :id="sect.id"
      :ratio="sect.ratio"
      />

      <div class="cards_container position-relative d-flex debug2 "
      ref="scrollable"
      @mousedown="startScrolling"
      @mousemove="scrollCards"
      @mouseleave="endScrolling"
      @mouseup="endScrolling"
      @scroll="handleScroll($event,sect.id)"
      >

        <ImgCard v-for="(card,cardIndex) in sect.number" :key="cardIndex" 
        :ratio="sect.ratio"
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
}

.cards_container{
  overflow: hidden;
  cursor:grab;
  &:active{
    cursor:grabbing;
  }
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