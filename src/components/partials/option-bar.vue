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

      // viewSelectedRatio(){
      //   if(this.ratioValue == 2){
      //   let opt = document.getElementById('opt1')
      //   opt.setAttribute('selected', 'selected');
      //   console.warn(opt)}
      // },
    },
    computed:{},
    mounted(){
      // this.viewSelectedRatio();
    }
  }
  </script>

<template>
  <div class="option_bar d-flex  debug1">

    <h5>Images 1</h5>

    <select v-model="ratioValue" @change="handleChange" 
    name="aspectRatio" id="aspectRatio" class="select-options mx-1">
      <option id="opt1" value=1>1/1</option>
      <option id="opt2" value=2>4/3</option>
      <option id="opt3" value=3>16/9</option>
      <option id="opt4" value=4>21/9</option>
      <option id="opt5" value=5>32/9</option>
    </select>
    <!-- v-if="id != 0"  -->
    <div class="remove_btn"
    @click="deleteSection">
    <img class="remove_icon" src="../../assets/icon/minus-solid.svg" >
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .option_bar{
    width: 100%;
    height: 30px;
  }

</style>