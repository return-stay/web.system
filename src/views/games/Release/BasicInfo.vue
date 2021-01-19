<template>
  <div class="gb-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
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

        <el-form-item label="封面图：" prop="pass">
          <Upload :params="{id: id}" api="/game/cover.set" :url="cover" name="cover" />
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
              <el-select style="width: 100%;" v-model="form.company_id" size="small" placeholder="游戏公司名称可检索">
                <el-option v-for="item in gameCompanyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
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
            <el-form-item label="奖杯编码：" prop="disc_no">
              <el-input v-model="form.disc_no" size="small" placeholder="请输入奖杯编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="gr-title">运营相关</div>
      <div class="gd-cont gd-cont-o">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="所属系列：" prop="group_id">
              <el-select style="width: 100%;" v-model="form.group_id" size="small">
                <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="内容分类：" prop="type">
        <el-checkbox-group v-model="form.define_sort_array">
          <el-checkbox v-for="item in definesortList"  :key="item.id" :label="item.name" :value="item.id"></el-checkbox>
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
            <Uploads :params="{id: id}" url="/game/screenshot.set" name="screenshot" @success="successUpload" />
          </ul>
        </div>
      </el-form-item>

      <div class="gd-btns">
        <el-button @click="onSubmit">保存并预览</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import Uploads from '@/components/Upload/Uploads'
import PopImage from '@/components/PopImage'
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import {
  GameInfoSet,
  GameInfoDat, 
  GameScreenshotDel,
  BaseSortLst,
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseGameCompanyLst, } from '@/api/api'
import {postAjax,getAjax} from "@/utils/ajax"
import {
  getList,
  } from '@/utils/data'
import moment from 'moment'
import {dateToMs} from '@/utils'
export default {
  name: 'BasicInfo',
  components: { Upload, Uploads, PopImage },
  data() {
    return {
      id: '',
      cover: '',
      GameScreenshotDel: GameScreenshotDel,
      dialogImageUrl: '',
      dialogVisible: false,
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
        disc_no: "",
        keywords: "",
        group_id: null,
        define_sort_array: []
      },
      rules: {},
      screenshotList: [],
      sortList: [],
      areaList: [],
      languageList: [],
      platformList: [],
      definesortList: [],
      groupList: [],
      gameCompanyLst: [],
    }
  },
  mounted() {
    this.getSearchListInit()
    this.getGameInfo()
    
  },
  methods: {
    getGameInfo() {
      const id = this.$route.params.id
      this.id = id
      if(id) {
        postAjax({
          url: GameInfoDat,
          data:{
            id: id,
          },
        }).then(res=> {
          console.log(res)
          if(res.code === 1) {
            const resdata = res.data
            this.screenshotList = resdata.screenshot
            resdata.define_sort_array = resdata.define_sort_array ? resdata.define_sort_array.split(',') : []
            resdata.publish_time = new Date(moment(resdata.publish_time).format('YYYY-MM-DD'))
            console.log(resdata)
            this.cover = resdata.cover
            this.form = resdata
          }
        })
      }
    },
    successUpload() {
      // this.getGameInfo()
    },
    next() {
      this.$emit('next', '1')
    },
    onSubmit() {
      const params = this.form
      params.publish_time = dateToMs(params.publish_time)
      params.define_sort_array = params.define_sort_array.join(',')
      return 
      postAjax({
        url: GameInfoSet,
        data: {
          data: JSON.stringify(params)
        }
      }).then(res=> {
        console.log(res)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      this.groupList = await getList(BaseGroupLst)
      this.gameCompanyLst = await getList(BaseGameCompanyLst)
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
}
</style>