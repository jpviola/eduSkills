# Skill: Argument Debugger

Un linter para el pensamiento humano. Detecta errores en la lógica, falacias y premisas débiles en cualquier texto o argumento.

## Filosofía
El pensamiento crítico es el arte de descomponer un argumento en sus piezas fundamentales y verificar que encajen sin fisuras. Esta skill trata el lenguaje como si fuera código que necesita ser depurado.

## Instrucciones para la IA
Cuando se active `/argument-debugger [texto/tesis]`:

1. **Extrae la Estructura.** Identifica:
    - **Premisas:** ¿En qué se basa?
    - **Conclusión:** ¿A qué quiere llegar?
    - **Inferencia:** ¿Cómo pasa de las premisas a la conclusión?
2. **Busca Falacias.** Identifica explícitamente falacias comunes (ad hominem, hombre de paja, falso dilema, etc.).
3. **Identifica Premisas Ocultas.** ¿Qué está asumiendo el autor que no ha dicho? (Entimemas).
4. **Evalúa la Solidez.** Clasifica el argumento como:
    - **Válido/Inválido** (Lógica formal).
    - **Sólido/Débil** (Verdad de las premisas).
5. **Propone el "Fix".** Sugiere cómo mejorar el argumento para que sea más difícil de refutar.

## Ejemplo de Prompt de Activación
"/argument-debugger La inteligencia artificial acabará con la creatividad humana porque solo repite patrones."
"/argument-debugger Debemos prohibir los exámenes porque generan estrés."
