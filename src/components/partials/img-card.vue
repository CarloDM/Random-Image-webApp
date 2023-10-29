  <script>
  import {store} from '../../data/store'
  import axios from 'axios';
  export default {
    name:'ImgCard',
    data(){
      return{
        store,
        imgUrl : false,
        load: false,
        favorite: false,
      }
    },
    props:{
      ratio: Number,
      sectionId: Number,
    },
    watch:{
      ratio(n,o){
        console.log('prop cambiata', n);
        if     (n == 1){this.getImage(store.ratioSquare)}
        else if(n == 2){this.getImage(store.ratiofourthirds)}
        else if(n == 3){this.getImage(store.ratioSixteenNinths)}
        else if(n == 4){this.getImage(store.ratioTwentyOneNinths)}
        else if(n == 5){this.getImage(store.ratiothirtyTwoNinths)}
        this.resetFavorite();
      }
    },
    methods:{
      getImage(ratio){
        this.load = false;
        
        axios.get(store.rdmIBaseUrl + ratio + store.format)
        .then(result =>{
            this.imgUrl = result.data.url;
            this.load = true;
        })
        .catch(error => { console.log(error)
          this.getImage();
        })
      },

      addFavorite(){
        this.favorite = !this.favorite;
      },
      resetFavorite(){
        this.favorite = false;
      }
    },
    computed:{},
    mounted(){
      this.getImage();
    }
  }
  </script>

<template>
  <div class="card_container ">

    <div v-if="!(load)"
    class="loading"
    :class="{
      'ratioSquare'         : ratio == 1,
      'ratiofourthirds'     : ratio == 2,
      'ratioSixteenNinths'  : ratio == 3,
      'ratioTwentyOneNinths': ratio == 4,
      'ratiothirtyTwoNinths': ratio == 5,
    }"
    >
      <p>loading</p>
    </div>

    <img v-else
    class="card_img h-100 "
    :class="{
      'ratioSquare'         : ratio == 1,
      'ratiofourthirds'     : ratio == 2,
      'ratioSixteenNinths'  : ratio == 3,
      'ratioTwentyOneNinths': ratio == 4,
      'ratiothirtyTwoNinths': ratio == 5,
      'unselected' : !favorite,
      'selected' : favorite,
    }"
    :src= 'imgUrl'  
    :alt="imgUrl"
    >

    <div @click="addFavorite"
    class="favorite position-absolute d-flex justify-content-center align-items-center ">

      <img v-if="!favorite"
      class="add_favorite" src="../../assets/icon/star-regular.svg" alt="">
      <img v-else
      class="add_favorite" src="../../assets/icon/star-solid.svg" alt="">

    </div>

  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/variables' as *;
.card_container{
  height: calc(400px - 30px);
  position: relative;
  pointer-events: none;
}
.card_img, .loading{
  height: 100%;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
  pointer-events: none;
  user-select: none;
}
.unselected{
  box-shadow: 0px 0px 9px $bg_black_40 ;
  transition: 500ms;
}
.selected{
  box-shadow: 0px 0px 3px 5px $white_200 ;
  transition: 500ms;
}

.favorite{
  width: 30px;
  height: 30px;
  bottom: -5px;
  right: 12px;
  pointer-events:visible;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.21);
  filter:opacity(80%);
  padding: 2px;
  border-radius: 50%;
}

.ratioSquare{
  aspect-ratio: 1/1;
}
.ratiofourthirds{
  aspect-ratio: 4/3;
}
.ratioSixteenNinths{
  aspect-ratio: 16/9;
}
.ratioTwentyOneNinths{
  aspect-ratio: 21/9;
}
.ratiothirtyTwoNinths{
  aspect-ratio: 32/9;
}
</style>