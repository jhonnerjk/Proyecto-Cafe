import React, { useState } from 'react';
import { chatWithAI } from '../services/api';

/**
 * Componente de Asistente IA para el Dashboard
 * Chat inteligente que responde preguntas sobre productos y servicios
 */
function AIAssistant({ contexto = 'dashboard' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
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
    
    // Agregar mensaje del usuario al historial
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      setLoading(true);
      setError(null);

      // Llamar a Gemini AI con contexto de la página
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
    <div className="sticky top-24 h-fit">
      {/* Header del Asistente - Siempre visible */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-t-2xl shadow-2xl overflow-hidden">
        <div className="relative p-5">
          {/* Patrón de fondo animado */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse delay-700"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                    neurology
                  </span>
                </div>
                {/* Indicador de actividad */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-600 animate-pulse"></div>
              </div>
              
              <div>
                <h3 className="text-white font-black text-lg tracking-tight">
                  Asistente IA
                </h3>
                <p className="text-white/80 text-xs font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  Potenciado por Gemini
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center group"
              aria-label={isExpanded ? 'Minimizar' : 'Expandir'}
            >
              <span className="material-symbols-outlined text-white transform transition-transform group-hover:scale-110">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="bg-card-light dark:bg-card-dark rounded-b-2xl shadow-2xl border-x-2 border-b-2 border-purple-200 dark:border-purple-800">
          {/* Pestañas */}
          <div className="flex border-b border-purple-200 dark:border-purple-800/50 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-4 py-3 text-sm font-bold transition-all relative ${
                activeTab === 'chat'
                  ? 'text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>Chat</span>
              </span>
              {activeTab === 'chat' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('suggestions')}
              className={`flex-1 px-4 py-3 text-sm font-bold transition-all relative ${
                activeTab === 'suggestions'
                  ? 'text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">tips_and_updates</span>
                <span>Ayuda</span>
              </span>
              {activeTab === 'suggestions' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
              )}
            </button>
          </div>

          {/* Contenido de las pestañas */}
          <div className="p-5">
            {/* Tab: Chat con IA */}
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl flex-shrink-0">
                    info
                  </span>
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Hazme cualquier pregunta:</strong> Puedo ayudarte con información sobre productos, precios, recomendaciones y más.
                  </p>
                </div>

                {/* Historial de chat */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-6xl text-purple-300 dark:text-purple-700 mb-3">
                        chat_bubble
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Empieza una conversación con el asistente
                      </p>
                    </div>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                              psychology
                            </span>
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.role === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-sm">
                              person
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  
                  {loading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-white text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                          psychology
                        </span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-lg flex-shrink-0">
                      error
                    </span>
                    <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
                  </div>
                )}

                {/* Input de pregunta */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu pregunta aquí..."
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={handleAskQuestion}
                    disabled={loading || !question.trim()}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Sugerencias */}
            {activeTab === 'suggestions' && (
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl">
                      help
                    </span>
                    <div className="space-y-2">
                      <h4 className="font-bold text-amber-900 dark:text-amber-200">
                        Preguntas que puedes hacer
                      </h4>
                      <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">arrow_right</span>
                          <span>¿Cuál es el mejor café para empezar el día?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">arrow_right</span>
                          <span>¿Cuánto cuesta el café de altura?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">arrow_right</span>
                          <span>¿Cuál es la diferencia entre tostado medio y oscuro?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">arrow_right</span>
                          <span>¿De dónde provienen los cafés?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">arrow_right</span>
                          <span>¿Qué productos están disponibles?</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">
                      rocket_launch
                    </span>
                    <div className="space-y-2">
                      <h4 className="font-bold text-green-900 dark:text-green-200">
                        Próximamente
                      </h4>
                      <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">schedule</span>
                          <span>Recomendaciones personalizadas con IA</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">schedule</span>
                          <span>Generador de recetas con ingredientes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs mt-0.5">schedule</span>
                          <span>Asistente de maridaje de café</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
