#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import globbyPkg from 'globby';
const { globby } = globbyPkg;
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name('edu-skills')
  .description('CLI para gestionar AI Edu-Skills para Real Educators')
  .version('1.0.0');

// Comando: list
program
  .command('list')
  .description('Lista todas las skills disponibles organizadas por categoría')
  .action(async () => {
    console.log(chalk.bold.cyan('\n🍎 AI Edu-Skills Disponibles:\n'));
    
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
    const skillsPath = path.join(process.cwd(), 'skills');
    
    // Buscar la skill en todas las subcarpetas
    const files = await globby(`skills/**/${cleanName}/SKILL.md`);
    
    if (files.length === 0) {
      console.log(chalk.red(`\n❌ Error: No se encontró la skill "/${cleanName}"`));
      return;
    }

    const content = await fs.readFile(files[0], 'utf-8');
    console.log(`\n${chalk.bold.blue('--- Información de la Skill ---')}\n`);
    console.log(content);
    console.log(`\n${chalk.bold.blue('------------------------------')}\n`);
  });

// Comando: link
program
  .command('link')
  .description('Enlaza las skills con Claude Desktop/CLI')
  .action(() => {
    console.log(chalk.blue('\n🔗 Enlazando skills con Claude...'));
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
      console.log(chalk.green('\n✅ Skills enlazadas correctamente.'));
    } catch (error) {
      console.log(chalk.red(`\n❌ Error al enlazar skills: ${error.message}`));
    }
  });

program.parse();
