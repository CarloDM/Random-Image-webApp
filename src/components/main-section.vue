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
        store.sections.push(newSection);
      },
      deleteSection(id){
        if(store.sections.length > 1){
          store.sections = store.sections.filter(section => section.id != id);
        }
      },

      resetScroll(id){
        let scrollableSection = document.getElementById(id);
        scrollableSection.scrollLeft = 0;
      },
      startScrolling(){
        this.isDragging = true;
      },
      scrollCards(event){
        const scrollableSection = event.target;
        if(this.isDragging){
          scrollableSection.scrollLeft -= event.movementX * 1.5 ; 
        }
        // event.preventDefault();
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
  
  <section class="main_section w-100 position-relative mt-2" :style="{ height: store.sectionsHeight + 'px' }"
  v-for="(sect) in store.sections" :key="sect.id" 
  >

    <div class="section_container w-100 h-100 d-flex flex-column ">

        <OptionBar @ratio-change="ratioChange" @delete-section="deleteSection"
        :id="sect.id"
        :ratio="sect.ratio"
        />

        <div class="cards_container position-relative d-flex "
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
        <div class="overlay position-absolute w-100"></div>

    </div>


  </section>

  <div class="add_btn"
  @click="addSection">
      <img class="add_icon" src="../assets/icon/plus-solid.svg" >
  </div>

</template>
