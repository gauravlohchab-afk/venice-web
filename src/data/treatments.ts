// All treatment copy is taken from the treatment pages and the Services page of
// venicewellnessinstitute.com. Nothing here is new information: no prices,
// durations or session counts are published on the original site, so none are shown.

export type Category = 'facial' | 'body' | 'hair'

export type Treatment = {
  slug: string
  name: string // H1 on the original page
  short: string // name used in lists
  category: Category
  title: string // the treatment's own H2 on the original page
  tagline: string
  whyHeading: string
  lead: string
  body: string[]
  summary: string // line from the Services page
  areas?: string[]
  image: string
  metaDescription: string
}

export const categories: Record<Category, { label: string; plural: string; intro: string }> = {
  facial: {
    label: 'Facial Treatment',
    plural: 'Facial Treatments',
    intro: 'Restore your natural glow with solutions targeting aging, acne, pigmentation and dullness.',
  },
  body: {
    label: 'Body Treatment',
    plural: 'Body Treatments',
    intro: '10D Elite Laser Therapy, Cryo Fat Freeze, Infrared Sauna Pod Therapy and EMS Body Sculpting.',
  },
  hair: {
    label: 'Hair Treatment',
    plural: 'Hair Treatments',
    intro: 'From stimulating regrowth to gentle, long-term hair removal, complete care for hair.',
  },
}

