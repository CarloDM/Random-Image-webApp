import { reactive } from "vue";
import apiKeys from "./apiKeys";

export const store = reactive ({

  // rdmImageUrl : 'https://random.imagecdn.app/v1/image?width=500&height=150&format=json', // base example
  rdmIBaseUrl : 'https://random.imagecdn.app/v1/image?',
  ratioSquare :          'width=300&height=300',   //  /2
  ratiofourthirds :      'width=400&height=300',   //  /2
  ratioSixteenNinths :   'width=640&height=360', //  /3
  ratioTwentyOneNinths : 'width=640&height=270', //  /4
  ratiothirtyTwoNinths : 'width=870&height=270', //  /4
  format: '&format=json',


  // array di oggetti section
  sectionsIdNumber:0,
  sections : [
    {id:0,ratio:1,number:1, images:[],},
  ]
})