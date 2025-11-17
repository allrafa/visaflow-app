const fs = require('fs');
const path = require('path');

// Ler arquivo original
const tasksFile = path.join(__dirname, '../src/lib/constants/default-tasks.ts');
let content = fs.readFileSync(tasksFile, 'utf8');

// Ler tarefas geradas
const lettersTasks = fs.readFileSync('/tmp/letters_final.txt', 'utf8');
const petitionTasks = fs.readFileSync('/tmp/petition_final.txt', 'utf8');
const filingTasks = fs.readFileSync('/tmp/filing_final.txt', 'utf8');

// Substituir seção LETTERS
const lettersStart = content.indexOf('  // PHASE 3: LETTERS');
const lettersEnd = content.indexOf('  // PHASE 4: PETITION');
if (lettersStart !== -1 && lettersEnd !== -1) {
  const newLettersSection = `  // ============================================
  // PHASE 3: LETTERS (Tasks 170-210) - 41 tarefas
  // ============================================
${lettersTasks}`;
  content = content.substring(0, lettersStart) + newLettersSection + '\n\n' + content.substring(lettersEnd);
  console.log('✅ Seção LETTERS substituída');
} else {
  console.error('❌ Não encontrou marcadores de LETTERS');
}

// Substituir seção PETITION
const petitionStart = content.indexOf('  // PHASE 4: PETITION');
const petitionEnd = content.indexOf('  // PHASE 5: FILING');
if (petitionStart !== -1 && petitionEnd !== -1) {
  const newPetitionSection = `  // ============================================
  // PHASE 4: PETITION (Tasks 211-255) - 45 tarefas
  // ============================================
${petitionTasks}`;
  content = content.substring(0, petitionStart) + newPetitionSection + '\n\n' + content.substring(petitionEnd);
  console.log('✅ Seção PETITION substituída');
} else {
  console.error('❌ Não encontrou marcadores de PETITION');
}

// Substituir seção FILING
const filingStart = content.indexOf('  // PHASE 5: FILING');
const filingEnd = content.indexOf('];');
if (filingStart !== -1 && filingEnd !== -1) {
  const newFilingSection = `  // ============================================
  // PHASE 5: FILING (Tasks 256-288) - 33 tarefas
  // ============================================
${filingTasks}`;
  content = content.substring(0, filingStart) + newFilingSection + '\n\n' + content.substring(filingEnd);
  console.log('✅ Seção FILING substituída');
} else {
  console.error('❌ Não encontrou marcadores de FILING');
}

// Escrever arquivo atualizado
fs.writeFileSync(tasksFile, content, 'utf8');
console.log('\n✅ Arquivo default-tasks.ts atualizado com todas as 289 tarefas!');

// Contar tarefas
const taskCount = (content.match(/phase: '/g) || []).length;
console.log(`📊 Total de tarefas no arquivo: ${taskCount}`);

