"use client";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterSidebarProps) {
  return (
    <aside
      className="
        w-full
        rounded-[28px]
        border
        border-[#ECE3D3]
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* Title */}

      <h3
        className="
          heading-font
          text-2xl
          text-[#1F1A17]
        "
      >
        Filters
      </h3>

      {/* Category */}

      <div className="mt-8">

        <h4
          className="
            mb-4
            text-sm
            font-semibold
            uppercase
            tracking-[3px]
            text-[#C79B2A]
          "
        >
          Category
        </h4>

        <div className="space-y-3">

          <button
            onClick={() => setSelectedCategory("")}
            className={`
              block
              w-full
              rounded-full
              px-4
              py-3
              text-left
              transition-all
              duration-300

              ${
                selectedCategory === ""
                  ? "bg-[#C79B2A] text-white"
                  : "bg-[#F8F5EF] hover:bg-[#EEE7D8]"
              }
            `}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                block
                w-full
                rounded-full
                px-4
                py-3
                text-left
                transition-all
                duration-300

                ${
                  selectedCategory === category
                    ? "bg-[#C79B2A] text-white"
                    : "bg-[#F8F5EF] hover:bg-[#EEE7D8]"
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>

      </div>

      {/* Availability */}

      <div className="mt-10">

        <h4
          className="
            mb-4
            text-sm
            font-semibold
            uppercase
            tracking-[3px]
            text-[#C79B2A]
          "
        >
          Availability
        </h4>

        <div className="space-y-3">

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" />
            <span>In Stock</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" />
            <span>Featured</span>
          </label>

        </div>

      </div>

    </aside>
  );
}