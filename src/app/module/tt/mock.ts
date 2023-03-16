import { uuid } from 'src/app/module/share/utils/common.utils';
// 38.912216, 120.22655
export const shipList: Ship[] = new Array(50).fill({}).map(el => {
    let x = Math.random() > 0.5 ? Math.random() * 1 : Math.random() * -1
    let y = Math.random() > 0.5 ? Math.sqrt(1 - x*x) * Math.random() :  Math.sqrt(1 - x*x) * Math.random() * -1
    return {
        id: uuid(),
        lng: 38.912216 + x,
        lnt: 120.22655 + y,
        direction: Math.random() * 365,
        type: Math.random() > 0.5 ? 'bussiness' : 'passenger',
        msg: ''
    }
})
interface Ship {
    // 主键
    id: string,
    // 坐标
    lng: number,
    lnt: number,
    // 船的方向
    direction: number,
    // 商船、客船 拓展
    type: 'bussiness' | 'passenger'
    // 携带信息 船员名单、乘客名单、船状态等拓展
    msg: any,
}
