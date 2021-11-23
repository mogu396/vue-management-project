<template>
  <div class="acount">
    <div>
      <el-form :inline="true" ref="addData">
        <el-form-item label="时间筛选:">
          <el-date-picker
            v-model="searchData.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="searchData.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-folder-add"
            @click="handleAdd"
            style="font-size: 16px"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="tableDataToShow"
        style="width: 100%"
        max-height="600"
        border
        v-if="tableDataToShow.length > 0"
      >
        <el-table-column type="index" label="序号" align="center" width="70">
        </el-table-column>
        <el-table-column label="类型" width="150" prop="type" align="center">
        </el-table-column>
        <el-table-column label="收入" width="150" prop="income" align="center">
          <template slot-scope="scope">
            <span style="color: #00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="消费" width="150" prop="expend" align="center">
          <template slot-scope="scope">
            <span style="color: #f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总金额"
          width="150"
          prop="AcountCash"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.AcountCash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          width="200"
          prop="acountDescrition"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="220"
          prop="date"
          align="center"
        >
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150" prop="remark" align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          label="操作"
          fixed="right"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹出层 -->
    <Dialog :dialog="dialog" :formData="formData" @update="getAcount"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog.vue";
export default {
  name: "AcountManage",
  components: {
    Dialog,
  },
  data() {
    return {
      filterTableData: {},
      searchData: {
        startTime: "",
        endTime: "",
      },
      tableData: {},
      // 分页需要展示的数据
      tableDataToShow: {},
      dialog: {
        show: false,
        title: "",
        option: "edit",
      },
      formData: {
        type: "",
        acountDescrition: "",
        income: "",
        expend: "",
        AcountCash: "",
        remark: "",
        id: "",
      },
      paginations: {
        page_index: 1, // 当前页
        total: 0,
        page_size: 5, // 一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 组件布局
      },
    };
  },
  methods: {
    getAcount() {
      this.$axios("/api/acounts")
        .then((res) => {
          this.tableData = res.data;
          this.filterTableData = res.data;
          // 设置分页信息
          this.setPagination();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setPagination() {
      // 总数
      this.paginations.total = this.tableData.length;
      // 当前页数
      this.paginations.pageIndex = 1;
      // 一页显示
      this.paginations.pageSize = 5;
      // 设置默认分页数据
      this.tableDataToShow = this.tableData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    handleEdit(row) {
      this.dialog = {
        show: true,
        title: "修改信息",
        option: "edit",
      };
      this.formData = {
        type: row.type,
        acountDescrition: row.acountDescrition,
        income: row.income,
        expend: row.expend,
        AcountCash: row.AcountCash,
        remark: row.remark,
        id: row._id,
      };
      console.log(this.formData);
    },
    handleDelete(row) {
      this.$axios
        .delete(`/api/acounts/delete/${row._id}`)
        .then(() => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getAcount();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加信息",
        option: "add",
      };
      this.formData = {
        type: "",
        acountDescrition: "",
        income: "",
        expend: "",
        AcountCash: "",
        remark: "",
        id: "",
      };
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableDataToShow = this.tableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.tableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableDataToShow = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSearch() {
      if (!this.searchData.startTime || !this.searchData.endTime) {
        this.$message({
          type: "warning",
          message: "请选择正确的时间区间",
        });
        this.getAcount();
        return;
      }
      const startTime = this.searchData.startTime.getTime();
      const endTime = this.searchData.endTime.getTime();
      this.allTableData = this.filterTableData.filter((item) => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= startTime && time <= endTime;
      });
      // 分页数据
      this.setPaginations();
    },
    created() {
      this.getAcount();
      console.log(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.acount {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  margin-top: 10px;
  float: right;
}
</style>