export const treatments: Treatment[] = [
  {
    slug: 'acne-treatment',
    name: 'Acne Treatment',
    short: 'Acne Cleanse',
    category: 'facial',
    title: 'Acne-Cleanse Treatment',
    tagline: 'Deep purification for acne-prone skin',
    whyHeading: 'Why Choose Acne-Cleanse',
    lead: 'A reliable solution for consistent acne management.',
    body: [
      'A specialised acne treatment that unclogs pores, removes impurities and reduces breakouts for clearer, healthier-looking skin.',
      'The treatment combines exfoliation, steaming, extractions, antibacterial solutions and calming masks to reduce oil, bacteria and inflammation while improving overall clarity.',
    ],
    summary: 'An intensive acne-cleansing treatment that clears breakouts and improves texture.',
    image: '2025/12/Acne-Treatment.png',
    metaDescription: 'Acne-Cleanse Treatment at Venice Wellness Institute: deep purification for acne-prone skin.',
  },
  {
    slug: 'pico-treatment',
    name: 'Pico Treatment',
    short: 'Pico Laser',
    category: 'facial',
    title: 'Pico Laser Skin Renewal',
    tagline: 'Fast, powerful results with minimal downtime',
    whyHeading: 'Why Choose Pico',
    lead: 'Fast, safe, effective for all skin tones.',
    body: [
      'Pico Laser targets pigment and acne scars with ultra-short pulses that break pigment into tiny particles, for clearer, smoother skin, quickly.',
      'Its high-speed pulses break up pigmentation without overheating the skin, making it one of the safest and most effective options for dark spots, melasma, sun damage and scars.',
    ],
    summary: 'An ultra-fast Pico Laser for pigmentation, scars and fine lines.',
    image: '2025/12/Pico-Treatment.png',
    metaDescription: 'Pico Laser Skin Renewal at Venice Wellness Institute: fast, powerful results with minimal downtime.',
  },
  {
    slug: 'carbon-treatment',
    name: 'Carbon Treatment',
    short: 'Carbon Laser',
    category: 'facial',
    title: 'Carbon Laser Peel',
    tagline: 'Deep cleansing & brightening for oily and dull skin',
    whyHeading: 'Why Choose Carbon Laser',
    lead: 'Safe and effective recovery therapy.',
    body: [
      'A powerful detoxifying treatment that uses carbon and laser energy to purify pores, brighten pigmentation, reduce acne and refine texture instantly.',
      'A carbon mask is applied to the face and absorbs into the pores. Laser energy then targets the carbon, removing impurities, oil, dead skin and bacteria, leaving skin brighter, clearer and smoother, with tighter-looking pores and less pigmentation.',
    ],
    summary: 'A powerful carbon laser that targets pigmentation and breakouts.',
    image: '2025/12/Carbon-Treatment.png',
    metaDescription: 'Carbon Laser Peel at Venice Wellness Institute: deep cleansing and brightening for oily and dull skin.',
  },
  {
    slug: 'thermage-treatment',
    name: 'Thermage Treatment',
    short: 'Thermage',
    category: 'facial',
    title: 'Thermage Skin Tightening',
    tagline: 'Non-invasive lifting for youthful, firmer skin',
    whyHeading: 'Why Choose Thermage',
    lead: 'For loose skin, early signs of aging, fine lines and jawline definition.',
    body: [
      'A radiofrequency treatment that tightens loose skin, smooths fine lines and defines facial contours, without surgery or downtime.',
      'Deep radiofrequency energy heats targeted layers of the skin to stimulate collagen regeneration. Over the following weeks, skin looks tighter, smoother and more contoured, and results continue to improve over time.',
    ],
    summary: 'A natural lift: Thermage tightens loose skin and enhances facial contours.',
    image: '2025/12/Thermage-Treatment.png',
    metaDescription:
      'Thermage treatment improves skin tightening and reduces wrinkles without surgery for smoother, firmer and younger looking skin. Book your consultation today.',
  },
  {
    slug: 'organic-botox-treatment',
    name: 'Organic Botox Treatment',
    short: 'Organic Botox',
    category: 'facial',
    title: 'Organic Botox Facial',
    tagline: 'Needle-free anti-aging for sensitive skin',
    whyHeading: 'Why Choose Organic Botox',
    lead: 'Safe, natural, effective, with zero downtime.',
    body: [
      'Softens wrinkles, smooths lines and boosts natural firmness with a gentle botanical formulation suitable for sensitive skin.',
      'Unlike injectable Botox, this is a topical, non-invasive treatment. Natural peptides and tightening ingredients relax expression lines and deeply hydrate the skin for a firmer look, without needles.',
    ],
    summary: 'Naturally firmer, smoother skin with a gentle organic Botox designed for sensitive skin.',
    image: '2025/12/Organic-Botox-Treatment.png',
    metaDescription: 'Organic Botox Facial at Venice Wellness Institute: needle-free anti-aging for sensitive skin.',
  },
  {
    slug: 'hydra-treatment',
    name: 'Hydra Treatment',
    short: 'Hydrafacial',
    category: 'facial',
    title: 'Hydrafacial Skin Rejuvenation',
    tagline: 'Hydrate, cleanse & reveal glowing skin',
    whyHeading: 'Why Choose Hydrafacial',
    lead: 'A celebrity-favourite treatment with instant, event-ready results.',
    body: [
      'A three-step facial that deeply cleanses, exfoliates, extracts impurities and infuses the skin with hydrating serums for an immediate glow.',
      'Vortex-based suction technology removes buildup and nourishes the skin with antioxidants and peptides. Suited to dry, dull or uneven skin.',
    ],
    summary: 'A deep-cleansing Hydrafacial that hydrates and revitalises dull skin.',
    image: '2025/12/Hydra-Treatment.png',
    metaDescription: 'Hydrafacial Skin Rejuvenation at Venice Wellness Institute: hydrate, cleanse and reveal glowing skin.',
  },
  {
    slug: 'hifu-7d-treatment',
    name: 'Hifu 7D Treatment',
    short: 'HIFU 7D',
    category: 'facial',
    title: 'HIFU 7D Lifting',
    tagline: 'Deep-layer tightening with instant lift',
    whyHeading: 'Why Choose HIFU 7D',
    lead: 'One of the fastest lifting results, without needles or surgery.',
    body: [
      'HIFU 7D targets multiple layers of the skin, including the SMAS layer, for a dramatic lifting and firming effect, similar to a facelift but non-invasive.',
      'Ultrasound energy heats the deeper layers without damaging the surface, stimulating collagen and immediate tissue contraction for a firmer, more sculpted look.',
    ],
    areas: ['Face', 'Jawline', 'Double chin', 'Neck'],
    summary: 'Instant lift and deep skin tightening with HIFU 7D.',
    image: '2025/12/Hifu-7D.png',
    metaDescription:
      'HIFU 7D treatment lifts and tightens sagging skin naturally for a firmer and more youthful appearance without surgery. Schedule your appointment today.',
  },
  {
    slug: 'co2-treatment',
    name: 'Co2 Treatment',
    short: 'CO₂ Laser',
    category: 'facial',
    title: 'CO₂ Fractional Laser Resurfacing',
    tagline: 'Advanced correction for scars and uneven skin',
    whyHeading: 'Why Choose CO₂ Laser',
    lead: 'One of the most effective treatments for scars and texture improvement.',
    body: [
      'A gold-standard treatment for acne scars, textured skin, pigmentation and deep rejuvenation.',
      'Fractional CO₂ creates microscopic channels in the skin, triggering collagen remodelling and renewal to reduce scars and resurface the skin for a smoother, more uniform look. Ideal for those needing deep correction.',
    ],
    summary: 'Precision CO₂ resurfacing for acne scars and uneven tone.',
    image: '2025/12/Co2-Treatment.png',
    metaDescription: 'CO₂ Fractional Laser Resurfacing at Venice Wellness Institute: advanced correction for scars and uneven skin.',
  },
  {
    slug: '10d-slim-treatment',
    name: '10D Slim Treatment',
    short: '10D Elite Slim',
    category: 'body',
    title: '10D Elite Laser Therapy',
    tagline: 'Anti-inflammatory & mobility-improving care',
    whyHeading: 'Why Choose 10D Elite',
    lead: 'Safe and effective recovery therapy.',
    body: [
      'An advanced therapeutic laser that reduces inflammation, enhances circulation and promotes tissue recovery. Ideal for fitness, mobility and pain relief.',
      'The 10D laser penetrates deep tissue to stimulate repair, reduce swelling and speed healing. Suitable for joint stiffness, muscle pain and recovery enhancement.',
    ],
    summary: 'An advanced 10D Elite Laser that boosts circulation and supports mobility.',
    image: '2025/12/10D-slim-treatment.png',
    metaDescription: '10D Elite Laser Therapy at Venice Wellness Institute: anti-inflammatory and mobility-improving care.',
  },
  {
    slug: 'cryo-treatment',
    name: 'Cryo Treatment',
    short: 'Cryo Fat Freeze',
    category: 'body',
    title: 'Cryo Fat Freeze',
    tagline: 'Freeze fat cells for targeted inch loss',
    whyHeading: 'Why Choose Cryo Freeze',
    lead: 'A painless alternative to surgical fat reduction.',
    body: [
      'Cryotherapy uses cooling technology to freeze and permanently destroy stubborn fat cells, helping to reshape areas of the body naturally.',
      'Fat cells are cooled to a controlled temperature so they crystallise and break down. Over the following weeks, the body naturally eliminates the frozen cells, leading to visible inch loss.',
    ],
    summary: 'Cooling technology that targets stubborn fat and naturally trims inches.',
    image: '2025/12/Cryo-Treatment.png',
    metaDescription: 'Cryo Fat Freeze at Venice Wellness Institute: freeze fat cells for targeted inch loss.',
  },
  {
    slug: 'sauna-treatment',
    name: 'Sauna Treatment',
    short: 'Sauna Pod',
    category: 'body',
    title: 'Infrared Sauna Pod Therapy',
    tagline: 'Total detox & metabolic boost',
    whyHeading: 'Why Choose Sauna Pod',
    lead: 'Perfect for detox, relaxation and metabolism enhancement.',
    body: [
      'Relax and recharge in an infrared sauna pod that helps detoxify the body, improve circulation, burn calories and boost overall wellness.',
      'Infrared heat deeply warms the body, encouraging detox through sweat, reducing muscle tension, improving sleep and supporting weight loss.',
    ],
    summary: 'A relaxing sauna pod that flushes out toxins and boosts circulation.',
    image: '2025/12/Sauna-Treatment.png',
    metaDescription: 'Infrared Sauna Pod Therapy at Venice Wellness Institute: total detox and metabolic boost.',
  },
  {
    slug: 'ems-treatment',
    name: 'EMS Treatment',
    short: 'EMS Express',
    category: 'body',
    title: 'EMS Body Sculpting',
    tagline: 'Fast, non-invasive muscle toning',
    whyHeading: 'Why Choose EMS',
    lead: 'Perfect for busy individuals wanting quick toning.',
    body: [
      'EMS uses electrical muscle stimulation to contract and tone muscles rapidly, the equivalent of thousands of crunches or squats in one session.',
      'The EMS machine triggers deep muscle contractions that regular workouts cannot achieve, helping to define the body.',
    ],
    areas: ['Abs', 'Thighs', 'Buttocks', 'Arms'],
    summary: 'High-intensity EMS muscle stimulation to tone and sculpt.',
    image: '2025/12/EMS-Treatment.png',
    metaDescription: 'EMS Body Sculpting at Venice Wellness Institute: fast, non-invasive muscle toning.',
  },
  {
    slug: 'hair-regrowth-treatment',
    name: 'Hair Regrowth Treatment',
    short: 'Hair Regrowth',
    category: 'hair',
    title: 'Hair Regrowth Therapy',
    tagline: 'Stimulates natural hair growth & strengthens roots',
    whyHeading: 'Why Choose Hair Regrowth',
    lead: 'A safe, gradual, natural hair recovery solution.',
    body: [
      'A specialised treatment that boosts circulation, nourishes follicles and supports regrowth for fuller, healthier hair.',
      'A blend of micro-stimulation, serums and scalp activation methods revitalises weak follicles and enhances growth cycles. Ideal for early to moderate hair thinning.',
    ],
    summary: 'Regrowth therapy that strengthens hair from the roots.',
    image: '2025/12/Hair-Regrowth-Treatment.png',
    metaDescription: 'Hair Regrowth Therapy at Venice Wellness Institute: stimulates natural hair growth and strengthens roots.',
  },
  {
    slug: 'hair-removal-treatment',
    name: 'Hair Removal Treatment',
    short: 'Laser Hair Removal',
    category: 'hair',
    title: 'Laser Hair Removal Treatment',
    tagline: 'Smooth, hair-free skin with long-lasting results',
    whyHeading: 'Why Choose Laser Hair Removal',
    lead: 'A convenient, long-lasting alternative to waxing or shaving.',
    body: [
      'Laser hair removal targets hair follicles to reduce growth permanently, for silky, irritation-free skin.',
      'Highly advanced laser pulses heat the follicle at the root, preventing regrowth while keeping the skin safe.',
    ],
    areas: ['Legs', 'Arms', 'Underarms', 'Face', 'Back', 'Bikini'],
    summary: 'Safe, effective laser hair removal for smoother skin.',
    image: '2025/12/Hair-Removal-Treatment.png',
    metaDescription: 'Laser Hair Removal at Venice Wellness Institute: smooth, hair-free skin with long-lasting results.',
  },
]

export const byCategory = (c: Category) => treatments.filter((t) => t.category === c)
export const findTreatment = (slug?: string) => treatments.find((t) => t.slug === slug)
