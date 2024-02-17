import { Logo } from "./logo";
import { ColorModeToggle } from "./color-mode-toggle";
import { MenuSelector } from "./menu-selector";

export function BeAheroHeader() {
  return (
    <div className="w-full backdrop-blur-md py-2 px-8 fixed top-0 left-0 flex justify-between">
      <Logo />
      <div>
        <ColorModeToggle />
        <MenuSelector />
      </div>
    </div>
  );
}
