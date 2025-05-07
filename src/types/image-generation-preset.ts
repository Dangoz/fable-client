/**
 * Image‑generation “Preset” schema and sample data
 */
export interface Preset {
  /** Short, human‑readable identifier (e.g. “Film Noir”) */
  name: string
  /** One‑line description of the overarching look or concept */
  theme: string
  /** Palette guidance (free‑form text) */
  color: string
  /** Specific camera(s) to emulate, if any */
  camera?: string
  /** Film stock or digital treatment */
  filmStock?: string
  /** How the scene should be lit */
  lighting: string
  /** Rules for altering the appearance of subjects / environment */
  contentTransformation?: string
  /** High‑level emotional tone */
  vibe?: string
  /** URL or identifier for an accompanying reference image */
  imageReference?: string
}

export const PRESETS: Preset[] = [
  {
    name: 'Cardboard & Papercraft',
    theme: 'Cardboard & Papercraft',
    color:
      'Earthy tones like brown, beige, and muted pastels, with occasional pops of color to simulate colored paper.',
    filmStock: 'analog film',
    lighting: 'Soft, diffused lighting',
    contentTransformation:
      'Everything in the scene—from characters to objects and scenery—should be transformed into cardboard, paper, and glue. Elements should have visible creases, folds, and textures resembling handcrafted models.',
  },
  {
    name: 'Film Noir',
    theme: 'Film Noir',
    color: 'High contrast black and white, deep shadows with selective highlights.',
    camera: 'Arri Alexa Mini, RED Monochrome, or vintage 35mm cameras',
    filmStock: 'Ilford HP5, Kodak Double-X, or high-contrast digital monochrome settings',
    lighting: 'Low key, chiaroscuro lighting with hard shadows, venetian blind effects, and strong backlighting.',
    vibe: 'Moody, mysterious, suspenseful',
  },
  {
    name: 'Whimsical Stop Motion',
    theme: 'Playful handcrafted animation',
    color: 'Bright, saturated primary colors with handcrafted textures.',
    filmStock: 'Smooth frame-by-frame animation with visible stop-motion quirks.',
    lighting: 'Controlled spotlights with small shadows to highlight miniature craftsmanship.',
    vibe: 'Quirky, charming, family-friendly',
  },
  {
    name: 'Balloon World',
    theme: 'Everything is inflated like a balloon',
    color: 'Glossy, bright colors—reds, yellows, blues, and metallics like gold and silver.',
    filmStock: 'Clean digital with exaggerated reflections on shiny surfaces.',
    lighting: 'High-key lighting with glossy highlights to mimic rubbery textures.',
    contentTransformation:
      'All characters, objects, and environments look inflated, with visible seams and a bouncy quality.',
    vibe: 'Fun, surreal, viral-ready',
  },
]
