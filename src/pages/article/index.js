import React, { Suspense, useState, memo, useEffect, useContext, useRef } from 'react'
import { doGetArticleByID } from '../../api/articleApi'
import { useParams, Link } from 'react-router-dom'
import _ from 'lodash'
import DOMPurify from 'dompurify';
import moment from 'moment'
import hljs from 'highlight.js';
import { AppContext } from '../../AppContext';
import styled from 'styled-components'
import ROUTES from '../../ultis/routes';
const UserIcon = require('../../assets/user.png')


const DarkTheme = styled.div`
.hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #282a36;
  }
  
  .hljs-built_in,
  .hljs-selector-tag,
  .hljs-section,
  .hljs-link {
    color: #8be9fd;
  }
  
  .hljs-keyword {
    color: #ff79c6;
  }
  
  .hljs,
  .hljs-subst {
    color: #f8f8f2;
  }
  
  .hljs-title {
    color: #50fa7b;
  }
  
  .hljs-string,
  .hljs-meta,
  .hljs-name,
  .hljs-type,
  .hljs-attr,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #f1fa8c;
  }
  
  .hljs-comment,
  .hljs-quote,
  .hljs-deletion {
    color: #6272a4;
  }
  
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-title,
  .hljs-section,
  .hljs-doctag,
  .hljs-type,
  .hljs-name,
  .hljs-strong {
    font-weight: bold;
  }
.hljs-name, .hljs-attribute {
      color:#DC143C;
  }
  .hljs-literal,
  .hljs-number {
    color: #bd93f9;
  }
  
  .hljs-emphasis {
    font-style: italic;
  }
  
`





const ArticlePage = () => {
    const [article, setArticle] = useState({ tags: {}, content: '', title: '', comments: [], tags: [] })
    const params = useParams()
    const { comments, tags } = article
    const nodeRef = useRef(null)
    const { categories, tags: _tags, popular_article } = useContext(AppContext)
    useEffect(() => {
        window.scrollTo(0, 0)
        doGetArticleByID({ id: params.id }).then((response) => {
            setArticle(response.data)
        })
        setTimeout(() => {
            highlight()
        }, 500)
    }, [])
    const createMarkup = () => {
        return { __html: DOMPurify.sanitize(article.content) }
    }
    const highlight = () => {
        const nodes = nodeRef.current.querySelectorAll('pre')
        if (nodes) {
            nodes.forEach(node => {
                hljs.highlightBlock(node)
            })
        }
    }
    return (
        <>
            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-lg-8 px-md-5 py-5">
                            <h1 class="mb-3">{article.title}</h1>
                            <DarkTheme>
                                <div className="row ml-0" ref={nodeRef} style={{ display: "block" }} dangerouslySetInnerHTML={createMarkup()}>
                                </div>
                            </DarkTheme>
                            <div className="row" >
                                <div class="tag-widget post-tag-container mb-5">
                                    <div class="tagcloud">
                                        {
                                            tags.map((tag, index) => (
                                                <>

                                                    <Link key={index} to="#" class="tag-cloud-link">{_.get(tag, 'content')}</Link>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-5 font-weight-bold">{'Bình luận'}</h3>
                                <ul className="comment-list">
                                    {
                                        comments.map((comment, index) => (
                                            <>
                                                <li className="comment" key={index}>
                                                    <div className="vcard bio">
                                                        <img src={UserIcon} height="50" width="50" alt="Image placeholder" />
                                                    </div>
                                                    <div className="comment-body">
                                                        <h3>{_.get(comment, 'name')}</h3>
                                                        <div className="meta">{moment(comment.createdAt).format('MMM DD YYYY')}</div>
                                                        <p>{_.get(comment, 'message', '')}</p>
                                                    </div>
                                                </li>
                                            </>
                                        ))
                                    }
                                </ul></div>
                            {/* END comment-list */}
                            <div className="comment-form-wrap pt-5">
                                <h3 className="mb-5">Để lại bình luận của bạn</h3>
                                <div className="form-group">
                                    <label htmlFor="name">Họ và tên</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Tin nhắn</label>
                                    <textarea name id="message" cols={30} rows={10} className="form-control" defaultValue={""} />
                                </div>
                                <div className="form-group">
                                    <button className="btn py-3 px-4 btn-primary">Gửi</button>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4 sidebar  bg-light pt-5">
                            <div className="sidebar-box pt-md-4">
                                <form action="#" className="search-form">
                                    <div className="form-group">
                                        <span className="icon icon-search" />
                                        <input type="text" className="form-control" placeholder="Tìm kiếm bài viết" />
                                    </div>
                                </form>
                            </div>
                            <div className="sidebar-box ">
                                <h3 className="sidebar-heading">Phân loại</h3>
                                <ul className="categories">
                                    {
                                        categories.map((category, index) => (
                                            <>
                                                <li key={index}>
                                                    <Link to="#">{_.get(category, 'content')}<span>({_.get(category, 'count_article')})</span></Link>
                                                </li>
                                            </>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="sidebar-box ">
                                <h3 className="sidebar-heading">Lượt đọc nhiều nhất</h3>
                                {popular_article.map((article, index) => (
                                    <>
                                        <div key={index} className="block-21 mb-4 d-flex">
                                            <a className="blog-img mr-4" style={{ backgroundImage: `url(${'https://ngao.tech' + _.get(article, 'banner.url')})` }} />
                                            <div className="text">

                                                <h3 className="heading">
                                                    <Link replace={ROUTES.ARTICLE_ROUTE + article._id}> {_.get(article, 'title')}</Link>
                                                </h3>
                                                <div className="meta">
                                                    <div><a href="#"><span className="icon-calendar" /> {moment(article.createdAt).format("MMM DD YYYY")}</a></div>
                                                    <div><a href="#"><span className="icon-person" /> Admin</a></div>
                                                    <div><a href="#"><span className="icon-chat" /> {article.comments.length}</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <div className="sidebar-box ">
                                <h3 className="sidebar-heading">Tags</h3>
                                <ul className="tagcloud">
                                    {
                                        _tags.map((tag, index) => (
                                            <>
                                                <Link to="#" className="tag-cloud-link">{_.get(tag, 'content')}</Link>
                                            </>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* <div className="sidebar-box subs-wrap img" style={{ backgroundImage: '' }}>
                            <div className="overlay" />
                            <h3 className="mb-4 sidebar-heading">Newsletter</h3>
                            <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia</p>
                            <form action="#" className="subscribe-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Email Address" />
                                    <input type="submit" defaultValue="Subscribe" className="mt-2 btn btn-white submit" />
                                </div>
                            </form>
                        </div> */}
                            {/* <div className="sidebar-box ">
                            <h3 className="sidebar-heading">Lưu trữ</h3>
                                <ul className="categories">                                    
                                    <li><a href="#">July 2020 <span>(2)</span></a></li>                                    
                                </ul>
                        </div>
                        <div className="sidebar-box">
                            <h3 className="sidebar-heading">Paragraph</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut.</p>
                        </div> */}
                        </div>{/* END COL */}
                    </div>
                </div>
            </section>
        </>
    )
}
export default memo(ArticlePage)