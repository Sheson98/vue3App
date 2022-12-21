

<template>
  <el-card class="box-card"> 菜单权限管理 </el-card>
  <el-container>
    <el-aside>
      <el-card>
        <el-button text @click="outerVisible = true" type="primary">
          新增菜单
        </el-button>
      </el-card>
    </el-aside>
    <el-main>
      <el-dialog
        v-model="outerVisible"
        title="菜单权限"
        class="el-dialog"
        :show-close="false"
      >
        <span>路由信息</span>
        <el-form
          :model="form"
          label-width="150px"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="上级路由" prop="parentPath">
            <el-tree-select
              v-model="parentPath"
              :data="routerTree"
              :render-after-expand="false"
              :check-strictly="true"
            />
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input
              v-model="form.path"
              placeholder="必须以/开头"
              type="text"
              :validate-event="true"
            >
              <template #prepend>{{ parentPath }}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="路由名称" prop="name">
            <el-input v-model="form.name" placeholder="必须是英文" />
          </el-form-item>

          <el-divider />
          <span>菜单信息</span>
          <el-form-item label="图标">
            <el-input v-model="form.meta.icon" @focus.once="iconsDialog = true">
              <template #prefix>
                <el-icon>
                  <component :is="form.meta.icon"></component>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="form.meta.title" />
          </el-form-item>
          <el-form-item label="是否全屏显示">
            <el-switch v-model="form.meta.isFull" />
          </el-form-item>
          <el-form-item label="是否默认隐藏">
            <el-switch v-model="form.meta.isHide" />
          </el-form-item>
          <el-form-item label="跳转地址">
            <el-input v-model="form.meta.isLink" />
          </el-form-item>
          <el-form-item label="是否是业务菜单">
            <el-switch v-model="form.meta.isServiceRouter" />
          </el-form-item>
          <el-form-item label="是否启用keepAlive">
            <el-switch v-model="form.meta.isKeepAlive" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleSubmit(ruleFormRef)">
              提交
            </el-button>
            <el-button @click="outerVisible = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        v-model="iconsDialog"
        class="el-dialog-chooseicon"
        fullscreen
        :append-to-body="true"
        :show-close="false"
      >
        <iframe
          src="https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { reactive } from "vue";
import { Menu } from "@/api/interface";
import AuthStore from "@/stores/modules/auth";
import { debug } from "console";
import { Search } from "@element-plus/icons-vue";
import { computed } from "@vue/reactivity";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { addMenuApi } from "@/api/modules/Menu";
const ruleFormRef = ref<FormInstance>();
// do not use same name with ref
const form = reactive<Menu.MenuOptions>({
  path: "",
  name: "",
  meta: {
    icon: "",
    title: "",
    isLink: "", //跳转的地址
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: false,
    isServiceRouter: true,
  },
  children: [],
});

const authstore = AuthStore();
const routerTree = ref(authstore.routerTree);

const parentPath = ref("");
let outerVisible = ref(false);
const iconsDialog = ref(false);
onMounted(() => {

});
const rules = reactive<FormRules>({
  path: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error("请输入路径"));
        } else if (!/^[/]/.test(value)) {
          callback(new Error("路径名必须以/开头"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  name: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error("请输入路径名称"));
        } else if (!/^[a-z].*/g.test(value)) {
          callback(new Error("路径名必须字母开头"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  parentPath: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error("必须选择上级路由"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
watch(iconsDialog, (newValue, oldValue) => {
  if (!newValue) {
    const icontext = navigator.clipboard.readText();
    icontext.then((icontext) => {
      try {
        if (/^<el-icon><.*\/><\/el-icon>$/.test(icontext))
          form.meta.icon = icontext
            .replace("<el-icon><", "")
            .replace("/></el-icon>", "")
            .trim()
            .toLowerCase();
      } catch (e) {
        throw new Error("icon图标转换失败");
      }
    });
  }
});
watch(form.meta, (newValue, oldValue) => {
  if (newValue.icon == "") {
    iconsDialog.value = true;
  }
});

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      outerVisible.value = false;
      const msg = await addMenuApi(form);
      ElNotification({
        title: "",
        message: "菜单新增成功",
        type: "success",
        duration: 3000,
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="less" >
.el-dialog {
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  width: 30vw;
}
.el-dialog-chooseicon {
  .el-dialog__body {
    height: 100%;
  }
}

.el-dialog-chooseicon {
  position: absolute;
  left: 0;
  top: 0;
  width: 70vw;
}
</style>