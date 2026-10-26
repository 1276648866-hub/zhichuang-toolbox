(() => {
  const tools = window.TOOLBOX_TOOLS || [];
  const grid = document.getElementById("toolGrid");
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const dialog = document.getElementById("toolDialog");
  const dialogContent = document.getElementById("dialogContent");
  let activeCategory = "全部";

  document.getElementById("year").textContent = new Date().getFullYear();

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = tools.filter(tool => {
      const categoryMatch = activeCategory === "全部" || tool.category === activeCategory;
      const text = `${tool.name} ${tool.category} ${tool.description}`.toLowerCase();
      return categoryMatch && text.includes(query);
    });
    resultCount.textContent = `共 ${filtered.length} 个工具`;
    emptyState.classList.toggle("hidden", filtered.length !== 0);
    grid.innerHTML = filtered.map(tool => `
      <article class="tool-card">
        <div class="card-top">
          <span class="tool-icon" style="--icon-bg:${tool.iconBg}">${escapeHTML(tool.icon)}</span>
          <span class="badge ${tool.status === "ready" ? "ready" : ""}">${tool.status === "ready" ? "可使用" : "规划中"}</span>
        </div>
        <h3>${escapeHTML(tool.name)}</h3>
        <p>${escapeHTML(tool.description)}</p>
        <div class="card-bottom">
          <span class="category-label">${escapeHTML(tool.category)}</span>
          <button class="open-tool" data-tool-id="${escapeHTML(tool.id)}">${tool.status === "ready" ? "立即使用 →" : "查看详情 →"}</button>
        </div>
      </article>`).join("");
  }

  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.category;
      render();
    });
  });
  searchInput.addEventListener("input", render);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-tool-id]");
    if (!button) return;
    const tool = tools.find(item => item.id === button.dataset.toolId);
    if (tool) openTool(tool);
  });

  document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  function openTool(tool) {
    if (tool.type === "text-counter") {
      dialogContent.innerHTML = `
        <div class="dialog-content">
          <div class="dialog-icon">${escapeHTML(tool.icon)}</div>
          <h2>${escapeHTML(tool.name)}</h2>
          <p>输入或粘贴文本，统计结果会自动更新。文本只在当前页面本地处理，不会上传到服务器。</p>
          <label for="counterText">输入文本</label>
          <textarea id="counterText" placeholder="在这里输入或粘贴文本…"></textarea>
          <div id="counterOutput" class="dialog-output">字符数：0（含空格）\\n字符数：0（不含空白）\\n汉字数：0\\n行数：0</div>
        </div>`;
      const input = document.getElementById("counterText");
      const output = document.getElementById("counterOutput");
      input.addEventListener("input", () => {
        const value = input.value;
        const noWhitespace = value.replace(/\\s/g, "");
        const chinese = (value.match(/[\\u3400-\\u4dbf\\u4e00-\\u9fff]/g) || []).length;
        const lines = value.length ? value.split(/\\r\\n|\\r|\\n/).length : 0;
        output.textContent = `字符数（含空格）：${value.length}\\n字符数（不含空白）：${noWhitespace.length}\\n汉字数：${chinese}\\n行数：${lines}`;
      });
    } else {
      dialogContent.innerHTML = `
        <div class="dialog-content">
          <div class="dialog-icon">${escapeHTML(tool.icon)}</div>
          <h2>${escapeHTML(tool.name)}</h2>
          <p>${escapeHTML(tool.description)}</p>
          <p class="notice">这是网站框架中的预留入口，目前尚未接入完整功能。后续可以单独开发此工具，再接入主网站。</p>
          ${tool.category === "股票研究" ? '<p>提示：未来的股票研究功能应提供数据来源、分析依据和风险提示，不应把评分当作收益保证或个性化投资建议。</p>' : ""}
          <button class="dialog-action" id="closePlanned">知道了</button>
        </div>`;
      document.getElementById("closePlanned").addEventListener("click", () => dialog.close());
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
    else alert(`${tool.name}\\n此浏览器不支持弹窗，请更新浏览器后再试。`);
  }

  render();
})();
