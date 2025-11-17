const fs = require('fs');
const path = require('path');

// Ler arquivo original
const tasksFile = path.join(__dirname, '../src/lib/constants/default-tasks.ts');
const originalContent = fs.readFileSync(tasksFile, 'utf8');

// Ler tarefas geradas
const evidenceTasks = fs.readFileSync('/tmp/evidence_tasks_clean.txt', 'utf8');

// Encontrar início e fim da seção EVIDENCE antiga
const startMarker = '  // ============================================\n  // PHASE 2: EVIDENCE (Tasks 5-14)';
const endMarker = '  // ============================================\n  // PHASE 3: LETTERS';

const startIndex = originalContent.indexOf(startMarker);
const endIndex = originalContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Não foi possível encontrar os marcadores!');
  process.exit(1);
}

// Construir nova seção
const newEvidenceSection = `  // ============================================
  // PHASE 2: EVIDENCE (Tasks 20-169) - 150 tarefas
  // ============================================
${evidenceTasks}`;

// Substituir
const newContent = 
  originalContent.substring(0, startIndex) +
  newEvidenceSection +
  originalContent.substring(endIndex);

// Escrever arquivo atualizado
fs.writeFileSync(tasksFile, newContent, 'utf8');
console.log('✅ Seção EVIDENCE substituída com sucesso!');
console.log(`📊 ${evidenceTasks.split('},').length - 1} tarefas adicionadas`);

