import React from "react";

const ColorTokensDemo: React.FC = () => {
    const tokens = [
        { name: "--background", bg: "var(--background)", text: "var(--foreground)" },
        { name: "--card", bg: "var(--card)", text: "var(--card-foreground)" },
        { name: "--primary", bg: "var(--primary)", text: "var(--primary-foreground)" },
        { name: "--secondary", bg: "var(--secondary)", text: "var(--secondary-foreground)" },
        { name: "--muted", bg: "var(--muted)", text: "var(--muted-foreground)" },
        { name: "--accent", bg: "var(--accent)", text: "var(--accent-foreground)" },
        { name: "--destructive", bg: "var(--destructive)", text: "white" },
        { name: "--sidebar", bg: "var(--sidebar)", text: "var(--sidebar-foreground)" },
        { name: "--sidebar-primary", bg: "var(--sidebar-primary)", text: "var(--sidebar-primary-foreground)" },
        { name: "--sidebar-accent", bg: "var(--sidebar-accent)", text: "var(--sidebar-accent-foreground)" },
    ];

    return (
        <div className="bg-[oklch(var(--background))] text-[oklch(var(--foreground))] p-8 font-sans min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Color Tokens Demo</h1>
        <div className="grid grid-cols-1 gap-2 max-w-md">
            {tokens.map((token) => (
            <div
                key={token.name}
                className="flex justify-between items-center px-4 py-2 rounded text-sm mb-1 border"
                style={{ backgroundColor: token.bg, color: token.text }}
            >
                {token.name}
            </div>
            ))}
        </div>
        </div>
    );
};

export default ColorTokensDemo;
