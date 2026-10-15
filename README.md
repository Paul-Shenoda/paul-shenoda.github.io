# Paul Shenoda · Portfolio

Source for my developer portfolio, live at **[paul-shenoda.github.io](https://paul-shenoda.github.io)**.

## Contents

- [Focus](#focus)
- [Tech Stack & Tooling](#tech-stack--tooling)
- [Featured Project](#featured-project)
- [Ways to Connect](#ways-to-connect)

## Focus

AI-first software engineer. I ship production AI systems end to end: RAG pipelines, multi-agent workflows and full-stack apps on Azure, using Claude Code and Codex throughout while owning the architecture, testing and verification myself.

## Tech Stack & Tooling

| Area | Choice |
| :--- | :--- |
| Framework | [Astro](https://astro.build), static output, plain JavaScript |
| Styling | Plain CSS with light and dark colour tokens |
| Font | [Archivo](https://github.com/Omnibus-Type/Archivo) variable, self-hosted (SIL OFL 1.1) |
| Content | One data file: `src/data/projects.js` |
| Hosting | GitHub Pages |
| Deployment | GitHub Actions (`withastro/action`, `actions/deploy-pages`) |
| Runtime | Node 24 |

Run it locally:

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Featured Project

**[RAG Document Chatbot](https://paul-shenoda.github.io/projects/rag-document-chatbot)**:
a support chatbot that answers post-installation questions from smart home product manuals, scoring 91% faithfulness, 87% context recall and 85% answer relevancy on a 30-question RAGAS suite.
Built with Python, LangChain, FastAPI, Azure OpenAI and Azure AI Search, and deployed to Azure Container Apps.

## Ways to Connect

- Portfolio: [paul-shenoda.github.io](https://paul-shenoda.github.io)
- GitHub: [@Paul-Shenoda](https://github.com/Paul-Shenoda)
- LinkedIn: [linkedin.com/in/Paul-Shenoda](https://www.linkedin.com/in/Paul-Shenoda)
- Email: use the Email button on [the site](https://paul-shenoda.github.io)
