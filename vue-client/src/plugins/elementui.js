import Vue from 'vue'
import {
  Button,
  Card,
  Input,
  Table,
  TableColumn,
  Dialog,
  Form,
  FormItem,
  Message,
  MessageBox,
  TabPane,
  Tabs,
  Tag,
  Icon,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col
} from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox