# Ressl docs

Public documentation for Ressl hosted mock SaaS APIs, built with [Mintlify](https://mintlify.com).

Control plane: `https://simulation.ressl.ai`  
Mock hosts: `https://{snapshotId}.{slug}.mock.ressl.cc`

## Local preview

```bash
npm i -g mint
mint dev
```

## Agent skill

Custom [`skill.md`](./skill.md) at the repo root overrides Mintlify’s auto-generated skill. After deploy it is available at `/skill.md` on the docs site.

```bash
npx skills add https://<your-docs-domain>
```
