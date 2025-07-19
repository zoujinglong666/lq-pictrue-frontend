import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    loading: false,
    loadingText: '加载中...',
    centered: true, // 是否居中显示
    enabled: true,  // 是否启用全局loading
    loadingCount: 0, // 当前请求计数
  }),
  actions: {
    showLoading(text?: string) {
      if (!this.enabled) return;
      this.loadingCount++;
      this.loading = true;
      this.loadingText = text || '加载中...';
    },
    hideLoading() {
      if (this.loadingCount > 0) this.loadingCount--;
      if (this.loadingCount === 0) {
        this.loading = false;
      }
    },
    setCentered(center: boolean) {
      this.centered = center;
    },
    setEnabled(enable: boolean) {
      this.enabled = enable;
      if (!enable) {
        this.loading = false;
        this.loadingCount = 0;
      }
    },
    resetLoading() {
      this.loading = false;
      this.loadingCount = 0;
    },
  },
}); 