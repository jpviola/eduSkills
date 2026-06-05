# AI Skills for Real Educators 🍎

Un sistema de habilidades cognitivas y pedagógicas reutilizables para enseñar, aprender y desarrollar pensamiento crítico con IA.

Este repositorio está inspirado en el trabajo de [Matt Pocock](https://github.com/mattpocock/skills), pero trasladado del ámbito de la ingeniería de software al ámbito de la **innovación educativa y las humanidades**.

## La Filosofía: Producir Conocimiento, no solo Código

La mayoría de las interacciones con la IA hoy en día son transaccionales: "hazme esto", "resúmeme aquello". **AI Edu-Skills** cambia el paradigma. Aquí, la IA no es una herramienta de producción, sino un **tutor cognitivo** que guía procesos de aprendizaje profundo.

Las skills no se organizan por contenidos (Filosofía, Historia, Biología), sino por **procesos cognitivos transferibles**. Un alumno de Medicina y uno de Derecho necesitan, en el fondo, las mismas habilidades: comprender, memorizar, argumentar e investigar.

## Taxonomía Edu-Skills

El sistema se organiza en 6 grandes familias de procesos:

### 1. [Learn Skills](./skills/learn/) 🧠
Para la comprensión profunda y la construcción de conceptos.
- `/socratic-tutor`: Aprender mediante preguntas.
- `/concept-builder`: Construcción progresiva.
- `/analogy-generator`: Aprender mediante analogías.
- `/first-principles`: Descomposición conceptual.

### 2. [Critical Thinking Skills](./skills/critical-thinking/) ⚖️
Para el análisis riguroso y la detección de sesgos.
- `/argument-debugger`: Linter de lógica y falacias.
- `/steelman-builder`: Reconstrucción de la mejor versión de una postura.
- `/dialectical-thinking`: Tesis, objeción y síntesis.
- `/assumption-hunter`: Búsqueda de presupuestos invisibles.

### 3. [Memory Skills](./skills/memory/) 🏛️
Para la retención a largo plazo.
- `/mnemonic-builder`: Acrónimos, historias e imágenes.
- `/spaced-review`: Generación de repasos espaciados.
- `/active-recall`: Recuperación activa de información.
- `/memory-palace`: Construcción de recorridos espaciales.

### 4. [Learning By Doing (LBD) Skills](./skills/lbd/) 🛠️
Para el aprendizaje activo mediante la creación.
- `/essay-writer`: Tutor editorial para ensayos.
- `/teach-back`: La técnica Feynman (explicar para aprender).
- `/debate-simulator`: Simulación de posturas opuestas.
- `/project-builder`: Descomposición de proyectos en entregables.

### 5. [Research Skills](./skills/research/) 🔍
Para la investigación y gestión del conocimiento.
- `/source-critic`: Evaluación de fuentes.
- `/ontology-builder`: Extracción de grafos de conocimiento.
- `/synthesis-engine`: Integración de múltiples fuentes.

### 6. [Educator Skills](./skills/educator/) 🎓
Específicamente para docentes y diseñadores instruccionales.
- `/misconception-detector`: Detección de errores frecuentes.
- `/rubric-builder`: Construcción de criterios de evaluación.
- `/curriculum-designer`: Diseño de programas alineados.

---

## La Skill Maestra: [Learning Loop](./skills/core/learning-loop/) ♻️

Si quieres experimentar el sistema completo, usa `/learning-loop [tema]`. Esta skill orquestará un ciclo pedagógico completo:
1. **Diagnóstico** de conocimientos previos.
2. **Comprensión** del concepto.
3. **Práctica** aplicada.
4. **Reflexión** sobre el proceso.
5. **Enseñanza** (Teach-back).
6. **Dominio** (Mastery).---

## 🛠️ CLI: edu-skills

Hemos creado una herramienta de línea de comandos para gestionar tus habilidades pedagógicas de forma sencilla.

### Instalación local
Desde la raíz del repositorio:
```bash
npm install
npm link
```

### Comandos disponibles
- `edu-skills list`: Muestra todas las habilidades organizadas por procesos cognitivos.
- `edu-skills explain /nombre-skill`: Muestra la filosofía y las instrucciones detalladas de una habilidad.
- `edu-skills link`: Enlaza automáticamente todas las habilidades con tu cliente de Claude (Desktop o CLI).

---

## Cómo usar este repo

1. **Copia y pega** el contenido de una `SKILL.md` en tu sistema de instrucciones (System Prompt) o úsalo directamente en un chat con Claude/ChatGPT.
2. **Adapta** las instrucciones a tus necesidades específicas.
3. **Contribuye** creando nuevas skills que sigan esta filosofía pedagógica.

---
*Desarrollado para Real Educators que buscan en la IA un aliado para la excelencia intelectual.*
