// Images come from the original WordPress uploads. By default they are loaded from the
// live site. Run `npm run fetch-media` to download and convert them to AVIF/WebP in
// /public/media, then build with VITE_LOCAL_MEDIA=true to serve them locally.
const REMOTE = 'https://venicewellnessinstitute.com/wp-content/uploads'
const LOCAL = import.meta.env.VITE_LOCAL_MEDIA === 'true'

export type Media = { src: string; avif?: string; webp?: string }

// Photos under clinic/ were supplied directly by the clinic and live in /public/media/clinic,
// so they are always served locally whatever VITE_LOCAL_MEDIA says.
export const media = (path: string): Media => {
  if (!LOCAL && !path.startsWith('clinic/')) return { src: `${REMOTE}/${path}` }
  const base = `/media/${path.replace(/\.[a-z]+$/i, '')}`
  return { src: `/media/${path}`, avif: `${base}.avif`, webp: `${base}.webp` }
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

