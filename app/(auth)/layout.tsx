import { ModeToggle } from "@/components/mode-toggle";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="absolute w-full p-4 lg:p-10 flex justify-end">
        <ModeToggle />
      </header>
      <main className="w-dvw h-dvh ">{children}</main>
    </>
  );
};

export default layout;
