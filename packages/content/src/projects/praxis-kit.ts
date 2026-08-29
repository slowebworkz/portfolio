import { parseProject, type Project } from '@portfolio/data';

export const praxisKit: Project = parseProject({
  slug: 'praxis-kit',
  title: 'Praxis Kit',
  summary:
    'A contract-based, framework-agnostic UI system that validates component composition, HTML semantics, and accessibility at runtime — not just in docs or types.',
  category: 'open-source',
  status: 'active',
  period: { start: '2026-05', end: null },
  role: 'Creator and sole author',
  organization: null,
  motivation:
    'TypeScript tells you whether an API is valid. Nothing tells you whether the resulting UI is valid. Praxis makes composition, HTML semantics, and ARIA requirements executable contracts, so invalid UI fails in development instead of shipping as a latent bug.',
  technologies: [
    { name: 'TypeScript', confidence: 'confirmed' },
    { name: 'tsup', confidence: 'confirmed' },
    { name: 'ESLint plugin API', confidence: 'confirmed' },
    { name: 'TypeScript language-service plugin API', confidence: 'confirmed' },
  ],
  contributions: {
    did: [
      'Designed the contract model — valid hierarchies, required children, permitted parents, ARIA requirements',
      'Built polymorphic adapters for React, Vue, Solid, Svelte, Lit, Preact, and Web Components',
      'Wrote the runtime validator, the ESLint plugin, a TypeScript language-service plugin, a Vite plugin, and migration codemods',
      'Packaged it as one npm module with ~25 subpath exports',
    ],
  },
  package: {
    name: 'praxis-kit',
    registry: 'npm',
    registryUrl: 'https://www.npmjs.com/package/praxis-kit',
    repoUrl: 'https://github.com/slowebworkz/praxis-kit',
    license: 'MIT',
    version: '7.8.1',
    entryPoints: [
      'praxis-kit/contract',
      'praxis-kit/react',
      'praxis-kit/vue',
      'praxis-kit/eslint',
      'praxis-kit/ts-plugin',
      'praxis-kit/vite-plugin',
      'praxis-kit/codemod',
    ],
    downloads: { weekly: 116, monthly: 1248, asOf: '2026-08-26' },
  },
  links: [
    { label: 'Source', url: 'https://github.com/slowebworkz/praxis-kit', kind: 'repo' },
    { label: 'npm', url: 'https://www.npmjs.com/package/praxis-kit', kind: 'package' },
  ],
  evidence: [
    {
      id: 'repo',
      kind: 'source',
      label: 'Public repository — full source and history',
      confidence: 'confirmed',
      role: 'supporting',
      url: 'https://github.com/slowebworkz/praxis-kit',
    },
    {
      id: 'npm',
      kind: 'package',
      label: 'Published package',
      confidence: 'confirmed',
      role: 'supporting',
      url: 'https://www.npmjs.com/package/praxis-kit',
      registry: 'npm',
    },
  ],
  retainedArtifacts: 'full',
  publishability: { status: 'public', notes: 'Own work, already public, MIT.' },
  caseStudy: {
    summary:
      'Praxis Kit encodes the rules of HTML, ARIA, and component composition as executable contracts. A component declares which children it requires, which parents it belongs to, which elements it may render as, and which ARIA relationships must hold — and the runtime checks all of it during development, across seven framework adapters, from one installable package.',

    context: `Component libraries converge on the same three concerns: styling, state, and rendering. None of them check whether the tree you assembled is *correct* — that a \`<Tabs>\` actually contains a \`<TabsList>\`, that a \`<Dialog>\` has an accessible name, that a \`role\` you passed is even allowed on the element it landed on.

Those rules exist. They are written down in the HTML specification and the ARIA Authoring Practices Guide. But they live as prose, and enforcement is left to code review, a Storybook lint rule, or an axe pass that runs too late. TypeScript covers the API surface and stops at the JSX boundary.

I started Praxis Kit in May 2026 to close that gap: make the platform's own rules executable, so a violation is a development-time error instead of a latent accessibility bug.`,

    problem: `Three problems had to be solved together, or the tool would not be worth adopting:

1. **Semantics do not belong to a framework.** "A \`<li>\` must have a list parent" is true in React, Vue, Solid, and the bare DOM alike. A validator bolted onto one framework's renderer cannot be the source of truth.
2. **Polymorphism cannot be an escape hatch.** Real components render different elements depending on props (\`<Button as="a">\`). If the \`as\` prop bypasses the contract, the contract is theatre.
3. **It has to cost nothing in production.** Validation that ships to users is a non-starter — the checks have to compile out.`,

    goals: [
      'One contract format describing required and forbidden children, permitted parents, HTML content-model restrictions, polymorphic capabilities, and ARIA relationships',
      'A single framework-neutral evaluation engine, with thin adapters that only translate rendering',
      'Violations surfaced in development as warnings or thrown errors; silent and tree-shaken away in production',
      'Adapters for every major rendering model — React (18 and 19), Preact, Solid, Svelte, Vue, Lit, and native Custom Elements',
      'Editor and CI integration: an ESLint plugin, a TypeScript language-service plugin, a Vite plugin, and codemods',
      'Shipped as one installable package, not a constellation of separately versioned scoped packages',
    ],

    architecture: `The repository is a pnpm workspace with a strict one-directional dependency graph, enforced by \`dependency-cruiser\` in CI:

    lib/primitive     tag resolution, prop merge, slot protocol (zero framework deps)
    lib/contract      ARIA policy engine, children validator, strict-mode base
    lib/styling       variant resolver (CVA), class pipeline, plugin API
    packages/core     capability-driven factory composing the lib/ modules
    lib/adapter-utils shared logic every adapter reuses
    packages/<adapter>  React · Vue · Solid · Svelte · Preact · Lit · Web

\`@praxis-kit/core\` is plain TypeScript — no React, no DOM, no CSS methodology. It exposes a \`PolymorphicRuntime\` with four pure methods: \`resolveTag\`, \`resolveProps\`, \`resolveClasses\`, \`resolveAria\`. An adapter calls those inside its own render function and does nothing else structural: it flattens the framework's children, hands them to the shared \`ChildrenEvaluator\`, and renders the element core resolved.

The published artifact is a single package, \`praxis-kit\`, assembled from the internal \`@praxis-kit/*\` workspace packages at build time. Consumers install one dependency and import from a subpath — \`praxis-kit/react\`, \`praxis-kit/contract\`, \`praxis-kit/eslint\` — one per framework and per tool. There is one version to reason about instead of a scoped-package compatibility matrix.`,

    keyDecisions: [
      {
        decision: 'Runtime validation, not a types-only or lint-only tool',
        rationale:
          'A type can say `children: ReactNode`; it cannot say "children must include exactly one TabsList". The real composition is only knowable once the tree is assembled, which in every framework happens at render time. That is the one place the check can actually see the data.',
        tradeoffs:
          'It means shipping validation code that must be tree-shaken out for production, and a render-time cost on the dev path (cut with an LRU cache on the warm path). A pure lint approach has zero runtime footprint but sees one file at a time and misses anything dynamic.',
      },
      {
        decision: 'Framework-neutral core, rendering-only adapters',
        rationale:
          'The contract engine, ARIA policy, and children validator contain no framework concepts. An adapter is a few hundred lines that translate one framework’s children, props, and element model to the shared runtime. Adding Lit and Web Components support was additive, not a rewrite.',
        tradeoffs:
          'Every adapter needs its own test suite and CI matrix entry, and some framework-idiomatic ergonomics (Svelte’s compiler, Solid’s reactivity) need adapter-specific handling that cannot live in core.',
      },
      {
        decision:
          'One published package with subpath exports, not scoped @praxis-kit/* packages on npm',
        rationale:
          'Consumers install once and never hit version skew between core and an adapter. The internal workspace packages still exist for development; the build collapses them into a single artifact with a subpath export per framework and per tool.',
        tradeoffs:
          'The build is more involved — bundling internal workspace deps, generating the exports map and typesVersions, keeping the postbuild in sync. A consumer who only wants the React adapter installs a package that contains all of them, though only their subpath is bundled into their app.',
      },
      {
        decision: 'HTML and ARIA rules applied implicitly, with no per-component opt-in',
        rationale:
          'The ARIA policy engine runs on every render regardless of configuration: it strips conflicting roles, removes attributes invalid for the resolved role, and warns on impossible combinations. Built-in element rule libraries (landmarks, then `<input>`) apply the same way. Correctness you have to remember to switch on is correctness that does not happen.',
        tradeoffs:
          'A component author can be surprised by a warning they did not write a rule for. The engine has to stay conservative to avoid false positives, so some genuinely wrong markup still passes.',
      },
      {
        decision: 'Editor and build tooling shipped alongside the runtime',
        rationale:
          'A console warning is the weakest signal. The ESLint plugin and TypeScript language-service plugin surface contract violations where the code is written; the Vite plugin wires dev-time validation with no config; codemods migrate existing component definitions. All four consume the same contract object.',
        tradeoffs:
          'Four more surfaces to version and keep behaviourally consistent with the runtime. The TS plugin in particular is tied to compiler internals that shift between versions.',
      },
    ],

    implementation: `\`createContractComponent({ tag })\` is the whole starting API surface — everything else is opt-in. \`styling\` adds a CVA-backed variant system with presets and an LRU-cached resolver; \`enforcement\` adds \`strict\` mode and \`children\` rules; the ARIA engine needs no configuration at all.

Children rules are a matcher plus a cardinality:

    children: [
      { name: 'Tabs.Trigger', match: isType(Trigger), cardinality: { min: 1 } },
      { name: 'Tabs.Indicator', match: isType(Indicator), cardinality: { max: 1 } },
    ]

An invalid tree produces a precise message during development:

    <Tabs><TabsTrigger /></Tabs>
      x TabsList is required.
      x TabsPanel is required.

    <Menu><Button /></Menu>
      x Button cannot be a direct child of Menu.

The class pipeline runs its static and variant resolvers in parallel and joins with \`cn()\`; variant resolution is memoised per unique prop combination. The Tailwind plugin adds a layout-aware mode that strips \`flex-\` / \`grid-\` utilities conflicting with the active display prop — deliberately prefix-based, not validated against the Tailwind config.`,

    challenges: `**Keeping seven adapters behaviourally identical.** A cross-framework integration package renders the same contract in every adapter and asserts the same validation output. Framework children models differ enough — Svelte snippets, Solid's lazy children, Vue slots — that "flatten the children" is adapter-specific work each time.

**The production / development split.** Validation has to be genuinely absent from production bundles, not merely skipped at runtime. That shaped the module boundaries: the strict-mode base routes every \`warn()\` and \`violate()\` through a single point the build can eliminate.

**Bundle budget.** The full runtime sits around 15 KB; per-framework minimal builds range from about 13 KB (Svelte) to about 15 KB (React), per the repo's own metrics snapshot. Holding that line while adding element rule libraries meant the ARIA data tables had to stay compact and load lazily.`,

    results: `Praxis Kit is published on npm as \`praxis-kit\` (v7.8.1, MIT). As of late August 2026 it is roughly 1,150 commits over about three months of solo work, with over 2,000 test cases across the workspace and \`dependency-cruiser\` enforcing the architecture on every commit.

One package, one subpath per framework and tool, seven framework adapters, four tooling integrations. A consumer adds one dependency, imports \`createContractComponent\` from their framework's subpath, and gets composition, HTML-semantics, and ARIA validation in development with nothing shipped to production.`,

    whatIdChange: `**Publish a smaller default.** The single-package decision is right for versioning, but a React-only consumer still installs a package containing six other adapters. I would look at trimming the registry artifact per install, or at least surfacing the bundle math up front so the tradeoff is visible.

**Commit to the TypeScript language-service plugin earlier, or not at all.** It is the highest-value editor surface and the most fragile — pinned to compiler internals. Building it late meant retrofitting; building it first would have pressured the contract format to stay introspectable.

**A real playground.** The README and guides are thorough but static. For a library whose whole pitch is "see the error before you ship", an interactive page that runs the validator in the browser would do more than any amount of prose.`,

    links: [
      {
        label: 'Architecture notes',
        url: 'https://github.com/slowebworkz/praxis-kit/blob/main/ARCHITECTURE.md',
        kind: 'writeup',
      },
      {
        label: 'Getting started guide',
        url: 'https://github.com/slowebworkz/praxis-kit/blob/main/GETTING_STARTED.md',
        kind: 'writeup',
      },
    ],
  },
  featured: true,
});
