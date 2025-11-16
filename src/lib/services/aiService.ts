import Anthropic from '@anthropic-ai/sdk';
import { ValidationError } from '../errors/AppError';
import { APPROVAL_PATTERNS, REJECTION_PATTERNS } from '../constants/approvalPatterns';
import { checkSuspiciousPatterns } from '../constants/suspiciousPractices';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0-100
  subsectionScores?: Record<string, number>; // Score por subseção
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    section: string;
    message: string;
    suggestion?: string;
  }>;
  feedback: string;
  approvalPatterns?: string[]; // Padrões de aprovação detectados
  rejectionPatterns?: string[]; // Padrões de rejeição detectados
  aiGeneratedLikelihood?: number; // 0-100, probabilidade de ser gerado por IA
}

/**
 * Validate criteria content using Claude API
 * Enhanced with approval/rejection pattern analysis based on 13 real cases
 */
export async function validateCriteriaContent(
  criteria: string,
  content: {
    overview?: string;
    context?: string;
    impact?: string;
    evidence?: string;
  }
): Promise<ValidationResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ValidationError('ANTHROPIC_API_KEY not configured');
  }

  // Build approval patterns context
  const approvalPatternsText = APPROVAL_PATTERNS.map(
    (p) => `- ${p.id}: ${p.description}. Indicators: ${p.indicators.join(', ')}`
  ).join('\n');

  // Build rejection patterns context
  const rejectionPatternsText = REJECTION_PATTERNS.map(
    (p) => `- ${p.id}: ${p.description}. Red flags: ${p.redFlags.join(', ')}`
  ).join('\n');

  const prompt = `
You are an expert immigration attorney with deep knowledge of EB-1A petitions, having analyzed 13 real cases (9 approvals + 4 RFEs/rejections) and 7 strategies from experienced professionals.

CRITERION: ${criteria}

CONTENT TO VALIDATE:
- Overview (Proof of Recipient/Achievement): ${content.overview || 'Not provided'}
- Context (Proof of Excellence): ${content.context || 'Not provided'}
- Impact (Proof of Requirements): ${content.impact || 'Not provided'}
- Evidence (Proof of Recognition): ${content.evidence || 'Not provided'}

APPROVAL PATTERNS (from successful cases):
${approvalPatternsText}

REJECTION PATTERNS (from RFEs/rejections):
${rejectionPatternsText}

ANALYSIS REQUIRED:

1. STRUCTURE ANALYSIS:
   - Does it have all 4 required subsections?
   - Does each subsection address Policy Manual requirements?
   - Is the structure clear and organized?

2. EVIDENCE QUALITY:
   - Are there specific dates, numbers, and names?
   - Can evidence be independently verified?
   - Is there comparative context showing excellence?
   - Are there sufficient supporting documents mentioned?

3. APPROVAL PATTERN MATCHING:
   - Which approval patterns are present? (List pattern IDs)
   - How strongly does it match each pattern? (0-100)

4. REJECTION PATTERN DETECTION:
   - Which rejection patterns are present? (List pattern IDs)
   - What red flags exist?
   - What mitigation strategies are needed?

5. AI-GENERATED TEXT DETECTION:
   - Does the text sound authentic and personal?
   - Are there signs of AI generation? (excessive formality, generic language, lack of personal details)
   - Likelihood of being AI-generated (0-100, where 0 = authentic, 100 = clearly AI)

6. SCORE CALCULATION:
   - Base score: 0-100 based on completeness and quality
   - Subsection scores: Individual scores for each of the 4 subsections
   - Deduct points for rejection patterns
   - Add points for approval patterns
   - Deduct points for AI-generated text likelihood

7. RFE RISK ASSESSMENT:
   - What issues could trigger RFE?
   - What evidence is missing?
   - What needs clarification?

Respond in JSON format (be precise):
{
  "isValid": boolean,
  "score": number (0-100, overall score),
  "subsectionScores": {
    "overview": number (0-100),
    "context": number (0-100),
    "impact": number (0-100),
    "evidence": number (0-100)
  },
  "issues": [
    {
      "type": "error" | "warning" | "info",
      "section": string (which subsection),
      "message": string (specific issue),
      "suggestion": string (actionable suggestion)
    }
  ],
  "feedback": string (detailed feedback explaining score and recommendations),
  "approvalPatterns": [string] (list of pattern IDs present),
  "rejectionPatterns": [string] (list of pattern IDs present),
  "aiGeneratedLikelihood": number (0-100)
}
`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000, // Increased for detailed analysis
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new ValidationError('Unexpected response format from AI');
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new ValidationError('Could not parse AI response');
    }

    const result = JSON.parse(jsonMatch[0]) as ValidationResult;
    
    // Ensure isValid is set based on score
    if (result.isValid === undefined) {
      result.isValid = result.score >= 70;
    }
    
    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError(
      `Failed to validate content: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Analyze approval patterns in content
 * Returns which approval patterns are present and their strength
 */
export async function analyzeApprovalPatterns(
  criteria: string,
  content: {
    overview?: string;
    context?: string;
    impact?: string;
    evidence?: string;
  }
): Promise<Array<{ patternId: string; strength: number; evidence: string }>> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return [];
  }

  const fullContent = [
    content.overview,
    content.context,
    content.impact,
    content.evidence,
  ]
    .filter(Boolean)
    .join('\n\n');

  const approvalPatternsText = APPROVAL_PATTERNS.map(
    (p) => `- ${p.id}: ${p.description}\n  Indicators: ${p.indicators.join(', ')}\n  Examples: ${p.examples.join('; ')}`
  ).join('\n\n');

  const prompt = `
Analyze this EB-1A criterion content for approval patterns:

CRITERION: ${criteria}

CONTENT:
${fullContent}

APPROVAL PATTERNS TO CHECK:
${approvalPatternsText}

For each approval pattern, determine:
1. Is this pattern present? (yes/no)
2. If yes, strength (0-100) - how strongly does the content match this pattern?
3. What specific evidence supports this pattern?

Respond in JSON format:
{
  "patterns": [
    {
      "patternId": string,
      "strength": number (0-100, 0 if not present),
      "evidence": string (specific text from content that demonstrates the pattern)
    }
  ]
}
`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const contentResponse = message.content[0];
    if (contentResponse.type !== 'text') {
      return [];
    }

    const jsonMatch = contentResponse.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return [];
    }

    const result = JSON.parse(jsonMatch[0]) as {
      patterns: Array<{ patternId: string; strength: number; evidence: string }>;
    };

    return result.patterns.filter((p) => p.strength > 0);
  } catch (error) {
    console.error('Failed to analyze approval patterns:', error);
    return [];
  }
}

/**
 * Detect suspicious practices that could trigger RFE
 */
export async function detectSuspiciousPractices(
  content: string
): Promise<Array<{ type: string; message: string; severity: 'high' | 'medium' | 'low' }>> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return [];
  }

  const detected: Array<{ type: string; message: string; severity: 'high' | 'medium' | 'low' }> = [];

  // Check for known suspicious patterns using the expanded list
  const matchedPractices = checkSuspiciousPatterns(content);
  
  for (const practice of matchedPractices) {
    detected.push({
      type: practice.id,
      message: `${practice.name}: ${practice.description}`,
      severity: practice.severity,
    });
  }

  // Use Claude to detect AI-generated text and suspicious practices
  try {
    const rejectionPatternsText = REJECTION_PATTERNS.map(
      (p) => `- ${p.id}: ${p.description}\n  Red flags: ${p.redFlags.join(', ')}\n  Examples: ${p.examples.join('; ')}`
    ).join('\n\n');

    const prompt = `
Analyze this text for potential issues that could trigger RFE in an EB-1A petition:

${content}

REJECTION PATTERNS TO CHECK:
${rejectionPatternsText}

SPECIFIC CHECKS:
1. Paid coverage not marked as such (Globee Awards, Stevie Awards, etc.)
2. Trash publishing or predatory journals
3. AI-generated text patterns (excessive formality, generic language, lack of personal details)
4. Exaggerated claims without evidence
5. Missing disclaimers for paid awards
6. Vague claims without specific dates, numbers, or names
7. Insufficient evidence or unverifiable claims

For AI-generated text detection, look for:
- Excessive formality and generic language
- Lack of personal voice or authenticity
- Repetitive patterns
- Absence of specific personal details
- Overly polished and perfect language

Respond in JSON format:
{
  "issues": [
    {
      "type": string (e.g., "paid_coverage", "ai_generated", "vague_claims", etc.),
      "message": string (specific issue found),
      "severity": "high" | "medium" | "low"
    }
  ],
  "aiGeneratedLikelihood": number (0-100, probability text is AI-generated)
}
`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const contentResponse = message.content[0];
    if (contentResponse.type === 'text') {
      const jsonMatch = contentResponse.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]) as {
          issues: Array<{ type: string; message: string; severity: 'high' | 'medium' | 'low' }>;
          aiGeneratedLikelihood?: number;
        };
        detected.push(...result.issues);
        
        // Add AI-generated likelihood as separate issue if high
        if (result.aiGeneratedLikelihood && result.aiGeneratedLikelihood > 50) {
          detected.push({
            type: 'ai_generated',
            message: `High likelihood of AI-generated text (${result.aiGeneratedLikelihood}%). USCIS may reject overly formal or generic language.`,
            severity: result.aiGeneratedLikelihood > 75 ? 'high' : 'medium',
          });
        }
      }
    }
  } catch (error) {
    console.error('Failed to detect suspicious practices:', error);
  }

  return detected;
}

export interface FinalMeritsInput {
  processId: string;
  northStar?: string;
  criteria: Array<{
    id: string;
    criteria: string;
    overview?: string;
    context?: string;
    impact?: string;
    evidence?: string;
    validationScore?: number;
  }>;
}

export interface FinalMeritsResult {
  document: string; // Documento completo estruturado (20-30 páginas)
  sections: Array<{
    title: string;
    content: string;
    order: number;
  }>;
  crossReferences: Array<{
    from: string; // Seção origem
    to: string; // Seção destino
    type: 'criteria' | 'evidence' | 'impact';
  }>;
  metrics: {
    totalCriteria: number;
    averageScore: number;
    strongCriteria: number; // Score >= 80
    moderateCriteria: number; // Score 50-79
    weakCriteria: number; // Score < 50
  };
  recommendations: Array<{
    type: 'strengthen' | 'add' | 'clarify';
    section: string;
    message: string;
  }>;
}

/**
 * Generate Final Merits Statement (20-30 pages structured document)
 * Based on approved petition analysis (557 pages) and 13 real cases
 */
export async function generateFinalMerits(
  input: FinalMeritsInput
): Promise<FinalMeritsResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ValidationError('ANTHROPIC_API_KEY not configured');
  }

  // Build criteria content summary
  const criteriaSummary = input.criteria
    .map((c, idx) => {
      const hasContent = c.overview || c.context || c.impact || c.evidence;
      const score = c.validationScore ?? 0;
      const scoreLabel = score >= 80 ? 'Strong' : score >= 50 ? 'Moderate' : 'Weak';
      
      return `
CRITERION ${idx + 1}: ${c.criteria} (${scoreLabel}, Score: ${score}/100)
${hasContent ? `
- Overview: ${c.overview || 'Not provided'}
- Context: ${c.context || 'Not provided'}
- Impact: ${c.impact || 'Not provided'}
- Evidence: ${c.evidence || 'Not provided'}
` : 'No content provided yet'}
`;
    })
    .join('\n---\n');

  const approvalPatternsText = APPROVAL_PATTERNS.map(
    (p) => `- ${p.id}: ${p.description}\n  Indicators: ${p.indicators.join(', ')}`
  ).join('\n');

  const prompt = `
You are an expert immigration attorney specializing in EB-1A petitions. You have analyzed 13 real cases (9 approvals + 4 RFEs/rejections) and a successful 557-page petition.

TASK: Generate a comprehensive Final Merits Statement (20-30 pages) for an EB-1A petition.

NORTH STAR STATEMENT (Main Thesis):
${input.northStar || 'Not provided - will need to be developed'}

CRITERIA EVIDENCE PROVIDED:
${criteriaSummary}

APPROVAL PATTERNS TO INCORPORATE:
${approvalPatternsText}

STRUCTURE REQUIREMENTS (based on successful 557-page petition):

1. EXECUTIVE SUMMARY (1-2 pages)
   - Brief overview of extraordinary ability
   - Key achievements highlighted
   - North Star statement integration

2. INTRODUCTION (2-3 pages)
   - Background and context
   - Field of expertise
   - Significance of contributions
   - Overview of evidence structure

3. CRITERIA SECTIONS (15-20 pages total, ~2-3 pages per criterion)
   For each criterion provided, create:
   - Criterion Title and Legal Standard
   - Overview (Proof of Recipient/Achievement)
   - Context (Proof of Excellence)
   - Impact (Proof of Requirements)
   - Evidence (Proof of Recognition)
   - Cross-references to other criteria and evidence
   - Supporting documentation summary

4. COMPARATIVE ANALYSIS (2-3 pages)
   - Comparison with peers in the field
   - Demonstrating exceptional standing
   - Quantifiable metrics and achievements

5. CONCLUSION (1-2 pages)
   - Summary of extraordinary ability
   - Synthesis of all criteria
   - Final argument for approval

REQUIREMENTS:
- Use formal legal writing style appropriate for USCIS
- Include specific dates, numbers, and names where available
- Create cross-references between related criteria and evidence
- Use transitional phrases to connect sections
- Maintain consistency in terminology
- Include placeholders for specific evidence (e.g., "[Exhibit A]", "[Letter from Dr. X]")
- Ensure each criterion section is comprehensive (2-3 pages minimum)
- Integrate North Star statement throughout document
- Use approval patterns to strengthen arguments

CROSS-REFERENCE SYSTEM:
- When mentioning evidence from one criterion in another, use format: "As detailed in Criterion [X] (see Section [Y])"
- Create logical flow between criteria
- Show how criteria reinforce each other

RESPOND IN JSON FORMAT:
{
  "document": string (complete formatted document, 20-30 pages, use \\n for line breaks),
  "sections": [
    {
      "title": string (section title),
      "content": string (section content),
      "order": number (1, 2, 3, etc.)
    }
  ],
  "crossReferences": [
    {
      "from": string (source section/criterion),
      "to": string (target section/criterion),
      "type": "criteria" | "evidence" | "impact"
    }
  ],
  "metrics": {
    "totalCriteria": number,
    "averageScore": number,
    "strongCriteria": number,
    "moderateCriteria": number,
    "weakCriteria": number
  },
  "recommendations": [
    {
      "type": "strengthen" | "add" | "clarify",
      "section": string,
      "message": string (actionable recommendation)
    }
  ]
}
`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000, // Large token limit for 20-30 page document
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new ValidationError('Unexpected response format from AI');
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new ValidationError('Could not parse AI response');
    }

    const result = JSON.parse(jsonMatch[0]) as FinalMeritsResult;

    // Calculate metrics if not provided
    if (!result.metrics) {
      const scores = input.criteria
        .map((c) => c.validationScore ?? 0)
        .filter((s) => s > 0);
      
      result.metrics = {
        totalCriteria: input.criteria.length,
        averageScore: scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0,
        strongCriteria: scores.filter((s) => s >= 80).length,
        moderateCriteria: scores.filter((s) => s >= 50 && s < 80).length,
        weakCriteria: scores.filter((s) => s < 50).length,
      };
    }

    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError(
      `Failed to generate Final Merits: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

