import { Inter } from "next/font/google";
import ReactQueryProvider from "../utils/ReactQueryProvider";
import './globals.css'
import { AuthProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
        <AuthProvider>
          <main>{children}</main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}