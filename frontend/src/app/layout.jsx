import "./globals.css";

export const metadata = {
  title: "AuraWellness — Understand Team Sentiment. Support Your People.",
  description: "A private, intelligent space for employees to share reflections, track emotional well-being, and build healthier workplace habits.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
