<template>
  <div class="flex flex-center">
  <pie-chart :data="asdf"></pie-chart>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
     asdf:[['Blueberry', 44], ['Strawberry', 23]]
    }
  }
}//default
</script>
