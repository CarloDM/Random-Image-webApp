  <script async>
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
        license: '',
        provider: '',
      }
    },
    
    props:{
      ratio: Number,
      sectionId: Number,
    },

    watch:{
      ratio(n,o){
        if(n !== o){this.getImage()}
        this.resetFavorite();
      },
      'store.download'(n,o){
        if(n !== o){
          console.warn('DOWNLOAD!');
          this.takeDownload();
        }
      }
    },

    methods:{

      getImage(){
        this.load = false;

        axios.get(store.rdmIBaseUrl + store.requestRatio[this.ratio - 1] + store.format)
        .then(result =>{
            this.imgUrl = result.data.url;
            this.license= result.data.license,
            this.provider= result.data.provider,
            this.load = true;
        })
        .catch(error => { console.log(error)
          this.getImage();
        })
      },

      SectionIndex(){
        const sectionIndex = store.sections.findIndex((section) => section.id === this.sectionId);
        return sectionIndex;
      },

      toggleFavorite(){
        this.favorite = !this.favorite;
        
        if(this.favorite){
          store.sections[this.SectionIndex()].images.push(this.imgUrl)
          console.log(this.SectionIndex(), store.sections[this.SectionIndex()].images);
        }else{
          store.sections[this.SectionIndex()].images = store.sections[this.SectionIndex()].images.filter((image) => image !== this.imgUrl )
          console.log(this.SectionIndex(), store.sections[this.SectionIndex()].images);
        }
      },
      resetFavorite(){
        store.sections[this.SectionIndex()].images = [];
        this.favorite = false;
      },

      hResUrlModifier(ratioN){
        switch (ratioN){
          case 1 : return this.imgUrl.replace(/h=300|w=300/g, function(match) {
          return match === 'h=300' ? 'h=1200' : 'w=1200';
          });
          case 2 : return this.imgUrl.replace(/h=300|w=400/g, function(match) {
          return match === 'h=300' ? 'h=1200' : 'w=1600';
          });
          case 3 : return this.imgUrl.replace(/h=360|w=640/g, function(match) {
          return match === 'h=360' ? 'h=1080' : 'w=1920';
          });
          case 4 : return this.imgUrl.replace(/h=270|w=640/g, function(match) {
          return match === 'h=270' ? 'h=1080' : 'w=2560';
          });
          case 5 : return this.imgUrl.replace(/h=270|w=870/g, function(match) {
          return match === 'h=270' ? 'h=1080' : 'w=3480';
          });
        }
      },

      takeDownload(){
        if(this.favorite){
          const imgUrl = this.hResUrlModifier(this.ratio)
          fetch(imgUrl)
          .then(response => response.blob())
          .then(blob => {
           // Crea un URL temporaneo
          const url = URL.createObjectURL(blob);
           // Crea link con l'URL temporaneo
          const link = document.createElement('a');
          link.href = url;
          link.download = 'section' + this.sectionId + '-' + this.provider + '-' + this.imgUrl.match(/photo-[\d-]+/)[0] + '.jpg';
          link.click()
          })
          .catch(error => console.error('Errore durante il recupero dell immagine:', error));
        }
      },
    },
    mounted(){
      this.getImage();
    }
  }
  </script>

<template>
  <div class="card_container" :class="{'card_containe_selected' : favorite}">

      <div v-if="!(load)"
      class="loading lds-ripple"
      :class="{
        'ratioSquare'         : ratio == 1,
        'ratiofourthirds'     : ratio == 2,
        'ratioSixteenNinths'  : ratio == 3,
        'ratioTwentyOneNinths': ratio == 4,
        'ratiothirtyTwoNinths': ratio == 5,
      }"
      >
          <div></div><div></div><div></div>
      </div>

      <img v-else
      class="card_img"
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
      >

      <div @click="toggleFavorite"
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
  height: calc(100% - 30px);
  position: relative;
  pointer-events: none;
  transition: all 500ms;
}
.card_containe_selected{
  height: calc(103% - 30px);
}

.card_img, .loading{
  height: 100%;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
  pointer-events: none;
  user-select: none;
  font-size: 0.5rem;
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

.lds-ripple {
  display: inline-block;
  position: relative;
  // width: 100%;
  // height: 100%;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  transform: translate(-50%,-50%);
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>