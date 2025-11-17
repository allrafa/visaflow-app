'use client';

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
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'signed':
        return { label: 'Signed', color: 'text-purple-3', bgColor: 'bg-purple-muted' };
      case 'final':
        return { label: 'Final', color: 'text-purple-1', bgColor: 'bg-purple-muted' };
      case 'review':
        return { label: 'Review', color: 'text-purple-2', bgColor: 'bg-purple-muted' };
      default:
        return { label: 'Draft', color: 'text-muted-foreground', bgColor: 'bg-muted' };
    }
  };

  const statusConfig = getStatusConfig(letter.status);

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

Status: ${statusConfig.label}
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
    <div className="card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="icon-container rounded-lg p-2 bg-purple-muted">
              <FileText className="h-5 w-5 text-purple-1" />
            </div>
            <div>
              <h3 className="text-title font-semibold">{letter.recommenderName}</h3>
              <p className="text-body text-muted-foreground mt-0.5">
                {letter.recommenderTitle}
                {letter.recommenderOrg && ` • ${letter.recommenderOrg}`}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-3 py-1.5 rounded-full ${statusConfig.bgColor}`}>
          <span className={`text-small font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Email */}
      {letter.recommenderEmail && (
        <div className="flex items-center gap-2 text-body text-muted-foreground">
          <div className="icon-container">
            <Mail className="h-4 w-4 text-purple-2" />
          </div>
          <span>{letter.recommenderEmail}</span>
        </div>
      )}

      {/* Content */}
      {letter.content ? (
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <pre className="whitespace-pre-wrap text-body font-mono max-h-96 overflow-y-auto">
            {letter.content}
          </pre>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-body text-muted-foreground">No content yet. Click Edit to add letter content.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <button
          onClick={handleExport}
          className="btn-secondary flex-1 gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
        {onEdit && (
          <button
            onClick={onEdit}
            className="icon-container px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors gap-2 flex items-center"
          >
            <Edit className="h-4 w-4 text-purple-1" />
            <span className="text-body font-medium">Edit</span>
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="icon-container px-4 py-2 rounded-lg border border-destructive hover:bg-destructive-muted transition-colors gap-2 flex items-center"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="text-body font-medium text-destructive">Delete</span>
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="text-small text-muted-foreground">
        Created: {new Date(letter.createdAt).toLocaleDateString()} • Updated:{' '}
        {new Date(letter.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}

