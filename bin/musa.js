#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import globbyPkg from 'globby';
const { globby } = globbyPkg;
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();
const CONFIG_PATH = path.join(process.cwd(), '.musa-config.json');

const MUSA_LOGO = chalk.bold.magenta(`
   __  __ _    _  _____         
  |  \\/  | |  | |/ ____|  /\\    
  | \\  / | |  | | (___   /  \\   
  | |\\/| | |  | |\\___ \\ / /\\ \\  
  | |  | | |__| |____) / ____ \\ 
  |_|  |_|\\____/|_____/_/    \\_\\
`);

// Helper para cargar configuración
async function getConfig() {
  if (existsSync(CONFIG_PATH)) {
    return JSON.parse(await fs.readFile(CONFIG_PATH, 'utf-8'));
  }
  return {};
}

// Helper para guardar configuración
async function saveConfig(config) {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

program
  .name('musa')
  .description('Musa CLI: La inspiración para Real Educators')
  .version('1.0.0');

// Comando: config
program
  .command('config')
  .description('Configura el proveedor de IA y las API keys')
  .action(async () => {
    const currentConfig = await getConfig();
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: 'Selecciona tu proveedor de IA preferido:',
        choices: ['OpenAI', 'Anthropic', 'Groq (OpenAI Compatible)', 'Local (Ollama/LM Studio)'],
        default: currentConfig.provider
      },
      {
        type: 'input',
        name: 'apiKey',
        message: 'Introduce tu API Key:',
        default: currentConfig.apiKey,
        when: (a) => a.provider !== 'Local (Ollama/LM Studio)'
      },
      {
        type: 'input',
        name: 'baseUrl',
        message: 'Introduce la URL base (opcional):',
        default: currentConfig.baseUrl,
        when: (a) => a.provider === 'Groq (OpenAI Compatible)' || a.provider === 'Local (Ollama/LM Studio)'
      },
      {
        type: 'input',
        name: 'model',
        message: 'Introduce el nombre del modelo (ej: gpt-4o, claude-3-5-sonnet-20240620):',
        default: currentConfig.model || (currentConfig.provider === 'Anthropic' ? 'claude-3-5-sonnet-20240620' : 'gpt-4o')
      }
    ]);

    await saveConfig(answers);
    console.log(chalk.green('\n✅ Configuración guardada correctamente.'));
  });

// Comando: list
program
  .command('list')
  .description('Lista todas las skills disponibles organizadas por categoría')
  .action(async () => {
    console.log(MUSA_LOGO);
    console.log(chalk.bold.cyan('📜 Habilidades cognitivas disponibles:\n'));
    
    const skillsPath = path.join(process.cwd(), 'skills');
    const categories = await fs.readdir(skillsPath);

    for (const category of categories) {
      const categoryPath = path.join(skillsPath, category);
      const stat = await fs.lstat(categoryPath);
      
      if (stat.isDirectory()) {
        console.log(chalk.yellow(`\n📁 ${category.toUpperCase()}`));
        const skills = await fs.readdir(categoryPath);
        for (const skill of skills) {
          const skillPath = path.join(categoryPath, skill);
          const skillStat = await fs.lstat(skillPath);
          if (skillStat.isDirectory()) {
            console.log(chalk.green(`  - /${skill}`));
          }
        }
      }
    }
    console.log('');
  });

// Comando: explain
program
  .command('explain <skill>')
  .description('Muestra la filosofía e instrucciones de una skill específica')
  .action(async (skillName) => {
    const cleanName = skillName.startsWith('/') ? skillName.slice(1) : skillName;
    const files = await globby(`skills/**/${cleanName}/SKILL.md`);
    
    if (files.length === 0) {
      console.log(chalk.red(`\n❌ Musa no encuentra la habilidad "/${cleanName}"`));
      return;
    }

    const content = await fs.readFile(files[0], 'utf-8');
    console.log(`\n${chalk.bold.magenta('--- Sabiduría de Musa ---')}\n`);
    console.log(content);
    console.log(`\n${chalk.bold.magenta('-------------------------')}\n`);
  });

