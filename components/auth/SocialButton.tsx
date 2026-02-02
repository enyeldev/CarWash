import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type SocialButtonProps = {
  onClikcFunc: () => Promise<void>;
  text: string;
};

const SocialButton = ({ onClikcFunc, text }: SocialButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClikc = async () => {
    setIsLoading(true);
    await onClikcFunc();
    // setIsLoading(false);
  };

  return (
    <Button
      variant={"outline"}
      type="button"
      className="w-full h-12 text-base font-medium border-border hover:bg-accent bg-transparent cursor-pointer"
      onClick={handleClikc}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin size-6" />
      ) : (
        <>
          <Image
            alt="Google Icon"
            src="/google-icon.svg"
            width={18}
            height={18}
          />
          <p className="text-black dark:text-zinc-50 ">{text}</p>
        </>
      )}
    </Button>
  );
};

export default SocialButton;
