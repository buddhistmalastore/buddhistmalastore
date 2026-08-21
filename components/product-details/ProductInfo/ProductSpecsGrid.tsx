"use client";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductSpecsGrid({
  product,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#E8DDCC] bg-white p-5 shadow-sm">

      <div className="grid grid-cols-3 gap-x-8 gap-y-6">

        <Spec
          title="SKU"
          value={product.sku}
        />

        <Spec
          title="Material"
          value={product.material}
        />

        <Spec
          title="Origin"
          value={product.origin}
        />

        <Spec
          title="Weight"
          value={product.weight}
        />

        <Spec
          title="Bead Size"
          value={product.beadSize}
        />

        <Spec
          title="Bead Count"
          value={String(product.beadCount)}
        />

        <Spec
          title="Chakra"
          value={product.chakra}
        />

        <Spec
          title="Purpose"
          value={product.purpose?.join(", ")}
        />

        <Spec
          title="Element"
          value={product.element}
        />

      </div>

    </div>
  );
}

function Spec({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {

  if (!value) return <div />;

  return (
    <div>

      <div className="text-[11px] uppercase tracking-[1.5px] text-[#999] font-medium">
        {title}
      </div>

      <div className="mt-1 text-[15px] font-semibold text-[#222] leading-6">
        {value}
      </div>

    </div>
  );
}