// Comando: chat
program
  .command('chat <skill>')
  .description('Inicia una sesión de aprendizaje interactiva con una skill')
  .action(async (skillName) => {
    const config = await getConfig();
    if (!config.provider) {
      console.log(chalk.yellow('\n⚠️  Musa no está configurada. Ejecuta "musa config" primero.'));
      return;
    }

    const cleanName = skillName.startsWith('/') ? skillName.slice(1) : skillName;
    const files = await globby(`skills/**/${cleanName}/SKILL.md`);
    
    if (files.length === 0) {
      console.log(chalk.red(`\n❌ No se encontró la habilidad "/${cleanName}"`));
      return;
    }

    const skillContent = await fs.readFile(files[0], 'utf-8');
    const contextContent = await fs.readFile(path.join(process.cwd(), 'CONTEXT.md'), 'utf-8');
    const guardrailsContent = await fs.readFile(path.join(process.cwd(), 'out-of-scope', 'pedagogical-guardrails.md'), 'utf-8');

    const systemPrompt = `
      ${skillContent}
      
      --- INFORMACIÓN DE CONTEXTO Y REGLAS DEL SISTEMA ---
      ${contextContent}
      
      --- GUARDRAILS PEDAGÓGICOS (ESTRICTOS) ---
      ${guardrailsContent}
    `;

    console.log(MUSA_LOGO);
    console.log(chalk.magenta(`✨ Sesión iniciada con la habilidad: /${cleanName}`));
    console.log(chalk.gray('Escribe "exit" para terminar la sesión.\n'));

    let messages = [];
    let client;

    if (config.provider === 'Anthropic') {
      client = new Anthropic({ apiKey: config.apiKey });
    } else {
      client = new OpenAI({ 
        apiKey: config.apiKey || 'ollama', 
        baseURL: config.baseUrl || undefined 
      });
    }

    const chatLoop = async () => {
      const { userInput } = await inquirer.prompt([
        {
          type: 'input',
          name: 'userInput',
          message: chalk.cyan('Tú >')
        }
      ]);

      if (userInput.toLowerCase() === 'exit') {
        console.log(chalk.magenta('\n👋 Musa se despide. ¡Sigue aprendiendo!'));
        return;
      }

      messages.push({ role: 'user', content: userInput });

      try {
        process.stdout.write(chalk.magenta('\nMusa > '));
        
        let fullResponse = '';
        if (config.provider === 'Anthropic') {
          const stream = await client.messages.create({
            model: config.model,
            max_tokens: 1024,
            system: systemPrompt,
            messages: messages,
            stream: true,
          });

          for await (const event of stream) {
            if (event.type === 'content_block_delta') {
              process.stdout.write(event.delta.text);
              fullResponse += event.delta.text;
            }
          }
        } else {
          const stream = await client.chat.completions.create({
            model: config.model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages
            ],
            stream: true,
          });

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            process.stdout.write(content);
            fullResponse += content;
          }
        }
        
        console.log('\n');
        messages.push({ role: 'assistant', content: fullResponse });
        await chatLoop();
      } catch (error) {
        console.log(chalk.red(`\n❌ Error en la comunicación con la Musa: ${error.message}`));
      }
    };

    await chatLoop();
  });

// Comando: link
program
  .command('link')
  .description('Enlaza las skills con Claude Desktop/CLI')
  .action(() => {
    console.log(chalk.magenta('\n✨ Musa está invocando las habilidades en Claude...'));
    try {
      const isWindows = process.platform === 'win32';
      const scriptPath = isWindows 
        ? path.join(process.cwd(), 'scripts', 'link-skills.ps1')
        : path.join(process.cwd(), 'scripts', 'link-skills.sh');

      if (isWindows) {
        execSync(`powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`, { stdio: 'inherit' });
      } else {
        execSync(`bash "${scriptPath}"`, { stdio: 'inherit' });
      }
      console.log(chalk.green('\n✅ Habilidades enlazadas. La inspiración fluye.'));
    } catch (error) {
      console.log(chalk.red(`\n❌ Error en la invocación: ${error.message}`));
    }
  });

program.parse();
