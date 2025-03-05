import AuthGuard from "@/components/auth/Authguard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
        {children}
    </AuthGuard>
  );
}
