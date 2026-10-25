// Fails when any included asset in the manifest lacks approved rights.
// Wired into `npm run build:production`. Presentation builds skip this check.
import { assetManifest } from '../src/assets/manifest.ts'

const blocked = assetManifest.filter((asset) => asset.included && asset.rights !== 'approved')

if (blocked.length > 0) {
  console.error('Production build blocked: assets without approved usage rights:')
  for (const asset of blocked) console.error(`  - ${asset.id} (${asset.rights}) ← ${asset.sourcePage}`)
  process.exit(1)
}
console.log('All included assets are approved.')
