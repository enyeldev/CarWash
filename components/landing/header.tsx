"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Droplets, Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";

const navLinks = [
  { href: "#features", label: "Características" },
  { href: "#funciones", label: "Funciones" },
  { href: "#pricing", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 dark:bg-background/95 bg-zinc-50 ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold dark:text-foreground text-background">
            WashPro
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors dark:hover:bg-muted hover:bg-accent dark:hover:text-foreground hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login" className="text-muted-foreground ">
              Iniciar sesión
            </Link>
          </Button>
          <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white">
            <Link href="/signup">Comenzar gratis</Link>
          </Button>
          <ModeToggle />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button
                asChild
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Link href="/signup">Comenzar gratis</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
