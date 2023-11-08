import { reactive } from "vue";

export const store = reactive ({
  // rdmImageUrl : 'https://random.imagecdn.app/v1/image?width=500&height=150&format=json', // base example

  rdmIBaseUrl : 'https://random.imagecdn.app/v1/image?',

  requestRatio: [
    'width=300&height=300',   //ratioSquare :   /2
    'width=400&height=300',   //ratiofourthirds :  /2
    'width=640&height=360',   //ratioSixteenNinths :  /3
    'width=640&height=270',   //ratioTwentyOneNinths :  /4
    'width=870&height=270',   //ratiothirtyTwoNinths :  /4
  ],

  format: '&format=json',


  sectionsIdNumber:0,
  sectionsHeight: 380,
  sections : [
    {id:0,ratio:1,number:1, images:[],},
  ],


  allLoadedImg : [
    {sectionId:0, images:[]},
  ],

  screenWidth:0,
  download: false,
})