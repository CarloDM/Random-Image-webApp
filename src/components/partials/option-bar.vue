  <script>
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
    watch:{},
    methods:{
      handleChange(){
        this.$emit('ratio-change', parseInt(this.ratioValue),this.id);
      },
      deleteSection(){
        this.$emit('delete-section', this.id);
      },
    },
    computed:{},
    mounted(){
    }
  }
  </script>

<template>
  <div class="option_bar d-flex align-items-center mb">

    <div class="remove_btn"
    @click="deleteSection">
    <img class="remove_icon" src="../../assets/icon/minus-solid.svg" >
    </div>


    <h3 class="section_title mx-2 ">Sections {{ id }}</h3>

    <!-- <label for="aspectRatio" class="ms-2 me-1">Ratio</label> -->
    <select v-model="ratioValue" @change="handleChange" 
    name="aspectRatio" id="aspectRatio" class="select_options  mx-2">
      <option id="opt1" value=1>1/1</option>
      <option id="opt2" value=2>4/3</option>
      <option id="opt3" value=3>16/9</option>
      <option id="opt4" value=4>21/9</option>
      <option id="opt5" value=5>32/9</option>
    </select>
    <span>Ratio</span>
    <div class="server_info ms-auto">
      <span>Random images From: <a href="https://random.imagecdn.app/" target="_blank"> random.imagecdn.app </a></span>
    </div>



  </div>
</template>

<style lang="scss" scoped>
  .option_bar{
    width: 100%;
    height: 30px;
  }
  .server_info{
    font-family: sans-serif;
    font-weight: 600;
    font-size: 0.7rem;
    padding-right: 10px;
  }

</style>