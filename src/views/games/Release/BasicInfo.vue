<template>
  <div class="gb-box">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="gr-title">基本信息</div>
      <div class="gd-cont">
        <el-form-item label="显示名称：" prop="view_name">
          <el-input v-model="form.view_name" size="small" placeholder="前台显示的游戏名称，请使用中文"></el-input>
        </el-form-item>
        <el-form-item label="原始名称：" prop="original_name">
          <el-input v-model="form.original_name" size="small" placeholder="仅在后台显示，可以用英文、日文或繁体等"></el-input>
        </el-form-item>
        <el-form-item label="显示简介：" prop="intro">
          <el-input v-model="form.intro"  type="textarea" size="small" placeholder="前台显示游戏描述，最好不要超过200汉字"></el-input>
        </el-form-item>

        <el-form-item label="封面图：">
          <UploadImage :imageUrl="cover" :isNeedId="true" :params="{id: id}" name="cover"  @change="coverChange" />
        </el-form-item>
      </div>

      <div class="gr-title">发行信息</div>

      <div class="gd-cont gd-cont-o">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="平台：" prop="platform_id">
              <el-select style="width: 100%;" v-model="form.platform_id" size="small" placeholder="请选择平台">
                <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="游戏类型：" prop="sort_id">
              <el-select style="width: 100%;" v-model="form.sort_id" size="small" placeholder="请选择游戏类型">
                <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="区域版本：" prop="area_id">
              <el-select style="width: 100%;" v-model="form.area_id" size="small" placeholder="请选择区域版本">
                <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="语言：" prop="language_id">
              <el-select style="width: 100%;" v-model="form.language_id" size="small" placeholder="请选择语言">
                <el-option v-for="item in languageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="开发公司：" prop="company_id">
              <el-select style="width: 100%;" filterable v-model="form.company_id" size="small" placeholder="游戏公司名称可检索">
                <el-option v-for="item in gameCompanyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div class="item-add" @click="addCompany">
              <i style="font-size: 20px;" class="el-icon-circle-plus-outline"></i>
              <el-link :underline="false">添加开发公司</el-link>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="发行日期：" prop="publish_time">
              <el-date-picker
                style="width: 100%;"
                v-model="form.publish_time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="奖杯编码：" prop="disn_nos">
              <el-cascader
                  :value="disn_nos"
                  @change="cascaderChange"
                  style="width: 100%;"
                  placeholder="搜索"
                  :options="trophyLst"
                  :props="{ multiple: true, value: 'disc_no', label: 'disc_no' }"
                  filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div class="item-add" @click="addThophy">
              <i style="font-size: 20px;" class="el-icon-circle-plus-outline"></i>
              <el-link :underline="false">添加奖杯编码</el-link>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="gr-title">运营相关</div>
      <div class="gd-cont gd-cont-o">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="所属系列：" prop="group_id">
              <el-select style="width: 100%;" filterable placeholder="请输入所属系列" v-model="form.group_id" size="small">
                <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div class="item-add" @click="addGroup">
              <i style="font-size: 20px;" class="el-icon-circle-plus-outline"></i>
              <el-link :underline="false">添加所属系列</el-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="内容分类：">
        <el-checkbox-group v-model="defineSortArray" placeholder="请输入类容分类" @change="defineSortChange">
          <el-checkbox v-for="item in definesortList"  :key="item.id" :label="item.id" :value="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="gd-cont">
        <el-form-item label="关键词：" prop="keywords">
          <el-input v-model="form.keywords" type="textarea" size="small" placeholder="前台显示游戏描述，最好不要超过200汉字"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="游戏截图：">
        <!-- <Upload :params="{id: id}" url="/game/screenshot.set" name="screenshot" /> -->
        <div class="screenshot-box">
          <ul>
            <li v-for="item in screenshotList" :key="item.id">
              <PopImage :src="item.preview_url" :deleteUrl="GameScreenshotDel" :deleteData="{ssid: item.id,id: id}" :l_src="item.original_url" @callback="deleteImageCallback" />
            </li>
            <Uploads :params="{id: id}" url="/game/screenshot.set" name="screenshot" @change="successUpload" />
          </ul>
        </div>
      </el-form-item>

      <div class="gd-btns">
        <el-button @click="onSubmit('form')">保存并预览</el-button>
        <el-button type="primary" v-if="isNext" @click="next('form')">下一步</el-button>
        <el-button type="primary" v-else @click="save('form')">保存</el-button>
      </div>
    </el-form>

    <GamePreview v-if="isGamePreview" ref="gamePreview" :id="id" @hide="previewHide" />

    <AddCompany ref="addcompany" @addCallback="addCallback" />
    <AddTrophy ref="addTrophy" @addCallback="addCallback" />
    <AddGameSeries ref="addSeries" @addCallback="addCallback" />
  </div>
