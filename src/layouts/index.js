import React from 'react'



export const CustomLayout = ({ children }) => {
    return (
        <div className="App">
            <div id="colorlib-page">
                <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i /></a>
                <aside id="colorlib-aside" style={{ width: "20%" }} role="complementary" className="js-fullheight">
                    <nav id="colorlib-main-menu" role="navigation">
                        <ul>
                            {/* <li className={activeLink()}><Link to="/trang-chu">Trang chủ</Link></li>
                {categories.slice(0, 5).map((category, index) => (
                  <>
                    <li key={{ index }} ><Link to="/">{_.get(category, 'content')}</Link></li>
                  </>
                ))} */}
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
                    {children}
                </div>{/* END MAIN */}
            </div>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}

        </div>
    )
}
export default CustomLayout