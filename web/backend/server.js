import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import globbyPkg from 'globby';
const { globby } = globbyPkg;
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const REPO_ROOT = path.join(__dirname, '..', '..');

// Endpoint para listar skills
app.get('/api/skills', async (req, res) => {
  try {
    const skillsPath = path.join(REPO_ROOT, 'skills');
    const categories = await fs.readdir(skillsPath);
    const allSkills = [];

    for (const category of categories) {
      const categoryPath = path.join(skillsPath, category);
      const stat = await fs.lstat(categoryPath);
      if (stat.isDirectory()) {
        const skills = await fs.readdir(categoryPath);
        for (const skill of skills) {
          const skillPath = path.join(categoryPath, skill);
          const skillStat = await fs.lstat(skillPath);
          if (skillStat.isDirectory()) {
            allSkills.push({
              id: skill,
              name: skill,
              category: category
            });
          }
        }
      }
    }
    res.json(allSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para el chat
app.post('/api/chat', async (req, res) => {
  const { skillId, messages, config } = req.body;
  
  try {
    const skillFiles = await globby(path.join(REPO_ROOT, 'skills', '**', skillId, 'SKILL.md').replace(/\\/g, '/'));
    if (skillFiles.length === 0) throw new Error('Skill not found');

    const skillContent = await fs.readFile(skillFiles[0], 'utf-8');
    const contextContent = await fs.readFile(path.join(REPO_ROOT, 'CONTEXT.md'), 'utf-8');
    const guardrailsContent = await fs.readFile(path.join(REPO_ROOT, 'out-of-scope', 'pedagogical-guardrails.md'), 'utf-8');

    const systemPrompt = `
      ${skillContent}
      --- CONTEXT ---
      ${contextContent}
      --- GUARDRAILS ---
      ${guardrailsContent}
    `;

    let responseText;
    if (config.provider === 'Anthropic') {
      const anthropic = new Anthropic({ apiKey: config.apiKey });
      const msg = await anthropic.messages.create({
        model: config.model || "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      });
      responseText = msg.content[0].text;
    } else {
      const openai = new OpenAI({ 
        apiKey: config.apiKey,
        baseURL: config.baseUrl || undefined
      });
      const completion = await openai.chat.completions.create({
        model: config.model || "gpt-4o",
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      });
      responseText = completion.choices[0].message.content;
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
