'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { LetterEditor } from '@/components/letters/LetterEditor';
import { LetterPreview } from '@/components/letters/LetterPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ArrowLeft, Plus, FileText } from 'lucide-react';
import Link from 'next/link';

export default function LettersPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const processId = params.processId as string;
  const edit = searchParams.get('edit');
  const isNew = searchParams.get('new') === 'true';

  const [letters, setLetters] = useState<any[]>([]);
  const [process, setProcess] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load process
        const processRes = await fetch(`/api/processes/${processId}`);
        if (processRes.ok) {
          const processData = await processRes.json();
          setProcess(processData);
        }

        // Load letters
        const lettersRes = await fetch(`/api/letters?processId=${processId}`);
        if (lettersRes.ok) {
          const lettersData = await lettersRes.json();
          setLetters(lettersData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (processId) {
      loadData();
    }
  }, [processId]);

  const editingLetter = edit ? letters.find((l) => l.id === edit) : null;

  const handleSave = () => {
    router.push(`/dashboard/letters/${processId}`);
    router.refresh();
  };

  const handleDelete = async (letterId: string) => {
    if (confirm('Are you sure you want to delete this letter?')) {
      try {
        const response = await fetch(`/api/letters/${letterId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLetters(letters.filter((l) => l.id !== letterId));
        }
      } catch (error) {
        alert('Failed to delete letter');
      }
    }
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center p-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/process/${processId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Recommendation Letters</h1>
          <p className="text-muted-foreground">
            Manage recommendation letters for {process?.title || 'Process'}
          </p>
        </div>
        {!isNew && !edit && (
          <Link href={`/dashboard/letters/${processId}?new=true`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Letter
            </Button>
          </Link>
        )}
      </div>

      {(isNew || edit) && (
        <LetterEditor
          processId={processId}
          processTitle={process?.title}
          letterId={editingLetter?.id}
          initialData={editingLetter ? {
            recommenderName: editingLetter.recommenderName,
            recommenderTitle: editingLetter.recommenderTitle,
            recommenderOrg: editingLetter.recommenderOrg || undefined,
            recommenderEmail: editingLetter.recommenderEmail || undefined,
            content: editingLetter.content || undefined,
            status: editingLetter.status,
          } : undefined}
          onSave={handleSave}
        />
      )}

      {!isNew && !edit && (
        <div className="space-y-6">
          {letters.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Letters Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first recommendation letter to strengthen your EB-1A petition.
                  </p>
                  <Link href={`/dashboard/letters/${processId}?new=true`}>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Letter
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {letters.map((letter) => (
                <LetterPreview
                  key={letter.id}
                  letter={letter}
                  onEdit={() => {
                    router.push(`/dashboard/letters/${processId}?edit=${letter.id}`);
                  }}
                  onDelete={() => handleDelete(letter.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

