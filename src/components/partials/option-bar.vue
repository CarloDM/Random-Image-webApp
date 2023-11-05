  <script defer>
  import {store} from '../../data/store';
  export default {
    name:'OptionBar',
    data(){
      return{
        store,
        ratioValue: this.ratio,
      }
    },
    props:{id:Number,ratio:Number},
    methods:{
      handleChange(){
        this.$emit('ratio-change', parseInt(this.ratioValue),this.id);
      },
      deleteSection(){
        this.$emit('delete-section', this.id);
      },
    },
  }
  </script>

<template>
  <div @change="listenWindowWidth" class="option_bar d-flex align-items-center mb">

    <div class="remove_btn" @click="deleteSection">
      <img class="remove_icon" src="../../assets/icon/minus-solid.svg" >
    </div>

    <h3 v-if="store.screenWidth > 532" class="section_title mx-2 ">Section {{ id }}</h3>
    <h3 v-else                         class="section_title mx-2 ">        {{ id }}</h3>

    <select v-model="ratioValue" @change="handleChange" 
    name="aspectRatio" id="aspectRatio" class="select_options  mx-2">
      <option id="opt1" value=1>1/1</option>
      <option id="opt2" value=2>4/3</option>
      <option id="opt3" value=3>16/9</option>
      <option id="opt4" value=4>21/9</option>
      <option id="opt5" value=5>32/9</option>
    </select>

    <span v-if="store.screenWidth > 600" >Ratio</span>

    <div class="server_info ms-auto">
      <span>Random images From: <a href="https://random.imagecdn.app/" target="_blank"> random.imagecdn.app </a></span>
    </div>

  </div>
</template>
