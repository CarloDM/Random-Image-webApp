  <script defer>
  import {store} from '../data/store';
  import Header from '../components/header.vue';
  import OptionBar from './partials/option-bar.vue';
  import ImgCard from './partials/img-card.vue';
  export default {
    name:'MainSection',
    data(){
      return{
        store,
        isDragging: false,
        touchStart:0,
        download: false,
      }
    },

    components:{Header,OptionBar,ImgCard},

    methods:{

      ratioChange(value, id){
        let sectionEdit = store.sections.find((section) => section.id == id);
        sectionEdit.ratio = value;
        this.resetScroll(id);
      },

      addSection(){
        store.sectionsIdNumber ++;
        let newSection = {id:store.sectionsIdNumber ,ratio:1,number:1,images:[]};
        let newallLoadedImg = {sectionId:store.sectionsIdNumber, images:[]};
        store.sections.push(newSection);
        store.allLoadedImg.push(newallLoadedImg);
      },
      deleteSection(id){
        if(store.sections.length > 1){
          store.sections = store.sections.filter(section => section.id != id);
          store.allLoadedImg = store.allLoadedImg.filter(section => section.sectionId != id);
        }
      },

      resetScroll(id){
        let scrollableSection = document.getElementById(id);
        scrollableSection.scrollLeft = 0;
      },
      startScrolling(){
        this.isDragging = true;
      },
      startTouching(event){
        this.touchStart = event.changedTouches[0].clientX
        this.startScrolling();
      },
      scrollCards(event){
        const scrollableSection = event.target;
        if(this.isDragging){
          scrollableSection.scrollLeft -= event.movementX * 1.5 ; 
        }
        // event.preventDefault();
      },
      moveCards(event){
        const scrollableSection = event.target;
        if(this.isDragging){
          scrollableSection.scrollLeft -= (event.changedTouches[0].clientX - this.touchStart) * 1.5 ; 
        }
        this.touchStart = event.changedTouches[0].clientX;
      },

      handleScroll(event, sectionId ){
        const scrollableSection = event.target;
        const scrollPosition = scrollableSection.scrollLeft;
        const maxScroll = scrollableSection.scrollWidth - scrollableSection.clientWidth;

        if (scrollPosition >= maxScroll * 0.9) {
          let sectionEdit = store.sections.find((section) => section.id == sectionId);
          sectionEdit.number += 1;
        }
      },
      endScrolling(){
        this.isDragging = false;
      },
      endTouching(event){
        this.endScrolling();
      },

      checkContainerSize() {
        const cardsContainers = this.$refs.cardsContainers;
        const cardsContainersWidth = cardsContainers[0].clientWidth
        let   cardsWhidth = [];
        let childWidth = 0;

        for (let index = 0; index < cardsContainers.length; index++) {

            let container = cardsContainers[index];
            cardsWhidth.push(0)
          
            for (let childInd = 0; childInd < container.children.length; childInd++ ){
              childWidth = container.children[childInd].clientWidth;
              cardsWhidth[index] += childWidth;
            }
          
            while (cardsWhidth[index] <= cardsContainersWidth) {
              store.sections[index].number ++
              cardsWhidth[index] += childWidth;
            }
        }
      },

      listenWindowWidth(){
        store.screenWidth = window.innerWidth;
        this.checkContainerSize()
      },

    },

    updated(){
      this.checkContainerSize();
    },

    mounted(){
      this.resetScroll(0);
      this.checkContainerSize();
      this.listenWindowWidth();
      window.addEventListener('resize', this.listenWindowWidth);
    }
  }
  </script>

<template>
  <Header/>
  
  <section class="main_section w_100 position_relative mt_2" :style="{ height: store.sectionsHeight + 'px' }"
  v-for="(sect) in store.sections" :key="sect.id" 
  >

    <div class="section_container w_100 h_100 d_flex flex_column ">

        <OptionBar @ratio-change="ratioChange" @delete-section="deleteSection"
        :id="sect.id"
        :ratio="sect.ratio"
        />

        <div class="cards_container position_relative d_flex "
        ref="cardsContainers"
        :id="sect.id"
        @mousedown.passive="startScrolling"
        @mousemove.passive="scrollCards"
        @mouseleave.passive="endScrolling"
        @mouseup.passive="endScrolling"
        @touchstart="startTouching"
        @touchmove="moveCards"
        @touchend="endTouching"
        @scroll.passive="handleScroll($event,sect.id)"
        >
            <ImgCard v-for="(card,cardIndex) in sect.number" :key="cardIndex" 
            :ratio="sect.ratio"
            :sectionId="sect.id"
            />
        </div>
        <div class="overlay position_absolute w_100"></div>

    </div>


  </section>

  <div class="add_btn"
  @click.passive="addSection">
      <img class="add_icon" src="../assets/icon/plus-solid.svg" >
  </div>

</template>
