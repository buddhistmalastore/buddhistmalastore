"use client";

interface ProductPriceProps {
  price: number;
  salePrice?: number;
}

export default function ProductPrice({
  price,
  salePrice,
}: ProductPriceProps) {
  const hasSale =
    salePrice !== undefined &&
    salePrice < price;

  const discount = hasSale
    ? Math.round(((price - salePrice!) / price) * 100)
    : 0;

  return (
    <div className="flex items-end justify-between">

      <div className="flex items-center gap-3">

        {hasSale ? (
          <>
            {/* Sale Price */}

            <span
              className="
                text-[28px]
                font-semibold
                tracking-tight
                text-[#1F1A17]
              "
            >
              Rs. {salePrice.toLocaleString()}
            </span>

            {/* Original Price */}

            <span
              className="
                text-base
                text-[#9A948C]
                line-through
              "
            >
              Rs. {price.toLocaleString()}
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

      {/* Discount */}

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
          {discount}% OFF
        </span>
      )}
    </div>
  );
}