#!/usr/bin/env bash
set -euo pipefail

# Enlaza todas las skills del repositorio a ~/.claude/skills

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$HOME/.claude/skills"

mkdir -p "$DEST"

find "$REPO/skills" -name SKILL.md -not -path '*/node_modules/*' -print0 | while IFS= read -r -d '' skill_md; do
  src="$(dirname "$skill_md")"
  name="$(basename "$src")"
  target="$DEST/$name"
  
  if [ -e "$target" ] && [ ! -L "$target" ]; then
    rm -rf "$target"
  fi
  
  ln -sfn "$src" "$target"
  echo "Enlazada skill: $name -> $src"
done
