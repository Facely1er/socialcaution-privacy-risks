/**
 * Example service relationships for the 8-factor model (Factor 5 & 8).
 * Only entries for services in examples/profiles.js. Full mapping is proprietary.
 */

module.exports = {
  google: { parent: 'alphabet', parentName: 'Alphabet', siblings: ['youtube', 'google-drive'], category: 'search-email' },
  facebook: { parent: 'meta', parentName: 'Meta', siblings: ['instagram', 'whatsapp'], category: 'social-media' },
  instagram: { parent: 'meta', parentName: 'Meta', siblings: ['facebook', 'whatsapp'], category: 'social-media' },
  tiktok: { parent: 'bytedance', parentName: 'ByteDance', siblings: [], category: 'social-media' },
  whatsapp: { parent: 'meta', parentName: 'Meta', siblings: ['facebook', 'instagram'], category: 'messaging' },
  signal: { parent: 'signal-foundation', parentName: 'Signal Foundation', siblings: [], category: 'messaging' },
  dropbox: { parent: 'dropbox', parentName: 'Dropbox Inc', siblings: [], category: 'cloud-storage' },
  netflix: { parent: 'netflix', parentName: 'Netflix Inc', siblings: [], category: 'streaming' }
};
