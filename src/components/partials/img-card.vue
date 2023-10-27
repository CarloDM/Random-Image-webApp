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
      }
    },
    props:{
      ratio: Number,
    },
    watch:{
      ratio(n,o){
        console.log('prop cambiata', n);
        if     (n == 1){this.getImage(store.ratioSquare)}
        else if(n == 2){this.getImage(store.ratiofourthirds)}
        else if(n == 3){this.getImage(store.ratioSixteenNinths)}
        else if(n == 4){this.getImage(store.ratioTwentyOneNinths)}
        else if(n == 5){this.getImage(store.ratiothirtyTwoNinths)}
        
      }
    },
    methods:{
      getImage(ratio){

        this.load = false;

        axios.get(store.rdmIBaseUrl + ratio + store.format)
        .then(result =>{
            // console.log(result.data.url);
            this.imgUrl = result.data.url;
            this.load = true;
        })
        .catch(error => { console.log(error)
        })
      }

    },
    computed:{},
    mounted(){
      this.getImage();
    }
  }
  </script>

<template>
  <div class="card_container">

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
    class="card_img h-100 mx-1"
    :class="{
      'ratioSquare'         : ratio == 1,
      'ratiofourthirds'     : ratio == 2,
      'ratioSixteenNinths'  : ratio == 3,
      'ratioTwentyOneNinths': ratio == 4,
      'ratiothirtyTwoNinths': ratio == 5,
    }"
    :src= 'imgUrl'  
    :alt="imgUrl"
    >


  </div>
</template>

<style lang="scss" scoped>
.card_container{
  height: calc(400px - 30px);
  pointer-events: none;
}
.card_img, .loading{
  height: 100%;
  object-fit: cover;
  padding: 5px;
  border-radius: 10px;
  pointer-events: none;
  user-select: none;
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