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
        //beccare la section by id e azzerare lo scroll
        let scrollableDiv = document.getElementById(id);
        scrollableDiv.scrollLeft = 0;
      },

      startScrolling(){
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
        }
      },
      endScrolling(){
        this.isDragging = false;
      },
      checkContainerSize() {
      const cardsContainers = this.$refs.cardsContainers;
      const cardsContainersWidth = cardsContainers[0].clientWidth
      let   cardsWhidth = [];
      let childWidth = 0;

        for (let index = 0; index < cardsContainers.length; index++) {

          let container = cardsContainers[index];
          console.log('photo charged' , container.children.length );
          cardsWhidth.push(0)

          for (let childInd = 0; childInd < container.children.length; childInd++ ){
            childWidth = container.children[childInd].clientWidth;
            cardsWhidth[index] += childWidth;
          }

          while (cardsWhidth[index] < cardsContainersWidth) {
            store.sections[index].number ++
            cardsWhidth[index] += childWidth;
          }
        }
      },

      addSection(){
        store.sectionsNumber ++;
        let newSection = {id:store.sectionsNumber ,ratio:1,number:1,images:[]};
        store.sections.push(newSection);
      },
      // deleteSection(){
      //   store.sectionsNumber ++;
      //   let newSection = {id:store.sectionsNumber ,ratio:1,number:1};
      //   store.sections.push(newSection);
      // }
    },
    updated(){
      this.checkContainerSize();
    },
    computed:{},
    mounted(){
      this.checkContainerSize();
    }
  }
  </script>

<template>

  <!-- <button @click="checkContainerSize">test</button> -->
  
  <section class="main_section position-relative "
  v-for="(sect) in store.sections" :key="sect.id" 
  >

    <div class=" w-100 d-flex flex-column">
      <OptionBar @ratio-change="ratioChange"
      :id="sect.id"
      :ratio="sect.ratio"
      />

      <div class="cards_container position-relative d-flex"
      ref="cardsContainers"
      :id="sect.id"
      @mousedown="startScrolling"
      @mousemove="scrollCards"
      @mouseleave="endScrolling"
      @mouseup="endScrolling"
      @scroll="handleScroll($event,sect.id)"

      >

        <ImgCard v-for="(card,cardIndex) in sect.number" :key="cardIndex" 
        :ratio="sect.ratio"
        :sectionId="sect.id"
        />

      </div>

    </div>

    <div class="overlay position-absolute w-100"></div>

  </section>

  <div class="add_btn"
  @click="addSection">
    <img class="add_icon" src="../assets/icon/plus-solid.svg" >
  </div>

</template>

<style lang="scss" scoped>
@use '../scss/_variables.scss' as *;
.main_section{
  width: 100%;
  height: 420px;
  margin-top: 5px;
  overflow: hidden;
}

.cards_container{
  overflow: hidden;
  height: calc(420px - 30px);
  cursor:grab;
  &:active{
    cursor:grabbing;
  }
}

.overlay{
  pointer-events: none;
  top: 30px;
  left: 0px;
  height: calc(420px - 30px);
  background: linear-gradient(90deg, 
              $bg_black_80 0%,
              rgba(0,0,0,0) 1%, 
              rgba(0,0,0,0) 99%, 
              $bg_black_80 100%);

}

</style>