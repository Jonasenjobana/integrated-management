import { Tab } from './layout/components/tab/tab.model';
import { HomeComponent } from "./layout/components/home/home.component";
import { ManualListComponent } from './manual/components/manual-list/manual-list.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
const DYNAMIC_COMPONENTS_LIST: Tab[] = [
    {
        title: '首页',
        key: 'home',
        component: HomeComponent,
    },
    {
        title: '手册管理',
        key: 'manual-list',
        component: ManualListComponent,
    },
    {
        title: '产品列表',
        key: 'product-list',
        component: ProductListComponent,
    }
]
const INIT_TABS:Tab[] = [
    // {
    //     title: '首页',
    //     key: 'home',
    //     component: HomeComponent,
    //     disclosable: true
    // },
    {
        title: '产品列表',
        key: 'product-list',
        component: ProductListComponent,
        disclosable: true
    }
]
export {DYNAMIC_COMPONENTS_LIST,INIT_TABS}