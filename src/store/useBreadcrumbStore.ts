import {defineStore} from "pinia";
import {ref} from "vue";

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbs = ref<any>([])
  function setBreadcrumbs(bc: any) {
    breadcrumbs.value = bc
  }

  return { breadcrumbs, setBreadcrumbs }
});
