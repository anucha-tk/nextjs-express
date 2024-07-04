import Nav from "../components/navbar/Nav";
import StoreProvider from "./StoreProvider";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
