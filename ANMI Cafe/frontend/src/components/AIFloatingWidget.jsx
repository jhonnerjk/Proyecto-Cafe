import React, { useState } from 'react';
import { chatWithAI } from '../services/api';

/**
 * Widget flotante del Asistente IA
 * Botón flotante en la esquina que abre un modal con funcionalidades de IA
 */
function AIFloatingWidget({ contexto = 'general' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError('Por favor escribe una pregunta');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const userMessage = question.trim();
    setQuestion('');
    
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      setLoading(true);
      setError(null);

      const { respuesta } = await chatWithAI(userMessage, contexto);
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: respuesta }]);
    } catch (err) {
      console.error('Error al procesar pregunta:', err);
      setError(err.message || 'Error al procesar tu pregunta');
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 group"
        aria-label="Abrir Asistente IA"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          
          {/* Botón principal */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all">
            <span className="material-symbols-outlined text-3xl text-white animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
              neurology
            </span>
          </div>

          {/* Badge de notificación */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xs text-white">smart_toy</span>
          </div>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-background-dark rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                      neurology
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl">Asistente IA</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">auto_awesome</span>
                      <span>Potenciado por Gemini</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setChatHistory([]);
                    setError(null);
                  }}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-white">close</span>
                </button>
              </div>
            </div>

            {/* Contenido - Chat */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">chat</span>
                      <div>
                        <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                          ¡Hola! Soy tu asistente inteligente. Pregúntame sobre:
                        </p>
                        <ul className="text-sm text-blue-900 dark:text-blue-100 list-disc list-inside space-y-1">
                          <li>Productos de café y precios</li>
                          <li>Recomendaciones personalizadas</li>
                          <li>Recetas y métodos de preparación</li>
                          <li>Restaurantes y cafeterías</li>
                          <li>Stock y disponibilidad</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl rounded-br-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark rounded-2xl rounded-bl-sm'
                      } p-4 shadow-md`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}

                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm p-4 shadow-md">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Pensando...</span>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Input de chat */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-background-dark">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={loading}
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={loading || !question.trim()}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIFloatingWidget;
