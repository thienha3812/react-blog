import React, { useMemo, useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Home from './pages/home';
import ArticlePage from './pages/article'
import { AppProvider } from './AppContext'
import { doGetCategories } from './api/categoryApi';
import { doGetPopularArticle } from './api/articleApi';
import _ from 'lodash'
import ROUTES from "./ultis/routes";
import { doGetTags } from './api/tagApi';
import Loading from 'react-loading';
import "./App.css";
import CategoryPage from './pages/category';

const App = () => {
  const [categories, setCategories] = useState([])
  const [popular_article, setPopularArticle] = useState([])
  const location = useLocation()
  const [tags, setTags] = useState([])
  useEffect(() => {
    doGetTags().then(response => {
      setTags(response.data)
    })
    doGetPopularArticle().then(response => {
      setPopularArticle(response.data)
    })
    doGetCategories().then(response => {
      setCategories(response.data)
    })
  }, [])

  const activeLink = useCallback(() => {
    if (window.location.pathname === '/') {
      return 'colorlib-active'
    }
    return ''
  }, [window.location.pathname])
  const toggleNavbar = () => {

    document.getElementById('nav-toggle').classList.toggle('active')
    document.getElementById('colorlib-aside').classList.toggle('fade-navbar')


  }
  return (
    <AppProvider value={{ categories, popular_article, tags }}>
      <div className="App">
        <div id="colorlib-page">
          <a href="#" id="nav-toggle" onClick={() => toggleNavbar()} className="js-colorlib-nav-toggle colorlib-nav-toggle"><i /></a>
          <aside id="colorlib-aside" style={{ width: "20%" }} role="complementary" className="js-fullheight">
            <nav id="colorlib-main-menu" role="navigation">
              <ul>
                <li className={activeLink()}><Link to="/trang-chu">Trang chủ</Link></li>
                {categories.slice(0, 5).map((category, index) => (
                  <>
                    <li key={{ index }} ><Link to="/">{_.get(category, 'content')}</Link></li>
                  </>
                ))}
                {/* <li><a href="about.html">About</a></li>
                  <li><a href="contact.html">Contact</a></li> */}
              </ul>
            </nav>
            <div className="colorlib-footer">
              <div className="mb-4">
                <h3>Đăng ký nhận bản tin</h3>
                <form action="#" className="colorlib-subscribe-form">
                  <div className="form-group d-flex">
                    <div className="icon"><span className="icon-paper-plane" /></div>
                    <input type="text" className="form-control" placeholder="Nhập email của bạn" />
                  </div>
                </form>
              </div>
            </div>
          </aside> {/* END ASIDE */}
          <div id="colorlib-main" style={{ width: "80%" }}>
            <Route path="/trang-chu?page=page" component={Home} />
            <Route exact path="/trang-chu" component={Home} />
            <Route path="/trang-chu/?page=:page" component={Home} />
            <Route path="/bai-viet/:id?" component={ArticlePage} />
            <Route path="/lap-trinh" component={()=> <CategoryPage category={"lap-trinh"} />} />
            <Route render={() => {
              if (location.pathname === "/") {
                return <Redirect to="/trang-chu" />
              }              
            }} />
          </div>{/* END MAIN */}
        </div>
        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}

      </div>
    </AppProvider>

  );
}

export default App;
