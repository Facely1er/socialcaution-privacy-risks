/**
 * Example risk profiles for Privacy Exposure Index (5–10 services).
 * Used for verification and testing only. Full catalog is proprietary.
 */

module.exports = {
  google: {
    typicalRisks: [
      'Extensive data collection across search, email, maps, and YouTube',
      'Cross-service tracking and profile building',
      'Advertising ID that follows you across apps and websites',
      'Location history tracking even when not actively using services'
    ],
    regulations: ['GDPR', 'CCPA'],
    knownIssues: [
      'Collects data even in Incognito/Private browsing mode',
      'Shares data with third-party advertisers',
      'Retains deleted data for extended periods'
    ],
    recommendedActions: [
      'Review and delete your Google activity history',
      'Turn off ad personalization',
      'Disable location history and web & app activity',
      'Use Google Takeout to download and review your data'
    ]
  },
  facebook: {
    typicalRisks: [
      'Collects data from third-party websites via Facebook Pixel',
      'Tracks non-users through shadow profiles',
      'Shares data with thousands of advertisers',
      'Facial recognition and photo tagging'
    ],
    regulations: ['GDPR', 'CCPA'],
    knownIssues: [
      'Multiple data breaches exposing user information',
      'Sells user data to data brokers',
      'Unclear privacy settings that change frequently'
    ],
    recommendedActions: [
      'Review and restrict who can see your posts and profile',
      'Turn off facial recognition',
      'Limit third-party app access',
      'Download your Facebook data to see what they have'
    ]
  },
  instagram: {
    typicalRisks: [
      'Owned by Meta - shares data with Facebook ecosystem',
      'Tracks browsing behavior outside the app',
      'Collects sensitive information from photos (location, faces)',
      'Algorithm promotes addictive engagement patterns'
    ],
    regulations: ['GDPR', 'CCPA'],
    knownIssues: [
      'Photo metadata can reveal more than intended',
      'Direct messages are not end-to-end encrypted by default',
      'Shopping data shared with advertisers'
    ],
    recommendedActions: [
      'Switch to private account',
      'Remove location data from photos before posting',
      'Review connected third-party apps',
      'Limit data sharing in account settings'
    ]
  },
  tiktok: {
    typicalRisks: [
      'Extensive device fingerprinting and data collection',
      'Access to clipboard data on mobile devices',
      'Tracks keystroke patterns and screen interactions',
      'Potential foreign government access to user data'
    ],
    regulations: ['GDPR', 'COPPA'],
    knownIssues: [
      'Unclear data retention policies',
      'Algorithm designed for maximum engagement/addiction',
      'Limited user control over data collection'
    ],
    recommendedActions: [
      'Set account to private',
      'Disable personalized ads',
      "Don't link to other social media accounts",
      'Regularly review and delete old content'
    ]
  },
  whatsapp: {
    typicalRisks: [
      'Owned by Meta - metadata shared with Facebook',
      'Contact list uploaded to servers',
      'Group chat metadata not encrypted',
      'Business messages may not be end-to-end encrypted'
    ],
    regulations: ['GDPR', 'CCPA'],
    knownIssues: [
      'Backup messages to cloud storage not encrypted',
      'Phone number required (no anonymous use)',
      'Read receipts and online status reveal activity patterns'
    ],
    recommendedActions: [
      'Enable disappearing messages for sensitive chats',
      'Turn off read receipts and last seen',
      "Don't back up to unencrypted cloud storage",
      'Review privacy settings regularly'
    ]
  },
  signal: {
    typicalRisks: [
      'Phone number required for registration',
      'Contact list uploaded to servers (hashed)',
      'Group admin can see all members',
      'Metadata about who you contact is visible'
    ],
    regulations: ['GDPR'],
    knownIssues: [
      'Phone number visible to contacts',
      'Group metadata not fully private',
      'Server can see when you last used Signal',
      'Backup to cloud not encrypted'
    ],
    recommendedActions: [
      'Use Signal for sensitive communications',
      'Enable screen security',
      'Review group membership',
      'Use disappearing messages for sensitive chats'
    ]
  },
  dropbox: {
    typicalRisks: [
      'Files not encrypted end-to-end (Dropbox can access)',
      'Shared links can be accessed by anyone with URL',
      'File metadata reveals usage patterns',
      'Third-party app integrations may access files'
    ],
    regulations: ['GDPR', 'CCPA'],
    knownIssues: [
      'Previous security breaches exposed user data',
      'Free tier has limited privacy controls',
      'Deleted files retained for 30 days'
    ],
    recommendedActions: [
      'Encrypt sensitive files before uploading',
      'Review and revoke unnecessary third-party app access',
      'Use password-protected shared links',
      'Enable two-factor authentication'
    ]
  },
  netflix: {
    typicalRisks: [
      'Viewing history reveals personal preferences',
      'Recommendations based on detailed profiling',
      'Account sharing detection tracks device usage',
      'Payment information stored for subscriptions'
    ],
    regulations: ['GDPR', 'CCPA'],
    knownIssues: [
      'Viewing data used for content recommendations',
      'Profile names can reveal household members',
      'Watch history can be sensitive (health conditions, etc.)'
    ],
    recommendedActions: [
      'Use separate profiles for different users',
      'Regularly clear viewing history',
      'Review and limit profile information',
      'Consider using gift cards instead of credit cards'
    ]
  }
};
