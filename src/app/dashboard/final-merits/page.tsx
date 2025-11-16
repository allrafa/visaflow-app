import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { prisma } from '@/lib/db/client';
import { FinalMeritsPageClient } from '@/components/final-merits/FinalMeritsPageClient';

export default async function FinalMeritsPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Fetch all processes with their criteria evidence
  const processes = await prisma.process.findMany({
    where: { userId: user.id },
    include: {
      criteria: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Final Merits Statement
          </h1>
          <p className="mt-2 text-gray-600">
            Generate your comprehensive I-140 petition document
          </p>
        </div>

        {/* Final Merits Content */}
        <FinalMeritsPageClient processes={processes} />
      </div>
    </div>
  );
}
