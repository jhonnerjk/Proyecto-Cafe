# ☕ ANMI Cafe – Proyecto Fullstack

##  Instalación de dependencias
```bash
cd frontend
npm install
cd backend
npm install
```
## Como clonar el repositorio
```bash
git clone <URL-del-repo>
cd ANMI CAFE
```
## como subir el archivo al repositorio para que los demas colaboradores vean los cambios
```bash
# Verificar qué archivos cambiaron
git status


#eso es si es la primera vez, seguir los pasos hasta el ultimo
git init
git remote add origin https://github.com/jhonnerjk/Proyecto-Cafe.git

# Agregar los cambios
git add .

# Crear un commit con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# Subir los cambios a GitHub
git push origin main



#desde la terminal de vscode debe quedar asi PS C:\Users\hp\Documents\ANMI Cafe>, es un ejemplo|
git pull origin main
git commit -m "Resuelvo conflictos de merge"
git push origin main


```
## Como actualizar el proyecto y ver los cambios de otros colaboradores
```bash
# Traer los cambios del repositorio remoto
git pull

# Si cambió el package.json o package-lock.json, reinstalar dependencias
cd frontend
npm install

cd backend
npm install
```
## Si hay algun error verifica que el nombre del archivo este correcto
