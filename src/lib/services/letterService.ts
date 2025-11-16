import { prisma } from '../db/client';
import { NotFoundError, ValidationError } from '../errors/AppError';

export interface CreateLetterInput {
  processId: string;
  recommenderName: string;
  recommenderTitle: string;
  recommenderOrg?: string;
  recommenderEmail?: string;
  content?: string;
  status?: string;
}

export interface UpdateLetterInput {
  recommenderName?: string;
  recommenderTitle?: string;
  recommenderOrg?: string;
  recommenderEmail?: string;
  content?: string;
  status?: string;
}

/**
 * Create recommendation letter
 */
export async function createLetter(input: CreateLetterInput) {
  // Verificar se processo existe
  const process = await prisma.process.findUnique({
    where: { id: input.processId },
  });

  if (!process) {
    throw new NotFoundError('Process', input.processId);
  }

  return prisma.recommendationLetter.create({
    data: {
      processId: input.processId,
      recommenderName: input.recommenderName,
      recommenderTitle: input.recommenderTitle,
      recommenderOrg: input.recommenderOrg,
      recommenderEmail: input.recommenderEmail,
      content: input.content,
      status: input.status || 'draft',
    },
  });
}

/**
 * Get letter by ID
 */
export async function getLetterById(letterId: string) {
  const letter = await prisma.recommendationLetter.findUnique({
    where: { id: letterId },
    include: {
      process: true,
    },
  });

  if (!letter) {
    throw new NotFoundError('Recommendation Letter', letterId);
  }

  return letter;
}

/**
 * Get letters by process ID
 */
export async function getLettersByProcessId(processId: string) {
  return prisma.recommendationLetter.findMany({
    where: { processId },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Update letter
 */
export async function updateLetter(
  letterId: string,
  input: UpdateLetterInput
) {
  const existing = await prisma.recommendationLetter.findUnique({
    where: { id: letterId },
  });

  if (!existing) {
    throw new NotFoundError('Recommendation Letter', letterId);
  }

  // Validar status transitions
  if (input.status) {
    const validStatuses = ['draft', 'review', 'final', 'signed'];
    if (!validStatuses.includes(input.status)) {
      throw new ValidationError(
        `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      );
    }

    // Validações de transição de status
    if (input.status === 'signed' && existing.status !== 'final') {
      throw new ValidationError(
        'Cannot mark as signed without first marking as final'
      );
    }
  }

  return prisma.recommendationLetter.update({
    where: { id: letterId },
    data: input,
  });
}

/**
 * Delete letter
 */
export async function deleteLetter(letterId: string) {
  const existing = await prisma.recommendationLetter.findUnique({
    where: { id: letterId },
  });

  if (!existing) {
    throw new NotFoundError('Recommendation Letter', letterId);
  }

  return prisma.recommendationLetter.delete({
    where: { id: letterId },
  });
}



