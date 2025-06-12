import type { Metadata } from "next"
import LayoutDashboard from "@/components/layout/dashboard"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDashboard>
      {children}
    </LayoutDashboard>
  );
}
