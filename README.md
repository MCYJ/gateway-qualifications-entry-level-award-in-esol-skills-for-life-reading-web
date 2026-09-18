# GQ ESOL Reading E2 — Web

Independent public marketing and study site for the released iOS app **GQ ESOL Reading E2**.

Production: <https://mcyj.github.io/gateway-qualifications-entry-level-award-in-esol-skills-for-life-reading-web/>

## Local use

```bash
npm test
python3 -m http.server 4177 --directory dist
```

The site is generated for the GitHub Project Pages base path. Use a local mount with the repository name when previewing it.

## Content and maintenance

- English landing page, FAQ, privacy, terms, support and contact routes.
- Twelve substantive study guides in `content/articles.mjs`.
- Official-source links and the source-check date are preserved in generated pages.
- Update changing assessment arrangements only after checking current Gateway Qualifications documents.

## Deployment

Pushes to `main` run the build and verifier before deployment through GitHub's official Pages artifact actions.

This is an independent RushLabs study resource and is not affiliated with Gateway Qualifications.
