import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Shield,
  Clock,
  TrendingUp,
  Users,
  FileCheck,
  Brain,
  Zap,
  Star,
  FileText,
  FolderOpen,
  AlertCircle,
  CheckSquare,
  X,
  Folder,
  Calendar,
  BarChart3
} from 'lucide-react';

export default async function Home() {
  // Check if user is authenticated
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // If authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  // Landing page for non-authenticated users
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-white font-bold text-lg shadow-lg shadow-purple-500/30">
                VF
              </div>
              <span className="text-xl font-bold text-gray-900">VisaFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/signup">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm border border-purple-200">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">AI-Powered EB-1A Management System</span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
              <span className="text-gray-900">Transform Chaos Into</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent">
                Organized Success
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stop drowning in documents and deadlines. VisaFlow organizes your entire EB-1A petition process,
              <span className="font-semibold text-gray-900"> reduces stress</span>, and <span className="font-semibold text-gray-900">saves you $5K-$15K</span> in legal fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/signup">
                <button className="group bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 hover:scale-105 w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 w-full sm:w-auto shadow-sm">
                  Sign In
                </button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-700">13 Real Cases Validated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-700">9 Approvals Documented</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-gray-700">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution - Clean Minimal Design */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              The EB-1A Process: <span className="text-gray-400">Before</span> vs <span className="text-purple-400">After</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Managing hundreds of documents across 10 criteria without organization leads to stress, missed deadlines, and costly mistakes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* WITHOUT VisaFlow - Chaos */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 bg-gray-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                WITHOUT VisaFlow
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-8 h-full">
                <div className="flex items-start gap-3 mb-6">
                  <AlertCircle className="h-8 w-8 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Overwhelming Chaos</h3>
                    <p className="text-gray-400">Documents scattered everywhere, no clear roadmap</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Simulated messy document cards - gray/minimal */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 transform -rotate-1">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">evidence_final_FINAL_v3.pdf</div>
                        <div className="text-xs text-gray-500">Where does this go? 🤔</div>
                      </div>
                      <X className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 transform rotate-1">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">letter_recommendation.docx</div>
                        <div className="text-xs text-gray-500">Missing information ❌</div>
                      </div>
                      <X className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 transform -rotate-2">
                    <div className="flex items-center gap-3">
                      <Folder className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">Old_files_backup/</div>
                        <div className="text-xs text-gray-500">Multiple versions everywhere 😰</div>
                      </div>
                      <X className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 space-y-2">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-gray-500" />
                        <span>No idea what&apos;s missing for each criterion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-gray-500" />
                        <span>Deadlines constantly missed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-gray-500" />
                        <span>Stress levels through the roof</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-gray-500" />
                        <span>Hours wasted searching for files</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-300 font-semibold">High Risk of RFE or Rejection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WITH VisaFlow - Organization */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                WITH VisaFlow
              </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-purple-900/20 backdrop-blur-sm rounded-2xl border-2 border-purple-500/30 p-8 h-full">
                <div className="flex items-start gap-3 mb-6">
                  <CheckSquare className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">Complete Organization</h3>
                    <p className="text-gray-400">Everything in its place, clear path forward</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Organized task cards - purple accents */}
                  <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">Eligibility Phase</div>
                        <div className="text-xs text-gray-400">8/10 criteria validated ✓</div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">Evidence Collection</div>
                        <div className="text-xs text-gray-400">AI-validated, properly categorized ✓</div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">Letters Management</div>
                        <div className="text-xs text-gray-400">5/7 letters completed ⏳</div>
                      </div>
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-sm text-gray-300 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Every document automatically organized</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>AI flags missing evidence instantly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Timeline keeps you on track</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Stress-free, step-by-step guidance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    <span className="text-purple-300 font-semibold">93% Quality Score - Ready to File</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats comparison - minimal colors */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <span className="text-gray-500">40+ hrs</span>
                <span className="text-gray-600 mx-2">→</span>
                <span className="text-purple-400">2 hrs</span>
              </div>
              <div className="text-gray-400 text-sm">Time spent organizing documents</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <span className="text-gray-500">78%</span>
                <span className="text-gray-600 mx-2">→</span>
                <span className="text-purple-400">8%</span>
              </div>
              <div className="text-gray-400 text-sm">Stress level during process</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <span className="text-gray-500">23%</span>
                <span className="text-gray-600 mx-2">→</span>
                <span className="text-purple-400">93%</span>
              </div>
              <div className="text-gray-400 text-sm">Petition quality score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$5K-$15K</div>
              <div className="text-sm font-medium text-gray-600">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">300 Days</div>
              <div className="text-sm font-medium text-gray-600">Organized Timeline</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10 Criteria</div>
              <div className="text-sm font-medium text-gray-600">All Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">AI-Powered</div>
              <div className="text-sm font-medium text-gray-600">Smart Validation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Everything You Need, Organized</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stop drowning in paperwork. Let VisaFlow organize, validate, and guide you through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <FolderOpen className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Organization</h3>
              <p className="text-gray-600 leading-relaxed">
                Every document automatically categorized by criterion. No more hunting through folders or email attachments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Brain className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Validation</h3>
              <p className="text-gray-600 leading-relaxed">
                Claude AI analyzes your evidence against 13 real cases, instantly flagging weak spots before submission.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Calendar className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Timeline</h3>
              <p className="text-gray-600 leading-relaxed">
                300-day roadmap breaks down the overwhelming process into manageable daily tasks. Never miss a deadline.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Target className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10 Criteria Tracker</h3>
              <p className="text-gray-600 leading-relaxed">
                Visual dashboard shows exactly what you have and what&apos;s missing for each EB-1A criterion.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Shield className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">RFE Prevention</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from 4 documented RFEs. The system catches common mistakes before USCIS does.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <BarChart3 className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Score</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time 0-100 score tells you exactly how strong your petition is and what to improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">From Chaos to Approval in 4 Phases</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A clear, organized path from eligibility check to successful filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative group">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600 text-white font-bold text-3xl mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Eligibility Check</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI analyzes your profile against all 10 criteria. Know your chances before starting.
                </p>
              </div>
              <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-300 to-transparent" />
            </div>

            <div className="relative group">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600 text-white font-bold text-3xl mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Organize Evidence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload once, VisaFlow categorizes automatically. AI validates strength in real-time.
                </p>
              </div>
              <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-300 to-transparent" />
            </div>

            <div className="relative group">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600 text-white font-bold text-3xl mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Build Petition</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional templates + AI assistance. Draft your strongest case efficiently.
                </p>
              </div>
              <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-300 to-transparent" />
            </div>

            <div className="group">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600 text-white font-bold text-3xl mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">File with Confidence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Final AI review, quality check, and export. Submit knowing you did it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Built for Both Paths</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re going DIY or working with attorneys, VisaFlow keeps everything organized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-10 border border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
              <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">DIY Applicants</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Build a professional-quality petition without the stress. Save $5K-$15K and maintain full control.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Document chaos eliminated instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">AI catches mistakes before submission</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Step-by-step guidance reduces stress</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Always know what&apos;s needed next</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
              <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Law Firms & Attorneys</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Manage multiple cases efficiently. Focus on strategy while VisaFlow handles organization.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Multi-case dashboard view</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Client portal for easy collaboration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Automated document tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Time-saving workflow automation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            <span>Stop struggling with document chaos today</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl mx-auto">
            Ready to Transform Your EB-1A Journey?
          </h2>
          <p className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join hundreds of successful applicants who organized their way to approval.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="group bg-white text-purple-600 hover:bg-gray-50 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl hover:shadow-3xl hover:scale-105 w-full sm:w-auto">
                Start Organizing Now
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="bg-transparent hover:bg-white/10 text-white px-10 py-5 rounded-xl text-lg font-bold border-2 border-white/30 hover:border-white/50 transition-all duration-200 w-full sm:w-auto backdrop-blur-sm">
                Sign In
              </button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-white font-bold text-lg shadow-lg shadow-purple-500/30">
                VF
              </div>
              <span className="text-lg font-bold text-gray-900">VisaFlow</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
              <span>© 2025 VisaFlow. All rights reserved.</span>
              <span className="hidden sm:block">•</span>
              <span>Built with Next.js, Supabase & Claude AI</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
