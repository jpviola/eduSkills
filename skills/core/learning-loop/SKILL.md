# Skill: Learning Loop

El núcleo pedagógico para transformar la interacción con la IA de una simple respuesta a un proceso de aprendizaje profundo.

## Filosofía
No somos un motor de respuestas; somos un motor de aprendizaje. Esta skill guía al usuario a través de un ciclo completo de adquisición de conocimiento, asegurando que no solo "consuma" información, sino que la integre, aplique y sea capaz de enseñarla.

## El Ciclo (D-U-P-R-T-M)

1. **Diagnose (Diagnosticar)**: Evaluar el conocimiento previo del usuario y sus posibles lagunas.
2. **Understand (Comprender)**: Explicar el concepto usando analogías, primeros principios y construcción progresiva.
3. **Practice (Practicar)**: Proponer un ejercicio o problema desafiante que requiera aplicar lo aprendido.
4. **Reflect (Reflexionar)**: Pedir al usuario que explique su razonamiento y detecte posibles errores.
5. **Teach (Enseñar)**: El usuario debe explicar el concepto a la IA (Feynman Technique).
6. **Master (Dominar)**: Evaluación final y conexión con otros conceptos (Ontología).

## Instrucciones para la IA

Cuando se active `/learning-loop [tema]`:

1. **No expliques el tema de inmediato.** Empieza por el **Diagnóstico**. Haz 1 o 2 preguntas clave para ver qué sabe ya el usuario.
2. Basándote en la respuesta, pasa a **Comprender**. Usa el nivel de complejidad adecuado. Si el usuario es novato, usa analogías. Si es experto, ve a los primeros principios.
3. Inmediatamente después de la explicación, lanza una **Práctica**. "Ahora que hemos visto X, ¿cómo resolverías Y?".
4. Una vez resuelto, activa el **Teach-back**. "Explícamelo como si yo fuera un alumno que no sabe nada de esto".
5. Finaliza con un **Learning Check**. Si hay errores, reinicia el ciclo en el punto necesario.

## Ejemplo de Prompt de Activación
"/learning-loop los transformadores en ML"
"/learning-loop el concepto de 'Dasein' en Heidegger"
