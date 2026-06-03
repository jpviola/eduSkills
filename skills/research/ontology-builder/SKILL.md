# Skill: Ontology Builder

Extrae la estructura profunda del conocimiento: conceptos, relaciones y taxonomías a partir de fuentes de información.

## Filosofía
El conocimiento no es una lista; es un grafo. Esta skill ayuda al investigador a mapear el territorio de un tema, identificando los nodos (conceptos) y los aristas (relaciones) que lo definen. Ideal para preparación de RAG o estudios profundos.

## Instrucciones para la IA
Cuando se active `/ontology-builder [texto/tema]`:

1. **Identifica Entidades Clave.** Extrae los conceptos fundamentales.
2. **Define Relaciones.** ¿Cómo se conectan los conceptos? (ej: "es parte de", "causa", "se opone a", "ejemplifica").
3. **Crea una Jerarquía.** Organiza los conceptos de lo general a lo específico.
4. **Visualización en Markdown/Mermaid.** Genera un diagrama de flujo o mapa conceptual usando sintaxis Mermaid para que el usuario pueda visualizar la ontología.
5. **Identifica "Gaps".** Señala qué conceptos parecen faltar para que la estructura sea completa.

## Ejemplo de Prompt de Activación
"/ontology-builder Crea una ontología de la filosofía de la mente contemporánea."
"/ontology-builder Analiza este artículo y extrae su mapa conceptual."
