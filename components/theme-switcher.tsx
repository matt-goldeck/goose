"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Sun, Moon, Laptop } from "lucide-react";

export const ThemeSwitcher = () => {
  const menuRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ICON_SIZE = 16;

  const items = [
    {
      label: "Light",
      icon: <Sun size={ICON_SIZE} className="text-muted-foreground" />,
      command: () => setTheme("light"),
    },
    {
      label: "Dark",
      icon: <Moon size={ICON_SIZE} className="text-muted-foreground" />,
      command: () => setTheme("dark"),
    },
    {
      label: "System",
      icon: <Laptop size={ICON_SIZE} className="text-muted-foreground" />,
      command: () => setTheme("system"),
    },
  ];

  const currentIcon =
    theme === "light" ? (
      <Sun size={ICON_SIZE} className="text-muted-foreground" />
    ) : theme === "dark" ? (
      <Moon size={ICON_SIZE} className="text-muted-foreground" />
    ) : (
      <Laptop size={ICON_SIZE} className="text-muted-foreground" />
    );

  return (
    <div>
      <Menu model={items} popup ref={menuRef} />
      <Button
        icon={currentIcon}
        className="p-button-text p-button-sm"
        onClick={(e) => menuRef.current.toggle(e)}
      />
    </div>
  );
};