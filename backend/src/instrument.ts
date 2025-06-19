// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: 'https://a5c037d36f7ce6ae68054b3ef8846b2e@o4509523272466432.ingest.us.sentry.io/4509523274301440',

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
