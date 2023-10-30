  <script>

  export default {
    name:'Header',
    data(){
      return{

      }
    },
    watch:{},
    methods:{},
    computed:{},
    mounted(){}
  }
  </script>

<template>
  <header class="d-flex justify-content-center">

    <h5 class="my_logo_title mx-3 h-100 btn-group-vertical">Random</h5>
    <img class="my_logo " src="../assets/logo/my_camera_logo_opt.svg" alt="">
    <h5 class="my_logo_title mx-3 h-100 btn-group-vertical">Images</h5>

  </header>
</template>

<style lang="scss" scoped>
.my_logo{
  height: 200%;
  margin-top: -10px;
  filter: hue-rotate(0deg);
  animation-name: logoAnimation;
  animation-duration: 15s;
  animation-iteration-count: infinite;
}
@keyframes logoAnimation {
  from {filter: hue-rotate(0deg)}
  to {filter: hue-rotate(359deg)}
}
.my_logo_title{
  margin-top: 10px;
  user-select: none;
}

</style>