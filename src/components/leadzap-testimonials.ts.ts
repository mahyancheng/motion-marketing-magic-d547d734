// leadzap-testimonials.ts
export type LeadZapTestimonial = {
  name: string;
  username: string;
  body: string;
  img: string;
  country: string;
  rating?: number;
  metrics?: string;   // e.g. "ROAS 4.2x", "Leads +187%"
  service?: "SEO" | "Ads" | "Software" | "Push" | "Pull";
};

export const leadzapTestimonials: LeadZapTestimonial[] = [
  {
    name: "Jason Tan",
    username: "@gourmetbox",
    body: "Push + Pull 框架跑满 90 天，SEO + 再营销让订单涨了 63%。仪表板一目了然！",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    country: "🇲🇾 Malaysia",
    rating: 5,
    metrics: "Orders +63%",
    service: "Push",
  },
  {
    name: "Aisha Rahman",
    username: "@homecare",
    body: "技术 SEO + 内容集群起量后，自然流量稳步上涨、每潜在客户成本持续下降。",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    country: "🇲🇾 Malaysia",
    rating: 5,
    metrics: "CPL ↓38%",
    service: "Pull",
  },
  {
    name: "Kelvin Ng",
    username: "@trendyfit",
    body: "广告素材迭代 + 登陆页 A/B 测试，ROAS 从 2.1 到 4.2，利润可观。",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇸🇬 Singapore",
    rating: 5,
    metrics: "ROAS 4.2x",
    service: "Ads",
  },
  {
    name: "Mei Ling",
    username: "@meiling.shop",
    body: "定制小工具把客服 FAQ 自动化，节省了 40% 人力时间。",
    img: "https://randomuser.me/api/portraits/women/31.jpg",
    country: "🇲🇾 Malaysia",
    rating: 5,
    metrics: "Ops -40%",
    service: "Software",
  },
  {
    name: "Hafiz",
    username: "@autoparts",
    body: "再营销节奏 + 关键词策略非常扎实，周转率明显提升。",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    country: "🇲🇾 Malaysia",
    rating: 5,
    metrics: "Leads +187%",
    service: "Push",
  },
  {
    name: "Yuki",
    username: "@teahouse",
    body: "内容中台+内链策略拉动多页排名，品牌词点击率翻倍。",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    country: "🇯🇵 Japan",
    rating: 5,
    metrics: "CTR 2x",
    service: "Pull",
  },
];
