import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const BANKS_BO = [
  'Banco Ganadero',
  'Banco Nacional de Bolivia (BNB)',
  'Mercantil Santa Cruz',
  'Banco Unión',
  'BCP Bolivia',
  'Banco Económico',
];

const FEES = {
  bank: 0,
  paypal: 0.05,
};

const formatBs = (n) => `Bs ${n.toFixed(2)}`;

const PaymentModal = ({ open, onClose, onConfirm }) => {
  const { total, items } = useCart();
  const { paymentMethods } = useUser();
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const currentMethod = paymentMethods.find(m => m.id === selectedMethod);
  const fee = currentMethod?.type === 'paypal' ? FEES.paypal : FEES.bank;
  const feeAmount = useMemo(() => total * fee, [total, fee]);
  const grand = useMemo(() => total + feeAmount, [total, feeAmount]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="p-4 border-b border-primary/20 dark:border-primary/20 flex items-center justify-between">
          <h3 className="text-lg font-bold">Finalizar compra</h3>
          <button className="p-2 rounded-lg hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40" onClick={onClose} aria-label="Cerrar"><span className="material-symbols-outlined">close</span></button>
        </div>

        <div className="p-4 space-y-4">
          {/* Resumen de compra */}
          <div className="bg-primary/5 dark:bg-background-dark/40 border border-primary/20 rounded-lg p-4">
            <h4 className="text-sm font-bold mb-3 text-text-light dark:text-text-dark">Resumen de compra</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-light dark:text-text-dark truncate">{item.name}</p>
                    <p className="text-xs text-text-light/60 dark:text-text-dark/60">Cantidad: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-text-light dark:text-text-dark">{formatBs(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-primary/20">
              <div className="flex justify-between text-sm">
                <span className="text-text-light/70 dark:text-text-dark/70">Subtotal</span>
                <span className="font-semibold text-text-light dark:text-text-dark">{formatBs(total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Selecciona un método de pago</label>
            {paymentMethods.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary/40 mb-2">credit_card_off</span>
                <p className="text-sm font-semibold text-text-light dark:text-text-dark mb-1">No tienes métodos de pago guardados</p>
                <p className="text-xs text-text-light/60 dark:text-text-dark/60 mb-3">Agrega un método en la sección de Configuración de tu perfil</p>
                <a href="#/perfil" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                  <span>Ir a configuración</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                      selectedMethod === method.id
                        ? method.type === 'bank'
                          ? 'border-green-400 bg-green-50 shadow-sm text-green-700'
                          : 'border-primary bg-primary/10 shadow-sm text-primary'
                        : 'border-primary/20 bg-white text-text-light hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${method.type === 'bank' ? 'border-green-400 bg-green-50 text-green-600' : 'border-primary/20 bg-primary/10 text-primary'}`}>
                        <span className={`material-symbols-outlined ${method.type === 'bank' ? 'text-green-600' : 'text-primary'}`}> 
                          {method.type === 'bank' ? 'credit_card' : 'account_balance_wallet'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                          {method.type === 'bank' ? `${method.bankName} - ••••${method.last4}` : `PayPal - ${method.email}`}
                        </p>
                        <p className="text-xs text-text-light/60 dark:text-text-dark/60">
                          {method.type === 'bank' ? method.cardHolder : 'Cuenta verificada'}
                        </p>
                      </div>
                      {selectedMethod === method.id && (
                        <span className={`material-symbols-outlined ${method.type === 'bank' ? 'text-green-500' : 'text-primary'}`}>check_circle</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentMethod && (
            <div className="bg-white dark:bg-background-dark/40 border border-primary/20 rounded-lg p-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Pagarás con:</strong> {currentMethod.type === 'bank' ? `${currentMethod.bankName} - ••••${currentMethod.last4}` : `PayPal (${currentMethod.email})`}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  {currentMethod.type === 'bank' ? 'Transferencia bancaria. Sin recargos adicionales.' : 'Pago vía PayPal. Recargo aproximado 5%.'}
                </p>
              </div>
            </div>
          )}

          <div className="bg-primary/5 dark:bg-background-dark/40 border border-primary/20 rounded-lg p-4 text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-light/70 dark:text-text-dark/70">Subtotal</span>
              <span className="font-semibold text-text-light dark:text-text-dark">{formatBs(total)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-light/70 dark:text-text-dark/70">Recargo {currentMethod?.type === 'paypal' ? '(5%)' : ''}</span>
              <span className="font-semibold text-text-light dark:text-text-dark">{formatBs(feeAmount)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-primary/20">
              <span className="font-bold text-base text-text-light dark:text-text-dark">Total a pagar</span>
              <span className="font-bold text-lg text-primary">{formatBs(grand)}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-primary/20 dark:border-primary/20 flex justify-end gap-3">
          <button 
            className="h-10 px-5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`h-10 px-5 rounded-lg text-white font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              !selectedMethod || paymentMethods.length === 0
                ? 'bg-primary/50 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
            onClick={() => {
              if (!selectedMethod || paymentMethods.length === 0) return;
              onConfirm?.({
                method: currentMethod.type,
                methodDetails: currentMethod,
                feeAmount,
                grandTotal: grand,
                subtotal: total
              });
              onClose();
            }}
            disabled={!selectedMethod || paymentMethods.length === 0}
          >
            Confirmar pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;