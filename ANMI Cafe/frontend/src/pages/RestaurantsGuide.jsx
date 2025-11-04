import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIFloatingWidget from '../components/AIFloatingWidget';

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockRestaurants = [
  {
    id: 1,
    name: 'Café de la Esquina',
    category: 'Café',
    rating: 4.5,
    reviews: 124,
    address: 'Av. Siempre Viva 742',
    lat: -17.7833,
    lng: -63.1821,
    image: 'https://images.unsplash.com/photo-1529676468690-ae81d61b57c8?w=400&q=80',
    description: 'Café de Especialidad',
  },
  {
    id: 2,
    name: 'Frutos del Trópico',
    category: 'Frutas',
    rating: 5,
    reviews: 89,
    address: 'Calle Falsa 123',
    lat: -17.7900,
    lng: -63.1900,
    image: 'https://images.unsplash.com/photo-1542843137-8791a6904d14?w=400&q=80',
    description: 'Frutas Frescas',
  },
  {
    id: 3,
    name: 'La Casa del Café',
    category: 'Café',
    rating: 4.8,
    reviews: 156,
    address: 'Calle 24 de Septiembre 456',
    lat: -17.7750,
    lng: -63.1750,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    description: 'Café Gourmet',
  },
];

function Stars({ value }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{ fontSize: 18, color: i <= value ? '#FF9800' : '#FF980080', fontVariationSettings: i <= value ? `'FILL' 1` : undefined }}
        >star</span>
      ))}
    </span>
  );
}

const RestaurantsGuide = () => {
  const [query, setQuery] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviewForm, setReviewForm] = useState({ calificacion: 5, opinion: '' });

  const filtered = useMemo(() => {
    let list = [...mockRestaurants];
    if (query.trim()) {
      list = list.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.address.toLowerCase().includes(query.toLowerCase())
      );
    }
    return list;
  }, [query]);

  const openReviewModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReviewModal(true);
    setReviewForm({ calificacion: 5, opinion: '' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Reseña enviada:', { restaurante: selectedRestaurant.name, ...reviewForm });
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />
      <main className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 sm:p-8">
          <h1 className="text-3xl font-black leading-tight tracking-tighter mb-2 mt-2 text-text-light dark:text-text-dark">Descubre Restaurantes</h1>
          <p className="text-text-light/70 dark:text-text-dark/70 text-base font-normal leading-normal mb-6">Encuentra lugares increíbles que usan productos ANMI Amboró.</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center">
            <div className="flex-1 w-full max-w-lg">
              <label className="w-full">
                <div className="flex w-full items-stretch rounded-lg h-12 border border-border-light focus-within:ring-2 focus-within:ring-primary bg-card-light">
                  <div className="text-text-light/70 flex items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light focus:outline-0 focus:ring-0 border-none bg-card-light h-full placeholder:text-text-light/50 pl-2 text-base font-normal leading-normal"
                    placeholder="Buscar por nombre o dirección..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Mapa */}
          <div className="mb-8 rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-lg" style={{ height: '400px' }}>
            <MapContainer
              center={[-17.7833, -63.1821]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((restaurant) => (
                <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lng]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-sm mb-1">{restaurant.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{restaurant.address}</p>
                      <button
                        onClick={() => openReviewModal(restaurant)}
                        className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90"
                      >
                        Dejar reseña
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="flex flex-col gap-6">
            {filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-stretch justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 border border-border-light dark:border-border-dark hover:border-primary/50 cursor-pointer transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: `url('${item.image}')` }}></div>
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">{item.description}</p>
                        <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">{item.name}</p>
                        <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">{item.address}</p>
                        <div className="flex items-center gap-1 mt-auto">
                          <Stars value={Math.floor(item.rating)} />
                          <span className="text-sm font-medium ml-1 text-text-light dark:text-text-dark">{item.rating}</span>
                          <span className="text-xs text-text-light/50 dark:text-text-dark/50 ml-1">({item.reviews} reseñas)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-card-light dark:bg-card-dark p-8 mt-4 border border-dashed border-border-light dark:border-border-dark">
                <div className="text-center">
                  <p className="font-bold text-text-light dark:text-text-dark">No hay restaurantes que coincidan con tu búsqueda</p>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70">Intenta con otros términos.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal de reseña */}
      {showReviewModal && selectedRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowReviewModal(false)} />
          <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-6 shadow-lg border border-primary/20 flex flex-col gap-4" style={{ zIndex: 10 }}>
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Deja tu reseña</h3>
            <p className="text-sm text-text-light/70 dark:text-text-dark/70">{selectedRestaurant.name}</p>
            
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Calificación</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, calificacion: star })}
                      className="text-2xl"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          color: star <= reviewForm.calificacion ? '#FF9800' : '#ccc',
                          fontVariationSettings: star <= reviewForm.calificacion ? `'FILL' 1` : undefined
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tu opinión</label>
                <textarea
                  value={reviewForm.opinion}
                  onChange={(e) => setReviewForm({ ...reviewForm, opinion: e.target.value })}
                  className="rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  placeholder="Comparte tu experiencia..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="h-10 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90"
                >
                  Enviar reseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Widget flotante de Asistente IA */}
      <AIFloatingWidget contexto="restaurantes" />
    </div>
  );
};

export default RestaurantsGuide;
