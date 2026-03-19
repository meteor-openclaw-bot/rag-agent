# RAG Agent - 简历优化助手

基于 RAG (Retrieval-Augmented Generation) 的 AI 简历优化 Agent。

## 功能

- 📝 **智能优化** - 输入原始简历描述，AI 用 STAR 法则优化
- 💡 **专业建议** - 提供简历写作专业建议
- 🎯 **行业匹配** - 匹配行业 JD 高频关键词

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **AI**: OpenAI GPT-3.5 / GPT-4
- **向量数据库**: ChromaDB (可选，用于大规模知识库)

## 快速开始

```bash
# 安装依赖
npm install

# 复制环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 OpenAI API Key

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

```env
OPENAI_API_KEY=sk-xxx          # OpenAI API Key
CHROMA_PATH=http://localhost:8000  # ChromaDB 地址（可选）
```

## 部署到 Vercel

1. Fork 此仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量 `OPENAI_API_KEY`
4. Deploy!

## 子域名配置

部署后可在 Vercel 设置自定义域名，如 `rag.craft.meteor041.com`

## 项目结构

```
src/
├── app/
│   ├── api/chat/route.ts   # Chat API
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── lib/
│   ├── chroma.ts           # ChromaDB 客户端
│   └── knowledge-base.ts   # 知识库数据
└── components/             # React 组件
```

## License

MIT · Luma's Craft
