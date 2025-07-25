import Navbar from "@/components/Navbar";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";

export const metadata = {
  title: "Quiz App",
  description: "Bran Station",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
