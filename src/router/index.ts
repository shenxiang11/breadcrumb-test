import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '@/views/ListView.vue'
import EditView from '@/views/EditView.vue'
import {useBreadcrumbStore} from "@/store/useBreadcrumbStore";
import DetailView from "@/views/DetailView.vue";
import _ from "lodash";
import ForthView from "@/views/ForthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      meta: {
        title: '列表'
      },
      component: ListView
    },
    {
      path: '/detail',
      name: 'detail',
      meta: {
        title: '详情',
      },
      component: DetailView
    },
    {
      path: '/forth',
      name: 'forth',
      meta: {
        title: '第四级页面',
      },
      component: ForthView
    },
    {
      path: '/edit',
      name: 'edit',
      meta: {
        title: '编辑'
      },
      component: EditView
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于'
      },
      component: () => import('../views/AboutView.vue')
    }
  ]
})

const breadcrumbsStruct = [
  {
    name: 'home',
    children: [
      {
        name: 'list',
        children: [
          {
            name: 'edit'
          },
          {
            name: 'detail',
            children: [
              {
                name: 'forth',
              },
            ],
          }
        ]
      }
    ]
  },
  {
    name: 'about'
  }
]


router.afterEach((to) => {
  const target = to.name;

  const data: string[] = []
  let finalData = data;

  function dfs(arr: any[]) { // 在 breadcrumbsStruct 查找 target，且记录下树上的路径
    if (!arr || !arr.length) {
      return;
    }
    for (let i=0; i<arr.length; i++) {
      const item = arr[i];
      data.push(item.name);
      if (item.name === target) {
        finalData = _.cloneDeep(data);
        break;
      }
      // 向深一级查找，查不到应该回溯
      dfs(item.children);
      data.pop();
    }
  }

  dfs(breadcrumbsStruct);

  const routeList = router.getRoutes();
  const routeInfoList = finalData.map(item => {
      const info = routeList.find(r => r.name === item);
      if (info) {
        return info;
      } else {
        console.error('构建路径失败');
      }
  });

  const store = useBreadcrumbStore();
  store.setBreadcrumbs(routeInfoList);
})

export default router
