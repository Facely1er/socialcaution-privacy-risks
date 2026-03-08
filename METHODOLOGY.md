# Privacy Exposure Index — Methodology

The Privacy Exposure Index is a 0–100 score where **higher = more privacy exposure/risk**.

## 8-factor model

| Factor | Name | Points | Description |
|--------|------|--------|-------------|
| 1 | Typical Privacy Risks | 0–22 | riskCount × 5, cap 22 |
| 2 | Known Privacy Issues | 0–24 | issueCount × 6, cap 24 (excludes breach/sharing; see Factors 3 & 8) |
| 3 | Data Breach History | 0–14 | (breachCount × 4, max 8) + (severity × 2, max 6) |
| 4 | Regulatory Oversight | 0–12 | max(0, 12 − regulationCount × 3); more regulations = lower exposure |
| 5 | Parent Company & Data Sharing Network | 0–8 | parent (4) + siblings (×1, max 4) |
| 6 | Data Sensitivity by Category | 0–8 | Category weight (e.g. financial/dating/health = 8, vpn/security-tools = 1) |
| 7 | User Control & Privacy by Default | 0–10 | recommendedActionCount × 2 (zero for privacy-enhancing categories) |
| 8 | Third-Party Data Sharing | 0–25 | Indicators from known issues + parent/sibling relationship (highest weight) |

Total raw points are capped at **100**.

## Level bands

- **Very High** — 70–100  
- **High** — 50–69  
- **Medium** — 30–49  
- **Low** — 0–29  

## Notes

- Factor 2 excludes breach- and sharing-related issues to avoid double-counting with Factors 3 and 8.
- Privacy-enhancing categories (e.g. VPN, security-tools) with no breach and no third-party sharing are capped at 49 (Medium).
