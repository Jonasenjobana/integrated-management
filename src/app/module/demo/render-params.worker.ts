/// <reference lib="webworker" />
let queue: number[] = []
addEventListener('message', ({ data }) => {
  // 每3秒请求一次
  setInterval(() => {
    // console.log('请求一次接口');
      
      mockDate().then((res) => {
        if (queue.length === 100) {
          postMessage(queue)
          queue = []
        }
        queue.push(res)
        // console.log(queue);
        
      });
  }, 100);
});
// 异步数据
function mockDate(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 10);
  });
}
