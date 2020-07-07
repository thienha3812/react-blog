import React, { useState, useEffect, useContext } from 'react'
import { doGetArticleByID } from '../../api/articleApi'
import { useParams, Link } from 'react-router-dom'
import _ from 'lodash'
import DOMPurify from 'dompurify';
import moment from 'moment'
import { AppContext } from '../../AppContext';
const UserIcon = require('../../assets/user.png')




const ArticlePage = () => {
    const [article, setArticle] = useState({ tags: {}, content: '', title: '', comments: [], tags: [] })
    const params = useParams()
    const { comments, tags } = article
    const { categories } = useContext(AppContext)
    useEffect(() => {
        window.scrollTo(0,0)
        doGetArticleByID({ id: params.id }).then((response) => {
            setArticle(response.data)
        })
    }, [])
    const createMarkup = () => {
        return { __html: DOMPurify.sanitize(_.unescape(article.content)) }
    }
    return (
        <section className="ftco-section ftco-no-pt ftco-no-pb">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-lg-8 px-md-5 py-5">
                        <h1 class="mb-3">{article.title}</h1>
                        <div className="row ml-0" style={{ display: "block" }} dangerouslySetInnerHTML={createMarkup()}>
                        </div>
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
                                                    <p>{_.get(comment,'message','')}</p>                                                    
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
                    <div className="col-lg-4 sidebar doGetArticle bg-light pt-5">
                        <div className="sidebar-box pt-md-4">
                            <form action="#" className="search-form">
                                <div className="form-group">
                                    <span className="icon icon-search" />
                                    <input type="text" className="form-control" placeholder="Tìm kiếm bài viết" />
                                </div>
                            </form>
                        </div>
                        <div className="sidebar-box doGetArticle">
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
                        <div className="sidebar-box doGetArticle">
                            <h3 className="sidebar-heading">Popular Articles</h3>
                            <div className="block-21 mb-4 d-flex">
                                <a className="blog-img mr-4" style={{ backgroundImage: 'url(images/image_1.jpg)' }} />
                                <div className="text">
                                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                                    <div className="meta">
                                        <div><a href="#"><span className="icon-calendar" /> June 28, 2019</a></div>
                                        <div><a href="#"><span className="icon-person" /> Dave Lewis</a></div>
                                        <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-21 mb-4 d-flex">
                                <a className="blog-img mr-4" style={{ backgroundImage: 'url(images/image_2.jpg)' }} />
                                <div className="text">
                                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                                    <div className="meta">
                                        <div><a href="#"><span className="icon-calendar" /> June 28, 2019</a></div>
                                        <div><a href="#"><span className="icon-person" /> Dave Lewis</a></div>
                                        <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-21 mb-4 d-flex">
                                <a className="blog-img mr-4" style={{ backgroundImage: 'url(images/image_3.jpg)' }} />
                                <div className="text">
                                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                                    <div className="meta">
                                        <div><a href="#"><span className="icon-calendar" /> June 28, 2019</a></div>
                                        <div><a href="#"><span className="icon-person" /> Dave Lewis</a></div>
                                        <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-box doGetArticle">
                            <h3 className="sidebar-heading">Tag Cloud</h3>
                            <ul className="tagcloud">
                                <a href="#" className="tag-cloud-link">animals</a>
                                <a href="#" className="tag-cloud-link">human</a>
                                <a href="#" className="tag-cloud-link">people</a>
                                <a href="#" className="tag-cloud-link">cat</a>
                                <a href="#" className="tag-cloud-link">dog</a>
                                <a href="#" className="tag-cloud-link">nature</a>
                                <a href="#" className="tag-cloud-link">leaves</a>
                                <a href="#" className="tag-cloud-link">food</a>
                            </ul>
                        </div>
                        <div className="sidebar-box subs-wrap img" style={{ backgroundImage: '' }}>
                            <div className="overlay" />
                            <h3 className="mb-4 sidebar-heading">Newsletter</h3>
                            <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia</p>
                            <form action="#" className="subscribe-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Email Address" />
                                    <input type="submit" defaultValue="Subscribe" className="mt-2 btn btn-white submit" />
                                </div>
                            </form>
                        </div>
                        <div className="sidebar-box ">
                            <h3 className="sidebar-heading">Lưu trữ</h3>
                                <ul className="categories">                                    
                                    <li><a href="#">July 2020 <span>(2)</span></a></li>                                    
                                </ul>
                        </div>
                        <div className="sidebar-box">
                            <h3 className="sidebar-heading">Paragraph</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut.</p>
                        </div>
                    </div>{/* END COL */}
                </div>
            </div>
        </section>

    )
}
export default ArticlePage