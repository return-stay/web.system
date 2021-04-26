<template>
  <div class="view-box ta-box">

    <div class="ta-game-list" v-if="gameList.length>0">
      <div class="ta-header" style="margin-bottom: 10px;">关联游戏</div>
      <el-table
        :data="gameList"
        style="width: 100%">
        <el-table-column
          prop="disc_no"
          label="奖杯编号"
          align="center"
          width="100">
          <span>{{disc_no}}</span>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="关联游戏">
          <template slot-scope="{row}">
            <div class="table-games">
              <div class="table-games-l">
                <ImageLarger :src="row.cover" />
              </div>
              <div class="table-games-r">
                <p>{{row.platform_name}}  {{row.name}}</p>
                <p>{{row.area_name}}  {{row.language_name}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="level_name"
          align="center"
          label="奖杯完成度"
          width="100">
          <template slot-scope="{row}">
            <span v-if="row.level === 1">神作</span>
            <span v-else-if="row.level === 2">极易</span>
            <span v-else-if="row.level === 3">容易</span>
            <span v-else-if="row.level === 4">普通</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="platinum"
          align="center"
          label="类型/系列"
          width="100">
          <template  slot-scope="{row}">
            <div>
              <p>{{row.sort_name}}</p>
              <p>{{row.group_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_name"
          align="center"
          label="开发公司">
          <template slot-scope="{row}">
            <span>{{row.l}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="押金"
          width="100">
          <template slot-scope="{row}">
            <span>{{Number(((row.deposit/100).toFixed(2)))}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="日租金"
          width="100">
          <template slot-scope="{row}">
            <span>{{Number(((row.day_rent/100).toFixed(2)))}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="disc_count"
          align="center"
          label="库存"
          width="100">
          <template slot-scope="{row}">
            <span>{{row.c}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="创建时间"
          width="170">
          <template slot-scope="{row}">
            <span v-if="row.create_time">{{moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <span class="text-cursor" @click="edit(row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor" @click="stock(row)">加库</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <div class="ta-header">奖杯信息</div>
      <div class="ta-form">
        <el-form-item label="奖杯编号" prop="dn">
          <el-input size="small" v-model="form.dn" placeholder="请输入奖杯编号" @blur="checkRepeat" />
        </el-form-item>

        <el-form-item label="奖杯名称" prop="nm" v-if="isRequired">
          <el-input size="small" v-model="form.nm" placeholder="请输入奖杯名称" />
        </el-form-item>
        <el-form-item label="奖杯名称" v-else>
          <el-input size="small" v-model="form.nm" placeholder="请输入奖杯名称" />
        </el-form-item>
        <el-form-item label="完成度" prop="l">
          <el-select size="small" style="width: 100%;" v-model="form.l" placeholder="请选择完成度">
            <el-option v-for="item in trophyLevelLst" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="白金奖杯">
          <el-input-number v-model="form.p" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="金奖杯">
          <el-input-number v-model="form.g" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="银奖杯">
          <el-input-number v-model="form.s" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="铜奖杯">
          <el-input-number v-model="form.c" controls-position="right" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </div>
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button type="primary" @click="submitForm('form')">确定添加</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import GameTable from '@/components/TablePage/GameTable'
import { getStoreList } from '@/utils/data'
import {postAjax} from '@/utils/ajax'
import {BaseTrophyLevelLst, GameTrophyNewSet, GameTrophySet, GameTrophyInf, GameTrophyCheck } from '@/api/api'
import moment from 'moment'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'AddTrophyManage',
  components: {GameTable, ImageLarger},
  data() {
    return {
      disc_no: '',
      moment,
      trophyLevelLst: [],
      gameList: [],
      isCheckRepeatBool: true, //校验编码是否重复， 默认不重复
      form: {
        dn: '',
        nm: '',
        l: null,
        p: 1,
        g: 0,
        s: 0,
        c: 0,
      },
      rules: {
        dn: [ { required: true, message: '请输入活动编号', trigger: 'blur' } ],
        nm: [ { required: true, message: '请输入奖杯名称', trigger: 'blur' } ],
        l: [ { required: true, message: '请输入完成度', trigger: 'blur' } ],
      }
    }
  },
  props: {
    isNavition: {
      type: Boolean,
      default: true,
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    tname: {
      type: String,
      default: '',
    },
  },
  mounted() {
    const {id} = this.$route.query
    this.getSearchListInit()
    if(id) {
      this.disc_no = id
      this.getInfo(id)
    }
    if(this.tname) {
      this.form.nm = this.tname
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editOrAddRequest()
        }
      });
    },
    // 校验编码是否重复
    checkRepeat() {
      this.isCheckRepeat()
    },
    isCheckRepeat(callback) {
      let dn = this.form.dn
      postAjax({
        url: GameTrophyCheck,
        data: {
          dn: dn
        },
      }).then(res=> {
        if(res.code === 1) {
          if(res.data.is_exist) {
            this.isCheckRepeatBool = false
            this.$message.warning('奖杯编码重复，请修改')
          }else {
            this.isCheckRepeatBool = true
            callback && callback()
          }
        }else {
          this.isCheckRepeatBool = false
        }
      })
    },
    // 编辑或者添加
    editOrAddRequest() {
      let url = GameTrophyNewSet, messageSuccess = '添加成功';
      if(this.disc_no) {
        url = GameTrophySet
        messageSuccess = '编辑成功'
      }
      if(!this.isCheckRepeatBool) return false
      postAjax({
        url: url,
        data: {
          ...this.form
        },
      }).then(res=>{
        if(res.code === 1) {
          this.$message.success(messageSuccess)
          if(this.isNavition) {
            this.$router.go(-1)
          }else {
            this.$emit('callback', this.form.dn)
          }
        }
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/detail/' + row.id,
        query: {type: 'detail'}
      })
    },
    stock(row) {
      this.$router.push({
        path: '/game/detail/' + row.id,
        query: {type: 'stock'}
      })
    },
    getInfo(id) {
      postAjax({
        url: GameTrophyInf,
        data: {
          dn: id
        }
      }).then(res=> {
        if(res.code === 1) {
          const info = res.data
          this.form = {
            dn: info.disc_no,
            nm: info.name,
            l: info.level || null,
            p: info.platinum || 1,
            g: info.gold,
            s: info.sliver,
            c: info.copper,
          }
          this.gameList = info.game_list || []
        }
      })
    },
    async getSearchListInit() {
      this.trophyLevelLst = await getStoreList(BaseTrophyLevelLst)
    },
  }
}
</script>

<style lang="scss">
.ta-form .el-form-item {
  margin-bottom: 18px;
}
</style>
<style lang="scss" scoped>
.ta-box {
  .ta-game-list {
    margin-bottom: 30px;
    .table-games {
      display: flex;
      &-l {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        >img {
          width: 100%;
        }
      }
      &-r {
        margin-left: 4px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .ta-header {
    height: 40px;
    line-height: 40px;
    background-color: #F8F8F8;
    color: #2C2C2C;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  
  .ta-form {
    width: 50%;
  }

  .ta-btns {
    height: 80px;
    margin-top: 20px;
    background-color: #FFF8CC;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>