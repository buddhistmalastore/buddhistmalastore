"use client";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  discount?: number;
}

export default function ProductPrice({
  price,
  oldPrice,
  discount,
}: ProductPriceProps) {
  const hasSale =
    oldPrice !== undefined &&
    oldPrice > price;

  return (
    <div className="flex items-end justify-between">
      <div className="flex items-center gap-3">
        {hasSale ? (
          <>
            <span
              className="
                text-[28px]
                font-semibold
                tracking-tight
                text-[#1F1A17]
              "
            >
              Rs. {price.toLocaleString()}
            </span>

            <span
              className="
                text-base
                text-[#9A948C]
                line-through
              "
            >
              Rs. {oldPrice.toLocaleString()}
            </span>
          </>
        ) : (
          <span
            className="
              text-[28px]
              font-semibold
              tracking-tight
              text-[#1F1A17]
            "
          >
            Rs. {price.toLocaleString()}
          </span>
        )}
      </div>

      {hasSale && (
        <span
          className="
            rounded-full
            bg-[#F6E7BF]
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-[1px]
            text-[#8A5A00]
          "
        >
          {discount ??
            Math.round(
              ((oldPrice - price) / oldPrice) * 100
            )}% OFF
        </span>
      )}
    </div>
  );
}
