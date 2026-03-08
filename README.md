# SocialCaution Privacy Exposure Index (Core)

This repository contains the **calculation methodology** for SocialCaution's Privacy Exposure Index (0–100). It is published for transparency and community review.

## What's included

- **Privacy Exposure Index** — 8-factor calculation (see `index.js`)
- **Example risk profiles** — 8 services for testing and verification (`examples/`)
- **Methodology description** — `METHODOLOGY.md`

## What's not included

- SocialCaution's full service database
- The full SocialCaution app, premium features, or payment integration

## Usage

```js
const { calculateExposureIndex, getExposureLevel } = require('./index.js');

const riskProfile = {
  typicalRisks: ['...'],
  knownIssues: ['...'],
  regulations: ['GDPR', 'CCPA'],
  recommendedActions: ['...']
};
const relationship = { parent: 'meta', siblings: ['instagram'], category: 'social-media' };

const score = calculateExposureIndex(riskProfile, relationship, 'social-media');
const { level } = getExposureLevel(score); // e.g. "High"
```

Run the examples:

```bash
node examples/run.js
```

## License

MIT
