# Script de verificación para el proyecto ANMI Café
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Verificación de Correcciones" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar estructura de archivos
Write-Host "1. Verificando archivos modificados..." -ForegroundColor Yellow
$files = @(
    "ANMI Cafe\frontend\src\context\CartContext.jsx",
    "ANMI Cafe\frontend\src\context\UserContext.jsx",
    "ANMI Cafe\frontend\src\pages\UserProfile.jsx",
    "ANMI Cafe\frontend\src\contexts\AuthContext.jsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✓ $($file.Split('\')[-1]) existe" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $($file.Split('\')[-1]) no existe" -ForegroundColor Red
    }
}
Write-Host ""

# 2. Verificar que no hay emojis en archivos backend
Write-Host "2. Buscando emojis en backend..." -ForegroundColor Yellow
$backendFiles = Get-ChildItem -Path "ANMI Cafe\backend\src" -Recurse -Filter "*.js"
$emojiPattern = "✅|❌|🔧|📥|👤|👑|🔍|⚠️|🚀|📚"
$foundEmojis = $false

foreach ($file in $backendFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -match $emojiPattern) {
        $foundEmojis = $true
        Write-Host "  ✗ Emojis encontrados en $($file.Name)" -ForegroundColor Red
    }
}

if (-not $foundEmojis) {
    Write-Host "  ✓ No se encontraron emojis en backend" -ForegroundColor Green
}
Write-Host ""

# 3. Verificar que CartContext usa userId
Write-Host "3. Verificando CartContext por usuario..." -ForegroundColor Yellow
$cartContent = Get-Content "ANMI Cafe\frontend\src\context\CartContext.jsx" -Raw
if ($cartContent -match 'cart_\$\{userId\}') {
    Write-Host "  ✓ CartContext usa almacenamiento por usuario" -ForegroundColor Green
} else {
    Write-Host "  ✗ CartContext no está usando almacenamiento por usuario" -ForegroundColor Red
}
Write-Host ""

# 4. Verificar que UserContext usa userId
Write-Host "4. Verificando UserContext por usuario..." -ForegroundColor Yellow
$userContent = Get-Content "ANMI Cafe\frontend\src\context\UserContext.jsx" -Raw
if ($userContent -match 'paymentMethods_\$\{userId\}') {
    Write-Host "  ✓ UserContext usa almacenamiento por usuario" -ForegroundColor Green
} else {
    Write-Host "  ✗ UserContext no está usando almacenamiento por usuario" -ForegroundColor Red
}
Write-Host ""

# 5. Verificar que Header tiene link admin
Write-Host "5. Verificando link de moderación en Header..." -ForegroundColor Yellow
$headerContent = Get-Content "ANMI Cafe\frontend\src\components\Header.jsx" -Raw
if ($headerContent -match 'isAdmin' -and $headerContent -match '/moderacion') {
    Write-Host "  ✓ Header tiene verificación de admin y link a moderación" -ForegroundColor Green
} else {
    Write-Host "  ✗ Header no tiene configuración completa de admin" -ForegroundColor Red
}
Write-Host ""

# 6. Verificar que UserProfile no tiene datos hardcodeados
Write-Host "6. Verificando UserProfile..." -ForegroundColor Yellow
$profileContent = Get-Content "ANMI Cafe\frontend\src\pages\UserProfile.jsx" -Raw
if ($profileContent -match 'Isabella Rossi') {
    Write-Host "  ✗ UserProfile todavía tiene datos hardcodeados" -ForegroundColor Red
} else {
    Write-Host "  ✓ UserProfile usa datos reales del usuario" -ForegroundColor Green
}
Write-Host ""

# 7. Verificar contador de compras
Write-Host "7. Verificando contador de compras..." -ForegroundColor Yellow
if ($profileContent -match 'purchases\.length') {
    Write-Host "  ✓ Contador de compras usa datos reales" -ForegroundColor Green
} else {
    Write-Host "  ✗ Contador de compras no está configurado" -ForegroundColor Red
}
Write-Host ""

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Verificación completada" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Ejecutar: cd 'ANMI Cafe\backend' && node create-admin.js" -ForegroundColor White
Write-Host "2. Iniciar backend: cd 'ANMI Cafe\backend' && npm run dev" -ForegroundColor White
Write-Host "3. Iniciar frontend: cd 'ANMI Cafe\frontend' && npm run dev" -ForegroundColor White
Write-Host "4. Probar login con admin@anmicafe.com / admin123" -ForegroundColor White
