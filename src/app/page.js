'use client';

import { useEffect, useRef, useState } from 'react'
import './App.scss'
import avatar from './images/avatar.jpg'
import _ from 'lodash'
import classnames from 'classnames'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios';

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    rpid: 3,
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    content: '哎哟，不错哦',
    ctime: '10-18 08:15',
    like: 89,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '前端',
    },
    content: '学前端就',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'like', text: '最热' },
  { type: 'ctime', text: '最新' },
]

function Item ( {item, onDel}) {
  return (
    <div className="reply-item">
    <div className="root-reply-avatar">
      <div className="bili-avatar">
        <img className="bili-avatar-img" src={item.user.avatar} />
      </div>
    </div>
    <div className="content-wrap">
      <div className="user-info">
        <div className="user-name">{item.user.uname}</div>
      </div>
      <div className="root-reply">
        <span className="reply-content">{item.content}</span>
        <div className="reply-info">
          <span className="reply-time">{item.ctime}</span>
          <span className="reply-time">点赞数:{item.like}</span>
          {user.uid === item.user.uid && <span className="delete-btn" onClick={()=>onDel(item.rpid)}>删除</span>}
        </div>
      </div>
    </div>
  </div>
  )
}

const App = () => {
  // const [comment, setComment] = useState(_.orderBy(defaultList, 'like', 'desc'))

  // 封装为Hook的获取数据模块
  const useGetList = () => {
    const [comment, setComment] = useState([])

    useEffect(()=>
      {
        async function getList() {
          const res = await axios.get("http://localhost:3004/list")
          setComment(res.data)
        }
        getList()
      }, [])
    
    return {
      comment,
      setComment
    }
  }

  // 获取接口数据渲染
  const {comment, setComment} = useGetList()

  /**
   * 删除
   */
  const handleClickDelete = (id) => {
    setComment(comment.filter(item => item.rpid !== id))
  }
  
  /**
   * tab高亮
   */
  const [type, setType] = useState('like')

  const inputRef = useRef(null)

  const handleClickTab = (type) => {
    setType(type)
    setComment(_.orderBy(comment, type, 'desc'))
  }

  // 发表评论
  const [content, setContent] = useState('')

  const handlePublish = () => {
    setComment([
        ...comment,
        {
         rpid: uuidV4(),   // 随机生成id
         user: {
             uid: '30009257',
             avatar,
             uname: '前端',
         },
         content: content,
         ctime: dayjs(new Date()).format('MM-DD hh:mm'),  //format Month-Date Hour-Minute
         like: 66,
        }
    ])
    // 1. 清空输入内容
    setContent('')
    // 2. 重新聚焦 dom(Ref) - focus
    inputRef.current.focus()
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => 
              <span 
                key={item.type} 
                className={classnames('nav-item', { active: type === item.type })}
                onClick={() => handleClickTab(item.type)}
              >
                {item.text}
              </span>
            )}
          </li>
        </ul>
      </div>
      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={inputRef}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {comment.map(item => <Item key={item.rpid} item={item} onDel={handleClickDelete}/>)}
        </div>
      </div>
    </div>
  )
}

export default App