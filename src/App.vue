<script setup lang="ts">
import { RouterView } from 'vue-router'
import {useBreadcrumbStore} from "@/store/useBreadcrumbStore";

const breadcrumbStore = useBreadcrumbStore()
</script>

<template>
  <div>
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/about">关于</RouterLink>
  </div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbStore.breadcrumbs" :key="item.name" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
  <RouterView />
</template>
