import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import AIFloatingWidget from '../components/AIFloatingWidget';
import styles from './Store.module.css';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  {
    id: 1,
    name: 'Café de Altura - Tostado Medio',
    price: 104.5,
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0BkMQRVcZfQvduEoM4-yPWGNBSBqSzaOhQpAK7jyPzsWSOoHlgLRW_PY7nJbIyaxrxzTnJo1TOQgv4IS3t_k_eXd7soYWobhd1e0ADSQere_NCURDGX2ncmxngfqMhkpLis7tfG3IuQvRZealThvo9QLBfF8T_-HjPXxREM-1HOGNa1m33tkEQizF3fNZJBtL5WTKza8MBOhD1B4srvNLI6GzYGpn81iBgyhMSSsN8fFLUvTe-UeeOV9uSnHHsFNKGOQQYQcSNVWI',
    type: 'Tostado Medio',
    origin: 'Bolivia',
  },
  {
    id: 2,
    name: 'Café Geisha - Tostado Claro',
    price: 153.0,
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8M9jIquD2aprhIRssAHFXb4-uvOwTD_KUAEHfw2WC_lnZbqHLf7GWsTgOyyg3T7rQpqP4Atf2rSKyVWWJs8ohI6jgBOyKfIedSnwK5yhmze3OjNrJVeEUWczTUCaNMLYBF2GIuDjOuQBduRolS7nFVvhn5IfkoJtwA5G7h8IPf29YdprjKUKKYp7ObLZQWWQ_22vgZVT9obQMMK-myB6DRYJ4HeGH-1upEZh2nHk3hW8E2pKvkuGxY6O5gQfMsHXp2O2ib8dOWQR8',
    type: 'Tostado Claro',
    origin: 'Colombia',
  },
  {
    id: 3,
    name: 'Café Orgánico - Tostado Oscuro',
    price: 125.0,
    available: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuMENI30xnO5Xvtpzex1p50sOoBrdp6LyJ0FthWxAW036JzBOeXuCXsBspYqkua0EG4ubkBQMmYMqnzTXQmo7__gNJrrOhq0Fr3QDEgoGSQd69PgM2t32d7a730x8FDgZH1mEf0s25b8mBOQefRpHIwZRYPjfHCSP3z0GxL0tkGXAl2SKYQeI0_VYnkYhsQQfpd1I2hYZZTDrQr1oJHx7AhZbzJE75bn5bRwaqRdGSENX6Nd2EwT6i4JyxpGE3eMxJo1hGxUqZReMu',
    type: 'Tostado Oscuro',
    origin: 'Perú',
  },
  {
    id: 4,
    name: 'Café Bourbon - Tostado Medio',
    price: 111.5,
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN5xUjHnTDoFKVQYm3ltbOsgqqyNgA-wDN7vB6kWRetncXx1BtVINfHhvrarMYGB7SiRS3uF3iW0ue4AKG6719AP2zS7FUqDfJNtsWTIcNUijYeFkPF50fcFfKi6Ge1JoXYcz_oy_quBsqZKYFO9_3eKEcNh0iNw2DBoHbPDvMd5AR0YwBPEqURIdMm7a-AesPiaYood9YdDe-T_vXN2ax7VtzJcpE3OAPrAWUeiuF0JhU1_jTR84GV4aQjh05QZsh66Bhb6QM-CRp',
    type: 'Tostado Medio',
    origin: 'Brasil',
  },
];

const typeOptions = ['Todos', 'Tostado Medio', 'Tostado Claro', 'Tostado Oscuro'];

