# Shared Language & Domain Model (CONTEXT.md)

Este documento define el lenguaje ubicuo y el modelo de dominio para el proyecto **AI Skills for Real Educators**. Su objetivo es reducir la ambigüedad y permitir una comunicación concisa entre el usuario y los agentes de IA.

## Conceptos Core

| Término | Definición |
| :--- | :--- |
| **Edu-Skill** | Una habilidad cognitiva o pedagógica reutilizable, encapsulada en instrucciones para IA, que guía un proceso de aprendizaje específico. |
| **Cognitive Process** | El "cómo" se aprende (ej: argumentar, memorizar, sintetizar). En este proyecto, las skills se organizan por procesos, no por contenidos. |
| **Learning Loop** | El ciclo maestro de aprendizaje (D-U-P-R-T-M). Es el motor pedagógico que orquesta múltiples micro-habilidades. |
| **Tutor Cognitivo** | Rol de la IA donde no proporciona soluciones, sino que guía el pensamiento del usuario mediante andamiaje (scaffolding). |
| **Andamiaje (Scaffolding)** | Soporte temporal que la IA brinda al usuario para realizar una tarea que no podría hacer solo, retirándolo progresivamente. |
| **Teach-back** | Técnica donde el usuario debe explicar el concepto a la IA para validar su propia comprensión (Feynman Technique). |
| **Ontología de Conocimiento** | Representación en grafo de los conceptos y sus relaciones en una disciplina específica. |

## El Ciclo D-U-P-R-T-M

Para referirse a las fases del `learning-loop`, se utilizan estas siglas:
- **D (Diagnose)**: Evaluación inicial de conocimientos y lagunas.
- **U (Understand)**: Fase de instrucción y construcción conceptual.
- **P (Practice)**: Aplicación activa mediante ejercicios o problemas.
- **R (Reflect)**: Metacognición; pensar sobre el propio proceso de pensamiento.
- **T (Teach)**: El usuario actúa como docente (Teach-back).
- **M (Master)**: Verificación final de dominio y conexión con el grafo de conocimiento.

## Familias de Skills

- **Learn**: Enfoque en la adquisición inicial y comprensión.
- **Critical Thinking**: Enfoque en el análisis, evaluación y depuración lógica.
- **Memory**: Enfoque en la retención y recuperación a largo plazo.
- **LBD (Learning By Doing)**: Enfoque en la producción creativa y aplicada.
- **Research**: Enfoque en la búsqueda, síntesis y mapeo de información.
- **Educator**: Herramientas para el diseño y diagnóstico pedagógico.

## Principios de Diseño

1. **Anti-Ghoswriting**: La IA nunca debe escribir por el usuario; debe ayudar al usuario a escribir mejor.
2. **Socratic Priority**: Siempre que haya duda, la IA debe preguntar en lugar de afirmar.
3. **Graph-Based**: El conocimiento se entiende como una red de nodos interconectados, no como una lista secuencial.
4. **Transferability**: Una skill debe ser útil tanto para un estudiante de medicina como para uno de arte.
