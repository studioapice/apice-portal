# TEMPORARY — NAVI OS presentation on apicestudioportal.com

Este repositorio (`studioapice/apice-portal`, rama `main`, proyecto Vercel `apice-portal`)
sirve **temporalmente** la presentación privada NAVI OS en https://www.apicestudioportal.com/.
No hay retirada automática: se decide manualmente.

## Qué había antes

- Portal estático de Ápice Studio (HTML: `index.html`, `admin-login.html`, `admin.html`, `dashboard.html`,
  `documentos.html`, `ideas.html`, `material.html`).
- Commit: `2a6e943` ("Delete ápice-studio directory").
- Protegido en:
  - tag **`apice-portal-before-navi`**
  - rama **`archive/apice-portal-before-navi`**

## Qué contiene ahora

- Commit `feat: temporarily deploy NAVI OS presentation` sobre `main`.
- Código idéntico al de la presentación NAVI OS aprobada (repo local `NAVI OS`, commit `0ad5299`),
  más estas piezas **temporales** propias del despliegue:

| Archivo | Para qué |
|---|---|
| `src/proxy.ts`, `src/lib/access.ts`, `src/app/access/page.tsx`, `src/app/api/access/route.ts` | Acceso privado con contraseña (validación en el servidor, cookie httpOnly de 7 días, *fail closed* si falta la variable) |
| `src/app/robots.ts`, cabecera `X-Robots-Tag` en `next.config.ts`, `robots` en `src/app/layout.tsx` | `noindex, nofollow, noarchive` |
| `vercel.json` (`"framework": "nextjs"`) | El proyecto Vercel se creó para HTML estático; fija el framework para este despliegue sin tocar la configuración del proyecto |

## Variable de entorno (Vercel → apice-portal → Settings → Environment Variables)

- `NAVI_PRESENTATION_PASSWORD` (Production). Sin ella nadie puede entrar (*fail closed*).
- Tras crearla o cambiarla: **Redeploy** del último deployment de producción.
- Al retirar NAVI OS: **borrar** esta variable.

## Cómo restaurar el portal anterior

Sin reescribir historial (sin force push):

```bash
git clone https://github.com/studioapice/apice-portal.git && cd apice-portal
git checkout main
git rm -r -q .
git checkout apice-portal-before-navi -- .
git commit -m "revert: restore Ápice Portal (end of temporary NAVI OS deployment)"
git push origin main
```

Vercel desplegará automáticamente `main`. Como el portal restaurado ya no incluye `vercel.json`,
Vercel vuelve a la configuración del proyecto (sitio estático). Después, borrar
`NAVI_PRESENTATION_PASSWORD` en Vercel.

Alternativa inmediata (sin tocar Git): en Vercel → Deployments, hacer **Promote to Production /
Instant Rollback** sobre el último deployment de producción del commit `2a6e943`.
