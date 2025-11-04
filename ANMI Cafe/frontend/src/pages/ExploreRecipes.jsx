
import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import AuthContext from '../contexts/AuthContext';
import * as api from '../services/api';

const ExploreRecipes = () => {
  const { user, isAdmin, isAuthenticated } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [deleteJustification, setDeleteJustification] = useState('');
  const [form, setForm] = useState({
    titulo: '',
    fruta: '',
    descripcion: '',
    ingredientes: [''],
    instrucciones: '',
    foto: '',
    imageFile: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');

  // Filtros
  const filters = ['Todo', 'Asaí', 'Majó', 'Guapurú'];
  const [selectedFilter, setSelectedFilter] = useState('Todo');

  // Cargar recetas UGC reales
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const data = await api.getRecipesUGC(selectedFilter === 'Todo' ? '' : selectedFilter);
        setRecipes(data.recetas || []);
      } catch (error) {
        console.error(error);
        setError('No se pudieron cargar las recetas.');
      }
      setLoading(false);
    };
    fetchRecipes();
  }, [selectedFilter]);

  // UX: Mostrar estrellas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          star_half
        </span>
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-symbols-outlined text-sm">
          star
        </span>
      );
    }
    return stars;
  };

  // Formulario para crear receta
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleIngredientChange = (idx, value) => {
    setForm((prev) => {
      const ingredientes = [...prev.ingredientes];
      ingredientes[idx] = value;
      return { ...prev, ingredientes };
    });
  };
  const addIngredient = () => {
    setForm((prev) => ({ ...prev, ingredientes: [...prev.ingredientes, ''] }));
  };
  const removeIngredient = (idx) => {
    setForm((prev) => {
      const ingredientes = prev.ingredientes.filter((_, i) => i !== idx);
      return { ...prev, ingredientes };
    });
  };

  // Subir imagen y crear receta
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar autenticación
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para crear una receta');
      return;
    }

    // Validaciones
    if (!form.titulo.trim()) {
      setError('El nombre de la receta es obligatorio');
      return;
    }
    if (!form.fruta) {
      setError('Debes seleccionar una fruta');
      return;
    }
    const ingredientesValidos = form.ingredientes.filter((i) => i.trim());
    if (ingredientesValidos.length === 0) {
      setError('Debes agregar al menos un ingrediente');
      return;
    }

    setSubmitting(true);
    setError('');
    setUploadProgress('Preparando...');
    let fotoUrl = '';
    
    try {
      // Subir imagen si existe
      if (form.imageFile) {
        setUploadProgress('Subiendo imagen...');
        const uploadRes = await api.uploadImage(form.imageFile);
        fotoUrl = uploadRes.foto.fullUrl;
        console.log('Imagen subida:', fotoUrl);
      }

      // Crear receta
      setUploadProgress('Creando receta...');
      const recetaPayload = {
        titulo: form.titulo,
        fruta: form.fruta,
        descripcion: form.descripcion || '',
        ingredientes: ingredientesValidos,
        instrucciones: form.instrucciones || '',
        foto: fotoUrl
      };
      
      console.log('Enviando receta:', recetaPayload);
      const result = await api.createRecipeUGC(recetaPayload);
      console.log('Receta creada:', result);

      // Recargar recetas
      setUploadProgress('Cargando recetas...');
      const data = await api.getRecipesUGC(selectedFilter === 'Todo' ? '' : selectedFilter);
      setRecipes(data.recetas || []);

      // Limpiar formulario y cerrar
      setUploadProgress('¡Listo!');
      setTimeout(() => {
        setShowForm(false);
        setForm({
          titulo: '',
          fruta: '',
          descripcion: '',
          ingredientes: [''],
          instrucciones: '',
          foto: '',
          imageFile: null
        });
        setUploadProgress('');
      }, 500);

    } catch (err) {
      console.error('Error completo:', err);
      const errorMsg = err.message || 'Error al crear la receta. Verifica tu conexión e intenta de nuevo.';
      if (errorMsg.includes('Token') || errorMsg.includes('401')) {
        setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      } else {
        setError(errorMsg);
      }
      setUploadProgress('');
    } finally {
      setSubmitting(false);
    }
  };

  // Manejo de eliminación
  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setShowDeleteModal(true);
    setDeleteJustification('');
    setError('');
  };

  const handleDeleteConfirm = async () => {
    if (!recipeToDelete) return;
    
    // Si es admin, requiere justificación
    if (isAdmin && deleteJustification.trim().length < 10) {
      setError('Debes proporcionar una justificación de al menos 10 caracteres.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await api.deleteRecipeUGC(recipeToDelete._id, isAdmin ? deleteJustification : null);
      setShowDeleteModal(false);
      setRecipeToDelete(null);
      setDeleteJustification('');
      // Recargar recetas
      const data = await api.getRecipesUGC(selectedFilter === 'Todo' ? '' : selectedFilter);
      setRecipes(data.recetas || []);
    } catch (err) {
      setError(err.message || 'Error al eliminar la receta.');
    }
    setSubmitting(false);
  };

  // Verificar si el usuario puede eliminar una receta
  const canDeleteRecipe = (recipe) => {
    if (!user) return false;
    if (isAdmin) return true;
    return recipe.usuario_id?._id === user._id;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <Header />
      <div className="pt-8 px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] flex-1">
          {/* Page Heading - Centered */}
          <div className="flex flex-col items-center justify-center gap-2 pb-4">
            <h1 className="text-[#131811] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-center">Recetas</h1>
            <p className="text-[#6b8961] dark:text-gray-400 text-base font-normal leading-normal text-center">Descubre recetas oficiales y creaciones de la comunidad.</p>
          </div>
          {/* Filtros */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-3xl rounded-xl border border-primary/10 bg-white dark:bg-background-dark/40 px-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto] items-end gap-6">
                {/* Fruta */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm font-medium text-text-light/80 dark:text-text-dark/80">Fruta</label>
                  <select
                    value={selectedFilter}
                    onChange={(e)=>setSelectedFilter(e.target.value)}
                    className="w-full h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    {filters.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                {/* Crear receta */}
                <div className="flex items-center justify-end w-full justify-self-end">
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setError('Debes iniciar sesión para crear una receta');
                        setTimeout(() => setError(''), 3000);
                        return;
                      }
                      setShowForm(true);
                      setError('');
                    }}
                    className="inline-flex items-center gap-1 h-10 px-4 rounded-md text-sm font-bold bg-primary text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    <span>Crea tu Receta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de error global */}
          {error && !showForm && (
            <div className="mb-6 flex justify-center">
              <div className="max-w-3xl w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined">error</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Formulario para crear receta */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
              <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-lg rounded-lg bg-white dark:bg-background-dark p-6 shadow-lg border border-primary/20 flex flex-col gap-4 my-8"
                style={{ zIndex: 10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold mb-2 text-text-light dark:text-text-dark">Crear Receta</h3>
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nombre de la receta</label>
                  <input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleFormChange}
                    className="h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    placeholder="Ej: Helado de Asaí"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Fruta</label>
                  <select
                    name="fruta"
                    value={form.fruta}
                    onChange={handleFormChange}
                    className="h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    required
                  >
                    <option value="">Selecciona una fruta</option>
                    <option value="Asaí">Asaí</option>
                    <option value="Majó">Majó</option>
                    <option value="Guapurú">Guapurú</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleFormChange}
                    className="rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    placeholder="Describe tu receta..."
                    rows={2}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Ingredientes</label>
                  {form.ingredientes.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 mb-1">
                      <input
                        value={ing}
                        onChange={(e) => handleIngredientChange(idx, e.target.value)}
                        className="h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        placeholder={`Ingrediente ${idx + 1}`}
                        required
                      />
                      {form.ingredientes.length > 1 && (
                        <button type="button" onClick={() => removeIngredient(idx)} className="p-2 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus:outline-none">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addIngredient} className="inline-flex items-center gap-1 h-8 px-3 rounded-md text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none mt-1">
                    <span className="material-symbols-outlined text-base">add</span>
                    <span>Agregar ingrediente</span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Instrucciones</label>
                  <textarea
                    name="instrucciones"
                    value={form.instrucciones}
                    onChange={handleFormChange}
                    className="rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    placeholder="Explica cómo preparar la receta..."
                    rows={3}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Imagen de la receta</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setForm((prev) => ({ ...prev, imageFile: e.target.files[0] }));
                      }
                    }}
                    className="h-10 rounded-lg border border-primary/30 bg-white dark:bg-background-dark px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  {form.imageFile && (
                    <img src={URL.createObjectURL(form.imageFile)} alt="Preview" className="mt-2 rounded-lg max-h-40 object-cover" />
                  )}
                </div>

                {/* Indicador de progreso */}
                {submitting && uploadProgress && (
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary">sync</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-primary">{uploadProgress}</p>
                      <p className="text-xs text-text-light/70 dark:text-text-dark/70">Por favor espera...</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!submitting) {
                        setShowForm(false);
                        setError('');
                        setUploadProgress('');
                      }
                    }} 
                    disabled={submitting}
                    className="h-10 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting && <span className="material-symbols-outlined animate-spin text-base">sync</span>}
                    <span>{submitting ? uploadProgress || 'Creando...' : 'Crear receta'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid de recetas */}
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
              <span className="ml-3 text-primary text-lg font-bold">Cargando recetas...</span>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="flex flex-col gap-3 pb-3 group cursor-pointer relative">
                  {/* Botón de eliminar si tiene permiso */}
                  {canDeleteRecipe(recipe) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(recipe);
                      }}
                      className="absolute top-2 right-2 z-10 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title={isAdmin ? "Eliminar como administrador" : "Eliminar mi receta"}
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  )}
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 group-hover:shadow-xl transition-transform duration-300"
                    style={{ backgroundImage: `url('${recipe.foto || 'https://cdn-icons-png.flaticon.com/512/3050/3050229.png'}')` }}
                  />
                  <div>
                    <p className="text-[#131811] dark:text-white text-base font-medium leading-normal">
                      {recipe.titulo}
                    </p>
                    <p className="text-[#6b8961] dark:text-gray-400 text-sm font-normal leading-normal">
                      Por {recipe.usuario_id?.nombre || 'Usuario'}
                    </p>
                    <div className="flex items-center mt-1 text-yellow-500">
                      {renderStars(recipe.calificacion_promedio || 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-primary/30 dark:border-primary/30 rounded-xl mt-8">
              <div className="max-w-xs mx-auto mb-6">
                <img
                  alt="Flat illustration of an empty, clean kitchen"
                  className="w-full h-auto"
                  src="https://cdn-icons-png.flaticon.com/512/3050/3050229.png"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#131811] dark:text-white mb-2">
                ¡Tu cocina está lista para crear!
              </h3>
              <p className="text-[#6b8961] dark:text-gray-400 mb-6">
                Sé el primero en compartir una deliciosa receta con la comunidad.
              </p>
              <button onClick={() => setShowForm(true)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:brightness-110 active:brightness-95 transition-all shadow-md hover:shadow-lg shadow-primary/30 mx-auto">
                <span className="material-symbols-outlined text-base">add</span>
                <span className="truncate">Crea tu Receta</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-6 shadow-lg border border-red-500/20 flex flex-col gap-4" style={{ zIndex: 10 }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
                {isAdmin ? 'Eliminar receta como administrador' : 'Eliminar mi receta'}
              </h3>
            </div>
            
            {error && <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}
            
            <p className="text-sm text-text-light/80 dark:text-text-dark/80">
              ¿Estás seguro de que deseas eliminar la receta "<strong>{recipeToDelete?.titulo}</strong>"? Esta acción no se puede deshacer.
            </p>

            {isAdmin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-light dark:text-text-dark">
                  Justificación de eliminación <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={deleteJustification}
                  onChange={(e) => setDeleteJustification(e.target.value)}
                  className="rounded-lg border border-red-300 bg-white dark:bg-background-dark px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                  placeholder="Explica por qué estás eliminando esta receta (mínimo 10 caracteres)..."
                  rows={3}
                  required
                />
                <p className="text-xs text-text-light/60 dark:text-text-dark/60">
                  Como administrador, debes justificar la eliminación de contenido de usuarios.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setRecipeToDelete(null);
                  setDeleteJustification('');
                  setError('');
                }} 
                className="h-10 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
                disabled={submitting}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={handleDeleteConfirm} 
                disabled={submitting}
                className="h-10 px-4 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Eliminando...' : 'Eliminar receta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreRecipes;
