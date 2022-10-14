const MenuList: Menu[] = [
    {
      title: '产品手册',
      icon: '',
      key: 'manual',
      childMenu: [
        {
          title: '手册管理',
          icon: '',
          key: 'manual-list',
          childMenu: []
        },
      ]
    },
    {
      title: '产品中心',
      icon: '',
      key: 'product',
      childMenu: [
        {
          title: '产品列表',
          icon: '',
          key: 'product-list',
          childMenu: []
        },
      ]
    }
  ]
export interface Menu {
    title: string;
    icon: string;
    key: string;
    childMenu: Menu[]
}  
export {MenuList}