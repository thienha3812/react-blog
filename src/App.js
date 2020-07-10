import React, { Suspense ,useState, useEffect, useCallback } from 'react';
import { Route,Link, useHistory, useLocation } from 'react-router-dom';
import { AppProvider } from './AppContext'
import { doGetCategories } from './api/categoryApi';
import { doGetPopularArticle } from './api/articleApi';
import ROUTES from "./ultis/routes";
import { doGetTags } from './api/tagApi';
import Loading from 'react-loading';
import "./App.css";

const CategoryPage = React.lazy(()=> import('./pages/category'))
const ArticlePage = React.lazy(()=>import('./pages/article'))
const HomePage = React.lazy(()=> import('./pages/home'))

const App = () => {
  const [categories, setCategories] = useState([])
  const [popular_article, setPopularArticle] = useState([])  
  const location = useLocation()
  const [tags, setTags] = useState([])
  const history = useHistory()
  
  useEffect(()=>{    
    if(location.pathname=== '/'){
      history.replace({pathname : ROUTES.HOME_ROUTE})
    }
  },[location.pathname])
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
  },[])  
  const activeLink = useCallback((link) => {
    if (window.location.pathname === link) {
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
        <Suspense fallback={<Loading/>}>
        <div className="App">
          <div id="colorlib-page">
            <a href="#" id="nav-toggle" onClick={() => toggleNavbar()} className="js-colorlib-nav-toggle colorlib-nav-toggle"><i /></a>
            <aside id="colorlib-aside" style={{ width: "20%" }} role="complementary" className="js-fullheight">
              <nav id="colorlib-main-menu" role="navigation">
                <ul>
                  <li className={activeLink('/trang-chu')}><Link to="/trang-chu">Trang chủ</Link></li>
                  <li className={activeLink('/lap-trinh')}><Link to="/lap-trinh">Lập trình</Link></li>
                  <li className={activeLink('/cong-nghe')}><Link to="/cong-nghe">Công nghệ</Link></li>
                  <li className={activeLink('/chuyen-ben-le')}><Link to="/chuyen-ben-le">Chuyện bên lề</Link></li>                  
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
            <div id="colorlib-main">
              <Route path="/trang-chu?page=page" component={HomePage} />
              <Route exact path="/trang-chu" component={HomePage} />
              <Route path="/trang-chu/?page=:page" component={HomePage} />
              <Route path="/bai-viet/:id?" component={ArticlePage} />
              <Route exact path={ROUTES.CODING_ROUTE} render={(props)=>{
                  return <CategoryPage {...props} type={1} />
                }} />
                <Route exact path={ROUTES.TECHNOLOGY_ROUTE} render={(props)=>{
                  return <CategoryPage {...props} type={2} />
                }} />
                <Route exact path={ROUTES.ALLTHING_ROUTE} render={(props)=>{
                  return <CategoryPage {...props} type={3} />
                }} />             
            </div>{/* END MAIN */}
          </div>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        </div>
        </Suspense>
      </AppProvider>

  );
}

export default App;
