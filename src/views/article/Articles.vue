<template>
  <lay-table
      id="id"
      :max-height="maxHeight5"
      :columns="columns5"
      :expand-index="1"
      :data-source="dataSource5"
      :checkbox="checkbox5" :page="page5"
      :default-toolbar="defaultToolbar5"
      :resize="true"
      :autoColsWidth="true"
      v-model:selected-keys="selectedKeys5"
      @row="rowClick5"
      @change="change555">
    <template v-slot:toolbar>
      <lay-button size="sm" type="primary"><router-link to="/articles/add">新增</router-link></lay-button>
      <lay-button size="sm">删除</lay-button>
    </template>
    <template v-slot:name="{ row, column, rowIndex, columnIndex }"> {{ row.name }} </template>
    <template v-slot:name-title>😊</template>
    <template v-slot:operator="{ row }">
      <lay-button size="xs">修改</lay-button>
      <lay-button size="xs" type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref, watch } from 'vue'
import Base from '@/views/public/Base.vue'
export default {
  extends: Base,
  setup() {

    const selectedKeys5 = ref(['1'])
    const checkbox5 = ref(true)
    const defaultToolbar5 = ref(['export','print','filter'])
    const maxHeight5 = ref('600px');

    const page5 = {
      total: 100,
      limit: 10,
      current: 1
    }

    const columns5 = ref([]);

    const change555 = function(page) {
      console.log(JSON.stringify(page));
    }

    setTimeout(() => {
      columns5.value = [
      {
        title: "序号",
        fixed: "left",
        type: "number",
        width: "50px",
      },
      {
        title:"姓名",
        titleSlot: "name-title",
        customSlot:"name",
        key:"name",
      },
      {
        title:"年龄",
        key:"age",
        ellipsisTooltip: true,
      },
      {
        title:"备注",
        key:"remark",
        ellipsisTooltip: true,
      }
      ,{
        title:"操作",
        width:"150px",
        fixed:"right",
        customSlot:"operator",
        key:"operator"
      }
    ]
    }, 100)

    const dataSource5 = [
      {id:"1", name:"小明", age:"18",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"2", name:"小红", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"3", name:"小刚", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"4", name:"小李", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"5", name:"小柏", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"6", name:"小吉", age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'}
    ]

    const rowClick5 = function(data) {
      console.log(JSON.stringify(data))
    }

    const rowDoubleClick5 = function(data) {
      console.log(JSON.stringify(data))
    }

    watch(selectedKeys5, () => {
      console.log("复选框监听:" + selectedKeys5.value);
    })

    return {
      columns5,
      dataSource5,
      selectedKeys5,
      checkbox5,
      defaultToolbar5,
      rowClick5,
      rowDoubleClick5,
      page5,
      change555
    }
  }
}
</script>
