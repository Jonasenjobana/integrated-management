import { TtComponent } from './tt/tt/tt.component';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { ManualCreateComponent } from './manual/components/manual-create/manual-create.component';
import { Tab } from './layout/components/tab/Tab.model';
import { HomeComponent } from "./layout/components/home/home.component";
import { ManualListComponent } from './manual/components/manual-list/manual-list.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { ManualDetailComponent } from './manual/components/manual-detail/manual-detail.component';
import { ThreeComponent } from './three/three/three.component';
import { DemoComponent } from './demo/demo.component';
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
    },
    {
        title: '手册详细',
        key: 'manual-detail',
        component: ManualDetailComponent,
    },
    {
        title: '产品详情',
        key: 'product-detail',
        component: ManualDetailComponent,
    },
    {
        title: '新增手册',
        key: 'manual-create',
        component: ManualCreateComponent
    },
    {
        title: '编辑手册',
        key: 'manual-edit',
        component: ManualCreateComponent
    },
    {
        title: '产品入库',
        key: 'product-instock',
        component: ProductCreateComponent
    },
    {
        title: '入库编辑',
        key: 'instock-edit',
        component: ProductCreateComponent
    },
    {
        title: 'leaf-let地图',
        key: 'leaflet',
        component: TtComponent
    },
    {
        title: 'three demo',
        key: 'three',
        component: ThreeComponent,
    },
    {
        title: 'demo',
        key: 'demo',
        component: DemoComponent,
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
        title: 'three demo',
        key: 'three',
        component: ThreeComponent,
        disclosable: true
    },
    // {
    //     title: 'demo',
    //     key: 'demo',
    //     component: DemoComponent,
    //     disclosable: true
    // },
  
]
export {DYNAMIC_COMPONENTS_LIST,INIT_TABS}