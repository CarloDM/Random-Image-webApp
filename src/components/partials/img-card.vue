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
        this.resetFavoriteAndUrl();
      },
      'store.download'(n,o){
        if(n !== o){
          this.takeDownload();
        }
      }
    },

    methods:{

      findDuplicateUrl(url){
        // guardami dentro tutte le sezioni con lo stesso ratio
        const sameRatioSectionsIds = [];
          let foundDuplicate = false;
          store.sections.forEach((section) => {
            // trovare tutti gli ID delle sezioni con lo stesso ratio
            if(section.ratio === this.ratio ){
              sameRatioSectionsIds.push(section.id);
            }
          });

          //  per ogni sezione identificata
          for (let index = 0; index <= sameRatioSectionsIds.length - 1; index++) {
            let section = store.allLoadedImg.find((section) => section.sectionId == sameRatioSectionsIds[index]);
            // verifica se gia esiste l'url
            if(section.images.includes(url)){
              foundDuplicate = true;
              break;
            }
          }
        return foundDuplicate;
      },

      getImage(){
        this.load = false;

        axios.get(store.rdmIBaseUrl + store.requestRatio[this.ratio - 1] + store.format)
        .then(result =>{
          // se gia l' url immagine gia esiste rifai la chiamata
          if(this.findDuplicateUrl(result.data.url)){
            this.getImage();
          }else{
            this.imgUrl = result.data.url;
            this.license= result.data.license;
            this.provider= result.data.provider;
            let allLoadedImg = store.allLoadedImg.find((section) => section.sectionId == this.sectionId);
            allLoadedImg.images.push(result.data.url);
            this.load = true;
          }
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
        }else{
          store.sections[this.SectionIndex()].images = store.sections[this.SectionIndex()].images.filter((image) => image !== this.imgUrl )
        }
      },
      resetFavoriteAndUrl(){
        store.sections[this.SectionIndex()].images = [];
        let allLoadedImg = store.allLoadedImg.find((section) => section.sectionId == this.sectionId);
        allLoadedImg.images = [];
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
          console.warn('DOWNLOAD!', imgUrl);
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
      class="favorite position_absolute d_flex justify_content_center align_items_center ">

        <img v-if="!favorite"
        class="add_favorite" src="../../assets/icon/star-regular.svg" alt="">
        <img v-else
        class="add_favorite" src="../../assets/icon/star-solid.svg" alt="">

      </div>
  </div>
</template>
