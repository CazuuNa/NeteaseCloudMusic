<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">


import { defineProps, computed, defineComponent, toRefs } from "vue";
export default defineComponent({
  setup() {
    const props = defineProps({
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        default: ''
      }
    })
    const iconName = computed(() => `#icon-${props.name}`);
    const svgClass = computed(() => {
      console.log(props.name, 'props.name');
      if (props.name) {
        return `svg-icon icon-${props.name}`
      }
      return 'svg-icon'
    });
    return {
      iconName,svgClass,...toRefs(props)
    }
  }
})



</script>

<style lang='scss'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>

