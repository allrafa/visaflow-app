const fs = require('fs');
const path = require('path');

const tasksFile = path.join(__dirname, '../src/lib/constants/default-tasks.ts');
let content = fs.readFileSync(tasksFile, 'utf8');

// Encontrar onde termina a primeira ocorrência completa (após FILING)
const filingEndMarker = '  // PHASE 5: FILING (Tasks 256-288) - 33 tarefas';
const filingEndIndex = content.indexOf(filingEndMarker);

if (filingEndIndex === -1) {
  console.error('❌ Não encontrou início de FILING');
  process.exit(1);
}

// Encontrar o final da primeira ocorrência (próximo ]; após todas as tarefas de FILING)
// Procurar por ]; que vem após aproximadamente 33 tarefas de FILING
let searchStart = filingEndIndex;
let closingBracketIndex = -1;

// Procurar pelo ]; que fecha o array DEFAULT_TASKS
for (let i = 0; i < 10; i++) {
  const nextBracket = content.indexOf('];', searchStart);
  if (nextBracket !== -1) {
    // Verificar se há outra fase depois
    const afterBracket = content.substring(nextBracket + 2, nextBracket + 100);
    if (afterBracket.includes('PHASE') || afterBracket.trim().startsWith('//')) {
      // Este não é o final, continuar
      searchStart = nextBracket + 2;
      continue;
    }
    closingBracketIndex = nextBracket;
    break;
  }
}

if (closingBracketIndex === -1) {
  // Tentar encontrar o último ]; antes de funções
  const functionsStart = content.indexOf('/**\n * Get default tasks');
  if (functionsStart !== -1) {
    const beforeFunctions = content.substring(0, functionsStart);
    closingBracketIndex = beforeFunctions.lastIndexOf('];');
  }
}

if (closingBracketIndex === -1) {
  console.error('❌ Não encontrou fechamento do array');
  process.exit(1);
}

// Manter apenas até o fechamento do array + funções
const cleanContent = content.substring(0, closingBracketIndex + 2) + '\n\n' + content.substring(content.indexOf('/**\n * Get default tasks'));

// Escrever arquivo limpo
fs.writeFileSync(tasksFile, cleanContent, 'utf8');

// Verificar
const taskCount = (cleanContent.match(/phase: '/g) || []).length;
console.log(`✅ Arquivo limpo! Total de tarefas: ${taskCount}`);

// Verificar fases
const phases = cleanContent.match(/PHASE \d:/g) || [];
console.log(`📊 Fases encontradas: ${phases.length}`);

