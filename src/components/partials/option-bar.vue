  <script>

  export default {
    name:'OptionBar',
    data(){
      return{
        ratioValue: 1,
      }
    },
    watch:{},
    methods:{
      handleChange(){
        console.log(this.ratioValue);
        this.$emit('ratio-change', parseInt(this.ratioValue));
      }
    },
    computed:{},
    mounted(){}
  }
  </script>

<template>
  <div class="option_bar d-flex  debug1">

    <h5>Images 1</h5>

    <select v-model="ratioValue" @change="handleChange" 
    name="aspectRatio" id="aspectRatio" class="select-options mx-1">
      <option value=1>1/1</option>
      <option value=2>4/3</option>
      <option value=3>16/9</option>
      <option value=4>21/9</option>
      <option value=5>32/9</option>
    </select>

  </div>
</template>

<style lang="scss" scoped>
  .option_bar{
    width: 100%;
    height: 30px;
  }

</style>