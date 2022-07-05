<template>
  <div class="pagination-wrapper">
    <div
      class="page"
      :class="{'current-page' : page === pageNumber}"
      v-for="pageNumber in pagination"
      :key="pageNumber"
      @click="changePage(pageNumber)">
      {{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    totalPages: {
      type: Array,
      default: () => []
    },
    page : {
      type: Number,
      default: 1
    },
    changePage: {
      type: Function,
      default: () => null
    },
  },
  computed: {
    pagination() {
      if(this.page == 1) {
        return [this.page, this.page + 1]
      }
      if(this.page > 1 && this.page < this.totalPages && this.page < 3) {
        return [this.page - 1, this.page, this.page + 1]
      }
      if(this.page == this.totalPages) {
        return [this.page - 1, this.page]
      }
      if(this.page >= 3 && this.page < this.totalPages - 1){
        return [1, this.page - 1, this.page, this.page + 1, this.totalPages]
      }
      if(this.page == this.totalPages - 1){
        return [1, this.page - 1, this.page, this.totalPages]
      }
      return this.totalPage
    }
  },
}
</script>

<style scoped>
.pagination-wrapper{
  display: flex;
  justify-content: center;
}
.page{
  border: 2px solid #000;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  border-radius: 50%;
  cursor: pointer;
}
.current-page{
  background: #000;
  color: #ffffff;
}
</style>