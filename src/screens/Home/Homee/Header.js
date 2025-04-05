import HeaderItem from "../../../components/HomeItem/HeaderItem";

function Header() {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Find a Job", path: "/findjob" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header>
      <div className="header-area header-transparrent">
        <div className="headder-top header-sticky">
          <div className="container">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-lg-3 col-md-2">
                <div className="logo">
                  <a href="index.html">
                    <img src="assets/img/logo/logo.png" alt="" />
                  </a>
                </div>
              </div>

              {/* Menu principal */}
              <div className="col-lg-9 col-md-9">
                <div className="menu-wrapper">
                  <div className="main-menu">
                    <nav className="d-none d-lg-block">
                      <ul id="navigation">
                        {menuItems.map((item, index) => (
                          <HeaderItem key={index} {...item} />
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* Boutons pour Discuter et Login */}
                  <div className="header-btn d-none f-right d-lg-block">
                    <a href="/Chatbot" className="btn head-btn1">Discuter</a>
                    <a href="/login" className="btn head-btn2">Login</a>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
