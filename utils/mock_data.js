const MOCK_WORDS = [
  {"word": "tag", "meaning": "标签", "explanation": "HTML中用来标记元素的关键字，成对出现", "code": "<p>段落文本</p>", "language": "HTML", "isMastered": false, "_id": "mock_1"},
  {"word": "attribute", "meaning": "属性", "explanation": "写在开始标签里，描述元素的额外信息", "code": "<img src=\"logo.png\" alt=\"logo\">", "language": "HTML", "isMastered": false, "_id": "mock_2"},
  {"word": "element", "meaning": "元素", "explanation": "由开始标签、内容、结束标签组成的整体", "code": "<div>内容</div>", "language": "HTML", "isMastered": false, "_id": "mock_3"},
  {"word": "hyperlink", "meaning": "超链接", "explanation": "通过 a 标签跳转到其他页面或位置", "code": "<a href=\"https://example.com\">链接</a>", "language": "HTML", "isMastered": false, "_id": "mock_4"},
  {"word": "semantic", "meaning": "语义化", "explanation": "用有含义的标签（header/nav/footer）描述网页结构", "code": "<header>页头</header>", "language": "HTML", "isMastered": false, "_id": "mock_5"},
  {"word": "canvas", "meaning": "画布", "explanation": "HTML5 提供的绘图容器，配合 JS 绘制图形", "code": "<canvas id=\"c\" width=\"200\"></canvas>", "language": "HTML", "isMastered": false, "_id": "mock_6"},
  {"word": "form", "meaning": "表单", "explanation": "收集用户输入并提交数据的区域", "code": "<form action=\"/submit\">...</form>", "language": "HTML", "isMastered": false, "_id": "mock_7"},
  {"word": "input", "meaning": "输入框", "explanation": "表单中接收用户输入的元素", "code": "<input type=\"text\" placeholder=\"请输入\">", "language": "HTML", "isMastered": false, "_id": "mock_8"},
  {"word": "selector", "meaning": "选择器", "explanation": "用来选中页面元素并应用样式的规则", "code": ".box { color: red }", "language": "CSS", "isMastered": false, "_id": "mock_9"},
  {"word": "flex", "meaning": "弹性布局", "explanation": "一维布局方式，让子元素灵活排列和对齐", "code": "display: flex; justify-content: center;", "language": "CSS", "isMastered": false, "_id": "mock_10"},
  {"word": "grid", "meaning": "网格布局", "explanation": "二维布局系统，按行和列排布元素", "code": "display: grid; grid-template-columns: 1fr 1fr;", "language": "CSS", "isMastered": false, "_id": "mock_11"},
  {"word": "margin", "meaning": "外边距", "explanation": "元素边框外侧与其他元素的距离", "code": "margin: 10px 20px;", "language": "CSS", "isMastered": false, "_id": "mock_12"},
  {"word": "padding", "meaning": "内边距", "explanation": "元素内容与边框之间的空间", "code": "padding: 16px;", "language": "CSS", "isMastered": false, "_id": "mock_13"},
  {"word": "animation", "meaning": "动画", "explanation": "通过关键帧让元素平滑变化", "code": "animation: spin 2s linear infinite;", "language": "CSS", "isMastered": false, "_id": "mock_14"},
  {"word": "responsive", "meaning": "响应式", "explanation": "页面随屏幕尺寸自适应调整布局", "code": "@media (max-width: 600px) { ... }", "language": "CSS", "isMastered": false, "_id": "mock_15"},
  {"word": "z-index", "meaning": "层叠顺序", "explanation": "控制元素在垂直方向上的覆盖层级", "code": "z-index: 999;", "language": "CSS", "isMastered": false, "_id": "mock_16"},
  {"word": "function", "meaning": "函数", "explanation": "封装一段可重复调用的代码块", "code": "function add(a, b) { return a + b }", "language": "JavaScript", "isMastered": false, "_id": "mock_17"},
  {"word": "variable", "meaning": "变量", "explanation": "用来存储数据的命名容器", "code": "let count = 0", "language": "JavaScript", "isMastered": false, "_id": "mock_18"},
  {"word": "array", "meaning": "数组", "explanation": "按顺序存储多个值的数据结构", "code": "const list = [1, 2, 3]", "language": "JavaScript", "isMastered": false, "_id": "mock_19"},
  {"word": "object", "meaning": "对象", "explanation": "以键值对方式组织数据", "code": "const user = { name: 'Tom', age: 18 }", "language": "JavaScript", "isMastered": false, "_id": "mock_20"},
  {"word": "promise", "meaning": "承诺对象", "explanation": "异步操作的最终结果对象，有 pending/fulfilled/rejected 三种状态", "code": "new Promise((resolve) => resolve(1))", "language": "JavaScript", "isMastered": false, "_id": "mock_21"},
  {"word": "async", "meaning": "异步", "explanation": "用 async/await 以同步写法处理异步流程", "code": "const data = await fetch(url)", "language": "JavaScript", "isMastered": false, "_id": "mock_22"},
  {"word": "event", "meaning": "事件", "explanation": "用户或浏览器触发的动作，可绑定处理函数", "code": "btn.addEventListener('click', fn)", "language": "JavaScript", "isMastered": false, "_id": "mock_23"},
  {"word": "loop", "meaning": "循环", "explanation": "重复执行一段代码直到条件不满足", "code": "for (let i = 0; i < 10; i++)", "language": "JavaScript", "isMastered": false, "_id": "mock_24"},
  {"word": "callback", "meaning": "回调函数", "explanation": "作为参数传给其他函数、稍后被调用的函数", "code": "arr.forEach((item) => console.log(item))", "language": "JavaScript", "isMastered": false, "_id": "mock_25"},
  {"word": "api", "meaning": "接口", "explanation": "前后端之间约定的数据交互方式", "code": "fetch('/api/list').then(r => r.json())", "language": "JavaScript", "isMastered": false, "_id": "mock_26"},
  {"word": "print", "meaning": "打印输出", "explanation": "在控制台输出内容的内置函数", "code": "print('Hello World')", "language": "Python", "isMastered": false, "_id": "mock_27"},
  {"word": "def", "meaning": "定义函数", "explanation": "声明一个可复用的函数", "code": "def add(a, b): return a + b", "language": "Python", "isMastered": false, "_id": "mock_28"},
  {"word": "import", "meaning": "导入模块", "explanation": "引入其他模块或库", "code": "import math", "language": "Python", "isMastered": false, "_id": "mock_29"},
  {"word": "list", "meaning": "列表", "explanation": "有序可变的数据集合", "code": "nums = [1, 2, 3]", "language": "Python", "isMastered": false, "_id": "mock_30"},
  {"word": "dict", "meaning": "字典", "explanation": "键值对映射的数据结构", "code": "user = {'name': 'Tom'}", "language": "Python", "isMastered": false, "_id": "mock_31"},
  {"word": "tuple", "meaning": "元组", "explanation": "不可变的有序序列", "code": "point = (3, 5)", "language": "Python", "isMastered": false, "_id": "mock_32"},
  {"word": "class", "meaning": "类", "explanation": "面向对象编程中对象的模板", "code": "class Dog: pass", "language": "Python", "isMastered": false, "_id": "mock_33"},
  {"word": "condition", "meaning": "条件判断", "explanation": "if/elif/else 控制程序分支", "code": "if x > 0: print('正数')", "language": "Python", "isMastered": false, "_id": "mock_34"},
  {"word": "loop", "meaning": "循环", "explanation": "while/for 重复执行代码", "code": "for i in range(5): print(i)", "language": "Python", "isMastered": false, "_id": "mock_35"},
  {"word": "exception", "meaning": "异常", "explanation": "程序运行时的错误，可用 try/except 捕获", "code": "try: 1/0\nexcept ZeroDivisionError: pass", "language": "Python", "isMastered": false, "_id": "mock_36"},
  {"word": "class", "meaning": "类", "explanation": "Java 程序的基本组织单元", "code": "public class Hello {}", "language": "Java", "isMastered": false, "_id": "mock_37"},
  {"word": "public", "meaning": "公开的", "explanation": "访问修饰符，任何地方可访问", "code": "public void run() {}", "language": "Java", "isMastered": false, "_id": "mock_38"},
  {"word": "static", "meaning": "静态的", "explanation": "属于类而非实例的成员", "code": "static int count = 0", "language": "Java", "isMastered": false, "_id": "mock_39"},
  {"word": "void", "meaning": "空返回", "explanation": "方法不返回任何值", "code": "public void main(String[] args) {}", "language": "Java", "isMastered": false, "_id": "mock_40"},
  {"word": "main", "meaning": "主方法", "explanation": "Java 程序执行的入口", "code": "public static void main(String[] args)", "language": "Java", "isMastered": false, "_id": "mock_41"},
  {"word": "interface", "meaning": "接口", "explanation": "定义一组方法规范，类可实现它", "code": "interface Runnable { void run() }", "language": "Java", "isMastered": false, "_id": "mock_42"},
  {"word": "extends", "meaning": "继承", "explanation": "子类继承父类的属性和方法", "code": "class Dog extends Animal {}", "language": "Java", "isMastered": false, "_id": "mock_43"},
  {"word": "array", "meaning": "数组", "explanation": "固定长度的同类型元素集合", "code": "int[] nums = new int[5]", "language": "Java", "isMastered": false, "_id": "mock_44"},
  {"word": "package", "meaning": "包", "explanation": "组织类文件的命名空间目录", "code": "package com.example.app", "language": "Java", "isMastered": false, "_id": "mock_45"},
]

function filterWords(lang, keyword, pageNum, pageSize) {
  let list = MOCK_WORDS
  if (lang === 'Python') {
    list = list.filter(w => w.language === 'Python' || w.language === 'Java')
  } else if (lang !== 'all') {
    list = list.filter(w => w.language === lang)
  }
  if (keyword) {
    const k = keyword.toLowerCase()
    list = list.filter(w => w.word.toLowerCase().indexOf(k) > -1)
  }
  const start = pageNum * pageSize
  const slice = list.slice(start, start + pageSize)
  return { list: slice, hasMore: start + slice.length < list.length }
}

module.exports = { MOCK_WORDS, filterWords }