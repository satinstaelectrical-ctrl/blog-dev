'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getAdminSession();
    if (session && (session.role === 'administrator' || session.role === 'editor')) {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#071426] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-black text-xl animate-bounce">
          O
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-[#EF4248] border-t-transparent animate-spin" />
        <p className="text-xs font-medium text-zinc-400 tracking-wide">
          Vérification sécurisée de la session administrateur...
        </p>
      </div>
    </div>
  );
}
