'use client'
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/'; // Mặc định về home nếu không có redirect

  const handleLogin = async () => {
    document.cookie = "auth-token=your_secret_token; path=/";
    router.push(redirectTo);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login to continue</button>
    </div>
  );
}
