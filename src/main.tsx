import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./assets/styles.css"
import { ThemeProvider } from "./assets/types/components/theme-provider.tsx"
import { BrowserRouter } from "react-router-dom" // ⬅️ toto pridaj

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ⬅️ obalíme aplikáciu */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
