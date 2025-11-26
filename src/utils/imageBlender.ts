/**
 * 可变图像生成器
 * 基于透明度和棋盘格原理，生成在不同背景下显示不同内容的图片
 */

/**
 * 将图片转换为灰度值数组
 */
const imageToGrayscale = (
  imageData: ImageData
): Float32Array => {
  const { data, width, height } = imageData;
  const grayscale = new Float32Array(width * height);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    // 使用标准灰度转换公式
    grayscale[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  return grayscale;
};

/**
 * 生成可变图像
 * @param whiteImage 白底显示的图片（点开前）
 * @param blackImage 黑底显示的图片（点开后）
 * @returns 生成的可变图片的 DataURL
 */
export const generateBlendedImage = async (
  whiteImage: string,
  blackImage: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('无法创建 Canvas 上下文'));
      return;
    }

    const img1 = new Image();
    const img2 = new Image();
    let loadedCount = 0;

    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        try {
          processImages();
        } catch (error) {
          reject(error);
        }
      }
    };

    img1.onload = onLoad;
    img2.onload = onLoad;
    img1.onerror = () => reject(new Error('图片1加载失败'));
    img2.onerror = () => reject(new Error('图片2加载失败'));

    img1.src = whiteImage;
    img2.src = blackImage;

    const processImages = () => {
      // 使用较大图片的尺寸
      const width = Math.max(img1.width, img2.width);
      const height = Math.max(img1.height, img2.height);

      canvas.width = width;
      canvas.height = height;

      // 绘制第一张图片并获取灰度数据
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img1, 0, 0, width, height);
      const imageData1 = ctx.getImageData(0, 0, width, height);
      const gray1 = imageToGrayscale(imageData1);

      // 绘制第二张图片并获取灰度数据
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img2, 0, 0, width, height);
      const imageData2 = ctx.getImageData(0, 0, width, height);
      const gray2 = imageToGrayscale(imageData2);

      // 创建结果图像数据
      const resultData = ctx.createImageData(width, height);
      const { data } = resultData;

      // 生成棋盘格可变图像
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = y * width + x;
          const dataIndex = i * 4;

          // 棋盘格判断：(x + y) % 2 === 0 为黑色格子
          const isBlackSquare = (x + y) % 2 === 0;

          if (isBlackSquare) {
            // 黑色格子：颜色为黑(0)，透明度为 1 - gray1
            data[dataIndex] = 0;     // R
            data[dataIndex + 1] = 0; // G
            data[dataIndex + 2] = 0; // B
            data[dataIndex + 3] = Math.round((1 - gray1[i]) * 255); // A
          } else {
            // 白色格子：颜色为白(255)，透明度为 gray2
            data[dataIndex] = 255;     // R
            data[dataIndex + 1] = 255; // G
            data[dataIndex + 2] = 255; // B
            data[dataIndex + 3] = Math.round(gray2[i] * 255); // A
          }
        }
      }

      // 将结果绘制到画布
      ctx.putImageData(resultData, 0, 0);

      // 导出为 PNG
      resolve(canvas.toDataURL('image/png'));
    };
  });
};

