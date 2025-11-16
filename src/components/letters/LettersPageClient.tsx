'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, User, Building, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Letter {
  id: string;
  processId: string;
  recommenderName: string;
  recommenderTitle: string;
  recommenderOrg: string | null;
  recommenderEmail: string | null;
  content: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Process {
  id: string;
  title: string;
  letters: Letter[];
}

interface LettersPageClientProps {
  processes: Process[];
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  review: 'bg-yellow-100 text-yellow-700',
  final: 'bg-blue-100 text-blue-700',
  signed: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  review: 'In Review',
  final: 'Final',
  signed: 'Signed',
};

export function LettersPageClient({ processes }: LettersPageClientProps) {
  const [selectedProcess, setSelectedProcess] = useState<string>('all');

  // Gather all letters from all processes
  const allLetters = processes.flatMap((process) =>
    process.letters.map((letter) => ({
      ...letter,
      processName: process.title,
    }))
  );

  // Filter letters by process
  const filteredLetters =
    selectedProcess === 'all'
      ? allLetters
      : allLetters.filter((letter) => letter.processId === selectedProcess);

  const stats = {
    total: allLetters.length,
    draft: allLetters.filter((l) => l.status === 'draft').length,
    review: allLetters.filter((l) => l.status === 'review').length,
    final: allLetters.filter((l) => l.status === 'final').length,
    signed: allLetters.filter((l) => l.status === 'signed').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="p-4">
          <p className="text-sm font-medium text-gray-600">Total Letters</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-gray-600">Draft</p>
          <p className="mt-1 text-3xl font-bold text-gray-700">{stats.draft}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-gray-600">In Review</p>
          <p className="mt-1 text-3xl font-bold text-yellow-600">{stats.review}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-gray-600">Final</p>
          <p className="mt-1 text-3xl font-bold text-blue-600">{stats.final}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-gray-600">Signed</p>
          <p className="mt-1 text-3xl font-bold text-green-600">{stats.signed}</p>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={selectedProcess} onValueChange={setSelectedProcess}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="All Processes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Processes</SelectItem>
                {processes.map((process) => (
                  <SelectItem key={process.id} value={process.id}>
                    {process.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Request New Letter
          </Button>
        </div>
      </Card>

      {/* Letters Grid */}
      {filteredLetters.length === 0 ? (
        <Card className="p-16 text-center">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No recommendation letters yet
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Start by requesting letters from your recommenders
          </p>
          <Button className="mt-6 gap-2">
            <Plus className="h-4 w-4" />
            Request First Letter
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLetters.map((letter) => (
            <Card key={letter.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">
                      {letter.recommenderName}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {letter.recommenderTitle}
                  </p>
                  {letter.recommenderOrg && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Building className="h-4 w-4" />
                      {letter.recommenderOrg}
                    </div>
                  )}
                </div>
                <Badge className={STATUS_COLORS[letter.status]}>
                  {STATUS_LABELS[letter.status]}
                </Badge>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Process: {letter.processName}
                </p>
                {letter.content && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <FileText className="h-3 w-3" />
                    Content available
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
