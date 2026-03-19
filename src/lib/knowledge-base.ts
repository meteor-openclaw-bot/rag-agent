export interface KnowledgeBase {
  id: string
  content: string
  category: string
}

export const STAR_EXAMPLES: KnowledgeBase[] = [
  {
    id: 'star_1',
    content: '项目需求是提升用户转化率 15%。我负责推荐算法优化，通过引入协同过滤+深度学习混合模型，使点击率提升 23%，最终达成目标。',
    category: 'STAR_项目',
  },
  {
    id: 'star_2',
    content: '作为前端负责人，我主导了 React 重构项目，团队 4 人耗时 3 个月。我设计了组件化架构，将页面加载速度提升 40%。',
    category: 'STAR_项目',
  },
  {
    id: 'star_3',
    content: '实习期间独立负责推荐模块优化。通过 A/B 测试验证，将核心指标 CTR 提升 18%，获得导师好评。',
    category: 'STAR_实习',
  },
  {
    id: 'star_4',
    content: '使用 LangChain 构建 RAG 系统，为简历优化功能提供知识检索能力。实现了 200+ 简历样本的向量化存储。',
    category: 'STAR_项目',
  },
]

export const RESUME_TIPS: KnowledgeBase[] = [
  {
    id: 'tip_1',
    content: '简历教育背景写清楚学校、学位、专业、GPA(如果>3.5)、排名、核心课程。',
    category: '教育背景',
  },
  {
    id: 'tip_2',
    content: '项目经历用 STAR 法则：Situation(背景) Task(任务) Action(行动) Result(成果)。成果要量化。',
    category: '项目经历',
  },
  {
    id: 'tip_3',
    content: '实习经历描述公式：我负责 X，用 Y 方法做 Z，达到了 W 效果（量化）。',
    category: '实习经历',
  },
  {
    id: 'tip_4',
    content: '技能部分分类写：语言、开发工具、框架、数据库。不要写"精通"，用"熟悉"或"掌握"。',
    category: '技能',
  },
  {
    id: 'tip_5',
    content: '简历控制在一页，PDF 格式。文件名：姓名_岗位_年限.pdf',
    category: '格式',
  },
]

export const INDUSTRY_KEYWORDS: KnowledgeBase[] = [
  {
    id: 'kw_1',
    content: '算法岗位高频词：推荐系统、搜索排序、NLP、CV、深度学习、PyTorch、TensorFlow、Transformer、BERT、LSTM、CNN、GNN、特征工程、模型优化、在线实验、A/B测试、CTR/CVR、召回、粗排、精排、重排',
    category: '算法',
  },
  {
    id: 'kw_2',
    content: '前端岗位高频词：React、Vue、TypeScript、Node.js、性能优化、工程化、组件化、微前端、SSR、SSG、Vite、Webpack、Git、CI/CD',
    category: '前端',
  },
  {
    id: 'kw_3',
    content: '后端岗位高频词：Java/Go/Python、Spring Boot、Django、分布式、微服务、Kafka、Redis、MySQL、PostgreSQL、Docker、K8s、消息队列、缓存设计、数据库优化',
    category: '后端',
  },
]

export function getAllKnowledge() {
  return [...STAR_EXAMPLES, ...RESUME_TIPS, ...INDUSTRY_KEYWORDS]
}
