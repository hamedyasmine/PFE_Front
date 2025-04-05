function FooterItem({ title, children }) {
    return (
      <div className="single-footer-caption mb-50">
        <div className="footer-tittle">
          <h4>{title}</h4>
          <div className="footer-pera">
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  export default FooterItem;
  