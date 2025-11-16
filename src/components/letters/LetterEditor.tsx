'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLetterSchema, updateLetterSchema, type CreateLetterInput, type UpdateLetterInput } from '@/lib/validators/letter.schema';
import { getLetterTemplate, getAllLetterTemplates, generateLetterFromTemplate } from '@/lib/templates/letterTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { FileText, Save, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import type { LetterTemplate } from '@/lib/templates/letterTemplates';

interface LetterEditorProps {
  processId: string;
  processTitle?: string;
  letterId?: string;
  initialData?: {
    recommenderName?: string;
    recommenderTitle?: string;
    recommenderOrg?: string;
    recommenderEmail?: string;
    content?: string;
    status?: string;
  };
  onSave?: () => void;
}

export function LetterEditor({
  processId,
  processTitle,
  letterId,
  initialData,
  onSave,
}: LetterEditorProps) {
  const [templateType, setTemplateType] = useState<string>('ACADEMIC');
  const [template, setTemplate] = useState<LetterTemplate | undefined>();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({});

  const isEditing = !!letterId;
  const schema = isEditing ? updateLetterSchema : createLetterSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateLetterInput | UpdateLetterInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      processId: isEditing ? undefined : processId,
      recommenderName: initialData?.recommenderName || '',
      recommenderTitle: initialData?.recommenderTitle || '',
      recommenderOrg: initialData?.recommenderOrg || '',
      recommenderEmail: initialData?.recommenderEmail || '',
      content: initialData?.content || '',
      status: (initialData?.status as any) || 'draft',
    },
  });

  const formData = watch();

  useEffect(() => {
    const tmpl = getLetterTemplate(templateType);
    setTemplate(tmpl);
    
    // Preencher seções se houver conteúdo inicial
    if (initialData?.content && template) {
      // Parse sections from content if possible
      // Por enquanto, apenas definir o conteúdo completo
    }
  }, [templateType, initialData]);

  const handleTemplateChange = (value: string) => {
    setTemplateType(value);
    const tmpl = getLetterTemplate(value);
    setTemplate(tmpl);
    setSectionContents({});
  };

  const handleSectionChange = (sectionId: string, value: string) => {
    setSectionContents((prev) => ({
      ...prev,
      [sectionId]: value,
    }));
  };

  const handleGenerateFromTemplate = () => {
    if (!template) return;

    // Extract candidate name from process title (format: "Name - EB-1A Process")
    const candidateName = processTitle 
      ? processTitle.split(' - ')[0] || 'Candidate Name'
      : 'Candidate Name';
    
    const generated = generateLetterFromTemplate(template, {
      recommenderName: formData.recommenderName || '',
      recommenderTitle: formData.recommenderTitle || '',
      recommenderOrg: formData.recommenderOrg || '',
      candidateName,
      sections: sectionContents,
    });

    setValue('content', generated);
  };

  const onSubmit = async (data: CreateLetterInput | UpdateLetterInput) => {
    setSaving(true);
    setError(null);

    try {
      const url = letterId ? `/api/letters/${letterId}` : '/api/letters';
      const method = letterId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save letter');
      }

      const result = await response.json();
      onSave?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setSaving(false);
    }
  };

  const templates = getAllLetterTemplates();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isEditing ? 'Edit Recommendation Letter' : 'Create Recommendation Letter'}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? 'Update the recommendation letter details'
              : 'Create a new recommendation letter for your EB-1A petition'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          {!isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Letter Template</label>
              <Select value={templateType} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tmpl) => (
                    <SelectItem key={tmpl.id} value={tmpl.id}>
                      {tmpl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {template && (
                <p className="text-sm text-muted-foreground">{template.description}</p>
              )}
            </div>
          )}

          {/* Recommender Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Recommender Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('recommenderName')}
                placeholder="Dr. John Smith"
              />
              {errors.recommenderName && (
                <p className="text-sm text-red-500">{errors.recommenderName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Recommender Title <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('recommenderTitle')}
                placeholder="Professor of Computer Science"
              />
              {errors.recommenderTitle && (
                <p className="text-sm text-red-500">{errors.recommenderTitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <Input
                {...register('recommenderOrg')}
                placeholder="Stanford University"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                {...register('recommenderEmail')}
                placeholder="john.smith@university.edu"
              />
              {errors.recommenderEmail && (
                <p className="text-sm text-red-500">{errors.recommenderEmail.message}</p>
              )}
            </div>
          </div>

          {/* Template Sections (only for new letters) */}
          {!isEditing && template && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Letter Sections</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateFromTemplate}
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Generate from Template
                </Button>
              </div>

              {template.sections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">{section.title}</label>
                    {section.required && <span className="text-red-500">*</span>}
                  </div>
                  <Textarea
                    placeholder={section.placeholder}
                    value={sectionContents[section.id] || ''}
                    onChange={(e) => handleSectionChange(section.id, e.target.value)}
                    rows={4}
                    className="font-mono text-sm"
                  />
                  {section.guidelines && section.guidelines.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <strong>Guidelines:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {section.guidelines.map((guideline, idx) => (
                          <li key={idx}>{guideline}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Letter Content</label>
            <Textarea
              {...register('content')}
              placeholder="Enter the full letter content here..."
              rows={20}
              className="font-mono text-sm"
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status || 'draft'}
              onValueChange={(value) => setValue('status', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? 'Update Letter' : 'Create Letter'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

