// All images are self-hosted in /public/media as AVIF + WebP with a JPG fallback.
// Paths keep the original WordPress upload names (e.g. 2025/11/1.png) so `npm run fetch-media`
// can refresh them; clinic/ holds photos supplied directly by the clinic.
export type Media = { src: string; avif: string; webp: string }

export const media = (path: string): Media => {
  const base = `/media/${path.replace(/\.[a-z]+$/i, '')}`
  return { src: `${base}.jpg`, avif: `${base}.avif`, webp: `${base}.webp` }
}

export const img = {
  main: '2025/11/venice-ph-main.png',
  about: '2023/10/venice-ph-1.png',
  hairResult: '2025/11/Treatment-venicePH.png',
  before1: '2025/11/1.png',
  after1: '2025/11/2.png',
  before2: '2025/11/3.png',
  after2: '2025/11/4.png',
  // clinic interiors (1000 x 1000)
  reception: 'clinic/reception-desk.jpg',
  lounge: 'clinic/marble-lounge.jpg',
  waiting: 'clinic/waiting-area.jpg',
  corridor: 'clinic/corridor.jpg',
  trolley: 'clinic/treatment-room-trolley.jpg',
  welcome: 'clinic/welcome-table.jpg',
  treatmentRoom: 'clinic/treatment-room.jpg',
} as const

