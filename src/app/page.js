'use client';

import { createContext, useEffect, useContext, useState } from 'react'
// 导入样式
import './index.css'

// const count = 100

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

// 行内样式控制
// 定义 style
const style = {
  color: 'red',
  fontSize: '50px'
}

// 父传子
// 1. 父组件传递数据 子组件标签上绑定属性
// 2. 子组件接收数据 props的参数
// function Son ({ props }) {
  // console.log(props)
  // 父组件传过来的数据不允许直接修改 只可以读取
  // return <div>this is son compo {props.name} {props.list} {props.children}</div>
// }

// 子传父核心 在子组件中调用父组件中的函数并传递实参
// function A ({ onGetAMsg }) {
//   const sonMsg = 'AAA'
//   return (
//     <button onClick={() => onGetAMsg(sonMsg)}>send</button>
//   )
// }

// 兄弟通信 接收信息
// function B ({ bname }) {
//   return (
//     <div>
//       this is B component
//       { bname }
//     </div>
//   )
// }

// 跨层通信
const MsgContext = createContext()

function A () {
  return (
    <div>
      this is A component
      <B />
    </div>
  )
}

function B () {
  const msg = useContext(MsgContext)
  return (
    <div>
      this is B component
      {msg}
    </div>
  )
}

// useEffect 清除副作用
function Son() {
  // 1. 渲染时开启一个定时器
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log('Timer is conducting...')
    }, 1000)

    // 清除定时器
    return (()=>clearInterval(timer))
  }, [])
  return <div>this is son</div>
}

// useEffect 基础理解和使用
const URL = 'http://geek.itheima.net/v1_0/channels'

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

  // 调用 useState 添加一个状态变量
  // count 状态变量
  // set_Count 修改状态变量的方法
  // const [count, setCount] = useState(0)

  // 点击事件回调
  // const handleClick1 = () => {
  //   // 效果
  //   // 用传入的新值修改 count
  //   // 重新使用新的count渲染UI
  //   setCount(count + 1)
  // }

  // useState注意 useState is read-only 只可替换不可修改
  // 错误示范
  // const handleClickwrong = () => {
  //   // 直接修改无法引发视图的更新
  //   count++
  //   console.log(count)
  // }

  // 修改对象状态
  // “修改”的本质是替换
  const [form, setForm] = useState({name: 'jack'})
  const changeForm = () => {
    // 错误写法
    // form.name = 'john'
    // 正确写法 setForm 传入一个新对象
    setForm({
      ...form,
      name: 'john'
    })
  }

  const name = 'jack'

  const [bname, setBname] = useState('')

  const getMsg = (msg) => {
    console.log(msg)
    setBname(msg)
  }

  const msg = 'messageeeee'

  // useEffect的基础理解和使用
  // useEffect用于仅由渲染本身引起
  const [list, setList] = useState([])
  useEffect(() => {
    async function getList () {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      console.log(jsonRes)
      setList(jsonRes.data.channels)
    }
    getList()
  }, [])

  const [count, setCount] = useState(0)
  const [bool, setBool] = useState('true')
  // 1. 没有依赖项 一旦有组件更新就会执行
  // useEffect(() => {
  //   console.log('useEffect has been run.')
  // })
  
  // 2. 有空数组依赖项 执行且只执行一次 
  // useEffect(() => {
  //   console.log('useEffect has benn run')
  // }, [])

  // 3. 独特依赖项 只在特定组件更新时执行
  // useEffect(() => {
  //   console.log('useEffect has been run')
  // }, [bool])


  // 清除useEffect副作用的设置
  const [show, setShow] = useState(true)

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
      {/* <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul> */}

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

     {/* count 按钮 */}
      {/* <button onClick={handleClick1}>{count}</button> */}

      {/* 错误示范 count 按钮 */}
      {/* <button onClick={handleClickwrong}>{count}</button> */}

      {/* 修改对象状态 */}
      <button onClick={changeForm}>修改对象状态为{form.name}</button>

      {/* 行内样式控制 */}
      <span style = {style}>行内样式控制 red 50px</span>

      {/* class 类名样式控制 */}
      <span className="foo">class 类名样式控制 blue</span>

      {/* 渲染Son组件 */}
      {/* <Son /> */}

      {/* 父组件传输数据 */}
      {/* <Son 
        name={name} 
        age={18}
        isTrue={false}
        list={['Vue', 'React']}
      /> */}

      {/* 父传子children说明 */}
      {/* <Son>
        <span>this is a span</span>
      </Son> */}
      {/* <A onGetAMsg={getMsg} /> */}

      {/* 设置变量 实现兄弟通信 */}
      {/* <B bname={bname}/> */}

      {/* 跨层通信 */}
      <MsgContext.Provider value={msg}>
        this is App component
        <A />
      </MsgContext.Provider>

      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>

      <div>
        <button onClick={() => setBool('False')}>setBool to {bool}</button>
        <button onClick={() => setCount(count + 1)}>setCount to {count}</button>
      </div>

      <div>
        {show && <Son />}
        <button onClick={() => setShow(false)}>uninstall son component</button>
      </div>
    </div>
  );
}

export default App