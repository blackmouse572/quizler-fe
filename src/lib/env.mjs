import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
  },
  client: {},
  runtimeEnv: {},
});
