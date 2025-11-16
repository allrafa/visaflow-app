import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessById } from '@/lib/services/processService';
import { getCriteriaByProcessId } from '@/lib/services/criteriaService';
import { FinalMeritsGenerator } from '@/components/criteria/FinalMeritsGenerator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function FinalMeritsPage({
  params,
}: {
  params: Promise<{ processId: string }>;
}) {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  const { processId } = await params;
  let process;
  try {
    process = await getProcessById(processId, user.id);
  } catch {
    redirect('/dashboard');
  }

  // Buscar critérios para contar quantos existem
  const criteria = await getCriteriaByProcessId(processId);

  return (
    <div className="container space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/process/${processId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Final Merits Generator</h1>
          <p className="text-muted-foreground">
            Generate comprehensive Final Merits Statement for {process.title}
          </p>
        </div>
      </div>

      <FinalMeritsGenerator
        processId={processId}
        processTitle={process.title}
        criteriaCount={criteria.length}
      />
    </div>
  );
}



