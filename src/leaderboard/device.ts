/**
 * Which kind of device a match was played on. The ranking only shows the category (phone, tablet, desktop);
 * the rest is stored for us to look at later. Shared by the game (which knows touch points and screen size)
 * and the server (which only trusts what it can read from the request and re-derives the category itself).
 */
export type Category = 'mobile' | 'tablet' | 'desktop';
export type Os = 'ios' | 'ipados' | 'android' | 'windows' | 'macos' | 'chromeos' | 'linux' | 'other';
export type Device = 'iphone' | 'ipad' | 'android-phone' | 'android-tablet' | 'mac' | 'windows-pc' | 'chromebook' | 'linux-pc' | 'other';

export interface DeviceHints {
  /** navigator.maxTouchPoints: iPads since iPadOS 13 say they are Macs, but Macs have no touch screen. */
  touchPoints?: number;
  /** navigator.userAgentData.mobile, where the browser offers it. */
  mobile?: boolean;
  /** navigator.userAgentData.platform, e.g. "Android", "macOS". */
  platform?: string;
  /** The shorter side of the screen in CSS pixels. */
  shortSide?: number;
}

export interface DeviceInfo {
  category: Category;
  os: Os;
  device: Device;
  browser: string;
}

function browserOf(ua: string): string {
  if (/EdgA?\//.test(ua)) return 'edge';
  if (/SamsungBrowser\//.test(ua)) return 'samsung';
  if (/OPR\/|Opera/.test(ua)) return 'opera';
  if (/FxiOS|Firefox\//.test(ua)) return 'firefox';
  if (/CriOS|Chrome\//.test(ua)) return 'chrome';
  if (/Safari\//.test(ua)) return 'safari';
  return 'other';
}

export function classifyDevice(ua: string, hints: DeviceHints = {}): DeviceInfo {
  const browser = browserOf(ua);
  const touch = (hints.touchPoints ?? 0) > 1;
  const platform = (hints.platform ?? '').toLowerCase();

  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && touch)) return { category: 'tablet', os: 'ipados', device: 'ipad', browser };
  if (/iPhone|iPod/.test(ua)) return { category: 'mobile', os: 'ios', device: 'iphone', browser };
  if (/Android/i.test(ua) || platform === 'android') {
    // Android phones put "Mobile" in the user agent, tablets leave it out; the client hint says it outright.
    const phone = hints.mobile ?? /Mobile/.test(ua);
    const tablet = !phone || (hints.shortSide !== undefined && hints.shortSide >= 600);
    return tablet
      ? { category: 'tablet', os: 'android', device: 'android-tablet', browser }
      : { category: 'mobile', os: 'android', device: 'android-phone', browser };
  }
  if (/CrOS/.test(ua) || platform === 'chrome os') return { category: 'desktop', os: 'chromeos', device: 'chromebook', browser };
  if (/Windows/.test(ua) || platform === 'windows') return { category: 'desktop', os: 'windows', device: 'windows-pc', browser };
  if (/Macintosh|Mac OS X/.test(ua) || platform === 'macos') return { category: 'desktop', os: 'macos', device: 'mac', browser };
  if (/Linux|X11/.test(ua) || platform === 'linux') {
    if (hints.mobile) return { category: 'mobile', os: 'linux', device: 'other', browser };
    return { category: 'desktop', os: 'linux', device: 'linux-pc', browser };
  }
  if (hints.mobile) return { category: 'mobile', os: 'other', device: 'other', browser };
  return { category: 'desktop', os: 'other', device: 'other', browser };
}
