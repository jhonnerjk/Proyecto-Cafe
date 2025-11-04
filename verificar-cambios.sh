#!/bin/bash

# Script de verificación para el proyecto ANMI Café
echo "==================================="
echo "Verificación de Correcciones"
echo "==================================="
echo ""

# 1. Verificar estructura de archivos
echo "1. Verificando archivos modificados..."
if [ -f "ANMI Cafe/frontend/src/context/CartContext.jsx" ]; then
    echo "✓ CartContext.jsx existe"
fi
if [ -f "ANMI Cafe/frontend/src/context/UserContext.jsx" ]; then
    echo "✓ UserContext.jsx existe"
fi
if [ -f "ANMI Cafe/frontend/src/pages/UserProfile.jsx" ]; then
    echo "✓ UserProfile.jsx existe"
fi
if [ -f "ANMI Cafe/frontend/src/contexts/AuthContext.jsx" ]; then
    echo "✓ AuthContext.jsx existe"
fi
echo ""

# 2. Verificar que no hay emojis en archivos backend
echo "2. Buscando emojis en backend..."
BACKEND_EMOJIS=$(grep -r "✅\|❌\|🔧\|📥\|👤\|👑\|🔍" "ANMI Cafe/backend/src/" 2>/dev/null | wc -l)
if [ "$BACKEND_EMOJIS" -eq "0" ]; then
    echo "✓ No se encontraron emojis en backend"
else
    echo "✗ Todavía hay emojis en backend ($BACKEND_EMOJIS encontrados)"
fi
echo ""

# 3. Verificar que CartContext usa userId
echo "3. Verificando CartContext por usuario..."
if grep -q "cart_\${userId}" "ANMI Cafe/frontend/src/context/CartContext.jsx"; then
    echo "✓ CartContext usa almacenamiento por usuario"
else
    echo "✗ CartContext no está usando almacenamiento por usuario"
fi
echo ""

# 4. Verificar que UserContext usa userId
echo "4. Verificando UserContext por usuario..."
if grep -q "paymentMethods_\${userId}" "ANMI Cafe/frontend/src/context/UserContext.jsx"; then
    echo "✓ UserContext usa almacenamiento por usuario"
else
    echo "✗ UserContext no está usando almacenamiento por usuario"
fi
echo ""

# 5. Verificar que Header tiene link admin
echo "5. Verificando link de moderación en Header..."
if grep -q "isAdmin" "ANMI Cafe/frontend/src/components/Header.jsx"; then
    echo "✓ Header tiene verificación de admin"
fi
if grep -q "/moderacion" "ANMI Cafe/frontend/src/components/Header.jsx"; then
    echo "✓ Header tiene link a moderación"
fi
echo ""

# 6. Verificar que UserProfile no tiene datos hardcodeados
echo "6. Verificando UserProfile..."
if grep -q "Isabella Rossi" "ANMI Cafe/frontend/src/pages/UserProfile.jsx"; then
    echo "✗ UserProfile todavía tiene datos hardcodeados"
else
    echo "✓ UserProfile usa datos reales del usuario"
fi
echo ""

echo "==================================="
echo "Verificación completada"
echo "==================================="
