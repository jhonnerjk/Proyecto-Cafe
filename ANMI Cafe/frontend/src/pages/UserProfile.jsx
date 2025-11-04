import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Avatar from '../components/Avatar';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../contexts/useAuth';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user: authUser, logout } = useAuth();
  const { purchases } = useCart();
  const { paymentMethods, addPaymentMethod, removePaymentMethod } = useUser();
  const [tab, setTab] = useState('recetas');
  
  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/perfil' } });
    }
  }, [isAuthenticated, navigate]);
  
  // Datos de usuario desde auth (sin hardcodear)
  const [user, setUser] = useState({
    displayName: authUser?.nombre || 'Usuario',
    username: `@${authUser?.email?.split('@')[0] || 'usuario'}`,
  });
  
  const [showEdit, setShowEdit] = useState(false);
  const [formName, setFormName] = useState(authUser?.nombre || 'Usuario');
  const [formUser, setFormUser] = useState(`@${authUser?.email?.split('@')[0] || 'usuario'}`);
  const [toast, setToast] = useState('');
  
  // Payment form state
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentType, setPaymentType] = useState('bank');
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  
  // Sincronizar datos cuando cambie authUser
  useEffect(() => {
    if (authUser) {
      setUser({
        displayName: authUser.nombre || 'Usuario',
        username: `@${authUser.email?.split('@')[0] || 'usuario'}`,
      });
      setFormName(authUser.nombre || 'Usuario');
      setFormUser(`@${authUser.email?.split('@')[0] || 'usuario'}`);
    }
  }, [authUser]);
  
  // Contadores reales (conectar a API más adelante)
  const recipesCount = 0;
  const purchasesCount = purchases.length;
  const reviewsCount = 0;
  
  const totalSpent = useMemo(() => purchases.reduce((acc, p) => acc + (p.total || 0), 0), [purchases]);
  const formatBs = (n) => `Bs ${n.toFixed(2)}`;
  // Contenedor estándar para todas las secciones (mis recetas, compras, config)
  const sectionCls = "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8";
  

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <Header />
      <main className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-4xl flex-1">
            {/* ProfileHeader + Hover submenu */}
            <div className="peer flex p-4 @container border-b border-primary/20 dark:border-primary/30 pb-4 md:hover:bg-primary/5 transition-colors rounded-t-lg">
              <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <Avatar size="lg" photoURL={user?.photoURL} alt={user.displayName || 'Avatar'} />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="material-symbols-outlined text-white text-3xl">edit</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em]">{user.displayName}</p>
                    <p className="text-base font-normal leading-normal text-text-light/70 dark:text-text-dark/70">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setFormName(user.displayName); setFormUser(user.username); setShowEdit(true); }} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-secondary/30 dark:bg-secondary/20 text-text-light dark:text-text-dark text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto hover:bg-secondary/50 dark:hover:bg-secondary/40 transition-colors">
                  <span className="truncate">Editar Perfil</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Hover submenu: Mis recetas / Mis compras / Configuración */}
        <div className="px-4">
              <div role="tablist" aria-label="Navegación del perfil" className="profile-submenu relative min-h-[44px]">
                <div className="grid grid-cols-3 items-stretch justify-items-center gap-2 sm:gap-6 border-b border-primary/20 dark:border-primary/30">
                  <button role="tab" aria-selected={tab==='recetas'} onClick={()=>setTab('recetas')} className={`w-full bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded flex items-center justify-center border-b-[3px] py-2 ${tab==='recetas' ? 'border-b-primary text-primary' : 'border-b-transparent text-text-light/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-colors'}`}>
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Mis recetas</p>
                  </button>
                  <button role="tab" aria-selected={tab==='compras'} onClick={()=>setTab('compras')} className={`w-full bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded flex items-center justify-center border-b-[3px] py-2 ${tab==='compras' ? 'border-b-primary text-primary' : 'border-b-transparent text-text-light/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-colors'}`}>
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Mis compras</p>
                  </button>
                  <button role="tab" aria-selected={tab==='config'} onClick={()=>setTab('config')} className={`w-full bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded flex items-center justify-center border-b-[3px] py-2 ${tab==='config' ? 'border-b-primary text-primary' : 'border-b-transparent text-text-light/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-colors'}`}>
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Configuración</p>
                  </button>
                </div>
                
                {/* Logout button below tabs */}
                <div className="mt-4 px-4">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span className="text-sm font-bold">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ProfileStats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-6">
              <div className="flex min-w-[160px] flex-1 flex-col gap-1 rounded-lg border border-primary/30 p-4 items-center text-center bg-white dark:bg-background-dark/50">
                <p className="text-primary tracking-light text-3xl font-bold leading-tight">{recipesCount}</p>
                <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">Recetas publicadas</p>
              </div>
              <div className="flex min-w-[160px] flex-1 flex-col gap-1 rounded-lg border border-primary/30 p-4 items-center text-center bg-white dark:bg-background-dark/50">
                <p className="text-primary tracking-light text-3xl font-bold leading-tight">{purchasesCount}</p>
                <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">Compras realizadas</p>
              </div>
              <div className="flex min-w-[160px] flex-1 flex-col gap-1 rounded-lg border border-primary/30 p-4 items-center text-center bg-white dark:bg-background-dark/50">
                <p className="text-primary tracking-light text-3xl font-bold leading-tight">{reviewsCount}</p>
                <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">Reseñas escritas</p>
              </div>
            </div>

            {/* Tabs removed from persistent view; controlled via hover submenu above */}

            {/* Content */}
            {tab === 'recetas' && (
              <div className={`${sectionCls} py-8`}>
                <div className="flex flex-col items-center gap-6">
                  <div className="flex justify-center w-full max-w-[360px]">
                    <img
                      alt="Ilustración de plato vacío"
                      className="w-full h-auto object-contain"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ITU80wCXMHXUVLVoD70UcK76Ak89bDnQ9_r3HoazR6WsHYCbCEkaWlu0VQZGD3KVWAeSlXJlwB7XQonKMND2rcVnxrWYNvCYDb43MVVvoPFsHCh44Gb_-fjeo5sDeowmWOP8y0gVXITspI34YaZRTIEFHzu-CEP7Wu6UqdAXLk07838d5Ol9478YiTKrwwLOxqJEgfGjuS2NWlhyVjtad5YuZ98V4d1bZA_OHtV3qZMR7S6bgCH8k9cboXMW-3PC3h513Bs-WAlg"
                    />
                  </div>
                  <div className="flex max-w-[480px] flex-col items-center gap-2">
                    <p className="text-xl font-bold leading-tight tracking-[-0.015em] text-center">Aún no has publicado nada</p>
                    <p className="text-sm font-normal leading-normal text-center text-text-light/80 dark:text-text-dark/80">
                      Empieza a compartir tus creaciones con la comunidad. ¡Estamos ansiosos por ver tus recetas!
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all">
                    <span className="truncate">Publica tu primera receta</span>
                  </button>
                </div>
              </div>
            )}

            {tab === 'compras' && (
              <div className={`${sectionCls} py-8`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Historial de compras</h3>
                  <div className="text-sm text-text-light/70 dark:text-text-dark/70">Gasto total: <strong className="text-text-light dark:text-text-dark">{formatBs(totalSpent)}</strong></div>
                </div>
                {purchases.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 p-10 bg-white dark:bg-background-dark/40 text-center">
                    <img alt="Carrito vacío" className="h-24 w-24 mb-3 opacity-80" src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" />
                    <p className="text-base font-semibold text-text-light dark:text-text-dark">Aún no tienes compras</p>
                    <p className="mt-1 text-sm text-text-light/70 dark:text-text-dark/70">Cuando finalices una compra aparecerá aquí.</p>
                    <Link to="/tienda" className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Ir a la tienda</Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {purchases.map((ord) => (
                      <div key={ord.id} className="rounded-lg border border-primary/20 bg-white dark:bg-background-dark/50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-text-light/70 dark:text-text-dark/70">Orden <span className="font-mono text-text-light dark:text-text-dark">{ord.id}</span></p>
                            <p className="text-xs text-text-light/60 dark:text-text-dark/60">{new Date(ord.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-text-light dark:text-text-dark">Artículos: <strong>{ord.items?.reduce((a,i)=>a+(i.qty||1),0)}</strong></p>
                            <p className="text-sm text-text-light dark:text-text-dark">Total: <strong>{formatBs(ord.total || 0)}</strong></p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-light dark:text-text-dark">
                          {ord.items?.map((it) => (
                            <div key={`${ord.id}_${it.id}`} className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-center bg-cover rounded" style={{ backgroundImage: `url('${it.image}')` }} />
                              <div className="min-w-0">
                                <p className="truncate font-medium">{it.name}</p>
                                <p className="text-xs text-text-light/60 dark:text-text-dark/60">{it.qty} × Bs {it.price?.toFixed?.(2) ?? it.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {ord.method === 'bank' ? '🏦 Banco' : '💳 PayPal'}
                          </span>
                          {ord.methodDetails?.bankName && (
                            <span className="text-text-light/60 dark:text-text-dark/60">
                              {ord.methodDetails.bankName} - ••••{ord.methodDetails.last4}
                            </span>
                          )}
                          {ord.methodDetails?.email && (
                            <span className="text-text-light/60 dark:text-text-dark/60">
                              {ord.methodDetails.email}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Moderación se ha movido al encabezado global */}

            {tab === 'config' && (
              <div className={`${sectionCls} py-8`}>
                <div className="space-y-6">
                  {/* Payment Methods Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Métodos de pago</h3>
                      <button 
                        onClick={() => setShowAddPayment(true)}
                        className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                        <span>Agregar método</span>
                      </button>
                    </div>
                    
                    {paymentMethods.length === 0 ? (
                      <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center">
                        <span className="material-symbols-outlined text-5xl text-primary/40 mb-3">credit_card</span>
                        <p className="text-base font-semibold text-text-light dark:text-text-dark mb-1">No tienes métodos de pago guardados</p>
                        <p className="text-sm text-text-light/70 dark:text-text-dark/70">Agrega una tarjeta de banco o cuenta PayPal para compras más rápidas</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="rounded-lg border border-primary/30 bg-white dark:bg-background-dark/50 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center border border-primary/20 ${method.type === 'bank' ? 'bg-primary/10' : 'bg-primary/10'}`}> 
                                <span className={`material-symbols-outlined text-2xl text-primary`}>
                                  {method.type === 'bank' ? 'credit_card' : 'account_balance_wallet'}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-text-light dark:text-text-dark">
                                  {method.type === 'bank' ? `${method.bankName} - ••••${method.last4}` : `PayPal - ${method.email}`}
                                </p>
                                <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                                  {method.type === 'bank' ? method.cardHolder : 'Cuenta verificada'}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removePaymentMethod(method.id)}
                              className="p-2 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                              aria-label="Eliminar método de pago"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Other settings */}
                  <div className="pt-4 border-t border-primary/20">
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-3">Preferencias</h3>
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">Otras opciones de configuración (próximamente).</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {toast && (
        <div className="fixed top-4 inset-x-0 flex justify-center z-50">
          <div className="flex items-center gap-2 rounded-lg bg-green-500 text-white px-4 py-2 shadow">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
      {showAddPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddPayment(false)} />
          <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-5 shadow-lg border border-primary/20">
            <h3 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">Agregar método de pago</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentType('bank')}
                  className={`h-12 rounded-lg border font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${paymentType === 'bank' ? 'border-primary bg-primary/10 text-primary' : 'border-primary/20 hover:bg-primary/5'}`}
                >
                  Tarjeta de banco
                </button>
                <button
                  onClick={() => setPaymentType('paypal')}
                  className={`h-12 rounded-lg border font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${paymentType === 'paypal' ? 'border-primary bg-primary/10 text-primary' : 'border-primary/20 hover:bg-primary/5'}`}
                >
                  PayPal
                </button>
              </div>
              
              {paymentType === 'bank' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!bankName || !cardNumber || !cardHolder) return;
                    const last4 = cardNumber.replace(/\s/g, '').slice(-4);
                    addPaymentMethod({
                      type: 'bank',
                      bankName,
                      last4,
                      cardHolder,
                      fullNumber: cardNumber.replace(/\s/g, '')
                    });
                    setBankName('');
                    setCardNumber('');
                    setCardHolder('');
                    setShowAddPayment(false);
                    setToast('Método de pago agregado');
                    setTimeout(() => setToast(''), 2500);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="text-sm font-medium mb-1 block text-text-light/80 dark:text-text-dark/80">Banco</label>
                    <input
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      placeholder="Ej: Banco Ganadero"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block text-text-light/80 dark:text-text-dark/80">Número de tarjeta</label>
                    <input
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                        setCardNumber(formatted);
                      }}
                      className="w-full h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block text-text-light/80 dark:text-text-dark/80">Titular</label>
                    <input
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      placeholder="Nombre como aparece en la tarjeta"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddPayment(false)} className="h-10 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600">Cancelar</button>
                    <button type="submit" className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90">Guardar</button>
                  </div>
                </form>
              )}
              
              {paymentType === 'paypal' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!paypalEmail) return;
                    addPaymentMethod({
                      type: 'paypal',
                      email: paypalEmail
                    });
                    setPaypalEmail('');
                    setShowAddPayment(false);
                    setToast('Método de pago agregado');
                    setTimeout(() => setToast(''), 2500);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="text-sm font-medium mb-1 block text-text-light/80 dark:text-text-dark/80">Correo de PayPal</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-900 dark:text-blue-100">
                      <strong>Nota:</strong> Asegúrate de que este correo esté vinculado a tu cuenta de PayPal verificada.
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddPayment(false)} className="h-10 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600">Cancelar</button>
                    <button type="submit" className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90">Guardar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowEdit(false)} />
          <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-5 shadow-lg border border-primary/20">
            <h3 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">Editar perfil</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = formName.trim();
                const uname = formUser.trim();
                if (!name || !uname) return;
                setUser((prev) => ({ ...prev, displayName: name, username: uname }));
                setShowEdit(false);
                setToast('Perfil actualizado con éxito');
                setTimeout(() => setToast(''), 2500);
              }}
              className="space-y-4"
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium mb-1 text-text-light/80 dark:text-text-dark/80">Nombre</label>
                <input
                  id="name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="h-10 rounded-lg border border-primary/30 dark:border-primary/30 bg-white dark:bg-background-dark px-3 text-sm text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-sm font-medium mb-1 text-text-light/80 dark:text-text-dark/80">Usuario</label>
                <input
                  id="username"
                  value={formUser}
                  onChange={(e) => setFormUser(e.target.value)}
                  className="h-10 rounded-lg border border-primary/30 dark:border-primary/30 bg-white dark:bg-background-dark px-3 text-sm text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  placeholder="@usuario"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowEdit(false)} className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600">Cancelar</button>
                <button type="submit" className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