</template>

<script>
import UploadImage from '@/components/Upload'
import Uploads from '@/components/Upload/Uploads'
import PopImage from '@/components/PopImage'
import AddCompany from './AddCompany'
import AddTrophy from './AddTrophy'
import AddGameSeries from './AddSeries'
import {
  GameInfoSet,
  GameInfoDat, 
  GameScreenshotDel,
  GameScreenshotSet,
  BaseSortLst,
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseGameCompanyLst,
  GameDefinesortsSet,
  BaseTrophyLst,
  GameCoverSet,
  IMG_URL
   } from '@/api/api'
import ajax from '@/utils/request'
import { postAjax, fdAjax } from "@/utils/ajax"
import { getList } from '@/utils/data'
import moment from 'moment'
import { dateToMs } from '@/utils'
import GamePreview from '../GamePreview'

export default {
  name: 'BasicInfo',
  components: { UploadImage, Uploads, PopImage, GamePreview, AddCompany, AddTrophy, AddGameSeries },
  data() {
    return {
      IMG_URL,
      id: null,
      cover: '',
      coverFile: null,
      GameScreenshotDel: GameScreenshotDel,
      isGamePreview: false,
      disnNoList: [],
      disn_nos: '',
      form: {
        view_name: "",
        original_name: "",
        intro: "",
        platform_id: null,
        sort_id: null,
        area_id: null,
        language_id: null,
        company_id: null,
        publish_time: null,
        keywords: "",
        group_id: null,
      },
      rules: {
        view_name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
        original_name: [{ required: true, message: '请输入原始名称', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入游戏简介', trigger: 'blur' }],
        platform_id: [{ required: true, message: '请选择所属平台', trigger: 'change' }],
        sort_id: [{required: true,message: '请选择游戏类型', trigger: 'change'}],
        area_id: [{required: true,message: '请选择区域版本', trigger: 'change'}],
        language_id: [{required: true,message: '请选择语言', trigger: 'change'}],
        company_id: [{required: true,message: '请选择开发公司', trigger: 'change'}],
        publish_time: [{required: true,message: '请选择发行日期', trigger: 'blur'}],
      },
      defineSortArray: [],
      screenshotList: [],
      sortList: [],
      areaList: [],
      languageList: [],
      platformList: [],
      definesortList: [],
      groupList: [],
      gameCompanyLst: [],
      discList: [],
      trophyLst: [],
    }
  },
  props: {
    isNext: {
      type: Boolean,
      default: true,
    },
    gameInfo: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.getSearchListInit()
    const id = this.$route.params.id
    if(id) {
      this.id = id
      this.getGameInfo()
    }
  },
  methods: {
    getGameInfo() {
      const resdata = this.gameInfo
      console.log(resdata)
      this.screenshotList = resdata.screenshot || []
      resdata.publish_time = new Date(moment(resdata.publish_time).format('YYYY-MM-DD'))
      this.cover = resdata.cover + '?t=' + new Date().getTime()

      let discNos = null
      if(resdata.disc_no) {
        let arr = resdata.disc_no.split('-')
        let newarr = arr.map(item=> [item])
        discNos = newarr
      }
      
      this.form = {
        view_name: resdata.view_name,
        original_name: resdata.original_name,
        intro: resdata.intro,
        platform_id: resdata.platform_id,
        sort_id: resdata.sort_id,
        area_id: resdata.area_id,
        language_id: resdata.language_id,
        company_id: resdata.company_id,
        publish_time: resdata.publish_time,
        keywords: resdata.key_word,
        group_id: resdata.group_id,
      }
      this.disn_nos = discNos
      let arr = resdata.define_sort ? resdata.define_sort.map(item => item.id): []
      this.defineSortArray = arr
    },
    defineSortChange(e) {
      this.defineSortArray = e
    },
    // 判断是否有ID
    isId() {
      const id = this.id
      if(id) {
        return true
      }else {
        this.$message.warning('请先添加游戏')
        return false
      }
    },

    successUpload(file) {
      console.log(file)
      // this.getGameInfo()
      if(this.isId()) {
        const id = this.id
        let fd = new FormData()
        fd.append('id', id)
        fd.append('screenshot', file.raw)
        fdAjax({
          url: GameScreenshotSet,
          data: {
            id,
            screenshot: file.raw
          }
        }).then(res=> {
          console.log(res)
        })
      }
      
    },
    coverChange(file) {
      this.coverFile = file.raw
    },
    coverRequest(id) {
      let fd = new FormData()
      fd.append('id', id)
      fd.append('cover', this.coverFile)
      ajax({
        method: 'post',
        formdata: true,
        url: GameCoverSet,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data', // 关键
        },
      }).then(res=> {
        console.log('封面上传成功')
        console.log(res)
      })
    },
    // 添加或者编辑请求
    addOrEidtRequest (callback, toast = true) {
      const params = this.form
      params.publish_time = dateToMs(params.publish_time)
      if(this.disn_nos) {
        params.disn_no = this.disn_nos.join('-')
      }
      const id = this.$route.params.id || this.id
      let successText = '添加成功'
      if(id) {
        params.id = id
        successText = '编辑成功'
      }
      console.log(params)
      postAjax({
        url: GameInfoSet,
        data: {
          data: JSON.stringify(params)
        }
      }).then(async res=> {
        if(res.code === 1) {
          let gid = res.data.id
          this.id = gid
          await this.setDefineSort()
          if(this.coverFile) {
            await this.coverRequest(gid)
          }
          if(toast) {
            this.$message.success(successText)
          }
          callback&&callback(res.data)
        }
      })
    },
    formNameValidate(formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback && callback()
        } else {
          return false;
        }
      })
    },
    next(formName) {
      this.formNameValidate(formName, () => {
        this.addOrEidtRequest((res) => {
          this.$emit('next', '1', res.id)
        })
      })
    },
    onSubmit(formName) {
      this.formNameValidate(formName, () => {
        this.addOrEidtRequest(() => {
          console.log('看效果')
          this.preview()
        }, false)
      })
    },
    save(formName) {
      this.formNameValidate(formName, () => {
        this.addOrEidtRequest()
      })
    },
    cascaderChange(e) {
      console.log(e)
      this.disn_nos = e
    },
    previewHide() {
      this.isGamePreview = false
    },
    // 预览
    preview() {
      this.isGamePreview = true
      setTimeout(() => {
        this.$refs.gamePreview.show()
      }, 0);
    },
    deleteImageCallback() {
      this.getGameInfo()
    },
    async getSearchListInit() {
      this.sortList = await getList(BaseSortLst)
      this.areaList =  await getList(BaseAreaLst)
      this.languageList = await getList(BaseLanguageLst)
      this.platformList = await getList(BasePlatformLst)
      this.definesortList = await getList(BaseDefinesortLst)
      this.getGroupList()
      this.getCompanylist()
      this.getTrophyLst()
    },
    async getCompanylist () {
      this.gameCompanyLst = await getList(BaseGameCompanyLst)
    },

    async getGroupList() {
      this.groupList = await getList(BaseGroupLst)
    },
    
    async getTrophyLst() {
      this.trophyLst = await getList(BaseTrophyLst)
    },
    // 设置改游戏的分类内容
    setDefineSort() {
      const defineSortArray = this.defineSortArray
      if(defineSortArray.length>0) {
        this.setDefineSortRequest(defineSortArray)
      }
    },
    // 设置改游戏的分类内容 发送请求
    setDefineSortRequest(dids = []) {
      const id = this.$route.params.id || this.id
      if(id) {
        postAjax({
          url: GameDefinesortsSet,
          data: {
            id: id,
            dss: dids.join(','),
          }
        }).then(res=> {
          console.log('分类修改成功')
          console.log(res)
        })
      }
    },
    // 快速添加公司
    addCompany() {
      this.$refs.addcompany.show()
    },
    addThophy() {
      this.$refs.addTrophy.show({
        tname: this.form.view_name
      })
    },
    addGroup() {
      this.$refs.addSeries.show()
    },
    addCallback(row) {
      console.log(row)
      switch(row.type) {
        case "trophy": //奖杯码
          this.getTrophyLst()
          this.disn_nos = row.id
          break;
        case "company": //开发公司
          this.getCompanylist()
          this.form.company_id = row.id
          break;
        case "series": //所属系列
          this.getGroupList()
          this.form.group_id = row.id
          break;
        default:

      }
    },
  }
}
</script>


<style lang="scss">
@import './index.scss';
</style>
<style lang="scss" scoped>
.gb-box {
  .gd-cont {
    width: 60%;
  }
  .gd-cont-o {
    width: 65%;
  }
  .screenshot-box {
    ul {
      display: flex;
      flex-wrap: wrap;
      >li {
        margin-right: 10px;
        margin-bottom: 10px;
        width: 100px;
        height: 100px;
        flex-shrink: 0;
      }
    }
  }
  .item-add {
    height: 35px;
    width: 110px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #ccc;
    cursor: pointer;
    margin-left: 10px;
  }
  .item-add:hover{
    color: #409eff;
  }
}
</style>