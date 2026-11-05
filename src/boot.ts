import { gpuStatus, showGpuNotice, softwareAccepted } from './gpu';

/**
 * Entry point: the game needs WebGL 2 on the graphics card. Without it the page would stay blank,
 * so check first and explain how to turn hardware acceleration on.
 */
async function boot() {
  const status = gpuStatus();
  if (status === 'none') return void showGpuNotice('none');
  if (status === 'software' && !softwareAccepted()) await showGpuNotice('software');
  try {
    await import('./main');
  } catch (err) {
    console.error(err);
    if (!document.getElementById('gpu-notice') && /webgl/i.test(String(err))) showGpuNotice('none');
  }
}

boot();
