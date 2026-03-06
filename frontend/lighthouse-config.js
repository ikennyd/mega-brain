module.exports = {
  extends: 'lighthouse:default',
  settings: {
    // Emulate desktop performance
    emulatedFormFactor: 'desktop',
    // Throttle network
    throttling: {
      rttMs: 40,
      downstreamThroughputKbps: 10240,
      upstreamThroughputKbps: 10240,
    },
    // Disable CPU throttling for more consistent results
    cpuSlowdownMultiplier: 1,
    // Increase timeout for slow networks
    timeoutMs: 60000,
  },
  // Categories to audit
  categories: [
    'performance',
    'accessibility',
    'best-practices',
    'seo',
    'pwa',
  ],
  // Specific audits to run
  audits: [
    // Performance
    'first-contentful-paint',
    'largest-contentful-paint',
    'cumulative-layout-shift',
    'speed-index',
    'total-blocking-time',
    'time-to-interactive',
    // Accessibility
    'accessibility/aria-allowed-attr',
    'accessibility/aria-required-attr',
    'accessibility/button-name',
    'accessibility/color-contrast',
    'accessibility/label',
    // Best Practices
    'no-unload-listeners',
    'no-vulnerable-libraries',
    // SEO
    'meta-description',
    'viewport',
    'robots-txt',
  ],
}
