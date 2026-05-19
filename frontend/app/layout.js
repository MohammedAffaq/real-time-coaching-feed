import "./globals.css";

import SocketProvider from "../components/SocketProvider";

export const metadata = {
  title: "Coaching Feed",
  description: "Real Time Feed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}