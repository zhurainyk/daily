import WOW from 'wow.js'
import { store } from '@/store'  
const $autoWow = () => {

     new WOW().init();
}
 
export default {
  computed:{
    $store(){
        return store()
    },
    $wow(){
        return this.$store.wow
    }
  } ,
  mounted() {
    $autoWow()
  }, 
}
