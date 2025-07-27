pnpm init-test-db \
  && pnpm seed-test-db \
  && pnpm test:integration --run \
  && pnpm drop-test-db
