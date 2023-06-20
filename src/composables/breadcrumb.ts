import {reactive} from "vue";
import { useRouter} from 'vue-router';
import type {RouteLocationRaw} from 'vue-router';

type Breadcrumb = {
  link: string;
  name: string;
}

const breadcrumbs = reactive<Breadcrumb[]>([]);

export function useRouterWithBreadcrumbs() {
  const router = useRouter();

  const push = (route: RouteLocationRaw) => {
    router.push(route);
  }

  return {
    breadcrumbs,
    push,
  }
}
