const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || error.mensaje || `Error ${response.status}`);
  }
  return response.json();
};

// Helper para obtener token del localStorage
const getToken = () => localStorage.getItem('token');

// Helper para headers con autenticación
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ============================================
// AUTH
// ============================================

export const register = async (nombre, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await handleResponse(response);
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.usuario));
  }
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(response);
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.usuario));
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getMe = async () => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ============================================
// POSTS (Publicaciones de Comunidad)
// ============================================

export const getPosts = async (limite = 20, pagina = 1) => {
  const response = await fetch(`${API_URL}/posts?limite=${limite}&pagina=${pagina}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const createPost = async (texto_anecdota, fotos = []) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ texto_anecdota, fotos }),
  });
  return handleResponse(response);
};

export const addComment = async (postId, contenido) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comment`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ contenido }),
  });
  return handleResponse(response);
};

// ============================================
// RECIPES (Recetas)
// ============================================

export const getRecipesUGC = async (filtro_fruta = '', limite = 20, pagina = 1) => {
  const query = new URLSearchParams({ limite, pagina });
  if (filtro_fruta) query.append('filtro_fruta', filtro_fruta);
  
  const response = await fetch(`${API_URL}/recipes/ugc?${query}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const createRecipeUGC = async (receta) => {
  const response = await fetch(`${API_URL}/recipes/ugc`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(receta),
  });
  return handleResponse(response);
};

export const rateRecipe = async (recipeId, calificacion) => {
  const response = await fetch(`${API_URL}/recipes/ugc/${recipeId}/rate`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ calificacion }),
  });
  return handleResponse(response);
};

export const deleteRecipeUGC = async (recipeId, justificacion = null) => {
  const body = justificacion ? JSON.stringify({ justificacion }) : null;
  const response = await fetch(`${API_URL}/recipes/ugc/${recipeId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    ...(body && { body }),
  });
  return handleResponse(response);
};

export const getRecipesOfficial = async (limite = 20, pagina = 1) => {
  const response = await fetch(`${API_URL}/recipes/official?limite=${limite}&pagina=${pagina}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ============================================
// RESTAURANTS
// ============================================

export const getRestaurants = async (limite = 20, pagina = 1, cerca = null) => {
  const query = new URLSearchParams({ limite, pagina });
  if (cerca) query.append('cerca', cerca);
  
  const response = await fetch(`${API_URL}/restaurants?${query}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const reviewRestaurant = async (restaurantId, opinion, calificacion) => {
  const response = await fetch(`${API_URL}/restaurants/${restaurantId}/review`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ opinion, calificacion }),
  });
  return handleResponse(response);
};

// ============================================
// PRODUCTS (E-Commerce)
// ============================================

export const getProducts = async (limite = 20, pagina = 1, enStock = null) => {
  const query = new URLSearchParams({ limite, pagina });
  if (enStock !== null) query.append('enStock', enStock);
  
  const response = await fetch(`${API_URL}/products?${query}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getProductById = async (productId) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const reviewProduct = async (productId, comentario, calificacion) => {
  const response = await fetch(`${API_URL}/products/${productId}/review`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ comentario, calificacion }),
  });
  return handleResponse(response);
};

export const getProductReviews = async (productId, limite = 20, pagina = 1) => {
  const response = await fetch(`${API_URL}/products/${productId}/reviews?limite=${limite}&pagina=${pagina}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getProductReviewsSummary = async (productId) => {
  const response = await fetch(`${API_URL}/products/${productId}/reviews/summary`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ============================================
// CART (Carrito)
// ============================================

export const addToCart = async (producto_id, cantidad = 1) => {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ producto_id, cantidad }),
  });
  return handleResponse(response);
};

export const getCart = async () => {
  const response = await fetch(`${API_URL}/cart`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const checkout = async () => {
  const response = await fetch(`${API_URL}/cart/checkout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ============================================
// ADMIN (Moderación)
// ============================================

export const getAdminContent = async (filter = 'all', tipo = null, limite = 50, pagina = 1) => {
  const query = new URLSearchParams({ filter, limite, pagina });
  if (tipo) query.append('tipo', tipo);
  
  const response = await fetch(`${API_URL}/admin/content?${query}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const deleteContent = async (contentId, tipo) => {
  const response = await fetch(`${API_URL}/admin/content/${contentId}?tipo=${tipo}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ============================================
// UPLOADS
// ============================================

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('foto', file);
  
  const token = getToken();
  const response = await fetch(`${API_URL}/uploads`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  return handleResponse(response);
};

export const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('fotos', file));
  
  const token = getToken();
  const response = await fetch(`${API_URL}/uploads/multiple`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  return handleResponse(response);
};

// ============================================
// AI (Inteligencia Artificial)
// ============================================

export const chatWithAI = async (pregunta, contexto = 'general') => {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ pregunta, contexto }),
  });
  return handleResponse(response);
};

export const analyzePageWithAI = async (pagina, contenidoVisible = '') => {
  const response = await fetch(`${API_URL}/ai/analizar-pagina`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ pagina, contenidoVisible }),
  });
  return handleResponse(response);
};

export default {
  register,
  login,
  logout,
  getMe,
  getPosts,
  createPost,
  addComment,
  getRecipesUGC,
  createRecipeUGC,
  rateRecipe,
  deleteRecipeUGC,
  getRecipesOfficial,
  getRestaurants,
  reviewRestaurant,
  getProducts,
  getProductById,
  reviewProduct,
  getProductReviews,
  getProductReviewsSummary,
  addToCart,
  getCart,
  checkout,
  getAdminContent,
  deleteContent,
  uploadImage,
  uploadMultipleImages,
  chatWithAI,
  analyzePageWithAI,
};
