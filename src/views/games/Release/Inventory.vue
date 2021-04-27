<template>
  <div class="gi-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">


      <div v-if="otherList.length>0" style="margin-bottom: 20px;">
        <div class="gr-title">已有游戏盘</div>

        <el-table
          :data="otherList"
          ref="multipleTable"
          style="width: 100%">
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <el-table-column
            prop="serial"
            align="center"
            label="盘编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop=""
            align="center"
            label="游戏">
            <template slot-scope="{row}">
              <div class="table-games" v-if="gameInfo && gameInfo.id">
                <div class="table-games-l">
                  <ImageLarger :src="gameInfo.cover" imgstyle="height: 50px;" />
                </div>
                <div class="table-games-r">
                  <p>{{gameInfo.platform_name}}  {{gameInfo.name}}</p>
                  <p>{{gameInfo.area_name}}  {{gameInfo.language_name}}</p>
                </div>
              </div>
              <!-- <div class="table-games" v-if="pGameInfo && pGameInfo.id">
                <div class="table-games-l">
                  <ImageLarger :src="pGameInfo.cover" imgstyle="height: 50px;" />
                </div>
                <div class="table-games-r">
                  <p>{{pGameInfo.platform_name}}  {{pGameInfo.view_name}}</p>
                  <p>{{pGameInfo.area_name}}  {{pGameInfo.language_name}}</p>
                </div>
              </div> -->
              <div class="table-games" v-if="row.id">
                <div class="table-games-l">
                  <ImageLarger :src="row.cover" imgstyle="height: 50px;" />
                </div>
                <div class="table-games-r">
                  <p>{{row.platform_name}}  {{row.name}}</p>
                  <p>{{row.area_name}}  {{row.language_name}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="disc_no"
            align="center"
            label="奖杯编号">
          </el-table-column>
          <el-table-column
            prop="shelves"
            align="center"
            label="货架号">
          </el-table-column>
          <el-table-column
            prop="cost"
            align="center"
            label="成本价">
            <template slot-scope="{row}">
              <span>{{Number(((row.cost/100).toFixed(2)))}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="memo"
            align="center"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="create_time"
            align="center"
            label="创建时间">
            <template slot-scope="{row}">
              <span>{{moment(row.create_time).format('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            align="center"
            label="操作"
            width='100'>
            <template slot-scope="{row}">
              <span class="text-cursor" @click="goInventoryInfo(row)">详情</span>
            </template>
          </el-table-column>

        </el-table>

      </div>
      <div class="gr-title" v-if="title">{{title}}</div>

      <div class="gd-cont">
        <el-form-item label="选择游戏：" prop="gid">
          <el-select style="width: 100%;" v-model="form.gid" :disabled="isGameDisabled" filterable size="small" placeholder="请选择游戏">
            <el-option v-for="item in gamelist" :key="item.id" :label="item.detailinfo" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="盘号：" prop="sn">
              <el-input v-model="form.sn" size="small" :disabled="isGameDisabled" @blur="checkCartridgeNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='24'>
            <el-form-item label="成本价：" prop="c">
              <el-input-number v-model="form.c" :min="0" :max="500" controls-position="right" :precision="2" :step="1" size="small">
              </el-input-number>
              <span style="color: #000;border:none;padding: 10px;">元</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="货架号：" prop="sf">
              <el-input v-model="form.sf" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注：" prop="mm">
          <el-input v-model="form.mm"  type="textarea" size="small" placeholder="可以为空"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'edit'" label="状态：" prop="st">
          <el-select v-model="form.st" size="small" :disabled="[1,3,4].indexOf(form.st) < 0">
            <el-option v-for="item in getStatsList" :key="item.value" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="gd-btns">
        <template v-if="btns.isnext">
          <el-button @click="submitCallback('form', 'continue')">保存并继续添加</el-button>
          <el-button type="primary" @click="next('form')">下一步</el-button>
        </template>
        <template v-if="btns.add">
          <el-button @click="submitCallback('form', 'continue')">保存并继续添加</el-button>
        </template>
        <template v-if="btns.issave">
          <el-button type="primary" @click="submitCallback('form', 'saveedit')">保存修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </template>
        <template v-if="btns.isconfirm">
          <el-button type="primary" @click="submitCallback('form', 'addconfim')">确定增加库存</el-button>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
import {postList, getStoreList} from "@/utils/data"
import { GameMiniLst, DiscInfoSet, DiscInfoDat, DiscListDat,BaseDiscStateLst, DiscInfoCheck } from '@/api/api'
import { getAjax, postAjax } from '@/utils/ajax'
import  ImageLarger from '@/components/ImageLarger'
import moment from 'moment'
export default {
  name: 'Inventory',
  components: {ImageLarger},
  props: {
    title: {
      type: String,
      default: '添加游戏盘'
    },
    btns: {
      type: Object,
      default: () => ({
          isnext: true,
          fnName: ''
      })
    },
    pid: {
      type: String | Number,
      default: '',
    },
    pGameInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      moment,
      type: 'add',
      isGameDisabled: false,
      isCheckRepeatBool: true, //盘号是否重复
      gamelist: [],
      gameInfo: {},
      otherList: [], //其他游戏盘列表
      statsList: [], //盘的状态列表
      paramsid: '',
      gameid: null, //游戏ID
      iid: null, //游戏盘的ID
      form: {
        gid: null,
        sn: '',
        c: '',
        sf: '',
        mm: '',
        st: 1,
      },
      rules: {
        gid: [{ required: true, message: '请选择游戏', trigger: 'change' }],
        sn: [{ required: true, message: '请输入盘号', trigger: 'blur' }],
        c: [{ required: true, message: '请输入成本价', trigger: 'blur' }],
        sf: [{ required: true, message: '请输入货架号', trigger: 'blur' }],
      },
    }
  },
  computed: {
    getStatsList() {
      let st = this.form.st
      let statusList = this.statsList
      let list = []
      if([1,3,9].indexOf(st) > -1) {
        for(let i = 0;i<statusList.length;i++) {
          let v = statusList[i].value
          if([1,3,9].indexOf(v) > -1) {
            list.push(statusList[i])
          }
        }
      }else {
        list = statusList
      }
      return list
    },
  },
  mounted() {
    this.getGameList()
    this.judgeScene()
  },
  methods: {
    // 判断页面的存在环境， 游戏详情还是游戏盘详情
    judgeScene () {
      const id = this.$route.params.id
      // 游戏盘详情
      if(this.$route.path.indexOf('game/inventory/edit')>-1) {
        this.type = 'edit'
        this.iid = Number(id) || null
        this.getStatusList()
        const {serial} = this.$route.query
        if(serial) {
          this.getDiscInfo(id)
        }
        this.isGameDisabled = true
      }
      // 游戏详情
      if(this.$route.path.indexOf('/game/detail')>-1) {
        this.form.gid = Number(id) || null
        this.gameid = id
        this.getDiscList(id)
        this.isGameDisabled = true
      }
      // 发布游戏
      if(this.$route.path.indexOf('/game/release')>-1) {
        if(this.pid) {
          this.form.gid = this.pid
          this.gameid = this.pid
        }
        this.isGameDisabled = true
      }
    },
    // 获取盘编号列表
    getStatusList() {
      getAjax({
        url: BaseDiscStateLst,
      }).then(res=> {
        if(res.code === 1) {
          let list = res.data
          this.statsList = list
        }
      })
    },
    async getGameList () {
      let r = await getStoreList(GameMiniLst)
      for(let i = 0;i<r.length;i++) {
        r[i].detailinfo = `${r[i].platform_name} | ${r[i].view_name} | ${r[i].area_name} ${r[i].language_name}`
      }
      this.gamelist = r
    },
    // 游戏盘详情
    getDiscInfo(id) {
      postAjax({
        url: DiscInfoDat,
        data: {
          id: id
        }
      }).then(res=> {
        const resdata = res.data
        const {source} = this.$route.query
        if(source === 'price') {
          this.form = {
            gid: resdata.game_id,
          }
          this.otherList = resdata.other_list
        }else {
          this.form = {
            gid: resdata.game_id,
            sn: resdata.serial,
            c: Number((resdata.cost/100).toFixed(2)),
            sf: resdata.shelves,
            mm: resdata.memo,
            st: resdata.status,
          }
        }
        this.gameid = resdata.game_id
        this.gameInfo = resdata.game_info
      })
    },
    next(formName) {
      if(this.otherList.length>0) {
        if(this.form.sn && this.form.sf) {
          this.addRequest(() => {
            this.$emit('next', '2', this.pid)
          })
        }else {
          this.$emit('next', '2', this.pid)
        }
      }else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addRequest(() => {
              this.$emit('next', '2', this.pid)
            })
          } else {
            return false;
          }
        })
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    addRequest(callback) {
      if(!this.isCheckRepeatBool) return this.$message.warning('奖杯编码重复，请修改')
      const iid = this.iid
      let params = JSON.parse(JSON.stringify(this.form)), successtext = '添加成功'
      if(iid) {
        params.id = iid
        successtext = '保存成功'
      }
      if(!params.st) {
        delete params.st
      }
      if(params.c) {
        params.c = params.c * 100
      }
      postAjax({
        url: DiscInfoSet,
        data: params
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success(successtext)
          callback&&callback()
        }
      })
    },
    submitCallback(formName, type) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.addRequest(() => {
            console.log(type)
            if(type ==='continue' || type === 'addconfim') {
              const id = this.gameid
              that.$refs[formName].resetFields();
              this.form.gid = Number(id) || null
              that.gameListAddInventory()
            }
          })
        } else {
          return false;
        }
      })
    },

    // 游戏列表进入的添加游戏
    gameListAddInventory() {
      let routerPath = this.$route.path
      if(routerPath.indexOf('/game/detail')>-1 || routerPath.indexOf('/game/release') > -1) {
        const id = this.gameid
        this.getDiscList(id)
        this.isGameDisabled = true
      }
    },
    
    // 通过游戏ID获取该游戏的盘列表
    getDiscList (id) {
      postAjax({
        url: DiscListDat,
        data: {
          page: 1,
          gid: id
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.otherList = res.data.list || []
        }
      })
    },
    // 去往盘详情
    goInventoryInfo(row) {
      this.$router.push({
        path: '/game/inventory/edit/' + row.id,
        query: {serial: row.serial}
      })
    },
    // 校验盘编号是否重复
    checkCartridgeNumber() {
      this.isCheckRepeat()
    },
    isCheckRepeat(callback) {
      let sn = this.form.sn
      postAjax({
        url: DiscInfoCheck,
        data: {
          sn: sn
        },
      }).then(res=> {
        if(res.code === 1) {
          if(res.data.is_exist) {
            this.isCheckRepeatBool = false
            this.$message.warning('盘号重复，请修改')
          }else {
            this.isCheckRepeatBool = true
            callback && callback()
          }
        }else {
          this.isCheckRepeatBool = false
        }
      })
    },
  }
}
</script>


<style lang="scss">
@import './index.scss';
</style>
<style lang="scss" scoped>
.gi-box {
  .gd-cont {
    width: 60%;
  }
  .gd-cont-o {
    width: 65%;
  }

  .table-games {
    display: flex;
    &-l {
      margin-right: 10px;
    }
  }
  
}
</style>