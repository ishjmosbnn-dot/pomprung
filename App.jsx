import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { products, getProductById } from "./products";
import { useCart } from "./CartContext";

const money = (n) => `฿${n.toLocaleString("th-TH")}`;

function Header() {
  const { totalItems } = useCart();
  return (
    <header className="header">
      <div className="container nav">
        <Link to="/" className="brand"><span>🌿</span> Pomprung</Link>
        <nav>
          <NavLink to="/" end>หน้าแรก</NavLink>
          <NavLink to="/menu">เมนู</NavLink>
          <NavLink to="/search">ค้นหา</NavLink>
          <NavLink to="/orders">คำสั่งซื้อ</NavLink>
          <NavLink to="/profile">โปรไฟล์</NavLink>
        </nav>
        <Link className="cart-btn" to="/cart">🛒 <span>{totalItems}</span></Link>
      </div>
    </header>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="food-image">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
        <p className="muted">{product.description}</p>
        <div className="card-bottom">
          <strong>{money(product.price)}</strong>
          <button onClick={() => addToCart(product)}>เพิ่มลงตะกร้า</button>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const featured = products.slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">POMPRUNG THAI FOOD</span>
            <h1>อร่อยแบบบ้านๆ<br />ส่งตรงถึงหน้าบ้านคุณ</h1>
            <p>อาหารไทยรสชาติอบอุ่น วัตถุดิบคัดสรร และปรุงสดทุกออเดอร์</p>
            <div className="actions">
              <Link className="primary" to="/menu">ดูเมนูทั้งหมด</Link>
              <Link className="secondary" to="/search">ค้นหาเมนู</Link>
            </div>
          </div>
          <div className="hero-art">🍲</div>
        </div>
      </section>
      <main className="container section">
        <div className="section-head">
          <div><span className="eyebrow">RECOMMENDED</span><h2>เมนูแนะนำ</h2></div>
          <Link to="/menu">ดูทั้งหมด →</Link>
        </div>
        <div className="grid">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </main>
    </>
  );
}

