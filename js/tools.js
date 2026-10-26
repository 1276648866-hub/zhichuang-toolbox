/*
 * 工具注册表：以后新增工具，优先在这里增加一条配置。
 * status: "ready" 表示目前有可运行的本地功能；"planned" 表示规划/演示入口。
 */
window.TOOLBOX_TOOLS = [
  { id: "text-counter", name: "文本字数统计", category: "实用工具", icon: "🔤", iconBg: "#e8f7ee", description: "统计字符数、汉字数、单词和行数。", status: "ready", type: "text-counter" },
  { id: "ai-writer", name: "AI 文案助手", category: "AI创作", icon: "✍️", iconBg: "#fff0e7", description: "为社交媒体、商品介绍和日常写作整理文案思路。", status: "planned", type: "planned" },
  { id: "work-summary", name: "工作总结助手", category: "AI办公", icon: "🗂️", iconBg: "#e8f0ff", description: "帮助梳理工作要点，生成总结结构和提纲。", status: "planned", type: "planned" },
  { id: "copy-polish", name: "文本润色", category: "AI办公", icon: "🪄", iconBg: "#f1eaff", description: "规划中的文字优化工具，可用于调整表达和语气。", status: "planned", type: "planned" },
  { id: "video-script", name: "短视频脚本", category: "AI创作", icon: "🎬", iconBg: "#ffe9ef", description: "规划短视频开场、内容结构和结尾互动。", status: "planned", type: "planned" },
  { id: "stock-research", name: "股票研究助手", category: "股票研究", icon: "📈", iconBg: "#e5f7f4", description: "预留基本面、财务指标和风险提示分析入口。", status: "planned", type: "planned" },
  { id: "unit-converter", name: "单位换算", category: "实用工具", icon: "⚖️", iconBg: "#fff5d9", description: "后续可加入长度、重量、温度等常用单位换算。", status: "planned", type: "planned" },
  { id: "date-calculator", name: "日期计算器", category: "实用工具", icon: "📅", iconBg: "#e8f0ff", description: "规划中的日期间隔和日期推算工具。", status: "planned", type: "planned" }
];
