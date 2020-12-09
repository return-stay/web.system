export default {
  data() {
    return {}
  },
  methods: {
    getRequest(data, callback) {
      this.$store.dispatch('game/getSortPageList', {
        url: data.url,
        params: data.params,
      }).then(res=> {
        if(res.code === 1 && res.data) {
          const resdata = res.data
          callback && callback(resdata)
        }else {
          callback && callback([])
        }
      })
    },
  }
}