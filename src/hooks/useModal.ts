import { usePathname, useRouter, useSearchParams } from "next/navigation";

type useModalProps = {
  query?: string;
};

export function useModal({ query }: useModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const queryUrl = queryParams.get(query || "");
  const isOpen = queryUrl ? true : false;

  const onClose = () => router.push(`${pathname}`);

  return { isOpen, queryUrl, onClose };
}
