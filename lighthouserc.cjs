/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run preview -- --port 4173 --strictPort",
      startServerReadyPattern: "Local",
      url: [
        "http://localhost:4173/",
        "http://localhost:4173/login",
        "http://localhost:4173/termos",
        "http://localhost:4173/jogo-responsavel",
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.75 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:seo": ["error", { minScore: 0.92 }],
        "document-title": "error",
        "meta-description": "error",
        "html-has-lang": "error",
        "image-alt": "warn",
      },
    },
  },
};
