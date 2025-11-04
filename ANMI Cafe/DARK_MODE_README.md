# 🌓 Sistema de Modo Oscuro - ANMI Café

## ✅ Implementación Completada

Se ha implementado un sistema completo de cambio de tema (modo oscuro/claro) que cumple con todos los criterios de UI/UX y accesibilidad.

## 📦 Archivos Creados/Modificados

### Nuevos Archivos:
- **`src/contexts/ThemeContext.jsx`** - Contexto React para gestión del tema

### Archivos Modificados:
- **`src/main.jsx`** - Agregado ThemeProvider
- **`src/components/Header.jsx`** - Botón de cambio de tema
- **`src/index.css`** - Variables CSS y estilos para modo oscuro

## 🎨 Características Implementadas

### 1. **Visualmente Claro y Accesible**
- ✅ Íconos Material Symbols: `light_mode` (☀️) y `dark_mode` (🌙)
- ✅ Contraste WCAG AA: Fondos claros y textos oscuros optimizados
- ✅ Transiciones suaves: `transition: 0.3s ease` en todos los elementos

### 2. **Ubicación y Jerarquía**
- ✅ Posicionado en el header, antes del carrito de compras
- ✅ No compite visualmente con acciones primarias
- ✅ Diseño sutil que no distrae del contenido principal

### 3. **Comportamiento Interactivo**
- ✅ Toggle entre modo claro y oscuro con un clic
- ✅ Aplica clase `dark` al elemento `<html>`
- ✅ Persistencia en `localStorage` (clave: `theme`)
- ✅ Detecta preferencia del sistema operativo si no hay valor guardado

### 4. **Estilos CSS Modulares**
- ✅ Variables CSS definidas:
  ```css
  /* Modo Claro */
  --bg-color: #ffffff
  --text-color: #131811
  --card-bg: #ffffff
  --border-color: #e5e7eb
  
  /* Modo Oscuro */
  --bg-color: #121212
  --text-color: #f5f5f5
  --card-bg: #1e1e1e
  --border-color: #2d2d2d
  ```

### 5. **Accesibilidad y UX**
- ✅ `aria-label` dinámico: "Activar modo claro" / "Activar modo oscuro"
- ✅ Atributo `title` para tooltip
- ✅ `focus:ring-2` para navegación por teclado
- ✅ Estados hover mejorados
- ✅ Íconos con variación de relleno (`'FILL' 1` para sol)

## 🚀 Cómo Usar

### Para el Usuario Final:
1. Busca el botón en la esquina superior derecha del header
2. Haz clic en el ícono de sol/luna para cambiar el tema
3. Tu preferencia se guarda automáticamente

### Para Desarrolladores:

**Usar el contexto de tema en cualquier componente:**
```jsx
import { useTheme } from '../contexts/ThemeContext';

function MiComponente() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Tema actual: {isDarkMode ? 'Oscuro' : 'Claro'}</p>
      <button onClick={toggleTheme}>Cambiar tema</button>
    </div>
  );
}
```

**Usar variables CSS:**
```css
.mi-componente {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
```

## 🎯 Compatibilidad con Tailwind

El sistema funciona perfectamente con las clases `dark:` de Tailwind:

```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Contenido adaptable al tema
</div>
```

## 🔧 Personalización

### Cambiar Colores del Modo Oscuro:
Edita las variables en `src/index.css`:
```css
.dark {
  --bg-color: #tu-color-fondo;
  --text-color: #tu-color-texto;
  /* ... más variables */
}
```

### Deshabilitar Transiciones:
Si las transiciones causan problemas de rendimiento:
```css
/* Elimina o comenta esta línea en index.css */
* {
  /* transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; */
}
```

## 🧪 Testing

**Probar el modo oscuro:**
1. Abre la aplicación
2. Haz clic en el botón de tema
3. Verifica que:
   - Los colores cambien suavemente
   - El ícono se actualice (sol ↔ luna)
   - La preferencia persista al recargar la página
   - La navegación por teclado funcione (Tab + Enter)

**Probar preferencia del sistema:**
1. Borra el localStorage: `localStorage.removeItem('theme')`
2. Recarga la página
3. Debe adoptar el tema del sistema operativo

## 📱 Responsive

El botón es completamente responsive:
- **Desktop**: Visible entre los controles del header
- **Mobile**: Mantiene su funcionalidad y accesibilidad

## ♿ Accesibilidad

- **Lectores de pantalla**: Anuncian correctamente el estado actual
- **Teclado**: Navegable con Tab, activable con Enter/Space
- **Alto contraste**: Los colores cumplen con WCAG AA
- **Reducción de movimiento**: Respeta `prefers-reduced-motion`

## 🐛 Troubleshooting

**Problema**: El tema no persiste
- **Solución**: Verifica que localStorage esté habilitado en el navegador

**Problema**: Transiciones muy lentas
- **Solución**: Reduce la duración en `index.css` (de 0.3s a 0.15s)

**Problema**: Colores no cambian en algunos componentes
- **Solución**: Asegúrate de usar clases `dark:` de Tailwind o variables CSS

## 📚 Referencias

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Estado**: ✅ Producción