function Menu() {
  const [category, setCategory] = useState("ทั้งหมด");
  const categories = ["ทั้งหมด", ...new Set(products.map((p) => p.category))];
  const shown = category === "ทั้งหมด" ? products : products.filter((p) => p.category === category);
  return (
    <main className="container section">
      <div className="page-title"><span className="eyebrow">OUR MENU</span><h1>เมนูอาหาร</h1><p>เลือกเมนูโปรดของคุณได้เลย</p></div>
      <div className="chips">{categories.map(c => <button className={category === c ? "chip active" : "chip"} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div>
      <div className="grid">{shown.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </main>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  if (!product) return <Empty title="ไม่พบเมนู" />;
  return (
    <main className="container section">
      <Link className="back" to="/menu">← กลับไปเมนู</Link>
      <div className="detail">
        <div className="detail-image"><img src={product.image} alt={product.name} /></div>
        <div className="detail-info">
          <span className="tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="price">{money(product.price)}</div>
          <p>{product.description}</p>
          <ul className="benefits"><li>✓ ปรุงสดใหม่</li><li>✓ บรรจุอย่างดีสำหรับจัดส่ง</li><li>✓ จัดส่งในพื้นที่บริการ</li></ul>
          <button className="primary wide" onClick={() => { addToCart(product); navigate("/cart"); }}>เพิ่มลงตะกร้าและดูตะกร้า</button>
        </div>
      </div>
    </main>
  );
}

function Cart() {
  const { cart, updateQty, removeFromCart, subtotal, deliveryFee, total } = useCart();
  if (!cart.length) return <Empty title="ตะกร้ายังว่าง" text="เลือกเมนูอร่อยๆ แล้วกลับมาที่นี่ได้เลย" />;
  return (
    <main className="container section narrow">
      <div className="page-title"><span className="eyebrow">YOUR CART</span><h1>ตะกร้าสินค้า</h1></div>
      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt="" />
            <div className="cart-main"><h3>{item.name}</h3><span>{money(item.price)}</span></div>
            <div className="qty"><button onClick={() => updateQty(item.id, item.qty - 1)}>−</button><b>{item.qty}</b><button onClick={() => updateQty(item.id, item.qty + 1)}>+</button></div>
            <button className="remove" onClick={() => removeFromCart(item.id)}>ลบ</button>
          </div>
        ))}
      </div>
      <div className="summary">
        <div><span>ค่าสินค้า</span><b>{money(subtotal)}</b></div>
        <div><span>ค่าจัดส่ง</span><b>{money(deliveryFee)}</b></div>
        <div className="total-row"><span>รวมทั้งหมด</span><strong>{money(total)}</strong></div>
        <Link className="primary wide" to="/checkout">ไปชำระเงิน</Link>
      </div>
    </main>
  );
}

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "โอนผ่านธนาคาร" });
  if (!cart.length) return <Empty title="ยังไม่มีสินค้าให้ชำระเงิน" />;
  const submit = (e) => {
    e.preventDefault();
    const order = {
      id: `PM-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      items: cart,
      total,
      status: "กำลังเตรียมอาหาร",
      customer: form
    };
    const orders = JSON.parse(localStorage.getItem("pomprung-orders") || "[]");
    localStorage.setItem("pomprung-orders", JSON.stringify([order, ...orders]));
    clearCart();
    navigate(`/order-success?order=${order.id}`);
  };
  return (
    <main className="container section narrow">
      <div className="page-title"><span className="eyebrow">CHECKOUT</span><h1>ชำระเงิน</h1></div>
      <form className="form" onSubmit={submit}>
        <label>ชื่อผู้รับ<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="ชื่อ-นามสกุล" /></label>
        <label>เบอร์โทรศัพท์<input required value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="08x-xxx-xxxx" /></label>
        <label>ที่อยู่จัดส่ง<textarea required value={form.address} onChange={e => setForm({...form, address:e.target.value})} placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด" /></label>
        <label>วิธีชำระเงิน<select value={form.payment} onChange={e => setForm({...form, payment:e.target.value})}><option>โอนผ่านธนาคาร</option><option>เก็บเงินปลายทาง</option></select></label>
        <div className="checkout-total"><span>ยอดชำระ</span><strong>{money(total)}</strong></div>
        <button className="primary wide" type="submit">ยืนยันคำสั่งซื้อ</button>
      </form>
    </main>
  );
}

function Search() {
  const [q, setQ] = useState("");
  const shown = useMemo(() => products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <main className="container section">
      <div className="page-title"><span className="eyebrow">SEARCH</span><h1>ค้นหาเมนู</h1></div>
      <input className="search" value={q} onChange={e => setQ(e.target.value)} placeholder="🔎 ค้นหาชื่ออาหาร..." autoFocus />
      <div className="grid">{shown.map(p => <ProductCard key={p.id} product={p} />)}</div>
      {!shown.length && <Empty title="ไม่พบเมนูที่ค้นหา" />}
    </main>
  );
}

function Profile() {
  return <main className="container section narrow"><div className="profile"><div className="avatar">👤</div><h1>โปรไฟล์</h1><p className="muted">ลูกค้า Pomprung</p><div className="profile-box"><b>สมาชิกทั่วไป</b><span>สั่งอาหารและติดตามคำสั่งซื้อของคุณได้จากที่นี่</span></div><Link className="primary wide" to="/orders">ดูประวัติคำสั่งซื้อ</Link></div></main>;
}

function Orders() {
  const orders = JSON.parse(localStorage.getItem("pomprung-orders") || "[]");
  return (
    <main className="container section narrow">
      <div className="page-title"><span className="eyebrow">ORDER HISTORY</span><h1>ประวัติคำสั่งซื้อ</h1></div>
      {!orders.length ? <Empty title="ยังไม่มีประวัติคำสั่งซื้อ" text="เมื่อสั่งอาหารแล้ว รายการจะปรากฏที่นี่" /> :
        <div className="orders">{orders.map(o => <div className="order" key={o.id}><div><b>{o.id}</b><span>{new Date(o.createdAt).toLocaleString("th-TH")}</span></div><div><span className="status">{o.status}</span><strong>{money(o.total)}</strong></div></div>)}</div>}
    </main>
  );
}

function Success() {
  const id = new URLSearchParams(location.search).get("order");
  return <main className="container section narrow"><div className="success"><div className="success-icon">✓</div><h1>สั่งซื้อสำเร็จ!</h1><p>ขอบคุณที่สั่งอาหารกับ Pomprung</p><b>เลขที่คำสั่งซื้อ: {id || "-"}</b><Link className="primary wide" to="/orders">ดูคำสั่งซื้อ</Link><Link className="secondary wide" to="/menu">สั่งเพิ่ม</Link></div></main>;
}

function Empty({ title, text = "ลองกลับไปเลือกเมนูที่น่าสนใจกัน" }) {
  return <main className="container section"><div className="empty"><div>🍃</div><h2>{title}</h2><p>{text}</p><Link className="primary" to="/menu">ไปดูเมนู</Link></div></main>;
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-success" element={<Success />} />
        <Route path="*" element={<Empty title="ไม่พบหน้านี้" />} />
      </Routes>
      <footer><div className="container">🌿 Pomprung · อาหารอร่อย ส่งตรงถึงบ้าน</div></footer>
    </div>
  );
}