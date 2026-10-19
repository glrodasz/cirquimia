# Cirquimia: prueba de estéticas

Copia del prototipo de la pradera con un selector de estética en el HUD. El build original (`play/cirquimia-pradera.html`, `src/`) no se tocó.

- `cirquimia-estilos.html`: build de un solo archivo; el selector recuerda la elección. También acepta `?look=actual|musgo|otono|bruma|diorama|pixel|grabado`.
- `capturas/`: capturas 1280×800 de cada estilo `comparativa.png` (estilos) y `paletas.png` (paletas low poly).
- `src/`: archivos que cambian respecto a `cirquimia/src` (`looks.ts` nuevo; `main.ts`, `meadow.ts`, `index.html` modificados). Para probar: copiarlos sobre el proyecto y `npm run dev`.

| Estilo | Qué cambia | Coste extra |
| --- | --- | --- |
| Actual | Lambert facetado + tilt-shift | — |
| Low poly · Musgo / Otoño / Bruma | Mismo low poly facetado con paletas apagadas (salvia, ocre, verde-azulado), luces más suaves y cámara más cerca | Ninguno |
| Diorama toon | Sombreado toon de 3 bandas, contornos de tinta cálida, suelo pintado suave, sol bajo, cámara más cerca, tilt-shift | 1 pase de normales/profundidad (≈2× draw calls) + 1 pase full-screen |
| Pixel art 3D | Render a 1/3 de resolución con escalado nearest, contornos de 1 px, posterizado con dither | Más barato que el actual en GPU (≈9× menos píxeles) |
| Grabado alquímico | Papel, tramado a plumilla según la luz, contornos de tinta | 1 pase de normales/profundidad + 1 pase full-screen |

Los estilos nuevos usan la cámara a 6.5 unidades de alto en vez de 9 (personaje más grande).
