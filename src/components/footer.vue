  <script defer>
  import { store } from '../data/store';
  export default {
    name:'Footer',
    data(){
      return{
        store,
        bottonCountDown: true,
      }
    },
    watch:{},
    methods:{
      startDownload(){
        this.bottonCountDown = false;
        store.download = !store.download;
        setTimeout(() => {
          this.bottonCountDown = true;
        }, 3000);
      },
    },
    computed:{},
    mounted(){}
  }
  </script>

<template>
  <footer class="">
    <div class="my_container_small d-flex justify-content-around align-items-center h-75 ">

        <img class="footer_icon"  src="../assets/icon/object-group-solid.svg" alt="">
        <!-- <img class="h-75"  src="../assets/icon/file-image-regular.svg" alt=""> -->

        <img class="footer_icon" :class="{'off' : !bottonCountDown}"
        src="../assets/icon/download-solid.svg"
        @click="startDownload"
        >
      
        <input class="section_height_input footer_icon"
        type="range" min="150" max="380" v-model="store.sectionsHeight">

    </div>
    
    <div class="credits w-100 h-25 text-center ">

        <span>made whit &hearts; by 
          <a href="https://github.com/CarloDM" target="_black">Carlo De Mauro</a>
        </span>

    </div>
  </footer>
</template>
