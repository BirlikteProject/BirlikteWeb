<template>
  <div class="tooltip-wrapper" :class="type"> 
      {{ text }}
  </div>
</template>

<script>
export default {
name: 'ToolTip',
props: {
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'bottom',
  },
},
}
</script>

<style lang="scss">

  .tooltip-wrapper {
    font-family: 'Quicksand', sans-serif;
    position: absolute;

    background-color: #4a4a4a;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    z-index: 1;
    &.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.5rem;
    }
    &.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
        margin-bottom: 0.5rem;
    }
    &.left {
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
    }
    &.right {
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
        margin-left: 0.5rem;
    }
    &:after {
      content: '';
      position: absolute;
      top: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      border: 0.5rem solid transparent;
      border-bottom-color: #4a4a4a;
    }
  }


</style>