import React, { Suspense, useEffect, useState, useCallback, useContext, memo } from 'react';
import { doGetArticle, doGetArticleByType } from '../../api/articleApi';
import _ from 'lodash'
import moment from 'moment';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import ROUTES from '../../ultis/routes';
import "./style.css"
import Delay from '../../components/delay';

const Category = ({ type }) => {
    const [articles, setArticles] = useState([])
    const [numberPage, setNumberPage] = useState(0)
    const { categories, popular_article, tags } = useContext(AppContext)
    const location = useLocation()
    const pageSelected = new URLSearchParams(location.search).get('page') || 1
    const history = useHistory()
    const maxPage = 5
    useEffect(() => {
        const pageSelected = new URLSearchParams(location.search).get('page')
        if (location.search == "" || pageSelected > 0) {
            return
        } else {
            history.push(ROUTES.HOME_ROUTE)
        }
    }, [location])
    useEffect(() => {
        window.scrollTo(0, 0)
        doGetArticleByType({ type, index: (pageSelected - 1) * 4 }).then(response => {
            setArticles(response.data.articles)
            setNumberPage(response.data.number_page)
        })
    }, [pageSelected])
    const renderPagination = useCallback(() => {
        const list = []
        list.push(<li className={pageSelected == 1 ? "active" : pageSelected == null && "active"} ><Link to={location.pathname}>1</Link></li>)
        if (numberPage > maxPage) {
            for (let i = 2; i <= maxPage; i++) {
                list.push(<li className={i == pageSelected && "active"} ><Link to={location.pathname + "?page=" + i}>{i}</Link></li>)
            }
        } else {
            for (let i = 2; i <= numberPage; i++) {
                list.push(<li className={i == pageSelected && "active"} ><Link to={location.pathname + "?page=" + i}>{i}</Link></li>)
            }
        }
        return list
    }, [numberPage, pageSelected, location.pathname])
    const prevPage = (e) => {
        if (Number.parseInt(pageSelected) === 1 || null) {
            e.preventDefault()
        }
    }
    const nextPage = (e) => {
        if (Number.parseInt(pageSelected) === Number.parseInt(numberPage)) {
            e.preventDefault()
        }
    }
    return (
        <>
            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container">
                    <div className="row d-flex h-auto">
                        <div className="col-xl-8 py-5 px-md-5">
                            <div className="row">
                                <h1>Danh mục {type === 1 && 'lập trình'} {type === 2 && 'công nghệ'} {type === 3 && 'chuyện bên lề'}</h1>
                            </div>
                            <div className="row pt-md-4">
                                {
                                    articles.slice(0, 6).map((article, index) => (
                                        <>
                                            <div className="row">
                                                <div className="col-md-12 banner" style={{ backgroundImage: `url(${'https://ngao.tech' + _.get(article, 'banner.url')})` }} />
                                                <div className="col-md-12" >
                                                    <div className="blog-entry  d-md-flex">
                                                        <div className="text text-2 w-100">
                                                            <h3 className="mb-2">
                                                                <Link to={ROUTES.ARTICLE_ROUTE + article._id}>
                                                                    {article.title}
                                                                </Link>
                                                            </h3>
                                                            <div className="meta-wrap">
                                                                <p className="meta">
                                                                    <span><i className="icon-calendar mr-2" />{moment(article.createdAt).format("MMM DD YYYY")}</span>
                                                                    <span><Link to="#"><i className="icon-folder-o mr-2" />{_.get(article, 'category.content')}</Link></span>
                                                                    <span><i className="icon-comment2 mr-2" />{_.get(article, 'comments').length}</span>
                                                                    <span><i className="icon-eye mr-2" />{_.get(article, 'views')}</span>
                                                                </p>
                                                            </div>
                                                            <p className="mb-4">{_.get(article, 'sub_title')}<p>
                                                                <Link to={ROUTES.ARTICLE_ROUTE + article._id}>
                                                                    Xem thêm
                                                            </Link>
                                                            </p></p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>{/* END*/}
                            <Delay delay={500}>
                                <div className="row">
                                    <div className="col">
                                        <div className="block-27">
                                            <ul>
                                                <li><Link onClick={(e) => prevPage(e)} to={pageSelected > 0 && location.pathname + `?page=${Number.parseInt(pageSelected) - 1}`}>&lt;</Link></li>
                                                {renderPagination()}
                                                <li ><Link onClick={(e) => nextPage(e)} to={pageSelected < numberPage && location.pathname + `?page=${Number.parseInt(pageSelected) + 1}`} >&gt;</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Delay>


                        </div>
                        <div className="col-xl-4 sidebar  bg-light pt-5">
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
                                                <li key={{ index }}>
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
                                                    <Link to={ROUTES.ARTICLE_ROUTE + article._id}> {_.get(article, 'title')}</Link>
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
                                        tags.map((tag, index) => (
                                            <>
                                                <Link to="#" className="tag-cloud-link">{_.get(tag, 'content')}</Link>
                                            </>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* <div className="sidebar-box ">
                                <h3 className="sidebar-heading">Lưu trữ</h3>
                                <ul className="categories">
                                    <li><a href="#">July 2020 <span>(2)</span></a></li>
                                </ul>
                            </div> */}
                            {/* <div className="sidebar-box ">
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

export default memo(Category)