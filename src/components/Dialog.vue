<template>
  <div class="dialog-wrapper" v-if="show">
    <div class="dialog-card">
      <div class="close">
        <button @click="closeDialog">X</button>
      </div>
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "Dialog",
  props: {
    user: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog(){
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
.dialog-wrapper{
  position: fixed;
  background: rgba(0,0,0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-card{
  overflow-y: scroll;
  background: #ffffff;
  width: 700px;
  height: 80vh;
  padding: 30px;
  position: relative;
}
.close{
  position: absolute;
  right: 30px;
  top: 30px;
}
.close button {
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  background: transparent;
  border: 0;
}
</style>