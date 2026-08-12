# App Store privado

Página estática para publicar builds Android en GitHub Pages.

## Añadir una versión

1. Copia la APK en `apks/<id-app>/` usando un nombre que incluya la versión.
2. Añade la versión al principio del array `versions` de la app en `data/apps.js`.
3. Añade sus notas en `changes` y la huella SHA-256 en `sha256`.
4. Para nuevas capturas, copia PNGs a `assets/screenshots/` y añádelas al array `screenshots`.

En PowerShell puedes obtener la huella con:

```powershell
Get-FileHash .\apks\mi-app\mi-app-1.2.0.apk -Algorithm SHA256
```

La página no necesita compilación ni dependencias. Se publica desde `/app-store/`.

## Actualizar todas las apps automáticamente

El script `tools/update-app-store.ps1` busca el APK distribuible más reciente de cada
proyecto configurado en `tools/app-sources.json`. No compila las aplicaciones.

Requisitos locales:

- Node.js disponible en `PATH`.
- Android SDK con `aapt` y `apksigner` en `build-tools`.
- Git configurado para poder enviar cambios a `origin`.

Primero conviene simular la actualización:

```powershell
.\app-store\tools\update-app-store.ps1 -DryRun
```

Actualizar los APKs y el catálogo sin publicar:

```powershell
.\app-store\tools\update-app-store.ps1
```

Actualizar, validar, hacer commit y push de todo `app-store`:

```powershell
.\app-store\tools\update-app-store.ps1 -Publish
```

También se puede limitar a una o varias aplicaciones:

```powershell
.\app-store\tools\update-app-store.ps1 -App startrail -DryRun
.\app-store\tools\update-app-store.ps1 -App mochilalist,startrail -Publish
```

El script:

1. Busca APKs firmados y descarta releases `unsigned` y archivos de más de 100 MiB.
2. Prioriza artefactos de `build/outputs`; usa `build/intermediates/apk` solo si el
   proyecto no tiene una salida distribuible.
3. Verifica que el `packageName` coincida con la ficha de la app.
4. Compara SHA-256 para no duplicar builds ya publicados.
5. Copia el APK con nombre versionado y conserva todos los APKs anteriores.
6. Genera el changelog a partir de los commits nuevos del proyecto.
7. Actualiza `data/apps.js`, los contadores y valida de nuevo todos los hashes.
8. Con `-Publish`, confirma únicamente cambios de `app-store` y los envía a la rama
   actual. Si detecta cambios fuera de esa carpeta, se detiene para no mezclarlos.

Para añadir otro proyecto al actualizador, crea primero su ficha en `data/apps.js` y
añade su `id` y `projectRoot` a `tools/app-sources.json`.
