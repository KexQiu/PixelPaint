import { Application } from 'pixi.js';

// 下载图片
export const download = async (app: Application) => {
  
  if (!app) return;
  const mainContainer = app.stage.getChildByName('mainContainer');
  const image = await app.renderer.plugins.extract.image(mainContainer); // 从容器中提取图像
  
  const link = document.createElement('a');
  link.href = image.src; // 获取图像的 src
  link.download = 'PixelPaintImage.png'; // 设置下载文件名
  link.click(); // 触发下载
};