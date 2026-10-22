/**
 * Helper build URL Cloudinary với transformation on-the-fly.
 * Ảnh gốc ở Cloudinary là ảnh chụp thợ (0.5–2.2MB), hiển thị trong web
 * chỉ cần thumbnail đã resize + nén tự động -> giảm ~90% băng thông.
 *
 * Ví dụ:
 *   cdn(THUMB_640, 'https://res.cloudinary.com/xxx/image/upload/v1/TH/a.jpg')
 *   -> 'https://res.cloudinary.com/xxx/image/upload/q_auto,f_auto,c_limit,w_640/v1/TH/a.jpg'
 */

const inh = (transform: string, url: string) => {
  if (!/res\.cloudinary\.com/.test(url)) return url;
  if (!/\/image\/upload\//.test(url)) return url;
  return url.replace('/image/upload/', `/image/upload/${transform}/`);
};

/** Ảnh hero tròn/dải ngang màn hình đầu (hiển thị ~240–300px, 2x DPR) */
export const HERO_520 = 'q_auto,f_auto,c_limit,w_520';
/** Ảnh card 300px (strip, timeline, chân dung) */
export const CARD_640 = 'q_auto,f_auto,c_limit,w_640';
/** Ảnh grid lớn (Section08, ~512–700px, 2x DPR) */
export const GRID_1000 = 'q_auto,f_auto,c_limit,w_1000';
/** Thumbnail album masonry (cột ~33%, 2x DPR) */
export const ALBUM_640 = 'q_auto,f_auto,c_limit,w_640';
/** Ảnh xem full trong lightbox (tải khi mở preview) */
export const VIEW_1920 = 'q_auto,f_auto,c_limit,w_1920';

export const cdnHero = (url: string) => inh(HERO_520, url);
export const cdnCard = (url: string) => inh(CARD_640, url);
export const cdnGrid = (url: string) => inh(GRID_1000, url);
export const cdnAlbum = (url: string) => inh(ALBUM_640, url);
export const cdnView = (url: string) => inh(VIEW_1920, url);

/** Ảnh hero màn hình đầu (coi mỗi url một lần để preload + render) */
export const HERO_IMG_A = 'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07568_kb8kpb.jpg';
export const HERO_IMG_B = 'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129841/TH/ING07062_onvh4q.jpg';
