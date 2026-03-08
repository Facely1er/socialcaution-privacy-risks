/**
 * Privacy Exposure Index Calculator (standalone)
 * Calculates a 0-100 score representing privacy exposure/risk for a service.
 * Higher score = higher privacy exposure/risk.
 *
 * METHODOLOGY: 8-factor model. See METHODOLOGY.md for full description.
 * @version 2.5.0
 * @license MIT
 */

const BREACH_KEYWORDS = [
  'breach', 'hack', 'leak', 'exposed', 'compromised', 'stolen',
  'unauthorized access', 'data exposure', 'security incident', 'credential stuffing'
];
const CRITICAL_BREACH_HINTS = ['critical', 'major', 'billion', 'ransomware'];
const HIGH_BREACH_HINTS = ['million', 'significant', 'widespread', 'large-scale'];
const BREACH_SEVERITY_BY_LABEL = { low: 1, medium: 1, high: 2, critical: 3 };
const SHARING_KEYWORDS = ['third-party', 'advertis', 'shares data', 'data broker'];

const CATEGORY_RISK_SCORES = {
  financial: 8, dating: 8, health: 8, lifestyle: 7, 'smart-home': 6, 'social-media': 6,
  'cloud-storage': 5, productivity: 4, messaging: 4, 'search-email': 4, gaming: 4,
  shopping: 3, news: 3, 'password-manager': 3, education: 2, streaming: 2, browser: 2,
  vpn: 1, 'security-tools': 1
};
const PRIVACY_ENHANCING_CATEGORIES = ['security-tools', 'vpn'];

function inferSeverityFromStructuredBreach(breach) {
  const severityLabel = String(breach?.severity || '').toLowerCase();
  let severity = BREACH_SEVERITY_BY_LABEL[severityLabel] || 0;
  const affectedUsers = Number(breach?.affected_users || 0);
  if (affectedUsers >= 1_000_000_000) severity = Math.max(severity, 3);
  else if (affectedUsers >= 1_000_000) severity = Math.max(severity, 2);
  else if (affectedUsers > 0) severity = Math.max(severity, 1);
  const description = String(breach?.description || '').toLowerCase();
  if (CRITICAL_BREACH_HINTS.some(k => description.includes(k))) severity = Math.max(severity, 3);
  else if (HIGH_BREACH_HINTS.some(k => description.includes(k))) severity = Math.max(severity, 2);
  return severity;
}

function detectStructuredBreachHistory(breaches) {
  const list = Array.isArray(breaches) ? breaches : [];
  let severity = 0;
  list.forEach(breach => { severity = Math.max(severity, inferSeverityFromStructuredBreach(breach)); });
  return { breachCount: list.length, severity };
}

function detectKeywordBreachHistory(riskProfile) {
  const knownIssues = riskProfile.knownIssues || [];
  let breachCount = 0, severity = 0;
  knownIssues.forEach(issue => {
    const lowerIssue = issue.toLowerCase();
    if (BREACH_KEYWORDS.some(keyword => lowerIssue.includes(keyword))) {
      breachCount++;
      if (CRITICAL_BREACH_HINTS.some(k => lowerIssue.includes(k))) severity = Math.max(severity, 3);
      else if (HIGH_BREACH_HINTS.some(k => lowerIssue.includes(k))) severity = Math.max(severity, 2);
      else severity = Math.max(severity, 1);
    }
  });
  return { breachCount, severity };
}

function detectBreachHistory(riskProfile, breaches) {
  const structured = detectStructuredBreachHistory(breaches);
  const keyword = detectKeywordBreachHistory(riskProfile);
  if (structured.breachCount === 0) return { breachCount: keyword.breachCount, severity: keyword.severity };
  return {
    breachCount: Math.max(structured.breachCount, keyword.breachCount),
    severity: Math.max(structured.severity, keyword.severity)
  };
}

function getThirdPartySharingScore(riskProfile, relationship, config) {
  let score = 0;
  const knownIssues = riskProfile.knownIssues || [];
  if (knownIssues.some(issue => SHARING_KEYWORDS.some(k => issue.toLowerCase().includes(k)))) score += config.issuesPoints;
  if (relationship?.parent || (relationship?.siblings && relationship.siblings.length > 0)) score += config.relationshipPoints;
  return Math.min(score, config.cap);
}

function getKnownIssuesForFactor2(riskProfile) {
  const knownIssues = riskProfile.knownIssues || [];
  const items = knownIssues.filter(issue => {
    const l = issue.toLowerCase();
    return !BREACH_KEYWORDS.some(k => l.includes(k)) && !SHARING_KEYWORDS.some(k => l.includes(k));
  });
  return { count: items.length, items };
}

/**
 * Calculate Privacy Exposure Index (0-100) for a service.
 * @param {Object} riskProfile - { typicalRisks?, knownIssues?, regulations?, recommendedActions? }
 * @param {Object|null} [relationship] - { parent?, siblings?, category? }
 * @param {string} [category] - Service category (overrides relationship.category)
 * @param {{ breaches?: Array }} [options] - Optional { breaches: [] } for structured breach data
 * @returns {number} - Exposure index 0-100
 */
function calculateExposureIndex(riskProfile, relationship = null, category = null, options = {}) {
  const cat = category || relationship?.category || 'productivity';
  const breaches = options.breaches || [];

  let score = 0;

  const riskCount = riskProfile.typicalRisks?.length || 0;
  score += Math.min(riskCount * 5, 22);

  const { count: issueCount } = getKnownIssuesForFactor2(riskProfile);
  score += Math.min(issueCount * 6, 24);

  const breachInfo = detectBreachHistory(riskProfile, breaches);
  let breachScore = 0;
  if (breachInfo.breachCount > 0) {
    breachScore += Math.min(breachInfo.breachCount * 4, 8);
    breachScore += breachInfo.severity * 2;
  }
  score += Math.min(breachScore, 14);

  const regulationCount = riskProfile.regulations?.length || 0;
  score += Math.max(0, 12 - regulationCount * 3);

  let parentScore = 0;
  if (relationship?.parent) {
    parentScore = 4;
    if (relationship.siblings?.length) parentScore += Math.min(relationship.siblings.length * 1, 4);
  }
  score += Math.min(parentScore, 8);

  const categoryScore = CATEGORY_RISK_SCORES[cat] ?? 4;
  score += Math.min(categoryScore, 8);

  const actionCount = riskProfile.recommendedActions?.length || 0;
  const isPrivacyEnhancing = PRIVACY_ENHANCING_CATEGORIES.includes(cat);
  if (!isPrivacyEnhancing) score += Math.min(actionCount * 2, 10);

  const thirdPartySharing = getThirdPartySharingScore(riskProfile, relationship, { issuesPoints: 15, relationshipPoints: 10, cap: 25 });
  score += thirdPartySharing;

  if (isPrivacyEnhancing && breachScore === 0 && thirdPartySharing === 0) score = Math.min(score, 49);

  return Math.min(Math.round(score), 100);
}

/**
 * Get exposure level label for a given index.
 * @param {number|null} index - 0-100
 * @returns {{ level: string, color: string }}
 */
function getExposureLevel(index) {
  if (index == null) return { level: 'Unknown', color: 'gray' };
  if (index >= 70) return { level: 'Very High', color: 'red' };
  if (index >= 50) return { level: 'High', color: 'orange' };
  if (index >= 30) return { level: 'Medium', color: 'yellow' };
  return { level: 'Low', color: 'green' };
}

module.exports = { calculateExposureIndex, getExposureLevel };
