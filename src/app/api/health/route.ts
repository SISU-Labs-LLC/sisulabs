// app/api/health/route.ts — R54 IETF-shape health check (SisuLabs.llc)
// No DB (sisulabs has no Supabase project). Edge-compatible.
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';

export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'pass',
      version: '1',
      releaseId: process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown',
      serviceId: process.env.NEXT_PUBLIC_APP_NAME ?? 'sisulabs',
      time: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/health+json; charset=utf-8',
        'cache-control': 'no-store',
      },
    },
  );
}
