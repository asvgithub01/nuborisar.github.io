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
