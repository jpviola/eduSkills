# AI Skills for Real Educators 🍎

**A reusable library of cognitive and pedagogical skills for teaching, learning, and critical thinking with AI.**

eduSkills is an open collection of structured skill definitions — each a standalone instruction set that transforms any AI into a specialized cognitive tutor. Skills are designed to be copied into system prompts, extended, remixed, and contributed back by the community.

→ Want a full CLI experience? See [Musa](https://github.com/jpviola/musa).

---

## What is a skill?

Each skill is a `SKILL.md` file containing:
- A **philosophy** — the cognitive principle behind the skill
- **Instructions for the AI** — explicit behavioral rules
- **Activation syntax** — how to invoke it (e.g. `/socratic-tutor [topic]`)
- **Examples** — real usage prompts

Skills are not content-area specific. They are **transferable cognitive processes** — a medical student and a law student need the same foundational capacities: to argue, to memorize, to research, to teach.

---

## Skill families

### 🧠 Learn
Deep understanding through dialogue and concept construction.

| Skill | What it does |
|-------|-------------|
| `/socratic-tutor` | Extracts knowledge through questions — never gives direct answers |

### ⚖️ Critical Thinking
Rigorous analysis and logical reasoning.

| Skill | What it does |
|-------|-------------|
| `/argument-debugger` | Detects fallacies, hidden premises, and evaluates argument soundness |

### 🏛️ Memory
Long-term retention through narrative and imagery.

| Skill | What it does |
|-------|-------------|
| `/mnemonic-builder` | Turns any list into acronyms, vivid images, and memory palace routes |

### 🛠️ Learning by Doing
Active learning through creation and teaching.

| Skill | What it does |
|-------|-------------|
| `/teach-back` | You teach — the AI plays student and asks questions that reveal gaps |

### 🔍 Research
Knowledge management and concept extraction.

| Skill | What it does |
|-------|-------------|
| `/ontology-builder` | Extracts concept graphs, hierarchies, and Mermaid diagrams from any text |

### 🎓 Educator
Tools specifically for teachers and instructional designers.

| Skill | What it does |
|-------|-------------|
| `/misconception-detector` | Predicts common conceptual errors before students develop them |

### ♻️ Core
The master skill that orchestrates everything.

| Skill | What it does |
|-------|-------------|
| `/learning-loop` | Full D-U-P-R-T-M cycle: Diagnose → Understand → Practice → Reflect → Teach → Master |

---

## How to use a skill

### Option 1 — Copy into a system prompt

Open any SKILL.md file and paste its content as the system prompt in Claude, ChatGPT, or any other AI interface. Then activate it with the command syntax at the top of the file.

```
/socratic-tutor What is justice?
```

### Option 2 — Use the Musa CLI

```bash
npm install -g musa-cli
musa chat socratic-tutor
```

### Option 3 — Link to Claude Desktop

```bash
musa link
```

---

## Pedagogical guardrails

All skills enforce these constraints by design:

- **No ghostwriting** — AI assists but never produces essays, papers, or exams for the user
- **No answer injection** — solutions are never given directly; the learner discovers them
- **No cycle bypass** — diagnostic and practice phases cannot be skipped due to "urgency"
- **No oversimplification** — analogies maintain technical and conceptual precision
- **No passive compliance** — the AI respectfully challenges faulty reasoning

---

## Skill structure

```
skills/
  <category>/
    <skill-name>/
      SKILL.md      ← the skill definition
```

Each `SKILL.md` follows this template:

```markdown
# Skill: [Name]

## Philosophy
[The cognitive principle behind this skill]

## Instructions for the AI
When `/skill-name [topic]` is activated:
1. [Behavioral rule 1]
2. [Behavioral rule 2]
...

## Activation
`/skill-name [topic or question]`

## Examples
- `/skill-name [example 1]`
- `/skill-name [example 2]`
```

---

## Contributing

New skills are welcome. To propose one:

1. Fork this repository
2. Create a new directory: `skills/<category>/<your-skill-name>/`
3. Add a `SKILL.md` following the template above
4. Open a pull request with a short description of the cognitive process it addresses

**Good skill candidates:**
- A specific cognitive capacity not yet covered
- A variation on an existing skill for a different audience (e.g. `/socratic-tutor` for children)
- A discipline-specific adaptation of a general skill

**Not a good fit:**
- Content-specific skills (e.g. "explain photosynthesis") — skills must be transferable
- Skills that encourage ghostwriting or bypass learning

---

## Inspiration

This project is inspired by [Matt Pocock's skills framework](https://github.com/mattpocock/skills), translated from software engineering into the domain of education and the humanities.

---

## License

MIT — Juan Pablo Viola, 2026.

Skills that encourage ghostwriting or bypass learning
Inspiration
This project is inspired by Matt Pocock's skills framework, translated from software engineering into the domain of education and the humanities.

License
MIT — Juan Pablo Viola, 2026.
