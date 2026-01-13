/**
 * 搜索引擎配置
 */

export interface SearchEngine {
  key: string; // 唯一键
  name: string; // 显示名称
  template: string; // URL 模板，{q} 会被替换为查询关键词
  icon?: string; // 图标 URL (可选)
  locale?: string; // 地区/语言参数
}

/**
 * 预设的搜索引擎列表
 */
export const SEARCH_ENGINES: SearchEngine[] = [
   {
    key: 'bing',
    name: 'Bing',
    template: 'https://www.bing.com/search?q={q}',
    icon: 'https://www.faviconextractor.com/favicon/www.bing.com?larger=true',
  },
  {
    key: 'google',
    name: 'Google',
    template: 'https://www.google.com/search?q={q}',
    icon: 'https://www.faviconextractor.com/favicon/www.google.com?larger=true',
  },
  {
    key: 'baidu',
    name: '百度',
    template: 'https://www.baidu.com/s?wd={q}',
    icon: 'https://www.faviconextractor.com/favicon/www.baidu.com?larger=true',
  },
  {
    key: 'metaso',
    name: '秘塔搜索',
    template: 'https://metaso.cn/search?q={q}',
    icon: 'https://www.faviconextractor.com/favicon/metaso.cn?larger=true',
  },
  {
    key: 'github',
    name: 'GitHub',
    template: 'https://github.com/search?q={q}&type=repositories',
    icon: 'https://www.faviconextractor.com/favicon/github.com?larger=true',
  },
  {
    key: 'zhihu',
    name: '知乎',
    template: 'https://www.zhihu.com/search?type=content&q={q}',
    icon: 'https://www.faviconextractor.com/favicon/www.zhihu.com?larger=true',
  },
];

/**
 * 获取默认搜索引擎
 */
export function getDefaultSearchEngine(): SearchEngine {
  const defaultEngine = SEARCH_ENGINES[0];
  if (!defaultEngine) {
    throw new Error('No search engines available');
  }
  return defaultEngine;
}

/**
 * 根据 key 获取搜索引擎
 */
export function getSearchEngineByKey(key: string): SearchEngine {
  return SEARCH_ENGINES.find((engine) => engine.key === key) || getDefaultSearchEngine();
}

/**
 * 构建搜索 URL
 */
export function buildSearchUrl(engine: SearchEngine, query: string): string {
  const encodedQuery = encodeURIComponent(query.trim());
  return engine.template.replace('{q}', encodedQuery);
}

/**
 * 检测输入是否为 URL
 */
export function isUrl(input: string): boolean {
  // 简单的 URL 检测：包含 . 且不含空格，或以 http:// https:// 开头
  const urlPattern = /^(https?:\/\/|www\.)/i;
  const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/;

  return urlPattern.test(input) || domainPattern.test(input);
}

/**
 * 规范化 URL（自动补全 https://）
 */
export function normalizeUrl(input: string): string {
  if (!/^https?:\/\//i.test(input)) {
    return `https://${input}`;
  }
  return input;
}
