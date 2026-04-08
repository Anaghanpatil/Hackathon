import React from 'react';
import { ShoppingCart, Plus, Search, CheckCircle2 } from 'lucide-react';
import HeaderNav from '../components/HeaderNav';
import Tag from '../components/Tag';
import Card from '../components/Card';
import Button from '../components/Button';
import './Pharmacy.css';

export default function Pharmacy({ navigate, cartCount, setCartCount }) {
  const CartIcon = (
    <div className="cart-icon-wrap" onClick={() => navigate('cart')}>
      <ShoppingCart size={22} />
      {cartCount > 0 && <div className="cart-badge">{cartCount}</div>}
    </div>
  );

  const handleAdd = () => setCartCount(c => c + 1);

  return (
    <div className="screen animate-fade-in">
      <HeaderNav title="Pharmacy" onBack={() => navigate('home')} rightContent={CartIcon} />
      
      <div className="content">
        <div className="delivery-banner">
          <CheckCircle2 size={16} />
          <span>10-min delivery available in your area</span>
        </div>
        
        <div className="search-bar glass">
          <Search size={18} className="search-icon" />
          <input className="search-input" placeholder="Search medicines..." />
        </div>
        
        <div className="pill-scroll">
          <Button variant="primary" size="sm" className="pill-btn">All</Button>
          <Button variant="secondary" size="sm" className="pill-btn">Chronic care</Button>
          <Button variant="secondary" size="sm" className="pill-btn">Fever & pain</Button>
          <Button variant="secondary" size="sm" className="pill-btn">Vitamins</Button>
        </div>

        <h2 className="section-title">Prescribed for you</h2>
        <Card className="med-list">
          <div className="med-item">
            <div className="med-img-ph">M</div>
            <div className="med-info">
              <div className="med-name">Metformin 500mg</div>
              <div className="med-sub">Diabetes · Strip of 10 · <Tag color="blue" className="med-tag">Rx</Tag></div>
            </div>
            <div className="med-price-box">
              <div className="med-price">₹42</div>
              <div className="med-unit">strip</div>
            </div>
            <button className="add-btn" onClick={handleAdd}><Plus size={16}/></button>
          </div>
          
          <div className="med-item border-top">
            <div className="med-img-ph" style={{background: 'var(--color-warning-light)', color: 'var(--color-warning)'}}>V</div>
            <div className="med-info">
              <div className="med-name">Vitamin D3 60K IU</div>
              <div className="med-sub">Weekly · Strip of 4 · <Tag color="green" className="med-tag">OTC</Tag></div>
            </div>
            <div className="med-price-box">
              <div className="med-price">₹88</div>
              <div className="med-unit">strip</div>
            </div>
            <button className="add-btn" onClick={handleAdd}><Plus size={16}/></button>
          </div>
        </Card>

        <h2 className="section-title" style={{ marginTop: '24px' }}>Popular OTC</h2>
        <Card className="med-list">
          <div className="med-item">
            <div className="med-img-ph" style={{background: 'var(--color-accent-light)', color: 'var(--color-accent)'}}>C</div>
            <div className="med-info">
              <div className="med-name">Cetrizine 10mg</div>
              <div className="med-sub">Allergy · Strip of 10 · <Tag color="green" className="med-tag">OTC</Tag></div>
            </div>
            <div className="med-price-box">
              <div className="med-price">₹18</div>
              <div className="med-unit">strip</div>
            </div>
            <button className="add-btn" onClick={handleAdd}><Plus size={16}/></button>
          </div>
          <div className="med-item border-top">
            <div className="med-img-ph" style={{background: 'var(--color-info-light)', color: 'var(--color-info)'}}>P</div>
            <div className="med-info">
              <div className="med-name">Paracetamol 650mg</div>
              <div className="med-sub">Fever & pain · Strip of 15 · <Tag color="green" className="med-tag">OTC</Tag></div>
            </div>
            <div className="med-price-box">
              <div className="med-price">₹24</div>
              <div className="med-unit">strip</div>
            </div>
            <button className="add-btn" onClick={handleAdd}><Plus size={16}/></button>
          </div>
        </Card>
      </div>
    </div>
  );
}
