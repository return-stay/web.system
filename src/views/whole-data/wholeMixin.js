import moment from 'moment'

export default {
  data() {
    return{
      s_time: 0,
      e_time: 0,
      dateShow: '', //显示时间
      trenchList: [], //渠道列表
      platformValue: -1,
    }
  },
  methods: {
    // 初始化日期
    getInitTime() {
      let timestamp=new Date()
      const etimeNumber =this.dateToMs(timestamp)- 24*60*60*1000
      this.e_time = etimeNumber
      let dateString = timestamp - 30 * 24 * 60*60*1000
      this.s_time = dateString
      this.dateString = moment(dateString).format('YYYY年MM月DD日') + ' ~ ' +moment(etimeNumber).format('YYYY年MM月DD日');
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    // 切换时间
    pickerChange(data) {
      this.s_time = this.dateToMs(data[0])
      this.e_time = this.dateToMs(data[1])
      const dateShow = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
      this.dateShow = dateShow
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    platformChange(e) {
      this.platformValue = e
      this.init()
    },
    // 获取渠道列表
    getTrenchList() {
      this.$store.dispatch('game/getChannelList').then(res=> {
        let list = res
        list.unshift({
          id: -1,
          name: '全部',
        })
        this.trenchList = list
      })
    },
    dateToMs (date) {
      let result = new Date(date).getTime();
      return result;
    },
  }
}