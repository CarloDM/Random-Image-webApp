  <script>
  import MainSection from './main-section.vue';
  export default {
    name:'Main',
    data(){
      return{
        isDragging: false,
        touchStart:0,
      }
    },
    components:{MainSection,},
    methods:{
      mainScroll(event){
        const scrollableMain = this.$refs.main;
          scrollableMain.scrollTop += event.deltaY * 2.5 ; 
      },
      startScrolling(){
        this.isDragging = true;
      },
      startTouching(event){
        console.log('start touch', event.changedTouches[0].clientY);
        this.touchStart = event.changedTouches[0].clientY
        this.startScrolling();
      },
      moveMain(event){
        console.log('move main',event.changedTouches[0].clientY - this.touchStart );
        const scrollableMain = this.$refs.main;
        if(this.isDragging){
          scrollableMain.scrollTop -= (event.changedTouches[0].clientY - this.touchStart) * 1.5 ; 
        }
        this.touchStart = event.changedTouches[0].clientY;
      },
      endScrolling(){
        this.isDragging = false;
      },
      endTouching(event){
        console.log('end touching', event);
        this.endScrolling();
      },
    },
  }
  </script>

<template>
  <main
  @wheel.passive="mainScroll"
  @touchstart="startTouching"
  @touchmove="moveMain"
  @touchend="endTouching"
  ref="main">
    <div class="my_container">
      <MainSection/>
    </div>
  </main>
</template>
