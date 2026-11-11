var e=Object.defineProperty,t=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},n=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function r(e){return l(e===0?`<path class="ink" fill-rule="evenodd" d="M12 1.5A10.5 10.5 0 1 1 12 22.5A10.5 10.5 0 1 1 12 1.5ZM12 4.6A7.4 7.4 0 1 0 12 19.4A7.4 7.4 0 1 0 12 4.6Z"/><circle class="red" cx="12" cy="12" r="4"/>`:e===1?u(0,1,`red`):e===2?u(-3.6,.82,`red`)+u(7.9,.82,`green`):u(-2.5,.6,`red`)+u(4.8,.6,`green`)+u(12.1,.6,`plum`))}function i(e){return l([0,1,2,3].map(t=>{let n=6+t*4.3;return`<rect class="${t<e?`ink`:`faint`}" x="${2.6+t*5.1}" y="${21-n}" width="3.6" height="${n}"/>`}).join(``))}function a(){return l(`<path class="ink" d="M11.1 6.3C8.6 4.8 5.6 4.4 2.4 5V18.8C5.6 18.2 8.6 18.6 11.1 20Z"/><path class="ink" d="M12.9 6.3C15.4 4.8 18.4 4.4 21.6 5V18.8C18.4 18.2 15.4 18.6 12.9 20Z"/>`)}function o(){return l(`<path class="ink" fill-rule="evenodd" d="M6.6 8.6C6.6 5.4 9 3.2 12.2 3.2S17.6 5.2 17.6 8C17.6 10.1 16.4 11.2 15 12.2C13.9 13 13.6 13.5 13.6 14.6V15.4H10.3V14.3C10.3 12.4 11 11.4 12.6 10.2C13.7 9.4 14.2 8.9 14.2 8.1C14.2 7 13.4 6.3 12.1 6.3C10.8 6.3 9.9 7.2 9.9 8.6Z"/><rect class="ink" x="10.1" y="17.4" width="3.7" height="3.6"/>`)}function s(){return l(`<path class="ink" fill-rule="evenodd" d="M6.8 3H17.2V4.6H20.6V7.4C20.6 10 18.8 12 16.4 12.4C15.6 14 14.4 15 13 15.3V18H16V20H8V18H11V15.3C9.6 15 8.4 14 7.6 12.4C5.2 12 3.4 10 3.4 7.4V4.6H6.8ZM5.4 6.6V7.4C5.4 8.7 6.1 9.7 7.1 10.2C6.9 9.4 6.8 8.6 6.8 7.7V6.6ZM18.6 6.6H17.2V7.7C17.2 8.6 17.1 9.4 16.9 10.2C17.9 9.7 18.6 8.7 18.6 7.4Z"/><rect class="ink" x="6.5" y="20.6" width="11" height="1.6"/>`)}function c(e){return l(`<path class="ink" d="M3 9H7.2L12.6 4.4V19.6L7.2 15H3Z"/>`+(e?`<path class="ink" d="M15.2 8.6A4.6 4.6 0 0 1 15.2 15.4L13.9 14.1A2.8 2.8 0 0 0 13.9 9.9Z"/><path class="ink" d="M17.6 6.2A8 8 0 0 1 17.6 17.8L16.3 16.5A6.2 6.2 0 0 0 16.3 7.5Z"/>`:`<path class="red" d="M15 8.4L16.3 7.1L18.6 9.4L20.9 7.1L22.2 8.4L19.9 10.7L22.2 13L20.9 14.3L18.6 12L16.3 14.3L15 13L17.3 10.7Z"/>`))}var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O=t((()=>{l=(e,t=``)=>`<svg class="hud-icon${t?` ${t}`:``}" viewBox="0 0 24 24" aria-hidden="true">${e}</svg>`,u=(e,t,n)=>`<g class="${n}" transform="translate(${e} ${24-24*t}) scale(${t})"><circle cx="12" cy="7.2" r="3.9"/><path d="M4.2 21.5C4.2 16.4 7.6 12.8 12 12.8S19.8 16.4 19.8 21.5Z"/></g>`,d=(e,t=`ink`,n=`0 0 24 24`)=>`<svg viewBox="${n}" aria-hidden="true"><path class="${t}" fill-rule="evenodd" d="${e}"/></svg>`,f=`M8 2H16A1.5 1.5 0 0 1 17.5 3.5V20.5A1.5 1.5 0 0 1 16 22H8A1.5 1.5 0 0 1 6.5 20.5V3.5A1.5 1.5 0 0 1 8 2ZM8.5 4.5V17.5H15.5V4.5ZM12 18.9A.9.9 0 1 0 12 20.7A.9.9 0 1 0 12 18.9Z`,p=(e=``)=>`<svg class="phone${e?` ${e}`:``}" viewBox="0 0 24 24" aria-hidden="true"><path class="ink" fill-rule="evenodd" d="${f}"/></svg>`,m=()=>d(`M12 2.2C12.7 5.6 18 8 18 13.8A6 6 0 0 1 6 13.8C6 11 7.5 9.2 8.8 8C9 9.8 9.8 11 11 11.5C10.4 7.9 11.2 4.9 12 2.2ZM12 13.2C10.6 14.6 10 15.6 10 16.6A2 2 0 0 0 14 16.6C14 15.6 13.4 14.6 12 13.2Z`,`fire`),h=()=>d(`M12 2.4C15.2 6.8 18.2 10.2 18.2 14.2A6.2 6.2 0 0 1 5.8 14.2C5.8 10.2 8.8 6.8 12 2.4ZM8.6 14.4A3.4 3.4 0 0 0 11 17.6L11.4 16.3A2.1 2.1 0 0 1 9.9 14.4Z`,`water`),g=()=>d(`M12 2.8A9.2 9.2 0 1 1 12 21.2A9.2 9.2 0 1 1 12 2.8ZM12 5A7 7 0 1 0 12 19A7 7 0 1 0 12 5ZM12 7.6 13.2 10.8 16.4 12 13.2 13.2 12 16.4 10.8 13.2 7.6 12 10.8 10.8Z`),_=()=>d(`M9.6 2H14.4V12.6H19.6L12 22 4.4 12.6H9.6Z`,`ink`),v=()=>`<svg class="arrow" viewBox="0 0 40 20" aria-hidden="true"><path fill-rule="evenodd" d="M2 8.4H29.5V3L38 10 29.5 17V11.6H2Z"/></svg>`,y=()=>`<svg class="gpu-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill-rule="evenodd" d="M24 4.5A19.5 19.5 0 1 1 24 43.5A19.5 19.5 0 1 1 24 4.5ZM24 7.2A16.8 16.8 0 1 0 24 40.8A16.8 16.8 0 1 0 24 7.2ZM24 11 37.2 34.4H10.8ZM24 20.2A5 5 0 1 0 24 30.2A5 5 0 1 0 24 20.2Z"/></svg>`,b=()=>d(`M19.4 13A7.6 7.6 0 0 0 19.4 11L21.4 9.4 19.4 6 17 7A7.4 7.4 0 0 0 15.3 6L15 3.5H11L10.6 6A7.4 7.4 0 0 0 8.9 7L6.5 6 4.5 9.4 6.5 11A7.6 7.6 0 0 0 6.5 13L4.5 14.6 6.5 18 8.9 17A7.4 7.4 0 0 0 10.6 18L11 20.5H15L15.4 18A7.4 7.4 0 0 0 17.1 17L19.5 18 21.5 14.6ZM12 9A3 3 0 1 0 12 15A3 3 0 1 0 12 9Z`),x=e=>`<svg class="brand-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="${e}"/></svg>`,S=()=>x(`M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z`),C=()=>x(`M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z`),w=()=>x(`M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z`),T=()=>x(`M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z`),E=()=>x(`M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z`),D=()=>x(`M11 3h2v9.2l3.3-3.3 1.4 1.4L12 16l-5.7-5.7 1.4-1.4 3.3 3.3V3ZM4 18h16v2.4H4Z`)}));function k(e){return typeof e==`string`&&ne.includes(e)}function A(e){let t=e.split(`/`)[1];return t!==`en`&&k(t)?t:null}function ee(e){let t=A(e);return t?e.slice(t.length+1)||`/`:e}function te(e,t){let n=ee(e);return t===`en`?n:n===`/`?`/${t}`:`/${t}${n}`}function j(e){for(let t of e){let e=t.toLowerCase().split(`-`)[0];if(k(e))return e}return`en`}var ne,re,ie=t((()=>{ne=[`en`,`es`],re={en:`English`,es:`Español`}})),ae=t((()=>{ie()})),oe,se=t((()=>{oe=`https://cirquimia.pages.dev/api`}));function ce(){let e=new URLSearchParams(location.search).get(`lang`);if(k(e))return e;try{let e=localStorage.getItem(fe);if(k(e))return e}catch{}return j(navigator.languages??[navigator.language])}function le(e){{let t=new URLSearchParams(location.search);return t.set(`lang`,e),`?${t}${location.hash}`}}function ue(e){try{localStorage.setItem(fe,e)}catch{}}function de(e,t,n=re[e]){let r=document.createElement(`a`);return r.className=t,r.href=le(e),r.hreflang=e,r.lang=e,r.textContent=n,r.setAttribute(`aria-label`,me[e].switchLanguage),e===pe&&r.setAttribute(`aria-current`,`page`),r.addEventListener(`click`,()=>ue(e)),r}var fe,pe,me,M,he,ge=t((()=>{ie(),ae(),se(),fe=`cirquimia.lang`,pe=typeof location>`u`?`en`:ce(),me={es:{title:`Cirquimia`,switchLanguage:`Cambiar a español`,difficulty:{facil:`Fácil`,normal:`Normal`,dificil:`Difícil`,experto:`Muy difícil`},match:{toolbar:`Partida`,rivalsCap:e=>e===0?`Entrenamiento`:`<b>${e}</b> ${e===1?`rival`:`rivales`}`,rivalsAria:e=>`${e===0?`Entrenamiento, sin rivales`:`Rivales: ${e}`}. Toca para cambiar y reiniciar la partida`,levelAria:e=>`Dificultad: ${e}. Toca para cambiar y reiniciar la partida`,restarted:(e,t)=>e===0?`Entrenamiento`:`Nueva partida · ${e===1?`1 rival`:`${e} rivales`} · ${t}`,again:`Jugar de nuevo`,victory:`¡Victoria!`,victoryAria:`Victoria`,defeat:`Game Over`,won:(e,t)=>`Venciste a ${e===1?`tu rival`:`tus ${e} rivales`} · ${t}`,lost:e=>`Has caído en combate · ${e}`,spotTitle:`¿Quieres más reto?`,spotBody:`Toca aquí para cambiar el número de rivales y la dificultad.`},rank:{button:`Ranking`,title:`Ranking global`,today:`Hoy`,all:`Siempre`,points:e=>e===1?`punto`:`puntos`,rivals:e=>e===1?`1 rival`:`${e} rivales`,damage:e=>`${e} de daño`,placeToday:e=>`#${e} hoy`,placed:(e,t)=>`Puesto <b>#${e}</b> de hoy · <b>#${t}</b> global`,beatMe:`¿Me superas?`,shareText:(e,t,n,r,i)=>`⚗️ ${e} puntos en Cirquimia: vencí a ${n===1?`1 rival`:`${n} rivales`} en ${r} en ${t}. ¿Me superas? ${i}`,initials:`Tus iniciales`,save:`Guardar`,saving:`Guardando…`,share:`Compartir`,more:`Más`,saveImage:`Guardar imagen`,dare:(e,t)=>`¿Quién supera tus ${e} ${t}?`,postOnX:`Publicar en`,sendDiscord:`Enviar a`,preview:`Tu tarjeta: toca para guardarla`,xCopied:`Imagen copiada: pégala en tu post de X.`,discordCopied:`Imagen copiada: pégala en Discord.`,discordSaved:`Imagen guardada: súbela a Discord.`,mastodonHost:`Tu servidor (ej. mastodon.social)`,go:`Ir`,view:`Ver ranking`,unavailable:`El ranking no está disponible ahora.`,tooMany:`Demasiados envíos seguidos. Prueba en unos minutos.`,rejected:`Esta partida no puede entrar al ranking.`,empty:`Nadie ha puntuado todavía. ¡Sé el primero!`,loading:`Cargando…`,close:`Cerrar`,category:{mobile:`Móvil`,tablet:`Tablet`,desktop:`Escritorio`},columns:[`#`,`Iniciales`,`Puntos`,`Partida`],rule:`Puntos: tu daño × dificultad × rapidez · «Hoy» se reinicia a medianoche UTC`,mine:`Tuyo`},help:{button:`Cómo jugar`,title:`Cómo jugar`,slides:[[`Muévete`,`Toca el suelo y el alquimista <b>camina</b> hasta allí.`],[`Dibuja un símbolo`,`Traza la forma con el dedo: queda <b>lista en tu mano</b>. Solo uno a la vez: uno nuevo reemplaza al anterior. El muro y la cura salen al instante.`],[`Lánzalo`,`Toca al <b>rival</b> y el ataque sale ahí. Toca al alquimista para soltarlo.`]],pad:`Toca el suelo y el alquimista <b>camina</b> hasta allí, o deja el dedo quieto en el <b>aro de abajo a la izquierda</b> y deslízalo.`,slideOf:(e,t)=>`Paso ${e} de ${t}`,pageOf:(e,t)=>`Página ${e} de ${t}`,back:`Atrás`,next:`Siguiente`,close:`Cerrar`,symbolsButton:`Símbolos`,shapesTitle:`Símbolos disponibles`,damage:`Daño`,healing:`Curación`,rooting:`Atrapa`,defence:`Defensa`,names:{circle:`Muro`,square:`Tierra`,triangle:`Fuego`,triangleDown:`Agua`,rhombus:`Cura`,pentagram:`Estrella`,hourglass:`Explosión`,fireStar:`Estrella de fuego`,waterStar:`Estrella de agua`,spiral:`Enredadera`},fireNote:`Fuego: dibuja el triángulo sobre una fogata`,waterNote:`Agua: dibuja el triángulo invertido sobre una laguna`,sourcesTitle:`Fuego, agua y runas`,runesNote:`Desde una runa: +25% de área · curación 33 · sin muros`,comboTitle:`Combinaciones`,comboNote:`Con uno en la mano, dibuja el otro (en cualquier orden): se unen. La explosión pega más en menos área; la estrella de fuego o agua, 20 en cada punta. Atrapado dentro de una estrella, quédate quieto: cruzar sus columnas también golpea.`,howTo:`Cómo jugar`,ok:`Entendido`,go:`¡A jugar!`},tutorial:{move:{walk:[`Muévete hasta la marca`,`Toca el suelo donde brilla.`],pad:[`Muévete hasta la marca`,`Toca el suelo donde brilla, o deja el dedo en el aro y deslízalo.`],keys:[`Muévete hasta la marca`,`Usa WASD o las flechas, o haz clic donde brilla.`],done:`¡Bien! Ahora a pelear.`},square:{draw:[`Dibuja un cuadrado`,`Un cuadrado crea un ataque de tierra.`],aim:[`Toca al rival`,`El ataque de tierra sale justo donde toques.`],watch:`¡Golpe!`,done:`Dibuja más formas para seguir atacando.`},circle:{draw:[`¡Te golpearon! Dibuja un círculo`,`Un círculo levanta al instante un muro de tierra de cara al rival.`],aim:[`Toca hacia el rival`,`El muro se levanta a tu alrededor, de cara a donde toques.`],watch:`Lo que cae dentro del muro no te daña.`,done:`¡Listo! Ya sabes atacar y defenderte.`},wrong:{square:`Eso no fue un cuadrado. Sigue la guía e inténtalo otra vez.`,circle:`Eso no fue un círculo. Sigue la guía e inténtalo otra vez.`}},sources:{fire:[`¡Fuego cargado!`,`Toca al rival para lanzarlo.`],water:[`¡Agua cargada!`,`Toca al rival para lanzarla.`],both:`Carga fuego y luego agua: se unen en una explosión.`},sound:{mute:`Silenciar sonido`,unmute:`Activar sonido`},practice:{hitMe:`¡Golpéame!`,progress:(e,t)=>`Entrenamiento · ${e} de ${t} ataques probados`,allDone:`¡Probaste todos los ataques!`,got:e=>`¡${e}!`,rune:`Desde una runa`,bookAria:`Símbolos: mira aquí los ataques que ya probaste`},device:{touch:`También en tu móvil: cirquimia.pages.dev`,portrait:`Cirquimia se juega mejor en vertical`},keys:{hint:`o flechas para moverte`,move:`Usa <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> o las flechas para <b>caminar</b>. También puedes hacer clic en el suelo.`},gpu:{none:{title:`Activa la aceleración por hardware`,body:`Cirquimia necesita la tarjeta gráfica (WebGL 2) para dibujar la pradera, y tu navegador no la está usando.`},software:{title:`Tu navegador no usa la tarjeta gráfica`,body:`El juego puede abrir, pero irá muy lento sin aceleración por hardware.`},how:e=>`Cómo activarla en ${e}`,names:{chrome:`Chrome`,edge:`Edge`,brave:`Brave`,opera:`Opera`,firefox:`Firefox`,safari:`Safari`,other:`tu navegador`},steps:{chrome:["Abre `chrome://settings/system` en una pestaña nueva.",`Activa «Usar la aceleración de gráficos cuando esté disponible».`,`Pulsa «Reiniciar» y vuelve a esta página.`],edge:["Abre `edge://settings/system` en una pestaña nueva.",`Activa «Usar la aceleración de gráficos cuando esté disponible».`,`Pulsa «Reiniciar» y vuelve a esta página.`],brave:["Abre `brave://settings/system` en una pestaña nueva.",`Activa «Usar la aceleración de gráficos cuando esté disponible».`,`Pulsa «Reiniciar» y vuelve a esta página.`],opera:["Abre `opera://settings/system` en una pestaña nueva.",`Activa «Usar aceleración por hardware cuando esté disponible».`,`Reinicia Opera y vuelve a esta página.`],firefox:[`Abre Ajustes → General → Rendimiento.`,`Desmarca «Usar la configuración de rendimiento recomendada».`,`Marca «Usar aceleración por hardware cuando esté disponible» y reinicia Firefox.`],safari:[`Actualiza el sistema (iOS, iPadOS o macOS) a la última versión.`,`Cierra otras pestañas o apps pesadas y vuelve a abrir Safari.`,`Si sigue sin cargar, prueba en Chrome o Firefox.`],other:[`Busca en los ajustes del navegador «aceleración por hardware» o «aceleración de gráficos» y actívala.`,`Reinicia el navegador y vuelve a esta página.`,`Si no aparece, prueba en Chrome, Edge, Firefox o Safari.`]},note:`Si ya está activada, actualiza los controladores de la tarjeta gráfica o prueba con otro navegador.`,retry:`Reintentar`,playAnyway:`Jugar de todos modos`},tilt:e=>`Miniatura: ${e?`on`:`off`}`,dev:{title:`Herramientas de desarrollo`,close:`Cerrar`,meadow:`Pradera`,regenerate:`Generar nueva pradera`,seed:`Semilla`,useSeed:`Usar semilla`,params:`Parámetros del generador`,groups:{Materiales:`Materiales`,Densidad:`Densidad`,Límites:`Límites`},paramLabels:{roca:`Roca`,tierra:`Tierra`,agua:`Agua`,fuego:`Fuego`,magia:`Magia`,restos:`Restos (madera, ruinas)`,sendero:`Sendero`,arboles:`Árboles`,rocas:`Rocas sueltas`,hierba:`Hierba`,flores:`Flores y setas`,relieve:`Relieve`,caminableMin:`Caminable mínimo`,animadosMax:`Elementos animados máx.`},yes:`sí`,no:`no`,reset:`Restablecer valores`,view:`Vista y rendimiento`,showFps:`Mostrar FPS`,quality:`Calidad`,qualityAuto:`Auto`,tiers:{high:`Alta`,medium:`Media`,low:`Baja`},qualityNow:(e,t)=>`Ahora: ${e}${t?` (${t})`:``}`,qualityReasons:{none:`hardware sin límites`,gpu:`GPU modesta`,software:`sin aceleración gráfica`,cores:`pocos núcleos`,memory:`poca memoria`,fps:`bajada por FPS`,forced:`forzada`},showDebug:`Mostrar obstáculos y zonas bloqueadas`,look:`Estética`,language:`Idioma`,walkable:`Caminable`,blocked:`Bloqueado`,obstacles:`Obstáculos`,generatedIn:`Generada en`,trail:`Sendero`,skipped:`Descartado`,animatedNote:`✦ animado`,meshes:`Mallas (draw calls)`,instances:`Instancias`,triangles:`Triángulos`,animated:`Animados`,noRoomPortrait:`no cabe en vertical`,noRoom:`sin espacio`,blockedPath:`bloqueaba el paso`},materials:{roca:`Roca`,tierra:`Tierra`,agua:`Agua`,fuego:`Fuego`,magia:`Magia`,restos:`Restos`},kinds:{menhires:`Anillo de menhires`,muro:`Muro roto`,penascos:`Peñascos`,monticulo:`Montículo`,tierraSuelta:`Tierra removida`,estanque:`Estanque`,fogata:`Fogata`,crater:`Cráter quemado`,cristales:`Cristales`,runas:`Círculo rúnico`,empalizada:`Empalizada`,carreta:`Carreta abandonada`,troncos:`Troncos caídos`,estandarte:`Estandarte`}},en:{title:`Cirquimia`,switchLanguage:`Switch to English`,difficulty:{facil:`Easy`,normal:`Normal`,dificil:`Hard`,experto:`Very hard`},match:{toolbar:`Match`,rivalsCap:e=>e===0?`Training`:`<b>${e}</b> ${e===1?`rival`:`rivals`}`,rivalsAria:e=>`${e===0?`Training, no rivals`:`Rivals: ${e}`}. Tap to change and restart the match`,levelAria:e=>`Difficulty: ${e}. Tap to change and restart the match`,restarted:(e,t)=>e===0?`Training`:`New match · ${e===1?`1 rival`:`${e} rivals`} · ${t}`,again:`Play again`,victory:`Victory!`,victoryAria:`Victory`,defeat:`Game Over`,won:(e,t)=>`You beat ${e===1?`your rival`:`all ${e} rivals`} · ${t}`,lost:e=>`You fell in battle · ${e}`,spotTitle:`Want more of a challenge?`,spotBody:`Tap here to change the number of rivals and the difficulty.`},rank:{button:`Leaderboard`,title:`Global leaderboard`,today:`Today`,all:`All time`,points:e=>e===1?`point`:`points`,rivals:e=>e===1?`1 rival`:`${e} rivals`,damage:e=>`${e} damage`,placeToday:e=>`#${e} today`,placed:(e,t)=>`<b>#${e}</b> today · <b>#${t}</b> all time`,beatMe:`Can you beat me?`,shareText:(e,t,n,r,i)=>`⚗️ ${e} points in Cirquimia: beat ${n===1?`1 rival`:`${n} rivals`} on ${r} in ${t}. Can you beat me? ${i}`,initials:`Your initials`,save:`Save`,saving:`Saving…`,share:`Share`,more:`More`,saveImage:`Save image`,dare:(e,t)=>`Who can beat your ${e} ${t}?`,postOnX:`Post on`,sendDiscord:`Send to`,preview:`Your card: tap to save it`,xCopied:`Image copied: paste it into your X post.`,discordCopied:`Image copied: paste it in Discord.`,discordSaved:`Image saved: upload it to Discord.`,mastodonHost:`Your server (e.g. mastodon.social)`,go:`Go`,view:`See leaderboard`,unavailable:`The leaderboard is unavailable right now.`,tooMany:`Too many submissions in a row. Try again in a few minutes.`,rejected:`This match cannot enter the leaderboard.`,empty:`No scores yet. Be the first!`,loading:`Loading…`,close:`Close`,category:{mobile:`Mobile`,tablet:`Tablet`,desktop:`Desktop`},columns:[`#`,`Initials`,`Points`,`Match`],rule:`Points: your damage × difficulty × speed · "Today" resets at midnight UTC`,mine:`Yours`},help:{button:`How to play`,title:`How to play`,slides:[[`Move`,`Tap the ground and the alchemist <b>walks</b> there.`],[`Draw a symbol`,`Trace the shape with your finger: it is <b>ready in your hand</b>. Only one at a time: a new one replaces the last. Walls and heals go off at once.`],[`Cast it`,`Tap the <b>rival</b> and the attack lands there. Tap the alchemist to drop it.`]],pad:`Tap the ground and the alchemist <b>walks</b> there, or rest your finger on the <b>ring at the bottom left</b> and slide it.`,slideOf:(e,t)=>`Step ${e} of ${t}`,pageOf:(e,t)=>`Page ${e} of ${t}`,back:`Back`,next:`Next`,close:`Close`,symbolsButton:`Symbols`,shapesTitle:`Available symbols`,damage:`Damage`,healing:`Healing`,rooting:`Roots`,defence:`Defense`,names:{circle:`Wall`,square:`Earth`,triangle:`Fire`,triangleDown:`Water`,rhombus:`Heal`,pentagram:`Star`,hourglass:`Blast`,fireStar:`Fire star`,waterStar:`Water star`,spiral:`Vine`},fireNote:`Fire: draw the triangle over a campfire`,waterNote:`Water: draw the inverted triangle over a lagoon`,sourcesTitle:`Fire, water and runes`,runesNote:`From a rune: +25% area · healing 33 · no walls`,comboTitle:`Combinations`,comboNote:`With one in hand, draw the other (in either order): they merge. The blast hits harder over less ground; a fire or water star hits 20 at each tip. Caught inside a star, stand still: crossing its columns hits too.`,howTo:`How to play`,ok:`Got it`,go:`Let's play!`},tutorial:{move:{walk:[`Walk to the mark`,`Tap the ground where it glows.`],pad:[`Walk to the mark`,`Tap the ground where it glows, or rest your finger on the ring and slide it.`],keys:[`Walk to the mark`,`Use WASD or the arrow keys, or click where it glows.`],done:`Nice! Now, to battle.`},square:{draw:[`Draw a square`,`A square makes an earth attack.`],aim:[`Tap the rival`,`The earth attack bursts out right where you tap.`],watch:`Hit!`,done:`Draw more shapes to keep attacking.`},circle:{draw:[`You got hit! Draw a circle`,`A circle instantly raises an earth wall facing the rival.`],aim:[`Tap towards the rival`,`The wall rises around you, facing where you tap.`],watch:`Anything that lands inside the wall does not hurt you.`,done:`Done! Now you know how to attack and defend.`},wrong:{square:`That wasn't a square. Follow the guide and try again.`,circle:`That wasn't a circle. Follow the guide and try again.`}},sources:{fire:[`Fire charged!`,`Tap the rival to cast it.`],water:[`Water charged!`,`Tap the rival to cast it.`],both:`Charge fire, then water: they merge into a blast.`},sound:{mute:`Mute sound`,unmute:`Turn sound on`},practice:{hitMe:`Hit me!`,progress:(e,t)=>`Training · ${e} of ${t} attacks tried`,allDone:`You tried every attack!`,got:e=>`${e}!`,rune:`From a rune`,bookAria:`Symbols: see the attacks you have tried here`},device:{touch:`Also on your phone: cirquimia.pages.dev`,portrait:`Cirquimia plays best in portrait mode`},keys:{hint:`or arrows to move`,move:`Use <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or the arrow keys to <b>walk</b>. You can also click the ground.`},gpu:{none:{title:`Turn on hardware acceleration`,body:`Cirquimia needs your graphics card (WebGL 2) to draw the meadow, and your browser isn’t using it.`},software:{title:`Your browser isn’t using the graphics card`,body:`The game can open, but it will run very slowly without hardware acceleration.`},how:e=>`How to turn it on in ${e}`,names:{chrome:`Chrome`,edge:`Edge`,brave:`Brave`,opera:`Opera`,firefox:`Firefox`,safari:`Safari`,other:`your browser`},steps:{chrome:["Open `chrome://settings/system` in a new tab.",`Turn on “Use graphics acceleration when available”.`,`Click “Relaunch” and come back to this page.`],edge:["Open `edge://settings/system` in a new tab.",`Turn on “Use graphics acceleration when available”.`,`Click “Restart” and come back to this page.`],brave:["Open `brave://settings/system` in a new tab.",`Turn on “Use graphics acceleration when available”.`,`Click “Relaunch” and come back to this page.`],opera:["Open `opera://settings/system` in a new tab.",`Turn on “Use hardware acceleration when available”.`,`Restart Opera and come back to this page.`],firefox:[`Open Settings → General → Performance.`,`Untick “Use recommended performance settings”.`,`Tick “Use hardware acceleration when available” and restart Firefox.`],safari:[`Update your system (iOS, iPadOS or macOS) to the latest version.`,`Close other heavy tabs or apps and reopen Safari.`,`If it still won’t load, try Chrome or Firefox.`],other:[`Look for “hardware acceleration” or “graphics acceleration” in your browser settings and turn it on.`,`Restart the browser and come back to this page.`,`If you can’t find it, try Chrome, Edge, Firefox or Safari.`]},note:`If it’s already on, update your graphics drivers or try another browser.`,retry:`Try again`,playAnyway:`Play anyway`},tilt:e=>`Miniature: ${e?`on`:`off`}`,dev:{title:`Developer tools`,close:`Close`,meadow:`Meadow`,regenerate:`Generate new meadow`,seed:`Seed`,useSeed:`Use seed`,params:`Generator parameters`,groups:{Materiales:`Materials`,Densidad:`Density`,Límites:`Limits`},paramLabels:{roca:`Rock`,tierra:`Earth`,agua:`Water`,fuego:`Fire`,magia:`Magic`,restos:`Remains (wood, ruins)`,sendero:`Trail`,arboles:`Trees`,rocas:`Loose rocks`,hierba:`Grass`,flores:`Flowers and mushrooms`,relieve:`Relief`,caminableMin:`Minimum walkable`,animadosMax:`Max animated features`},yes:`yes`,no:`no`,reset:`Reset values`,view:`View and performance`,showFps:`Show FPS`,quality:`Quality`,qualityAuto:`Auto`,tiers:{high:`High`,medium:`Medium`,low:`Low`},qualityNow:(e,t)=>`Now: ${e}${t?` (${t})`:``}`,qualityReasons:{none:`no hardware limits`,gpu:`modest GPU`,software:`no graphics acceleration`,cores:`few CPU cores`,memory:`little memory`,fps:`stepped down for FPS`,forced:`forced`},showDebug:`Show obstacles and blocked areas`,look:`Look`,language:`Language`,walkable:`Walkable`,blocked:`Blocked`,obstacles:`Obstacles`,generatedIn:`Generated in`,trail:`Trail`,skipped:`Skipped`,animatedNote:`✦ animated`,meshes:`Meshes (draw calls)`,instances:`Instances`,triangles:`Triangles`,animated:`Animated`,noRoomPortrait:`doesn't fit in portrait`,noRoom:`no room`,blockedPath:`blocked the way`},materials:{roca:`Rock`,tierra:`Earth`,agua:`Water`,fuego:`Fire`,magia:`Magic`,restos:`Remains`},kinds:{menhires:`Standing stone ring`,muro:`Broken wall`,penascos:`Boulders`,monticulo:`Mound`,tierraSuelta:`Turned earth`,estanque:`Lagoon`,fogata:`Campfire`,crater:`Burnt crater`,cristales:`Crystals`,runas:`Rune circle`,empalizada:`Palisade`,carreta:`Abandoned cart`,troncos:`Fallen logs`,estandarte:`Banner`}}},M=me[pe],he=e=>e.toLocaleString(pe),typeof document<`u`&&(document.documentElement.lang=pe)}));function _e({renderer:e,cores:t,memory:n}){if(Ce.test(e))return{tier:`low`,reason:`software`};let r=`high`,i=`none`,a=(e,t)=>{Te(e,r)!==r&&(r=e,i=t)};return we.test(e)?a(`low`,`gpu`):N.test(e)&&a(`medium`,`gpu`),t!==void 0&&a(t<=2?`low`:t<=4?`medium`:`high`,`cores`),n!==void 0&&a(n<=2?`low`:n<=4?`medium`:`high`,`memory`),{tier:r,reason:i}}function ve(e){let t=e.getExtension(`WEBGL_debug_renderer_info`);return String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER))}function ye(e){let t=navigator;return{renderer:ve(e),cores:t.hardwareConcurrency||void 0,memory:t.deviceMemory}}function be(e){return e===`high`||e===`medium`||e===`low`?e:null}var xe,Se,Ce,we,N,Te,Ee,De,P,Oe,F,I=t((()=>{xe=[`high`,`medium`,`low`],Se={high:{pixelRatio:2,samples:4,shadows:!0,shadowTexel:1,tiltShift:!0,cover:1},medium:{pixelRatio:1.5,samples:2,shadows:!0,shadowTexel:1.5,tiltShift:!0,cover:.65},low:{pixelRatio:1,samples:0,shadows:!1,shadowTexel:2,tiltShift:!1,cover:.35}},Ce=/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic|mesa offscreen/i,we=/videocore|\bv3d\b|broadcom|mali-4\d\d|adreno[^\d]*[23]\d\d\b|sgx|intel.*\bgma\b/i,N=/intel.*\bhd graphics( \d{4}\b|(?! \d))|mali-t\d+|adreno[^\d]*4\d\d\b|powervr|tegra/i,Te=(e,t)=>xe.indexOf(e)>xe.indexOf(t)?e:t,Ee=45,De=4,P=3,Oe=1,F=class{elapsed=0;frames=0;settle=P;reset(){this.elapsed=0,this.frames=0,this.settle=P}tick(e){if(e>Oe)return!1;if(this.settle>0)return this.settle-=e,!1;if(this.elapsed+=e,this.frames++,this.elapsed<De)return!1;let t=this.frames/this.elapsed;return this.elapsed=0,this.frames=0,t>=Ee?!1:(this.settle=P,!0)}}}));O(),ge(),I();var ke=`cirquimia.gpu`;function Ae(){let e=new URLSearchParams(location.search).get(`gpu`);if(e===`none`||e===`software`)return e;let t=e=>document.createElement(`canvas`).getContext(`webgl2`,e),n=t({failIfMajorPerformanceCaveat:!0})??null,r=n??t({});if(!r)return`none`;let i=!n,a=r.getExtension(`WEBGL_debug_renderer_info`);return a&&Ce.test(String(r.getParameter(a.UNMASKED_RENDERER_WEBGL)))&&(i=!0),r.getExtension(`WEBGL_lose_context`)?.loseContext(),i?`software`:`ok`}function je(){let e=navigator.userAgent;return navigator.brave?`brave`:/Edg\//.test(e)?`edge`:/OPR\//.test(e)?`opera`:/Firefox\//.test(e)?`firefox`:/Chrome\//.test(e)?`chrome`:/Safari\//.test(e)?`safari`:`other`}function Me(){try{return localStorage.getItem(ke)===`software`}catch{return!1}}function Ne(e){let t=M.gpu,n=je(),r=document.createElement(`div`);r.id=`gpu-notice`,r.setAttribute(`role`,`alertdialog`),r.setAttribute(`aria-labelledby`,`gpu-title`);let i=t.steps[n];r.innerHTML=`
    <div class="gpu-card">
      ${y()}
      <h2 id="gpu-title"></h2>
      <p class="gpu-lead"></p>
      <h3></h3>
      <ol></ol>
      <p class="gpu-note"></p>
      <div class="gpu-actions"><button type="button" class="gpu-retry"></button></div>
    </div>`,r.querySelector(`h2`).textContent=t[e].title,r.querySelector(`.gpu-lead`).textContent=t[e].body,r.querySelector(`h3`).textContent=t.how(t.names[n]);let a=r.querySelector(`ol`);for(let e of i){let t=document.createElement(`li`);for(let[n,r]of e.split("`").entries())if(n%2){let e=document.createElement(`code`);e.textContent=r,t.append(e)}else t.append(r);a.append(t)}r.querySelector(`.gpu-note`).textContent=t.note;let o=r.querySelector(`.gpu-retry`);return o.textContent=t.retry,o.addEventListener(`click`,()=>location.reload()),document.body.append(r),new Promise(n=>{if(e!==`software`)return;let i=document.createElement(`button`);i.type=`button`,i.className=`gpu-play`,i.textContent=t.playAnyway,i.addEventListener(`click`,()=>{try{localStorage.setItem(ke,`software`)}catch{}r.remove(),n()}),r.querySelector(`.gpu-actions`).append(i)})}var Pe=`modulepreload`,Fe=function(e,t){return new URL(e,t).href},Ie={},Le=function(e){return e.pathname.endsWith(`.css`)},Re=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},ze=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Fe(t,n);let r=s(t),i=Le(r);return Re(Ie,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Pe,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Be(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ve(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function He(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ue(){let e=He(`canvas`);return e.style.display=`block`,e}function We(...e){let t=`THREE.`+e.shift();kr?kr(`log`,t,...e):console.log(t,...e)}function Ge(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function L(...e){e=Ge(e);let t=`THREE.`+e.shift();if(kr)kr(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function R(...e){e=Ge(e);let t=`THREE.`+e.shift();if(kr)kr(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ke(...e){let t=e.join(` `);t in Or||(Or[t]=!0,L(...e))}function qe(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}function Je(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Mr[e&255]+Mr[e>>8&255]+Mr[e>>16&255]+Mr[e>>24&255]+`-`+Mr[t&255]+Mr[t>>8&255]+`-`+Mr[t>>16&15|64]+Mr[t>>24&255]+`-`+Mr[n&63|128]+Mr[n>>8&255]+`-`+Mr[n>>16&255]+Mr[n>>24&255]+Mr[r&255]+Mr[r>>8&255]+Mr[r>>16&255]+Mr[r>>24&255]).toLowerCase()}function z(e,t,n){return Math.max(t,Math.min(n,e))}function Ye(e,t){return(e%t+t)%t}function Xe(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Ze(e,t,n){return e===t?0:(n-e)/(t-e)}function Qe(e,t,n){return(1-n)*e+n*t}function $e(e,t,n,r){return Qe(e,t,1-Math.exp(-n*r))}function et(e,t=1){return t-Math.abs(Ye(e,t*2)-t)}function tt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function nt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function rt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function it(e,t){return e+Math.random()*(t-e)}function at(e){return e*(.5-Math.random())}function ot(e){e!==void 0&&(Nr=e);let t=Nr+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function st(e){return e*Pr}function ct(e){return e*Fr}function lt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function ut(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function dt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function ft(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:L(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function pt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function mt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ht(){let e={enabled:!0,workingColorSpace:Sr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=gt(e.r),e.g=gt(e.g),e.b=gt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=_t(e.r),e.g=_t(e.g),e.b=_t(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Cr:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ke(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ke(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Sr]:{primaries:t,whitePoint:r,transfer:Cr,toXYZ:Br,fromXYZ:Vr,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:xr},outputColorSpaceConfig:{drawingBufferColorSpace:xr}},[xr]:{primaries:t,whitePoint:r,transfer:wr,toXYZ:Br,fromXYZ:Vr,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:xr}}}),e}function gt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function _t(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}function vt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Wr.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(L(`Texture: Unable to serialize Texture.`),{})}function yt(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function bt(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){da.fromArray(e,a);let o=i.x*Math.abs(da.x)+i.y*Math.abs(da.y)+i.z*Math.abs(da.z),s=t.dot(da),c=n.dot(da),l=r.dot(da);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}function xt(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;$a.copy(s),$a.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo($a);return l<n.near||l>n.far?null:{distance:l,point:$a.clone(),object:e}}function St(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,qa),e.getVertexPosition(c,Ja),e.getVertexPosition(l,Ya);let u=xt(e,t,n,r,qa,Ja,Ya,Qa);if(u){let e=new H;Zi.getBarycoord(Qa,qa,Ja,Ya,e),i&&(u.uv=Zi.getInterpolatedAttribute(i,s,c,l,e,new V)),a&&(u.uv1=Zi.getInterpolatedAttribute(a,s,c,l,e,new V)),o&&(u.normal=Zi.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};Zi.getNormal(qa,Ja,Ya,t.normal),u.face=t,u.barycoord=e}return u}function Ct(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(go.fromBufferAttribute(s,i),_o.fromBufferAttribute(s,a),n.distanceSqToSegment(go,_o,xo,So)>r)return;xo.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(xo);if(!(c<t.near||c>t.far))return{distance:c,point:So.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}function wt(e,t,n,r,i,a,o){let s=ko.distanceSqToPoint(e);if(s<n){let n=new H;ko.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function Tt(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}function Et(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Dt(e,t){let n=1-e;return n*n*t}function Ot(e,t){return 2*(1-e)*e*t}function kt(e,t){return e*e*t}function At(e,t,n,r){return Dt(e,t)+Ot(e,n)+kt(e,r)}function jt(e,t){let n=1-e;return n*n*n*t}function Mt(e,t){let n=1-e;return 3*n*n*e*t}function Nt(e,t){return 3*(1-e)*e*e*t}function Pt(e,t){return e*e*e*t}function Ft(e,t,n,r,i){return jt(e,t)+Mt(e,n)+Nt(e,r)+Pt(e,i)}function It(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Rt(i))i.isRenderTargetTexture?(L(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Rt(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Lt(e){let t={};for(let n=0;n<e.length;n++){let r=It(e[n]);for(let e in r)t[e]=r[e]}return t}function Rt(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function zt(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Bt(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Hr.workingColorSpace}function Vt(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ht(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function Ut(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Wt(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Gt(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ut(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Wt(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}function Kt(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}function qt(){this._document.hidden===!1&&this.reset()}function Jt(e,t){return e.distance-t.distance}function Yt(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Yt(r[e],t,n,!0)}}function Xt(e,t,n,r){let i=Zt(r);switch(n){case xn:return e*t;case En:return e*t/i.components*i.byteLength;case Dn:return e*t/i.components*i.byteLength;case On:return e*t*2/i.components*i.byteLength;case kn:return e*t*2/i.components*i.byteLength;case Sn:return e*t*3/i.components*i.byteLength;case Cn:return e*t*4/i.components*i.byteLength;case An:return e*t*4/i.components*i.byteLength;case jn:case Mn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Nn:case Pn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case In:case Rn:return Math.max(e,16)*Math.max(t,8)/4;case Fn:case Ln:return Math.max(e,8)*Math.max(t,8)/2;case zn:case Bn:case Hn:case Un:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Vn:case Wn:case Gn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Kn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case qn:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Jn:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Yn:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Xn:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Zn:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Qn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case $n:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case er:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case tr:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case nr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case rr:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ir:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ar:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case or:case sr:case cr:return Math.ceil(e/4)*Math.ceil(t/4)*16;case lr:case ur:return Math.ceil(e/4)*Math.ceil(t/4)*8;case dr:case fr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Zt(e){switch(e){case cn:case ln:return{byteLength:1,components:1};case dn:case un:case hn:return{byteLength:2,components:1};case gn:case _n:return{byteLength:2,components:4};case pn:case fn:case mn:return{byteLength:4,components:1};case yn:case bn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}var Qt,$t,en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,B,V,Ir,H,Lr,Rr,U,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,W,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma,Na,Pa,Fa,Ia,La,Ra,za,Ba,Va,Ha,Ua,Wa,Ga,Ka,qa,Ja,Ya,Xa,Za,Qa,$a,G,eo,to,no,ro,io,ao,oo,so,co,lo,uo,fo,po,mo,ho,go,_o,vo,yo,bo,xo,So,Co,wo,To,Eo,Do,Oo,ko,Ao,jo,Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo,Zo,Qo,$o,es,ts,ns,rs,is,as,os,ss,cs,ls,us,ds,fs,ps,ms,hs,gs,_s,vs,ys,bs,xs,Ss,Cs,ws,Ts,Es,Ds,Os,ks,As,js,Ms,Ns,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,Hs,Us,Ws,Gs,Ks,qs,Js,Ys,Xs,Zs,Qs,$s,ec,tc,nc,rc,ic,ac,oc,sc,cc,lc,uc,dc,fc,pc,mc,hc,gc,_c,vc=t((()=>{Qt=1e3,$t=1001,en=1002,tn=1003,nn=1004,rn=1005,an=1006,on=1007,sn=1008,cn=1009,ln=1010,un=1011,dn=1012,fn=1013,pn=1014,mn=1015,hn=1016,gn=1017,_n=1018,vn=1020,yn=35902,bn=35899,xn=1021,Sn=1022,Cn=1023,wn=1026,Tn=1027,En=1028,Dn=1029,On=1030,kn=1031,An=1033,jn=33776,Mn=33777,Nn=33778,Pn=33779,Fn=35840,In=35841,Ln=35842,Rn=35843,zn=36196,Bn=37492,Vn=37496,Hn=37488,Un=37489,Wn=37490,Gn=37491,Kn=37808,qn=37809,Jn=37810,Yn=37811,Xn=37812,Zn=37813,Qn=37814,$n=37815,er=37816,tr=37817,nr=37818,rr=37819,ir=37820,ar=37821,or=36492,sr=36494,cr=36495,lr=36283,ur=36284,dr=36285,fr=36286,pr=2300,mr=2301,hr=2302,gr=2303,_r=2400,vr=2401,yr=2402,br=3200,xr=`srgb`,Sr=`srgb-linear`,Cr=`linear`,wr=`srgb`,Tr=7680,Er=35044,Dr=2e3,Or={},kr=null,Ar={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},jr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Mr=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Nr=1234567,Pr=Math.PI/180,Fr=180/Math.PI,B={DEG2RAD:Pr,RAD2DEG:Fr,generateUUID:Je,clamp:z,euclideanModulo:Ye,mapLinear:Xe,inverseLerp:Ze,lerp:Qe,damp:$e,pingpong:et,smoothstep:tt,smootherstep:nt,randInt:rt,randFloat:it,randFloatSpread:at,seededRandom:ot,degToRad:st,radToDeg:ct,isPowerOfTwo:lt,ceilPowerOfTwo:ut,floorPowerOfTwo:dt,setQuaternionFromProperEuler:ft,normalize:mt,denormalize:pt},V=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ir=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:L(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(z(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rr.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lr.copy(this).projectOnVector(e),this.sub(Lr)}reflect(e){return this.sub(Lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Lr=new H,Rr=new Ir,U=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ke(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(zr.makeScale(e,t)),this}rotate(e){return Ke(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(zr.makeRotation(-e)),this}translate(e,t){return Ke(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},zr=new U,Br=new U().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vr=new U().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715),Hr=ht(),Wr=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ur===void 0&&(Ur=He(`canvas`)),Ur.width=e.width,Ur.height=e.height;let t=Ur.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ur}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=He(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=gt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(gt(t[e]/255)*255):t[e]=gt(t[e]);return{data:t,width:e.width,height:e.height}}return L(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Gr=0,Kr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Gr++}),this.uuid=Je(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(vt(r[t].image)):e.push(vt(r[t]))}else e=vt(r);n.url=e}return t||(e.images[this.uuid]=n),n}},qr=0,Jr=new H,Yr=class e extends jr{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=$t,i=$t,a=an,o=sn,s=Cn,c=cn,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qr++}),this.uuid=Je(),this.name=``,this.source=new Kr(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new V(0,0),this.repeat=new V(1,1),this.center=new V(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jr).x}get height(){return this.source.getSize(Jr).y}get depth(){return this.source.getSize(Jr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){L(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?L(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qt:e.x-=Math.floor(e.x);break;case $t:e.x=e.x<0?0:1;break;case en:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Qt:e.y-=Math.floor(e.y);break;case $t:e.y=e.y<0?0:1;break;case en:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}},Yr.DEFAULT_IMAGE=null,Yr.DEFAULT_MAPPING=300,Yr.DEFAULT_ANISOTROPY=1,Xr=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this.w=z(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this.w=z(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zr=class extends jr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xr(0,0,e,t),this.scissorTest=!1,this.viewport=new Xr(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},i=new Yr(r),a=n.count;for(let e=0;e<a;e++)this.textures[e]=i.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Kr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Qr=class extends Zr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$r=class extends Yr{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},ei=class extends Yr{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},ti=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ni.setFromMatrixColumn(e,0).length(),i=1/ni.setFromMatrixColumn(e,1).length(),a=1/ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ii,e,ai)}lookAt(e,t,n){let r=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),oi.crossVectors(n,ci),oi.lengthSq()===0&&(Math.abs(n.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),oi.crossVectors(n,ci)),oi.normalize(),si.crossVectors(ci,oi),r[0]=oi.x,r[4]=si.x,r[8]=ci.x,r[1]=oi.y,r[5]=si.y,r[9]=ci.y,r[2]=oi.z,r[6]=si.z,r[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],ne=r[7],re=r[11],ie=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*ee+c*re,i[12]=a*w+o*O+s*te+c*ie,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*ee+f*re,i[13]=l*w+u*O+d*te+f*ie,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*ee+g*re,i[14]=p*w+m*O+h*te+g*ie,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*ee+b*re,i[15]=_*w+v*O+y*te+b*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=ni.set(r[0],r[1],r[2]).length(),o=ni.set(r[4],r[5],r[6]).length(),s=ni.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ri.copy(this);let c=1/a,l=1/o,u=1/s;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=l,ri.elements[5]*=l,ri.elements[6]*=l,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,t.setFromRotationMatrix(ri),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Dr,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Dr,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ni=new H,ri=new ti,ii=new H(0,0,0),ai=new H(1,1,1),oi=new H,si=new H,ci=new H,li=new ti,ui=new Ir,di=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(z(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-z(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(z(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-z(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(z(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-z(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:L(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return li.makeRotationFromQuaternion(e),this.setFromRotationMatrix(li,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ui.setFromEuler(this),this.setFromQuaternion(ui,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}},di.DEFAULT_ORDER=`XYZ`,fi=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},pi=0,mi=new H,hi=new Ir,gi=new ti,_i=new H,vi=new H,yi=new H,bi=new Ir,xi=new H(1,0,0),Si=new H(0,1,0),Ci=new H(0,0,1),wi={type:`added`},Ti={type:`removed`},Ei={type:`childadded`,child:null},Di={type:`childremoved`,child:null},Oi=class e extends jr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pi++}),this.uuid=Je(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new di,r=new Ir,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ti},normalMatrix:{value:new U}}),this.matrix=new ti,this.matrixWorld=new ti,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(xi,e)}rotateY(e){return this.rotateOnAxis(Si,e)}rotateZ(e){return this.rotateOnAxis(Ci,e)}translateOnAxis(e,t){return mi.copy(e).applyQuaternion(this.quaternion),this.position.add(mi.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xi,e)}translateY(e){return this.translateOnAxis(Si,e)}translateZ(e){return this.translateOnAxis(Ci,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_i.copy(e):_i.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(vi,_i,this.up):gi.lookAt(_i,vi,this.up),this.quaternion.setFromRotationMatrix(gi),r&&(gi.extractRotation(r.matrixWorld),hi.setFromRotationMatrix(gi),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(R(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wi),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):R(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ti),Di.child=e,this.dispatchEvent(Di),Di.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wi),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vi,e,yi),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vi,bi,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}},Oi.DEFAULT_UP=new H(0,1,0),Oi.DEFAULT_MATRIX_AUTO_UPDATE=!0,Oi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,ki=class extends Oi{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ai={type:`move`},ji=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ai)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ki;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Mi={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Pi={h:0,s:0,l:0},W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Hr.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Hr.workingColorSpace){return this.r=e,this.g=t,this.b=n,Hr.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Hr.workingColorSpace){if(e=Ye(e,1),t=z(t,0,1),n=z(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=yt(i,r,e+1/3),this.g=yt(i,r,e),this.b=yt(i,r,e-1/3)}return Hr.colorSpaceToWorking(this,r),this}setStyle(e,t=xr){function n(t){t!==void 0&&parseFloat(t)<1&&L(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:L(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);L(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xr){let n=Mi[e.toLowerCase()];return n===void 0?L(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gt(e.r),this.g=gt(e.g),this.b=gt(e.b),this}copyLinearToSRGB(e){return this.r=_t(e.r),this.g=_t(e.g),this.b=_t(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xr){return Hr.workingToColorSpace(Fi.copy(this),e),Math.round(z(Fi.r*255,0,255))*65536+Math.round(z(Fi.g*255,0,255))*256+Math.round(z(Fi.b*255,0,255))}getHexString(e=xr){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Hr.workingColorSpace){Hr.workingToColorSpace(Fi.copy(this),t);let n=Fi.r,r=Fi.g,i=Fi.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Hr.workingColorSpace){return Hr.workingToColorSpace(Fi.copy(this),t),e.r=Fi.r,e.g=Fi.g,e.b=Fi.b,e}getStyle(e=xr){Hr.workingToColorSpace(Fi.copy(this),e);let t=Fi.r,n=Fi.g,r=Fi.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(Pi);let n=Qe(Ni.h,Pi.h,t),r=Qe(Ni.s,Pi.s,t),i=Qe(Ni.l,Pi.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fi=new W,W.NAMES=Mi,Ii=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new W(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Li=class extends Oi{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ri=new H,zi=new H,Bi=new H,Vi=new H,Hi=new H,Ui=new H,Wi=new H,Gi=new H,Ki=new H,qi=new H,Ji=new Xr,Yi=new Xr,Xi=new Xr,Zi=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ri.subVectors(e,t),r.cross(Ri);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ri.subVectors(r,t),zi.subVectors(n,t),Bi.subVectors(e,t);let a=Ri.dot(Ri),o=Ri.dot(zi),s=Ri.dot(Bi),c=zi.dot(zi),l=zi.dot(Bi),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Vi)!==null&&Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Vi)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Vi.x),s.addScaledVector(a,Vi.y),s.addScaledVector(o,Vi.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Ji.setScalar(0),Yi.setScalar(0),Xi.setScalar(0),Ji.fromBufferAttribute(e,t),Yi.fromBufferAttribute(e,n),Xi.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ji,i.x),a.addScaledVector(Yi,i.y),a.addScaledVector(Xi,i.z),a}static isFrontFacing(e,t,n,r){return Ri.subVectors(n,t),zi.subVectors(e,t),Ri.cross(zi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),Ri.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Hi.subVectors(r,n),Ui.subVectors(i,n),Gi.subVectors(e,n);let s=Hi.dot(Gi),c=Ui.dot(Gi);if(s<=0&&c<=0)return t.copy(n);Ki.subVectors(e,r);let l=Hi.dot(Ki),u=Ui.dot(Ki);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Hi,a);qi.subVectors(e,i);let f=Hi.dot(qi),p=Ui.dot(qi);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ui,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Wi.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Wi,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Hi,a).addScaledVector(Ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qi=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ea.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ea.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ea.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ea):ea.fromBufferAttribute(r,t),ea.applyMatrix4(e.matrixWorld),this.expandByPoint(ea);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),ta.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),ta.copy(e.boundingBox)),ta.applyMatrix4(e.matrixWorld),this.union(ta)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ea),ea.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ca),la.subVectors(this.max,ca),na.subVectors(e.a,ca),ra.subVectors(e.b,ca),ia.subVectors(e.c,ca),aa.subVectors(ra,na),oa.subVectors(ia,ra),sa.subVectors(na,ia);let t=[0,-aa.z,aa.y,0,-oa.z,oa.y,0,-sa.z,sa.y,aa.z,0,-aa.x,oa.z,0,-oa.x,sa.z,0,-sa.x,-aa.y,aa.x,0,-oa.y,oa.x,0,-sa.y,sa.x,0];return!bt(t,na,ra,ia,la)||(t=[1,0,0,0,1,0,0,0,1],!bt(t,na,ra,ia,la))?!1:(ua.crossVectors(aa,oa),t=[ua.x,ua.y,ua.z],bt(t,na,ra,ia,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ea).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ea).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($i)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$i=[new H,new H,new H,new H,new H,new H,new H,new H],ea=new H,ta=new Qi,na=new H,ra=new H,ia=new H,aa=new H,oa=new H,sa=new H,ca=new H,la=new H,ua=new H,da=new H,fa=new H,pa=new V,ma=0,ha=class extends jr{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ma++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Er,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix3(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix4(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyNormalMatrix(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.transformDirection(e),this.setXYZ(t,fa.x,fa.y,fa.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pt(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pt(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pt(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array),i=mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},ga=class extends ha{constructor(e,t,n){super(new Uint16Array(e),t,n)}},_a=class extends ha{constructor(e,t,n){super(new Uint32Array(e),t,n)}},va=class extends ha{constructor(e,t,n){super(new Float32Array(e),t,n)}},ya=new Qi,ba=new H,xa=new H,Sa=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ya.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ba.subVectors(e,this.center);let t=ba.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(ba,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ba.copy(e.center).add(xa)),this.expandByPoint(ba.copy(e.center).sub(xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ca=0,wa=new ti,Ta=new Oi,Ea=new H,Da=new Qi,Oa=new Qi,ka=new H,Aa=class e extends jr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ca++}),this.uuid=Je(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Be(e)?_a:ga)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new U().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wa.makeRotationFromQuaternion(e),this.applyMatrix4(wa),this}rotateX(e){return wa.makeRotationX(e),this.applyMatrix4(wa),this}rotateY(e){return wa.makeRotationY(e),this.applyMatrix4(wa),this}rotateZ(e){return wa.makeRotationZ(e),this.applyMatrix4(wa),this}translate(e,t,n){return wa.makeTranslation(e,t,n),this.applyMatrix4(wa),this}scale(e,t,n){return wa.makeScale(e,t,n),this.applyMatrix4(wa),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ea).negate(),this.translate(Ea.x,Ea.y,Ea.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new va(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&L(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)R(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Da.setFromBufferAttribute(n),this.morphTargetsRelative?(ka.addVectors(this.boundingBox.min,Da.min),this.boundingBox.expandByPoint(ka),ka.addVectors(this.boundingBox.max,Da.max),this.boundingBox.expandByPoint(ka)):(this.boundingBox.expandByPoint(Da.min),this.boundingBox.expandByPoint(Da.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&R(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)R(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);else if(e){let n=this.boundingSphere.center;if(Da.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Oa.setFromBufferAttribute(n),this.morphTargetsRelative?(ka.addVectors(Da.min,Oa.min),Da.expandByPoint(ka),ka.addVectors(Da.max,Oa.max),Da.expandByPoint(ka)):(Da.expandByPoint(Oa.min),Da.expandByPoint(Oa.max))}Da.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ka.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ka));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ka.fromBufferAttribute(a,t),o&&(Ea.fromBufferAttribute(e,t),ka.add(Ea)),r=Math.max(r,n.distanceToSquared(ka))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&R(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){R(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ha(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let c=new H,l=new H,u=new H,d=new V,f=new V,p=new V,m=new H,h=new H;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new H,y=new H,b=new H,x=new H;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ha(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ka.fromBufferAttribute(e,t),ka.normalize(),e.setXYZ(t,ka.x,ka.y,ka.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ha(a,r,i)}if(this.index===null)return L(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ja=new H,Ma=new H,Na=new U,Pa=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ja.subVectors(n,t).cross(Ma.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ja),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Na.getNormalMatrix(e),r=this.coplanarPoint(ja).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Fa=0,Ia=class extends jr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fa++}),this.uuid=Je(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tr,this.stencilZFail=Tr,this.stencilZPass=Tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){L(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?L(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Pa().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new V().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new V().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},La=new H,Ra=new H,za=new H,Ba=new H,Va=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,La)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=La.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(La.copy(this.origin).addScaledVector(this.direction,t),La.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ra.copy(e).add(t).multiplyScalar(.5),za.copy(t).sub(e).normalize(),Ba.copy(this.origin).sub(Ra);let i=e.distanceTo(t)*.5,a=-this.direction.dot(za),o=Ba.dot(this.direction),s=-Ba.dot(za),c=Ba.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ra).addScaledVector(za,d),f}intersectSphere(e,t){if(e.radius<0)return null;La.subVectors(e.center,this.origin);let n=La.dot(this.direction),r=La.dot(La)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,La)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,te,j;if(y>=b&&y>=x?(w=s,D=u,A=p,j=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,te=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,te=_)):b>=x?(w=c,D=d,A=m,j=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,te=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,te=v)):(w=l,D=f,A=h,j=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,te=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,te=g)),w===0)return null;let ne=S/w,re=C/w,ie=1/w,ae=T-ne*D,oe=E-re*D,se=O-ne*A,ce=k-re*A,le=ee-ne*j,ue=te-re*j,de=le*ce-ue*se,fe=ae*ue-oe*le,pe=se*oe-ce*ae;if(r){if(de<0||fe<0||pe<0)return null}else if((de<0||fe<0||pe<0)&&(de>0||fe>0||pe>0))return null;let me=de+fe+pe;if(me===0)return null;let M=ie*(de*D+fe*A+pe*j);return(me>0?M<0:M>0)?null:this.at(M/me,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ha=class extends Ia{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ua=new ti,Wa=new Va,Ga=new Sa,Ka=new H,qa=new H,Ja=new H,Ya=new H,Xa=new H,Za=new H,Qa=new H,$a=new H,G=class extends Oi{constructor(e=new Aa,t=new Ha){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Za.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Xa.fromBufferAttribute(s,e),a?Za.addScaledVector(Xa,r):Za.addScaledVector(Xa.sub(t),r))}t.add(Za)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ga.copy(n.boundingSphere),Ga.applyMatrix4(i),Wa.copy(e.ray).recast(e.near),!(Ga.containsPoint(Wa.origin)===!1&&(Wa.intersectSphere(Ga,Ka)===null||Wa.origin.distanceToSquared(Ka)>(e.far-e.near)**2))&&(Ua.copy(i).invert(),Wa.copy(e.ray).applyMatrix4(Ua),(n.boundingBox===null||Wa.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Wa)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=St(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=St(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=St(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=St(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}},eo=class extends Yr{constructor(e=null,t=1,n=1,r,i,a,o,s,c=tn,l=tn,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},to=class extends ha{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},no=new ti,ro=new ti,io=[],ao=new Qi,oo=new ti,so=new G,co=new Sa,lo=class extends G{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new to(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,oo)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,no),ao.copy(e.boundingBox).applyMatrix4(no),this.boundingBox.union(ao)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sa),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,no),co.copy(e.boundingSphere).applyMatrix4(no),this.boundingSphere.union(co)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(so.geometry=this.geometry,so.material=this.material,so.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),co.copy(this.boundingSphere),co.applyMatrix4(n),e.ray.intersectsSphere(co)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,no),ro.multiplyMatrices(n,no),so.matrixWorld=ro,so.raycast(e,io);for(let e=0,n=io.length;e<n;e++){let n=io[e];n.instanceId=i,n.object=this,t.push(n)}io.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new to(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new eo(new Float32Array(r*this.count),r,this.count,En,mn));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},uo=new Sa,fo=new V(.5,.5),po=new H,mo=class{constructor(e=new Pa,t=new Pa,n=new Pa,r=new Pa,i=new Pa,a=new Pa){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dr,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),uo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),uo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(uo)}intersectsSprite(e){uo.center.set(0,0,0);let t=fo.distanceTo(e.center);return uo.radius=.7071067811865476+t,uo.applyMatrix4(e.matrixWorld),this.intersectsSphere(uo)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(po.x=r.normal.x>0?e.max.x:e.min.x,po.y=r.normal.y>0?e.max.y:e.min.y,po.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(po)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ho=class extends Ia{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new W(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},go=new H,_o=new H,vo=new ti,yo=new Va,bo=new Sa,xo=new H,So=new H,Co=class extends Oi{constructor(e=new Aa,t=new ho){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)go.fromBufferAttribute(t,e-1),_o.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=go.distanceTo(_o);e.setAttribute(`lineDistance`,new va(n,1))}else L(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bo.copy(n.boundingSphere),bo.applyMatrix4(r),bo.radius+=i,e.ray.intersectsSphere(bo)===!1)return;vo.copy(r).invert(),yo.copy(e.ray).applyMatrix4(vo);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Ct(this,e,yo,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Ct(this,e,yo,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Ct(this,e,yo,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Ct(this,e,yo,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}},wo=new H,To=new H,Eo=class extends Co{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)wo.fromBufferAttribute(t,e),To.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+wo.distanceTo(To);e.setAttribute(`lineDistance`,new va(n,1))}else L(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Do=class extends Ia{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Oo=new ti,ko=new Va,Ao=new Sa,jo=new H,Mo=class extends Oi{constructor(e=new Aa,t=new Do){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(r),Ao.radius+=i,e.ray.intersectsSphere(Ao)===!1)return;Oo.copy(r).invert(),ko.copy(e.ray).applyMatrix4(Oo);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);jo.fromBufferAttribute(l,n),wt(jo,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)jo.fromBufferAttribute(l,a),wt(jo,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}},No=class extends Yr{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Po=class extends Yr{constructor(e,t,n=pn,r,i,a,o=tn,s=tn,c,l=wn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Fo=class extends Po{constructor(e,t=pn,n=301,r,i,a=tn,o=tn,s,c=wn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Io=class extends Yr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Lo=class e extends Aa{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new va(c,3)),this.setAttribute(`normal`,new va(l,3)),this.setAttribute(`uv`,new va(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ro=class e extends Aa{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new H,l=new V;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new va(a,3)),this.setAttribute(`normal`,new va(o,3)),this.setAttribute(`uv`,new va(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},zo=class e extends Aa{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new va(u,3)),this.setAttribute(`normal`,new va(d,3)),this.setAttribute(`uv`,new va(f,2));function _(){let a=new H,_=new H,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new V,m=new H,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bo=class e extends zo{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vo=class e extends Aa{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new va(i,3)),this.setAttribute(`normal`,new va(i.slice(),3)),this.setAttribute(`uv`,new va(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new H,r=new H,i=new H;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new H;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new H;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new H,t=new H,n=new H,r=new H,o=new V,s=new V,c=new V;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ho=class e extends Vo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Uo=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){L(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new V:new H);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new H,r=[],i=[],a=[],o=new H,s=new ti;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new H)}i[0]=new H,a[0]=new H;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(z(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(z(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Wo=class extends Uo{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new V){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Go=class extends Wo{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}},Ko=new H,qo=new H,Jo=new Tt,Yo=new Tt,Xo=new Tt,Zo=class extends Uo{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new H){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(qo.subVectors(r[0],r[1]).add(r[0]),c=qo);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Ko.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Ko),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Jo.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Yo.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Xo.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Jo.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Yo.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Xo.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Jo.calc(s),Yo.calc(s),Xo.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}},Qo=class extends Uo{constructor(e=new V,t=new V,n=new V,r=new V){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ft(e,r.x,i.x,a.x,o.x),Ft(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},$o=class extends Uo{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ft(e,r.x,i.x,a.x,o.x),Ft(e,r.y,i.y,a.y,o.y),Ft(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},es=class extends Uo{constructor(e=new V,t=new V){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new V){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new V){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ts=class extends Uo{constructor(e=new H,t=new H){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ns=class extends Uo{constructor(e=new V,t=new V,n=new V){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(At(e,r.x,i.x,a.x),At(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rs=class extends Uo{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(At(e,r.x,i.x,a.x),At(e,r.y,i.y,a.y),At(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},is=class extends Uo{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new V){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Et(o,s.x,c.x,l.x,u.x),Et(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new V().fromArray(n))}return this}},as=Object.freeze({__proto__:null,ArcCurve:Go,CatmullRomCurve3:Zo,CubicBezierCurve:Qo,CubicBezierCurve3:$o,EllipseCurve:Wo,LineCurve:es,LineCurve3:ts,QuadraticBezierCurve:ns,QuadraticBezierCurve3:rs,SplineCurve:is}),os=class e extends Vo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ss=class e extends Vo{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},cs=class e extends Aa{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new va(p,3)),this.setAttribute(`normal`,new va(m,3)),this.setAttribute(`uv`,new va(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ls=class e extends Aa{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new H,p=new V;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new va(s,3)),this.setAttribute(`normal`,new va(c,3)),this.setAttribute(`uv`,new va(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},us=class e extends Aa{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new H,f=new H,p=new H;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new va(c,3)),this.setAttribute(`normal`,new va(l,3)),this.setAttribute(`uv`,new va(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},ds=class e extends Aa{constructor(e=new rs(new H(-1,-1,0),new H(-1,1,0),new H(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new H,s=new H,c=new V,l=new H,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new va(u,3)),this.setAttribute(`normal`,new va(d,3)),this.setAttribute(`uv`,new va(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new as[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},fs={clone:It,merge:Lt},ps=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ms=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,hs=class extends Ia{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ps,this.fragmentShader=ms,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=It(e.uniforms),this.uniformsGroups=zt(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Xr().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new ti().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},gs=class extends hs{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},_s=class extends Ia{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},vs=class extends Ia{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=br,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ys=class extends Ia{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},bs=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},xs=class extends bs{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_r,endingEnd:_r}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case vr:i=e,o=2*t-n;break;case yr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case vr:a=e,s=2*n-t;break;case yr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ss=class extends bs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Cs=class extends bs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ws=class extends bs{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Gt(n,t,g,y,r);i[p]=Ut(x,o,_,b,m)}return i}},Ts=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Vt(t,this.TimeBufferType),this.values=Vt(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Vt(e.times,Array),values:Vt(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ht(e.settings)&&(n.settings={inTangents:Vt(e.settings.inTangents,Array),outTangents:Vt(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Cs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ss(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ws(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case pr:t=this.InterpolantFactoryMethodDiscrete;break;case mr:t=this.InterpolantFactoryMethodLinear;break;case hr:t=this.InterpolantFactoryMethodSmooth;break;case gr:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return L(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return mr;case this.InterpolantFactoryMethodSmooth:return hr;case this.InterpolantFactoryMethodBezier:return gr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ht(this.settings)&&(Kt(this.settings.inTangents,e),Kt(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(R(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(R(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){R(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){R(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ve(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){R(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===hr,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ht(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}},Ts.prototype.ValueTypeName=``,Ts.prototype.TimeBufferType=Float32Array,Ts.prototype.ValueBufferType=Float32Array,Ts.prototype.DefaultInterpolation=mr,Es=class extends Ts{constructor(e,t,n){super(e,t,n)}},Es.prototype.ValueTypeName=`bool`,Es.prototype.ValueBufferType=Array,Es.prototype.DefaultInterpolation=pr,Es.prototype.InterpolantFactoryMethodLinear=void 0,Es.prototype.InterpolantFactoryMethodSmooth=void 0,Ds=class extends Ts{constructor(e,t,n,r){super(e,t,n,r)}},Ds.prototype.ValueTypeName=`color`,Os=class extends Ts{constructor(e,t,n,r){super(e,t,n,r)}},Os.prototype.ValueTypeName=`number`,ks=class extends bs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ir.slerpFlat(i,0,a,c-o,a,c,s);return i}},As=class extends Ts{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ks(this.times,this.values,this.getValueSize(),e)}},As.prototype.ValueTypeName=`quaternion`,As.prototype.InterpolantFactoryMethodSmooth=void 0,js=class extends Ts{constructor(e,t,n){super(e,t,n)}},js.prototype.ValueTypeName=`string`,js.prototype.ValueBufferType=Array,js.prototype.DefaultInterpolation=pr,js.prototype.InterpolantFactoryMethodLinear=void 0,js.prototype.InterpolantFactoryMethodSmooth=void 0,Ms=class extends Ts{constructor(e,t,n,r){super(e,t,n,r)}},Ms.prototype.ValueTypeName=`vector`,Ns=class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ps=new Ns,Fs=class{constructor(e){this.manager=e===void 0?Ps:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}},Fs.DEFAULT_MATERIAL_NAME=`__DEFAULT`,Is=class extends Oi{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ls=class extends Is{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Oi.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Rs=new ti,zs=new H,Bs=new H,Vs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new V(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new ti,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mo,this._frameExtents=new V(1,1),this._viewportCount=1,this._viewports=[new Xr(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;zs.setFromMatrixPosition(e.matrixWorld),t.position.copy(zs),Bs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bs),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Rs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Rs,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Rs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Hs=new H,Us=new Ir,Ws=new H,Gs=class extends Oi{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new ti,this.projectionMatrix=new ti,this.projectionMatrixInverse=new ti,this.coordinateSystem=Dr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hs,Us,Ws),Ws.x===1&&Ws.y===1&&Ws.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hs,Us,Ws.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hs,Us,Ws),Ws.x===1&&Ws.y===1&&Ws.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hs,Us,Ws.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ks=new H,qs=new V,Js=new V,Ys=class extends Gs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fr*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ks.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ks.x,Ks.y).multiplyScalar(-e/Ks.z),Ks.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ks.x,Ks.y).multiplyScalar(-e/Ks.z)}getViewSize(e,t){return this.getViewBounds(e,qs,Js),t.subVectors(Js,qs)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Xs=class extends Gs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zs=class extends Vs{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qs=class extends Is{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Oi.DEFAULT_UP),this.updateMatrix(),this.target=new Oi,this.shadow=new Zs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},$s=-90,ec=1,tc=class extends Oi{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ys($s,ec,e,t);r.layers=this.layers,this.add(r);let i=new Ys($s,ec,e,t);i.layers=this.layers,this.add(i);let a=new Ys($s,ec,e,t);a.layers=this.layers,this.add(a);let o=new Ys($s,ec,e,t);o.layers=this.layers,this.add(o);let s=new Ys($s,ec,e,t);s.layers=this.layers,this.add(s);let c=new Ys($s,ec,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},nc=class extends Ys{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},rc=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=qt.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}},ic=`\\[\\]\\.:\\/`,ac=RegExp(`[\\[\\]\\.:\\/]`,`g`),oc=`[^\\[\\]\\.:\\/]`,sc=`[^`+ic.replace(`\\.`,``)+`]`,cc=`((?:WC+[\\/:])*)`.replace(`WC`,oc),lc=`(WCOD+)?`.replace(`WCOD`,sc),uc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,oc),dc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,oc),fc=RegExp(`^`+cc+lc+uc+dc+`$`),pc=[`material`,`materials`,`bones`,`map`],mc=class{constructor(e,t,n){let r=n||hc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},hc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ac,``)}static parseTrackName(e){let t=fc.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);pc.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){L(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){R(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){R(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){R(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){R(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){R(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;R(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}},hc.Composite=mc,hc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},hc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},hc.prototype.GetterByBindingType=[hc.prototype._getValue_direct,hc.prototype._getValue_array,hc.prototype._getValue_arrayElement,hc.prototype._getValue_toArray],hc.prototype.SetterByBindingTypeAndVersioning=[[hc.prototype._setValue_direct,hc.prototype._setValue_direct_setNeedsUpdate,hc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[hc.prototype._setValue_array,hc.prototype._setValue_array_setNeedsUpdate,hc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[hc.prototype._setValue_arrayElement,hc.prototype._setValue_arrayElement_setNeedsUpdate,hc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[hc.prototype._setValue_fromArray,hc.prototype._setValue_fromArray_setNeedsUpdate,hc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],gc=new ti,_c=class{constructor(e,t,n=0,r=1/0){this.ray=new Va(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new fi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):R(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return gc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gc),this}intersectObject(e,t=!0,n=[]){return Yt(e,this,n,t),n.sort(Jt),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Yt(e[r],this,n,t);return n.sort(Jt),n}},class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?L(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`)}));function yc(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function bc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}function xc(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new G(new Lo(1,1,1),new hs({name:`BackgroundCubeMaterial`,uniforms:It(wu.backgroundCube.uniforms),vertexShader:wu.backgroundCube.vertexShader,fragmentShader:wu.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Eu.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Du),l.material.toneMapped=Hr.getTransfer(i.colorSpace)!==wr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new G(new cs(2,2),new hs({name:`BackgroundMaterial`,uniforms:It(wu.background.uniforms),vertexShader:wu.background.vertexShader,fragmentShader:wu.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Hr.getTransfer(i.colorSpace)!==wr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Tu,Bt(e)),n.buffers.color.setClear(Tu.r,Tu.g,Tu.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Sc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Cc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function wc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(L(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&L(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Tc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Pa,s=new U,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function Ec(e){let t=[],n=[],r=e,i=e-Ou+1+ku;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?zu.set(1,r,n):e===1?zu.set(-n,1,-r):e===2?zu.set(-n,r,1):e===3?zu.set(-1,r,-n):e===4?zu.set(-n,-1,r):zu.set(n,r,-1),zu.toArray(l,(e*6+t)*3)}}let u=new Aa;u.setAttribute(`position`,new ha(c,3)),u.setAttribute(`outputDirection`,new ha(l,3)),n.push(new G(u,null)),r>Ou&&r--}return{lodMeshes:n,sizeLods:t}}function Dc(e,t,n){let r=new Qr(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Oc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function kc(e,t,n){return new hs({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ju,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ac(e,t,n){return new hs({name:`SphericalGaussianBlur`,defines:{SAMPLES:Au,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function jc(){return new hs({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Mc(){return new hs({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Nc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Vu(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Bu(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Bu(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Fc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ke(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ic(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?_a:ga)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Lc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Rc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:R(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function zc(e,t,n){let r=new WeakMap,i=new Xr;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new $r(h,p,m,u);g.type=mn,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new V(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Bc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}function Vc(e,t,n,r,i,a){let o=new Qr(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Aa;l.setAttribute(`position`,new va([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new va([0,2,0,0,2,0],2));let u=new gs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new G(l,u),f=new Xs(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Qr(t,n,{type:hn,depthBuffer:!1,stencilBuffer:!1}),c=new Qr(t,n,{type:hn,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Hr.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Hu[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}function Hc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ju[i];if(a===void 0&&(a=new Float32Array(i),Ju[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Uc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Wc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Gc(e,t){let n=Yu[t];n===void 0&&(n=new Int32Array(t),Yu[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Kc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function qc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Uc(n,t))return;e.uniform2fv(this.addr,t),Wc(n,t)}}function Jc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Uc(n,t))return;e.uniform3fv(this.addr,t),Wc(n,t)}}function Yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Uc(n,t))return;e.uniform4fv(this.addr,t),Wc(n,t)}}function Xc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Uc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Wc(n,t)}else{if(Uc(n,r))return;Qu.set(r),e.uniformMatrix2fv(this.addr,!1,Qu),Wc(n,r)}}function Zc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Uc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Wc(n,t)}else{if(Uc(n,r))return;Zu.set(r),e.uniformMatrix3fv(this.addr,!1,Zu),Wc(n,r)}}function Qc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Uc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Wc(n,t)}else{if(Uc(n,r))return;Xu.set(r),e.uniformMatrix4fv(this.addr,!1,Xu),Wc(n,r)}}function $c(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function el(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Uc(n,t))return;e.uniform2iv(this.addr,t),Wc(n,t)}}function tl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Uc(n,t))return;e.uniform3iv(this.addr,t),Wc(n,t)}}function nl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Uc(n,t))return;e.uniform4iv(this.addr,t),Wc(n,t)}}function rl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function il(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Uc(n,t))return;e.uniform2uiv(this.addr,t),Wc(n,t)}}function al(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Uc(n,t))return;e.uniform3uiv(this.addr,t),Wc(n,t)}}function ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Uc(n,t))return;e.uniform4uiv(this.addr,t),Wc(n,t)}}function sl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Wu.compareFunction=n.isReversedDepthBuffer()?518:515,a=Wu):a=Uu,n.setTexture2D(t||a,i)}function cl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Ku,i)}function ll(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||qu,i)}function ul(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Gu,i)}function dl(e){switch(e){case 5126:return Kc;case 35664:return qc;case 35665:return Jc;case 35666:return Yc;case 35674:return Xc;case 35675:return Zc;case 35676:return Qc;case 5124:case 35670:return $c;case 35667:case 35671:return el;case 35668:case 35672:return tl;case 35669:case 35673:return nl;case 5125:return rl;case 36294:return il;case 36295:return al;case 36296:return ol;case 35678:case 36198:case 36298:case 36306:case 35682:return sl;case 35679:case 36299:case 36307:return cl;case 35680:case 36300:case 36308:case 36293:return ll;case 36289:case 36303:case 36311:case 36292:return ul}}function fl(e,t){e.uniform1fv(this.addr,t)}function pl(e,t){let n=Hc(t,this.size,2);e.uniform2fv(this.addr,n)}function ml(e,t){let n=Hc(t,this.size,3);e.uniform3fv(this.addr,n)}function hl(e,t){let n=Hc(t,this.size,4);e.uniform4fv(this.addr,n)}function gl(e,t){let n=Hc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function _l(e,t){let n=Hc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function vl(e,t){let n=Hc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function yl(e,t){e.uniform1iv(this.addr,t)}function bl(e,t){e.uniform2iv(this.addr,t)}function xl(e,t){e.uniform3iv(this.addr,t)}function Sl(e,t){e.uniform4iv(this.addr,t)}function Cl(e,t){e.uniform1uiv(this.addr,t)}function wl(e,t){e.uniform2uiv(this.addr,t)}function Tl(e,t){e.uniform3uiv(this.addr,t)}function El(e,t){e.uniform4uiv(this.addr,t)}function Dl(e,t,n){let r=this.cache,i=t.length,a=Gc(n,i);Uc(r,a)||(e.uniform1iv(this.addr,a),Wc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Wu:Uu;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Ol(e,t,n){let r=this.cache,i=t.length,a=Gc(n,i);Uc(r,a)||(e.uniform1iv(this.addr,a),Wc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Ku,a[e])}function kl(e,t,n){let r=this.cache,i=t.length,a=Gc(n,i);Uc(r,a)||(e.uniform1iv(this.addr,a),Wc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||qu,a[e])}function Al(e,t,n){let r=this.cache,i=t.length,a=Gc(n,i);Uc(r,a)||(e.uniform1iv(this.addr,a),Wc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Gu,a[e])}function jl(e){switch(e){case 5126:return fl;case 35664:return pl;case 35665:return ml;case 35666:return hl;case 35674:return gl;case 35675:return _l;case 35676:return vl;case 5124:case 35670:return yl;case 35667:case 35671:return bl;case 35668:case 35672:return xl;case 35669:case 35673:return Sl;case 5125:return Cl;case 36294:return wl;case 36295:return Tl;case 36296:return El;case 35678:case 36198:case 36298:case 36306:case 35682:return Dl;case 35679:case 36299:case 36307:return Ol;case 35680:case 36300:case 36308:case 36293:return kl;case 36289:case 36303:case 36311:case 36292:return Al}}function Ml(e,t){e.seq.push(t),e.map[t.id]=t}function Nl(e,t,n){let r=e.name,i=r.length;for(nd.lastIndex=0;;){let a=nd.exec(r),o=nd.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ml(n,l===void 0?new $u(s,e,t):new ed(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new td(s),Ml(n,e)),n=e}}}function Pl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}function Fl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}function Il(e){Hr._getMatrix(od,Hr.workingColorSpace,e);let t=`mat3( ${od.elements.map(e=>e.toFixed(4))} )`;switch(Hr.getTransfer(e)){case Cr:return[t,`LinearTransferOETF`];case wr:return[t,`sRGBTransferOETF`];default:return L(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ll(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Fl(e.getShaderSource(t),r)}return i}function Rl(e,t){let n=Il(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function zl(e,t){let n=sd[t];return n===void 0?(L(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}function Bl(){return Hr.getLuminanceCoefficients(cd),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${cd.x.toFixed(4)}, ${cd.y.toFixed(4)}, ${cd.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Vl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Wl).join(`
`)}function Hl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ul(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Wl(e){return e!==``}function Gl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function ql(e){return e.replace(ld,Jl)}function Jl(e,t){let n=K[t];if(n===void 0){let e=ud.get(t);if(e!==void 0)n=K[e],L(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return ql(n)}function Yl(e){return e.replace(dd,Xl)}function Xl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Zl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function Ql(e){return fd[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}function $l(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:pd[e.envMapMode]||`ENVMAP_TYPE_CUBE`}function eu(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:md[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}function tu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:hd[e.combine]||`ENVMAP_BLENDING_NONE`}function nu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ru(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ql(n),l=$l(n),u=eu(n),d=tu(n),f=nu(n),p=Vl(n),m=Hl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Wl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Wl).join(`
`),_.length>0&&(_+=`
`)):(g=[Zl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Wl).join(`
`),_=[Zl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:K.tonemapping_pars_fragment,n.toneMapping===0?``:zl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,K.colorspace_pars_fragment,Rl(`linearToOutputTexel`,n.outputColorSpace),Bl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Wl).join(`
`)),o=ql(o),o=Gl(o,n),o=Kl(o,n),s=ql(s),s=Gl(s,n),s=Kl(s,n),o=Yl(o),s=Yl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Pl(i,i.VERTEX_SHADER,y),S=Pl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Ll(i,x,`vertex`),n=Ll(i,S,`fragment`);R(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):L(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new rd(i,h),T=Ul(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,id)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ad++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}function iu(e){return e===1030||e===37490||e===36285}function au(e,t,n,r,i,a){let o=new fi,s=new _d,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&L(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=wu[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,re=!!i.map,ie=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap&&i.wireframe===!1,le=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,fe=!!i.metalnessMap,pe=!!i.roughnessMap,me=i.anisotropy>0,M=i.clearcoat>0,he=i.dispersion>0,ge=i.retroreflectivity>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=me&&!!i.anisotropyMap,xe=M&&!!i.clearcoatMap,Se=M&&!!i.clearcoatNormalMap,Ce=M&&!!i.clearcoatRoughnessMap,we=_e&&!!i.iridescenceMap,N=_e&&!!i.iridescenceThicknessMap,Te=ve&&!!i.sheenColorMap,Ee=ve&&!!i.sheenRoughnessMap,De=!!i.specularMap,P=!!i.specularColorMap,Oe=!!i.specularIntensityMap,F=ye&&!!i.transmissionMap,I=ye&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,Me=!!i.alphaHash,Ne=!!i.extensions,Pe=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let Fe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Hr.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:ie,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:le,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:le&&i.normalMapType===1,normalMapTangentSpace:le&&i.normalMapType===0,packedNormalMap:le&&i.normalMapType===0&&iu(i.normalMap.format),metalnessMap:fe,roughnessMap:pe,anisotropy:me,anisotropyMap:be,clearcoat:M,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,dispersion:he,retroreflection:ge,iridescence:_e,iridescenceMap:we,iridescenceThicknessMap:N,sheen:ve,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:P,specularIntensityMap:Oe,transmission:ye,transmissionMap:F,thicknessMap:I,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:Me,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:le&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:fe&&m(i.metalnessMap.channel),roughnessMapUv:pe&&m(i.roughnessMap.channel),anisotropyMapUv:be&&m(i.anisotropyMap.channel),clearcoatMapUv:xe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:N&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:P&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:F&&m(i.transmissionMap.channel),thicknessMapUv:I&&m(i.thicknessMap.channel),alphaMapUv:Ae&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(le||me),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Ae),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&le===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&Hr.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&Hr.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=wu[t];n=fs.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new ru(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ou(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function su(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function cu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function lu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||su),r.length>1&&r.sort(t||cu),i.length>1&&i.sort(t||cu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function uu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new lu,e.set(t,[i])):n>=r.length?(i=new lu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function du(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new W};break;case`SpotLight`:n={position:new H,direction:new H,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function fu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}function pu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function mu(e){let t=new du,n=fu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new ti,o=new ti;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(pu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=yd++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function hu(e){let t=new mu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function gu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new hu(e),t.set(n,[a])):r>=i.length?(a=new hu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}function _u(e,t,n){let r=new mo,i=new V,a=new V,o=new Xr,s=new vs,c=new ys,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new hs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new V},radius:{value:4}},vertexShader:bd,fragmentShader:xd}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Aa;m.setAttribute(`position`,new ha(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new G(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(L(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){L(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){L(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Qr(i.x,i.y,{format:On,type:hn,minFilter:an,magFilter:an,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Po(i.x,i.y,mn),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=wn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=tn,d.map.depthTexture.magFilter=tn}else l.isPointLight?(d.map=new Vu(i.x),d.map.depthTexture=new Fo(i.x,pn)):(d.map=new Qr(i.x,i.y),d.map.depthTexture=new Po(i.x,i.y,pn)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=wn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=an,d.map.depthTexture.magFilter=an):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=tn,d.map.depthTexture.magFilter=tn);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Td.setFromMatrixPosition(l.matrixWorld),e.position.copy(Td),Ed.copy(e.position),Ed.add(Sd[t]),e.up.copy(Cd[t]),e.lookAt(Ed),e.updateMatrixWorld(),n.makeTranslation(-Td.x,-Td.y,-Td.z),wd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(wd,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Qr(i.x,i.y,{format:On,type:hn}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function vu(e,t){function n(){let t=!1,n=new Xr,r=null,i=new Xr(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ar[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),j=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Xr().fromArray(oe),le=new Xr().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),be(!1),xe(1),fe(e.CULL_FACE),ve(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function M(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ge={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ge[103]=e.MIN,ge[104]=e.MAX;let _e={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(pe(e.BLEND),g=!1);else if(g===!1&&(fe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:R(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:R(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:R(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:R(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ge[n],ge[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(_e[r],_e[i],_e[o],_e[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ye(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ce(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function xe(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Se(t){t!==k&&(j&&e.lineWidth(t),k=t)}function Ce(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):pe(e.POLYGON_OFFSET_FILL)}function we(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function N(t){t===void 0&&(t=e.TEXTURE0+te-1),ie!==t&&(e.activeTexture(t),ie=t)}function Te(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+te-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function Ee(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function P(){try{e.compressedTexImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function F(){try{e.texSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function I(){try{e.compressedTexSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ae(){try{e.texStorage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function je(){try{e.texStorage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Me(){try{e.texImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ne(){try{e.texImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Pe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Fe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ie(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Le(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Re(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function ze(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Be(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:M,useProgram:he,setBlending:ve,setMaterial:ye,setFlipSided:be,setCullFace:xe,setLineWidth:Se,setPolygonOffset:Ce,setScissorTest:we,activeTexture:N,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:P,texImage2D:Me,texImage3D:Ne,pixelStorei:Fe,getParameter:Pe,updateUBOMapping:Re,uniformBlockBinding:ze,texStorage2D:Ae,texStorage3D:je,texSubImage2D:Oe,texSubImage3D:F,compressedTexSubImage2D:I,compressedTexSubImage3D:ke,scissor:Ie,viewport:Le,reset:Be}}function yu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new V,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):He(`canvas`)}function g(e,t,n){let r=1,i=De(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),L(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&L(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];L(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||L(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Cr:Hr.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,L(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&L(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ne(t,i){let a=r.get(t);if(t.isVideoTexture&&Te(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)L(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)L(`WebGLRenderer: Texture marked for update but image is incomplete`);else{pe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?pe(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ie(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?pe(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?me(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let oe={[Qt]:e.REPEAT,[$t]:e.CLAMP_TO_EDGE,[en]:e.MIRRORED_REPEAT},se={[tn]:e.NEAREST,[nn]:e.NEAREST_MIPMAP_NEAREST,[rn]:e.NEAREST_MIPMAP_LINEAR,[an]:e.LINEAR,[on]:e.LINEAR_MIPMAP_NEAREST,[sn]:e.LINEAR_MIPMAP_LINEAR},ce={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function le(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&L(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,oe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,oe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,oe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,se[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,se[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ce[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ue(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function de(e,t,n){return Math.floor(Math.floor(e/n)/t)}function fe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=de(n.start,r.width,4),c=de(t.start,r.width,4);n.start<=i+1&&a===c&&de(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function pe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ue(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Hr.getPrimaries(Hr.workingColorSpace),r=o.colorSpace===``?null:Hr.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Ee(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);le(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Tn,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&fe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Xt(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Xt(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=De(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=De(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function me(t,o,s){if(o.image.length!==6)return;let c=ue(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Hr.getPrimaries(Hr.workingColorSpace),r=o.colorSpace===``?null:Hr.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ee(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);le(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=De(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function M(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),N(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,we(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function he(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;N(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,we(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,we(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);N(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,we(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,we(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ge(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),le(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ne(i.depthTexture,0);let u=l.__webglTexture,d=we(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)N(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)N(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function _e(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ge(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ge(i.__webglFramebuffer[0],t,0):ge(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),he(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),he(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,i){let a=r.get(t);n!==void 0&&M(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&_e(t)}function ye(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&N(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=we(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),he(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),le(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)M(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else M(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),le(c,a),M(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),le(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)M(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else M(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&_e(t)}function be(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let xe=[],Se=[];function Ce(t){if(t.samples>0){if(N(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(xe.length=0,Se.length=0,xe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(xe.push(l),Se.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Se)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,xe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function we(e){return Math.min(i.maxSamples,e.samples)}function N(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Te(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ee(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Hr.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&L(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):R(`WebGLTextures: Unsupported texture color space:`,n)),t}function De(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=ne,this.setTexture2DArray=re,this.setTexture3D=ie,this.setTextureCube=ae,this.rebindTextures=ve,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=be,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=M,this.useMultisampledRTT=N,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function bu(e,t){function n(n,r=``){let i,a=Hr.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}function xu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Bt(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(jd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Md),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Su(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return R(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?L(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):L(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}function Cu(){return Pd===null&&(Pd=new eo(Nd,16,16,On,hn),Pd.name=`DFG_LUT`,Pd.minFilter=an,Pd.magFilter=an,Pd.wrapS=$t,Pd.wrapT=$t,Pd.generateMipmaps=!1,Pd.needsUpdate=!0),Pd}var K,q,wu,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Nu,Pu,Fu,Iu,Lu,Ru,zu,Bu,Vu,Hu,Uu,Wu,Gu,Ku,qu,Ju,Yu,Xu,Zu,Qu,$u,ed,td,nd,rd,id,ad,od,sd,cd,ld,ud,dd,fd,pd,md,hd,gd,_d,vd,yd,bd,xd,Sd,Cd,wd,Td,Ed,Dd,Od,kd,Ad,jd,Md,Nd,Pd,Fd,Id=t((()=>{vc(),K={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},q={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U}},envmap:{envMap:{value:null},envMapRotation:{value:new U},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U},normalScale:{value:new V(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0},uvTransform:{value:new U}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new V(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}}},wu={basic:{uniforms:Lt([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:K.meshbasic_vert,fragmentShader:K.meshbasic_frag},lambert:{uniforms:Lt([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:K.meshlambert_vert,fragmentShader:K.meshlambert_frag},phong:{uniforms:Lt([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:K.meshphong_vert,fragmentShader:K.meshphong_frag},standard:{uniforms:Lt([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag},toon:{uniforms:Lt([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new W(0)}}]),vertexShader:K.meshtoon_vert,fragmentShader:K.meshtoon_frag},matcap:{uniforms:Lt([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:K.meshmatcap_vert,fragmentShader:K.meshmatcap_frag},points:{uniforms:Lt([q.points,q.fog]),vertexShader:K.points_vert,fragmentShader:K.points_frag},dashed:{uniforms:Lt([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:K.linedashed_vert,fragmentShader:K.linedashed_frag},depth:{uniforms:Lt([q.common,q.displacementmap]),vertexShader:K.depth_vert,fragmentShader:K.depth_frag},normal:{uniforms:Lt([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:K.meshnormal_vert,fragmentShader:K.meshnormal_frag},sprite:{uniforms:Lt([q.sprite,q.fog]),vertexShader:K.sprite_vert,fragmentShader:K.sprite_frag},background:{uniforms:{uvTransform:{value:new U},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:K.background_vert,fragmentShader:K.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U}},vertexShader:K.backgroundCube_vert,fragmentShader:K.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:K.cube_vert,fragmentShader:K.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:K.equirect_vert,fragmentShader:K.equirect_frag},distance:{uniforms:Lt([q.common,q.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:K.distance_vert,fragmentShader:K.distance_frag},shadow:{uniforms:Lt([q.lights,q.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:K.shadow_vert,fragmentShader:K.shadow_frag}},wu.physical={uniforms:Lt([wu.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U},clearcoatNormalScale:{value:new V(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U},transmissionSamplerSize:{value:new V},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U},anisotropyVector:{value:new V},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag},Tu={r:0,b:0,g:0},Eu=new ti,Du=new U,Du.set(-1,0,0,0,1,0,0,0,1),Ou=4,ku=6,Au=20,ju=256,Mu=new Xs,Nu=new W,Pu=null,Fu=0,Iu=0,Lu=!1,Ru=new H,zu=new H,Bu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ru}=i;Pu=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Pu,Fu,Iu),this._renderer.xr.enabled=Lu,e.scissorTest=!1,Oc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pu=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:hn,format:Cn,colorSpace:Sr,depthBuffer:!1},r=Dc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ec(r)),this._blurMaterial=Ac(r,e,t),this._ggxMaterial=kc(r,e,t)}return r}_compileMaterial(e){let t=new G(new Aa,e);this._renderer.compile(t,Mu)}_sceneToCubeUV(e,t,n,r,i){let a=new Ys(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Nu),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new Lo,new Ha({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Nu),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Oc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Oc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Mu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ou?n-d+Ou:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Oc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Mu),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Oc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Mu)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Oc(t,3*l*(r>this._lodMax-Ou?r-this._lodMax+Ou:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Mu)}},Vu=class extends Qr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new No(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Lo(5,5,5),i=new hs({name:`CubemapFromEquirect`,uniforms:It(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new G(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=an),new tc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Hu={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`},Uu=new Yr,Wu=new Po(1,1),Gu=new $r,Ku=new ei,qu=new No,Ju=[],Yu=[],Xu=new Float32Array(16),Zu=new Float32Array(9),Qu=new Float32Array(4),$u=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dl(t.type)}},ed=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jl(t.type)}},td=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},nd=/(\w+)(\])?(\[|\.)?/g,rd=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Nl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}},id=37297,ad=0,od=new U,sd={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`},cd=new H,ld=/^[ \t]*#include +<([\w\d./]+)>/gm,ud=new Map,dd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g,fd={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`},pd={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`},md={302:`ENVMAP_MODE_REFRACTION`},hd={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`},gd=0,_d=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new vd(e),t.set(e,n)),n}},vd=class{constructor(e){this.id=gd++,this.code=e,this.usedTimes=0}},yd=0,bd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Sd=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Cd=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],wd=new ti,Td=new H,Ed=new H,Dd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Od=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,kd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Io(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new hs({vertexShader:Dd,fragmentShader:Od,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ad=class extends jr{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new kd,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new V,C=null,w=null,T=new Ys;T.viewport=new Xr;let E=new Ys;E.viewport=new Xr;let D=[T,E],O=new nc,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ji,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ji,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ji,b[e]=t),t.getHandSpace()};function ee(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,j);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,j),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Tn:wn,a=_.stencil?vn:pn);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Qr(d.textureWidth,d.textureHeight,{format:Cn,type:cn,depthTexture:new Po(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Qr(f.framebufferWidth,f.framebufferHeight,{format:Cn,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function j(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ne=new H,re=new H;function ie(e,t,n){ne.setFromMatrixPosition(t.matrixWorld),re.setFromMatrixPosition(n.matrixWorld);let r=ne.distanceTo(re),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ae(O,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,O,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Fr*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let se=null;function ce(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ys,o.layers.enable(n),o.viewport=new Xr,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Io,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let le=new yc;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},jd=new ti,Md=new U,Md.set(-1,0,0,0,1,0,0,0,1),Nd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Pd=null,Fd=class{constructor(e={}){let{canvas:t=Ue(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=cn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([An,kn,Dn]),g=new Set([cn,pn,dn,vn,gn,_n]),_=new Uint32Array(4),v=new Int32Array(4),y=new H,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=xr;let ee=0,te=0,j=null,ne=-1,re=null,ie=new Xr,ae=new Xr,oe=null,se=new W(0),ce=0,le=t.width,ue=t.height,de=1,fe=null,pe=null,me=new Xr(0,0,le,ue),M=new Xr(0,0,le,ue),he=!1,ge=new mo,_e=!1,ve=!1,ye=new ti,be=new H,xe=new Xr,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ce=!1;function we(){return j===null?de:1}let N=n;function Te(e,n){return t.getContext(e,n)}let Ee,De,P,Oe,F,I,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ge,Ke,Je;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Xe,!1),t.addEventListener(`webglcontextrestored`,Ze,!1),t.addEventListener(`webglcontextcreationerror`,Qe,!1),N===null){let t=`webgl2`;if(N=Te(t,e),N===null)throw Te(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}z()}catch(e){throw t.removeEventListener(`webglcontextlost`,Xe,!1),t.removeEventListener(`webglcontextrestored`,Ze,!1),t.removeEventListener(`webglcontextcreationerror`,Qe,!1),R(`WebGLRenderer: `+e.message),e}function z(){Ee=new Fc(N),Ee.init(),Ge=new bu(N,Ee),De=new wc(N,Ee,e,Ge),P=new vu(N,Ee),De.reversedDepthBuffer&&d&&P.buffers.depth.setReversed(!0),O=N.createFramebuffer(),k=N.createFramebuffer(),A=N.createFramebuffer(),Oe=new Rc(N),F=new ou,I=new yu(N,Ee,P,F,De,Ge,Oe),ke=new Pc(T),Ae=new bc(N),Ke=new Sc(N,Ae),je=new Ic(N,Ae,Oe,Ke),Me=new Bc(N,je,Ae,Ke,Oe),Be=new zc(N,De,I),Le=new Tc(F),Ne=new au(T,ke,Ee,De,Ke,Le),Pe=new xu(T,F),Fe=new uu,Ie=new gu(Ee),ze=new xc(T,ke,P,Me,p,s),Re=new _u(T,Me,De),Je=new Su(N,Oe,De,P),Ve=new Cc(N,Ee,Oe),He=new Lc(N,Ee,Oe),Oe.programs=Ne.programs,T.capabilities=De,T.extensions=Ee,T.properties=F,T.renderLists=Fe,T.shadowMap=Re,T.state=P,T.info=Oe}m!==1009&&(w=new Vc(m,t.width,t.height,o,r,i));let Ye=new Ad(T,N);this.xr=Ye,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let e=Ee.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ee.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(e){e!==void 0&&(de=e,this.setSize(le,ue,!1))},this.getSize=function(e){return e.set(le,ue)},this.setSize=function(e,n,r=!0){Ye.isPresenting?L(`WebGLRenderer: Can't change size while VR device is presenting.`):(le=e,ue=n,t.width=Math.floor(e*de),t.height=Math.floor(n*de),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(le*de,ue*de).floor()},this.setDrawingBufferSize=function(e,n,r){le=e,ue=n,de=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)R(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){L(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ie)},this.getViewport=function(e){return e.copy(me)},this.setViewport=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),P.viewport(ie.copy(me).multiplyScalar(de).round())},this.getScissor=function(e){return e.copy(M)},this.setScissor=function(e,t,n,r){e.isVector4?M.set(e.x,e.y,e.z,e.w):M.set(e,t,n,r),P.scissor(ae.copy(M).multiplyScalar(de).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(e){P.setScissorTest(he=e)},this.setOpaqueSort=function(e){fe=e},this.setTransparentSort=function(e){pe=e},this.getClearColor=function(e){return e.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=h.has(t)}if(e){let e=j.texture.type,t=g.has(e),n=ze.getClearColor(),r=ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,N.clearBufferuiv(N.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,N.clearBufferiv(N.COLOR,0,v))}else r|=N.COLOR_BUFFER_BIT}t&&(r|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&N.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Xe,!1),t.removeEventListener(`webglcontextrestored`,Ze,!1),t.removeEventListener(`webglcontextcreationerror`,Qe,!1),ze.dispose(),Fe.dispose(),Ie.dispose(),F.dispose(),ke.dispose(),Me.dispose(),Ke.dispose(),Je.dispose(),Ne.dispose(),Ye.dispose(),Ye.removeEventListener(`sessionstart`,at),Ye.removeEventListener(`sessionend`,ot),st.stop()};function Xe(e){e.preventDefault(),We(`WebGLRenderer: Context Lost.`),E=!0}function Ze(){We(`WebGLRenderer: Context Restored.`),E=!1;let e=Oe.autoReset,t=Re.enabled,n=Re.autoUpdate,r=Re.needsUpdate,i=Re.type;z(),Oe.autoReset=e,Re.enabled=t,Re.autoUpdate=n,Re.needsUpdate=r,Re.type=i}function Qe(e){R(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function $e(e){let t=e.target;t.removeEventListener(`dispose`,$e),et(t)}function et(e){tt(e),F.remove(e)}function tt(e){let t=F.get(e).programs;t!==void 0&&(t.forEach(function(e){Ne.releaseProgram(e)}),e.isShaderMaterial&&Ne.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Se);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=_t(e,t,n,r,i);P.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=je.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ke.setup(i,r,s,n,c);let h,g=Ve;if(c!==null&&(h=Ae.get(c),g=He,g.setIndex(h)),i.isMesh)r.wireframe===!0?(P.setLineWidth(r.wireframeLinewidth*we()),g.setMode(N.LINES)):g.setMode(N.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),P.setLineWidth(e*we()),i.isLineSegments?g.setMode(N.LINES):i.isLineLoop?g.setMode(N.LINE_LOOP):g.setMode(N.LINE_STRIP)}else i.isPoints?g.setMode(N.POINTS):i.isSprite&&g.setMode(N.TRIANGLES);if(i.isBatchedMesh){if(Ee.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ae.get(c).bytesPerElement:1,o=F.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(N,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function nt(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),_e===!0&&Le.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,pt(e,t,r),e.side=0,e.needsUpdate=!0,pt(e,t,r),e.side=2):pt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ie.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ve=this.localClippingEnabled,_e=Le.init(this.clippingPlanes,ve),_e===!0&&Le.setGlobalState(this.clippingPlanes,t),D!==null&&Re.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];nt(o,n,t,e),r.add(o)}else nt(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=F.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ee.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let rt=null;function it(e){rt&&rt(e)}function at(){st.stop()}function ot(){st.start()}let st=new yc;st.setAnimationLoop(it),typeof self<`u`&&st.setContext(self),this.setAnimationLoop=function(e){rt=e,Ye.setAnimationLoop(e),e===null?st.stop():st.start()},Ye.addEventListener(`sessionstart`,at),Ye.addEventListener(`sessionend`,ot),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){R(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ye.enabled===!0&&Ye.isPresenting===!0,r=w!==null&&(j===null||n)&&w.begin(T,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(t),t=Ye.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,j),x=Ie.get(e,C.length),x.init(t),x.state.textureUnits=I.getTextureUnits(),C.push(x),ye.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ge.setFromProjectionMatrix(ye,Dr,t.reversedDepth),ve=this.localClippingEnabled,_e=Le.init(this.clippingPlanes,ve),b=Fe.get(e,S.length),b.init(),S.push(b),Ye.enabled===!0&&Ye.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&ct(e,t,-1/0,T.sortObjects)}ct(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(fe,pe),Ce=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,Ce&&ze.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),_e===!0&&Le.beginShadows();let i=x.state.shadowsArray;if(Re.render(i,e,t),_e===!0&&Le.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];ut(n,r,e,a)}Ce&&ze.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];lt(b,e,n,n.viewport)}}else r.length>0&&ut(n,r,e,t),Ce&&ze.render(e),lt(b,e,t)}j!==null&&te===0&&(I.updateMultisampleRenderTarget(j),I.updateRenderTargetMipmap(j)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ke.resetDefaultState(),ne=-1,re=null,C.pop(),C.length>0?(x=C[C.length-1],I.setTextureUnits(x.state.textureUnits),_e===!0&&Le.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function ct(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ge)){r&&xe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);let i=Me.update(e),a=e.material;a.visible&&b.push(e,i,a,n,xe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ge))){let i=Me.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),xe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),xe.copy(e.boundingSphere.center)),xe.applyMatrix4(e.matrixWorld).applyMatrix4(ye)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,xe.z,s,t)}}else a.visible&&b.push(e,i,a,n,xe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ct(i[e],t,n,r)}function lt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),_e===!0&&Le.setGlobalState(T.clippingPlanes,n),r&&P.viewport(ie.copy(r)),i.length>0&&dt(i,t,n),a.length>0&&dt(a,t,n),o.length>0&&dt(o,t,n),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function ut(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ee.has(`EXT_color_buffer_half_float`)||Ee.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Qr(1,1,{generateMipmaps:!0,type:e?hn:cn,minFilter:sn,samples:Math.max(4,De.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Hr.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ie;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(se),ce=T.getClearAlpha(),ce<1&&T.setClearColor(16777215,.5),T.clear(),Ce&&ze.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),_e===!0&&Le.setGlobalState(T.clippingPlanes,r),dt(e,n,r),I.updateMultisampleRenderTarget(a),I.updateRenderTargetMipmap(a),Ee.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ft(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(I.updateMultisampleRenderTarget(a),I.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(se,ce),d!==void 0&&(r.viewport=d),T.toneMapping=u}function dt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ft(o,t,n,s,l,c)}}function ft(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function pt(e,t,n){t.isScene!==!0&&(t=Se);let r=F.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ne.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ne.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ke.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,$e),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ht(e,s),d}else s.uniforms=Ne.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ne.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Le.uniform),ht(e,s),r.needsLights=yt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function mt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=rd.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ht(e,t){let n=F.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function gt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function _t(e,t,n,r,i){t.isScene!==!0&&(t=Se),I.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Hr.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ke.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=F.get(r),y=x.state.lights;if(_e===!0&&(ve===!0||e!==re)){let t=e===re&&r.id===ne;Le.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Le.numPlanes||v.numIntersection!==Le.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=pt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(P.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ne&&(ne=r.id,w=!0),v.needsLights){let e=gt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||re!==e){P.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(N,`projectionMatrix`,e.projectionMatrix),O.setValue(N,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(N,be.setFromMatrixPosition(e.matrixWorld)),De.logarithmicDepthBuffer&&O.setValue(N,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(N,`isOrthographic`,e.isOrthographicCamera===!0),re!==e&&(re=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(N,`sunShadowMap`,y.state.sunShadowMap,I),y.state.directionalShadowMap.length>0&&O.setValue(N,`directionalShadowMap`,y.state.directionalShadowMap,I),y.state.spotShadowMap.length>0&&O.setValue(N,`spotShadowMap`,y.state.spotShadowMap,I),y.state.pointShadowMap.length>0&&O.setValue(N,`pointShadowMap`,y.state.pointShadowMap,I)),i.isSkinnedMesh){O.setOptional(N,i,`bindMatrix`),O.setOptional(N,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(N,`boneTexture`,e.boneTexture,I))}i.isBatchedMesh&&(O.setOptional(N,i,`batchingTexture`),O.setValue(N,`batchingTexture`,i._matricesTexture,I),O.setOptional(N,i,`batchingIdTexture`),O.setValue(N,`batchingIdTexture`,i._indirectTexture,I),O.setOptional(N,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(N,`batchingColorTexture`,i._colorsTexture,I));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Be.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(N,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Cu()),w){if(O.setValue(N,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&vt(k,E),a&&r.fog===!0&&Pe.refreshFogUniforms(k,a),Pe.refreshMaterialUniforms(k,r,de,ue,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}rd.upload(N,mt(v),k,I)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(rd.upload(N,mt(v),k,I),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(N,`center`,i.center),O.setValue(N,`modelViewMatrix`,i.modelViewMatrix),O.setValue(N,`normalMatrix`,i.normalMatrix),O.setValue(N,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Je.update(n,S),Je.bind(n,S)}}return S}function vt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function yt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=F.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),F.get(e.texture).__webglTexture=t,F.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=F.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,ee=t,te=n;let r=null,i=!1,a=!1;if(e){let o=F.get(e);if(o.__useDefaultFramebuffer!==void 0){P.bindFramebuffer(N.FRAMEBUFFER,o.__webglFramebuffer),ie.copy(e.viewport),ae.copy(e.scissor),oe=e.scissorTest,P.viewport(ie),P.scissor(ae),P.setScissorTest(oe),ne=-1;return}if(o.__webglFramebuffer===void 0)I.setupRenderTarget(e);else if(o.__hasExternalTextures)I.rebindTextures(e,F.get(e.texture).__webglTexture,F.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&F.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);I.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=F.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&I.useMultisampledRTT(e)===!1?F.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ie.copy(e.viewport),ae.copy(e.scissor),oe=e.scissorTest}else ie.copy(me).multiplyScalar(de).floor(),ae.copy(M).multiplyScalar(de).floor(),oe=he;if(n!==0&&(r=O),P.bindFramebuffer(N.FRAMEBUFFER,r)&&P.drawBuffers(e,r),P.viewport(ie),P.scissor(ae),P.setScissorTest(oe),i){let r=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=F.get(e.textures[t]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,t.__webglTexture,n)}ne=-1};function bt(e){let t=F.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=De.textureFormatReadable(e.format),t.__typeReadable=De.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){P.bindFramebuffer(N.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s);let u=bt(o);if(u.__formatReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&N.readPixels(t,n,r,i,Ge.convert(c),Ge.convert(l),a)}finally{let e=j===null?null:F.get(j).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){P.bindFramebuffer(N.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s);let d=bt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,f),N.bufferData(N.PIXEL_PACK_BUFFER,a.byteLength,N.STREAM_READ),N.readPixels(t,n,r,i,Ge.convert(l),Ge.convert(u),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let p=j===null?null:F.get(j).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,p);let m=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await qe(N,m,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,f),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,a),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(f),N.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;I.setTexture2D(e,0),N.copyTexSubImage2D(N.TEXTURE_2D,n,0,0,o,s,i,a),P.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ge.convert(t.format),_=Ge.convert(t.type),v;t.isData3DTexture?(I.setTexture3D(t,0),v=N.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(I.setTexture2DArray(t,0),v=N.TEXTURE_2D_ARRAY):(I.setTexture2D(t,0),v=N.TEXTURE_2D),P.activeTexture(N.TEXTURE0),P.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,t.flipY),P.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),P.pixelStorei(N.UNPACK_ALIGNMENT,t.unpackAlignment);let y=P.getParameter(N.UNPACK_ROW_LENGTH),b=P.getParameter(N.UNPACK_IMAGE_HEIGHT),x=P.getParameter(N.UNPACK_SKIP_PIXELS),S=P.getParameter(N.UNPACK_SKIP_ROWS),C=P.getParameter(N.UNPACK_SKIP_IMAGES);P.pixelStorei(N.UNPACK_ROW_LENGTH,h.width),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,h.height),P.pixelStorei(N.UNPACK_SKIP_PIXELS,l),P.pixelStorei(N.UNPACK_SKIP_ROWS,u),P.pixelStorei(N.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=F.get(e),r=F.get(t),h=F.get(n.__renderTarget),g=F.get(r.__renderTarget);P.bindFramebuffer(N.READ_FRAMEBUFFER,h.__webglFramebuffer),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(e).__webglTexture,i,d+n),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(t).__webglTexture,a,m+n)),N.blitFramebuffer(l,u,o,s,f,p,o,s,N.DEPTH_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||F.has(e)){let n=F.get(e),r=F.get(t);P.bindFramebuffer(N.READ_FRAMEBUFFER,k),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,n.__webglTexture,i),T?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,r.__webglTexture,a),i===0?T?N.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):N.copyTexSubImage2D(v,a,f,p,l,u,o,s):N.blitFramebuffer(l,u,o,s,f,p,o,s,N.COLOR_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?N.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h);P.pixelStorei(N.UNPACK_ROW_LENGTH,y),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,b),P.pixelStorei(N.UNPACK_SKIP_PIXELS,x),P.pixelStorei(N.UNPACK_SKIP_ROWS,S),P.pixelStorei(N.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&N.generateMipmap(v),P.unbindTexture()},this.initRenderTarget=function(e){F.get(e).__webglFramebuffer===void 0&&I.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?I.setTextureCube(e,0):e.isData3DTexture?I.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?I.setTexture2DArray(e,0):I.setTexture2D(e,0),P.unbindTexture()},this.resetState=function(){ee=0,te=0,j=null,P.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Dr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Hr._getDrawingBufferColorSpace(e),t.unpackColorSpace=Hr._getUnpackColorSpace()}}})),Ld,Rd,zd,Bd,Vd=t((()=>{Id(),Ld=new Xs(-1,1,1,-1,0,1),Rd=class extends Aa{constructor(){super(),this.setAttribute(`position`,new va([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new va([0,2,0,0,2,0],2))}},zd=new Rd,Bd=class{constructor(e){this._mesh=new G(zd,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ld)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}}));function Hd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ud(e,t){let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)}function Wd(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=Ud(n,r),l=Ud(n+1,r),u=Ud(n,r+1),d=Ud(n+1,r+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function Gd(e,t){let n=e+Yd.offX,r=t+Yd.offZ;return((Wd(n*.12,r*.12)-.5)*.7+(Wd(n*.45,r*.45)-.5)*.18)*Yd.relief}function Kd(e,t,n=1){let r=Hd(e^2654435769);Yd={offX:(r()-.5)*2e3,offZ:(r()-.5)*2e3,relief:n,dents:[]},Yd.dents=t.map(e=>({...e,baseY:Gd(e.x,e.z)}))}function qd(e){return Yd.dents.find(t=>t.x===e.x&&t.z===e.z)?.baseY??Gd(e.x,e.z)}function J(e,t){let n=Gd(e,t);for(let r of Yd.dents){let i=Math.hypot(e-r.x,t-r.z)/r.r;if(!(i>1.8)){if(r.flatten){let e=i<1?1:i>1.6?0:1-(i-1)/.6;n+=(r.baseY-n)*e*e*(3-2*e)}i<1&&(n+=r.depth*(1-i*i)**2),r.rim&&(n+=r.rim*Math.exp(-(((i-1)/.28)**2)))}}return n}function Jd(e,t){return Wd((e+Yd.offX)*.08+31.7,(t+Yd.offZ)*.08-12.3)}var Yd,Xd=t((()=>{Yd={offX:0,offZ:0,relief:1,dents:[]}}));function Zd(){let e=new URLSearchParams(location.search).get(`look`);if(e===`glade`||e===`bruma`)return e;try{return localStorage.getItem(tf)===`glade`?`glade`:`bruma`}catch{return`bruma`}}function Qd(e){try{localStorage.setItem(tf,e)}catch{}let t=new URL(location.href);t.searchParams.set(`look`,e),location.replace(t)}function $d(e){return!rf||(af.set(e).getHSL(of,sf),of.s>.15)?e:af.setHSL(.11,.3,.68+(of.l-.55)*.8,sf).getHex()}function ef(e){return rf?(af.set(e).getHSL(of,sf),af.setHSL(.25+(of.h-.4)*.3,.42,.42+(of.l-.42)*.8,sf).getHex()):e}var tf,nf,rf,af,of,sf,cf=t((()=>{Id(),tf=`cirquimia.look`,nf=Zd(),rf=nf===`glade`,af=new W,of={h:0,s:0,l:0},sf=xr}));function lf(e,t){let n={PAINT_SCALE:uf(t.paint.scale),PAINT_AMOUNT:uf(t.paint.amount)};return e.defines={...e.defines,...n},e.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vPaintPos;`).replace(`#include <project_vertex>`,`#include <project_vertex>
        vec4 paintP = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          paintP = instanceMatrix * paintP;
        #endif
        vPaintPos = ( modelMatrix * paintP ).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        varying vec3 vPaintPos;
        float paintHash( vec3 p ) {
          p = fract( p * 0.3183099 + 0.1 );
          p *= 17.0;
          return fract( p.x * p.y * p.z * ( p.x + p.y + p.z ) );
        }
        float paintNoise( vec3 x ) {
          vec3 i = floor( x );
          vec3 t = fract( x );
          t = t * t * ( 3.0 - 2.0 * t );
          return mix(
            mix( mix( paintHash( i ), paintHash( i + vec3( 1, 0, 0 ) ), t.x ), mix( paintHash( i + vec3( 0, 1, 0 ) ), paintHash( i + vec3( 1, 1, 0 ) ), t.x ), t.y ),
            mix( mix( paintHash( i + vec3( 0, 0, 1 ) ), paintHash( i + vec3( 1, 0, 1 ) ), t.x ), mix( paintHash( i + vec3( 0, 1, 1 ) ), paintHash( i + vec3( 1, 1, 1 ) ), t.x ), t.y ),
            t.z );
        }`).replace(`#include <color_fragment>`,`#include <color_fragment>
        {
          float blotch = paintNoise( vPaintPos * PAINT_SCALE ) * 0.65 + paintNoise( vPaintPos * PAINT_SCALE * 2.7 ) * 0.35;
          // Contrast-stretched so the blotches read as brush dabs rather than a faint haze.
          diffuseColor.rgb *= 1.0 + ( smoothstep( 0.3, 0.7, blotch ) - 0.5 ) * PAINT_AMOUNT;
        }`)},e.customProgramCacheKey=()=>JSON.stringify(n),e}var uf,df,ff,pf=t((()=>{Id(),uf=e=>e.toFixed(4),df=class{texture;a=new Qr(1,1,{type:hn,depthBuffer:!1});b=new Qr(1,1,{type:hn,depthBuffer:!1});bright=new hs({uniforms:{tDiffuse:{value:null},texel:{value:new V},threshold:{value:.75}},vertexShader:ff,fragmentShader:`
      uniform sampler2D tDiffuse;
      uniform vec2 texel;
      uniform float threshold;
      varying vec2 vUv;
      void main() {
        // Four bilinear taps cover the 4x4 source block this pixel stands for.
        vec3 c = texture2D( tDiffuse, vUv + texel * vec2( -1.0, -1.0 ) ).rgb + texture2D( tDiffuse, vUv + texel * vec2( 1.0, -1.0 ) ).rgb
               + texture2D( tDiffuse, vUv + texel * vec2( -1.0, 1.0 ) ).rgb + texture2D( tDiffuse, vUv + texel * vec2( 1.0, 1.0 ) ).rgb;
        c *= 0.25;
        float luma = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
        gl_FragColor = vec4( c * smoothstep( threshold, threshold + 0.5, luma ), 1.0 );
      }`});blur=new hs({uniforms:{tDiffuse:{value:null},dir:{value:new V}},vertexShader:ff,fragmentShader:`
      uniform sampler2D tDiffuse;
      uniform vec2 dir;
      varying vec2 vUv;
      void main() {
        vec3 s = texture2D( tDiffuse, vUv ).rgb * 0.227;
        s += ( texture2D( tDiffuse, vUv + dir * 1.385 ).rgb + texture2D( tDiffuse, vUv - dir * 1.385 ).rgb ) * 0.316;
        s += ( texture2D( tDiffuse, vUv + dir * 3.231 ).rgb + texture2D( tDiffuse, vUv - dir * 3.231 ).rgb ) * 0.070;
        gl_FragColor = vec4( s, 1.0 );
      }`});quad;w=1;h=1;constructor(e){this.quad=new e(this.bright),this.texture=this.a.texture}setSize(e,t){this.w=Math.max(1,Math.floor(e/4)),this.h=Math.max(1,Math.floor(t/4)),this.a.setSize(this.w,this.h),this.b.setSize(this.w,this.h),this.bright.uniforms.texel.value.set(1/e,1/t)}render(e,t){this.bright.uniforms.tDiffuse.value=t,this.quad.material=this.bright,e.setRenderTarget(this.a),this.quad.render(e),this.quad.material=this.blur,this.blur.uniforms.tDiffuse.value=this.a.texture,this.blur.uniforms.dir.value.set(1/this.w,0),e.setRenderTarget(this.b),this.quad.render(e),this.blur.uniforms.tDiffuse.value=this.b.texture,this.blur.uniforms.dir.value.set(0,1/this.h),e.setRenderTarget(this.a),this.quad.render(e)}},ff=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`}));function mf(e={}){return new _s({flatShading:!0,...e})}function hf(e={}){return new _s({flatShading:!1,...e})}function gf(e,t,n,r,i){let a=e.attributes.position,o=new Float32Array(a.count*3);for(let e=0;e<a.count;e++){let s=B.clamp((a.getY(e)-t)/(n-t),0,1);o.fill(r+(i-r)*s*s*(3-2*s),e*3,e*3+3)}return e.setAttribute(`color`,new ha(o,3)),e}function _f(e,t,n){let r=new cs(Ef,Ef,80,80);r.rotateX(-Math.PI/2);let i=Hd(e^7),a=r.attributes.position,o=Ef/80,s=new Float32Array(a.count*3),c=new W(`#74a04a`),l=new W(`#386530`),u=new W(`#a7a35e`),d=new W(`#a08d6a`),f=new W(`#544c3c`),p=new W(`#4d7444`),m=new W(`#22381f`),h=Hd(e^1806);for(let e=0;e<a.count;e++){let r=a.getX(e)+(i()-.5)*o*.45,g=a.getZ(e)+(i()-.5)*o*.45;a.setXYZ(e,r,J(r,g),g);let _=Jd(r,g);kf.copy(l).lerp(c,_),_>.75&&kf.lerp(u,(_-.75)*2.2),kf.lerp(p,t.wetAt(r,g)*.35),kf.lerp(d,t.dirtAt(r,g)*.9),kf.lerp(f,t.scorchAt(r,g)*.7);let v=0;for(let e of n){let t=Math.hypot(e.x-r,e.z-g)/(e.r*2.4+.25);t<1&&(v=Math.max(v,(1-t)*(1-t)))}kf.lerp(m,v*.55),kf.offsetHSL(0,0,(h()-.5)*.03),kf.toArray(s,e*3)}r.setAttribute(`color`,new ha(s,3)),r.computeVertexNormals();let g=new G(r,lf(hf({vertexColors:!0}),{paint:{scale:1.3,amount:.45}}));return g.receiveShadow=!0,g}function vf(e,t){let n=new cs(Ef,Ef,80,80);n.rotateX(-Math.PI/2);let r=Hd(e^7),i=n.attributes.position,a=Ef/80;for(let e=0;e<i.count;e++){let t=i.getX(e)+(r()-.5)*a*.45,n=i.getZ(e)+(r()-.5)*a*.45;i.setXYZ(e,t,J(t,n),n)}let o=n.toNonIndexed();n.dispose();let s=o.attributes.position,c=new Float32Array(s.count*3),l=new W(`#93ab90`),u=new W(`#5b7468`),d=new W(`#aaad8c`),f=new W(`#a39c86`),p=new W(`#4a504c`),m=new W(`#4f6a5f`);for(let e=0;e<s.count;e+=3){let n=(s.getX(e)+s.getX(e+1)+s.getX(e+2))/3,i=(s.getZ(e)+s.getZ(e+1)+s.getZ(e+2))/3,a=Jd(n,i);kf.copy(u).lerp(l,a),a>.78&&kf.lerp(d,(a-.78)*2.5),kf.lerp(m,t.wetAt(n,i)*.3),kf.lerp(f,t.dirtAt(n,i)*.85),kf.lerp(p,t.scorchAt(n,i)*.7),kf.offsetHSL(0,0,(r()-.5)*.04);for(let t=0;t<3;t++)kf.toArray(c,(e+t)*3)}o.setAttribute(`color`,new ha(c,3)),o.computeVertexNormals();let h=new G(o,mf({vertexColors:!0}));return h.receiveShadow=!0,h}function yf(e,t,n,r=()=>!0){let i=[],a=t*40;for(;i.length<t&&a-->0;){let t=e()*Math.PI*2,a=Math.sqrt(e())*Df,o=Math.cos(t)*a,s=Math.sin(t)*a;r(o,s)&&(n>0&&i.some(([e,t])=>(e-o)**2+(t-s)**2<n*n)||i.push([o,s]))}return i}function bf(e,t,n,r={}){let i=new lo(e,t,Math.max(1,n));return i.count=n,i.castShadow=!!r.cast,i.receiveShadow=!!r.receive,i}function xf(e,t,n){Of.updateMatrix(),e.setMatrixAt(t,Of.matrix),n!==void 0&&e.setColorAt(t,kf.set(n))}function Sf(e,t,n,r,i){return t.dirtAt(n,r)>.3||t.waterAt(n,r)>0||e.features.some(e=>(e.x-n)**2+(e.z-r)**2<(e.r+i)**2)}function Cf(e,t,n,r){let i=new ki,a=Hd(e.seedNum^32485),o=(e,t)=>e*e+t*t>9,s=(e,t,n)=>r.every(r=>(r.x-e)**2+(r.z-t)**2>(r.r+n)**2),c=yf(a,Math.round(46*t.arboles),3.2,(t,r)=>o(t,r)&&!Sf(e,n,t,r,.6)),l=bf(new zo(.12,.18,1,5),mf({color:rf?`#6b5038`:`#5c4f48`}),c.length,{cast:!0}),u=bf(new Bo(.9,1.5,6),mf(),c.length,{cast:!0}),d=bf(new Bo(.65,1.2,6),mf(),c.length,{cast:!0}),f=bf(new os(.85,0),mf(),c.length,{cast:!0}),p=lf(hf({vertexColors:!0}),{paint:{scale:3.4,amount:.6}}),m=rf?bf(gf(new os(.5,1),-.5,.5,.5,1.2),p,c.length*7,{cast:!0,receive:!0}):null,h=Hd(e.seedNum^39453),g=0,_=0,v=0;c.forEach(([e,t],n)=>{let i=J(e,t),o=.8+a()*.6,s=a()<(rf?.15:.5),c=s?.7:1.1;if(Of.position.set(e,i+c*o/2,t),Of.rotation.set(0,a()*Math.PI,0),Of.scale.set(o,c*o,o),xf(l,n),Of.scale.setScalar(o),s){let n=kf.set(rf?`#476b3c`:`#3f5a57`).offsetHSL((a()-.5)*.03,0,(a()-.5)*.06).getHex();Of.position.set(e,i+(c+.6)*o,t),xf(u,_,n),Of.position.set(e,i+(c+1.35)*o,t),xf(d,_,n),_++}else if(m){let n=(a()-.5)*.05,r=(a()-.5)*.08,s=i+(c+.6)*o;for(let i=0;i<7;i++){let a=i/7*Math.PI*2+h()*.8,c=i===0?0:(.45+h()*.25)*o,l=(i===0?1.1:.62+h()*.3)*o,u=i===0?.05:(i%2?.3:-.1)+(h()-.5)*.25;Of.position.set(e+Math.cos(a)*c,s+u*o,t+Math.sin(a)*c),Of.rotation.set(h()*3,h()*3,0),Of.scale.set(l,l*.85,l),xf(m,g++,kf.set(`#6e9a42`).offsetHSL(n+(h()-.5)*.03,0,r+(h()-.5)*.1).getHex())}}else Of.position.set(e,i+(c+.55)*o,t),Of.scale.set(o*1.05,o*.95,o*1.05),xf(f,v++,kf.set(`#6f8c73`).offsetHSL((a()-.5)*.05,0,(a()-.5)*.08).getHex());r.push({x:e,z:t,r:.45*o})}),u.count=d.count=_,f.count=v,i.add(l,u,d,f),m&&(m.count=g,i.add(m));let y=yf(a,Math.round(40*t.rocas),1.5,(t,r)=>o(t,r)&&!Sf(e,n,t,r,.3)&&s(t,r,.8)),b=rf?lf(mf(),{paint:{scale:2.6,amount:.3}}):mf(),x=bf(new Ho(.4,0),b,y.length,{cast:!0,receive:!0});return y.forEach(([e,t],n)=>{let i=.5+a()*1;Of.position.set(e,J(e,t)+.08*i,t),Of.rotation.set(a()*.6,a()*Math.PI,a()*.6),Of.scale.set(i*(.9+a()*.5),i*(.5+a()*.3),i*(.9+a()*.5)),xf(x,n,kf.set(rf?`#b8a888`:`#8c9496`).offsetHSL(0,0,(a()-.5)*.12).getHex()),i>.8&&r.push({x:e,z:t,r:.35*i})}),i.add(x),i}function wf(e,t,n,r){let i=new ki,a=Hd(e.seedNum^49406),o=(e,t,n)=>r.every(r=>(r.x-e)**2+(r.z-t)**2>(r.r+n)**2),s=(e,t)=>n.dirtAt(e,t)*.9+n.scorchAt(e,t)*.85+n.waterAt(e,t);if(i.add(rf?_f(e.seedNum,n,r):vf(e.seedNum,n)),rf)return Tf(i,e,t,s,n),i;let c=[...yf(a,Math.round(3200*t.hierba),0),...yf(a,Math.round(2600*t.hierba),0).map(([e,t])=>[e*.3,t*.3])].filter(([e,t])=>a()>s(e,t)),l=bf(new Bo(.04,.2,3).translate(0,.1,0),mf(),c.length);l.userData.thinnable=!0,c.forEach(([e,t],n)=>{Of.position.set(e,J(e,t)-.02,t),Of.rotation.set((a()-.5)*.5,a()*Math.PI,(a()-.5)*.5),Of.scale.setScalar(.7+a()*.8);let r=Jd(e,t);xf(l,n,kf.set(`#557062`).lerp(new W(`#a2b89c`),r*.8+a()*.2).getHex())}),i.add(l);let u=yf(a,Math.round(420*t.flores),0,(e,t)=>Jd(e,t)>.35&&s(e,t)<.2&&n.wetAt(e,t)<.5),d=bf(new zo(.012,.012,.28,3).translate(0,.14,0),mf({color:`#557062`}),u.length),f=bf(new os(.06,0),mf(),u.length),p=[`#eef0ea`,`#d8c97a`,`#c9a3b4`,`#a3a9c9`];u.forEach(([e,t],n)=>{let r=J(e,t),i=(.8+a()*.5)*.45;Of.rotation.set(0,0,0),Of.scale.setScalar(i),Of.position.set(e,r,t),xf(d,n),Of.position.set(e,r+.28*i,t),xf(f,n,p[Math.floor(a()*p.length)])}),i.add(d,f);let m=yf(a,Math.round(70*t.flores),.6,(e,t)=>o(e,t,.3)&&s(e,t)<.1),h=bf(new zo(.04,.05,.14,5).translate(0,.07,0),mf({color:`#f3ead8`}),m.length),g=bf(new Bo(.11,.09,6).translate(0,.045,0),mf(),m.length,{cast:!0});return m.forEach(([e,t],n)=>{let r=J(e,t),i=(.8+a()*.9)*.45;Of.rotation.set((a()-.5)*.3,a()*Math.PI,(a()-.5)*.3),Of.scale.setScalar(i),Of.position.set(e,r,t),xf(h,n),Of.position.set(e,r+.13*i,t),xf(g,n,a()<.75?`#a65a4c`:`#a8906a`)}),i.add(h,g),i}function Tf(e,t,n,r,i){let a=Hd(t.seedNum^400094),o=[...yf(a,Math.round(600*n.hierba),0),...yf(a,Math.round(5500*n.hierba),0).map(([e,t])=>[e*.3,t*.3])].filter(([e,t])=>a()>r(e,t)*1.2),s=bf(gf(new Bo(.026,.2,3,1,!0).translate(0,.1,0),0,.2,.35,1.2),lf(hf({vertexColors:!0}),{paint:{scale:.9,amount:.25}}),o.length*8);s.userData.thinnable=!0;let c=new W(`#386a2e`),l=new W(`#8fb655`),u=0;for(let[e,t]of o){let n=Jd(e,t),r=.8+a()*.7;for(let i=0;i<8;i++){let i=a()*Math.PI*2,o=a()*.09*r,d=e+Math.cos(i)*o,f=t+Math.sin(i)*o;Of.position.set(d,J(d,f)-.02,f),Of.rotation.set(Math.sin(i)*(.25+a()*.35),a()*Math.PI,-Math.cos(i)*(.25+a()*.35)),Of.scale.set(r,r*(.7+a()*.6),r),xf(s,u++,kf.copy(c).lerp(l,n*.6+a()*.3).getHex())}}s.count=u,e.add(s);let d=[{head:`spike`,colors:[`#7b5bc4`,`#8d6bd6`,`#6a4fb3`],size:1,stem:1.25},{head:`round`,colors:[`#f6f2e4`,`#fffaf0`],size:.8,stem:.8},{head:`cup`,colors:[`#d8483a`,`#e8603f`],size:1,stem:1},{head:`round`,colors:[`#f2c84b`,`#f7d96a`],size:.7,stem:.7},{head:`round`,colors:[`#5f86d9`,`#7a9ae6`],size:.65,stem:.75},{head:`round`,colors:[`#e9a4c0`,`#f0b8cf`],size:.75,stem:.8}],f=(e,t)=>r(e,t)<.15&&i.wetAt(e,t)<.5,p=[],m=[...yf(a,Math.round(70*n.flores),1.2,f),...yf(a,Math.round(150*n.flores),0,f).map(([e,t])=>[e*.32,t*.32])];for(let[e,t]of m){let n=d[Math.floor(a()*d.length)],r=10+Math.floor(a()*18),i=.25+a()*.45;for(let o=0;o<r;o++){let r=a()*Math.PI*2,o=Math.sqrt(a())*i,s=e+Math.cos(r)*o,c=t+Math.sin(r)*o;f(s,c)&&p.push({x:s,z:c,kind:n})}}for(let[e,t]of yf(a,Math.round(500*n.flores),0,f))p.push({x:e,z:t,kind:d[1+Math.floor(a()*5)]});let h=bf(new zo(.012,.014,.3,3,1,!0).translate(0,.15,0),mf({color:`#5c8a3a`}),p.length),g={round:bf(new os(.065,0),hf(),p.length),cup:bf(new zo(.08,.03,.06,6).translate(0,.03,0),hf(),p.length),spike:bf(new Bo(.06,.32,5,1,!0).translate(0,.16,0),hf(),p.length,{cast:!0})},_={round:0,cup:0,spike:0};p.forEach(({x:e,z:t,kind:n},r)=>{let i=J(e,t),o=(.75+a()*.5)*.7*n.size,s=.3*n.stem;Of.rotation.set((a()-.5)*.25,a()*Math.PI,(a()-.5)*.25),Of.scale.set(o,o*n.stem,o),Of.position.set(e,i,t),xf(h,r),Of.scale.setScalar(o),Of.position.set(e,i+s*o,t),xf(g[n.head],_[n.head]++,n.colors[Math.floor(a()*n.colors.length)])});for(let e of[`round`,`cup`,`spike`])g[e].count=_[e];e.add(h,g.round,g.cup,g.spike)}var Ef,Df,Of,kf,Af=t((()=>{Id(),Xd(),cf(),pf(),Ef=90,Df=34,Of=new Oi,kf=new W}));function jf(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Mf.copy(t),Mf[r]=0,Mf.normalize();let l=.5*o/(o+s),u=1-Mf.angleTo(e)/c;return Math.sign(Mf[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Mf,Nf,Pf=t((()=>{Id(),Mf=new H,Nf=class e extends Lo{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new H,c=new H,l=new H(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new H,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=jf(m,c,`z`,`y`,i,n),f[a+1]=1-jf(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-jf(m,c,`z`,`y`,i,n),f[a+1]=1-jf(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-jf(m,c,`x`,`z`,i,e),f[a+1]=jf(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-jf(m,c,`x`,`z`,i,e),f[a+1]=1-jf(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-jf(m,c,`x`,`y`,i,e),f[a+1]=1-jf(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=jf(m,c,`x`,`y`,i,e),f[a+1]=1-jf(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}}}));function Ff(e={}){return new _s({flatShading:!0,...e})}function If(e,t,n=0){Y.position.set(e,J(e,t)+n,t)}function Lf(e,t,n){let r=Math.cos(e.rot),i=Math.sin(e.rot);return[e.x+t*r-n*i,e.z+t*i+n*r]}function Rf(e,t){return ap.set(t).offsetHSL(0,(e.rand()-.5)*.04,(e.rand()-.5)*.1).getHex()}function zf(e,t,n,r){for(let i=0;i<r;i++){let r=e.rand()*Math.PI*2,i=n*(.8+e.rand()*.4),a=t.x+Math.cos(r)*i,o=t.z+Math.sin(r)*i,s=.25+e.rand()*.25;If(a,o,s*.25),Y.rotation.set(0,e.rand()*3,0),Y.scale.set(s,s*.75,s),e.bushes.add(ap.set(`#5f7a6a`).offsetHSL((e.rand()-.5)*.04,0,(e.rand()-.5)*.1).getHex())}}function Bf(e,t,n,r,i,a){for(let o=0;o<n;o++){let n=e.rand()*Math.PI*2,o=Math.sqrt(e.rand())*r,s=t.x+Math.cos(n)*o,c=t.z+Math.sin(n)*o;e.motes.push({x:s,z:c,y:J(s,c),phase:e.rand(),speed:.5+e.rand(),rise:a,color:new W(i)})}}function Vf(e,t,n){for(let r=0;r<t.length-1;r++){if(e.rand()<.16)continue;let[i,a]=t[r],[o,s]=t[r+1],c=Math.hypot(o-i,s-a);if(c<1e-6)continue;let l=-(s-a)/c*n,u=(o-i)/c*n,d=[[i-l,a-u],[o-l,s-u],[o+l,s+u],[i-l,a-u],[o+l,s+u],[i+l,a+u]];for(let[t,n]of d)e.ribbons.push(t,J(t,n)+.1,n)}}function Hf(e,t,n,r){return Array.from({length:r+1},(i,a)=>{let o=a/r*Math.PI*2;return[e+Math.cos(o)*n,t+Math.sin(o)*n]})}function Uf(e,t,n,r,i,a){let o=[];for(let s=0;s<r;s++){let c=i+s/r*Math.PI*2,l=i+(s+1)/r*Math.PI*2;for(let r=0;r<=a;r++){let i=r/a;o.push([e+(Math.cos(c)*(1-i)+Math.cos(l)*i)*n,t+(Math.sin(c)*(1-i)+Math.sin(l)*i)*n])}}return o}function Wf(e,t){let{rand:n}=t,r=1.75*e.size,i=Math.floor(n()*8),a=(i+2+Math.floor(n()*2))%8,o=(i+5+Math.floor(n()*2))%8,s=(i+1)%8;for(let s=0;s<8;s++){if(s===i)continue;let c=s/8*Math.PI*2+e.rot,l=e.x+Math.cos(c)*r,u=e.z+Math.sin(c)*r,d=s===a||s===o,f=.9+n()*.5;d?(If(l,u,.12),Y.rotation.set(Math.PI/2-.08,0,c+(n()-.5)*.6),Y.scale.set(.42,f,.28)):(If(l,u,f/2-.08),Y.rotation.set((n()-.5)*.16,-c,(n()-.5)*.16),Y.scale.set(.42,f,.3)),t.stones.add(Rf(t,`#8a9294`)),t.obstacles.push({x:l,z:u,r:.3});for(let e=0;e<2;e++)If(l+(n()-.5)*.7,u+(n()-.5)*.7,.02),Y.rotation.set(n(),n()*3,n()),Y.scale.setScalar(.1+n()*.1),t.rubble.add(Rf(t,`#848c8e`))}if(s!==i&&(s+1)%8!==i&&s!==a&&s!==o){let n=s/8*Math.PI*2+e.rot,i=n+Math.PI/4;If(e.x+Math.cos((n+i)/2)*r*.96,e.z+Math.sin((n+i)/2)*r*.96,1.35),Y.rotation.set(0,-(n+i)/2+Math.PI/2,.06),Y.scale.set(1.55*e.size,.22,.32),t.stones.add(Rf(t,`#8a9294`))}If(e.x,e.z,.12),Y.rotation.set(0,e.rot,0),Y.scale.set(.7,.28,.5),t.stones.add(Rf(t,`#7c8587`)),t.obstacles.push({x:e.x,z:e.z,r:.4}),zf(t,e,r+.6,7)}function Gf(e,t){let{rand:n}=t,r=5+Math.round(e.size*2),i=1+Math.floor(n()*(r-2));for(let a=0;a<r;a++){let o=(a-(r-1)/2)*.5,s=a===i?0:a===i+2?1:2+Math.floor(n()*2),[c,l]=Lf(e,o,0);for(let r=0;r<s;r++)If(c+(n()-.5)*.05,l+(n()-.5)*.05,.13+r*.25),Y.rotation.set(0,-e.rot+(n()-.5)*.12,0),Y.scale.set(.47,.24,.34),t.stones.add(Rf(t,`#959b98`));if(s>0)t.obstacles.push({x:c,z:l,r:.28});else for(let r=0;r<3;r++){let[r,i]=Lf(e,o+(n()-.5)*.8,.3+n()*.5);If(r,i,.1),Y.rotation.set((n()-.5)*.5,n()*3,(n()-.5)*.5),Y.scale.set(.42,.22,.3),t.stones.add(Rf(t,`#8e9491`))}}zf(t,e,1.3*e.size,5)}function Kf(e,t){let{rand:n}=t,r=2+Math.floor(n()*3);for(let i=0;i<r;i++){let a=i/r*Math.PI*2+n()*.8+e.rot,o=i===0?0:.45*e.size+n()*.25,s=e.x+Math.cos(a)*o,c=e.z+Math.sin(a)*o,l=(i===0?1.15:.6+n()*.4)*e.size;If(s,c,.12*l),Y.rotation.set(n()*.6,n()*Math.PI,n()*.6),Y.scale.set(l*(.9+n()*.4),l*(.6+n()*.35),l*(.9+n()*.4)),t.rubble.add(Rf(t,`#8c9496`)),t.obstacles.push({x:s,z:c,r:.42*l})}for(let r=0;r<8;r++){let r=n()*Math.PI*2,i=(.7+n()*.5)*e.size;If(e.x+Math.cos(r)*i,e.z+Math.sin(r)*i,.02),Y.rotation.set(n(),n()*3,n()),Y.scale.setScalar(.12+n()*.16),t.rubble.add(Rf(t,`#879092`))}zf(t,e,.95*e.size,4)}function qf(e,t){let{rand:n}=t;for(let r=0;r<10;r++){let r=n()*Math.PI*2,i=Math.sqrt(n())*e.r*.45;If(e.x+Math.cos(r)*i,e.z+Math.sin(r)*i,.02),Y.rotation.set(n(),n()*3,n()),Y.scale.setScalar(.07+n()*.12),t.rubble.add(Rf(t,n()<.5?`#8f8672`:`#9a9a90`))}if(n()<.6){let[r,i]=Lf(e,.2,-.1);If(r,i,.1),Y.rotation.set(0,n()*3,0),Y.scale.set(.36,.26,.36),t.wood.add(`#75614f`),t.obstacles.push({x:r,z:i,r:.2})}}function Jf(e,t){let{rand:n}=t;for(let r=0;r<18;r++){let r=n()*Math.PI*2,i=Math.sqrt(n())*e.r*.75;If(e.x+Math.cos(r)*i,e.z+Math.sin(r)*i,.02),Y.rotation.set(n(),n()*3,n());let a=.08+n()*.14;Y.scale.set(a*1.3,a*.6,a),t.rubble.add(ap.set(n()<.7?`#7f7360`:`#958b74`).offsetHSL(0,0,(n()-.5)*.08).getHex())}}function Yf(e,t){let{rand:n}=t,r=e.r*.85,i=qd({x:e.x,z:e.z,r,depth:-.5,rim:.04})-.1,a=new Ro(r*.92,14),o=a.attributes.position;for(let e=1;e<o.count;e++)o.setXY(e,o.getX(e)*(.92+n()*.12),o.getY(e)*(.92+n()*.12));a.rotateX(-Math.PI/2);let s=new G(a,rf?new _s({color:`#79b7b0`,emissive:`#2f7a7c`,emissiveIntensity:.4,transparent:!0,opacity:.86}):new _s({color:`#8fc4d2`,emissive:`#4b8ea2`,emissiveIntensity:.45,transparent:!0,opacity:.84}));s.position.set(e.x,i,e.z),s.receiveShadow=!0,t.group.add(s);let c=new G(new Ro(r*.5,12).rotateX(-Math.PI/2),new Ha({color:`#4f8fa6`,transparent:!0,opacity:.35,depthWrite:!1}));c.position.set(e.x,i+.003,e.z);let l=new G(new ls(r*.78,r*.9,20).rotateX(-Math.PI/2),new Ha({color:`#dcedee`,transparent:!0,opacity:.4,depthWrite:!1}));l.position.set(e.x,i+.004,e.z),t.group.add(c,l),t.obstacles.push({x:e.x,z:e.z,r:r*.7});for(let a=0;a<2;a++){let a=n()*Math.PI*2,o=Math.sqrt(n())*r*.55;Y.position.set(e.x+Math.cos(a)*o,i+.005,e.z+Math.sin(a)*o),Y.rotation.set(0,n()*3,0),Y.scale.setScalar(.8+n()*.6),t.pads.add(ap.set(`#5d7d63`).offsetHSL(0,0,(n()-.5)*.08).getHex())}for(let a=0;a<1;a++){let a=n()*Math.PI*2;for(let o=0;o<6;o++){let o=a+(n()-.5)*.6,s=r*(.72+n()*.18),c=e.x+Math.cos(o)*s,l=e.z+Math.sin(o)*s;Y.position.set(c,Math.max(i,J(c,l))-.02,l),Y.rotation.set((n()-.5)*.3,n()*3,(n()-.5)*.3),Y.scale.set(1,.7+n()*.7,1),t.reeds.add(ap.set(`#6f7f5c`).offsetHSL(0,0,(n()-.5)*.1).getHex())}}for(let i=0;i<7;i++){let i=n()*Math.PI*2,a=r*(.82+n()*.2);If(e.x+Math.cos(i)*a,e.z+Math.sin(i)*a,.03),Y.rotation.set(n(),n()*3,n()),Y.scale.set(.2+n()*.2,.12+n()*.08,.2+n()*.15),t.rubble.add(Rf(t,`#7f8a8a`))}}function Xf(e,t){let{rand:n}=t;for(let r=0;r<8;r++){let i=r/8*Math.PI*2+n()*.2;If(e.x+Math.cos(i)*.32*sp,e.z+Math.sin(i)*.32*sp,.04*sp),Y.rotation.set(n(),n()*3,n()),Y.scale.set(.16*sp,.12*sp,.14*sp),t.rubble.add(Rf(t,`#6d7272`))}for(let n=0;n<3;n++)If(e.x,e.z,.07*sp),Y.rotation.set(0,e.rot+n/3*Math.PI,Math.PI/2-.35),Y.scale.set(.08*sp,.5*sp,.08*sp),t.wood.add(`#5e4c3f`);for(let r=0;r<4;r++)If(e.x+(n()-.5)*.25*sp,e.z+(n()-.5)*.25*sp,.03*sp),Y.rotation.set(n(),n()*3,n()),Y.scale.setScalar((.06+n()*.05)*sp),t.embers.add(n()<.5?`#ff8a3d`:`#d9542b`);let r=J(e.x,e.z);for(let i=0;i<3;i++)t.flames.push({x:e.x+(n()-.5)*.12*sp,y:r+.05*sp,z:e.z+(n()-.5)*.12*sp,s:(1-i*.22)*sp,phase:n()*10,animated:e.animated});t.obstacles.push({x:e.x,z:e.z,r:.42*sp});let[i,a]=Lf(e,0,.525);If(i,a,.12*sp),Y.rotation.set(0,e.rot,Math.PI/2),Y.scale.set(.24*sp,.9*sp,.24*sp),t.wood.add(`#6b5a4c`),t.obstacles.push({x:i,z:a,r:.3*sp}),e.animated&&Bf(t,e,10,.15*sp,`#ffb36b`,.7)}function Zf(e,t){let{rand:n}=t,r=e.r/1.15;for(let i=0;i<16;i++){let i=n()*Math.PI*2,a=r*(.85+n()*.45);If(e.x+Math.cos(i)*a,e.z+Math.sin(i)*a,.03),Y.rotation.set(n(),n()*3,n()),Y.scale.set(.2+n()*.25,.12+n()*.12,.2+n()*.2),t.rubble.add(Rf(t,n()<.5?`#5d6261`:`#7d8586`))}for(let i=0;i<7;i++){let i=n()*Math.PI*2,a=Math.sqrt(n())*r*.6;If(e.x+Math.cos(i)*a,e.z+Math.sin(i)*a,.02),Y.rotation.set(n(),n()*3,n()),Y.scale.setScalar(.05+n()*.06),t.embers.add(n()<.5?`#e0703a`:`#b84a2a`)}for(let i=0;i<6;i++){let a=e.rot+i*.42+(n()-.5)*.2,o=r*(1.05+n()*.3),s=e.x+Math.cos(a)*o,c=e.z+Math.sin(a)*o,l=(n()-.5)*.7,u=(n()-.5)*.7;i%2==0?(If(s,c,.2),Y.rotation.set(l,n()*3,u),Y.scale.set(.05,.45,.015),t.metal.add(`#b3bcbd`),Y.translateY(.24),Y.scale.set(.18,.03,.04),t.metal.add(`#6f6450`),Y.translateY(.06),Y.scale.set(.035,.1,.035),t.metal.add(`#4f4337`)):(If(s,c,.4),Y.rotation.set(l,0,u),Y.scale.set(.03,.9,.03),t.wood.add(`#6a5a4a`),Y.translateY(.5),Y.scale.set(.06,.14,.02),t.metal.add(`#a9b2b3`)),t.obstacles.push({x:s,z:c,r:.08})}}function Qf(e,t){let{rand:n}=t,r=2+Math.floor(n()*2);for(let i=0;i<r;i++){let a=e.rot+i/r*Math.PI*2,o=i===0&&r===2?.15:.4*e.size,s=e.x+Math.cos(a)*o,c=e.z+Math.sin(a)*o,l=3+Math.floor(n()*3);for(let r=0;r<l;r++){let i=(r===0?.55:.2+n()*.3)*e.size;If(s+(n()-.5)*.4,c+(n()-.5)*.4,i*.55),Y.rotation.set((n()-.5)*.9,n()*Math.PI,(n()-.5)*.9),Y.scale.set(i*.45,i*1.5,i*.45),t.crystals.add(ap.set(`#7fc7bb`).offsetHSL((n()-.5)*.06,0,(n()-.5)*.12).getHex())}t.obstacles.push({x:s,z:c,r:.3*e.size})}Vf(t,Hf(e.x,e.z,e.r*.85,32),.03),e.animated&&Bf(t,e,16,e.r*.7,`#d6fff4`,1.6)}function $f(e,t){let{rand:n}=t,r=e.r*.85;Vf(t,Hf(e.x,e.z,r,36),.035),Vf(t,Hf(e.x,e.z,r*.74,30),.022);let i=n()<.5?3:4;Vf(t,Uf(e.x,e.z,r*.7,i,e.rot,5),.025);for(let i=0;i<4;i++){let a=e.rot+i/4*Math.PI*2+Math.PI/4,o=e.x+Math.cos(a)*(r+.25),s=e.z+Math.sin(a)*(r+.25);If(o,s,.12),Y.rotation.set((n()-.5)*.2,-a,(n()-.5)*.2),Y.scale.set(.16,.32,.12),t.stones.add(Rf(t,`#7f8a8c`)),t.obstacles.push({x:o,z:s,r:.12})}e.animated&&Bf(t,e,12,r*.8,`#d6fff4`,1.1)}function ep(e,t){let{rand:n}=t,r=7+Math.round(e.size*2);for(let i=0;i<r;i++){let a=(i-(r-1)/2)*.32,[o,s]=Lf(e,a,0),c=n()<.3,l=.75+n()*.35;if(c){let[t,r]=Lf(e,a+.1,.3);If(t,r,.07),Y.rotation.set(Math.PI/2,0,-e.rot+(n()-.5)),Y.scale.set(.12,l,.12)}else If(o,s,l/2-.05),Y.rotation.set((n()-.5)*.25,0,(n()-.5)*.25),Y.scale.set(.13,l,.13),t.obstacles.push({x:o,z:s,r:.12});t.wood.add(ap.set(`#7a6656`).offsetHSL(0,0,(n()-.5)*.08).getHex()),c||(Y.translateY(.5+.06/l),Y.scale.set(.09,.12,.09),t.wood.add(`#8d7966`))}let[i,a]=Lf(e,-.6,0);If(i,a,.45),Y.rotation.set(0,-e.rot,Math.PI/2+.05),Y.scale.set(.07,1.3,.07),t.wood.add(`#6b584a`),zf(t,e,1.2*e.size,5)}function tp(e,t){let{rand:n}=t;for(let r=0;r<5;r++){let[r,i]=Lf(e,(n()-.5)*1.1,(n()-.5)*.8);If(r,i,.05),Y.rotation.set((n()-.5)*.2,n()*Math.PI,(n()-.5)*.2),Y.scale.set(.9+n()*.3,.05,.18),t.planks.add(ap.set(`#857160`).offsetHSL(0,0,(n()-.5)*.1).getHex())}let[r,i]=Lf(e,.3,-.25);If(r,i,.17),Y.rotation.set(0,.6+e.rot,0),Y.scale.setScalar(.34),t.planks.add(`#8a7562`);let[a,o]=Lf(e,.55,.05);If(a,o,.12),Y.rotation.set(.15,1.1,.1),Y.scale.setScalar(.24),t.planks.add(`#7a6655`);let[s,c]=Lf(e,.4,-.1);t.obstacles.push({x:s,z:c,r:.3});let l=new ki,u=Ff({color:`#6f5c4c`}),d=new G(new us(.32,.04,4,10),u);d.castShadow=!0,l.add(d);let f=new Lo(.03,.62,.03);for(let e=0;e<4;e++){let t=new G(f,u);t.rotation.z=e/4*Math.PI,l.add(t)}let[p,m]=Lf(e,-.45,.2);l.position.set(p,J(p,m)+.14,m),l.rotation.set(-Math.PI/2+.35,0,.7+e.rot),t.group.add(l),zf(t,e,1.1,5)}function np(e,t){let{rand:n}=t;If(e.x,e.z,.14),Y.rotation.set(0,e.rot,Math.PI/2),Y.scale.set(.3,1.5,.3),t.wood.add(`#6b5a4c`),t.obstacles.push({x:e.x,z:e.z,r:.45});let r=1+Math.floor(n()*2);for(let i=0;i<r;i++){let[r,i]=Lf(e,(n()-.5)*1.4,.55+n()*.3);If(r,i,.1),Y.rotation.set(0,n()*3,0),Y.scale.set(.36,.26,.36),t.wood.add(`#75614f`),t.obstacles.push({x:r,z:i,r:.2})}}function rp(e,t){let{rand:n}=t,r=[`#8f4b3f`,`#4d5a8a`,`#6b7a4a`][Math.floor(n()*3)],i=new G(new zo(.025,.03,1.7,5),Ff({color:`#5d4d40`}));i.position.set(e.x,J(e.x,e.z)+.82,e.z),i.rotation.z=(n()-.5)*.15,i.castShadow=!0;let a=new ki;a.position.y=.78,a.rotation.y=e.rot;let o=new G(cp,Ff({color:r,side:2}));if(o.castShadow=!0,a.add(o),i.add(a),t.group.add(i),t.obstacles.push({x:e.x,z:e.z,r:.1}),e.animated){let r=n()*6;t.animators.push(t=>{a.rotation.y=e.rot+Math.sin(t*1.3+r)*.35+.3,a.rotation.x=Math.sin(t*2.1+r)*.05})}}function ip(e,t){let n=new ki,r={rand:Math.random,obstacles:t,group:n,stones:rf?new op(new Nf(1,1,1,1,.1),lf(Ff(),{paint:{scale:3,amount:.3}}),$d):new op(new Lo(1,1,1),Ff(),$d),wood:new op(new zo(.5,.5,1,6),Ff()),planks:new op(new Lo(1,1,1),Ff()),metal:new op(new Lo(1,1,1),Ff()),crystals:new op(new ss(.5,0),Ff({emissive:`#2c6f68`,emissiveIntensity:.9})),embers:new op(new Ho(.5,0),Ff({emissive:`#c4421c`,emissiveIntensity:.9})),bushes:rf?new op(new os(.5,1),lf(Ff({flatShading:!1}),{paint:{scale:4,amount:.5}}),ef):new op(new os(.5,0),Ff()),rubble:new op(new Ho(.5,0),rf?lf(Ff(),{paint:{scale:3,amount:.3}}):Ff(),$d),reeds:new op(new Bo(.025,.55,3).translate(0,.27,0),Ff()),pads:new op(new zo(.11,.11,.01,6),Ff()),ribbons:[],motes:[],flames:[],animators:[]},i=[];for(let n of e.features){r.rand=Hd(n.seed);let e=t.length;lp[n.kind](n,r),i.push(t.slice(e).reduce((e,t)=>e+Math.PI*t.r*t.r,0))}r.rand=Hd(e.seedNum^20973);for(let e=0;e<50;e++)If((r.rand()-.5)*14,(r.rand()-.5)*16,.01),Y.rotation.set(r.rand(),r.rand()*3,r.rand()),Y.scale.setScalar(.06+r.rand()*.1),r.rubble.add(Rf(r,`#8f9799`));let a=[r.stones.build(),r.wood.build(),r.planks.build(),r.metal.build(!0,!1),r.crystals.build(!0,!1),r.embers.build(!1,!1),r.bushes.build(!0,!0),r.rubble.build(!0,!0),r.reeds.build(!1,!1),r.pads.build(!1,!0)];for(let e of a)e&&n.add(e);if(r.ribbons.length){let e=new Aa;e.setAttribute(`position`,new va(r.ribbons,3));let t=new G(e,new Ha({color:`#b9efe2`,transparent:!0,opacity:.5,side:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));t.renderOrder=1,n.add(t)}if(r.flames.length){let e=new lo(new Bo(.12,.42,5).translate(0,.21,0),new Ha({transparent:!0,opacity:.9,depthWrite:!1}),r.flames.length),t=[`#ff9a45`,`#ffc46b`,`#fff0b0`];r.flames.forEach((n,r)=>e.setColorAt(r,ap.set(t[r%3])));let i=t=>{r.flames.forEach((n,r)=>{let i=n.animated?1+Math.sin(t*11+n.phase)*.12+Math.sin(t*17+n.phase*2)*.08:1;Y.position.set(n.x,n.y,n.z),Y.rotation.set(n.animated?Math.sin(t*5+n.phase)*.12:0,n.phase,0),Y.scale.set(n.s,n.s*i,n.s),Y.updateMatrix(),e.setMatrixAt(r,Y.matrix)}),e.instanceMatrix.needsUpdate=!0};i(0),n.add(e),r.flames.some(e=>e.animated)&&r.animators.push(i)}if(r.motes.length){let e=r.motes.length,t=new Float32Array(e*3),i=new Float32Array(e*3);r.motes.forEach((e,t)=>e.color.toArray(i,t*3));let a=new Aa;a.setAttribute(`position`,new ha(t,3)),a.setAttribute(`color`,new ha(i,3));let o=new Mo(a,new Do({size:.07,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,blending:2}));o.frustumCulled=!1,n.add(o),r.animators.push(e=>{r.motes.forEach((n,r)=>{let i=(n.phase+e*.12*n.speed*(1.6/n.rise))%1;t[r*3]=n.x+Math.sin(e*n.speed+n.phase*9)*.15,t[r*3+1]=n.y+.1+i*n.rise,t[r*3+2]=n.z+Math.cos(e*n.speed+n.phase*7)*.15}),a.attributes.position.needsUpdate=!0})}let o=0;return{group:n,blockedArea:i,update(e){o+=e;for(let e of r.animators)e(o)}}}var Y,ap,op,sp,cp,lp,up=t((()=>{Id(),Pf(),Xd(),cf(),pf(),Y=new Oi,ap=new W,op=class{geo;mat;recolor;matrices=[];colors=[];constructor(e,t,n=e=>e){this.geo=e,this.mat=t,this.recolor=n}add(e){Y.updateMatrix(),this.matrices.push(Y.matrix.clone()),this.colors.push(new W(this.recolor(e)))}build(e=!0,t=!0){if(!this.matrices.length)return this.geo.dispose(),this.mat.dispose(),null;let n=new lo(this.geo,this.mat,this.matrices.length);return this.matrices.forEach((e,t)=>{n.setMatrixAt(t,e),n.setColorAt(t,this.colors[t])}),n.castShadow=e,n.receiveShadow=t,n}},sp=.5,cp=(()=>{let e=new cs(.42,.62,2,3).translate(.21,-.31,0),t=e.attributes.position;for(let e=0;e<t.count;e++)t.getY(e)<-.6&&t.setY(e,-.62+(e%2?.14:0));return e})(),lp={menhires:Wf,muro:Gf,penascos:Kf,monticulo:qf,tierraSuelta:Jf,estanque:Yf,fogata:Xf,crater:Zf,cristales:Qf,runas:$f,empalizada:ep,carreta:tp,troncos:np,estandarte:rp}}));function dp(e,t){return[e*Cp-t*wp,-e*wp-t*Cp]}function fp(e){return 2.1+(e-Tp.vMin)*.08}function pp(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function mp(){return Math.floor(Math.random()*36**6).toString(36).padStart(6,`0`)}function hp(e,t,n){let r=Object.keys(Ap).filter(e=>Ap[e].material===t),i=r.map(e=>Ap[e].weight*.25**(n.get(e)??0)),a=e()*i.reduce((e,t)=>e+t,0);for(let e=0;e<r.length;e++)if(a-=i[e],a<=0)return r[e];return r[r.length-1]}function gp(e,t,[n,r],[i,a]){let o=i-n,s=a-r,c=B.clamp(((e-n)*o+(t-r)*s)/(o*o+s*s),0,1);return Math.hypot(e-n-o*c,t-r-s*c)}function _p(e,t,n){let r=1/0;for(let i=0;i<n.length-1;i++)r=Math.min(r,gp(e,t,n[i],n[i+1]));return r}function vp(e){let t=(e()-.5)*1.6,n=Math.sin(t),r=Math.cos(t),i=(e()-.5)*2.4,a=[],o=0;for(let t=-11;t<=11;t+=2.2)o=o*.5+(e()-.5)*1.4,a.push(dp(t*n+(i+o)*r,t*r-(i+o)*n));return a}function yp(e,t,n=[]){let r=pp(e),i=Hd(r),a=t.sendero>=1?vp(i):null,o=[],s=new Map,c=[[`agua`,t.agua],[`magia`,t.magia],[`roca`,t.roca],[`fuego`,t.fuego],[`tierra`,t.tierra],[`restos`,t.restos]];for(let[e,t]of c)for(let n=0;n<t;n++){let t=hp(i,e,s);s.set(t,(s.get(t)??0)+1);let[n,r]=Ap[t].size,a=i()*Math.PI*2;(t===`muro`||t===`empalizada`)&&(a=Math.atan2(-Cp,-wp)+(a/Math.PI-1)*.5),o.push({kind:t,size:n+i()*(r-n),rot:a,seed:Math.floor(i()*2**31)})}for(let e of n){if(o.some(t=>t.kind===e))continue;let[t,n]=Ap[e].size;o.push({kind:e,size:t+i()*(n-t),rot:i()*Math.PI*2,seed:Math.floor(i()*2**31)})}let l=e=>+!!n.includes(e);o.sort((e,t)=>l(t.kind)-l(e.kind)||Ap[t.kind].radius(t.size)-Ap[e.kind].radius(e.size));let u=[],d=[],f=0;for(let e of o){let r=Ap[e.kind],o=r.radius(e.size),s=o*.85-Ep,c=o*.5;if(fp(Tp.vMax)<s){d.push(`${kp[e.kind]} (${M.dev.noRoomPortrait})`);continue}let l=null,p=n.includes(e.kind)?400:80;for(let t=0;t<p&&!l;t++){let t=B.lerp(Tp.vMin+c,Tp.vMax-c,i()),n=fp(t)-s;if(n<0)continue;let[d,f]=dp((i()*2-1)*n,t),p=r.solid?o*.8+Dp:o*.5+Dp;d*d+f*f<p*p||r.solid&&a&&_p(d,f,a)<o*.35||u.some(e=>{let t=e.solid&&r.solid?.4:0;return(e.x-d)**2+(e.z-f)**2<((e.r+o)*.8+t)**2})||(l={kind:e.kind,material:r.material,x:d,z:f,rot:e.rot,size:e.size,r:o,solid:r.solid,animated:!1,seed:e.seed})}l?(r.animates&&f<t.animadosMax&&(l.animated=!0,f++),u.push(l)):d.push(`${kp[e.kind]} (${M.dev.noRoom})`)}return{seed:e,seedNum:r,features:u,skipped:d,trail:a}}function bp(e){let t=[];for(let n of e.features)n.kind===`estanque`&&t.push({x:n.x,z:n.z,r:n.r*.85,depth:-.5,rim:.04,flatten:!0}),n.kind===`crater`&&t.push({x:n.x,z:n.z,r:n.r/1.15,depth:-.42,rim:.14}),n.kind===`monticulo`&&t.push({x:n.x,z:n.z,r:n.r,depth:.38*n.size,rim:0});return t}function xp(e){let{trail:t,features:n}=e,r=e=>n.filter(t=>e.includes(t.kind)),i=r([`tierraSuelta`,`monticulo`,`fogata`,`menhires`]),a=r([`crater`,`fogata`]),o=r([`estanque`]);return{dirtAt(e,n){let r=t?Np(.9-_p(e,n,t),0,.5):0;for(let t of i){let i=Math.hypot(e-t.x,n-t.z)/t.r,a=t.kind===`tierraSuelta`?.85:t.kind===`monticulo`?.45:t.kind===`fogata`?.55:.35;r=Math.max(r,Np(a-i,-.05,.25)*(t.kind===`menhires`?.45:1))}for(let t of o){let i=Math.hypot(e-t.x,n-t.z)/(t.r*.85);r=Math.max(r,Np(.95-Math.abs(i-.82)*4,0,.6)*.8)}return r},scorchAt(e,t){let n=0;for(let r of a){let i=Math.hypot(e-r.x,t-r.z)/(r.kind===`crater`?r.r/1.15:.3);n=Math.max(n,Np(1.1-i,0,.5))}return n},waterAt(e,t){for(let n of o)if(Math.hypot(e-n.x,t-n.z)<n.r*.85*.78)return 1;return 0},wetAt(e,t){let n=0;for(let r of o)n=Math.max(n,Np(1.5-Math.hypot(e-r.x,t-r.z)/(r.r*.85),0,.5));return n}}}var Sp,Cp,wp,Tp,Ep,Dp,Op,kp,Ap,jp,Mp,Np,Pp=t((()=>{Id(),Xd(),ge(),Sp=B.degToRad(24),Cp=Math.cos(Sp),wp=Math.sin(Sp),Tp={uMin:-2.2,uMax:2.2,vMin:-4,vMax:5.6},Ep=.1,Dp=.9,Op=M.materials,kp=M.kinds,Ap={menhires:{material:`roca`,weight:1,radius:e=>2.2*e,size:[.55,.7],solid:!0,animates:!1},muro:{material:`roca`,weight:1,radius:e=>1.9*e,size:[.7,.9],solid:!0,animates:!1},penascos:{material:`roca`,weight:1.4,radius:e=>1.2*e,size:[.8,1.2],solid:!0,animates:!1},monticulo:{material:`tierra`,weight:1,radius:e=>1.5*e,size:[.8,1.1],solid:!1,animates:!1},tierraSuelta:{material:`tierra`,weight:1,radius:e=>1.2*e,size:[.8,1.2],solid:!1,animates:!1},estanque:{material:`agua`,weight:1,radius:e=>1.6*e,size:[.55,.8],solid:!0,animates:!1},fogata:{material:`fuego`,weight:1.3,radius:()=>.7,size:[1,1],solid:!0,animates:!0},crater:{material:`fuego`,weight:0,radius:e=>2.4*e,size:[.6,.75],solid:!1,animates:!1},cristales:{material:`magia`,weight:1,radius:e=>1.2*e,size:[.8,1.1],solid:!0,animates:!0},runas:{material:`magia`,weight:1,radius:e=>1.4*e,size:[.85,1.1],solid:!1,animates:!0},empalizada:{material:`restos`,weight:1,radius:e=>1.6*e,size:[.7,.9],solid:!0,animates:!1},carreta:{material:`restos`,weight:1,radius:()=>1.2,size:[1,1],solid:!0,animates:!1},troncos:{material:`restos`,weight:1.2,radius:()=>1,size:[1,1],solid:!0,animates:!1},estandarte:{material:`restos`,weight:.8,radius:()=>.5,size:[1,1],solid:!0,animates:!0}},jp={roca:1,tierra:1,agua:1,fuego:1,magia:1,restos:1,sendero:1,arboles:1,rocas:1,hierba:1,flores:1,relieve:1,caminableMin:85,animadosMax:3},Mp=[{key:`roca`,label:M.dev.paramLabels.roca,min:0,max:4,step:1,group:`Materiales`},{key:`tierra`,label:M.dev.paramLabels.tierra,min:0,max:3,step:1,group:`Materiales`},{key:`agua`,label:M.dev.paramLabels.agua,min:0,max:2,step:1,group:`Materiales`},{key:`fuego`,label:M.dev.paramLabels.fuego,min:0,max:2,step:1,group:`Materiales`},{key:`magia`,label:M.dev.paramLabels.magia,min:0,max:2,step:1,group:`Materiales`},{key:`restos`,label:M.dev.paramLabels.restos,min:0,max:4,step:1,group:`Materiales`},{key:`sendero`,label:M.dev.paramLabels.sendero,min:0,max:1,step:1,group:`Materiales`},{key:`arboles`,label:M.dev.paramLabels.arboles,min:0,max:2,step:.1,group:`Densidad`,unit:`×`},{key:`rocas`,label:M.dev.paramLabels.rocas,min:0,max:2,step:.1,group:`Densidad`,unit:`×`},{key:`hierba`,label:M.dev.paramLabels.hierba,min:0,max:1.5,step:.1,group:`Densidad`,unit:`×`},{key:`flores`,label:M.dev.paramLabels.flores,min:0,max:2,step:.1,group:`Densidad`,unit:`×`},{key:`relieve`,label:M.dev.paramLabels.relieve,min:0,max:2,step:.1,group:`Densidad`,unit:`×`},{key:`caminableMin`,label:M.dev.paramLabels.caminableMin,min:60,max:95,step:1,group:`Límites`,unit:`%`},{key:`animadosMax`,label:M.dev.paramLabels.animadosMax,min:0,max:6,step:1,group:`Límites`}],Np=B.smoothstep}));function Fp(e){let t=Math.round((Tp.uMax-Tp.uMin)/zp),n=Math.round((Tp.vMax-Tp.vMin)/zp),r=new Uint8Array(t*n),i=[];for(let a=0;a<n;a++)for(let n=0;n<t;n++){let[o,s]=dp(Tp.uMin+(n+.5)*zp,Tp.vMin+(a+.5)*zp);i.push([o,s]),r[a*t+n]=+!!e.every(e=>(e.x-o)**2+(e.z-s)**2>(e.r+Rp)**2)}let a=-1,o=1/0;i.forEach(([e,t],n)=>{let i=e*e+t*t;r[n]&&i<o&&(o=i,a=n)});let s=new Uint8Array(t*n),c=0;if(a>=0){let e=[a];for(s[a]=1;e.length;){let i=e.pop();c++;let a=i%t,o=(i-a)/t,l=[a>0?i-1:-1,a<t-1?i+1:-1,o>0?i-t:-1,o<n-1?i+t:-1];for(let t of l)t>=0&&r[t]&&!s[t]&&(s[t]=1,e.push(t))}}let l=t*n,u=[],d=[],f=0;for(let e=0;e<l;e++)r[e]?s[e]||u.push(i[e]):(f++,d.push(i[e]));return{reachable:c/l*100,blocked:f/l*100,islands:u,blockedCells:d}}function Ip(e){e.traverse(e=>{let t=e;t.geometry?.dispose();let n=t.material;Array.isArray(n)?n.forEach(e=>e.dispose()):n?.dispose(),e.isInstancedMesh&&e.dispose()})}function Lp(e){let t=new ti,n=new W;e.traverse(e=>{let r=e;if(!r.isInstancedMesh)return;let i=0;for(let e=0;e<r.count;e++){r.getMatrixAt(e,t);let a=t.elements[12],o=t.elements[14];a*a+o*o>400||(i!==e&&(r.setMatrixAt(i,t),r.instanceColor&&r.setColorAt(i,r.getColorAt(e,n))),i++)}i!==r.count&&(r.count=i,r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),r.boundingSphere=null)})}var Rp,zp,Bp,Vp,Hp=t((()=>{Id(),Xd(),Af(),up(),ge(),Pp(),Rp=.12,zp=.25,Bp=4,Vp=class{scene;obstacles=[];params={...jp};noRunes=()=>!1;cover=1;required=()=>[];layout;stats;root=new ki;coverGroup=null;debug=null;showDebug=!1;updateFeatures=()=>{};listeners=[];constructor(e){this.scene=e,e.add(this.root)}generate(e){let t=performance.now();this.scene.remove(this.root),Ip(this.root),this.obstacles.length=0;let n=this.required(),r=yp(e,this.noRunes()?{...this.params,magia:0}:this.params,n),i=[],a;for(;;){Kd(r.seedNum,bp(r),this.params.relieve);let e=xp(r),t=ip(r,this.obstacles),o=Cf(r,this.params,e,this.obstacles),s=Fp(this.obstacles);if(a={features:t,solids:o,walk:s},s.reachable>=this.params.caminableMin||i.length>=Bp||!r.features.some(e=>e.solid))break;let c=-1;if(t.blockedArea.forEach((e,i)=>{r.features[i].solid&&!n.includes(r.features[i].kind)&&(c<0||e>t.blockedArea[c])&&(c=i)}),c<0)break;let[l]=r.features.splice(c,1);i.push(`${kp[l.kind]} (${M.dev.blockedPath})`),Ip(t.group),Ip(o),this.obstacles.length=0}r.skipped.push(...i);let o=xp(r);this.root=new ki;let s={...this.params,hierba:this.params.hierba*this.cover,flores:this.params.flores*this.cover};this.coverGroup=wf(r,s,o,this.obstacles),this.root.add(this.coverGroup,a.solids,a.features.group),Lp(this.root),this.scene.add(this.root),this.updateFeatures=a.features.update,this.layout=r;let c=0,l=0,u=0;this.root.traverse(e=>{let t=e;if(!t.geometry)return;let n=t.geometry,r=(n.index?n.index.count:n.attributes.position.count)/3,i=e.isInstancedMesh?e.count:1;i!==0&&(c++,l+=i,u+=e.isPoints?0:r*i)}),this.stats={seed:e,ms:performance.now()-t,walk:a.walk,obstacles:this.obstacles.length,drops:i,meshes:c,instances:l,triangles:Math.round(u),animated:r.features.filter(e=>e.animated).length},this.rebuildDebug();for(let e of this.listeners)e(this)}update(e){this.updateFeatures(e)}setCover(e){let t=e/this.cover;if(this.cover=e,t>=1||!this.coverGroup)return;let n=new ti,r=new W;this.coverGroup.traverse(e=>{let i=e;if(!i.isInstancedMesh||!i.userData.thinnable)return;let a=0;for(let e=0;e<i.count;e++)Math.floor((e+1)*t)!==Math.floor(e*t)&&(i.getMatrixAt(e,n),i.setMatrixAt(a,n),i.instanceColor&&i.setColorAt(a,i.getColorAt(e,r)),a++);i.count=a,i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)})}setDebug(e){this.showDebug=e,this.rebuildDebug()}rebuildDebug(){if(this.debug&&=(this.scene.remove(this.debug),Ip(this.debug),null),!this.showDebug||!this.stats)return;let e=new ki,t=(e,t)=>J(e,t)+.05,n=[];for(let e of this.obstacles)for(let r=0;r<12;r++){let i=r/12*Math.PI*2,a=(r+1)/12*Math.PI*2,o=e.x+Math.cos(i)*e.r,s=e.z+Math.sin(i)*e.r,c=e.x+Math.cos(a)*e.r,l=e.z+Math.sin(a)*e.r;n.push(o,t(o,s),s,c,t(c,l),l)}let r=[dp(Tp.uMin,Tp.vMin),dp(Tp.uMax,Tp.vMin),dp(Tp.uMax,Tp.vMax),dp(Tp.uMin,Tp.vMax)];r.forEach(([e,i],a)=>{let[o,s]=r[(a+1)%4];n.push(e,t(e,i),i,o,t(o,s),s)});let i=new Eo(new Aa().setAttribute(`position`,new va(n,3)),new ho({color:`#ff4d6d`,depthTest:!1,transparent:!0})),a=(e,n)=>new Mo(new Aa().setAttribute(`position`,new va(e.flatMap(([e,n])=>[e,t(e,n),n]),3)),new Do({color:n,size:4,sizeAttenuation:!1,depthTest:!1,transparent:!0,opacity:.7}));e.add(i,a(this.stats.walk.blockedCells,`#ff4d6d`),a(this.stats.walk.islands,`#ffb020`)),e.traverse(e=>e.renderOrder=10),this.debug=e,this.scene.add(e)}}}));function Up(){try{return JSON.parse(localStorage.getItem(Jp)??`{}`)}catch{return{}}}function Wp(e){try{localStorage.setItem(Jp,JSON.stringify({...Up(),...e}))}catch{}}function Gp(){try{let e=new URLSearchParams(location.search).get(`seed`);if(e)return e}catch{}return Up().seed??mp()}function Kp(){return Yp?be(Up().quality):null}function X(e,t={},n=``){let r=document.createElement(e);for(let[e,n]of Object.entries(t))r.setAttribute(e,n);return n&&(r.textContent=n),r}function qp(e,t,n){let r=Yp?Up():{};e.params={...jp,...r.params};let i=X(`button`,{id:`dev-gear`,type:`button`,"aria-label":M.dev.title,"aria-expanded":`false`});i.innerHTML=b();let a=X(`div`,{id:`dev-modal`,role:`dialog`,"aria-modal":`true`,"aria-label":M.dev.title});a.hidden=!0;let o=X(`aside`,{id:`dev-panel`}),s=X(`header`);s.append(X(`strong`,{},M.dev.title));let c=X(`button`,{type:`button`,class:`dev-close`,"aria-label":M.dev.close},`×`);s.append(c);let l=X(`section`);l.append(X(`h3`,{},M.dev.meadow));let u=X(`button`,{type:`button`,class:`dev-primary`},M.dev.regenerate),d=X(`div`,{class:`dev-row`}),f=X(`input`,{type:`text`,spellcheck:`false`,autocomplete:`off`,"aria-label":M.dev.seed}),p=X(`button`,{type:`button`},M.dev.useSeed);d.append(X(`label`,{},M.dev.seed),f,p);let m=X(`dl`,{class:`dev-stats`}),h=X(`div`,{class:`dev-contents`});l.append(u,d,m,h);let g=X(`section`);g.append(X(`h3`,{},M.dev.params));let _=new Map,v=``;for(let t of Mp){t.group!==v&&(v=t.group,g.append(X(`h4`,{},M.dev.groups[t.group])));let n=X(`label`,{class:`dev-slider`}),r=X(`input`,{type:`range`,min:String(t.min),max:String(t.max),step:String(t.step)}),i=X(`output`);n.append(X(`span`,{},t.label),r,i),g.append(n);let a=()=>{let e=Number(r.value);i.textContent=t.key===`sendero`?e?M.dev.yes:M.dev.no:t.unit===`×`?`${e.toFixed(1)}×`:`${e}${t.unit??``}`};r.addEventListener(`input`,a),r.addEventListener(`change`,()=>{e.params[t.key]=Number(r.value),Wp({params:e.params}),ce(e.layout.seed)}),_.set(t.key,{input:r,show:a})}let y=X(`button`,{type:`button`},M.dev.reset);g.append(y);let x=X(`section`);x.append(X(`h3`,{},M.dev.view));let S=document.getElementById(`tilt`),C=document.getElementById(`fps`),w=X(`label`,{class:`dev-check`}),T=X(`input`,{type:`checkbox`});w.append(T,X(`span`,{},M.dev.showFps));let E=X(`label`,{class:`dev-check`}),D=X(`input`,{type:`checkbox`});E.append(D,X(`span`,{},M.dev.showDebug));let O=X(`div`,{class:`dev-row`});Yp&&S&&O.append(S);let k=X(`dl`,{class:`dev-stats`}),A=X(`div`,{class:`dev-row`});A.append(X(`label`,{},M.dev.look));for(let[e,t]of[[`bruma`,`Bruma`],[`glade`,`Glade`]]){let n=X(`button`,{type:`button`,class:`dev-toggle`,"aria-pressed":String(nf===e)},t);n.addEventListener(`click`,()=>nf!==e&&Qd(e)),A.append(n)}let ee=X(`div`,{class:`dev-row`});ee.append(X(`label`,{},M.dev.language));for(let e of[`es`,`en`])ee.append(de(e,`dev-toggle`));let te=X(`div`,{class:`dev-row`});te.append(X(`label`,{},M.dev.quality));let j=new Map;for(let e of[`auto`,...xe]){let t=X(`button`,{type:`button`,class:`dev-toggle`},e===`auto`?M.dev.qualityAuto:M.dev.tiers[e]);t.addEventListener(`click`,()=>{let t=e===`auto`?null:e;Wp({quality:t??void 0}),n.set(t)}),j.set(e,t),te.append(t)}let ne=X(`p`,{class:`dev-note`}),re=()=>{let e=n.state;for(let[t,n]of j)n.setAttribute(`aria-pressed`,String(e.auto?t===`auto`:t===e.tier));ne.textContent=`${M.dev.qualityNow(M.dev.tiers[e.tier],M.dev.qualityReasons[e.reason])} · GPU: ${e.renderer||`?`}`};re(),x.append(A,ee,te,ne,O,w,E,k),o.append(s,l,g,x),a.append(o),Yp&&document.body.append(i,a),document.documentElement.classList.toggle(`dev`,Yp);let ie=e=>e.stopPropagation();for(let e of[i,a])e.addEventListener(`pointerdown`,ie),e.addEventListener(`pointerup`,ie),e.addEventListener(`pointermove`,ie);function ae(){for(let[t,{input:n,show:r}]of _)n.value=String(e.params[t]),r()}function oe(e,t){e.replaceChildren(...t.flatMap(([e,t,n])=>{let r=X(`dd`,n?{class:n}:{},t);return[X(`dt`,{},e),r]}))}function se(){let t=e.stats;f.value=t.seed;let n=t.walk.reachable>=e.params.caminableMin;oe(m,[[M.dev.walkable,`${t.walk.reachable.toFixed(0)} %`,n?`dev-ok`:`dev-warn`],[M.dev.blocked,`${t.walk.blocked.toFixed(0)} %`],[M.dev.obstacles,String(t.obstacles)],[M.dev.generatedIn,`${t.ms.toFixed(0)} ms`]]);let r=new Map;for(let t of e.layout.features){let e=r.get(t.material)??[];e.push(kp[t.kind]+(t.animated?` ✦`:``)),r.set(t.material,e)}let i=X(`ul`);for(let e of Object.keys(Op)){let t=r.get(e);if(!t)continue;let n=X(`li`);n.append(X(`b`,{class:`dev-mat dev-${e}`},Op[e]),document.createTextNode(t.join(`, `))),i.append(n)}if(e.layout.trail){let e=X(`li`);e.append(X(`b`,{class:`dev-mat dev-tierra`},Op.tierra),document.createTextNode(M.dev.trail)),i.append(e)}h.replaceChildren(i),e.layout.skipped.length&&h.append(X(`p`,{class:`dev-note`},`${M.dev.skipped}: ${e.layout.skipped.join(`, `)}`)),h.append(X(`p`,{class:`dev-note`},M.dev.animatedNote)),oe(k,[[M.dev.meshes,String(t.meshes)],[M.dev.instances,he(t.instances)],[M.dev.triangles,he(t.triangles)],[M.dev.animated,`${t.animated} / ${e.params.animadosMax}`]])}e.listeners.push(se);function ce(n){e.generate(n),Wp({seed:n});try{let e=new URL(location.href);e.searchParams.set(`seed`,n),history.replaceState(null,``,e)}catch{}t()}let le=!1;function ue(e){e!==le&&(le=e,a.hidden=!le,i.setAttribute(`aria-expanded`,String(le)),i.classList.toggle(`open`,le),le?(o.scrollTop=0,c.focus({preventScroll:!0})):document.activeElement?.blur())}i.addEventListener(`click`,()=>ue(!le)),c.addEventListener(`click`,()=>ue(!1)),a.addEventListener(`click`,e=>{e.target===a&&ue(!1)}),addEventListener(`keydown`,e=>{le&&e.key===`Escape`&&ue(!1)}),u.addEventListener(`click`,()=>ce(mp())),p.addEventListener(`click`,()=>{f.value.trim()&&ce(f.value.trim())}),f.addEventListener(`keydown`,e=>{e.stopPropagation(),e.key===`Enter`&&f.value.trim()&&ce(f.value.trim())}),y.addEventListener(`click`,()=>{e.params={...jp},Wp({params:e.params}),ae(),ce(e.layout.seed)});let fe=e=>{C&&(C.hidden=!e)};return T.addEventListener(`change`,()=>{fe(T.checked),Wp({fps:T.checked})}),D.addEventListener(`change`,()=>{e.setDebug(D.checked),Wp({debug:D.checked})}),ae(),T.checked=!!r.fps,fe(T.checked),C&&document.body.append(C),D.checked=!!r.debug,e.setDebug(D.checked),ce(Gp()),{newMeadow:()=>ce(mp()),qualityChanged:re,get open(){return le}}}var Jp,Yp,Xp=t((()=>{O(),Pp(),cf(),ge(),I(),Jp=`cirquimia.dev`,Yp=(()=>{try{let e=new URLSearchParams(location.search).get(`dev`);return e!==null&&e!==`false`&&e!==`0`}catch{return!1}})()}));function Zp(e,t,n,r,i,a){let o=n-e,s=r-t,c=o*o+s*s;for(let n of i){let r=c>0?Math.max(0,Math.min(1,((n.x-e)*o+(n.z-t)*s)/c)):0,i=e+o*r-n.x,l=t+s*r-n.z,u=n.r+a;if(i*i+l*l<u*u)return!1}return!0}function Qp(e,t,n,r,i,a){if(Zp(e,t,n,r,i,a))return[{x:n,z:r}];for(let o of nm){let s=$p(e,t,n,r,i,a,o);if(s)return s}return null}function $p(e,t,n,r,i,a,o){let s=Math.min(e,n)-o,c=Math.min(t,r)-o,l=Math.ceil((Math.max(e,n)+o-s)/tm)+1,u=Math.ceil((Math.max(t,r)+o-c)/tm)+1;if(l*u>rm){let i=Math.sqrt(rm/(l*u)),a=(e+n)/2,o=(t+r)/2;l=Math.floor(l*i),u=Math.floor(u*i),s=a-l*tm/2,c=o-u*tm/2}let d=new Uint8Array(l*u);for(let e of i){let t=e.r+a,n=Math.max(0,Math.floor((e.x-t-s)/tm)),r=Math.min(l-1,Math.ceil((e.x+t-s)/tm)),i=Math.max(0,Math.floor((e.z-t-c)/tm)),o=Math.min(u-1,Math.ceil((e.z+t-c)/tm));for(let a=i;a<=o;a++)for(let i=n;i<=r;i++){let n=s+i*tm-e.x,r=c+a*tm-e.z;n*n+r*r<t*t&&(d[a*l+i]=1)}}let f=(e,t)=>{let n=Math.max(0,Math.min(l-1,Math.round((e-s)/tm)));return Math.max(0,Math.min(u-1,Math.round((t-c)/tm)))*l+n},p=f(e,t),m=f(n,r);if(d[p]=0,d[m]){let e=em(m,d,l,u,6);if(e<0)return null;m=e;let t=m%l;n=s+t*tm,r=c+(m-t)/l*tm}if(m===p)return[{x:n,z:r}];let h=m%l,g=(m-h)/l,_=e=>{let t=e%l,n=Math.abs(t-h),r=Math.abs((e-t)/l-g);return Math.max(n,r)+.4142*Math.min(n,r)},v=new Float32Array(l*u).fill(1/0),y=new Int32Array(l*u).fill(-1),b=new Uint8Array(l*u),x=new im;v[p]=0,x.push(p,_(p));let S=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]];for(;x.size;){let e=x.pop();if(e===m)break;if(b[e])continue;b[e]=1;let t=e%l,n=(e-t)/l;for(let[r,i,a]of S){let o=t+r,s=n+i;if(o<0||s<0||o>=l||s>=u)continue;let c=s*l+o;if(d[c]||b[c]||r&&i&&(d[n*l+o]||d[s*l+t]))continue;let f=v[e]+a;f<v[c]&&(v[c]=f,y[c]=e,x.push(c,f+_(c)))}}if(y[m]<0)return null;let C=[];for(let e=m;e!==p&&e>=0;e=y[e]){let t=e%l;C.push({x:s+t*tm,z:c+(e-t)/l*tm})}C.reverse(),C[C.length-1]={x:n,z:r};let w=[],T=e,E=t,D=0;for(;D<C.length;){let e=D;for(let t=C.length-1;t>D;t--)if(Zp(T,E,C[t].x,C[t].z,i,a*.95)){e=t;break}w.push(C[e]),T=C[e].x,E=C[e].z,D=e+1}return w}function em(e,t,n,r,i){let a=e%n,o=(e-a)/n;for(let e=1;e<=i;e++)for(let i=-e;i<=e;i++)for(let s=-e;s<=e;s++){if(Math.max(Math.abs(s),Math.abs(i))!==e)continue;let c=a+s,l=o+i;if(c>=0&&l>=0&&c<n&&l<r&&!t[l*n+c])return l*n+c}return-1}var tm,nm,rm,im,am=t((()=>{tm=.1,nm=[2,5],rm=4e4,im=class{items=[];keys=[];get size(){return this.items.length}push(e,t){let n=this.items,r=this.keys,i=n.length;for(n.push(e),r.push(t);i>0;){let e=i-1>>1;if(r[e]<=t)break;n[i]=n[e],r[i]=r[e],i=e}n[i]=e,r[i]=t}pop(){let e=this.items,t=this.keys,n=e[0],r=e.pop(),i=t.pop(),a=e.length;if(a>0){let n=0;for(;;){let r=2*n+1;if(r>=a)break;let o=r+1,s=o<a&&t[o]<t[r]?o:r;if(t[s]>=i)break;e[n]=e[s],t[n]=t[s],n=s}e[n]=r,t[n]=i}return n}}}));function om(e,t=`#000000`,n=0){let r=e+t+n,i=Lm.get(r);return i||Lm.set(r,i=new _s({color:e,emissive:t,flatShading:!0,side:n})),i}function sm(e,t,n,r){let i=new G(e,om(t,n,r));return i.castShadow=!0,i}function cm(e,t,n,r){return sm(new zo(t,n,e,6).translate(0,-e/2,0),r)}function lm(e){let t=new ki;t.position.set(e*.09,Cm,0),t.add(cm(xm,.075,.06,Am));let n=new ki;n.position.y=-.46,n.add(cm(Sm,.066,.05,jm));let r=sm(new Lo(.1,.07,.21),jm);return r.position.set(0,-.46,.045),n.add(r),t.add(n),{upper:t,lower:n}}function um(e,t,n){let r=new ki;r.position.set(e*.21,Em,0),r.rotation.z=e*.08,r.add(cm(wm,.055,.045,t));let i=new ki;i.position.y=-.3,i.add(cm(Tm,.044,.04,t));let a=sm(new zo(.047,.047,.05,6),n);a.position.y=-.27+.03,i.add(a);let o=sm(new os(.045,0),Mm);return o.scale.set(.9,1.15,.8),o.position.y=-.27-.035,i.add(o),r.add(i),{upper:r,lower:i}}var dm,fm,pm,mm,hm,gm,_m,vm,ym,bm,xm,Sm,Cm,wm,Tm,Em,Dm,Om,km,Am,jm,Mm,Nm,Pm,Fm,Im,Lm,Rm,zm,Bm,Vm,Hm,Um=t((()=>{Id(),Xd(),am(),dm=.3,fm=1.6,pm=1.75*dm,mm=.03,hm=12,gm=.12,_m=.06,vm=.3,ym=.3,bm=.3,xm=.46,Sm=.44,Cm=.95,wm=.3,Tm=.27,Em=1.46,Dm=`#3a4c63`,Om=`#2c3a4d`,km=`#b9a064`,Am=`#2b313b`,jm=`#202227`,Mm=`#eceee8`,Nm=`#ecc6a6`,Pm=`#4a3a30`,Fm=`#2e2925`,Im=`#c8cfd4`,Lm=new Map,Rm=new Ha({color:`#fff4e8`}),zm=.12,Bm=.4,Vm=.55,Hm=class{obstacles;root=new ki;target=new H;model=new ki;torso=new ki;coatTail;legL=lm(-1);legR=lm(1);armL;armR;speed;flashTimer=0;castTimer=0;heading=0;path=[];steering=!1;stuckTimer=0;stuckCount=0;stuckFrom=new H;walkPhase=0;walkBlend=0;time=0;fallen=0;down=!1;rootedFor=0;seen=new WeakSet;passing=new Set;blocking=[];constructor(e,t={}){this.obstacles=e;let n=t.coat??Dm,r=t.coatDark??Om;this.speed=t.speed??fm,this.armL=um(-1,n,r),this.armR=um(1,n,r);let i=sm(new zo(.2,.155,.52,7),n);i.position.y=1.26,this.coatTail=sm(new zo(.16,.25,.52,8,1,!0,.42,Math.PI*2-.84).translate(0,-.52/2,0),n,void 0,2),this.coatTail.position.y=1.03;let a=sm(new zo(.162,.162,.05,7),Fm);a.position.y=1.02;let o=sm(new Lo(.05,.04,.02),km);o.position.set(0,1.02,.16);let s=sm(new us(.035,.006,3,8,Math.PI),Im);s.rotation.set(.25,0,Math.PI),s.position.set(.1,.99,.13);let c=[];for(let e of[1.12,1.24,1.36]){let t=.155+(e-1)/.52*.045;for(let n of[-.055,.055]){let r=sm(new ss(.014,0),km);r.position.set(n,e,t-.012),c.push(r)}}let l=sm(new Lo(.11,.025,.1),km);l.position.set(-.17,1.525,0),l.rotation.z=.12;let u=l.clone();u.position.x=.17,u.rotation.z=-.12;let d=sm(new zo(.075,.085,.07,7),r);d.position.y=1.55;let f=sm(new os(.115,1),Nm);f.scale.set(.92,1.05,.98),f.position.y=1.68;let p=sm(new os(.122,1),Pm);p.scale.set(.95,.75,1.02),p.position.set(0,1.73,-.02),this.torso.add(i,this.coatTail,a,o,s,...c,l,u,d,f,p,this.armL.upper,this.armR.upper),this.model.add(this.torso,this.legL.upper,this.legR.upper),this.model.scale.setScalar(dm),this.root.add(this.model),this.root.position.set(0,J(0,0),0),this.target.copy(this.root.position),this.model.traverse(e=>{e instanceof G&&(e.userData.material=e.material)})}get moving(){return this.path.length>1||Math.hypot(this.target.x-this.root.position.x,this.target.z-this.root.position.z)>mm}flash(){this.flashTimer=zm,this.model.traverse(e=>{e instanceof G&&(e.material=Rm)})}dispose(){this.model.traverse(e=>{e instanceof G&&e.geometry.dispose()})}get isDown(){return this.down}fall(){this.down||(this.down=!0,this.castTimer=0,this.stop())}rise(){this.down=!1,this.fallen=0,this.stop()}cast(){this.castTimer=Bm}entangle(e){this.down||(this.rootedFor=Math.max(this.rootedFor,e),this.stop())}get rooted(){return this.rootedFor>0&&!this.down}setTarget(e){if(!(this.down||this.rooted)){this.target.set(e.x,0,e.z);for(let e of this.obstacles){let t=this.target.x-e.x,n=this.target.z-e.z,r=e.r+gm+.05,i=Math.hypot(t,n);i<r&&(i<1e-4?this.target.x=e.x+r:(this.target.x=e.x+t/i*r,this.target.z=e.z+n/i*r))}this.plan()}}steer(e,t){if(this.down||this.rooted)return;let n=this.root.position;this.target.set(n.x+e*vm,0,n.z+t*vm),this.path=[{x:this.target.x,z:this.target.z}],this.steering=!0,this.stuckCount=0,this.stuckTimer=0,this.stuckFrom.copy(n)}ahead(e,t=new H){let n=this.root.position;if(t.set(n.x,0,n.z),this.down||this.rooted)return t;let r=this.speed*e,i=0,a=0;for(let e of this.path){let n=e.x-t.x,o=e.z-t.z,s=Math.hypot(n,o);if(s<1e-6)continue;i=n/s,a=o/s;let c=Math.min(s,r);if(t.x+=i*c,t.z+=a*c,(r-=c)<=0)return t}return this.steering&&(t.x+=i*r,t.z+=a*r),t}halt(){this.down||this.stop()}stop(){this.target.set(this.root.position.x,0,this.root.position.z),this.path=[],this.steering=!1,this.stuckCount=0}replan(){let e=this.stuckCount;this.plan(),this.stuckCount=e}plan(){this.steering=!1,this.stuckCount=0;let e=this.root.position,t=Qp(e.x,e.z,this.target.x,this.target.z,this.solidNow(),.13999999999999999);if(t?.length){this.path=t;let e=t[t.length-1];this.target.x=e.x,this.target.z=e.z}else this.path=[{x:this.target.x,z:this.target.z}];this.stuckTimer=0,this.stuckFrom.copy(e)}face(e){if(this.down)return;let t=e.x-this.root.position.x,n=e.z-this.root.position.z;t*t+n*n>1e-6&&(this.heading=Math.atan2(t,n))}update(e){this.time+=e,this.noticeRising(),this.rootedFor=Math.max(0,this.rootedFor-e);let t=this.root.position;for(;this.path.length>1&&Math.hypot(this.path[0].x-t.x,this.path[0].z-t.z)<_m;)this.path.shift();let n=this.path[0]??this.target,r=n.x-t.x,i=n.z-t.z,a=Math.hypot(r,i),o=a>mm||this.path.length>1;if(o&&a>1e-6){let n=Math.min(a,this.speed*e);t.x+=r/a*n,t.z+=i/a*n,this.resolveCollisions(),this.stuckTimer+=e,this.stuckTimer>=ym&&(Math.hypot(t.x-this.stuckFrom.x,t.z-this.stuckFrom.z)<this.speed*ym*bm?++this.stuckCount>2?this.stop():this.replan():this.stuckCount=0,this.stuckTimer=0,this.stuckFrom.copy(t));let o=Math.atan2(r,i)-this.heading;o=Math.atan2(Math.sin(o),Math.cos(o)),this.heading+=o*Math.min(1,hm*e)}t.y=J(t.x,t.z),this.root.rotation.y=this.heading,this.walkBlend+=(+!!o-this.walkBlend)*Math.min(1,e*10),this.walkPhase+=this.speed/pm*Math.PI*2*e*this.walkBlend,this.flashTimer>0&&(this.flashTimer-=e)<=0&&this.model.traverse(e=>{e instanceof G&&(e.material=e.userData.material)}),this.castTimer=Math.max(0,this.castTimer-e),this.down&&(this.fallen=Math.min(1,this.fallen+e/Vm)),this.animate()}animate(){let e=Math.sin(this.walkPhase),t=Math.cos(this.walkPhase),n=this.walkBlend,r=1-n;if(this.legL.upper.rotation.x=e*.5*n,this.legR.upper.rotation.x=-e*.5*n,this.legL.lower.rotation.x=Math.max(0,-t)*.9*n,this.legR.lower.rotation.x=Math.max(0,t)*.9*n,this.armL.upper.rotation.x=-e*.4*n,this.armR.upper.rotation.x=e*.4*n,this.armL.lower.rotation.x=-.12-Math.max(0,-e)*.3*n,this.armR.lower.rotation.x=-.12-Math.max(0,e)*.3*n,this.castTimer>0){let e=Math.sin(Math.PI*Math.min(1,(1-this.castTimer/Bm)*1.6)**.6);this.armR.upper.rotation.x=B.lerp(this.armR.upper.rotation.x,-1.5,e),this.armR.lower.rotation.x=B.lerp(this.armR.lower.rotation.x,-.2,e)}this.coatTail.rotation.x=Math.abs(e)*.12*n,this.coatTail.scale.x=1+Math.abs(e)*.08*n;let i=Math.abs(Math.cos(this.walkPhase))*.035*n;this.model.position.y=i*dm,this.torso.rotation.x=.06*n,this.torso.rotation.y=e*.08*n,this.torso.scale.y=1+Math.sin(this.time*2.2)*.006*r;let a=this.fallen;if(a<=0){this.model.rotation.x=0,this.armL.upper.rotation.z=-.08,this.armR.upper.rotation.z=.08,this.legL.upper.rotation.z=this.legR.upper.rotation.z=0;return}let o=a<.8?(a/.8)**2:1-Math.sin((a-.8)/.2*Math.PI)*.06;this.model.rotation.x=-Math.PI/2*o,this.model.position.y=.05*o;let s=Math.min(1,a*1.4);this.armL.upper.rotation.z=B.lerp(-.08,-.9,s),this.armR.upper.rotation.z=B.lerp(.08,.9,s),this.armL.lower.rotation.x=this.armR.lower.rotation.x=-.35*s,this.legL.upper.rotation.z=-.18*s,this.legR.upper.rotation.z=.12*s,this.legR.lower.rotation.x=.5*s,this.torso.scale.y=1}noticeRising(){let e=this.root.position;for(let t of this.obstacles)t.rises&&!this.seen.has(t)&&(this.seen.add(t),(e.x-t.x)**2+(e.z-t.z)**2<(t.r+.12)**2&&this.passing.add(t));for(let t of this.passing)(!this.obstacles.includes(t)||(e.x-t.x)**2+(e.z-t.z)**2>=(t.r+.12)**2)&&this.passing.delete(t)}solidNow(){if(!this.passing.size)return this.obstacles;this.blocking.length=0;for(let e of this.obstacles)this.passing.has(e)||this.blocking.push(e);return this.blocking}resolveCollisions(){let e=this.root.position;for(let t of this.solidNow()){let n=e.x-t.x,r=e.z-t.z,i=t.r+gm,a=n*n+r*r;if(a<i*i&&a>1e-8){let o=Math.sqrt(a);e.x=t.x+n/o*i,e.z=t.z+r/o*i}}}}}));function Wm(e,t,n,r=[]){let i=[0];for(let t=1;t<e.length;t++)i.push(i[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]));let a=i[i.length-1],o=n()*10,s=i.map(e=>{let n=r.reduce((t,n)=>Math.max(t,1-Math.abs(e-n)/4),0),i=1+.12*Math.sin(e*.35+o)+.07*Math.sin(e*.9+o*2),s=Math.min(1,.3+.7*e/3),c=.1+.9*Math.sqrt(Math.max(0,Math.min(1,(a-e)/9)));return t*(1+.35*n)*i*s*c}),c=Gm(e,s,0,.5),l=i.findIndex(e=>e>a*nh),u=[];for(let[t,r]of[[.16,.13],[-.2,.1]]){let i=e.slice(l),a=n()*6,o=s.slice(l).map((e,t)=>e*r*Math.min(1,t/10)*Math.max(0,Math.sin(t*.22+a)+.35)*(1+t/i.length));u.push(Gm(i,o,t,.5,s.slice(l)))}return{ink:c,dry:u.join(``)}}function Gm(e,t,n,r,i=t){let a=e.length,o=[],s=[];for(let c=0;c<a;c++){let l=e[Math.max(0,c-1)],u=e[Math.min(a-1,c+1)],d=l[1]-u[1],f=u[0]-l[0],p=Math.hypot(d,f)||1;d/=p,f/=p;let m=n*i[c],h=t[c]*r;o.push([e[c][0]+d*(m+h),e[c][1]+f*(m+h)]),s.push([e[c][0]+d*(m-h),e[c][1]+f*(m-h)])}let c=o.concat(s.reverse()),l=e=>e.toFixed(2),u=`M${l(c[0][0])} ${l(c[0][1])}`;for(let e=1;e<c.length-1;e++){let[t,n]=c[e],[r,i]=c[e+1];u+=`Q${l(t)} ${l(n)} ${l((t+r)/2)} ${l((n+i)/2)}`}return u+`Z`}function Km(e,t){let n=[],r=[],i=(e,t)=>.45*Math.sin(e*.21+t)+.25*Math.sin(e*.53+t*3),a=t()*6;if(e===`circle`){let e=-2.2+t()*.6,o=13.5,s=Math.PI*2*1.078,c=Math.ceil(o*s/eh);for(let t=0;t<=c;t++){let r=e+s*t/c,l=o+i(t*eh,a)-t/c*.8;n.push([24+Math.cos(r)*l,24+Math.sin(r)*l])}return{line:n,corners:r}}if(e===`spiral`){let e=2.3,o=t()*Math.PI*2;for(let t=0,r=0;r<e*Math.PI*2;t+=eh){let s=1.2+14.5*r/(e*Math.PI*2);n.push([24+Math.cos(o+r)*(s+i(t,a)*.6),24+Math.sin(o+r)*(s+i(t,a)*.6)]),r+=eh/Math.max(s,2.5)}return{line:n,corners:r}}let o=Zm[e],s=o.length,c=Qm.has(e)?0:Math.floor(t()*s),l=Array.from({length:s+1},(e,t)=>o[(c+t)%s]),u=0;for(let e=0;e<s;e++){let[t,o]=l[e],[s,c]=l[e+1],d=Math.hypot(s-t,c-o),f=(o-c)/d,p=(s-t)/d;r.push(u);let m=Math.ceil(d/eh);for(let r=e===0?0:1;r<=m;r++){let e=r/m,l=Math.sin(e*Math.PI)*i(u+e*d,a);n.push([t+(s-t)*e+f*l,o+(c-o)*e+p*l])}u+=d}r.push(u);let[d,f]=l[0],[p,m]=l[1],h=Math.hypot(p-d,m-f),g=Math.min(h*.5,u*th);for(let e=eh;e<=g;e+=eh)n.push([d+(p-d)*e/h,f+(m-f)*e/h]);return{line:qm(n),corners:r}}function qm(e){return e.map((t,n)=>{let r=e[Math.max(0,n-2)],i=e[Math.min(e.length-1,n+2)];return[(r[0]+t[0]*2+i[0])/4,(r[1]+t[1]*2+i[1])/4]})}function Jm(e){let t=[],n=e()*Math.PI*2,r=Math.PI*2*.86;for(let e=0,i=Math.ceil($m*r/eh);e<=i;e++){let a=n+r*e/i;t.push([24+Math.cos(a)*$m,24+Math.sin(a)*$m])}return t}function Ym(e,t=!1){let n=Math.random()*2**31|0,r=()=>((n=n*16807%2147483647)&65535)/65535,i=`brush${++rh}`,{line:a,corners:o}=Km(e,r),s=Wm(a,(e===`spiral`?2.8:Qm.has(e)?3.2:3.9)*(t?.5:1),r,o);if(t)return`<svg viewBox="0 0 48 48" aria-hidden="true"><path class="glyph" d="${s.ink}"/></svg>`;let c=Wm(Jm(r),2.2,r);return`<svg viewBox="0 0 48 48" aria-hidden="true"><mask id="${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/><path d="${s.dry}${c.dry}" fill="#000"/></mask><g mask="url(#${i})"><path class="ring" d="${c.ink}"/><path class="glyph" d="${s.ink}"/></g></svg>`}var Xm,Zm,Qm,$m,eh,th,nh,rh,ih=t((()=>{Xm=[[24,9],[32.8,36.1],[9.7,19.4],[38.3,19.4],[15.2,36.1]],Zm={triangle:[[24,9],[38,35],[10,35]],triangleDown:[[24,39],[38,13],[10,13]],square:[[12,12],[36,12],[36,36],[12,36]],rhombus:[[24,7],[38,24],[24,41],[10,24]],pentagram:Xm,fireStar:Xm,waterStar:Xm,hourglass:[[11,9],[37,9],[11,39],[37,39]]},Qm=new Set([`pentagram`,`hourglass`,`fireStar`,`waterStar`]),$m=22.2,eh=.7,th=.06,nh=.72,rh=0}));function ah(e,t){let n=Math.ceil(Math.hypot(t[0]-e[0],t[1]-e[1])/.7);return Array.from({length:n+1},(r,i)=>[e[0]+(t[0]-e[0])*i/n,e[1]+(t[1]-e[1])*i/n])}function oh(){let e=7,t=()=>((e=e*16807%2147483647)&65535)/65535,n=Wm(ah([24,4],[24,40]),4.6,t),r=Wm([...ah([12,27],[24,41]),...ah([24,41],[36,27]).slice(1)],4.6,t,[18]);return`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="${n.ink}${r.ink}"/></svg>`}var sh,ch,lh,uh,dh,fh,ph,mh,hh,gh,_h,vh,yh,bh,xh,Sh,Ch,wh,Th,Eh=t((()=>{Id(),ih(),sh=.34,ch=`#8a6a44`,lh=`#6e5234`,uh=`#c9ad78`,dh=`#d8c06c`,fh=`#8a4f43`,ph=`#5e4a30`,mh=`#ece4cf`,hh=`#b8432f`,gh=new Ha({color:`#fff4e8`}),_h=.12,vh=.6,yh=.8,bh=.45,xh=.32,Sh=4,Ch=14,wh=class{root=new ki;pivot=new ki;model=new ki;materials=new Map;flashTimer=0;swayTime=1/0;swayDir=1;down=!1;fallen=0;rising=0;fade=-1;constructor(){let e=(e,t)=>{let n=this.materials.get(t);n||this.materials.set(t,n=new _s({color:t,flatShading:!0,transparent:!0}));let r=new G(e,n);return r.castShadow=!0,r},t=e(new zo(.045,.06,1.75,6),ch);t.position.y=.78;let n=e(new Lo(1,.065,.065),lh);n.position.y=1.36;let r=e(new zo(.17,.22,.52,7),fh);r.position.y=1.14;let i=e(new zo(.075,.085,.74,6).rotateZ(Math.PI/2),fh);i.position.y=1.36;let a=[];for(let t of[-1,1])for(let[n,r]of[[.03,0],[-.03,.03],[-.02,-.035]]){let i=e(new Bo(.03,.16,4).rotateZ(-t*Math.PI/2),dh);i.position.set(t*.43,1.36+n,r),a.push(i)}for(let t=0;t<6;t++){let n=t/6*Math.PI*2+.3,r=e(new Bo(.03,.14,4).rotateX(Math.PI),dh);r.position.set(Math.sin(n)*.17,.83,Math.cos(n)*.17),a.push(r)}let o=e(new zo(.11,.11,.02,10).rotateX(Math.PI/2),mh);o.position.set(0,1.16,.196);let s=e(new zo(.055,.055,.025,10).rotateX(Math.PI/2),hh);s.position.set(0,1.16,.2);let c=e(new zo(.05,.06,.06,6),ph);c.position.y=1.47;let l=e(new os(.16,0),uh);l.scale.set(1,1.1,.95),l.position.y=1.62;let u=[-.055,.055].map(t=>{let n=e(new Lo(.035,.035,.02),ph);return n.position.set(t,1.65,.145),n}),d=e(new zo(.28,.28,.02,10),dh);d.position.y=1.75,d.rotation.z=.08;let f=e(new Bo(.15,.2,7),dh);f.position.y=1.85,f.rotation.z=.08,this.model.add(t,n,r,i,...a,o,s,c,l,...u,d,f),this.model.scale.setScalar(sh),this.model.traverse(e=>{e instanceof G&&(e.userData.material=e.material)}),this.pivot.add(this.model),this.root.add(this.pivot),this.pivot.scale.setScalar(.001)}face(e){this.root.rotation.y=Math.atan2(e.x-this.root.position.x,e.z-this.root.position.z)}get isDown(){return this.down}get gone(){return this.fade>=yh}flash(e){if(this.flashTimer=_h,this.swayTime=0,e){let t=(e.x-this.root.position.x)*Math.sin(this.root.rotation.y)+(e.z-this.root.position.z)*Math.cos(this.root.rotation.y);this.swayDir=t>0?1:-1}this.model.traverse(e=>{e instanceof G&&(e.material=gh)})}fall(){this.down=!0}rise(){this.down=!1,this.fallen=0}vanish(){this.fade<0&&(this.fade=0)}update(e){this.flashTimer>0&&(this.flashTimer-=e)<=0&&this.model.traverse(e=>{e instanceof G&&(e.material=e.userData.material)}),this.rising=Math.min(1,this.rising+e/bh);let t=this.rising;this.pivot.scale.setScalar(Math.max(.001,1+Math.sin(t*Math.PI)*.12*(1-t)-(1-t)**3)),this.swayTime+=e;let n=Number.isFinite(this.swayTime)?xh*Math.exp(-this.swayTime*Sh)*Math.sin(this.swayTime*Ch)*this.swayDir:0;this.down&&(this.fallen=Math.min(1,this.fallen+e/vh));let r=this.fallen;if(this.pivot.rotation.x=this.down?0:n,this.pivot.rotation.z=r*r*1.45*this.swayDir,this.fade>=0){this.fade+=e;let t=Math.min(1,this.fade/yh);for(let e of this.materials.values())e.opacity=1-t;this.pivot.position.y=-t*.12}}dispose(){this.model.traverse(e=>{e instanceof G&&e.geometry.dispose()});for(let e of this.materials.values())e.dispose()}},Th=class{el=document.createElement(`div`);constructor(e){this.el.className=`hitme`,this.el.innerHTML=`<span>${e}</span>${oh()}`,this.el.hidden=!0,document.body.append(this.el)}dim(){this.el.classList.remove(`dim`),this.el.offsetWidth,this.el.classList.add(`dim`)}place(e,t,n){this.el.hidden=!n,n&&(this.el.style.transform=`translate(${e.toFixed(1)}px, ${t.toFixed(1)}px)`)}dispose(){this.el.remove()}}}));function Dh(){return Oh()===`1`}function Oh(){try{return typeof localStorage>`u`?null:localStorage.getItem(tg)}catch{return null}}function kh(){if(!Z){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;Z=new e,ig=Z.createGain(),ig.gain.value=+!!mg;let t=Z.createDynamicsCompressor();t.threshold.value=-10,t.knee.value=8,t.ratio.value=6,t.attack.value=.003,t.release.value=.2,ig.connect(t).connect(Z.destination),ag=Z.createGain(),ag.gain.value=ng,ag.connect(ig),og=Z.createGain(),og.gain.value=rg,og.connect(ig),sg=Z.createBuffer(1,Z.sampleRate,Z.sampleRate);let n=sg.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1;cg=Fh(Z),lg=[0,1,2].map(()=>Lh(Z)),ug=[0,1,2].map(()=>Rh(Z)),dg=[0,1,2].map(()=>zh(Z)),fg=[0,1,2].map(()=>Bh(Z)),eg()}Ah()}function Ah(){if(!Z||!mg||document.hidden||Z.state===`running`)return;Z.resume();let e=Z.createBufferSource();e.buffer=Z.createBuffer(1,1,Z.sampleRate),e.connect(Z.destination),e.start()}function jh(e,t){let n=Z,r=n.createGain(),i=e;if(t){let{pan:e,near:a}=pg(t);if(i*=a,n.createStereoPanner){let t=n.createStereoPanner();t.pan.value=Math.max(-1,Math.min(1,e*.7)),r.connect(t).connect(ag)}else r.connect(ag)}else r.connect(ag);return r.gain.value=i,r}function Mh(e,t=.04){if(!Z||!mg||Z.state!==`running`)return!1;let n=Z.currentTime;return n-(gg.get(e)??-1)<t?!1:(gg.set(e,n),!0)}function Nh(e,t,n,r,i){let a=Z,o=a.createBufferSource();o.buffer=sg,o.loop=!0,o.loopStart=Math.random()*.5;let s=a.createBiquadFilter();s.type=r.type,s.Q.value=r.q??1,s.frequency.setValueAtTime(r.from,t),r.to&&s.frequency.exponentialRampToValueAtTime(r.to,t+n);let c=a.createGain();c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(i.peak,t+i.attack),c.gain.exponentialRampToValueAtTime(1e-4,t+n),o.connect(s).connect(c).connect(e),o.start(t,Math.random()*.5),o.stop(t+n+.05)}function Ph(e,t,n,r,i,a,o,s=.005){let c=Z,l=c.createOscillator();l.type=r,l.frequency.setValueAtTime(i,t),a!==i&&l.frequency.exponentialRampToValueAtTime(a,t+n);let u=c.createGain();u.gain.setValueAtTime(1e-4,t),u.gain.exponentialRampToValueAtTime(o,t+s),u.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(u).connect(e),l.start(t),l.stop(t+n+.05)}function Fh(e){let t=e.sampleRate,n=e.createBuffer(1,t*2,t),r=n.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=(Math.random()*2-1)*.03;let i=0;for(;i<r.length;){let e=Math.floor(t*(.005+Math.random()*.009)),n=.6+Math.random()*.4;for(let t=0;t<e&&i+t<r.length;t++){let a=Math.sin(Math.PI*t/e)**.5;r[i+t]+=(Math.random()*2-1)*n*a}i+=Math.floor(e*(.8+Math.random()*.4))}return n}function Ih(e,t,n,r,i){let a=Math.floor(n*t),o=Math.floor(r*t);for(let t=0;t<o&&a+t<e.length;t++)e[a+t]+=(Math.random()*2-1)*i*Math.exp(-5*t/o)}function Lh(e){let t=e.sampleRate,n=e.createBuffer(1,t*1,t),r=n.getChannelData(0),i=0;for(let e=0;e<r.length;e++){let n=e/t;i+=.06*(Math.random()*2-1-i),r[e]=i*5*Math.min(1,n/.006)*Math.exp(-n/.09)}for(let e=0;e<.35;){let n=900*Math.exp(-e/.05)+60;e+=-Math.log(1-Math.random())/n,Ih(r,t,e,8e-4+Math.random()*.004,(.25+Math.random()**2*.9)*Math.exp(-e/.12))}for(let e=.12;e<.95;)e+=-Math.log(1-Math.random())/(45*Math.exp(-(e-.12)/.3)+4),Ih(r,t,e,6e-4+Math.random()*.002,.12+Math.random()*.18*Math.exp(-(e-.12)/.3));return n}function Rh(e){let t=e.sampleRate,n=e.createBuffer(1,Math.floor(t*1.2),t),r=n.getChannelData(0),i=1,a=1,o=0;for(let e=0;e<r.length;e++){let n=e/t;n>=o&&(a=.35+Math.random()*.65,o=n+.02+Math.random()*.05),i+=(a-i)*.004;let s=Math.min(1,n/.06)**2*Math.exp(-Math.max(0,n-.08)/.4);r[e]=(Math.random()*2-1)*s*i}return n}function zh(e){let t=e.sampleRate,n=e.createBuffer(1,Math.floor(t*1.1),t),r=n.getChannelData(0);for(let e=.02;e<1;)e+=-Math.log(1-Math.random())/(40*Math.exp(-e/.5)+6),Ih(r,t,e,5e-4+Math.random()*.0025,.3+Math.random()*.7);return n}function Bh(e){let t=e.sampleRate,n=e.createBuffer(1,Math.floor(t*1),t),r=n.getChannelData(0),i=(e,n,i)=>{let a=Math.floor(e*t);for(let e=0;a+e<r.length&&e<t*n*5;e++){let o=e/t;r[a+e]+=(Math.random()*2-1)*i*Math.min(1,o/.004)*Math.exp(-o/n)}};i(0,.11,1);for(let e=0;e<6;e++)i(.08+Math.random()*.4,.02+Math.random()*.03,.15+Math.random()*.3);return n}function Vh(e,t,n,r,i,a=1,o){let s=Z,c=s.createBufferSource();c.buffer=n,c.playbackRate.value=a*(.92+Math.random()*.16);let l=s.createBiquadFilter();l.type=r.type,l.Q.value=r.q??.7,l.frequency.setValueAtTime(r.from,t),r.to&&l.frequency.exponentialRampToValueAtTime(r.to,t+(r.at??n.duration));let u=s.createGain();return u.gain.value=i,c.connect(l).connect(u).connect(e),c.start(t),o&&(u.gain.setValueAtTime(i,t+o-.06),u.gain.linearRampToValueAtTime(0,t+o),c.stop(t+o+.01)),l}function Hh(e){if(!Mh(`chime`))return;let t=Z.currentTime,n=jh(.32),r={circle:5,triangle:7,invertedTriangle:6,square:4,rhombus:8,pentagram:9,spiral:3}[e]??6;Ph(n,t,.9,`sine`,Tg(r),Tg(r),.5),Ph(n,t+.07,.8,`sine`,Tg(r+2),Tg(r+2),.32),Ph(n,t,.25,`triangle`,Tg(r+5),Tg(r+5),.08)}function Uh(){if(!Mh(`fizzle`))return;let e=Z.currentTime;Nh(jh(.35),e,.32,{type:`lowpass`,from:1400,to:220,q:.7},{attack:.02,peak:.6}),Ph(jh(.12),e,.22,`sine`,220,150,.4)}function Wh(e,t){if(!Mh(`rumble`,.02))return;let n=Z.currentTime,r=jh(.5,e);Nh(r,n,t+.08,{type:`lowpass`,from:120,to:200,q:1.5},{attack:t*.8,peak:.8});let i=Z.createGain();i.gain.setValueAtTime(1e-4,n),i.gain.exponentialRampToValueAtTime(1,n+t),i.connect(r),Vh(i,n,Cg(lg),{type:`lowpass`,from:900,q:.7},.35,.45,t+.08)}function Gh(e,t){if(!Mh(`strike-${e}`,.03))return;let n=Z.currentTime,r=jh(.75,t),i=e=>{Vh(r,n,Cg(lg),{type:`lowpass`,from:7e3,to:2500,at:.4},.9*e),Nh(r,n,.25,{type:`lowpass`,from:160,q:.7},{attack:.005,peak:.6*e})},a=e=>{let t=Vh(r,n,Cg(ug),{type:`lowpass`,from:350},.9*e);t.frequency.exponentialRampToValueAtTime(3200,n+.12),t.frequency.exponentialRampToValueAtTime(900,n+1),Vh(r,n,Cg(ug),{type:`lowpass`,from:220,q:.5},.6*e,.6),Vh(r,n+.05,Cg(dg),{type:`highpass`,from:1800},.35*e)},o=e=>{Vh(r,n,Cg(fg),{type:`bandpass`,from:2600,to:1100,at:.5,q:.6},1.1*e);for(let t=0;t<4;t++){let t=n+.15+Math.random()*.45,i=500+Math.random()*700;Ph(r,t,.05,`sine`,i,i*2.4,.18*e)}};switch(e){case`earth`:case`columns`:i(1);break;case`fire`:case`fireStar`:i(.45),a(1);break;case`water`:case`waterStar`:i(.45),o(1);break;case`blast`:i(1),a(.8),Nh(r,n+.06,1.1,{type:`highpass`,from:2500,to:5e3,q:.4},{attack:.1,peak:.35});break;case`vine`:Vh(r,n,Cg(lg),{type:`bandpass`,from:900,q:1.5},.5,.5,.6);for(let e=0;e<3;e++)Ph(r,n+e*.09,.22,`sawtooth`,90+e*14,70,.08)}}function Kh(e){if(!Mh(`clack`))return;let t=Z.currentTime,n=jh(.55,e);Nh(n,t,.08,{type:`bandpass`,from:2400,q:3},{attack:.002,peak:.8}),Ph(n,t,.12,`triangle`,380,260,.35)}function qh(e){if(!Mh(`wall`))return;let t=Z.currentTime,n=jh(.6,e);Nh(n,t,.5,{type:`lowpass`,from:250,to:1100,q:1.2},{attack:.15,peak:.8}),Ph(n,t,.5,`sawtooth`,55,80,.12,.15),Ph(n,t+.42,.25,`sine`,90,50,.5)}function Jh(e,t){if(!Mh(`charge`))return;let n=Z.currentTime,r=jh(.45,t);e===`fire`?Nh(r,n,.5,{type:`bandpass`,from:400,to:2400,q:1},{attack:.25,peak:.7}):Nh(r,n,.5,{type:`bandpass`,from:2400,to:600,q:1.4},{attack:.2,peak:.6}),Ph(r,n+.35,.5,`sine`,Tg(e===`fire`?7:5),Tg(e===`fire`?7:5),.25)}function Yh(e){if(!Mh(`snare`,.2))return;let t=Z.currentTime,n=jh(.4,e);for(let e=0;e<4;e++)Ph(n,t+e*.07,.12,`sawtooth`,140-e*12,110-e*10,.08)}function Xh(e){if(!Mh(`heal`,.2))return;let t=Z.currentTime,n=jh(.35,e);for(let[e,r]of[5,7,9].entries())Ph(n,t+e*.06,1.2,`sine`,Tg(r),Tg(r),.35,.15)}function Zh(e){if(!Mh(`end`,1))return;let t=Z.currentTime,n=jh(.45);e?[5,7,9,10].forEach((e,r)=>Ph(n,t+r*.12,r===3?1.4:.5,`triangle`,Tg(e),Tg(e),.5)):[2,0].forEach((e,r)=>{Ph(n,t+r*.32,.9,`triangle`,Tg(e-5),Tg(e-5)*.97,.5),Ph(n,t+r*.32,.9,`sine`,Tg(e-10),Tg(e-10),.4)})}function Qh(e,t,n){let r=3+Math.random()*5,i=Math.random();return e.gain.setTargetAtTime(.02+i*.07,n,r/3),t.frequency.setTargetAtTime(250+i*650,n,r/3),r}function $h(e){let t=Z,n=t.createStereoPanner?t.createStereoPanner():null,r=t.createGain();r.gain.value=.05+Math.random()*.05,n?(n.pan.value=(Math.random()*2-1)*.8,r.connect(n).connect(og)):r.connect(og);let i=2400+Math.random()*2200,a=2+Math.floor(Math.random()*4),o=Math.random()<.5,s=e;for(let e=0;e<a;e++){let e=.05+Math.random()*.09,t=i*(.9+Math.random()*.25),n=t*(o?1.25+Math.random()*.3:.7+Math.random()*.15);Ph(r,s,e,`sine`,t,n,.6,.01),s+=e+.03+Math.random()*.08}return s}function eg(){let e=Z,t=e.createBufferSource();t.buffer=sg,t.loop=!0;let n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=400,n.Q.value=.5;let r=e.createBiquadFilter();r.type=`bandpass`,r.frequency.value=900,r.Q.value=.8;let i=e.createGain();i.gain.value=0,t.connect(n).connect(i).connect(og);let a=e.createGain();a.gain.value=.25,n.connect(r).connect(a).connect(i),t.start();let o=e.currentTime+.5,s=e.currentTime+4+Math.random()*6,c=()=>{let t=e.currentTime+3;for(;o<t;)o+=Qh(i,n,o);for(;s<t;){let e=$h(s);Math.random()<.35&&(e=$h(e+.25+Math.random()*.4)),s=e+5+Math.random()*12}};c(),clearInterval(hg),hg=window.setInterval(c,1e3)}var tg,ng,rg,Z,ig,ag,og,sg,cg,lg,ug,dg,fg,pg,mg,hg,gg,_g,vg,yg,bg,xg,Sg,Cg,wg,Tg,Eg=t((()=>{if(tg=`cirquimia.sound`,ng=.8,rg=.5,Z=null,lg=[],ug=[],dg=[],fg=[],pg=()=>({pan:0,near:1}),mg=Dh(),hg=0,gg=new Map,_g=[`pointerdown`,`pointerup`,`mousedown`,`mouseup`,`touchstart`,`touchend`,`click`,`keydown`],typeof window<`u`){let e=navigator.audioSession;e&&(e.type=`ambient`);for(let e of _g)addEventListener(e,kh,{capture:!0,passive:!0});document.addEventListener(`visibilitychange`,()=>{Z&&(document.hidden?Z.suspend():mg&&Z.resume())})}vg={get chosen(){return Oh()!==null},get enabled(){return mg},set enabled(e){mg=e;try{localStorage.setItem(tg,e?`1`:`0`)}catch{}Z&&(ig.gain.setTargetAtTime(+!!e,Z.currentTime,.05),Ah())},set locator(e){pg=e}},yg=null,bg=null,xg=null,Sg={begin(){if(this.end(),!Z||!mg||Z.state!==`running`)return;let e=Z,t=e.currentTime;xg=e.createBufferSource(),xg.buffer=cg,xg.loop=!0;let n=e.createBiquadFilter();n.type=`highpass`,n.frequency.value=600,bg=e.createBiquadFilter(),bg.type=`bandpass`,bg.frequency.value=1700,bg.Q.value=3.5;let r=e.createBiquadFilter();r.type=`lowpass`,r.frequency.value=4200,yg=e.createGain(),yg.gain.value=0,xg.connect(n).connect(bg).connect(r).connect(yg).connect(ag),xg.start(t,Math.random()*1.5),Nh(ag,t,.035,{type:`bandpass`,from:1500,q:3},{attack:.002,peak:.25})},move(e){if(!Z||!yg||!bg||!xg)return;let t=Math.min(1,e/1400),n=Z.currentTime;yg.gain.setTargetAtTime(t<.03?.02:.12+t*.4,n,.025),bg.frequency.setTargetAtTime(1500+t*900,n,.05),xg.playbackRate.setTargetAtTime(.85+t*.35,n,.05)},end(){Z&&yg&&xg&&(yg.gain.setTargetAtTime(0,Z.currentTime,.02),xg.stop(Z.currentTime+.15),yg=bg=xg=null)}},Cg=e=>e[Math.floor(Math.random()*e.length)],wg=[293.66,329.63,369.99,440,493.88],Tg=e=>wg[(e%5+5)%5]*2**Math.floor(e/5)}));function Dg(e=Wg){let t=Math.PI+m_;return[0,2,4,1,3].map(n=>{let r=t+n/5*Math.PI*2;return{x:Math.sin(r)*e,z:Math.cos(r)*e}})}function Og(e,t=Wg){return Dg(t).map((t,n)=>{let r=e.x+t.x,i=e.z+t.z;return{at:new H(r,J(r,i),i),delay:n*Gg}})}function kg(e,t,n,r,i){let a=new ls(Math.max(n,.001),r,48,i).rotateX(-Math.PI/2),o=a.attributes.position;for(let n=0;n<o.count;n++){let r=o.getX(n)+e,i=o.getZ(n)+t;o.setXYZ(n,r,J(r,i)+.035,i)}return a.computeBoundingSphere(),a}function Ag(e,t,n,r,i,a){let o=n=>{let r=(r,i,a)=>{let o=Math.sin(n.angle)*r,s=Math.cos(n.angle)*r;return new H(o,J(e+o,t+s)+i-a,s)},i=n.height*.62;return[r(n.inner,0,.12),r(B.lerp(n.inner,n.crest,.55),i,0),r(n.crest-n.lean,n.height,0),r(B.lerp(n.outer,n.crest,.5),i*.95,0),r(n.outer,0,.12)]},s=o(n),c=o(r),l=[],u=(e,t,n)=>l.push(e.x,e.y,e.z,n.x,n.y,n.z,t.x,t.y,t.z);for(let e=0;e<4;e++)u(s[e],c[e],c[e+1]),u(s[e],c[e+1],s[e+1]);let d=(e,t)=>{for(let n=1;n<4;n++)t?u(e[0],e[n+1],e[n]):u(e[0],e[n],e[n+1])};i&&d(s,!0),a&&d(c,!1);let f=new Aa;return f.setAttribute(`position`,new va(l,3)),f.computeVertexNormals(),f}function jg(e,t,n,r){let i=[];for(let r=0;r<=10;r++){let a=r/10,o=a*Math.PI*2.2*n,s=t*a*a;i.push(new H(Math.sin(o)*s+Math.sin(a*3)*.01,e*(a-.25*a*a*a),(Math.cos(o)-1)*s))}return new ds(new Zo(i),18,r,4,!1)}var Mg,Ng,Pg,Fg,Ig,Lg,Rg,zg,Bg,Vg,Hg,Ug,Wg,Gg,Kg,qg,Jg,Yg,Xg,Zg,Qg,$g,e_,t_,n_,r_,i_,a_,o_,s_,c_,l_,u_,d_,f_,p_,m_,h_,g_,__,v_,y_,b_,x_,S_,C_,w_,T_,E_,D_,O_,k_,A_,j_,M_,N_,P_,F_,I_,L_,R_,z_,B_,V_=t((()=>{Id(),Eg(),Xd(),Mg=.6,Ng=.35,Pg=1.4,Fg=1.75,Ig=.5,Lg=.2,Rg=.12,zg=.55,Bg=.3,Vg=.17,Hg=.6,Ug=.75,Wg=.5,Gg=.06,Kg=1.25,qg={earth:1,columns:1,fire:1,water:1,blast:.6,fireStar:1,waterStar:1,vine:.6},Jg=e=>e===`columns`||e===`fireStar`||e===`waterStar`,Yg=e=>e===`fire`||e===`fireStar`?`fire`:e===`water`||e===`waterStar`?`water`:null,Xg=.25,Zg=.4,Qg=.5,$g=1.3,e_=.7,t_=[`#a8e6a1`,`#d8f2c4`,`#8fd6a0`],n_=[`#8c9496`,`#7d8584`,`#9a9d95`],r_=[`#a39c86`,`#8f8672`,`#7a7262`],i_=`#4a4038`,a_=new _s({flatShading:!0}),o_=new Ho(.5,0).translate(0,.5,0),s_=new zo(Math.SQRT1_2*.82,Math.SQRT1_2,1,4,1).rotateY(Math.PI/4).translate(0,.5,0),c_=new Ro(1,7).rotateX(-Math.PI/2),l_=new ls(.9,1.08,28).rotateX(-Math.PI/2),u_=10,d_=new ls(1.22,1.36,4,1,0,Math.PI*2/u_*.55).rotateX(-Math.PI/2),f_=new cs(1,.2).rotateX(-Math.PI/2),p_=1.1,m_=B.degToRad(24),h_=new Bo(.5,1,5,1).translate(0,.5,0),g_=new zo(.3,.5,1,6,1).translate(0,.5,0),__=new os(1,0),v_=new Lo(1,1,1).translate(0,.5,0),y_=new ls(.16,.22,32).rotateX(-Math.PI/2),b_=[`#f08a3a`,`#f4a94c`,`#e0663a`],x_=`#ffd67a`,S_=[`#7fb3c2`,`#93c4cf`,`#6a9fb1`],C_=`#d9ecef`,w_=[`#e8eeec`,`#d3dedd`,`#f4efe2`],T_=[`#5f9a40`,`#72aa4c`,`#4f8236`],E_=`#8cb35e`,D_=new ss(1,0),O_=new _s({color:E_,flatShading:!0}),k_={earth:i_,columns:i_,fire:`#c4552c`,water:`#2f5866`,blast:`#8a2f1c`,fireStar:`#c4552c`,waterStar:`#2f5866`,vine:`#2f4a26`},A_=new W,j_=e=>1+2.4*(e-1)**3+1.4*(e-1)**2,M_=e=>e*e,N_=class{warn;rise;hold;sink;group=new ki;pieces=[];age=0;done=!1;solid=!1;constructor(e,t,n,r){this.warn=e,this.rise=t,this.hold=n,this.sink=r}addPiece(e,t,n,r,i,a){let o=new G(e,a_.clone());o.material.color.set(t),o.castShadow=!0,o.receiveShadow=!0;let s=J(n,r);return o.position.set(n,s-i,r),o.visible=!1,this.group.add(o),this.pieces.push({mesh:o,ground:s,height:i,delay:a}),o}update(e){this.age+=e;let t=this.age-this.warn,n=this.rise+this.hold;for(let e of this.pieces){let r=t-e.delay,i;i=r<0?0:r<this.rise?j_(r/this.rise):t<n?1:1-M_(Math.min(1,(t-n-e.delay*.5)/this.sink)),e.mesh.visible=i>.01,e.mesh.position.y=e.ground-(1-i)*e.height*1.15}this.solid=t>=0&&t<n,this.onUpdate(t),t>n+this.sink+.4&&(this.done=!0)}onUpdate(e){}dispose(){for(let e of this.pieces)e.mesh.material.dispose(),e.geo?.dispose()}},P_=class extends N_{owner;obstacles=[];zone;zoneMaterials=[];zoneGeos=[];constructor(e,t,n,r=null,i=null){super(0,Ng,Pg,Ig),this.owner=i;let a=n.x-e,o=n.z-t,s=Math.atan2(a,o),c=Mg;this.zone={x:e,z:t,r:c};let l=B.degToRad(B.randFloat(130,175)),u=B.randFloat(.38,.5),d=B.randFloat(-.12,.12),f=Math.random(),p=B.randFloat(.2,.26),m=Math.max(8,Math.round(l*c/.09)),h=r_[Math.floor(Math.random()*r_.length)],g=[];for(let e=0;e<=m;e++){let t=e/m,n=B.clamp(t+d*Math.sin(Math.PI*t),0,1),r=Math.sin(Math.PI*n)**1.2,i=e===0||e===m;g.push({angle:s+(t-.5)*l+(i?0:B.randFloatSpread(.03)),height:i?.02:Math.max(.05,u*r*B.randFloat(.85,1.1)),inner:c-p*B.randFloat(.4,.6),outer:c+p*B.randFloat(.4,.6),crest:c+B.randFloatSpread(.04),lean:B.randFloat(.02,.05)})}for(let n=0;n<m;n++){let r=g[n],i=g[n+1],a=(n+.5)/m,o=Math.random()<.08+f*.2;A_.set(o?n_[n%n_.length]:h).offsetHSL(0,0,B.randFloatSpread(.03));let s=Math.max(r.height,i.height);this.addSegment(Ag(e,t,r,i,n===0,n===m-1),A_,e,t,s,Math.abs(a-.5)*2*Ng*.7);let l=(r.angle+i.angle)/2;n%2==0&&this.obstacles.push({x:e+Math.sin(l)*c,z:t+Math.cos(l)*c,r:p*.6,rises:!0})}let _=Math.round(m*(.15+f*.35));for(let n=0;n<_;n++){let n=B.randInt(1,m-1),r=g[n],i=Math.random()<.5?r.inner:r.outer,a=B.lerp(r.crest,i,B.randFloat(.3,.8)),o=B.randFloat(.07,.12)*(.6+r.height*1.2),s=e+Math.sin(r.angle)*a,c=t+Math.cos(r.angle)*a;A_.set(n_[Math.floor(Math.random()*n_.length)]).offsetHSL(0,0,B.randFloatSpread(.06));let l=this.addPiece(o_,A_,s,c,o,Math.abs(n/m-.5)*2*Ng*.7+.05);l.scale.set(o*B.randFloat(1,1.6),o,o*B.randFloat(.9,1.3)),l.rotation.set(B.randFloatSpread(.6),Math.random()*Math.PI,B.randFloatSpread(.6))}if(r)for(let[n,i]of[[kg(e,t,0,c,6),.16],[kg(e,t,.565,c,1),.7]]){let e=new Ha({color:r,transparent:!0,opacity:0,depthWrite:!1});e.userData.full=i;let t=new G(n,e);t.renderOrder=1,this.group.add(t),this.zoneMaterials.push(e),this.zoneGeos.push(n)}}onUpdate(e){let t=this.rise+this.hold,n=e<0?0:e<this.rise?e/this.rise:e<t?1:Math.max(0,1-(e-t)/(this.sink*.5));for(let e of this.zoneMaterials)e.opacity=e.userData.full*n}dispose(){super.dispose();for(let e of this.zoneMaterials)e.dispose();for(let e of this.zoneGeos)e.dispose()}addSegment(e,t,n,r,i,a){let o=new G(e,a_.clone());return o.material.color.set(t),o.castShadow=!0,o.receiveShadow=!0,o.position.set(n,-i,r),o.visible=!1,this.group.add(o),this.pieces.push({mesh:o,ground:0,height:i,delay:a,geo:e}),o}},F_=class extends N_{x;z;element;caster;ink;scale;cage;obstacles=[];crack;crackMaterial;inkMaterial=null;boostRing=null;blocked=!1;get area(){return Vg*qg[this.element]*this.scale}constructor(e,t,n,r=`earth`,i=null,a=Lg,o=null,s=1,c=null){if(super(a,Rg,zg,Bg),this.x=e,this.z=t,this.element=r,this.caster=i,this.ink=o,this.scale=s,this.cage=c,r===`earth`||r===`columns`?this.buildPillars(n,r===`columns`?Hg:1):r===`blast`?this.buildBlast():r===`vine`?this.buildVines():this.buildFluid(Yg(r)===`fire`,Jg(r)?Ug:1),s!==1)for(let n of this.pieces){let r=n.mesh;r.position.x=e+(r.position.x-e)*s,r.position.z=t+(r.position.z-t)*s,r.scale.multiplyScalar(s),r.userData.base?.multiplyScalar(s),n.ground=J(r.position.x,r.position.z),n.height*=s}if(o){A_.set(o);for(let e of this.pieces)e.mesh.material.emissive.lerp(A_,.3)}this.crackMaterial=new Ha({color:k_[r],transparent:!0,opacity:0,depthWrite:!1}),this.crack=new G(c_,this.crackMaterial),this.crack.position.set(e,J(e,t)+.03,t);let l=.05,u=new H(J(e-l,t)-J(e+l,t),2*l,J(e,t-l)-J(e,t+l)).normalize();if(this.crack.quaternion.setFromUnitVectors(new H(0,1,0),u),this.crack.scale.setScalar(this.area*1.5),this.crack.renderOrder=1,this.group.add(this.crack),o){this.inkMaterial=new Ha({color:o,transparent:!0,opacity:0,depthWrite:!1});let e=new G(l_,this.inkMaterial);if(e.position.y=.002,e.renderOrder=2,this.crack.add(e),s>1){this.boostRing=new ki;for(let e=0;e<u_;e++){let t=new G(d_,this.inkMaterial);t.rotation.y=e/u_*Math.PI*2,t.renderOrder=2,this.boostRing.add(t)}this.boostRing.position.y=.003,this.crack.add(this.boostRing)}}}buildPillars(e,t=1){let{x:n,z:r}=this,i=Math.atan2(n-e.x,r-e.z),a=B.randFloat(.3,.45),o=this.addPiece(s_,n_[Math.floor(Math.random()*n_.length)],n,r,.46*t,0);o.scale.set(.17,.46*t,.17),o.rotation.set(a,i+B.randFloatSpread(.3),0,`YXZ`),this.obstacles.push({x:n,z:r,r:.1,rises:!0});let s=B.randInt(4,6);for(let e=0;e<s;e++){let i=e/s*Math.PI*2+B.randFloatSpread(.6),a=Vg*B.randFloat(.55,1),o=B.randFloat(.12,.26)*t,c=B.randFloat(.05,.085);A_.set((Math.random()<.6?n_:r_)[Math.floor(Math.random()*3)]);let l=this.addPiece(s_,A_,n+Math.sin(i)*a,r+Math.cos(i)*a,o,B.randFloat(.02,.07));l.scale.set(c,o,c),l.rotation.set(B.randFloat(.25,.55),i+B.randFloatSpread(.4),0,`YXZ`)}}buildFluid(e,t=1){let{x:n,z:r}=this,i=e?b_:S_,a=(n,r,i,a,o,s,c,l)=>{let u=this.addPiece(e?h_:g_,o,n,r,a*t,s),d=u.material;d.emissive.set(o).multiplyScalar(e?.75:.35),e||(d.transparent=!0,d.opacity=.82),u.castShadow=!e,u.scale.set(i,a*t,i),u.rotation.set(c,l,0,`YXZ`),u.userData.base=u.scale.clone(),u.userData.phase=Math.random()*10};a(n,r,e?.2:.16,e?.5:.55,i[0],0,B.randFloatSpread(.1),0),a(n,r,e?.11:.08,e?.36:.62,e?x_:C_,.02,0,0);let o=B.randInt(5,7);for(let e=0;e<o;e++){let t=e/o*Math.PI*2+B.randFloatSpread(.6),s=Vg*B.randFloat(.45,.95),c=B.randFloat(.14,.3),l=B.randFloat(.06,.1);a(n+Math.sin(t)*s,r+Math.cos(t)*s,l,c,i[e%i.length],B.randFloat(.02,.08),B.randFloat(.15,.4),t)}}buildVines(){let{x:e,z:t}=this,n=B.randInt(6,8);for(let r=0;r<n;r++){let i=r/n*Math.PI*2+B.randFloatSpread(.6),a=r===0?0:Vg*qg.vine*B.randFloat(.35,.95),o=r===0?.42:B.randFloat(.2,.34),s=jg(o,B.randFloat(.035,.06),Math.random()<.5?1:-1,r===0?.016:.011),c=this.addPiece(s,T_[r%T_.length],e+Math.sin(i)*a,t+Math.cos(i)*a,o,B.randFloat(0,.08));this.pieces[this.pieces.length-1].geo=s,c.rotation.set(B.randFloat(.1,.3),i,0,`YXZ`),c.userData.base=c.scale.clone(),c.userData.phase=Math.random()*10;for(let e=0;e<2;e++){let e=new G(D_,O_);e.scale.set(.028,.008,.05),e.position.set(B.randFloatSpread(.04),o*B.randFloat(.35,.75),B.randFloatSpread(.04)),e.rotation.set(B.randFloatSpread(.8),Math.random()*Math.PI*2,.5),c.add(e)}}}buildBlast(){let{x:e,z:t}=this,n=Vg*qg.blast,r=(e,t,n,r=1)=>{let i=e.material;i.emissive.set(t).multiplyScalar(n),r<1&&(i.transparent=!0,i.opacity=r,i.depthWrite=!1),e.castShadow=!1,e.userData.base=e.scale.clone(),e.userData.phase=Math.random()*10},i=this.addPiece(__,x_,e,t,.2,0);i.scale.set(.13,.11,.13),i.userData.blast=`core`,r(i,x_,.9);let a=B.randInt(5,6);for(let i=0;i<a;i++){let o=i/a*Math.PI*2+B.randFloatSpread(.5),s=n*B.randFloat(.25,.6),c=B.randFloat(.18,.3),l=b_[i%b_.length],u=this.addPiece(h_,l,e+Math.sin(o)*s,t+Math.cos(o)*s,c,B.randFloat(0,.03));u.scale.set(B.randFloat(.06,.09),c,B.randFloat(.06,.09)),u.rotation.set(B.randFloat(.55,.85),o,0,`YXZ`),u.userData.blast=`tongue`,r(u,l,.8)}let o=B.randInt(5,7);for(let i=0;i<o;i++){let a=i/o*Math.PI*2+B.randFloatSpread(.7),s=n*B.randFloat(.4,1),c=B.randFloat(.1,.22),l=w_[i%w_.length],u=this.addPiece(__,l,e+Math.sin(a)*s,t+Math.cos(a)*s,c,B.randFloat(.03,.09));u.scale.setScalar(B.randFloat(.05,.08)),u.userData.blast=`puff`,u.userData.rise=B.randFloat(.25,.45),r(u,l,.25,.8)}}erupting(e){return this.age<this.warn&&this.age+e>=this.warn}onUpdate(e){if(this.blocked){for(let e of this.pieces)e.mesh.visible=!1;this.solid=!1}let t=Yg(this.element);if(t){let e=t===`fire`?22:14;for(let t of this.pieces){let n=t.mesh.userData.base,r=this.age*e+t.mesh.userData.phase,i=1+Math.sin(r*1.3)*.12;t.mesh.scale.set(n.x*i,n.y*(1+Math.sin(r)*.15),n.z*i)}}if(this.element===`blast`&&e>=0&&this.animateBlast(e),this.element===`vine`)for(let e of this.pieces)e.mesh.rotation.z=Math.sin(this.age*7+e.mesh.userData.phase)*.18;if(e<0){let t=1+e/this.warn;this.crackMaterial.opacity=.45+t*.35,this.crack.scale.setScalar(this.area*(.9+t*.6)*(1+Math.sin(this.age*90)*.05)),this.crack.rotateY(Math.sin(this.age*70)*.02)}else{let t=this.blocked?e/.25:(e-Rg-zg)/.29999999999999993;this.crackMaterial.opacity=.65*(1-B.clamp(t,0,1))}this.boostRing?.rotateY(.04),this.inkMaterial&&(this.inkMaterial.opacity=Math.min(.9,this.crackMaterial.opacity*1.4))}animateBlast(e){let t=Math.min(1,e/.97);for(let n of this.pieces){let r=n.mesh,i=r.userData.base,a=r.material,o=r.userData.blast;if(o===`core`){let t=e<.12?1+e/.12:Math.max(.2,2-(e-.12)*2.2);r.scale.copy(i).multiplyScalar(t)}else if(o===`tongue`){let e=this.age*26+r.userData.phase;r.scale.set(i.x*(1+Math.sin(e*1.3)*.15),i.y*(1+Math.sin(e)*.2),i.z)}else r.scale.copy(i).multiplyScalar(1+t*1.8),r.position.y+=t*r.userData.rise,a.opacity=.8*(1-t*t)}}dispose(){super.dispose(),this.crackMaterial.dispose(),this.inkMaterial?.dispose()}},I_=class{target;group=new ki;obstacles=[];solid=!1;done=!1;age=0;geos=[];material;constructor(e,t){this.target=e,this.material=new _s({color:T_[0],flatShading:!0}),t&&this.material.emissive.set(t).multiplyScalar(.18);let n=(e,t,n,r)=>{let i=new ds(new Zo(e),36,t,4,!1);this.geos.push(i);let a=new G(i,this.material);if(a.castShadow=!0,this.group.add(a),!n)return;let o=new G(D_,O_);o.scale.set(.035,.01,.065),o.position.copy(n),o.rotation.set(.4,r,.6),a.add(o)};for(let e=0;e<3;e++){let t=e/3*Math.PI*2,r=[];for(let n=0;n<=24;n++){let i=n/24,a=t+i*Math.PI*2*1.6*(e%2?-1:1),o=.11-i*.03;r.push(new H(Math.sin(a)*o,i*.34,Math.cos(a)*o))}let i=r[r.length-1];n(r,.017,new H(i.x*1.4,i.y,i.z*1.4),t)}for(let e=0;e<6;e++){let t=e/6*Math.PI*2+B.randFloatSpread(.5),r=B.randFloat(.16,.26),i=B.randFloatSpread(.6),a=[];for(let e=0;e<=6;e++){let n=e/6,o=t+i*n,s=.08+r*n;a.push(new H(Math.sin(o)*s,.03+Math.sin(n*Math.PI)*.03,Math.cos(o)*s))}n(a,.013,e%2?a[4].clone().setY(.05):null,t)}this.group.scale.set(1,.01,1),this.group.position.copy(e)}update(e){this.age+=e,this.group.position.copy(this.target);let t=Math.min(1,this.age/Xg),n=B.clamp((this.age-2)/Zg,0,1),r=j_(t)*(1-M_(n));this.group.scale.set(1+(1-r)*.3,Math.max(.01,r),1+(1-r)*.3),this.group.rotation.y=Math.sin(this.age*3)*.05,n>=1&&(this.done=!0)}dispose(){for(let e of this.geos)e.dispose();this.material.dispose()}},L_=class{to;group=new ki;obstacles=[];solid=!1;done=!1;age=0;beads=[];material;from;constructor(e,t,n){this.to=t,this.from=e.clone();let r=n?b_[0]:S_[0];this.material=new _s({color:r,emissive:new W(r).multiplyScalar(.8),flatShading:!0});for(let e=0;e<6;e++){let t=new G(__,this.material);t.scale.setScalar(B.randFloat(.03,.05)),t.visible=!1,this.group.add(t),this.beads.push({mesh:t,delay:e*.05,lift:B.randFloat(.5,.8)})}}update(e){this.age+=e;let t=this.to;for(let e of this.beads){let n=(this.age-e.delay)/Qg;if(e.mesh.visible=n>0&&n<1,!e.mesh.visible)continue;let r=n*n*(3-2*n);e.mesh.position.lerpVectors(this.from,t,r),e.mesh.position.y+=.3+Math.sin(Math.PI*r)*e.lift}this.age>.9&&(this.done=!0)}dispose(){this.material.dispose()}},R_=class{target;group=new ki;obstacles=[];solid=!1;done=!1;age=0;lines=[];ringMaterial;boostRing=null;constructor(e,t,n){this.target=e;let r=n?18:13;for(let e=0;e<r;e++){let t=new Ha({color:t_[e%t_.length],transparent:!0,opacity:0,depthWrite:!1,blending:2}),n=new G(v_,t),i=e/r*Math.PI*2+B.randFloatSpread(.4),a=B.randFloat(.07,.2),o=B.randFloat(.012,.022);n.position.set(Math.sin(i)*a,0,Math.cos(i)*a),n.scale.set(o,1,o),n.visible=!1,n.renderOrder=5,this.group.add(n),this.lines.push({mesh:n,material:t,delay:B.randFloat(0,.6000000000000001),length:B.randFloat(.16,.32)})}this.ringMaterial=new Ha({color:t??t_[0],transparent:!0,opacity:0,depthWrite:!1});let i=new G(y_,this.ringMaterial);if(i.position.y=.035,i.renderOrder=1,this.group.add(i),n){this.boostRing=new ki;for(let e=0;e<u_;e++){let t=new G(d_,this.ringMaterial);t.rotation.y=e/u_*Math.PI*2,t.renderOrder=1,this.boostRing.add(t)}this.boostRing.scale.setScalar(.22),this.boostRing.position.y=.036,this.group.add(this.boostRing)}this.group.position.copy(e)}update(e){this.age+=e,this.group.position.copy(this.target);for(let e of this.lines){let t=(this.age-e.delay)/e_;e.mesh.visible=t>0&&t<1,e.mesh.visible&&(e.mesh.position.y=t*.85,e.mesh.scale.y=e.length*(.4+Math.sin(Math.PI*t)*.6),e.material.opacity=Math.sin(Math.PI*t)*.9)}let t=this.age/$g;this.ringMaterial.opacity=.8*Math.min(1,t*6)*(t<.7?1:Math.max(0,1-(t-.7)/.3)),this.boostRing?.rotateY(.04),t>=1&&(this.done=!0)}dispose(){for(let e of this.lines)e.material.dispose();this.ringMaterial.dispose()}},z_=class{group=new ki;obstacles=[];solid=!1;done=!1;age=0;material;outline;constructor(e,t,n,r){this.material=new Ha({color:n??`#c0562f`,transparent:!0,opacity:0,depthWrite:!1}),this.outline=new Ha({color:`#f4f1e8`,transparent:!0,opacity:0,depthWrite:!1});for(let e of[Math.PI/4+m_,-Math.PI/4+m_]){let t=new G(f_,this.outline);t.rotation.y=e,t.scale.set(1.12,1,1.7),t.renderOrder=3;let n=new G(f_,this.material);n.rotation.y=e,n.position.y=.002,n.renderOrder=4,this.group.add(t,n)}this.group.position.set(e,J(e,t)+.04,t);let i=.05,a=new H(J(e-i,t)-J(e+i,t),2*i,J(e,t-i)-J(e,t+i)).normalize();this.group.quaternion.setFromUnitVectors(new H(0,1,0),a),this.group.userData.size=r}update(e){this.age+=e;let t=this.age/p_,n=t<.15?j_(t/.15):1;this.group.scale.setScalar(this.group.userData.size*Math.max(.01,n)),this.material.opacity=.95*(t<.6?1:Math.max(0,1-(t-.6)/.4)),this.outline.opacity=this.material.opacity*.85,t>=1&&(this.done=!0)}dispose(){this.material.dispose(),this.outline.dispose()}},B_=class{obstacles;root=new ki;active=[];onStrike=()=>{};constructor(e){this.obstacles=e}wall(e,t,n=null,r=null){this.start(new P_(e.x,e.z,t,n,r)),qh(e)}pillars(e,t,n=`earth`,r=null,i=Lg,a=null,o=1,s=null){this.start(new F_(t.x,t.z,e,n,r,i,a,o,s)),Wh(t,i)}denied(e,t=null,n=1){this.start(new z_(e.x,e.z,t,Vg*2.2*n)),Kh(e)}channel(e,t,n){this.start(new L_(e,t,n===`fire`)),Jh(n,t)}heal(e,t=null,n=!1){this.start(new R_(e,t,n)),Xh(e)}snare(e,t=null){this.start(new I_(e,t)),Yh(e)}clear(){for(let e of this.active)this.setBlocking(e,!1),this.root.remove(e.group),e.dispose();this.active.length=0}start(e){this.active.push(e),this.root.add(e.group)}setBlocking(e,t){for(let n of e.obstacles){let e=this.obstacles.indexOf(n);t&&e<0?this.obstacles.push(n):!t&&e>=0&&this.obstacles.splice(e,1)}}shielded(e,t,n=null){return this.active.some(r=>r instanceof P_&&r.solid&&(n===null||r.owner!==n)&&Math.hypot(e-r.zone.x,t-r.zone.z)<r.zone.r)}update(e){for(let t=this.active.length-1;t>=0;t--){let n=this.active[t];n instanceof F_&&!n.solid&&!n.blocked&&n.erupting(e)&&(n.blocked=this.shielded(n.x,n.z,n.caster),n.blocked?(this.start(new z_(n.x,n.z,n.ink,n.area*2.2)),Kh(n)):(Gh(n.element,n),this.onStrike(n.x,n.z,n.element,n.caster,n.area,n.cage)),n.cage&&n.cage.erupted++);let r=n.solid;n.update(e),n.solid!==r&&(this.setBlocking(n,n.solid),n instanceof F_&&n.cage&&(n.cage.standing+=n.solid?1:-1)),n.done&&(this.active.splice(t,1),this.root.remove(n.group),n.dispose())}}}})),H_,U_,W_,G_,K_,q_,J_,Y_,X_,Z_,Q_,$_,ev,tv,nv,rv,iv,av,ov,sv,cv,lv,uv,dv,fv,pv,mv,hv,gv,_v,vv,yv,bv,xv,Sv,Cv,wv=t((()=>{Id(),Um(),Eh(),Xd(),V_(),ge(),H_={earth:20,columns:10,fire:35,water:35,blast:45,fireStar:20,waterStar:20,vine:5},U_=1.3,W_=`#a8e6a1`,G_=100,K_=1.3,q_=Vg+gm,J_=.72,Y_=.6,X_=.25,Z_=20,Q_=.3,$_=new ls(.18,.24,32).rotateX(-Math.PI/2),ev=M.difficulty,tv={facil:{speed:.9,cooldown:[4,5.5],warn:.9,aimError:.35,lead:0,dodge:.1,reaction:.25,elemental:0,blast:0,star:0,heal:.15,columns:.4,draw:1,stagger:0,guard:.08,fortress:0,wallCooldown:12,counter:!1,evade:0,restless:!1},normal:{speed:1.4,cooldown:[2.8,3.8],warn:.6,aimError:.12,lead:.3,dodge:.75,reaction:.14,elemental:.3,blast:.15,star:.15,heal:.35,columns:.25,draw:.85,stagger:0,guard:.3,fortress:.08,wallCooldown:9,counter:!1,evade:.6,restless:!0},dificil:{speed:1.55,cooldown:[2.6,3.4],warn:.65,aimError:.08,lead:.6,dodge:.7,reaction:.12,elemental:.5,blast:.5,star:.3,heal:.35,columns:.15,draw:.7,stagger:1,guard:.5,fortress:.3,wallCooldown:6,counter:!0,evade:.8,restless:!0},experto:{speed:1.6,cooldown:[1.8,2.4],warn:.55,aimError:.04,lead:.9,dodge:.46,reaction:.1,elemental:.7,blast:.75,star:.4,heal:.5,columns:.1,draw:.5,stagger:.6,guard:.85,fortress:.45,wallCooldown:3,counter:!0,evade:1,restless:!0}},nv={...tv.experto,cooldown:[2.3,3],draw:.6,lead:.55},rv=`#3d7fd6`,iv=[{coat:`#6b3a3a`,coatDark:`#4f2a2b`,ink:`#d9483b`},{coat:`#3f5e3c`,coatDark:`#2e452c`,ink:`#3fae5a`},{coat:`#55406b`,coatDark:`#3e2f50`,ink:`#9b6fd8`}],av={earth:`#e9e2cf`,columns:`#e9e2cf`,fire:`#ffb35c`,water:`#9fd6e3`,blast:`#ff8a5c`,fireStar:`#ffb35c`,waterStar:`#9fd6e3`,vine:`#8cc46a`},ov=new H,sv=.35,cv=.5,lv=.35,uv=2.6,dv={circle:`M20 5 A15 15 0 1 1 19.9 5`,square:`M9 9 H31 V31 H9 Z`,pentagram:`M20 4 L29.4 32.9 L4.8 15.1 H35.2 L10.6 32.9 Z`,triangle:`M20 6 L34 32 H6 Z`,triangleDown:`M20 34 L6 8 H34 Z`,rhombus:`M20 4 L34 20 L20 36 L6 20 Z`,hourglass:`M7 5 H33 L7 35 H33 Z`,spiral:`M20 20 C22 18 24 21 22 23 C19 26 14 22 15 18 C16 12 25 11 28 17 C31 24 25 31 18 31 C9 31 5 23 7 15 C9 7 19 3 27 6 C33 8 36 13 36 19`,fireStar:`M20 2 L38 35 H2 Z M20 15 L25.3 31.3 L11.4 21.2 H28.6 L14.7 31.3 Z`,waterStar:`M20 38 L2 5 H38 Z M20 7 L25.3 23.3 L11.4 13.2 H28.6 L14.7 23.3 Z`},fv=`http://www.w3.org/2000/svg`,pv=class{body;ink;hp=G_;head=J_;bar=document.createElement(`div`);fill=document.createElement(`div`);sketch=document.createElementNS(fv,`svg`);sketchPath=document.createElementNS(fv,`path`);prev=new H;aura;auraMaterial;auraLevel=0;auraTime=0;constructor(e,t){this.body=e,this.ink=t,this.auraMaterial=new Ha({color:t,transparent:!0,opacity:0,depthWrite:!1}),this.aura=new G($_,this.auraMaterial),this.aura.position.y=.03,this.aura.renderOrder=1,this.aura.visible=!1,e.root.add(this.aura),this.bar.className=`hp`,this.fill.className=`hp-fill`,this.fill.style.background=t,this.bar.append(this.fill),document.body.append(this.bar),this.sketch.setAttribute(`class`,`sketch`),this.sketch.setAttribute(`viewBox`,`0 0 40 40`),this.sketch.style.color=t,this.sketchPath.setAttribute(`pathLength`,`1`),this.sketch.append(this.sketchPath),this.sketch.style.display=`none`,document.body.append(this.sketch)}drawSketch(e,t,n=!1){this.down||(this.sketch.classList.toggle(`held`,n),this.sketchPath.setAttribute(`d`,dv[e]),this.sketch.style.setProperty(`--draw`,`${t}s`),this.sketch.style.display=``,this.sketch.classList.remove(`drawing`),this.sketch.getBoundingClientRect(),this.sketch.classList.add(`drawing`))}hideSketch(){this.sketch.style.display=`none`,this.sketch.classList.remove(`drawing`)}get position(){return this.body.root.position}disposeAura(){this.auraMaterial.dispose()}empower(e,t){if(this.auraLevel=B.clamp(this.auraLevel+(e?t:-t)*5,0,1),this.auraTime+=t,this.aura.visible=this.auraLevel>0,!this.aura.visible)return;let n=1+Math.sin(this.auraTime*5)*.08;this.aura.scale.setScalar(n),this.auraMaterial.opacity=this.auraLevel*(.75+Math.sin(this.auraTime*5)*.2)}get down(){return this.body.isDown}reset(){this.hp=G_,this.body.rise(),this.bar.classList.remove(`ko`)}get floor(){return 0}hit(e,t,n,r=!1){this.down||(this.body.flash(),this.hp=Math.max(this.floor,this.hp-e),this.hp===0&&(this.hideSketch(),this.body.fall(),this.bar.classList.add(`ko`)),this.bar.classList.remove(`hurt`),this.bar.offsetWidth,this.bar.classList.add(`hurt`),this.popNumber(r?`-${e} ✦`:`-${e}`,av[t],n))}heal(e,t,n=!1){this.down||(this.hp=Math.min(G_,this.hp+e),this.popNumber(n?`+${e} ✦`:`+${e}`,W_,t,n?1.4:1))}popNumber(e,t,n,r=1){if(!this.screen(n))return;let i=document.createElement(`div`);i.className=`dmg`,i.textContent=e,i.style.color=t,r!==1&&(i.style.fontSize=`${18*r}px`),i.style.left=`${ov.x+B.randFloatSpread(18)}px`,i.style.top=`${ov.y}px`,i.addEventListener(`animationend`,()=>i.remove()),document.body.append(i)}update(e){this.fill.style.transform=`scaleX(${this.hp/G_})`;let t=this.screen(e);this.bar.hidden=!t,this.bar.classList.toggle(`gone`,this.down),t&&(this.bar.style.transform=`translate(${ov.x}px, ${ov.y}px)`,this.sketch.style.transform=`translate(${ov.x}px, ${ov.y}px)`),this.sketch.classList.toggle(`off`,!t)}screen(e,t=this.head){return ov.copy(this.position),ov.y+=t,ov.project(e),ov.z>1?!1:(ov.set((ov.x+1)/2*innerWidth,(1-ov.y)/2*innerHeight,0),!0)}dispose(){this.bar.remove(),this.sketch.remove()}},mv={earth:`square`,columns:`pentagram`,fire:`triangle`,water:`triangleDown`,blast:`hourglass`,fireStar:`fireStar`,waterStar:`waterStar`,vine:`spiral`,heal:`rhombus`},hv=e=>e.kind===`wall`?`circle`:mv[e.kind===`heal`?`heal`:e.element],gv=class extends pv{tuning;attackTimer;moveTimer=0;dodgeTimer=-1;dodgeFrom=new H;cageSeen=null;cageHold=!1;dodgeAhead=new H;foe=null;charged=null;retarget=0;plan=null;planTimer=0;wallTimer=0;walled=0;ambush=!1;constructor(e,t,n){super(new Hm(e,{...t,speed:n.speed}),t.ink),this.tuning=n,this.attackTimer=B.randFloat(1.5,2.5)}threatened(e,t,n){let r=this.body.ahead(Lg,this.dodgeAhead);Math.min(Math.hypot(e.x-this.position.x,e.z-this.position.z),Math.hypot(e.x-r.x,e.z-r.z))>q_+.1||this.down||this.walled>0||(!this.plan&&this.wallTimer<=0&&!n.onRunes(this.position)&&Math.random()<this.tuning.guard?(this.drawSketch(`circle`,lv),this.raiseWall(t,n)):Math.random()>=this.tuning.dodge||(this.dodgeTimer=this.tuning.reaction*B.randFloat(1,1.5),this.dodgeFrom.copy(e)))}chooseFoe(e){let t=[...e].sort((e,t)=>e.position.distanceToSquared(this.position)-t.position.distanceToSquared(this.position));this.foe=t.length>1&&Math.random()<.45?t[1]:t[0],this.retarget=B.randFloat(4,7)}think(e,t,n,r){let i=this.position;this.retarget-=e,this.ambush&&t.includes(n.heroFighter)?this.foe=n.heroFighter:(!this.foe||!t.includes(this.foe)||this.retarget<=0&&!this.plan)&&this.chooseFoe(t);let a=this.foe,o=a.position;this.wallTimer-=e,this.walled-=e;let s=n.caged(this);s&&s!==this.cageSeen&&(this.cageSeen=s,this.cageHold=Math.random()<this.tuning.dodge);let c=s!==null&&this.cageHold;if(c&&(this.dodgeTimer=-1,this.body.moving&&this.body.halt()),this.dodgeTimer>=0&&(this.dodgeTimer-=e)<0&&this.walled<=0){let e=i.x-this.dodgeFrom.x,t=i.z-this.dodgeFrom.z,n=Math.hypot(e,t);if(n<.001){let n=Math.random()*Math.PI*2;e=Math.sin(n),t=Math.cos(n)}else e/=n,t/=n;let a=new H(this.dodgeFrom.x+e*(q_+.3),0,this.dodgeFrom.z+t*(q_+.3));r(a)&&this.body.setTarget(a),this.moveTimer=1}this.moveTimer-=e;let l=this.tuning.evade>0&&(n.heroArmed||this.tuning.restless)&&!this.ambush&&a===n.heroFighter;if(!c&&this.moveTimer<=0&&(!this.body.moving||l)&&this.walled<=0){this.moveTimer=l?B.randFloat(.4,.85)/this.tuning.evade:B.randFloat(2.5,4);for(let e=0;e<8;e++){let e;if(l){let t=Math.atan2(i.x-o.x,i.z-o.z),n=(Math.random()<.5?-1:1)*Math.PI*B.randFloat(.3,.55),r=B.randFloat(.6,1.2);e=new H(i.x+Math.sin(t+n)*r,0,i.z+Math.cos(t+n)*r);let a=Math.hypot(e.x-o.x,e.z-o.z),s=B.clamp(a,1.3,2.4);e.set(o.x+(e.x-o.x)*s/a,0,o.z+(e.z-o.z)*s/a)}else{let t=Math.random()*Math.PI*2,n=B.randFloat(1.3,2.2);e=new H(o.x+Math.sin(t)*n,0,o.z+Math.cos(t)*n)}if(r(e)){this.body.setTarget(e);break}}}if(this.plan){if((this.planTimer-=e)>0)return;let t=this.plan;this.plan=null,this.act(t,a,n,e);return}if(this.attackTimer-=e,this.attackTimer>0)return;let u=this.pace;this.attackTimer=B.randFloat(...u.cooldown);let d=this.ambush&&a===n.heroFighter?{kind:`strike`,element:`earth`}:this.choose(n,a),f=d.kind!==`strike`||!this.charged||Jg(d.element)?u.draw+(d.kind===`wall`?0:cv):0;d.kind===`strike`&&!n.book(a,f,Jg(d.element)?.24:0,this.tuning.stagger)?this.attackTimer=B.randFloat(.4,.8):f<=0?this.act(d,a,n,e):(this.plan=d,this.planTimer=f,this.drawSketch(hv(d),u.draw))}get floor(){return this.ambush?Z_:0}get pace(){return this.ambush?nv:this.tuning}startAmbush(){this.ambush=!0,this.cancel(),this.charged=null,this.dodgeTimer=-1,this.attackTimer=Y_}choose(e,t){if(this.hp<=50&&Math.random()<this.tuning.heal)return{kind:`heal`};let n=t.position.distanceTo(this.position)<uv;if(this.wallTimer<=0&&this.walled<=0&&!e.onRunes(this.position)&&n&&Math.random()<this.tuning.fortress)return{kind:`wall`};if(!this.charged&&Math.random()<this.tuning.elemental){let t=(Math.random()<.5?[`fire`,`water`]:[`water`,`fire`]).find(t=>e.findSource(t,this.position));if(t)return{kind:`charge`,element:t}}if((this.charged===`fire`||this.charged===`water`)&&Math.random()<this.tuning.blast){let t=this.charged===`fire`?`water`:`fire`;if(e.findSource(t,this.position))return{kind:`charge`,element:t}}return(this.charged===`fire`||this.charged===`water`)&&Math.random()<this.tuning.star?{kind:`strike`,element:this.charged===`fire`?`fireStar`:`waterStar`}:{kind:`strike`,element:this.charged??(Math.random()<this.tuning.columns?`columns`:`earth`)}}raiseWall(e,t){this.body.setTarget(this.position),this.body.face(e),this.body.cast(),t.wallFrom(this,e),this.dodgeTimer=-1,this.walled=Fg,this.moveTimer=Fg,this.wallTimer=this.tuning.wallCooldown,this.tuning.counter&&(this.attackTimer=Math.min(this.attackTimer,.1))}act(e,t,n,r){if(e.kind===`wall`){if(n.onRunes(this.position))return;this.charged=null,this.raiseWall(t.position,n);return}if(e.kind===`heal`){this.charged=null,this.body.cast(),n.healFrom(this);return}if(e.kind===`charge`){let t=n.findSource(e.element,this.position);if(!t)return;let r=this.charged!==null&&this.charged!==`blast`&&this.charged!==e.element;this.charged=r?`blast`:e.element,this.body.face(t),this.body.cast(),n.channel(this,t,e.element),r&&this.drawSketch(`hourglass`,sv),this.attackTimer=B.randFloat(.8,1.4);return}let i=this.pace,a=t.position,o=a.clone();if(i.lead>0&&r>0){let e=i.warn/r;o.x+=(a.x-t.prev.x)*e*i.lead,o.z+=(a.z-t.prev.z)*e*i.lead}let s=Math.random()*Math.PI*2,c=Math.random()*i.aimError;this.ambush&&t===n.heroFighter&&e.element===`earth`?(n.heroAhead(X_,o),o.y=J(o.x,o.z),this.body.face(o),this.body.cast(),n.strikeFrom(this,o,`earth`,X_),this.attackTimer=Y_):(o.x+=Math.sin(s)*c,o.z+=Math.cos(s)*c,o.y=J(o.x,o.z),this.charged=null,this.body.face(o),this.body.cast(),n.strikeFrom(this,o,e.element,i.warn))}cancel(){this.plan=null,this.hideSketch()}dispose(){super.dispose(),this.body.dispose(),this.disposeAura()}},_v=`#c9a36a`,vv=.13,yv=1.4,bv=.7,xv=6,Sv=class extends pv{label=new Th(M.practice.hitMe);obstacle;downFor=-1;constructor(e){super(new wh,_v),this.head=bv,this.body.root.position.copy(e),this.prev.copy(e),this.obstacle={x:e.x,z:e.z,r:vv}}strike(e,t,n,r,i){this.down||(this.body.flash(i),this.hit(e,t,n,r),this.label.dim())}tick(e,t){this.body.update(e),this.down&&(this.downFor+=e),this.update(t);let n=!this.down&&this.screen(t,bv);this.label.place(ov.x,ov.y-xv,n)}dispose(){super.dispose(),this.label.dispose(),this.body.dispose(),this.disposeAura()}},Cv=class{obstacles;spells;camera;onScreen;findSource;onRunes;root=new ki;hero;rivals=[];dummies=[];heroArmed=!1;count=1;level=`normal`;outcome=null;endTimer=0;onEnd=()=>{};onStart=()=>{};onHeroHit=()=>{};onDummyHit=()=>{};onDummyDown=()=>{};held=!1;clock=0;cages=[];played=0;dealt=0;heroStrikeFrom=-1/0;heroStrikeTo=-1/0;constructor(e,t,n,r,i,a,o){this.obstacles=t,this.spells=n,this.camera=r,this.onScreen=i,this.findSource=a,this.onRunes=o,this.hero=new pv(e,rv),n.onStrike=(e,t,n,r,i,a)=>this.strike(e,t,n,r,i,a)}get heroFighter(){return this.hero}heroAhead(e,t){return this.hero.body.ahead(e,t)}ambush(){this.rivals.find(e=>!e.down)?.startAmbush()}get rivalCount(){return this.count}get difficulty(){return this.level}get over(){return this.outcome!==null}get elapsedMs(){return Math.round(this.played*1e3)}get heroDamage(){return Math.round(this.dealt)}setRivals(e){this.count=B.clamp(Math.round(e),0,3),this.respawn()}setDifficulty(e){this.level=e,this.respawn()}wall(e){this.wallFrom(this.hero,e)}wallFrom(e,t){this.spells.wall(e.position,t,e.ink,e)}cast(e,t,n=!1){this.strikeFrom(this.hero,e,t,void 0,n)}stored(e,t){this.hero.drawSketch(e,sv,t),this.heroArmed=t}dropped(){this.hero.hideSketch(),this.heroArmed=!1}foe(){return this.rivals.find(e=>!e.down)?.position??null}hold(e){if(this.held=e,e)for(let e of this.rivals)e.body.setTarget(e.position)}provoke(){let e=this.rivals.find(e=>!e.down);if(!e||this.hero.down)return;let t=this.hero.position,n=new H().setFromMatrixColumn(this.camera.matrixWorld,0).setY(0).normalize(),r=e.position.clone().sub(t);n.dot(r)>0&&n.negate();let i=t.clone().addScaledVector(n,Q_);i.y=J(i.x,i.z),e.body.face(i),e.body.cast(),this.strikeFrom(e,i,`earth`,tv[this.level].warn)}heal(){this.healFrom(this.hero)}healFrom(e){let t=this.onRunes(e.position);e.heal(Math.round(25*(t?U_:1)),this.camera,t),this.spells.heal(e.position,e.ink,t)}book(e,t,n,r){if(e!==this.hero||r<=0)return!0;let i=this.clock+t,a=i+n;return i<this.heroStrikeTo+r&&a>this.heroStrikeFrom-r?!1:(this.heroStrikeFrom=i,this.heroStrikeTo=a,!0)}channel(e,t,n){this.spells.channel(t,e.position,n)}strikeFrom(e,t,n,r,i=!1){let a=this.onRunes(e.position)?Kg:1;if(Jg(n)){let i={x:t.x,z:t.z,reach:Wg*a,caster:e,element:n,standing:0,tips:0,erupted:0,struck:new Set};for(let o of Og(t,Wg*a))this.strikeOne(e,o.at,n,(r??.2)+o.delay,a,!1,i)&&i.tips++;i.tips&&this.cages.push({...i,inside:new Map,born:this.clock})}else this.strikeOne(e,t,n,r,a,i)}strikeOne(e,t,n,r,i,a=!1,o=null){if(this.spells.shielded(t.x,t.z,e))return this.spells.denied(t,e.ink,i),!1;if(this.spells.pillars(e.position,t,n,e,r,e.ink,i,o),!a)for(let n of this.rivals)n!==e&&n.threatened(t,e.position,this);return!0}caged(e){return this.cages.find(t=>(t.standing>0||t.erupted<t.tips)&&t.caster!==e&&t.inside.get(e)===!0&&!t.struck.has(e))??null}updateCages(){let e=[this.hero,...this.rivals];for(let t=this.cages.length-1;t>=0;t--){let n=this.cages[t];if(n.erupted>=n.tips&&n.standing<=0||this.clock-n.born>4)this.cages.splice(t,1);else for(let t of e){if(t===n.caster||t.down)continue;let e=Math.hypot(t.position.x-n.x,t.position.z-n.z)<n.reach,r=n.inside.get(t);n.inside.set(t,e),!(n.standing<=0||r===void 0||r===e||n.struck.has(t)||this.over)&&(this.hurt(t,n.element,n.caster),n.struck.add(t))}}}respawn(){for(let e of this.rivals)this.root.remove(e.body.root),e.dispose();this.rivals=[],this.cages=[],this.clearDummies(),this.held=!1,this.hero.reset(),this.outcome=null,this.endTimer=0,this.played=0,this.dealt=0;let e=this.hero.position;for(let t=0;t<this.count;t++){let n=new gv(this.obstacles,iv[t%iv.length],tv[this.level]),r=Math.random()*Math.PI*2;for(let i=0;i<12;i++){let a=r+t*Math.PI*2/this.count+B.randFloatSpread(.8),o=B.randFloat(1.5,2.1),s=new H(e.x+Math.sin(a)*o,0,e.z+Math.cos(a)*o);if(!((this.obstacles.some(e=>Math.hypot(e.x-s.x,e.z-s.z)<e.r+.12+.05)||!this.onScreen(s))&&i<11)){n.body.root.position.set(s.x,J(s.x,s.z),s.z),n.body.setTarget(n.body.root.position);break}}n.body.face(e),n.prev.copy(n.position),this.rivals.push(n),this.root.add(n.body.root)}this.count===0&&this.spawnDummy(),this.onStart()}targets(){let e=e=>(t,n)=>n.copy(e);return[...this.rivals.filter(e=>!e.down).map(e=>({at:e.position,ahead:(t,n)=>e.body.ahead(t,n)})),...this.dummies.filter(e=>!e.down).map(t=>({at:t.position,ahead:e(t.position)}))]}dummy(){let e=this.dummies[this.dummies.length-1];return e&&!e.down?e.position:null}clearDummies(){for(let e of this.dummies)this.removeDummy(e);this.dummies=[]}removeDummy(e){let t=this.obstacles.indexOf(e.obstacle);t>=0&&this.obstacles.splice(t,1),this.root.remove(e.body.root),e.dispose()}spawnDummy(){let e=this.hero.position,t=Math.atan2(-this.camera.position.x,-this.camera.position.z),n=(t,n)=>Math.hypot(t-e.x,n-e.z)>.8&&this.dummies.every(e=>Math.hypot(t-e.position.x,n-e.position.z)>.6)&&this.obstacles.every(e=>Math.hypot(e.x-t,e.z-n)>e.r+vv+.15)&&this.onScreen(new H(t,0,n)),r=n(0,0)?[0,0]:null;for(let e of[1.3,1.7,2.1])for(let i=0;i<12&&!r;i++){let a=t+(i%2?1:-1)*Math.ceil(i/2)*(Math.PI/6),o=Math.sin(a)*e,s=Math.cos(a)*e;n(o,s)&&(r=[o,s])}let[i,a]=r??[Math.sin(t)*1.3,Math.cos(t)*1.3],o=new Sv(new H(i,J(i,a),a));o.body.face(e),this.obstacles.push(o.obstacle),this.dummies.push(o),this.root.add(o.body.root)}updateDummies(e){let t=this.dummies[this.dummies.length-1];t?.down&&t.downFor>=yv&&this.spawnDummy();for(let t of[...this.dummies]){if(t.tick(e,this.camera),!t.down)continue;let n=this.obstacles.indexOf(t.obstacle);n>=0&&this.obstacles.splice(n,1),t.downFor>=3.9&&t.body.vanish(),t.body.gone&&(this.removeDummy(t),this.dummies.splice(this.dummies.indexOf(t),1))}}strike(e,t,n,r,i,a=null){for(let o of[this.hero,...this.rivals])o===r||o.down||this.over||Math.hypot(o.position.x-e,o.position.z-t)>i+.12||(this.hurt(o,n,r),a?.struck.add(o));let o=i>Vg*qg[n]*1.01;for(let a of this.dummies)a.down||Math.hypot(a.position.x-e,a.position.z-t)>i+vv||(a.strike(H_[n],n,this.camera,o,r?.position),n===`vine`&&!a.down&&this.snare(a,r),r===this.hero&&this.onDummyHit(n,o),a.down&&this.onDummyDown())}hurt(e,t,n){let r=e.hp;if(e.hit(H_[t],t,this.camera),n===this.hero&&(this.dealt+=r-e.hp),t===`vine`&&this.snare(e,n),e===this.hero){for(let e of this.rivals)e.ambush=!1;this.onHeroHit()}}snare(e,t){e.down||(e.body.entangle?.(2),this.spells.snare(e.position,t?.ink??null))}update(e){this.clock+=e,this.outcome?this.endTimer>0&&(this.endTimer-=e)<=0&&this.onEnd(this.outcome):(this.played+=e,this.hero.down?this.outcome=`defeat`:this.rivals.length>0&&this.rivals.every(e=>e.down)&&(this.outcome=`victory`),this.outcome&&(this.endTimer=K_));let t=[this.hero,...this.rivals],n=t.filter(e=>!e.down);for(let t of this.rivals)!t.down&&!this.over&&!this.held?t.think(e,n.filter(e=>e!==t),this,this.onScreen):t.cancel(),t.body.update(e),t.update(this.camera);this.updateDummies(e),this.updateCages(),this.hero.update(this.camera);for(let n of t)n.empower(!n.down&&this.onRunes(n.position),e),n.prev.copy(n.position)}}}));function Tv(){try{return localStorage.getItem(zv)}catch{return`1`}}function Ev(e){try{localStorage.setItem(zv,e)}catch{}}function Dv(){return Ov().rivals??Rv.rivals}function Ov(){try{let e=JSON.parse(localStorage.getItem(Pv)??`null`);if(e)return e;let t=JSON.parse(localStorage.getItem(Fv)??`{}`);return{rivals:t.rivals??Rv.rivals,difficulty:t.difficulty??Rv.difficulty}}catch{return Rv}}function kv(e){try{localStorage.setItem(Pv,JSON.stringify(e))}catch{}}function Av(){let e=Math.random()*2**31|0;return()=>((e=e*16807%2147483647)&65535)/65535}function jv(e,t,n,r,i){let a=[],o=Math.ceil(n*Math.abs(i-r)/Lv);for(let s=0;s<=o;s++){let c=r+(i-r)*s/o;a.push([e+Math.cos(c)*n,t+Math.sin(c)*n])}return a}function Mv(e,t){let n=Math.ceil(Math.hypot(t[0]-e[0],t[1]-e[1])/Lv);return Array.from({length:n+1},(r,i)=>[e[0]+(t[0]-e[0])*i/n,e[1]+(t[1]-e[1])*i/n])}function Nv(e){let t=Ov();t.difficulty&&Iv.includes(t.difficulty)&&e.setDifficulty(t.difficulty),t.rivals!==void 0&&e.setRivals(t.rivals);let n=document.createElement(`div`);n.id=`match`,n.setAttribute(`role`,`toolbar`),n.setAttribute(`aria-label`,M.match.toolbar);let a=()=>{let e=document.createElement(`button`);return e.type=`button`,e.className=`match-btn`,e.innerHTML=`<span class="disc"></span><span class="cap"></span>`,e.addEventListener(`pointerdown`,e=>e.stopPropagation()),e.addEventListener(`pointerup`,e=>e.stopPropagation()),n.append(e),e},o=a();o.classList.add(`rivals`);let s=a();s.classList.add(`level`);let c=document.createElement(`div`);c.id=`match-toast`,c.setAttribute(`role`,`status`),document.body.append(n,c);let l=()=>{let t=e.rivals,n=e.difficulty;o.querySelector(`.disc`).innerHTML=r(t),o.querySelector(`.cap`).innerHTML=M.match.rivalsCap(t),o.setAttribute(`aria-label`,M.match.rivalsAria(t)),s.querySelector(`.disc`).innerHTML=i(Iv.indexOf(n)+1),s.querySelector(`.cap`).textContent=ev[n],s.setAttribute(`aria-label`,M.match.levelAria(ev[n])),s.hidden=t===0,kv({rivals:t,difficulty:n}),u()},u=()=>{n.classList.remove(`snug`,`small`,`tight`);let e=()=>{let e=[`sound-btn`,`rank-btn`,`book-btn`,`help-btn`,`dev-gear`].map(e=>document.getElementById(e)?.getBoundingClientRect().left??1/0).filter(e=>e>0);return Math.min(innerWidth,...e)-8};for(let t of[`snug`,`small`,`tight`]){if(n.getBoundingClientRect().right<=e())return;n.classList.add(t)}};addEventListener(`resize`,u),requestAnimationFrame(u),document.fonts?.ready.then(u);let d=0,f=t=>{l(),t.animate([{transform:`scale(.86)`},{transform:`scale(1.08)`},{transform:`scale(1)`}],{duration:320,easing:`ease-out`}),c.textContent=M.match.restarted(e.rivals,ev[e.difficulty]),c.classList.remove(`show`),c.offsetWidth,c.classList.add(`show`),clearTimeout(d),d=window.setTimeout(()=>c.classList.remove(`show`),1600)},p=document.createElement(`div`);p.id=`match-spot`,p.setAttribute(`role`,`note`),p.hidden=!0,p.innerHTML=`<b>${M.match.spotTitle}</b><span>${M.match.spotBody}</span>`,document.body.append(p);let m=0,h=()=>{clearTimeout(m),n.classList.remove(`spot`),p.hidden=!0},g=()=>{Tv()===`next`&&(Ev(`1`),n.classList.add(`spot`),p.hidden=!1,m=window.setTimeout(h,Bv))},_=()=>{v.hidden=!0,v.classList.remove(`show`),h()};o.addEventListener(`click`,()=>{_(),e.setRivals((e.rivals+1)%4),e.restart(),f(o)}),s.addEventListener(`click`,()=>{_(),e.setDifficulty(Iv[(Iv.indexOf(e.difficulty)+1)%Iv.length]),e.restart(),f(s)}),l();let v=document.createElement(`div`);v.id=`match-end`,v.hidden=!0,v.setAttribute(`role`,`dialog`),v.setAttribute(`aria-modal`,`true`),v.innerHTML=`<div class="card"><h2></h2><p></p><div class="scored" hidden></div><button type="button" class="match-btn again"><span class="cap">${M.match.again}</span></button></div>`;for(let e of[`pointerdown`,`pointerup`,`pointermove`])v.addEventListener(e,e=>e.stopPropagation());document.body.append(v);let y=v.querySelector(`.again`),b=v.querySelector(`.scored`);return y.addEventListener(`click`,()=>{_(),e.restart(),f(y),g()}),Tv()===`next`&&window.setTimeout(g,1200),{scoreSlot:b,showEnd(t){b.hidden=!0,b.innerHTML=``;let n=e.rivals,r=ev[e.difficulty],i=t===`victory`;Zh(i),v.className=i?`victory`:`defeat`,v.querySelector(`h2`).textContent=i?M.match.victory:M.match.defeat,v.querySelector(`p`).textContent=i?M.match.won(n,r):M.match.lost(r),v.setAttribute(`aria-label`,i?M.match.victoryAria:M.match.defeat),v.hidden=!1,v.offsetWidth,v.classList.add(`show`),y.focus({preventScroll:!0}),i&&Tv()===null&&Ev(`next`)}}}var Pv,Fv,Iv,Lv,Rv,zv,Bv,Vv=t((()=>{wv(),Eg(),ge(),O(),Pv=`cirquimia.match`,Fv=`cirquimia.dev`,Iv=Object.keys(ev),Lv=.7,Rv={rivals:1,difficulty:`facil`},zv=`cirquimia.hudspot`,Bv=5e3}));function Hv(e){let t=0,n=0;for(let r of new Set(e))r===`up`?n+=1:r===`down`?--n:r===`right`?t+=1:--t;let r=Math.hypot(t,n);return r?{x:t/r,y:n/r}:{x:0,y:0}}function Uv(e,t,n){let r=Math.hypot(t,n)||1,i={x:t/r,z:n/r},a={x:-i.z,z:i.x};return{x:i.x*e.y+a.x*e.x,z:i.z*e.y+a.z*e.x}}var Wv,Gv,Kv,qv,Jv=t((()=>{Wv={KeyW:`up`,ArrowUp:`up`,KeyS:`down`,ArrowDown:`down`,KeyA:`left`,ArrowLeft:`left`,KeyD:`right`,ArrowRight:`right`},Gv=e=>Wv[e]??null,Kv=()=>matchMedia(`(pointer: fine)`).matches,qv=class{held=new Map;onChange;press(e,t={}){let n=Gv(e);if(!n||t.typing||t.modifier)return!1;if(!this.held.has(e)){let t=![...this.held.values()].includes(n);this.held.set(e,n),t&&this.onChange?.(n,!0)}return!0}release(e){let t=this.held.get(e);return t?(this.held.delete(e),[...this.held.values()].includes(t)||this.onChange?.(t,!1),!0):!1}clear(){for(let e of[...this.held.keys()])this.release(e)}axes(){return Hv(this.held.values())}listen(e,t){e.addEventListener(`keydown`,e=>{let n=e.target,r=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement;(!t()||this.held.has(e.code))&&this.press(e.code,{typing:r,modifier:e.ctrlKey||e.metaKey||e.altKey})&&e.preventDefault()}),e.addEventListener(`keyup`,e=>this.release(e.code)),e.addEventListener(`blur`,()=>this.clear()),document.addEventListener(`visibilitychange`,()=>document.hidden&&this.clear())}}}));function Yv(e,t=40){let n=e[0];return e.every(e=>Math.hypot(e.x-n.x,e.y-n.y)<t)}var Xv,Zv,Qv=t((()=>{Xv=2,Zv=class{canDraw;fingers=new Map;drawer=null;constructor(e=()=>!0){this.canDraw=e}get busy(){return this.fingers.size>0}get isDrawing(){return this.drawer!==null}down(e,t){if(e.primary)for(let e of[...this.fingers.keys()])this.cancel(e,t);if(this.fingers.size>=Xv)return!1;let n=this.fingers.size>0;for(let e of this.fingers.values())e.shared=!0;return this.fingers.set(e.id,{stroke:[{x:e.x,y:e.y}],t:e.t,wandered:!1,shared:n}),!0}move(e,t){let n=Array.isArray(e)?e:[e];if(!n.length)return;let r=n[0].id,i=this.fingers.get(r);if(!i)return;let a=i.stroke[0];for(let e of n){let n={x:e.x,y:e.y};i.stroke.push(n),Math.hypot(e.x-a.x,e.y-a.y)>=40&&(i.wandered=!0),this.drawer===r&&t({type:`drawPoint`,point:n})}let o=n[n.length-1];this.drawer===null&&this.canDraw()&&Math.hypot(o.x-a.x,o.y-a.y)>12&&(this.drawer=r,t({type:`drawStart`,points:i.stroke.slice()}))}up(e,t){let n=this.fingers.get(e.id);if(!n)return;if(this.fingers.delete(e.id),this.drawer===e.id){this.drawer=null,t({type:`drawEnd`,stroke:n.stroke,tapLike:Yv(n.stroke)});return}if(n.wandered)return;let r=n.shared||this.fingers.size>0;if(r&&e.t-n.t>350)return;let i=n.stroke[0];t({type:`tap`,x:i.x,y:i.y,second:r})}cancel(e,t){this.fingers.delete(e)&&this.drawer===e&&(this.drawer=null,t({type:`drawCancel`}))}}}));function $v(e,t,n,r=.22){let i=Math.hypot(e,t);return!n||i<n*r?{x:0,y:0}:{x:e/i,y:-t/i}}function ey(e){return e.travelled<=12?e.reach<=1.3&&e.held>=140:e.reach>3.2||e.total>300||e.travelled<e.path*.72?!1:e.still>=(e.reach>1?110:70)}function ty(){if(!ay())return iy;let e=document.createElement(`div`);e.id=`pad`,e.setAttribute(`aria-hidden`,`true`),e.innerHTML=`<span class="knob"></span>`,document.body.append(e),document.body.classList.add(`has-pad`);let t=e.querySelector(`.knob`),n={x:0,y:0},r=null,i=null,a=()=>{let t=e.getBoundingClientRect(),n=t.width/2;return{cx:t.left+n,cy:t.top+n,radius:n}},o=(e,r)=>{let{cx:i,cy:o,radius:s}=a(),c=e-i,l=r-o;n=$v(c,l,s);let u=Math.hypot(c,l),d=s*.55;u>d&&(c*=d/u,l*=d/u),t.style.transform=`translate(${c}px, ${l}px)`},s=()=>{r=null,i=null,n={x:0,y:0},t.style.transform=``,e.classList.remove(`on`)};return document.addEventListener(`visibilitychange`,()=>document.hidden&&s()),{axes:()=>n,owns:e=>i===e,down(e,t,n,o){if(r||i!==null)return!1;let{cx:s,cy:c,radius:l}=a();return Math.hypot(t-s,n-c)>l*1.3?!1:(r=new ny(e,t,n,o),!0)},move(e,t,n){return i===e?(o(t,n),!0):(r?.id===e&&(r.add(t,n,performance.now()),r.length>300&&(r=null)),!1)},up(e){return i===e?(s(),!0):(r?.id===e&&(r=null),!1)},update(t,n){if(!r)return;let s=r,{cx:c,cy:l,radius:u}=a();ey(s.state(t,c,l,u))&&(r=null,i=s.id,e.classList.add(`on`),o(s.last.x,s.last.y),n(s.id))}}}var ny,ry,iy,ay,oy=t((()=>{Qv(),ny=class{id;samples=[];total=0;far=0;pathAtFar=0;constructor(e,t,n,r){this.id=e,this.samples.push({x:t,y:n,t:r})}get start(){return this.samples[0]}get length(){return this.total}get last(){return this.samples[this.samples.length-1]}add(e,t,n){let r=this.last,i=Math.hypot(e-r.x,t-r.y);if(i<1.5)return;this.total+=i,this.samples.push({x:e,y:t,t:n});let a=Math.hypot(e-this.start.x,t-this.start.y);a>this.far&&(this.far=a,this.pathAtFar=this.total)}state(e,t,n,r){let i=this.last,a=i.t;for(let e=this.samples.length-1;e>=0;e--){let t=this.samples[e];if(Math.hypot(t.x-i.x,t.y-i.y)>9)break;a=t.t}return{held:e-this.start.t,travelled:this.far,path:this.pathAtFar,total:this.total,still:e-a,reach:Math.hypot(i.x-t,i.y-n)/r}}},ry=()=>matchMedia(`(pointer: coarse)`).matches,iy={axes:()=>({x:0,y:0}),down:()=>!1,move:()=>!1,up:()=>!1,update:()=>{},owns:()=>!1},ay=()=>ry()&&new URLSearchParams(location.search).get(`pad`)!==`0`})),sy,cy=t((()=>{sy=new URL(`move-Dt4ZHnO2.webp`,import.meta.url).href})),ly,uy=t((()=>{ly=new URL(`draw-CHK-_u9M.webp`,import.meta.url).href})),dy,fy=t((()=>{dy=new URL(`use-XIpQy4bU.webp`,import.meta.url).href}));function py(e){return e.slice(1).flatMap((t,n)=>Mv(e[n],t).slice(+!!n))}function my(e,t,n,r=!0){let i=6.5*n,a=(n,r)=>`M${(e+Math.cos(n)*i).toFixed(1)} ${(t+Math.sin(n)*i).toFixed(1)}A${i} ${i} 0 0 1 ${(e+Math.cos(r)*i).toFixed(1)} ${(t+Math.sin(r)*i).toFixed(1)}`;return(r?`<path class="tap" d="${a(-2.75,-1.95)}${a(-1.2,-.4)}"/>`:``)+`<g class="hand" transform="translate(${e} ${t}) rotate(-12) scale(${n})"><path d="${xy}"/><path class="knuckles" d="${Sy}"/></g>`}function hy(e,t,n){let r=py(e),i=[];if(t){let e=r.length/(t*2-1);for(let n=0;n<t;n++)i.push(r.slice(Math.round(n*2*e),Math.round((n*2+1)*e)+1))}else i.push(r);let[a,o]=e.slice(-2),s=Math.atan2(o[1]-a[1],o[0]-a[0]);for(let e of[-1,1])i.push(Mv(o,[o[0]-Math.cos(s+e*.55)*9,o[1]-Math.sin(s+e*.55)*9]));return i.map(e=>Wm(e,3.4,n).ink).join(``)}function gy(e){ky=e}function _y(e,t,n,r){return`<div class="book ${e}" tabindex="-1"><button type="button" class="x" aria-label="${M.help.close}">×</button><h2 id="help-title">${t}</h2><div class="pages">${n.map((e,t)=>`<section class="page" aria-label="${r(t+1,n.length)}">${e}</section>`).join(``)}</div><div class="turn"><button type="button" class="back">${v()}<span class="cap"></span></button><span class="folio" aria-live="polite"><span aria-hidden="true"></span><span class="sr"></span></span><button type="button" class="go"><span class="cap"></span>${v()}</button></div></div>`}function vy(){let e=Av(),t=ay(),n=M.help.slides.map(([e,n],r)=>({shot:wy[r],overlay:r===0&&t?e=>Ty+Cy[0](e):Cy[r],title:e,text:r===0?Kv()?M.keys.move:t?M.help.pad:n:n})).map(({shot:t,overlay:n,title:r,text:i},a)=>`<figure class="shot"><img src="${t}" alt="" draggable="false"><svg viewBox="0 0 312 234" aria-hidden="true">${n(e)}</svg></figure><h3><span class="num">${a+1}</span>${r}</h3><p>${i}</p>`);return _y(`guide`,M.help.title,n,M.help.slideOf)}function yy(){let e=[`I`,`II`,`III`,`IV`,`V`,`VI`,`VII`],t=Ey.map((t,n)=>`<li${Oy.includes(t.kind)?Ay(t.kind):``}><span class="rn">${e[n]}</span>${jy(t.kind,Ym(t.kind,!0))}<b>${M.help.names[t.kind]}</b>`+(t.source?`<span class="src">${t.source===`fire`?m():h()}</span>`:``)+`<span class="lead"></span><span class="val${t.effect?` val-${t.effect}`:` val-def`}">${t.effect===`heal`?`+`:``}${t.value}</span></li>`).join(``),n=`<p class="legend"><span class="val-dmg">${Dy.dmg}</span> · <span class="val-heal">${Dy.heal}</span> · <span class="val-root">${Dy.root}</span></p>`,r=`<h3>${M.help.sourcesTitle}</h3><ul class="notes"><li><span class="src">${m()}</span><span>${M.help.fireNote}</span></li><li><span class="src">${h()}</span><span>${M.help.waterNote}</span></li><li${Ay(`rune`)}><span class="src rune">${g()}</span><span>${M.help.runesNote}</span></li></ul>`,i=ky?Oy.filter(e=>ky.has(e)).length:0,a=ky?`<p class="training">${i===Oy.length?M.practice.allDone:M.practice.progress(i,Oy.length)}</p>`:``,o=e=>jy(e===`pentagram`?e:`${e} charged`,Ym(e,!0)),s=(e,t,n,r)=>`<div class="combo"${Ay(n)}>${o(e)}<span class="op">+</span>${o(t)}<span class="op">=</span><span class="out">${jy(n,Ym(n,!0))}<b>${M.help.names[n]}</b><span class="val val-dmg"><small>${Dy.dmg}</small> ${r}</span></span></div>`,c=`<h3>${M.help.comboTitle}</h3>`+s(`triangle`,`triangleDown`,`hourglass`,`45`)+s(`pentagram`,`triangle`,`fireStar`,`5×20`)+s(`pentagram`,`triangleDown`,`waterStar`,`5×20`)+`<p class="combo-note">${M.help.comboNote}</p>`;return _y(`manual`,M.help.shapesTitle,[`${a}<ol class="shapes">${t}</ol>${n}`,r,c],M.help.pageOf)}function by(){let e=document.createElement(`button`);e.type=`button`,e.id=`help-btn`,e.setAttribute(`aria-label`,M.help.button),e.innerHTML=o();let t=document.createElement(`button`);t.type=`button`,t.id=`book-btn`,t.setAttribute(`aria-label`,M.help.symbolsButton),t.innerHTML=a();let n=document.createElement(`div`);n.id=`help`,n.hidden=!0,n.setAttribute(`role`,`dialog`),n.setAttribute(`aria-modal`,`true`),n.setAttribute(`aria-labelledby`,`help-title`);for(let r of[e,t,n])for(let e of[`pointerdown`,`pointerup`,`pointermove`])r.addEventListener(e,e=>e.stopPropagation());document.body.append(t,e,n);let r=()=>n.style.setProperty(`--seen`,`${Math.round(visualViewport?.height??innerHeight)}px`);visualViewport?.addEventListener(`resize`,r),addEventListener(`resize`,r),r();let i=!1,s=null,c=null,l=e=>{i||(s=document.activeElement instanceof HTMLElement&&document.activeElement!==document.body?document.activeElement:null),n.innerHTML=e===`guide`?vy():yy(),n.append(de(pe===`es`?`en`:`es`,`lang`)),n.querySelector(`.x`).addEventListener(`click`,d),c=e===`guide`?u(M.help.go):u(M.help.ok,M.help.howTo,()=>l(`guide`)),n.hidden=!1,i=!0,n.offsetWidth,n.classList.add(`show`),n.querySelector(`.book`).focus({preventScroll:!0})};function u(e,t,r){let i=[...n.querySelectorAll(`.page`)],a=n.querySelector(`.pages`),o=n.querySelector(`.back`),s=n.querySelector(`.go`),[c,l]=n.querySelectorAll(`.folio span`),u=i.map(e=>e.getAttribute(`aria-label`)),f=i.length-1,p=0,m=0,h=()=>{i.forEach((e,t)=>{e.inert=t!==p,e.classList.toggle(`more`,t<f)}),c.textContent=`${p+1} / ${i.length}`,l.textContent=u[p];let n=p<f;s.classList.toggle(`seal`,!n),s.querySelector(`.cap`).textContent=n?M.help.next:e,o.querySelector(`.cap`).textContent=p===0&&t?t:M.help.back,o.classList.toggle(`hide`,p===0&&!t)},g=e=>{if(m||e<0||e>f||e===p)return;let t=i[p],n=i[e],r=e>p;p=e,h(),matchMedia(`(prefers-reduced-motion: reduce)`).matches?(t.classList.remove(`on`),n.classList.add(`on`)):(r?(n.classList.add(`under`),t.classList.add(`leaf-out`)):(t.classList.add(`under`),t.classList.remove(`on`),n.classList.add(`on`,`leaf-in`)),m=window.setTimeout(()=>{t.classList.remove(`on`,`under`,`leaf-out`),n.classList.remove(`under`,`leaf-in`),n.classList.add(`on`),m=0},520))},_=null;return a.addEventListener(`pointerdown`,e=>_={x:e.clientX,y:e.clientY}),a.addEventListener(`pointercancel`,()=>_=null),a.addEventListener(`pointerup`,e=>{if(!_)return;let t=e.clientX-_.x,n=e.clientY-_.y;if(_=null,Math.abs(t)>40&&Math.abs(t)>Math.abs(n)*1.2)g(p+(t<0?1:-1));else if(Math.hypot(t,n)<10){let t=a.getBoundingClientRect(),n=(e.clientX-t.left)/t.width;n>.72?g(p+1):n<.28&&g(p-1)}}),o.addEventListener(`click`,()=>p===0?r?.():g(p-1)),s.addEventListener(`click`,()=>p===f?d():g(p+1)),i[0].classList.add(`on`),h(),e=>g(p+e)}function d(){i&&(i=!1,n.classList.remove(`show`),setTimeout(()=>{i||(n.hidden=!0)},300),s?.isConnected?s.focus({preventScroll:!0}):document.activeElement?.blur())}return e.addEventListener(`click`,()=>l(`guide`)),t.addEventListener(`click`,()=>l(`symbols`)),n.addEventListener(`click`,e=>{e.target===n&&d()}),addEventListener(`keydown`,e=>{if(i){if(e.key===`Escape`)d();else if(e.key===`ArrowRight`||e.key===`ArrowLeft`)c?.(e.key===`ArrowRight`?1:-1);else if(e.key===`Tab`){let t=[...n.querySelectorAll(`button:not(.hide), a`)].filter(e=>!e.closest(`[inert]`)),r=t.indexOf(document.activeElement);(e.shiftKey?r<=0:r===t.length-1)&&(e.preventDefault(),t[e.shiftKey?t.length-1:0]?.focus())}}}),{get open(){return i}}}var xy,Sy,Cy,wy,Ty,Ey,Dy,Oy,ky,Ay,jy,My=t((()=>{ih(),Vv(),Jv(),oy(),ge(),O(),cy(),uy(),fy(),xy=`M-2.6 2.6A2.6 2.6 0 0 1 2.6 2.6V9.6C2.6 7.6 6.4 7.6 6.4 9.8C6.4 8.2 9.8 8.2 9.8 10.4C9.8 9.2 12.9 9.4 12.9 11.6V17C12.9 21.2 10.4 24 6.4 24H3.2C0.8 24-0.8 23-2.2 21.4L-6.9 15.8C-7.9 14.5-6.4 12.8-4.9 13.8L-2.6 15.4Z`,Sy=`M6.4 9.8V12.6M9.8 10.4V13`,Cy=[e=>`<path class="arrow" d="${hy([[200,118],[246,103]],3,e)}"/>`+my(261,99,1.4),e=>`<path class="arrow" d="${hy([[114,70],[150,92],[170,138]],0,e)}"/>`+my(33,10,1.4,!1),()=>my(132,112,1.4)],wy=[sy,ly,dy],Ty=`<g class="pad"><circle cx="58" cy="178" r="34"/><circle class="knob" cx="72" cy="164" r="13"/></g>`,Ey=[{kind:`circle`,value:M.help.defence},{kind:`square`,effect:`dmg`,value:`20`},{kind:`triangle`,effect:`dmg`,value:`35`,source:`fire`},{kind:`triangleDown`,effect:`dmg`,value:`35`,source:`water`},{kind:`rhombus`,effect:`heal`,value:`25`},{kind:`pentagram`,effect:`dmg`,value:`5×10`},{kind:`spiral`,effect:`root`,value:`2 s`}],Dy={dmg:M.help.damage,heal:M.help.healing,root:M.help.rooting},Oy=[`square`,`pentagram`,`triangle`,`triangleDown`,`spiral`,`hourglass`,`fireStar`,`waterStar`,`rune`],ky=null,Ay=e=>ky?` class="${ky.has(e)?`tried`:`todo`}"`:``,jy=(e,t)=>`<span class="fig ${e}">${t}</span>`}));function Ny(){try{new URLSearchParams(location.search).has(`tutorial`)&&localStorage.removeItem(Ly);let e=localStorage.getItem(Ly);return e===`moved`||e===`square`||e===`done`?e:``}catch{return``}}function Py(e){try{localStorage.setItem(Ly,e)}catch{}}function Fy(e){return()=>((e=e*16807%2147483647)&65535)/65535}function Iy(e){if(e===`circle`)return jv(24,24,15,-2.3,-2.3+Math.PI*2.12);let t=[[10,10],[38,10],[38,38],[10,38],[10,10],[17,10]];return t.slice(1).flatMap((e,n)=>Mv(t[n],e).slice(+!!n))}var Ly,Ry,zy,By,Vy,Hy,Uy,Wy,Gy,Ky,qy,Jy,Yy,Xy=t((()=>{O(),ih(),Vv(),ge(),My(),Jv(),oy(),Ly=`cirquimia.tutorial`,Ry=.6,zy=.7,By=1.4,Vy=.35,Hy=1.6,Uy=1.7,Wy=.8,Gy=.3,Ky=1.4,qy=M.tutorial,Jy=M.tutorial.wrong,Yy=class{host;stage=Ny();lesson=null;step=`draw`;timer=0;wait=Ry;hitWait=-1;pending=null;provoked=!1;ambushed=!1;demoTime=0;goal=null;root=document.createElement(`div`);dim=document.createElement(`div`);demo=document.createElement(`div`);arrow=document.createElement(`div`);mark=document.createElement(`div`);padHand=document.createElement(`div`);card=document.createElement(`div`);title=document.createElement(`b`);body=document.createElement(`span`);hintTimer=0;shown=0;constructor(e){this.host=e,this.root.id=`tutorial`,this.root.hidden=!0,this.dim.className=`dim`,this.demo.className=`demo`,this.arrow.className=`arrow`,this.arrow.innerHTML=_(),this.card.className=`tip`,this.card.setAttribute(`role`,`status`),this.card.append(this.title,this.body),this.mark.className=`mark`,this.mark.innerHTML=`<i></i><svg viewBox="-16 -8 40 40" aria-hidden="true">${my(0,0,1,!0)}</svg>`,this.padHand.className=`pad-hand`,this.padHand.innerHTML=`<svg viewBox="-16 -8 40 40" aria-hidden="true">${my(0,0,1,!1)}</svg>`,this.root.append(this.dim,this.mark,this.padHand,this.demo,this.arrow,this.card),document.body.append(this.root)}get showing(){return!this.root.hidden&&this.root.classList.contains(`show`)}get done(){return this.stage===`done`}get paused(){return this.lesson!==null&&this.step!==`watch`&&this.step!==`walk`}get canDraw(){return this.lesson===null||this.step===`draw`}get canTap(){return this.lesson===null||this.step===`aim`||this.step===`walk`}drawn(e){return!this.lesson||this.step!==`draw`||this.lesson===`move`?!0:e===this.lesson?(this.go(`aim`),!0):(this.hint(Jy[this.lesson]),!1)}aim(){return this.lesson&&this.step===`aim`?this.host.foe():null}cast(){this.lesson&&this.step===`aim`&&(this.host.hold(!0),this.provoked=!1,this.go(`watch`))}hurt(){this.stage===`square`&&!this.lesson&&!this.pending&&this.hitWait<0&&(this.hitWait=zy)}note(e,t){this.lesson||(this.root.hidden=!1,this.root.dataset.lesson=``,this.root.dataset.step=`done`,this.root.offsetWidth,this.root.classList.add(`show`),this.say(e,t),this.fadeSoon(3e3))}reset(){this.host.hold(!1),this.hitWait=-1,this.ambushed=!1,this.lesson&&this.begin(this.lesson)}update(e){let t=this.host.covered();this.root.classList.toggle(`covered`,t),!t&&(this.lesson?this.lesson===`move`?this.walkLesson():this.host.foe()?(this.timer+=e,this.step===`draw`?this.animateDemo(e):this.step===`aim`?this.host.selected()===this.lesson?this.pointAtFoe():this.go(`draw`):this.step===`watch`&&(this.lesson===`circle`&&!this.provoked&&this.timer>=Vy&&(this.provoked=!0,this.host.provoke()),this.timer>=(this.lesson===`square`?By:Hy)&&this.finish())):this.shelve():(this.stage===``&&(this.wait-=e)<=0&&this.begin(`move`),this.stage===`moved`&&this.host.foe()&&(this.wait-=e)<=0&&this.begin(`square`),this.stage===`square`&&!this.ambushed&&this.hitWait<0&&!this.pending&&this.host.foe()&&(this.ambushed=!0,this.host.ambush()),this.hitWait>=0&&(this.hitWait-=e)<0&&(this.pending=`circle`),this.pending===`circle`&&this.host.foe()&&this.begin(`circle`)))}begin(e){if(this.shown++,this.lesson=e,this.pending=null,this.root.hidden=!1,this.root.dataset.lesson=e,this.root.offsetWidth,this.root.classList.add(`show`),e===`move`){if(this.goal=this.host.walkGoal(),!this.goal){this.lesson=null,this.stage=`moved`,Py(this.stage);return}this.host.hold(!0),this.go(`walk`)}else this.go(`draw`)}walkLesson(){let e=this.goal,t=this.host.toScreen(e,0);this.mark.style.transform=`translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px)`,this.spot(t.x,t.y,70);let n=document.getElementById(`pad`)?.getBoundingClientRect();n&&ay()&&(this.padHand.style.transform=`translate(${(n.left+n.width/2).toFixed(1)}px, ${(n.top+n.height/2).toFixed(1)}px)`);let r=this.host.hero();Math.hypot(r.x-e.x,r.z-e.z)<Gy&&this.finish()}go(e){if(this.step=e,this.timer=0,this.demoTime=0,this.root.dataset.step=e,this.lesson===`move`){let e=M.tutorial.move;this.root.classList.toggle(`with-pad`,ay()),this.say(...Kv()?e.keys:ay()?e.pad:e.walk),this.demo.innerHTML=``;return}let t=qy[this.lesson];e===`watch`?this.say(t.watch,``):this.say(...t[e]),e!==`draw`&&(this.demo.innerHTML=``)}shelve(){this.host.hold(!1),this.host.deselect(),this.pending=this.lesson===`circle`?`circle`:null,this.goal=null,this.lesson=null,this.root.classList.remove(`show`),this.root.hidden=!0}finish(){let e=this.lesson;this.host.hold(!1),this.lesson=null,this.goal=null,this.stage=e===`move`?`moved`:e===`square`?`square`:`done`,Py(this.stage),this.root.dataset.step=`done`,this.say(e===`move`?M.tutorial.move.done:qy[e].done,``),e===`move`&&(this.wait=Ky),this.fadeSoon(2200),e===`circle`&&this.host.finished()}fadeSoon(e){clearTimeout(this.hintTimer);let t=++this.shown;this.hintTimer=window.setTimeout(()=>{this.lesson||t!==this.shown||(this.root.classList.remove(`show`),setTimeout(()=>{!this.lesson&&t===this.shown&&(this.root.hidden=!0)},300))},e)}say(e,t){this.title.textContent=e,this.body.textContent=t,this.body.hidden=!t,this.card.classList.remove(`wrong`),this.card.animate([{transform:`translate(-50%, -6px)`,opacity:0},{transform:`translate(-50%, 0)`,opacity:1}],{duration:260,easing:`ease-out`})}hint(e){this.body.textContent=e,this.body.hidden=!1,this.card.classList.add(`wrong`),this.card.animate([0,-6,6,-4,4,0].map(e=>({transform:`translate(calc(-50% + ${e}px), 0)`})),{duration:300})}animateDemo(e){this.demoTime=(this.demoTime+e)%2.5;let t=Iy(this.lesson),n=Math.min(1,this.demoTime/Uy),r=n<.5?2*n*n:1-(-2*n+2)**2/2,i=Math.max(2,Math.round(t.length*r)),a=t.slice(0,i),o=Wm(a,3.4,Fy(11),this.lesson===`square`?[0,28,56,84,112]:[]),[s,c]=a[a.length-1],l=this.demoTime>Uy?1-(this.demoTime-Uy)/Wy:1,u=t.map((e,t)=>`${t?`L`:`M`}${e[0].toFixed(1)} ${e[1].toFixed(1)}`).join(``);this.demo.innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true"><path class="guide" d="${u}"/><g style="opacity:${l.toFixed(2)}"><path class="stroke" d="${o.ink}"/>`+(n<1?`<circle class="finger" cx="${s.toFixed(1)}" cy="${c.toFixed(1)}" r="3.2"/>`:``)+`</g></svg>`,this.spot(innerWidth/2,innerHeight*.42,110)}pointAtFoe(){let e=this.host.foe();if(!e)return;let t=this.host.toScreen(e,.75),n=this.host.toScreen(e,.3);this.placeArrow(t.x,t.y-18),this.spot(n.x,n.y,60)}placeArrow(e,t){this.arrow.style.transform=`translate(${e.toFixed(1)}px, ${t.toFixed(1)}px)`}spot(e,t,n){this.dim.style.setProperty(`--x`,`${e.toFixed(1)}px`),this.dim.style.setProperty(`--y`,`${t.toFixed(1)}px`),this.dim.style.setProperty(`--r`,`${n.toFixed(1)}px`)}}})),Zy,Qy,$y=t((()=>{Id(),Xd(),Zy=.7,Qy=class{size;mesh;material;age=Zy;constructor(e=`#fff6c9`,t=1){this.size=t,this.material=new Ha({color:e,transparent:!0,depthWrite:!1}),this.mesh=new G(new ls(.1,.14,24).rotateX(-Math.PI/2),this.material),this.mesh.visible=!1,this.mesh.renderOrder=1}show(e,t){this.mesh.position.set(e,J(e,t)+.04,t),this.age=0,this.mesh.visible=!0}update(e){if(this.age>=Zy)return;this.age+=e;let t=Math.min(1,this.age/Zy);this.mesh.scale.setScalar((.6+t*1.2)*this.size),this.material.opacity=1-t,t>=1&&(this.mesh.visible=!1)}}}));function eb(e){return{name:`TiltShift_${e}`,uniforms:{tDiffuse:{value:null},texel:{value:new V(e===`horizontal`?1/512:0,e===`vertical`?1/512:0)},focus:{value:.5},band:{value:.1},strength:{value:2.2}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform sampler2D tDiffuse;
      uniform vec2 texel;
      uniform float focus;
      uniform float band;
      uniform float strength;
      #ifdef BLOOM
        uniform sampler2D tBloom;
      #endif
      varying vec2 vUv;
      void main() {
        float amount = smoothstep(band, band + 0.4, abs(vUv.y - focus)) * strength;
        if (amount == 0.0) {
          // Inside the focus band all nine taps land on the same texel: one fetch gives the same result.
          gl_FragColor = texture2D(tDiffuse, vUv);
        } else {
          vec2 step = texel * amount;
          vec4 sum = texture2D(tDiffuse, vUv) * 0.1633;
          sum += (texture2D(tDiffuse, vUv - step) + texture2D(tDiffuse, vUv + step)) * 0.1531;
          sum += (texture2D(tDiffuse, vUv - 2.0 * step) + texture2D(tDiffuse, vUv + 2.0 * step)) * 0.12245;
          sum += (texture2D(tDiffuse, vUv - 3.0 * step) + texture2D(tDiffuse, vUv + 3.0 * step)) * 0.0918;
          sum += (texture2D(tDiffuse, vUv - 4.0 * step) + texture2D(tDiffuse, vUv + 4.0 * step)) * 0.051;
          gl_FragColor = sum;
        }
        #ifdef BLOOM
          gl_FragColor.rgb += texture2D(tBloom, vUv).rgb * 0.55;
        #endif
        #ifdef GRADE
          vec3 c = gl_FragColor.rgb;
          float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(luma), c, 1.06);
          // Shadows lean warm amber, highlights stay golden-neutral.
          c += vec3(0.022, 0.012, -0.004) * (1.0 - smoothstep(0.0, 0.35, luma));
          vec2 v = vUv - 0.5;
          c *= 1.0 - dot(v, v) * 0.55;
          gl_FragColor.rgb = max(c, 0.0);
        #endif
        // Only active when drawing to the canvas (the last pass): tone mapping and sRGB output.
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`}}var tb=t((()=>{Id()}));function nb(e,t){let n=Sb.find(([n,r])=>e===n&&t===r||e===r&&t===n);return n?n[2]:t}function rb(e,t){let n=0;for(let t=1;t<e.length;t++)n+=ab(e[t-1],e[t]);let r=n/(t-1),i=[e[0]],a=0,o=e[0];for(let n=1;n<e.length;n++){let s=e[n],c=ab(o,s);for(;a+c>=r&&i.length<t;){let e=(r-a)/c,t={x:o.x+(s.x-o.x)*e,y:o.y+(s.y-o.y)*e};i.push(t),o=t,c=ab(o,s),a=0}a+=c,o=s}for(;i.length<t;)i.push(e[e.length-1]);return i}function ib(e,t){let n=e;for(let e=0;e<t;e++){let e=n.length;n=n.map((t,r)=>{let i=n[(r-1+e)%e],a=n[(r+1)%e];return{x:(i.x+2*t.x+a.x)/4,y:(i.y+2*t.y+a.y)/4}})}return n}function ab(e,t){return Math.hypot(e.x-t.x,e.y-t.y)}function ob(e,t){if(e.length<3)return e.slice();let n=e[0],r=e[e.length-1],i=0,a=0;for(let t=1;t<e.length-1;t++){let o=sb(e[t],n,r);o>i&&(i=o,a=t)}if(i<=t)return[n,r];let o=ob(e.slice(0,a+1),t),s=ob(e.slice(a),t);return o.slice(0,-1).concat(s)}function sb(e,t,n){let r=n.x-t.x,i=n.y-t.y,a=r*r+i*i,o=a===0?0:Math.max(0,Math.min(1,((e.x-t.x)*r+(e.y-t.y)*i)/a));return Math.hypot(e.x-(t.x+o*r),e.y-(t.y+o*i))}function cb(e,t,n){let r=Math.atan2(e.y-t.y,e.x-t.x),i=Math.atan2(n.y-t.y,n.x-t.x),a=Math.abs(r-i);return a>Math.PI&&(a=2*Math.PI-a),a*180/Math.PI}function lb(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+ab(e[n-1],e[n]));let n=t[t.length-1],r=e.length-1,i=1/0;for(let a=e.length-1;a>0&&t[a]>n*.65;a--){let t=ab(e[a],e[0]);t<i&&(i=t,r=a)}return i>ab(e[e.length-1],e[0])*.5?e:e.slice(0,r+1)}function ub(e,t,n,r){let i=(t.x-e.x)*(r.y-n.y)-(t.y-e.y)*(r.x-n.x);if(i===0)return null;let a=((n.x-e.x)*(r.y-n.y)-(n.y-e.y)*(r.x-n.x))/i,o=((n.x-e.x)*(t.y-e.y)-(n.y-e.y)*(t.x-e.x))/i;return a<0||a>1||o<0||o>1?null:{x:e.x+(t.x-e.x)*a,y:e.y+(t.y-e.y)*a}}function db(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+ab(e[n-1],e[n]));let n=t[t.length-1];for(let r=1;r<e.length&&t[r]<n*.25;r++)for(let i=e.length-1;i>r+1&&t[i-1]>n*.75;i--){let t=ub(e[r-1],e[r],e[i-1],e[i]);if(t)return[t,...e.slice(r,i),t]}return e}function fb(e,t,n){let r=0;for(let i=1;i<e.length;i++){let a=Math.atan2(e[i].y-n,e[i].x-t)-Math.atan2(e[i-1].y-n,e[i-1].x-t);a>Math.PI&&(a-=2*Math.PI),a<-Math.PI&&(a+=2*Math.PI),r+=a}return r}function pb(e){let t=_b(e);if(t)return t;let n=[0];for(let t=1;t<e.length;t++)n.push(n[t-1]+ab(e[t-1],e[t]));let r=n[n.length-1];for(let t of hb(e,n)){let i=mb(e.slice(0,t+1));if(i)return{...i,laps:r/n[t]}}return mb(e)}function mb(e){let t=gb(e,0);if(t&&t.kind!==`circle`)return t;let n=gb(e,2);return n&&n.kind!==`circle`?n:t}function hb(e,t){let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t of e)n=Math.min(n,t.x),r=Math.min(r,t.y),i=Math.max(i,t.x),a=Math.max(a,t.y);let o=Math.hypot(i-n,a-r),s=o*Vb,c=t[t.length-1],l=[],u=-1;for(let n=1;n<e.length;n++){if(t[n]<o*Hb||c-t[n]<o*Hb*.5)continue;let r=ab(e[n],e[0]);r<s?(u<0||r<ab(e[u],e[0]))&&(u=n):u>=0&&(l.push(u),u=-1)}return u>=0&&l.push(u),l}function gb(e,t){if(e.length<8)return null;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let t of e)n=Math.min(n,t.x),r=Math.min(r,t.y),i=Math.max(i,t.x),a=Math.max(a,t.y);let o=Math.hypot(i-n,a-r);if(o<Cb||(e=db(e),e=lb(lb(e).reverse()).reverse(),ab(e[0],e[e.length-1])>o*wb))return null;let s=ib(rb(e,64),t),c=0,l=0;for(let e of s)c+=e.x,l+=e.y;c/=s.length,l/=s.length;let u=ob(s.concat([s[0]]),o*.09);for(u=u.slice(0,-1);u.length>3;){let e=u.length,t=-1,n=0;for(let r=0;r<e;r++){let i=cb(u[(r-1+e)%e],u[r],u[(r+1)%e]);i>n&&(n=i,t=r)}if(n<150)break;u.splice(t,1)}let d=u.map((e,t)=>cb(u[(t-1+u.length)%u.length],e,u[(t+1)%u.length])),f=e=>({x:e.reduce((e,t)=>e+t.x,0)/e.length,y:e.reduce((e,t)=>e+t.y,0)/e.length});if(u.length===3&&Math.min(...d)>=Db){let e=f(u),t=Math.max(...u.map(t=>Math.hypot(t.x-e.x,t.y-e.y))),n=u.map(e=>e.y).sort((e,t)=>e-t);return{kind:n[1]-n[0]>n[2]-n[1]?`triangle`:`triangleDown`,cx:e.x,cy:e.y,r:t,corners:u}}if(u.length===4){let e=u.map((e,t)=>ab(e,u[(t+1)%4])),t=Math.min(...e)/Math.max(...e)>=kb,n=f(u),r=0,i=0;u.forEach((e,t)=>{let n=u[(t+1)%4],a=Math.atan2(n.y-e.y,n.x-e.x)*4;r+=Math.cos(a),i+=Math.sin(a)});let a=Math.atan2(i,r)/4,o=Math.abs(a*180/Math.PI);if(t&&o<=Ab&&Math.max(...d.map(e=>Math.abs(e-90)))<=Ob){let t=e.reduce((e,t)=>e+t,0)/8,r=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([e,r])=>({x:n.x+(e*Math.cos(a)-r*Math.sin(a))*t,y:n.y+(e*Math.sin(a)+r*Math.cos(a))*t}));return{kind:`square`,cx:n.x,cy:n.y,r:t*Math.SQRT2,corners:r}}if(t&&Math.min(...d)>=jb&&Math.abs(d[0]-d[2])<=Mb&&Math.abs(d[1]-d[3])<=Mb){let e={x:(u[2].x-u[0].x)/2,y:(u[2].y-u[0].y)/2},t={x:(u[3].x-u[1].x)/2,y:(u[3].y-u[1].y)/2},r=Math.hypot(e.x,e.y),i=Math.hypot(t.x,t.y),a={x:e.x/r,y:e.y/r},o=Math.sign(a.x*t.y-a.y*t.x)||1,s={x:-a.y*o,y:a.x*o},c=[{x:n.x-a.x*r,y:n.y-a.y*r},{x:n.x-s.x*i,y:n.y-s.y*i},{x:n.x+a.x*r,y:n.y+a.y*r},{x:n.x+s.x*i,y:n.y+s.y*i}];return{kind:`rhombus`,cx:n.x,cy:n.y,r:Math.max(r,i),corners:c}}}if(u.length===5&&Math.max(...d)<=Nb){let e=f(u),t=u.map(t=>Math.hypot(t.x-e.x,t.y-e.y)),n=t.reduce((e,t)=>e+t,0)/5;if(Math.sqrt(t.reduce((e,t)=>e+(t-n)**2,0)/5)/n<=Pb&&Math.abs(fb(s,e.x,e.y))>Math.PI*3.2){let t=u.map(t=>Math.atan2(t.y-e.y,t.x-e.x)),r=Math.atan2(t.reduce((e,t)=>e+Math.sin(5*t),0),t.reduce((e,t)=>e+Math.cos(5*t),0))/5,i=Math.PI*2/5,a=t.map(t=>{let a=r+Math.round((t-r)/i)*i;return{x:e.x+Math.cos(a)*n,y:e.y+Math.sin(a)*n}});return{kind:`pentagram`,cx:e.x,cy:e.y,r:n,corners:a}}}let p=0;for(let e of s)p+=Math.hypot(e.x-c,e.y-l);p/=s.length;let m=0;for(let e of s)m+=(Math.hypot(e.x-c,e.y-l)-p)**2;let h=Math.sqrt(m/s.length)/p,g=fb(s,c,l);if(h<Tb*1.5&&Math.abs(g)>Eb){let e=e=>{let t=0,n=0;for(let r of s){let i=Math.atan2(r.y-l,r.x-c)*e,a=Math.hypot(r.x-c,r.y-l)/p-1;t+=a*Math.cos(i),n+=a*Math.sin(i)}return{amp:2*Math.hypot(t,n)/s.length,phase:Math.atan2(n,t)}},t=e(4),n=Math.hypot(...[2,3,5,6,7,9,10].map(t=>e(t).amp));if(t.amp>Fb&&t.amp>n*Ib){let e=(((t.phase/4-Math.PI/4)*180/Math.PI+45)%90+90)%90-45,n=e*Math.PI/180,r=0;for(let e of s){let t=(e.x-c)*Math.cos(n)+(e.y-l)*Math.sin(n),i=-(e.x-c)*Math.sin(n)+(e.y-l)*Math.cos(n);r=Math.max(r,(Math.abs(t)+Math.abs(i))/2)}r=(r+p/1.15)/2;let i=(e,t)=>[0,1,2,3].map(n=>{let r=e+n*Math.PI/2;return{x:c+Math.cos(r)*t,y:l+Math.sin(r)*t}});if(Math.abs(e)<=Ab)return{kind:`square`,cx:c,cy:l,r:r*Math.SQRT2,corners:i(n-3*Math.PI/4,r*Math.SQRT2)}}}return u.length>4&&h<Tb&&Math.abs(g)>Eb?{kind:`circle`,cx:c,cy:l,r:p,corners:[]}:null}function _b(e){if(e.length<12)return null;let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a.x),n=Math.min(n,a.y),r=Math.max(r,a.x),i=Math.max(i,a.y);let a=Math.hypot(r-t,i-n);if(a<Cb||ab(e[0],e[e.length-1])<a*zb)return null;let o={x:(t+r)/2,y:(n+i)/2},s=rb(e,96),c=ab(s[0],o)>ab(s[s.length-1],o);c&&(s=s.slice().reverse());let l=s.length,u=e=>({x:e.reduce((e,t)=>e+t.x,0)/e.length,y:e.reduce((e,t)=>e+t.y,0)/e.length});for(let e of[o,u(s),u(s.slice(0,Math.ceil(l*.3)))]){let t=[Math.atan2(s[0].y-e.y,s[0].x-e.x)],n=0,r=0;for(let n=1;n<l;n++){let r=Math.atan2(s[n].y-e.y,s[n].x-e.x)-Math.atan2(s[n-1].y-e.y,s[n-1].x-e.x);r>Math.PI&&(r-=2*Math.PI),r<-Math.PI&&(r+=2*Math.PI),t.push(t[n-1]+r)}let i=t[l-1]-t[0],a=Math.sign(i)||1;for(let e=1;e<l;e++){let i=(t[e]-t[e-1])*a;i>0?n+=i:r-=i}let o=Math.abs(i)/(Math.PI*2);if(o<Lb||r>n*Bb)continue;let u=[];for(let n=0;n<l;n++){let r=Math.min(Math.floor((t[n]-t[0])*a/Math.PI),Math.floor(o*2)-1);r<0||(u[r]??=[]).push(ab(s[n],e))}let d=u.filter(e=>e?.length).map(e=>e.reduce((e,t)=>e+t,0)/e.length);if(d.length<3)continue;let f=d.every((e,t)=>t===0||e>d[t-1]*.92),p=Math.max(d[0],1),m=d[d.length-1];if(!f||m<p*Rb)continue;let h=ab(s[0],e)*.5,g=ab(s[l-1],e),_=t[l-1],v=Math.abs(i),y=[];for(let t=0;t<=120;t++){let n=t/120,r=_-a*v*(1-n),i=h+(g-h)*n;y.push({x:e.x+Math.cos(r)*i,y:e.y+Math.sin(r)*i})}return c&&y.reverse(),{kind:`spiral`,cx:e.x,cy:e.y,r:g,corners:y}}return null}function vb(e){if(e.kind!==`circle`)return e.corners;let t=[];for(let n=0;n<72;n++){let r=n/72*Math.PI*2;t.push({x:e.cx+Math.cos(r)*e.r,y:e.cy+Math.sin(r)*e.r})}return t}function yb(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r.x*i.y-i.x*r.y}return t/2}function bb(e,t){if(e.kind===`spiral`)return xb(e.corners,t);let n=vb(e);Math.sign(yb(n))!==Math.sign(yb(t))&&(n=n.slice().reverse());let r=n.length,i=[0];for(let e=0;e<r;e++)i.push(i[e]+ab(n[e],n[(e+1)%r]));let a=i[r],o=e.laps??1,s=0,c=1/0;for(let e=0;e<r;e++){let a=n[e],o=n[(e+1)%r],l=sb(t[0],a,o);if(l<c){c=l;let n=i[e+1]-i[e],r=n===0?0:((t[0].x-a.x)*(o.x-a.x)+(t[0].y-a.y)*(o.y-a.y))/(n*n);s=i[e]+Math.max(0,Math.min(1,r))*n}}let l=[0];for(let e=1;e<t.length;e++)l.push(l[e-1]+ab(t[e-1],t[e]));let u=l[l.length-1]||1,d=0;return l.map(e=>{let t=(s+e/u*a*o)%a;for(;d>0&&i[d]>t;)d--;for(;i[d+1]<t;)d++;let c=n[d],l=n[(d+1)%r],f=i[d+1]-i[d],p=f===0?0:(t-i[d])/f;return{x:c.x+(l.x-c.x)*p,y:c.y+(l.y-c.y)*p}})}function xb(e,t){let n=[0];for(let t=1;t<e.length;t++)n.push(n[t-1]+ab(e[t-1],e[t]));let r=n[n.length-1],i=[0];for(let e=1;e<t.length;e++)i.push(i[e-1]+ab(t[e-1],t[e]));let a=i[i.length-1]||1,o=0;return i.map(t=>{let i=t/a*r;for(;o<e.length-2&&n[o+1]<i;)o++;let s=n[o+1]-n[o],c=s===0?0:Math.min(1,(i-n[o])/s),l=e[o],u=e[o+1];return{x:l.x+(u.x-l.x)*c,y:l.y+(u.y-l.y)*c}})}var Sb,Cb,wb,Tb,Eb,Db,Ob,kb,Ab,jb,Mb,Nb,Pb,Fb,Ib,Lb,Rb,zb,Bb,Vb,Hb,Ub=t((()=>{Sb=[[`triangle`,`triangleDown`,`hourglass`],[`pentagram`,`triangle`,`fireStar`],[`pentagram`,`triangleDown`,`waterStar`]],Cb=70,wb=.38,Tb=.22,Eb=Math.PI*1.7,Db=20,Ob=30,kb=.55,Ab=22,jb=35,Mb=30,Nb=75,Pb=.25,Fb=.04,Ib=2.5,Lb=1.4,Rb=2,zb=.25,Bb=.12,Vb=.2,Hb=1.6}));function Wb(e,t){let n=[0];for(let t=1;t<e.length;t++)n.push(n[t-1]+Math.hypot(e[t].x-e[t-1].x,e[t].y-e[t-1].y));let r=n[n.length-1];return t.map((e,t)=>{let i=n[t],a=1+.08*Math.sin(i*.09)+.05*Math.sin(i*.23+1.3),o=Math.min(1,.25+.75*i/lx),s=Math.min(1,(r-i)/ux),c=.15+.85*Math.sqrt(Math.max(0,s));return e*a*o*c})}function Gb(e,t,n,r){let i=t.length,a=[],o=[];for(let e=0;e<i;e++){let s=t[Math.max(0,e-1)],c=t[Math.min(i-1,e+1)],l=s.y-c.y,u=c.x-s.x,d=Math.hypot(l,u)||1,f=n[e]*r/2;l=l/d*f,u=u/d*f,a.push({x:t[e].x+l,y:t[e].y+u}),o.push({x:t[e].x-l,y:t[e].y-u})}e.beginPath(),Kb(e,a,!0),Kb(e,o.reverse(),!1),e.closePath(),e.fill();for(let a of[0,i-1])e.beginPath(),e.arc(t[a].x,t[a].y,n[a]*r/2,0,Math.PI*2),e.fill()}function Kb(e,t,n){n?e.moveTo(t[0].x,t[0].y):e.lineTo(t[0].x,t[0].y);for(let n=1;n<t.length-1;n++){let r=t[n],i=t[n+1];e.quadraticCurveTo(r.x,r.y,(r.x+i.x)/2,(r.y+i.y)/2)}let r=t[t.length-1];e.lineTo(r.x,r.y)}function qb(e,t,n){if(e.beginPath(),t.kind!==`circle`){for(let r of t.corners)e.lineTo((r.x-t.cx)*n,(r.y-t.cy)*n);t.kind!==`spiral`&&e.closePath()}else e.arc(0,0,t.r*n,0,Math.PI*2)}function Jb(e,t,n){e.save(),e.translate(t.cx,t.cy),e.globalAlpha=n*.4,e.strokeStyle=$b,e.lineWidth=2,e.setLineDash([6,8]),qb(e,t,1),e.stroke(),e.restore()}function Yb(e,t,n){let r=1-(1-n)**3,i=n<.15?n/.15:1-(n-.15)/.85;e.save(),e.translate(t.cx,t.cy),e.globalAlpha=i,e.strokeStyle=$b,e.shadowColor=ex,e.shadowBlur=14,e.lineWidth=4,qb(e,t,1+r*.12),e.stroke(),e.restore()}var Xb,Zb,Qb,$b,ex,tx,nx,rx,ix,ax,ox,sx,cx,lx,ux,dx,fx=t((()=>{Ub(),Xb=.35,Zb=.16,Qb=.7,$b=`#ffe9a8`,ex=`rgba(255, 196, 92, 0.9)`,tx=`rgba(80, 60, 50, 0.6)`,nx=7,rx=.45,ix=1.5,ax=4,ox=11,sx=2.2,cx=.2,lx=14,ux=26,dx=class{canvas=document.createElement(`canvas`);ctx;points=[];widths=[];width=ox;lastTime=0;tip={x:0,y:0};hint=null;hintFrame=0;hintAlpha=0;drawing=!1;fading=[];dpr=1;dirty=!1;constructor(){this.canvas.id=`ink`,this.ctx=this.canvas.getContext(`2d`),document.body.append(this.canvas),this.resize(),addEventListener(`resize`,()=>this.resize())}get active(){return this.drawing||this.fading.length>0||this.dirty}begin(e){this.tip={...e[0]},this.points=[{...e[0]}],this.width=ox*.8,this.widths=[this.width],this.lastTime=performance.now(),this.hint=null,this.hintAlpha=0,this.drawing=!0;for(let t=1;t<e.length;t++)this.add(e[t])}add(e){let t=Math.hypot(e.x-this.tip.x,e.y-this.tip.y);if(t<=nx)return;let n=(t-nx)/t*(1-rx*.5);this.tip={x:this.tip.x+(e.x-this.tip.x)*n,y:this.tip.y+(e.y-this.tip.y)*n};let r=this.points[this.points.length-1],i=Math.hypot(this.tip.x-r.x,this.tip.y-r.y);if(i<ix)return;let a=performance.now(),o=i/Math.max(1,a-this.lastTime);this.lastTime=a;let s=ox+-7*Math.min(1,o/sx);this.width+=(s-this.width)*cx,this.points.push(this.tip),this.widths.push(this.width)}end(e){let t=e&&this.points.length>1?bb(e,this.points):null;this.fading.push({points:this.points,widths:this.widths,ideal:t,shape:e,age:0}),this.points=[],this.widths=[],this.hint=null,this.drawing=!1}resize(){this.dpr=Math.min(devicePixelRatio,2),this.canvas.width=innerWidth*this.dpr,this.canvas.height=innerHeight*this.dpr,this.dirty=!0}update(e){if(!this.active)return;let{ctx:t}=this;t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.canvas.width,this.canvas.height),t.setTransform(this.dpr,0,0,this.dpr,0,0),t.lineCap=t.lineJoin=`round`,this.dirty=!1;for(let n of this.fading)if(n.age+=e,n.shape&&n.ideal){let e=n.ideal,r=1-(1-Math.min(1,n.age/Zb))**3,i=n.points.map((t,n)=>({x:t.x+(e[n].x-t.x)*r,y:t.y+(e[n].y-t.y)*r})),a=Math.max(0,n.age-Zb)/Qb;this.stroke(i,n.widths,1-a*2.5,$b,ex),n.age>Zb&&Yb(t,n.shape,Math.min(1,a))}else this.stroke(n.points,n.widths,1-n.age/Xb,tx,null);this.fading=this.fading.filter(e=>e.age<(e.shape?.86:Xb)),this.drawing&&(++this.hintFrame%ax===0&&(this.hint=pb(this.points)),this.hintAlpha+=(+!!this.hint-this.hintAlpha)*Math.min(1,e*10),this.hint&&this.hintAlpha>.02&&Jb(t,this.hint,this.hintAlpha),this.stroke(this.points,this.widths,1,$b,ex)),this.active||(this.dirty=!0)}stroke(e,t,n,r,i){if(n<=0||e.length<2)return;let{ctx:a}=this,o=Wb(e,t);a.save(),i&&(a.shadowColor=i,a.shadowBlur=12),a.globalAlpha=n,a.fillStyle=r,Gb(a,e,o,1),a.restore()}}}));function px(e,t){let n=t?Kg:1,r=Vg*n;return e===`square`||e===`triangle`||e===`triangleDown`?[{x:0,z:0,r}]:e===`hourglass`?[{x:0,z:0,r:r*qg.blast}]:e===`spiral`?[{x:0,z:0,r:r*qg.vine}]:e===`pentagram`||e===`fireStar`||e===`waterStar`?Dg(Wg*n).map(e=>({...e,r})):[]}var mx,hx,gx,_x,vx,yx,bx,xx,Sx,Cx,wx,Tx,Ex=t((()=>{Id(),Xd(),V_(),mx=5,hx=.14,gx=.55,_x=.025,vx=.05,yx=new H(0,1,0),bx=new H,xx=new Ro(1,32).rotateX(-Math.PI/2),Sx=new ls(.9,1,40).rotateX(-Math.PI/2),Cx=12,wx=new ls(1.14,1.24,4,1,0,Math.PI*2/Cx*.55).rotateX(-Math.PI/2),Tx=class{root=new ki;marks=[];dashes=[];constructor(e){let t={color:e,transparent:!0,depthWrite:!1,depthTest:!1},n=new Ha({...t,opacity:hx}),r=new Ha({...t,opacity:gx});for(let e=0;e<mx;e++){let e=new ki,t=new G(xx,n),i=new G(Sx,r);t.renderOrder=i.renderOrder=3,i.position.y=.002;let a=new ki;for(let e=0;e<Cx;e++){let t=new G(wx,r);t.rotation.y=e/Cx*Math.PI*2,t.position.y=.002,t.renderOrder=3,a.add(t)}e.add(t,i,a),this.marks.push(e),this.dashes.push(a),this.root.add(e)}this.root.visible=!1}show(e,t,n,r=0){let i=e&&t?px(e,n):[];if(this.root.visible=i.length>0,this.root.visible&&t)for(let e=0;e<mx;e++){let a=this.marks[e],o=i[e];if(a.visible=!!o,!o)continue;let s=t.x+o.x,c=t.z+o.z;a.position.set(s,J(s,c)+_x,c),bx.set(J(s-vx,c)-J(s+vx,c),2*vx,J(s,c-vx)-J(s,c+vx)).normalize(),a.quaternion.setFromUnitVectors(yx,bx),a.scale.setScalar(o.r),this.dashes[e].visible=n,this.dashes[e].rotation.y+=r*.8}}hide(){this.root.visible=!1}}}));function Dx(e,t,n){let r=jv(24,29,8,Math.PI+.45,-.45);return jx(Mx([[24,e],r[0]]).concat(r,Mx([r[r.length-1],[24,e]])),3.4,t,n)}function Ox(e,t){let n=Wm(Jm(t),2.2,t),r=`hudbrush${++Nx}`;return`<svg viewBox="0 0 48 48" aria-hidden="true"><mask id="${r}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/><path d="${e.map(e=>e.dry).join(``)+n.dry}" fill="#000"/></mask><g mask="url(#${r})"><path class="ring" d="${n.ink}"/>${e.map(e=>e.ink).join(``)}</g></svg>`}function kx(e,t,n){let r=Av(),i=[Mv([12,12],[36,36]),Mv([36,12],[12,36])].map(e=>Wm(e,4.2,r).ink).join(``),a=document.createElement(`div`);a.className=`nosource ${e}`,a.style.left=`${t}px`,a.style.top=`${n}px`,a.innerHTML=(e===`wall`?Ym(`circle`):e===`fire`?Px(r):Fx(r))+`<svg viewBox="0 0 48 48" aria-hidden="true"><path class="cross" d="${i}"/></svg>`,document.body.append(a),a.animate([{transform:`translate(-50%, -50%) scale(.6)`,opacity:0},{transform:`translate(-50%, -50%) scale(1.1)`,opacity:1,offset:.15},{transform:`translate(-50%, -50%) scale(1)`,opacity:1,offset:.7},{transform:`translate(-50%, -60%) scale(1)`,opacity:0}],{duration:Ax,easing:`ease-out`}).onfinish=()=>a.remove()}var Ax,jx,Mx,Nx,Px,Fx,Ix=t((()=>{ih(),Vv(),Ax=1100,jx=(e,t,n,r)=>{let i=Wm(e,t,r);return{ink:`<path class="${n}" d="${i.ink}"/>`,dry:i.dry}},Mx=e=>e.slice(1).flatMap((t,n)=>Mv(e[n],t).slice(+!!n)),Nx=0,Px=e=>Ox([Dx(10,`fire`,e),jx(Mx([[24,23],[21.5,30],[24,33.5],[26.5,30],[24,23]]),2.4,`fire`,e)],e),Fx=e=>Ox([Dx(12,`water`,e),jx(jv(24,29,4.5,Math.PI*.6,Math.PI*.95),2,`water`,e)],e)}));function Lx(e){let t=matchMedia(`(any-pointer: coarse)`),n=matchMedia(`(orientation: landscape)`),r=document.createElement(`div`);r.id=`device-hint`,r.setAttribute(`role`,`status`),r.hidden=!0,document.body.append(r),r.addEventListener(`animationend`,e=>{e.animationName.startsWith(`device-brief`)&&(r.hidden=!0)});let i=null,a=!1,o=0,s=0,c=e=>{r.innerHTML=`${p(e===`portrait`?`turn`:``)}<span></span>`,r.querySelector(`span`).textContent=M.device[e],r.classList.toggle(`brief`,e===`touch`),r.hidden=!1,r.style.animation=`none`,r.offsetWidth,r.style.animation=``},l=()=>{s||=window.setInterval(()=>{if(i!==`touch`)return u();let t=performance.now();if(!e())return void(o=0);o||=t,!(t-o<Rx)&&(u(),a=!0,c(`touch`))},250)},u=()=>{clearInterval(s),s=0,o=0},d=()=>{let e=t.matches||navigator.maxTouchPoints>0?n.matches?`portrait`:null:`touch`;e!==i&&(i=e,r.hidden=!0,e===`portrait`?c(`portrait`):e===`touch`&&!a&&l())};t.addEventListener(`change`,d),n.addEventListener(`change`,d),d()}var Rx,zx=t((()=>{ge(),O(),Rx=3e3}));function Bx(){if(!Kv())return{press:()=>{},settled:()=>!0};let e=!1,t=!1;try{e=localStorage.getItem(Vx)===`1`}catch{}let n=document.createElement(`div`);n.id=`keys-hint`,n.setAttribute(`aria-hidden`,`true`),e&&n.classList.add(`used`),t=e,e||setTimeout(()=>t=!0,6e4);let r=e=>`<kbd data-key="${e}">${Hx[e]}</kbd>`;return n.innerHTML=`<span class="caps"><span class="row">${r(`up`)}</span><span class="row">${r(`left`)}${r(`down`)}${r(`right`)}</span></span><span class="label"></span>`,n.querySelector(`.label`).textContent=M.keys.hint,document.body.append(n),{press(r,i){if(n.querySelector(`[data-key="${r}"]`)?.classList.toggle(`on`,i),i&&!e){e=!0;try{localStorage.setItem(Vx,`1`)}catch{}setTimeout(()=>{n.classList.add(`used`),t=!0},2500)}},settled:()=>t}}var Vx,Hx,Ux=t((()=>{ge(),Jv(),Vx=`cirquimia.keys`,Hx={up:`W`,left:`A`,down:`S`,right:`D`}})),Wx,Gx,Kx=t((()=>{O(),My(),ge(),Wx={earth:`square`,columns:`pentagram`,fire:`triangle`,water:`triangleDown`,blast:`hourglass`,fireStar:`fireStar`,waterStar:`waterStar`,vine:`spiral`},Gx=class{done=new Set;on=!1;set(e){e!==this.on&&(this.on=e,this.done.clear(),gy(e?this.done:null),this.ring())}hit(e,t){if(!this.on)return;let n=[Wx[e],...t?[`rune`]:[]].filter(e=>!this.done.has(e));if(n.length){for(let e of n)this.done.add(e);this.ring(),this.celebrate(n[0]===`rune`?M.practice.rune:M.help.names[n[0]])}}get book(){return document.getElementById(`book-btn`)}ring(){let e=this.book;if(!e)return;let t=this.on&&this.done.size<Oy.length;e.classList.toggle(`train`,t),this.on?e.setAttribute(`aria-label`,M.practice.bookAria):e.setAttribute(`aria-label`,M.help.symbolsButton)}celebrate(e){let t=this.book;if(!t)return;t.classList.remove(`got`),t.offsetWidth,t.classList.add(`got`),t.addEventListener(`animationend`,()=>t.classList.remove(`got`),{once:!0});let n=t.getBoundingClientRect(),r=document.createElement(`div`);r.className=`book-got`,r.setAttribute(`role`,`status`),r.innerHTML=`<span>✓ ${this.done.size===Oy.length?M.practice.allDone:M.practice.got(e)}</span>${_()}`,r.style.left=`${Math.min(n.left+n.width/2,innerWidth-90)}px`;let i=n.top<innerHeight/2;r.classList.toggle(`below`,i),r.style.top=`${i?n.bottom+4:n.top-4}px`,r.addEventListener(`animationend`,()=>r.remove()),document.body.append(r)}}}));function qx(e){let t=e===`fire`?[[24,7],[42,39],[6,39],[24,7],[28,14]]:[[24,41],[6,9],[42,9],[24,41],[28,34]];return t.slice(1).flatMap((e,n)=>Mv(t[n],e).slice(+!!n))}function Jx(e){return()=>((e=e*16807%2147483647)&65535)/65535}function Yx(){try{new URLSearchParams(location.search).has(`tutorial`)&&localStorage.removeItem(Zx);let e=JSON.parse(localStorage.getItem(Zx)??`null`);return Array.isArray(e)?e.filter(e=>e===`fire`||e===`water`):null}catch{return null}}function Xx(e){try{localStorage.setItem(Zx,JSON.stringify(e))}catch{}}var Zx,Qx,$x,eS,tS=t((()=>{ih(),Vv(),Zx=`cirquimia.sources`,Qx=1.6,$x=.8,eS=class{host;left=Yx()??[];demo=document.createElement(`div`);time=0;constructor(e){this.host=e,this.demo.className=`src-demo`,this.demo.setAttribute(`aria-hidden`,`true`),this.demo.hidden=!0,document.body.append(this.demo)}get active(){return this.left.length>0}start(){Yx()===null&&(this.left=[`fire`,`water`],this.time=0,Xx(this.left))}charged(e){return this.left[0]===e?(this.left.shift(),this.time=0,Xx(this.left),!0):(this.left.includes(e)&&(this.left=this.left.filter(t=>t!==e),Xx(this.left)),!1)}update(e){let t=this.left[0],n=t&&!this.host.covered()?this.host.find(t):null;if(this.demo.hidden=!n,!n)return;let r=this.host.toScreen(n,0);this.demo.className=`src-demo ${t}`,this.demo.style.transform=`translate(${r.x.toFixed(1)}px, ${r.y.toFixed(1)}px)`,this.time=(this.time+e)%2.4000000000000004;let i=qx(t),a=Math.min(1,this.time/Qx),o=a<.5?2*a*a:1-(-2*a+2)**2/2,s=i.slice(0,Math.max(2,Math.round(i.length*o))),c=Wm(s,3.4,Jx(7),[0]),[l,u]=s[s.length-1],d=this.time>Qx?1-(this.time-Qx)/$x:1,f=i.map((e,t)=>`${t?`L`:`M`}${e[0].toFixed(1)} ${e[1].toFixed(1)}`).join(``);this.demo.innerHTML=`<svg viewBox="0 0 48 48"><path class="guide" d="${f}"/><g style="opacity:${d.toFixed(2)}"><path class="stroke" d="${c.ink}"/>`+(a<1?`<circle class="finger" cx="${l.toFixed(1)}" cy="${u.toFixed(1)}" r="3.2"/>`:``)+`</g></svg>`}}}));function nS(e,t,n){let r=Math.max(0,n)/1e3;return Math.round(Math.max(0,e)*oS[t]*sS/(r+cS))}function rS(e){return e.normalize(`NFC`).toUpperCase().replace(/[^A-ZÑ0-9]/g,``).slice(0,4)}function iS(e){return typeof e==`string`&&lS.test(e)}function aS(e){let t=Math.max(0,Math.round(e/1e3)),n=t%60,r=Math.floor(t/60)%60,i=Math.floor(t/3600),a=String(n).padStart(2,`0`);return i?`${i}:${String(r).padStart(2,`0`)}:${a}`:`${r}:${a}`}var oS,sS,cS,lS,uS=t((()=>{oS={facil:1,normal:1.5,dificil:2,experto:3},Object.keys(oS),sS=600,cS=30,lS=/^[A-ZÑ0-9]{1,4}$/}));async function dS(e,t){try{let n=await fetch(yS+e,{...t,headers:{"Content-Type":`application/json`,...t?.headers}});return n.status===429?`too-many`:n.status>=400&&n.status<500?`rejected`:!n.ok||!(n.headers.get(`Content-Type`)??``).includes(`json`)?`unavailable`:await n.json()}catch{return`unavailable`}}async function fS(){let e=navigator.userAgentData,t={};try{t=await e?.getHighEntropyValues?.([`model`,`platformVersion`])??{}}catch{}return{touchPoints:navigator.maxTouchPoints??0,mobile:e?.mobile,platform:e?.platform,shortSide:Math.min(screen.width,screen.height),model:t.model||void 0,osVersion:t.platformVersion||void 0}}async function pS(e,t,n,r){let i={runId:e,initials:t,durationMs:n,damage:r,hints:await fS(),screen:`${screen.width}x${screen.height}@${Math.round(devicePixelRatio*100)/100}`,locale:pe},a=await dS(`/scores`,{method:`POST`,body:JSON.stringify(i)});return!SS(a)&&a.id!==null&&vS(a.id),a}function mS(e){return dS(`/scores?period=${e}`)}function hS(){try{let e=rS(localStorage.getItem(bS)??``);return iS(e)?e:``}catch{return``}}function gS(e){try{localStorage.setItem(bS,e)}catch{}}function _S(){try{let e=JSON.parse(localStorage.getItem(xS)??`[]`);return new Set(Array.isArray(e)?e.filter(e=>Number.isInteger(e)):[])}catch{return new Set}}function vS(e){try{let t=[..._S(),e].slice(-100);localStorage.setItem(xS,JSON.stringify(t))}catch{}}var yS,bS,xS,SS,CS,wS=t((()=>{ge(),se(),uS(),yS=oe,bS=`cirquimia.initials`,xS=`cirquimia.myscores`,SS=e=>typeof e==`string`,CS=class{pending=Promise.resolve(null);timer=0;match=0;start(e,t,n){let r=++this.match;if(clearTimeout(this.timer),!n){this.pending=Promise.resolve(null);return}let i=()=>{};this.pending=new Promise(e=>i=e),this.timer=window.setTimeout(async()=>{let n=await dS(`/runs`,{method:`POST`,body:JSON.stringify({rivals:e,difficulty:t})});i(r===this.match&&!SS(n)?n.id:null)},300)}current(){return this.pending}}})),TS,ES=t((()=>{TS=`https://cirquimia.pages.dev`})),DS,OS=t((()=>{DS=new URL(`meadow-CzI_piI1.jpg`,import.meta.url).href}));function kS(){return rC??=new Promise(e=>{let t=new Image;t.onload=()=>e(t),t.onerror=()=>e(null),t.src=DS})}function AS(e){e.fillStyle=XS,e.fillRect(0,0,qS,JS);let t=e.createRadialGradient(qS*.35,JS*.62,200,qS*.45,JS*.55,qS*.85);t.addColorStop(0,`rgba(120,90,50,0)`),t.addColorStop(1,`rgba(120,90,50,.16)`),e.fillStyle=t,e.fillRect(0,0,qS,JS);let n=7,r=()=>((n=n*16807%2147483647)&65535)/65535;for(let t=0;t<2600;t++)e.fillStyle=r()<.5?`rgba(70,50,30,.05)`:`rgba(255,255,255,.18)`,e.fillRect(r()*qS,r()*JS,1.5+r()*1.5,1.5+r()*1.5)}function jS(e,t){let{x:n,y:r,r:i}=eC;if(e.save(),e.shadowColor=`rgba(31,26,21,.35)`,e.shadowBlur=40,e.shadowOffsetX=-10,e.shadowOffsetY=12,e.beginPath(),e.arc(n,r,i,0,Math.PI*2),e.fillStyle=`#7f9a90`,e.fill(),e.restore(),t){e.save(),e.beginPath(),e.arc(n,r,i,0,Math.PI*2),e.clip(),e.drawImage(t,n-i,r-i,i*2,i*2);let a=e.createRadialGradient(n,r,i*.7,n,r,i);a.addColorStop(0,`rgba(245,239,224,0)`),a.addColorStop(1,`rgba(245,239,224,.28)`),e.fillStyle=a,e.fillRect(n-i,r-i,i*2,i*2),e.restore()}e.lineCap=`round`;let a=(t,i,a,o=[])=>{e.beginPath(),e.setLineDash(o),e.arc(n,r,t,0,Math.PI*2),e.lineWidth=i,e.strokeStyle=a,e.stroke()};a(i,10,XS),a(i+22,2,ZS),a(i+96,1.5,ZS),a(i+108,1.5,$S,[2,12]),e.setLineDash([]),e.strokeStyle=ZS;for(let t=0;t<120;t++){let a=t/120*Math.PI*2,o=t%10==0,s=i+22,c=s+(o?18:9);e.lineWidth=o?2:1,e.beginPath(),e.moveTo(n+Math.cos(a)*s,r+Math.sin(a)*s),e.lineTo(n+Math.cos(a)*c,r+Math.sin(a)*c),e.stroke()}let o=i+62,s=Math.PI*.52,c=Math.PI*1;tC.forEach((t,i)=>{let a=s+(c-s)*i/(tC.length-1),l=/d="([^"]+)"/.exec(Ym(t,!0))?.[1];l&&(e.save(),e.translate(n+Math.cos(a)*o-24,r+Math.sin(a)*o-24),e.scale(1,1),e.fillStyle=i===2||i===5?$S:ZS,e.fill(new Path2D(l)),e.restore())})}function MS(e,t,n,r,i,a=20){do e.font=`${n} ${r}px ${YS}`;while(e.measureText(t).width>i&&--r>a)}function NS(e,t,n,r){e.save(),e.strokeStyle=`#eee5d2`,e.lineWidth=14,e.lineJoin=`round`,e.strokeText(t,n,r),e.restore(),e.fillText(t,n,r)}function PS(e){e.strokeStyle=ZS,e.lineWidth=2,e.strokeRect(36,36,1008,1008),e.lineWidth=1,e.globalAlpha=.5,e.strokeRect(46,46,988,988),e.globalAlpha=1}async function FS(e,t){try{await Promise.all([document.fonts.load(`500 64px ${YS}`),document.fonts.load(`600 64px ${YS}`),document.fonts.load(`italic 400 64px ${YS}`)])}catch{}let n=t??await kS(),r=document.createElement(`canvas`);r.width=qS,r.height=JS;let i=r.getContext(`2d`);AS(i),PS(i),jS(i,n),i.textAlign=`left`,i.textBaseline=`alphabetic`,i.fillStyle=ZS,i.font=`500 54px ${YS}`,i.letterSpacing=`14px`,NS(i,`CIRQUIMIA`,96,150),i.letterSpacing=`0px`,i.fillStyle=$S,i.fillRect(96,176,120,3),i.fillStyle=$S,i.font=`500 36px ${YS}`,i.letterSpacing=`6px`,NS(i,`${M.match.victory.replace(/[¡!]/g,``)} · ${ev[e.difficulty]}`.toUpperCase(),96,690),i.letterSpacing=`0px`;let a=e.score.toLocaleString(pe);MS(i,a,`500`,250,640,120),i.fillStyle=ZS,i.fillText(a,88,880);let o=i.measureText(a).width;i.fillStyle=QS,i.font=`italic 400 54px ${YS}`,i.fillText(M.rank.points(e.score),96+o+10,880);let s=`${aS(e.durationMs)}  ·  ${M.rank.damage(e.damage)}  ·  ${M.rank.rivals(e.rivals)}`;MS(i,s,`italic 400`,40,888),i.fillStyle=QS,i.fillText(s,96,944),i.fillStyle=ZS,i.fillRect(96,978,888,2),i.fillRect(96,985,888,1);let c=e.initials?`${e.initials}${e.rank?`  ·  ${M.rank.placeToday(e.rank.today)}`:``}`:``;i.font=`600 36px ${YS}`,i.letterSpacing=`4px`,i.fillText(c,96,1030);let l=c?i.measureText(c).width+40:0;i.letterSpacing=`0px`,i.textAlign=`right`,i.fillStyle=$S;let u=`${M.rank.beatMe}  ${TS.replace(/^https:\/\//,``)}`;return MS(i,u,`italic 500`,38,888-l),i.fillText(u,984,1030),new Promise((e,t)=>r.toBlob(n=>n?e(n):t(Error(`toBlob`)),`image/png`))}function IS(e){return M.rank.shareText(e.score.toLocaleString(pe),aS(e.durationMs),e.rivals,ev[e.difficulty],nC())}function LS(){try{return localStorage.getItem(iC)??``}catch{return``}}function RS(e){let t=e.trim().replace(/^https?:\/\//i,``).replace(/^@?[^@\s]*@/,``).split(/[/?#\s]/)[0].toLowerCase();return/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(t)?t:null}function zS(e,t,n=`mastodon.social`){switch(e){case`x`:return`https://x.com/intent/post?text=${aC(t)}`;case`bluesky`:return`https://bsky.app/intent/compose?text=${aC(t)}`;case`threads`:return`https://www.threads.net/intent/post?text=${aC(t)}`;case`mastodon`:return`https://${n}/share?text=${aC(t)}`}}function BS(e,t){let n=document.createElement(`a`);n.href=URL.createObjectURL(e),n.download=t,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}function VS(e,t,n){if(e===`mastodon`&&n)try{localStorage.setItem(iC,n)}catch{}window.open(zS(e,IS(t),n),`_blank`,`noopener`)}async function HS(e,t){let n=await e,r=new File([n],`cirquimia-${t.score}.png`,{type:`image/png`});if(matchMedia(`(pointer: coarse)`).matches&&navigator.canShare?.({files:[r]}))try{return await navigator.share({files:[r],text:IS(t)}),`shared`}catch(e){if(e?.name===`AbortError`)return`cancelled`}try{return await navigator.clipboard.write([new ClipboardItem({"image/png":n})]),`copied`}catch{return BS(n,r.name),`saved`}}async function US(e,t){BS(await e,`cirquimia-${t.score}.png`)}function WS(e){try{return navigator.clipboard.write([new ClipboardItem({"image/png":e})]).then(()=>!0,()=>!1)}catch{return Promise.resolve(!1)}}async function GS(e,t){let n=await e,r=new File([n],`cirquimia-${t.score}.png`,{type:`image/png`});if(matchMedia(`(pointer: coarse)`).matches&&navigator.canShare?.({files:[r]}))try{await navigator.share({files:[r],text:IS(t)});return}catch(e){if(e?.name===`AbortError`)return}BS(n,r.name)}var KS,qS,JS,YS,XS,ZS,QS,$S,eC,tC,nC,rC,iC,aC,oC=t((()=>{ih(),wv(),ge(),ES(),ie(),OS(),uS(),KS=1080,qS=KS,JS=KS,YS=`'EB Garamond Variable', Garamond, Georgia, serif`,XS=`#f5efe0`,ZS=`#1f1a15`,QS=`#6b6258`,$S=`#a3271c`,eC={x:830,y:270,r:370},tC=[`circle`,`square`,`triangle`,`triangleDown`,`rhombus`,`pentagram`],nC=()=>new URL(te(`/`,pe),TS).href,rC=null,iC=`cirquimia.mastodon`,aC=encodeURIComponent}));function sC(e,t=!1){let n=t?`⚔ ${e.damage}`:M.rank.damage(e.damage);return`⏱ ${aS(e.durationMs)} · ${n} · ${M.rank.rivals(e.rivals)} · ${ev[e.difficulty]??e.difficulty}`}function cC(){let e=document.createElement(`button`);e.type=`button`,e.id=`rank-btn`,e.setAttribute(`aria-label`,M.rank.button),e.innerHTML=s();let t=document.createElement(`div`);t.id=`rank`,t.hidden=!0,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`true`),t.setAttribute(`aria-labelledby`,`rank-title`),t.innerHTML=`<div class="card" tabindex="-1"><button type="button" class="x" aria-label="${M.rank.close}">×</button><h2 id="rank-title">${M.rank.title}</h2><div class="tabs" role="tablist"><button type="button" role="tab" data-period="today">${M.rank.today}</button><button type="button" role="tab" data-period="all">${M.rank.all}</button></div><div class="list" role="tabpanel"></div><p class="rule">${M.rank.rule}</p></div>`,uC(e),uC(t),document.body.append(e,t);let n=t.querySelector(`.list`),r=[...t.querySelectorAll(`[role=tab]`)],i=!1,a=`today`,o=null,c=null,l=0,u=e=>{if(!e.length){n.innerHTML=`<p class="empty">${M.rank.empty}</p>`;return}let t=_S();n.innerHTML=`<ol>`+e.map((e,n)=>{let r=[t.has(e.id)?`mine`:``,e.id===o?`new`:``].filter(Boolean).join(` `),i=n<3?` medal m${n+1}`:``;return`<li${r?` class="${r}"`:``}><span class="pos${i}">${n+1}</span><span class="who">${lC(e.initials)}${t.has(e.id)?` <i>${M.rank.mine}</i>`:``}</span><span class="pts">${e.score.toLocaleString(pe)}</span><span class="meta">${sC(e,!0)} · ${M.rank.category[e.category]??``}</span></li>`}).join(``)+`</ol>`,n.querySelector(`.new`)?.scrollIntoView({block:`center`})},d=async e=>{a=e;for(let t of r)t.setAttribute(`aria-selected`,String(t.dataset.period===e));n.innerHTML=`<p class="empty">${M.rank.loading}</p>`;let t=++l,i=await mS(e);t===l&&(SS(i)?n.innerHTML=`<p class="empty">${M.rank.unavailable}</p>`:u(i.entries))},f=()=>{t.classList.remove(`show`),t.hidden=!0,i=!1,c?.focus({preventScroll:!0})},p=(e=a,n=null)=>{c=document.activeElement instanceof HTMLElement&&document.activeElement!==document.body?document.activeElement:null,o=n,t.hidden=!1,i=!0,t.offsetWidth,t.classList.add(`show`),t.querySelector(`.card`).focus({preventScroll:!0}),d(e)};e.addEventListener(`click`,()=>p()),t.querySelector(`.x`).addEventListener(`click`,f),t.addEventListener(`click`,e=>e.target===t&&f()),t.addEventListener(`keydown`,e=>e.key===`Escape`&&f());for(let e of r)e.addEventListener(`click`,()=>d(e.dataset.period));return{get open(){return i},show:e=>p(e),fillEnd:(e,t,n,r)=>{let i={...n,score:nS(n.damage,n.difficulty,n.durationMs)};e.hidden=!1,e.innerHTML=`<div class="pts"><b>${i.score.toLocaleString(pe)}</b> ${M.rank.points(i.score)}</div><div class="meta">${sC(n)}</div><form class="sign" novalidate><label><span>${M.rank.initials}</span><input name="initials" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="done" placeholder="ABCD" required></label><button type="submit" class="match-btn save"><span class="cap">${M.rank.save}</span></button></form><p class="note" role="status"></p><div class="share"><p class="dare"></p><div class="row"><button type="button" class="preview" aria-label="${M.rank.preview}" title="${M.rank.preview}"><img alt=""></button><div class="acts" role="group" aria-label="${M.rank.share}"><button type="button" class="match-btn net brand" data-to="x" aria-label="${M.rank.postOnX} X">${S()}<span class="cap"><span class="verb">${M.rank.postOnX} </span>X</span></button><button type="button" class="match-btn net brand" data-to="discord">${C()}<span class="cap"><span class="verb">${M.rank.sendDiscord} </span>Discord</span></button><button type="button" class="match-btn more" aria-expanded="false"><span class="cap">${M.rank.more}</span></button></div></div></div><div class="more-menu" hidden><div class="nets"><button type="button" class="match-btn net brand" data-to="bluesky" aria-label="Bluesky">${w()}<span class="cap">Bluesky</span></button><button type="button" class="match-btn net brand" data-to="threads" aria-label="Threads">${T()}<span class="cap">Threads</span></button><button type="button" class="match-btn net brand" data-to="mastodon" aria-label="Mastodon">${E()}<span class="cap">Mastodon</span></button><button type="button" class="match-btn net save-img" data-to="image" aria-label="${M.rank.saveImage}" title="${M.rank.saveImage}">${D()}</button></div><form class="masto" hidden novalidate><input name="host" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="url" enterkeyhint="go" placeholder="${M.rank.mastodonHost}" aria-label="${M.rank.mastodonHost}"><button type="submit" class="match-btn"><span class="cap">${M.rank.go}</span></button></form></div><button type="button" class="match-btn view"><span class="cap">${M.rank.view}</span></button>`;let o=e.querySelector(`.sign`),s=o.querySelector(`input`),c=o.querySelector(`.save`),l=e.querySelector(`.note`),u=e=>{l.innerHTML=e},d=e.querySelector(`.more`),f=e.querySelector(`.more-menu`),m=e.querySelector(`.masto`),h=m.querySelector(`input`),g=null;s.value=hS(),s.addEventListener(`input`,()=>{let e=rS(s.value);e!==s.value&&(s.value=e)});let _=Promise.race([r??Promise.resolve(null),new Promise(e=>setTimeout(()=>e(null),1200))]),v=e.querySelector(`.dare`),y=e.querySelector(`.preview`),b=y.querySelector(`img`),x=``,O=()=>{v.textContent=M.rank.dare(i.score.toLocaleString(pe),M.rank.points(i.score));let t=_.then(e=>FS(i,e));return t.then(t=>{e.isConnected&&(x&&URL.revokeObjectURL(x),x=b.src=URL.createObjectURL(t),y.classList.add(`ready`))}),t},k=O();y.addEventListener(`click`,()=>void GS(k,i)),d.addEventListener(`click`,()=>{f.hidden=!f.hidden,d.setAttribute(`aria-expanded`,String(!f.hidden))});let A=e=>{let t=RS(e);t?(m.hidden=!0,VS(`mastodon`,i,t)):(m.hidden=!1,h.focus())};m.addEventListener(`submit`,e=>{e.preventDefault(),A(h.value)});for(let t of e.querySelectorAll(`.net`))t.addEventListener(`click`,async()=>{let e=t.dataset.to;if(e===`x`&&!matchMedia(`(pointer: coarse)`).matches){let e=WS(k);VS(`x`,i),await e&&u(M.rank.xCopied)}else if(e===`x`||e===`bluesky`||e===`threads`)VS(e,i);else if(e===`mastodon`)A(LS());else if(e===`image`)await US(k,i);else if(e===`discord`){let e=await HS(k,i);e===`copied`&&u(M.rank.discordCopied),e===`saved`&&u(M.rank.discordSaved)}});e.querySelector(`.view`).addEventListener(`click`,()=>p(g?`today`:a,g)),t.current().then(t=>{!t&&e.isConnected&&(o.hidden=!0,u(M.rank.unavailable))}),o.addEventListener(`submit`,async r=>{r.preventDefault();let a=rS(s.value);if(!iS(a)){s.focus(),s.classList.remove(`shake`),s.offsetWidth,s.classList.add(`shake`);return}gS(a),c.disabled=s.disabled=!0,c.querySelector(`.cap`).textContent=M.rank.saving;let l=await t.current(),d=l?await pS(l,a,n.durationMs,n.damage):`unavailable`;SS(d)?(c.disabled=s.disabled=!1,c.querySelector(`.cap`).textContent=M.rank.save,d!==`too-many`&&(o.hidden=!0),u(d===`too-many`?M.rank.tooMany:d===`rejected`?M.rank.rejected:M.rank.unavailable)):(g=d.id,o.hidden=!0,u(M.rank.placed(d.rank.today,d.rank.all)),Object.assign(i,{score:d.score,initials:a,rank:d.rank}),k=O(),e.querySelector(`.net`).focus({preventScroll:!0}))})}}}var lC,uC,dC=t((()=>{wv(),ge(),O(),wS(),oC(),uS(),lC=e=>e.replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),uC=e=>{for(let t of[`pointerdown`,`pointerup`,`pointermove`])e.addEventListener(t,e=>e.stopPropagation())}}));function fC(){let e=document.createElement(`button`);e.type=`button`,e.id=`sound-btn`;let t=()=>{e.innerHTML=c(vg.enabled),e.setAttribute(`aria-label`,vg.enabled?M.sound.mute:M.sound.unmute),e.setAttribute(`aria-pressed`,String(!vg.enabled))};return e.classList.toggle(`call`,!vg.chosen),e.addEventListener(`click`,()=>{vg.enabled=!vg.enabled,e.classList.remove(`call`),t()}),t(),document.body.append(e),e}var pC=t((()=>{Eg(),ge(),O()})),mC=n({});function hC(e){dw=e,document.body.classList.toggle(`aiming`,e!==null),e||$.dropped()}function gC(e,t){let n=new H(e.x,e.y+t,e.z).project(sw);return{x:(n.x+1)/2*innerWidth,y:(1-n.y)/2*innerHeight}}function _C(){let e=Q.root.position,t=(e,t)=>nw.obstacles.every(n=>Math.hypot(e-n.x,t-n.z)>n.r+.3)&&nw.layout.features.every(n=>Math.hypot(e-n.x,t-n.z)>n.r+.3);for(let n of[1.3,1,1.6,.8])for(let r of[.4,Math.PI-.4,0,Math.PI,.9,Math.PI-.9,-.5,Math.PI+.5]){let i=Math.cos(r)*n,a=Math.sin(r)*n,o=new H(e.x+Math.cos(zC)*i+Math.sin(zC)*a,0,e.z-Math.sin(zC)*i+Math.cos(zC)*a);if(o.y=J(o.x,o.z),cw(o)&&t(o.x,o.z))return o}return null}function vC(){return new Promise(e=>kw=e)}function yC(){let e=KC.domElement,t=Math.round(Math.min(e.width,e.height)*.75);if(!t)return null;let n=Q.root.position.clone().project(sw),r=B.clamp((n.x+1)/2*e.width,t/2,e.width-t/2),i=B.clamp((1-n.y)/2*e.height,t/2,e.height-t/2),a=document.createElement(`canvas`);a.width=a.height=Math.min(t,900);try{return a.getContext(`2d`).drawImage(e,r-t/2,i-t/2,t,t,0,0,a.width,a.height),a}catch{return null}}function bC(){let e=innerWidth,t=innerHeight,n=e/t;sw.aspect=n;let r=Math.max(BC,VC/n)/(2*Math.tan(B.degToRad(LC/2)));sw.position.set(Math.sin(zC)*Math.cos(RC)*r,Math.sin(RC)*r,Math.cos(zC)*Math.cos(RC)*r),sw.lookAt(0,0,0),sw.updateProjectionMatrix(),sw.updateMatrixWorld();let i=QC.fog;i.near=r*1.2,i.far=r*2.8,KC.setSize(e,t,!1);let a=Math.floor(e*KC.getPixelRatio()),o=Math.floor(t*KC.getPixelRatio());xw.setSize(a,o),Sw.setSize(a,o),Tw?.setSize(a,o),Cw.uniforms.texel.value.set(1/a,0),ww.uniforms.texel.value.set(0,1/o),xC(),CC()}function xC(){let e=0;for(let t=0;t<=8;t++){let n=t/4-1;for(let[t,r]of[[n,-1],[n,1],[-1,n],[1,n]])Fw.set(t,r),Pw.setFromCamera(Fw,sw),Pw.ray.intersectPlane(Iw.set(Iw.normal,0),Lw)&&(e=Math.max(e,Math.hypot(Lw.x,Lw.z)))}let t=Math.min(e+2,24),n=$C.shadow.camera;n.left=n.bottom=-t,n.right=n.top=t,n.updateProjectionMatrix();let r=Math.ceil(2*t/tw);r!==$C.shadow.mapSize.x&&($C.shadow.mapSize.setScalar(r),$C.shadow.map?.dispose(),$C.shadow.map=null)}function SC(e,t,n){Fw.set(B.clamp(e,-.9,HC),B.clamp(t,-.82,UC)),Pw.setFromCamera(Fw,sw),Iw.constant=0;for(let e=0;e<3;e++){if(!Pw.ray.intersectPlane(Iw,n))return!1;Iw.constant=-J(n.x,n.z)}return!0}function CC(){let e=Q.root.position.clone().project(sw);(Math.abs(e.x)>HC||Math.abs(e.y)>UC)&&SC(e.x,e.y,Lw)&&(Q.root.position.copy(Lw),Q.setTarget(Lw))}function wC(e,t){for(let n of nw.layout.features)if(Rw[t].includes(n.kind)&&Math.hypot(e.x-n.x,e.z-n.z)<=n.r+zw)return new H(n.x,J(n.x,n.z),n.z);return null}function TC(e,t,n){return SC(e/innerWidth*2-1,-(t/innerHeight)*2+1,n)}function EC(e,t,n=!1){let r=Bw(e);Q.face(t),Q.cast(),e===`circle`?$.wall(t):e===`square`?$.cast(t,`earth`,n):e===`pentagram`?$.cast(t,`columns`):e===`rhombus`?$.heal():e===`hourglass`?$.cast(t,`blast`):e===`fireStar`||e===`waterStar`?$.cast(t,e):e===`spiral`?$.cast(t,`vine`):r?$.cast(t,r):iw.show(t.x,t.z)}function DC(e,t,n){let r=gC(e,0),i=gC(e,Hw),a=Math.max(14,(r.y-i.y)*.3),o=B.clamp((n-i.y)/Math.max(1,r.y-i.y),0,1),s=i.x+(r.x-i.x)*o,c=i.y+(r.y-i.y)*o;return Math.max(0,Math.hypot(t-s,n-c)-a)}function OC(e,t,n){let r=qw?Gw:Uw,i=!1;for(let a of $.targets()){let o=DC(a.at,e,t);o>r||(r=o,a.ahead(Ww,n),n.y=J(n.x,n.z),i=!0)}if(i&&qw&&TC(e,t,Yw)){let e=Kw*(1-r/Gw);n.lerp(Yw,1-e),n.y=J(n.x,n.z)}return i}function kC(e,t){$.over||pw.aim()||!TC(e,t,Lw)||(Q.setTarget(Lw),Q.rooted||rw.show(Q.target.x,Q.target.z))}function AC(e,t){if($.over||!TC(e,t,Lw))return;let n=pw.aim();if(n&&(Lw.copy(n),Q.setTarget(Q.root.position)),dw){if(!n){if(OC(e,t,Jw))Lw.copy(Jw);else{let n=gC(Q.root.position,.3);if(Math.hypot(e-n.x,t-n.y)<Vw){hC(null);return}}}let r=dw;hC(null),EC(r,Lw,n!==null),pw.cast()}else Q.setTarget(Lw),Q.rooted||rw.show(Q.target.x,Q.target.z)}function jC(e,t,n){let r=new H;if(TC(t,n,r)||r.copy(Q.root.position),e===`circle`&&!pw.aim()&&uw(Q.root.position))return kx(`wall`,t,n),!1;if(e===`circle`||e===`rhombus`)return hC(null),pw.aim()&&Q.setTarget(Q.root.position),EC(e,$.foe()??$.dummy()??r),pw.cast(),!0;let i=Bw(e);if(i&&!wC(r,i))return kx(i,t,n),!1;hC(nb(dw,e));let a=i&&wC(r,i);return a&&(Q.face(a),ow.channel(a,Q.root.position,i),mw.charged(i)&&pw.note(M.sources[i][0],mw.active?M.sources[i][1]:M.sources.both)),!0}function MC(e){if(e.type===`tap`){if(!pw.canTap)return;e.second?kC(e.x,e.y):AC(e.x,e.y)}else if(e.type===`drawStart`)aw.begin(e.points),Sg.begin(),eT={...e.points[e.points.length-1],t:performance.now()};else if(e.type===`drawPoint`){aw.add(e.point);let t=performance.now(),n=Math.max(1,t-eT.t)/1e3;Sg.move(Math.hypot(e.point.x-eT.x,e.point.y-eT.y)/n),eT={...e.point,t}}else e.type===`drawCancel`?(aw.end(null),Sg.end()):(Sg.end(),NC(e.stroke,e.tapLike))}function NC(e,t){let n=pb(e);pw.drawn(n?.kind??null)?n?jC(n.kind,n.cx,n.cy)?(Hh(n.kind),aw.end(n),$.stored(dw??n.kind,dw!==null)):(aw.end(null),Uh()):(aw.end(null),t||Uh(),t&&pw.canTap&&AC(e[0].x,e[0].y)):aw.end(null)}function PC(e){let t=dw&&nT.over&&!$.over&&!Zw.isDrawing&&!fw.open&&!gw.open,n=t?pw.aim():null;!t||!(n?rT.copy(n):OC(nT.x,nT.y,rT)||TC(nT.x,nT.y,rT))?(tT.hide(),aT=!1):(aT?iT.lerp(rT,1-Math.exp(-e*22)):iT.copy(rT),aT=!0,tT.show(dw,iT,uw(Q.root.position),e))}function FC(){Qw.update(performance.now(),e=>Zw.cancel(e,MC));let e=uT.axes(),t=e.x||e.y?e:Qw.axes(),n=!$.over&&pw.canTap&&!pw.aim();if(!t.x&&!t.y||!n){mT&&Q.halt(),mT=!1;return}sw.getWorldDirection(fT);let r=Q.root.position,i=cw(r);for(let e of[t,{x:t.x,y:0},{x:0,y:t.y}]){if(!e.x&&!e.y)continue;let t=Uv(e,fT.x,fT.z);if(pT.set(r.x+t.x*.15,0,r.z+t.z*.15),!i||cw(pT)){Q.steer(t.x,t.z),mT=!0;return}}mT&&Q.halt(),mT=!1}function IC(e,t){let n=Se[e];XC.tier=e,XC.reason=t,KC.setPixelRatio(Math.min(devicePixelRatio,n.pixelRatio)),xw.samples!==n.samples&&(xw.samples=n.samples,xw.dispose()),KC.shadowMap.enabled=$C.castShadow=n.shadows,n.shadows||($C.shadow.map?.dispose(),$C.shadow.map=null),tw=ew*n.shadowTexel,jw=n.tiltShift&&Aw,Nw.textContent=M.tilt(jw),nw.setCover(n.cover),bC(),hT.reset(),gw.qualityChanged()}var LC,RC,zC,BC,VC,HC,UC,WC,GC,KC,qC,JC,YC,XC,ZC,QC,$C,ew,tw,nw,Q,rw,iw,aw,ow,sw,cw,lw,uw,$,dw,fw,pw,mw,hw,gw,_w,vw,yw,bw,xw,Sw,Cw,ww,Tw,Ew,Dw,Ow,kw,Aw,jw,Mw,Nw,Pw,Fw,Iw,Lw,Rw,zw,Bw,Vw,Hw,Uw,Ww,Gw,Kw,qw,Jw,Yw,Xw,Zw,Qw,$w,eT,tT,nT,rT,iT,aT,oT,sT,cT,lT,uT,dT,fT,pT,mT,hT,gT,_T,vT,yT,bT,xT,ST,CT=t((()=>{Id(),Vd(),Hp(),Xp(),Vv(),My(),Xy(),Um(),$y(),Xd(),tb(),Ub(),Qv(),fx(),V_(),wv(),Ex(),cf(),pf(),ge(),Ix(),zx(),Jv(),Ux(),I(),oy(),Kx(),tS(),dC(),wS(),Eg(),pC(),LC=32,RC=B.degToRad(54),zC=B.degToRad(24),BC=6.5,VC=5.4,HC=.9,UC=.82,WC=new W(rf?`#e3d6b4`:`#c9d3d1`),GC=matchMedia(`(pointer: coarse)`).matches,KC=new Fd({antialias:!1,powerPreference:`high-performance`}),qC=ye(KC.getContext()),JC=_e(qC),YC=be(new URLSearchParams(location.search).get(`quality`))??Kp(),XC={tier:YC??JC.tier,reason:YC?`forced`:JC.reason,auto:!YC,renderer:qC.renderer,detected:JC.tier},ZC=Se[XC.tier],KC.setPixelRatio(Math.min(devicePixelRatio,ZC.pixelRatio)),KC.shadowMap.enabled=ZC.shadows,KC.shadowMap.type=1,KC.toneMapping=rf?4:7,KC.toneMappingExposure=rf?.95:1.05,document.body.prepend(KC.domElement),QC=new Li,QC.background=WC,QC.fog=new Ii(WC,30,70),QC.add(rf?new Ls(`#d9e4f2`,`#5a4a2a`,.85):new Ls(`#e4eef0`,`#4f5f5a`,1.5)),$C=new Qs(rf?`#ffdaa8`:`#f2f4f0`,rf?3.2:1.9),rf?$C.position.set(11,9,3):$C.position.set(8,15,6),$C.castShadow=ZC.shadows,ew=48/(GC?1024:2048),tw=ew*ZC.shadowTexel,$C.shadow.camera.near=1,$C.shadow.camera.far=60,$C.shadow.bias=-5e-4,$C.shadow.normalBias=.03,rf&&($C.shadow.radius=3.5),QC.add($C,$C.target),nw=new Vp(QC),nw.cover=ZC.cover,Q=new Hm(nw.obstacles),QC.add(Q.root),rw=new Qy,iw=new Qy(`#ffb35c`,3.5),QC.add(rw.mesh,iw.mesh),aw=new dx,ow=new B_(nw.obstacles),QC.add(ow.root),sw=new Ys(LC,1,.5,200),cw=e=>{let t=new H(e.x,J(e.x,e.z),e.z).project(sw);return Math.abs(t.x)<HC*.92&&Math.abs(t.y)<UC*.92},lw=(e,t)=>{let n=null;for(let r of nw.layout.features){if(!Rw[e].includes(r.kind))continue;let i=new H(r.x,J(r.x,r.z),r.z);cw(i)&&(!n||i.distanceToSquared(t)<n.distanceToSquared(t))&&(n=i)}return n},uw=e=>nw.layout.features.some(t=>(t.kind===`runas`||t.kind===`cristales`)&&Math.hypot(e.x-t.x,e.z-t.z)<=t.r*.85),$=new Cv(Q,nw.obstacles,ow,sw,cw,lw,uw),QC.add($.root),dw=null,fw=by(),fC(),pw=new Yy({covered:()=>fw.open||gw.open||$.over,foe:()=>$.foe(),toScreen:(e,t)=>gC(e,t),selected:()=>dw,deselect:()=>hC(null),hold:e=>$.hold(e),provoke:()=>$.provoke(),ambush:()=>$.ambush(),hero:()=>Q.root.position,walkGoal:()=>_C(),finished:()=>mw.start()}),$.onHeroHit=()=>pw.hurt(),nw.noRunes=()=>!pw.done,mw=new eS({find:e=>lw(e,Q.root.position),toScreen:gC,covered:()=>fw.open||gw.open||vw.open||$.over||!pw.done||pw.showing}),hw=!1,nw.required=()=>(hw?$.rivalCount:Dv())===0||!pw.done||mw.active?[`fogata`,`estanque`]:[],gw=qp(nw,()=>{hC(null),ow.clear(),Q.root.position.set(0,J(0,0),0),Q.setTarget(Q.root.position),$.respawn(),pw.reset()},{get state(){return XC},set:e=>{XC.auto=e===null,IC(e??XC.detected,e?`forced`:JC.reason)}}),_w=Nv({get rivals(){return $.rivalCount},get difficulty(){return $.difficulty},setRivals:e=>{ow.clear(),$.setRivals(e)},setDifficulty:e=>{ow.clear(),$.setDifficulty(e)},restart:()=>gw.newMeadow()}),hw=!0,vw=cC(),yw=new CS,$.onStart=()=>yw.start($.rivalCount,$.difficulty,$.rivalCount>0&&pw.done&&!Yp),$.onEnd=e=>{let t=e===`victory`&&$.rivalCount>0,n={rivals:$.rivalCount,difficulty:$.difficulty,durationMs:$.elapsedMs,damage:$.heroDamage};_w.showEnd(e),t&&pw.done&&!Yp&&vw.fillEnd(_w.scoreSlot,yw,n,vC())},bw=new Gx,$.onDummyHit=(e,t)=>bw.hit(e,t),xw=new Qr(1,1,{samples:ZC.samples,type:hn}),Sw=new Qr(1,1,{type:hn,depthBuffer:!1}),Cw=new hs(eb(`horizontal`)),ww=new hs(eb(`vertical`)),Tw=rf?new df(Bd):null,Tw&&(ww.defines.GRADE=``,ww.defines.BLOOM=``,ww.uniforms.tBloom={value:Tw.texture}),Ew=new Bd(Cw),Dw=new Bd(ww),Ow=ww.uniforms.strength.value,kw=null,Aw=!0,jw=ZC.tiltShift,Mw=.5,Nw=document.getElementById(`tilt`),Nw.textContent=M.tilt(jw),Nw.addEventListener(`click`,e=>{e.stopPropagation(),Aw=!jw,jw=Aw,Nw.textContent=M.tilt(jw)}),Nw.addEventListener(`pointerdown`,e=>e.stopPropagation()),Pw=new _c,Fw=new V,Iw=new Pa(new H(0,1,0),0),Lw=new H,Rw={fire:[`fogata`],water:[`estanque`]},zw=.3,Bw=e=>e===`triangle`?`fire`:e===`triangleDown`?`water`:null,Vw=30,Hw=.75,Uw=16,Ww=.25,Gw=6,Kw=.65,qw=!1,Jw=new H,Yw=new H,Xw=KC.domElement,Zw=new Zv(()=>pw.canDraw),Qw=ty(),$w=e=>({id:e.pointerId,x:e.clientX,y:e.clientY,t:e.timeStamp,primary:e.isPrimary}),eT={x:0,y:0,t:0},Xw.addEventListener(`pointerdown`,e=>{if($.over)return;e.preventDefault(),qw=e.pointerType===`mouse`;let t=e.pointerType!==`mouse`&&Qw.down(e.pointerId,e.clientX,e.clientY,performance.now());(Zw.down($w(e),MC)||t)&&Xw.setPointerCapture(e.pointerId)}),Xw.addEventListener(`pointermove`,e=>{if(Qw.move(e.pointerId,e.clientX,e.clientY))return;let t=e.getCoalescedEvents?.()??[];Zw.move((t.length?t:[e]).map($w),MC)}),Xw.addEventListener(`pointerup`,e=>{Qw.up(e.pointerId)||Zw.up($w(e),MC)}),tT=new Tx(rv),QC.add(tT.root),nT={x:0,y:0,over:!1},Xw.addEventListener(`pointermove`,e=>{e.pointerType===`mouse`&&(qw=!0,nT.x=e.clientX,nT.y=e.clientY,nT.over=!0)}),Xw.addEventListener(`pointerleave`,e=>{e.pointerType===`mouse`&&(nT.over=!1)}),rT=new H,iT=new H,aT=!1,oT=e=>{Qw.up(e.pointerId),Zw.cancel(e.pointerId,MC)},Xw.addEventListener(`pointercancel`,oT),Xw.addEventListener(`lostpointercapture`,oT),Xw.addEventListener(`contextmenu`,e=>e.preventDefault()),sT=e=>e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement;for(let e of[`selectstart`,`dragstart`,`contextmenu`])document.addEventListener(e,e=>{sT(e.target)||e.preventDefault()});document.addEventListener(`gesturestart`,e=>e.preventDefault()),cT=e=>e.cancelable&&e.preventDefault(),Xw.addEventListener(`touchstart`,cT,{passive:!1}),Xw.addEventListener(`touchmove`,cT,{passive:!1}),lT=e=>{for(let t=e instanceof Element?e:null;t;t=t.parentElement){let e=getComputedStyle(t);if(t.scrollHeight>t.clientHeight&&/auto|scroll/.test(e.overflowY)||t.scrollWidth>t.clientWidth&&/auto|scroll/.test(e.overflowX))return!0}return!1},document.addEventListener(`touchmove`,e=>!lT(e.target)&&cT(e),{passive:!1}),uT=new qv,dT=Bx(),uT.onChange=(e,t)=>dT.press(e,t),Lx(()=>pw.done&&!pw.showing&&dT.settled()&&!fw.open&&!gw.open&&!vw.open&&!$.over&&document.getElementById(`match-spot`)?.hidden!==!1),uT.listen(window,()=>fw.open||gw.open),fT=new H,pT=new H,mT=!1,hT=new F,addEventListener(`resize`,bC),bC(),$.respawn(),gT=document.getElementById(`fps`),_T=0,vT=0,yT=new rc,bT=new H,xT=0,ST=new H,vg.locator=e=>{ST.set(e.x,J(e.x,e.z),e.z).project(sw);let t=Math.hypot(e.x-Q.root.position.x,e.z-Q.root.position.z);return{pan:ST.x,near:1/(1+t*.18)}},KC.setAnimationLoop(e=>{yT.update(e);let t=xT?(e-xT)/1e3:0;xT=e;let n=xe.indexOf(XC.tier);XC.auto&&!document.hidden&&n<xe.length-1&&hT.tick(t)&&IC(xe[n+1],`fps`);let r=Math.min(yT.getDelta(),1/20);gw.open||nw.update(r),pw.update(r),!fw.open&&!gw.open&&!vw.open&&!pw.paused&&(FC(),Q.update(r),rw.update(r),iw.update(r),ow.update(r),$.update(r)),bw.set($.rivalCount===0),mw.update(r),PC(r),aw.update(r),KC.setRenderTarget(xw),KC.render(QC,sw),Tw?.render(KC,xw.texture),jw&&(bT.copy(Q.root.position).project(sw),Mw+=((bT.y+1)/2-Mw)*Math.min(1,r*4),Cw.uniforms.focus.value=ww.uniforms.focus.value=Mw,Cw.uniforms.tDiffuse.value=xw.texture,KC.setRenderTarget(Sw),Ew.render(KC)),ww.uniforms.strength.value=jw?Ow:0,ww.uniforms.tDiffuse.value=jw?Sw.texture:xw.texture,KC.setRenderTarget(null),Dw.render(KC),kw&&=(kw(yC()),null),_T++,vT+=r,vT>=.5&&(gT.textContent=`${Math.round(_T/vT)} fps`,_T=0,vT=0)})}));async function wT(){let e=Ae();if(e===`none`)return void Ne(`none`);e===`software`&&!Me()&&await Ne(`software`);try{await ze(()=>Promise.resolve().then(()=>(CT(),mC)),void 0,import.meta.url)}catch(e){console.error(e),!document.getElementById(`gpu-notice`)&&/webgl/i.test(String(e))&&Ne(`none`)}}wT();