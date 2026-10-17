# Gestor de Biblioteca — Clase 15 (UMG)

Aplicación web estática para el ejercicio en grupo **Pruebas Cypress y Pull Requests**.

## Requisitos

- Node.js y npm instalados
- Git y VS Code
- Acceso a GitHub

## Ejecutar en la laptop (Windows / PowerShell)

```powershell
npm.cmd install
npm.cmd start
```

Abrir `http://localhost:3000` e iniciar sesión con **admin / admin123**.

En otra terminal:

```powershell
npx.cmd cypress run --browser electron
```

**Resultado esperado:** `4 passing` y `0 failing`. La tabla empieza vacía. Los libros se guardan en `localStorage`.

## Integrante 1 — Base

En la carpeta del proyecto, ejecutar en PowerShell:

```powershell
git init
git add .
git commit -m "Primera version: pagina y pruebas"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/biblioteca.git
git push -u origin main
```

**Importante:** crear previamente un repositorio GitHub vacío llamado `biblioteca`, sin README ni `.gitignore` autogenerados, y reemplazar `TU-USUARIO` por el usuario correcto. Si el proyecto ya tiene Git iniciado, no repetir `git init`. En GitHub > Actions comprobar que pasan 4 pruebas. En Settings > Collaborators agregar a los otros dos participantes.

## Integrante 2 — Falla intencional

Clonar el repositorio, crear rama `falla` y, en **`public/app.js`**, comentar únicamente este bloque ubicado dentro de `agregarLibro`:

```javascript
if (!Number.isInteger(copias) || copias <= 0) {
  mensaje.textContent = "El número de copias debe ser mayor que 0.";
  return;
}
```

No modificar `cypress/e2e/biblioteca.cy.js`. Subir la rama, abrir Pull Request y verificar CI **rojo**. Descargar `evidencia-cypress` de Actions y aceptar el PR con *Merge pull request*.

## Integrante 3 — Reparación

Actualizar `main`, crear rama `arreglo`, **restaurar exactamente la validación anterior** en `public/app.js`, hacer commit, push, abrir PR, comprobar CI **verde** y aceptar el PR.

## Archivos importantes

- `public/index.html`: interfaz y selectores exactos del ejercicio
- `public/styles.css`: estilos adaptables
- `public/app.js`: login, localStorage, libros, validaciones y eliminación
- `cypress/e2e/biblioteca.cy.js`: **4 pruebas copiadas sin modificar**
- `cypress.config.js`: URL base y video
- `.github/workflows/cypress.yml`: ejecución en push/PR y guardado de evidencia con `if: always()`

## Evidencias a entregar

1. Video y capturas del CI rojo descargados de Actions (`evidencia-cypress`).
2. Capturas de comandos de rama, commit y push por integrante.
3. Dos Pull Requests aprobados (Merged).
4. Captura de VS Code con ramas y checks finales verdes.
5. Enlace al repositorio. Si no se presenta en clase, video explicativo con voz y cámara mostrando los cinco puntos.

> Proyecto académico de demostración. Las credenciales fijas y localStorage no son un sistema de autenticación para producción.
