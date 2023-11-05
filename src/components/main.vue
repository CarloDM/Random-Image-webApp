  <script>
  import MainSection from './main-section.vue';
  export default {
    name:'Main',
    components:{MainSection,},
    methods:{
      mainScroll(event){
        const scrollableMain = this.$refs.main;
          scrollableMain.scrollTop += event.deltaY * 2.5 ; 
      },
    },
  }
  </script>

<template>
  <main
  @wheel="mainScroll"
  ref="main">
    <div class="my_container">
      <MainSection/>
    </div>
  </main>
</template>
