'use client';

// 整个项目的入口 从这里开始运行
// Next.js无需导入核心包

const count = 100

function getname() {
  return 'jack'
}

const list = [
  { id: 1001, name: "Vue" },
  { id: 1002, name: "React" },
  { id: 1003, name: "Angular"},
]

const flag = true

const loading = true

const isLogin = false

// 定义文章类型
const articleType = 3

// 定义核心函数（根据文章类型返回不同的JSX模版）
function getArticleTem(){
  if(articleType===0) {
    return <div>我是无图文章</div>
  } else if(articleType === 1) {
    return <div>我是单图模式</div>
  } else {
    return <div>我是多图模式</div>
  }
}

// 定义组件
// function 写法
function Button1(){
  // 组件逻辑
  return <button>function button component</button>
}

// const 写法
const Button2 = () => {
  return <button>const button component</button>
}

function App() {
  // 事件绑定
  // const handleClick = () => {       
  //   console.log('button is clicked', e)
  // }
  
  // 事件参数
  // const handleClick = (e) => {       
  //   console.log('button is clicked', e)
  // }

  // 传递自定义参数
  // const handleClick = (name) => {
  //   console.log('button is clicked', name)
  // }

  // 同时传递自定义参数 形参e
  const handleClick = (name, e) => {
    console.log(name, e)
  }

  // 调用useState添加一个状态变量
  const [count, set_Count] = useState(0)

  return (  
    // JSX = Javascript可编程能力 + HTML声明式模版写法
    <div className="App">  
      this is App
      {/* 1. passing strings using quotes  */}
      {'this is message'}
      {/* 2. rec js variables */}
      {count}
      {/* 3. use function */}
      { getname() }
      {/* 4. use method */}
      {new Date().getDate()}
      {/* 5. use js obejct */}
      <div style={{ color: 'red' }}> this is div</div>
      {/* only js expression is valid */}

      {/* 渲染列表 */}
      {/* map 循环哪个结构 return结构 */}
      {/* 注意事项：加上一个unique 的key string or number usualluy id */}
      {/* key的作用：React框架内部使用 提升更新性能 */}
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>

      {/* 条件渲染 */}
      {/* 在React中 可以通过逻辑与运算符&&，三元表达式(?)实现基础的条件渲染 */}

      {/* 逻辑与运算符&&，如果flag为True，则显示后面的；否则不显示 */}
      {flag && <span>this is span</span>}
      {/* 三元表达式(?) 如果loading为True，则显示前面的；否则显示后面的 */}
      {loading ? <span>loading...</span>: <span>this is span</span>}

      {/* isLogin: True=>Jack False=>Please log in */}
      {isLogin ? <span>Jack</span>: <span>loading</span>}

      {/* 复杂条件判断 */}
      {/* 调用函数渲染不同的模版 */}
      {getArticleTem()}

      {/* React基础事件绑定: on事件名称 = { 事件处理程序 } */}
      {/* 调用使用了自定义参数的函数的时候必须用()=>handleClick(custom_parameter) */}
      {/* 若想要同时使用自定义参数和e 需要用(e)=>声明形参e 并且注意顺序 */}
      <button onClick={(e)=>handleClick('jack', e)}>handleClick</button>

      {/* 渲染组件 */}
      {/* 自闭合 */}
      <Button1 />
      {/* 成对标签 */}
      <Button2></Button2>
    </div>
  );
}

export default App