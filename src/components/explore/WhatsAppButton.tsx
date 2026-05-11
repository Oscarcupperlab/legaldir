import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phone: string;
  lawyerName: string;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
}

export function WhatsAppButton({ phone, lawyerName, size = "sm", className }: WhatsAppButtonProps) {
  const clean = phone.replace(/[^0-9+]/g, "");
  const msg = encodeURIComponent(`Hola ${lawyerName}, me gustaría consultar sobre un caso legal.`);
  const url = `https://wa.me/${clean}?text=${msg}`;

  return (
    <Button
      size={size}
      className={cn("bg-[#25D366] hover:bg-[#1da851] text-white", className)}
      asChild
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-3.5 w-3.5" />
        WhatsApp
      </a>
    </Button>
  );
}
