import React, { useState, useEffect } from 'react';
import { getProductReviewsSummary } from '../services/api';

/**
 * Componente que muestra un resumen generado por IA de las reseñas de un producto
 * Utiliza la API de Gemini para analizar y resumir opiniones de clientes
 * 
 * @param {Object} props
 * @param {string} props.productId - ID del producto en MongoDB
 */
function ProductReviewSummary({ productId }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getProductReviewsSummary(productId);
        setSummary(data);
      } catch (err) {
        console.error('Error al cargar resumen de reseñas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadSummary();
  }, [productId]);

  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex-shrink-0">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 animate-spin text-2xl">
            sync
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Generando resumen con IA...
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            Analizando reseñas de clientes
          </p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl flex-shrink-0">
          error_outline
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-900 dark:text-red-100">
            No se pudo generar el resumen
          </p>
          <p className="text-xs text-red-700 dark:text-red-300 mt-1">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // Sin datos
  if (!summary) {
    return null;
  }

  // Determinar si es un producto sin reseñas
  const sinResenas = summary.summary === 'Este producto aún no tiene reseñas.';

  return (
    <div className={`relative overflow-hidden rounded-xl border-2 ${
      sinResenas 
        ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800'
    }`}>
      {/* Decoración de fondo */}
      {!sinResenas && (
        <div className="absolute top-0 right-0 opacity-10">
          <span className="material-symbols-outlined text-[120px] text-purple-600">
            psychology
          </span>
        </div>
      )}

      <div className="relative p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            sinResenas
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-gradient-to-br from-purple-500 to-indigo-600'
          }`}>
            <span className={`material-symbols-outlined ${
              sinResenas ? 'text-gray-500 dark:text-gray-400' : 'text-white'
            }`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {sinResenas ? 'rate_review' : 'psychology'}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-bold text-base ${
                sinResenas
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-purple-900 dark:text-purple-100'
              }`}>
                {sinResenas ? 'Reseñas' : 'Resumen IA de Reseñas'}
              </h3>
              
              {!sinResenas && summary.totalResenas > 0 && (
                <span className="inline-flex items-center gap-1 text-xs bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full font-medium">
                  <span className="material-symbols-outlined text-sm">analytics</span>
                  <span>{summary.totalResenas} {summary.totalResenas === 1 ? 'reseña' : 'reseñas'}</span>
                </span>
              )}
            </div>
            
            {!sinResenas && (
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-0.5">
                Generado por Gemini AI
              </p>
            )}
          </div>
        </div>

        {/* Contenido del resumen */}
        <div className={`${
          sinResenas
            ? 'text-gray-600 dark:text-gray-400 text-sm italic'
            : 'text-gray-800 dark:text-gray-200 text-sm leading-relaxed'
        }`}>
          {summary.summary}
        </div>

        {/* Footer con información adicional */}
        {!sinResenas && (
          <div className="mt-4 pt-3 border-t border-purple-200 dark:border-purple-800">
            <p className="text-xs text-purple-700 dark:text-purple-300 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              <span>Este resumen fue generado automáticamente analizando las opiniones de los clientes</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductReviewSummary;
