import { reactive } from "vue";
import apiKeys from "./apiKeys";

export const store = reactive ({

  rdmImageUrl : 'https://random.imagecdn.app/v1/image?width=500&height=150&format=json',
  rdmIBaseUrl : 'https://random.imagecdn.app/v1/image?',
  ratioSquare :          'width=300&height=300',
  ratiofourthirds :      'width=800&height=600',
  ratioSixteenNinths :   'width=1920&height=1080',
  ratioTwentyOneNinths : 'width=2560&height=1080',
  ratiothirtyTwoNinths : 'width=3480&height=1080',
  format: '&format=json',


  sectionsRatios: [1],
})