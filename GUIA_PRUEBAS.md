# Guía de Pruebas - ANMI Café

## ✅ Todas las Correcciones Implementadas

### Resumen de Cambios

1. **Historial de compras por usuario** - Cada usuario tiene su propio historial
2. **Métodos de pago por usuario** - Cada usuario tiene sus propios métodos de pago
3. **Contador de compras funcional** - Se actualiza automáticamente
4. **Datos reales en el perfil** - No más datos hardcodeados
5. **Panel de moderación para admin** - Aparece solo para usuarios con rol 'admin'
6. **Código sin emojis** - Comentarios limpios y profesionales
7. **Registro funcionando correctamente** - Backend valida y retorna datos completos

---

## 🚀 Cómo Probar

### Paso 1: Iniciar el Backend

```powershell
cd "ANMI Cafe\backend"
npm run dev
```

Deberías ver:
```
Conectado a MongoDB
Índices creados correctamente
Servidor corriendo en http://localhost:3000
```

### Paso 2: Iniciar el Frontend

En otra terminal:

```powershell
cd "ANMI Cafe\frontend"
npm run dev
```

Deberías ver:
```
VITE ready in xxx ms
Local: http://localhost:5173/
```

---

## 🧪 Casos de Prueba

### Prueba 1: Usuario Admin y Panel de Moderación

1. Abre http://localhost:5173/login
2. Inicia sesión con:
   - **Email:** `admin@anmicafe.com`
   - **Password:** `admin123`
3. ✅ **Verificar:** Debes ver el link "Moderación" en el header
4. Haz clic en "Moderación"
5. ✅ **Verificar:** Puedes acceder al panel de moderación

**Consola del navegador:**
```javascript
Login - Respuesta completa: { mensaje: "Login exitoso", usuario: {...}, token: "..." }
Login - Rol del usuario: "admin"
AuthContext Estado actual: { isAdmin: true, ... }
```

---

### Prueba 2: Historial de Compras por Usuario

1. Cierra sesión (si estás logueado)
2. Registra un usuario nuevo:
   - Nombre: "Usuario Test 1"
   - Email: "test1@example.com"
   - Password: "test123"
3. Ve a la **Tienda** (`/tienda`)
4. Agrega algunos productos al carrito
5. Haz clic en el carrito flotante
6. Completa una compra (puedes usar datos de prueba)
7. Ve a tu **Perfil** (`/perfil`)
8. Haz clic en la pestaña "Mis compras"
9. ✅ **Verificar:** Ves tu compra en el historial

**Ahora prueba con otro usuario:**

10. Cierra sesión
11. Registra otro usuario:
    - Nombre: "Usuario Test 2"
    - Email: "test2@example.com"
    - Password: "test123"
12. Ve a tu perfil
13. ✅ **Verificar:** El historial de compras está vacío (no ves las compras de Test 1)
14. Realiza una compra
15. ✅ **Verificar:** Solo ves tu compra, no las del otro usuario

---

### Prueba 3: Métodos de Pago por Usuario

1. Con "Usuario Test 1" logueado
2. Ve a **Perfil** → pestaña "Configuración"
3. Haz clic en "Agregar método"
4. Agrega una tarjeta de prueba:
   - Banco: "Banco Ganadero"
   - Número: "1234 5678 9012 3456"
   - Titular: "Juan Pérez"
5. ✅ **Verificar:** La tarjeta se guarda correctamente

**Cambiar de usuario:**

6. Cierra sesión
7. Inicia sesión con "Usuario Test 2"
8. Ve a **Perfil** → pestaña "Configuración"
9. ✅ **Verificar:** No ves la tarjeta de Test 1
10. Agrega un método PayPal:
    - Email: "test2@paypal.com"
11. ✅ **Verificar:** Solo ves tu método PayPal

---

### Prueba 4: Contador de Compras

