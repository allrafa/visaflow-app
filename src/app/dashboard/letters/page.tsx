import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { prisma } from '@/lib/db/client';
import { LettersPageClient } from '@/components/letters/LettersPageClient';

export default async function LettersPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Fetch all processes with their letters
  const processes = await prisma.process.findMany({
    where: { userId: user.id },
    include: {
      letters: {
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
            Recommendation Letters
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and track recommendation letters for your EB-1A petition
          </p>
        </div>

        {/* Letters Content */}
        <LettersPageClient processes={processes} />
      </div>
    </div>
  );
}
