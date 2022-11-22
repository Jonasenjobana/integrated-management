export class ColumnOption {
  // 冻结
  isFreeze: boolean = false;
  // 排序
  isSort: boolean = false;
  sortCB?: () => {};
  isLink: boolean = false;
  clickJump?: (params: any) => {};
}
export interface Column {
  columnName: string;
  propertyName: string;
  type: string;
  width: number;
  option: ColumnOption;
}