import React from 'react';

const Homepage: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Athletic Wear</div>
        <nav style={styles.nav}>
          <a href="#categories" style={styles.navLink}>
            Shop
          </a>
          <a href="#featured" style={styles.navLink}>
            Featured
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1>Welcome to Athletic Wear</h1>
        <p>Shop the latest and greatest in performance gear</p>
        <button style={styles.heroButton}>Shop Now</button>
      </section>

      {/* Categories Section */}
      <section id="categories" style={styles.categories}>
        {[
          { name: "Men's Wear", img: "https://i.ebayimg.com/images/g/jSEAAOSw38lklsTA/s-l1200.jpg" },
          { name: "Women's Wear", img: "https://m.media-amazon.com/images/I/71cmnm8RHOL.jpg" },
          { name: "Accessories", img: "https://sc01.alicdn.com/kf/H37aa25b79a754bb0b77cbed8c3c284dbv.jpg" },
        ].map((category) => (
          <div style={styles.category} key={category.name}>
            <img src={category.img} alt={category.name} style={styles.categoryImage} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </section>

      {/* Featured Products Section */}
      <section id="featured" style={styles.featuredProducts}>
        <h2>Featured Products</h2>
        <div style={styles.productList}>
          {[
            { name: "Running Shoes", price: "$120.00", img: "https://via.placeholder.com/300" },
            { name: "Compression Tights", price: "$60.00", img: "https://via.placeholder.com/300" },
            { name: "Sports Bra", price: "$50.00", img: "https://via.placeholder.com/300" },
            { name: "Fitness Watch", price: "$150.00", img: "https://via.placeholder.com/300" },
          ].map((product) => (
            <div style={styles.product} key={product.name}>
              <img src={product.img} alt={product.name} style={styles.productImage} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Athletic Wear. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// Inline Styles
const styles = {
  header: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  } as React.CSSProperties,
  nav: {
    display: "flex",
    gap: "1rem",
  } as React.CSSProperties,
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  } as React.CSSProperties,
  hero: {
    background: "url('https://www.travelandleisure.com/thmb/sIKqINHdhY5I3Tk_VVjtN1s04vg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/yosemite-national-park-falls-trail-CALIHIKES0720-9f437afa3bcd44ff9f6507f28fd4805c.jpg') no-repeat center center/cover",
    color: "#fff",
    textAlign: "center",
    padding: "5rem 2rem",
  } as React.CSSProperties,
  heroButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,
  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    padding: "2rem",
    justifyContent: "center",
  } as React.CSSProperties,
  category: {
    flex: "1 1 calc(33.333% - 1rem)",
    backgroundColor: "#f4f4f4",
    textAlign: "center",
    padding: "1rem",
    borderRadius: "8px",
  } as React.CSSProperties,
  categoryImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  } as React.CSSProperties,
  featuredProducts: {
    padding: "2rem",
    textAlign: "center",
  } as React.CSSProperties,
  productList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  } as React.CSSProperties,
  product: {
    flex: "1 1 calc(25% - 1rem)",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#fff",
  } as React.CSSProperties,
  productImage: {
    maxWidth: "100%",
    borderRadius: "8px",
  } as React.CSSProperties,
  footer: {
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
    fontSize: "0.9rem",
  } as React.CSSProperties,
};

export default Homepage;