export default function Store() {
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedAvailability, setSelectedAvailability] = useState('Todos');
  const [showToast, setShowToast] = useState(false);
  const [error] = useState(null);
  
  // Usar contexto global de carrito
  const { items, addToCart: addToCartCtx, removeFromCart: removeFromCartCtx, clearCart: clearCartCtx, total, count } = useCart();
  const [openMiniCart, setOpenMiniCart] = useState(false);
  const miniCartRef = useRef(null);
  const miniCartBtnRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenMiniCart(false); };
    const onClick = (e) => {
      if (!openMiniCart) return;
      const panel = miniCartRef.current;
      const btn = miniCartBtnRef.current;
      if (!panel || !btn) return;
      if (!panel.contains(e.target) && !btn.contains(e.target)) {
        setOpenMiniCart(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [openMiniCart]);

  // Filtros
  let filteredProducts = PRODUCTS;
  if (selectedType !== 'Todos') filteredProducts = filteredProducts.filter(p => p.type === selectedType);
  if (selectedAvailability !== 'Todos') {
    filteredProducts = filteredProducts.filter(p => selectedAvailability === 'Disponibles' ? p.available : !p.available);
  }

  // Handler para agregar al carrito con toast
  const handleAddToCart = (product) => {
    if (!product.available) return;
    addToCartCtx(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Estados vacíos y error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md border border-red-200">
        <img src="https://cdn-icons-png.flaticon.com/512/564/564619.png" alt="Error" className="h-20 mb-4" />
        <h3 className="text-xl font-semibold text-red-700">Error al cargar productos</h3>
        <p className="mt-2 text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <Header />
      <main className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 sm:p-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex justify-center">
              <h1 className="text-4xl md:text-5xl font-black tracking-[-0.033em] text-text-light dark:text-text-dark text-center">Nuestros Cafés</h1>
            </div>
            {/* Filtros superiores consistentes con el resto de la app */}
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-3xl rounded-xl border border-primary/10 bg-white dark:bg-background-dark/40 px-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-end justify-items-center gap-4">
                  {/* Tipo de grano */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text-light/80 dark:text-text-dark/80">Tipo de grano</label>
                    <select
                      value={selectedType}
                      onChange={(e)=>setSelectedType(e.target.value)}
                      className="w-full sm:w-56 h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {typeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  {/* Disponibilidad */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text-light/80 dark:text-text-dark/80">Disponibilidad</label>
                    <select
                      value={selectedAvailability}
                      onChange={(e)=>setSelectedAvailability(e.target.value)}
                      className="w-full sm:w-56 h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {['Todos','Disponibles','Agotados'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  {/* Limpiar */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={()=>{ setSelectedType('Todos'); setSelectedAvailability('Todos'); }}
                      className="inline-flex items-center gap-1 h-9 px-3 rounded-md text-sm font-bold bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                      <span>Limpiar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.productsGrid}>
              {filteredProducts.map(product => (
                <div key={product.id} className="flex flex-col gap-3 pb-3 group">
                  <div className={`w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl shadow-md overflow-hidden relative transition-transform duration-150 hover:scale-[1.025] hover:shadow-lg active:scale-[0.98] ${!product.available ? 'opacity-60' : ''}`} style={{ backgroundImage: `url('${product.image}')` }}>
                    {!product.available && (
                      <div className="absolute inset-0 bg-gray-500/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg tracking-wider bg-black/30 px-4 py-2 rounded-lg">Agotado</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 px-1">
                    <div>
                      <p className="text-base font-semibold text-text-light dark:text-text-dark">{product.name}</p>
                      <p className={`text-sm font-normal ${product.available ? 'text-text-light/70 dark:text-text-dark/70' : 'text-red-600 dark:text-red-400'}`}>{product.available ? 'Disponible' : 'Agotado'}</p>
                    </div>
                    <p className="text-lg font-bold text-text-light dark:text-text-dark">Bs {product.price.toFixed(2)}</p>
                    <div className="flex flex-col gap-2">
                      <button
                        className={`flex w-full min-w-[84px] items-center justify-center rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-all duration-150 ${product.available ? 'bg-primary text-white hover:bg-primary/90 active:scale-[0.97] focus:ring-2 focus:ring-primary/40' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                        onClick={() => product.available && handleAddToCart(product)}
                        disabled={!product.available}
                      >
                        <span className="truncate">Agregar al carrito</span>
                      </button>
                      <button className="flex w-full min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/20 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all duration-150">
                        <span className="truncate">Ver más</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className={styles.emptyState}>
                  <p>No hay productos disponibles con este filtro</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Mini Carrito flotante */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Toast */}
        {showToast && (
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-green-100 p-3 shadow-lg border border-green-200">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <p className="text-sm font-medium text-green-800">Agregado al carrito</p>
          </div>
        )}

        {/* Botón flotante */}
        <button
          ref={miniCartBtnRef}
          type="button"
          className={styles.miniCartFab}
          aria-label="Abrir carrito"
          onClick={() => setOpenMiniCart(v => !v)}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span>Carrito</span>
          <span className={styles.miniCartBadge}>{count}</span>
        </button>

        {/* Panel mini-carrito */}
        {openMiniCart && (
          <div ref={miniCartRef} className={styles.miniCartPanel} role="dialog" aria-label="Carrito de compras">
            <div className={styles.miniCartHeader}>
              <span>Carrito</span>
              <button className={styles.miniCartClose} onClick={() => setOpenMiniCart(false)} aria-label="Cerrar">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className={styles.miniCartBody}>
              {items.length === 0 ? (
                <div className="bg-gradient-to-br from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20 rounded-lg p-6 text-center border-2 border-dashed border-primary/30">
                  <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Carrito vacío" style={{ width: 64, margin: '0 auto 12px' }} />
                  <div className="text-base font-bold text-gray-900 dark:text-white mb-2">Tu carrito está vacío</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">¡Explora la tienda y agrega productos!</div>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-primary/20 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="font-semibold text-text-light dark:text-text-dark text-sm line-clamp-1">{item.name}</div>
                        <div className="text-xs text-text-light/70 dark:text-text-dark/70">Bs {item.price.toFixed(2)}</div>
                    </div>
                    {/* Botones de cantidad del carrito: '-' y '+' */}
                    <div className="flex items-center gap-2">
                      {/* Botón para disminuir cantidad (-) */}
                      <button 
                        className="w-8 h-8 rounded-xl font-bold text-lg flex items-center justify-center border bg-white text-red-600 border-red-400 hover:bg-red-50 hover:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300" 
                        style={{ color: '#dc2626', backgroundColor: '#fff', borderColor: '#f87171' }}
                        onClick={() => removeFromCartCtx(item.id)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold min-w-[1.5rem] text-center">{item.qty}</span>
                      {/* Botón para aumentar cantidad (+) */}
                      <button 
                        className="w-8 h-8 rounded-xl font-bold text-lg flex items-center justify-center border bg-white text-green-600 border-green-400 hover:bg-green-50 hover:border-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300" 
                        style={{ color: '#16a34a', backgroundColor: '#fff', borderColor: '#4ade80' }}
                        onClick={() => addToCartCtx(item)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={styles.miniCartFooter}>
              <div className="font-bold text-primary">Total: Bs {total.toFixed(2)}</div>
              <button className="px-3 py-2 rounded-xl bg-white text-red-600 font-semibold border border-red-400 transition-colors hover:bg-red-50 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed" onClick={clearCartCtx} disabled={items.length === 0}>Vaciar</button>
            </div>
          </div>
        )}
      </div>

      {/* Widget flotante de Asistente IA */}
      <AIFloatingWidget contexto="tienda" />
    </div>
  );
}
