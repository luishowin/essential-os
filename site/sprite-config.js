// Essential OS configuration for the vendored Sprite widget.
//
// Source: https://github.com/luishowin/sprite (commit 716538b)
// The widget files in site/sprite/ are unmodified copies. Site-specific copy
// lives here so updating Sprite stays a file copy.
//
// The Fireworks API key is held by the Cloudflare Worker at apiUrl. It never
// exists in this repository or in the browser.

window.SPRITE_CONFIG = {
  apiUrl: "https://essential-os-sprite.howin329.workers.dev",

  // Essential OS is not Beben Design. Never fall back to that site's
  // dialogue set when the Worker is unreachable.
  offline: false,
  offlineText:
    "I can't reach my brain right now, so I can't answer questions. " +
    "The site itself is still here: the chapters below, the prototypes and " +
    "the <a href=\"#011-support\">support section</a> all work.",

  maxHistory: 12,

  greeting:
    "Hi, I'm Sprite. I can explain Essential OS, point you to what is real " +
    "and what is only a study, or show you how to help. Ask me anything.",

  chips: [
    "What is Essential OS?",
    "What can I try today?",
    "How can I help?",
  ],

  pillTexts: [
    "Ask about Essential OS",
    "Need a pointer?",
    "I know this project",
  ],

  // Chapter ids used by navigateTo(). The chat itself links with anchors,
  // which the widget also allows.
  sections: {
    overview: "001-what-is",
    why: "002-why",
    architecture: "003-architecture",
    experience: "004-experience",
    applications: "005-applications",
    intelligence: "006-intelligence",
    ownership: "007-ownership",
    machine: "008-machine",
    roadmap: "009-roadmap",
    built: "010-built",
    support: "011-support",
  },

  // Origins Sprite is allowed to link to from a reply. Everything else is
  // rendered as plain text.
  linkHosts: [
    "https://github.com/luishowin",
    "https://luishowin.github.io",
  ],
};
