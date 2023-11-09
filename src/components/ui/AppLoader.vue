<template>
  <div class="spiner" />
</template>

<style lang="scss" scoped>
  .spiner {
    width: 60px;
    height: 60px;
    border: 8px solid $color-primary;
    border-radius: 50%;
    animation-name: spiner;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes spiner {
    0% {
      border-left-color: transparent;
      border-right-color: $color-primary;
    }
    25% {
      border-left-color: $color-primary;
      border-top-color: transparent;
    }
    50% {
      border-top-color: $color-primary;
      border-right-color: transparent;
    }
    75% {
      border-right-color: $color-primary;
      border-bottom-color: transparent;
    }
    100% {
      border-left-color: $color-primary;
      border-bottom-color: $color-primary;
      border-right-color: transparent;
      transform: rotate(360deg);
    }
  }
</style>
