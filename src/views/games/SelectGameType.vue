<template>
  <div class="sgt-box">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title">
      <el-row style="min-height: 100px">
        <template v-if="type === 'subject'">
          <el-col :span="4" style="text-align: right;margin-right: 20px;">
            <div style="height: 32px;line-height: 32px;color: #000;">请选择所属专题:</div>
          </el-col>
          <el-col :span="19" v-if="subjectList.length>0">
            <el-select style="width: 100%;" filterable v-model="subjectId" size="small" placeholder="请选择所属专题">
              <el-option v-for="item in subjectList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </template>
        <template v-if="type === 'series'">
          <el-col :span="4" style="text-align: right;margin-right: 20px;">
            <div style="height: 32px;line-height: 32px;color: #000;">请选择所属系列:</div>
          </el-col>
          <el-col :span="19" v-if="seriesList.length>0">
            <el-select style="width: 100%;" filterable v-model="seriesId" size="small" placeholder="请选择所属系列">
              <el-option v-for="item in seriesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </template>

      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
      
    </el-dialog>
  </div>
</template>

<script>
import {
  BaseGroupLst,
  BaseTopicLst,
} from '@/api/api'
import {getAjax} from  '@/utils/ajax'
export default {
  name: 'SelectGameType',
  data() {
    return {
      type: '',
      title: '',
      dialogVisible: false,
      seriesList: [],
      seriesId: null,
      subjectId: null,
      subjectList: [],
    }
  },
  methods: {
    setTitle (type) {
      let text = ''
      switch(type) {
        case 'subject':
          this.getSubjectList()
          text = '选择专题'
          break;
        case 'series':
          this.getSeriesList()
          text = '选择系列'
          break;
        default:
          text = ''
      }
      this.title = text
      this.type = type
    },
    show(type = '') {
      this.setTitle(type)
      this.dialogVisible = true
    },
    // 获取专题
    getSubjectList() {
      getAjax({
        url: BaseTopicLst,
      }).then(res=> {
        if(res.code === 1) {
          this.subjectList = res.data
        }
      })
    },
    // 获取系列
    getSeriesList() {
      getAjax({
        url: BaseGroupLst
      }).then(res=> {
        if(res.code === 1) {
          this.seriesList = res.data
        }
      })
    },
    confirm() {
      this.dialogVisible = false
      let id= null
      switch(this.type) {
        case 'subject':
          id = this.subjectId
          break;
        case 'series':
          id = this.seriesId
          break;
        default:
          id = null
      }
      this.$emit("typecallback", {
        type: this.type,
        id: id,
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.sgt-box {
  font-size: 20px;
}
</style>