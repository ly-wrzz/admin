<template>
  <div class="app-container">
    <!-- 查询 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keyword" placeholder="昵称/电话" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border style="width: 100%;">
      <el-table-column label="ID" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="120">
        <template slot-scope="{row}">
          <img :src="row.headimgurl" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="粉丝" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fans }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fans }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接龙数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fans }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button v-if="row.is_white==1" type="primary" size="mini" @click="handleUpdate(row)">
            设为白名单
          </el-button>
          <el-button v-else type="info" size="mini" @click="handleUpdate(row)">
            取消白名单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { whiteList, changeWhite } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'UserIndex',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
        is_ly: 1
      }
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'UserWhite') {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      whiteList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleUpdate(row) {
      var data = {
        ids: row.id,
        is_white: 1,
        url: 'http://192.168.0.112:9527/#/user/index'
      }
      changeWhite(data).then(res => {
        var list = this.list
        list.forEach((item, index) => {
          if (item.id === row.id) {
            this.list.splice(index, 1)
          }
        })
      })
    }
  }
}
</script>

<style>
  body .el-table th.gutter{
      display: table-cell!important;
  }
  .head_pic{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
