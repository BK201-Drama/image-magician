export default {
  /**
   * Workers 入口函数
   * - 所有请求都会先经过这里
   * - 再由 ASSETS 绑定去查找并返回 dist 目录中的静态文件
   */
  async fetch(request, env, ctx): Promise<Response> {
    // 优先由静态资源目录（dist）处理请求
    return env.ASSETS.fetch(request);
  },
};


