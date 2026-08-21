import { Product } from "@/types/product";

export interface QuickViewModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}