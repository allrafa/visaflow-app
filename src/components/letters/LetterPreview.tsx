'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Edit, Trash2, Mail, FileText } from 'lucide-react';

interface LetterPreviewProps {
  letter: {
    id: string;
    recommenderName: string;
    recommenderTitle: string;
    recommenderOrg?: string | null;
    recommenderEmail?: string | null;
    content?: string | null;
    status: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function LetterPreview({ letter, onEdit, onDelete }: LetterPreviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'bg-green-500';
      case 'final':
        return 'bg-blue-500';
      case 'review':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'signed':
        return 'Signed';
      case 'final':
        return 'Final';
      case 'review':
        return 'Review';
      default:
        return 'Draft';
    }
  };

  const handleExport = () => {
    if (!letter.content) return;

    const documentText = `RECOMMENDATION LETTER

${letter.recommenderOrg ? `${letter.recommenderOrg}\n` : ''}${letter.recommenderName}
${letter.recommenderTitle}
${letter.recommenderOrg ? `${letter.recommenderOrg}\n` : ''}
${letter.recommenderEmail ? `Email: ${letter.recommenderEmail}\n` : ''}

${new Date(letter.createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}

---

${letter.content}

---

Status: ${getStatusLabel(letter.status)}
Created: ${new Date(letter.createdAt).toLocaleDateString()}
Updated: ${new Date(letter.updatedAt).toLocaleDateString()}
`;

    const blob = new Blob([documentText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Recommendation-Letter-${letter.recommenderName.replace(/\s+/g, '-')}-${letter.id.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {letter.recommenderName}
            </CardTitle>
            <CardDescription className="mt-1">
              {letter.recommenderTitle}
              {letter.recommenderOrg && ` • ${letter.recommenderOrg}`}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(letter.status)}>
            {getStatusLabel(letter.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {letter.recommenderEmail && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{letter.recommenderEmail}</span>
          </div>
        )}

        {letter.content ? (
          <div className="rounded-lg border bg-muted/30 p-4">
            <pre className="whitespace-pre-wrap text-sm font-mono max-h-96 overflow-y-auto">
              {letter.content}
            </pre>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p>No content yet. Click Edit to add letter content.</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" size="sm" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button onClick={onDelete} variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          Created: {new Date(letter.createdAt).toLocaleDateString()} • Updated:{' '}
          {new Date(letter.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}

