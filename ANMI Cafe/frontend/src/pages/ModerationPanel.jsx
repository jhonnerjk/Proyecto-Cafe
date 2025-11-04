
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const initialData = [
  { tipo: 'receta', contenido: 'Receta: Paella de Mariscos', autor: 'Elena Pérez', fecha: '2023-10-26', estado: 'pendiente' },
  { tipo: 'comentario', contenido: 'Comentario: "Esta receta no funciona."', autor: 'Juan García', fecha: '2023-10-25', estado: 'negativo' },
  { tipo: 'receta', contenido: 'Receta: Tarta de Manzana Casera', autor: 'Sofía Rodríguez', fecha: '2023-10-24', estado: 'aprobado' },
  { tipo: 'comentario', contenido: 'Comentario: "Contenido inapropiado"', autor: 'Carlos Gómez', fecha: '2023-10-23', estado: 'reportado' },
];

const estadoBadge = {
  pendiente: { text: 'Pendiente', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
  negativo: { text: 'Negativo', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' },
  aprobado: { text: 'Aprobado', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
  reportado: { text: 'Reportado', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
};

const ModerationPanel = () => {
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDay, setFilterDay] = useState('');

  const pad2 = (v) => (v?.toString().padStart(2, '0'));

  const matchesDate = (dateStr) => {
    // dateStr is in format YYYY-MM-DD
    if (filterYear) {
      let prefix = filterYear;
      if (filterMonth) prefix += `-${pad2(filterMonth)}`;
      if (filterDay) prefix += `-${pad2(filterDay)}`;
      return dateStr.startsWith(prefix);
    }
    if (filterMonth) {
      const mm = pad2(filterMonth);
      if (filterDay) {
        return dateStr.slice(5, 7) === mm && dateStr.slice(8, 10) === pad2(filterDay);
      }
      return dateStr.slice(5, 7) === mm;
    }
    if (filterDay) {
      return dateStr.slice(8, 10) === pad2(filterDay);
    }
    return true;
  };

  const filteredData = initialData.filter(row => {
    return (
      (!filterType || row.tipo === filterType) &&
      (!filterStatus || row.estado === filterStatus) &&
      matchesDate(row.fecha)
    );
  });

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-[#181411] dark:text-slate-50 text-4xl font-black leading-tight tracking-[-0.033em] mt-2">Panel de Moderación</h1>
          <p className="text-[#897561] dark:text-slate-400 text-base font-normal leading-normal mb-2">Filtra y gestiona el contenido pendiente de la comunidad.</p>
        </div>
        <div className="flex flex-col gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="filter-type" className="text-xs font-medium text-[#5b4b3b] dark:text-slate-400 mb-1">Tipo de Contenido</label>
              <select id="filter-type" value={filterType} onChange={e => setFilterType(e.target.value)} className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-[#181411] dark:text-slate-300 text-sm">
                <option value="">Todos</option>
                <option value="receta">Receta</option>
                <option value="comentario">Comentario</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="filter-status" className="text-xs font-medium text-[#5b4b3b] dark:text-slate-400 mb-1">Estado/Severidad</label>
              <select id="filter-status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-[#181411] dark:text-slate-300 text-sm">
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="negativo">Negativo</option>
                <option value="aprobado">Aprobado</option>
                <option value="reportado">Reportado</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-[#5b4b3b] dark:text-slate-400 mb-1">Fecha</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  aria-label="Día"
                  inputMode="numeric"
                  pattern="\\d{1,2}"
                  maxLength={2}
                  placeholder="DD"
                  className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-[#181411] dark:text-slate-300 text-sm"
                  value={filterDay}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                    setFilterDay(v);
                  }}
                />
                <input
                  aria-label="Mes"
                  inputMode="numeric"
                  pattern="\\d{1,2}"
                  maxLength={2}
                  placeholder="MM"
                  className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-[#181411] dark:text-slate-300 text-sm"
                  value={filterMonth}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                    setFilterMonth(v);
                  }}
                />
                <input
                  aria-label="Año"
                  inputMode="numeric"
                  pattern="\\d{4}"
                  maxLength={4}
                  placeholder="YYYY"
                  className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-[#181411] dark:text-slate-300 text-sm"
                  value={filterYear}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                    setFilterYear(v);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => { setFilterType(''); setFilterStatus(''); setFilterYear(''); setFilterMonth(''); setFilterDay(''); }}
              title="Limpiar filtros"
            >
              <span className="material-symbols-outlined text-white" style={{fontSize: 18}}>filter_list_off</span>
              Limpiar
            </button>
          </div>
        </div>
        <div className="py-3">
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 min-h-[420px]">
            {filteredData.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary dark:bg-primary/80">
                    <th className="p-4 w-12"></th>
                    <th className="p-4 text-white dark:text-slate-100 text-base font-bold tracking-wide">Contenido</th>
                    <th className="p-4 text-white dark:text-slate-100 text-base font-bold tracking-wide">Autor</th>
                    <th className="p-4 text-white dark:text-slate-100 text-base font-bold tracking-wide">Fecha</th>
                    <th className="p-4 text-white dark:text-slate-100 text-base font-bold tracking-wide">Estado</th>
                    <th className="p-4 text-white dark:text-slate-100 text-base font-bold tracking-wide">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                      <td className="p-4 w-12"><input className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-primary/50 focus:ring-offset-0" type="checkbox" /></td>
                      <td className="p-4 text-[#181411] dark:text-slate-200 text-sm">{row.contenido}</td>
                      <td className="p-4 text-[#897561] dark:text-slate-400 text-sm">{row.autor}</td>
                      <td className="p-4 text-[#897561] dark:text-slate-400 text-sm">{row.fecha}</td>
                      <td className="p-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoBadge[row.estado].color}`}>{estadoBadge[row.estado].text}</span></td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
                            title="Aprobar"
                            aria-label="Aprobar"
                          >
                            <span className="material-symbols-outlined" style={{fontSize: 20}}>check</span>
                          </button>
                          <button
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
                            title="Eliminar"
                            aria-label="Eliminar"
                          >
                            <span className="material-symbols-outlined" style={{fontSize: 20}}>delete</span>
                          </button>
                          <button
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                            title="Ver detalle"
                            aria-label="Ver detalle"
                          >
                            <span className="material-symbols-outlined" style={{fontSize: 20}}>visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex h-full min-h-[360px] items-center justify-center p-6">
                <div className="text-center">
                  <svg className="mx-auto w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                  </svg>
                  <h3 className="mt-4 text-base font-medium text-slate-900 dark:text-slate-100">
                    {initialData.length === 0
                      ? 'No hay contenido pendiente. Todo el contenido ha sido moderado.'
                      : 'No hay contenido que coincida con este filtro.'}
                  </h3>
                  {initialData.length === 0 && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Vuelve más tarde para revisar nuevo contenido.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ModerationPanel;