1. Inicia sesión con cualquier usuario
2. Ve a tu **Perfil**
3. Observa el número en "Compras realizadas" (ej: 2)
4. Ve a la **Tienda** y realiza otra compra
5. Vuelve al **Perfil**
6. ✅ **Verificar:** El contador aumentó (ahora dice 3)

---

### Prueba 5: Datos Reales en el Perfil

1. Registra un usuario con nombre específico:
   - Nombre: "María González"
   - Email: "maria@example.com"
2. Ve a tu **Perfil**
3. ✅ **Verificar:** El nombre mostrado es "María González"
4. ✅ **Verificar:** El username es "@maria"
5. Haz clic en "Editar Perfil"
6. ✅ **Verificar:** El formulario muestra "María González", no "Isabella Rossi"

---

### Prueba 6: Registro Funcional

1. Ve a `/login`
2. Haz clic en "¿No tienes cuenta? Regístrate"
3. Completa el formulario:
   - Nombre: "Nuevo Usuario"
   - Email: "nuevo@example.com"
   - Password: "test123"
4. Haz clic en "Crear Cuenta"
5. ✅ **Verificar:** Eres redirigido a la página principal
6. ✅ **Verificar:** En la consola ves:
   ```javascript
   Registro - Respuesta completa: { mensaje: "Usuario registrado...", usuario: {...}, token: "..." }
   Registro - Usuario creado: { id: "...", nombre: "Nuevo Usuario", rol: "usuario" }
   ```

---

## 🔍 Verificación en LocalStorage

Abre las DevTools (F12) → Application → Local Storage → http://localhost:5173

Deberías ver:
- `token` - JWT del usuario actual
- `user` - Objeto del usuario con `{ id, nombre, email, rol }`
- `cart_[userId]` - Carrito específico del usuario
- `purchases_[userId]` - Compras específicas del usuario
- `paymentMethods_[userId]` - Métodos de pago específicos del usuario

**Ejemplo:**
```
cart_68feccaded7db167db1bfa00    -> Carrito del usuario con ID "68fec..."
purchases_68feccaded7db167db1bfa00 -> Compras del usuario con ID "68fec..."
```

---

## ⚠️ Troubleshooting

### El panel de moderación no aparece

1. Abre la consola del navegador (F12)
2. Busca estos logs:
   ```
   AuthContext Estado actual: { isAdmin: false, ... }
   ```
3. Si `isAdmin` es `false`, verifica:
   - ¿Iniciaste sesión con `admin@anmicafe.com`?
   - ¿El backend retornó `rol: "admin"`?
4. Ejecuta de nuevo: `node create-admin.js`

### Las compras se comparten entre usuarios

1. Limpia el localStorage: DevTools → Application → Clear storage
2. Recarga la página
3. Vuelve a iniciar sesión

### El contador no se actualiza

1. Recarga la página después de realizar una compra
2. El contador usa `purchases.length`, verifica en consola:
   ```javascript
   const { purchases } = useCart();
   console.log(purchases);
   ```

---

## 📊 Estado de los Cambios

| Funcionalidad | Estado | Archivo Principal |
|---------------|--------|-------------------|
| Compras por usuario | ✅ Completado | `CartContext.jsx` |
| Pagos por usuario | ✅ Completado | `UserContext.jsx` |
| Panel admin | ✅ Completado | `Header.jsx`, `AuthContext.jsx` |
| Contador compras | ✅ Completado | `UserProfile.jsx` |
| Sin hardcoding | ✅ Completado | `UserProfile.jsx` |
| Sin emojis | ✅ Completado | Todos los archivos |
| Registro funcional | ✅ Completado | `auth.controller.js` |

---

## 📝 Notas Finales

- El usuario admin fue creado con ID: `68feccaded7db167db1bfa00`
- Todos los datos se persisten en localStorage con prefijo por usuario
- Los logs de debug están activos en `AuthContext.jsx` para facilitar troubleshooting
- El backend no encripta passwords (solo para desarrollo/aprendizaje)

**¡Listo para probar!** 🎉
