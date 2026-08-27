const WORDPRESS_URL =
  process.env.WORDPRESS_URL;

const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;

const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

/* =========================================================
   ENVIRONMENT VALIDATION
========================================================= */

if (
  !WORDPRESS_URL ||
  !WOOCOMMERCE_CONSUMER_KEY ||
  !WOOCOMMERCE_CONSUMER_SECRET
) {
  throw new Error(
    "WooCommerce environment variables are missing."
  );
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function getWooCommerceAuth() {
  return Buffer.from(
    `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
  ).toString("base64");
}

/* =========================================================
   GET PRODUCTS
========================================================= */

export async function getWooCommerceProducts() {
  const credentials =
    getWooCommerceAuth();

  const url =
    `${WORDPRESS_URL}/wp-json/wc/v3/products` +
    `?status=publish` +
    `&per_page=24` +
    `&orderby=date` +
    `&order=desc`;

  const response =
    await fetch(url, {
      headers: {
        Authorization:
          `Basic ${credentials}`,

        Accept:
          "application/json",
      },

      /*
       * Product cache:
       * 60 seconds
       */
      next: {
        revalidate: 60,
      },
    });

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "WooCommerce products API error:",
      response.status,
      response.statusText,
      errorText
    );

    throw new Error(
      `WooCommerce API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}


/* =========================================================
   SEARCH PRODUCTS
========================================================= */

export async function searchWooCommerceProducts(
  search: string
) {
  const query = search
    .trim()
    .toLowerCase();

  if (!query) {
    return [];
  }

  /*
   * Use the same WooCommerce product
   * request that already works for the Shop.
   */

  const products =
    await getWooCommerceProducts();

  /*
   * Search across the actual WooCommerce
   * product data.
   */

  const results =
    products.filter(
      (product: any) => {
        const name =
          String(
            product.name ?? ""
          ).toLowerCase();

        const sku =
          String(
            product.sku ?? ""
          ).toLowerCase();

        const slug =
          String(
            product.slug ?? ""
          ).toLowerCase();

        const description =
          String(
            product.description ?? ""
          ).toLowerCase();

        const shortDescription =
          String(
            product.short_description ??
              ""
          ).toLowerCase();

        const categories =
          Array.isArray(
            product.categories
          )
            ? product.categories
                .map(
                  (category: any) =>
                    String(
                      category.name ??
                        ""
                    ).toLowerCase()
                )
                .join(" ")
            : "";

        return (
          name.includes(query) ||
          sku.includes(query) ||
          slug.includes(query) ||
          categories.includes(query) ||
          description.includes(query) ||
          shortDescription.includes(query)
        );
      }
    );

  /*
   * Keep the search drawer lightweight.
   */

  return results.slice(0, 8);
}

/* =========================================================
   ORDER TYPES
========================================================= */

export interface WooCommerceOrderLineItem {
  product_id: number;

  quantity: number;
}

export interface WooCommerceAddress {
  first_name: string;

  last_name: string;

  email?: string;

  phone?: string;

  address_1: string;

  address_2?: string;

  city: string;

  state: string;

  postcode: string;

  country: string;
}

export interface WooCommerceMetaData {
  key: string;

  value: string;
}

export interface CreateWooCommerceOrderInput {
  payment_method: string;

  payment_method_title: string;

  set_paid: boolean;

  billing: WooCommerceAddress;

  shipping: {
    first_name: string;

    last_name: string;

    address_1: string;

    address_2?: string;

    city: string;

    state: string;

    postcode: string;

    country: string;
  };

  line_items: WooCommerceOrderLineItem[];

  customer_note?: string;

  meta_data?: WooCommerceMetaData[];
}

/* =========================================================
   CREATE WOOCOMMERCE ORDER
========================================================= */

export async function createWooCommerceOrder(
  order: CreateWooCommerceOrderInput
) {
  const credentials =
    getWooCommerceAuth();

  const response =
    await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/orders`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Basic ${credentials}`,

          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body:
          JSON.stringify(order),

        cache: "no-store",
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "WooCommerce order creation error:",
      response.status,
      response.statusText,
      errorText
    );

    throw new Error(
      `WooCommerce order creation failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/* =========================================================
   SEARCH ALL PRODUCTS
========================================================= */

export async function searchAllWooCommerceProducts(
  search: string
) {
  const query = search.trim().toLowerCase();

  if (!query) {
    return [];
  }

  const credentials =
    getWooCommerceAuth();

  const allProducts: any[] = [];

  let page = 1;

  const perPage = 100;

  /*
   * WooCommerce allows up to 100 products
   * per request.
   *
   * Continue requesting pages until there
   * are no more products.
   */

  while (true) {
    const url =
      `${WORDPRESS_URL}/wp-json/wc/v3/products` +
      `?status=publish` +
      `&per_page=${perPage}` +
      `&page=${page}` +
      `&orderby=date` +
      `&order=desc`;

    const response =
      await fetch(url, {
        headers: {
          Authorization:
            `Basic ${credentials}`,

          Accept:
            "application/json",
        },

        next: {
          revalidate: 60,
        },
      });

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "WooCommerce search products error:",
        response.status,
        response.statusText,
        errorText
      );

      throw new Error(
        `WooCommerce search failed: ${response.status}`
      );
    }

    const products =
      await response.json();

    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {
      break;
    }

    allProducts.push(
      ...products
    );

    if (
      products.length < perPage
    ) {
      break;
    }

    page++;

    /*
     * Safety limit.
     * Prevent an accidental infinite loop.
     */

    if (page > 20) {
      break;
    }
  }

  /*
   * Search the complete product list.
   */

  const results =
    allProducts.filter(
      (product: any) => {
        const name =
          String(
            product.name ?? ""
          ).toLowerCase();

        const sku =
          String(
            product.sku ?? ""
          ).toLowerCase();

        const slug =
          String(
            product.slug ?? ""
          ).toLowerCase();

        const description =
          String(
            product.description ?? ""
          ).toLowerCase();

        const shortDescription =
          String(
            product.short_description ?? ""
          ).toLowerCase();

        const categories =
          Array.isArray(
            product.categories
          )
            ? product.categories
                .map(
                  (category: any) =>
                    String(
                      category.name ?? ""
                    ).toLowerCase()
                )
                .join(" ")
            : "";

        return (
          name.includes(query) ||
          sku.includes(query) ||
          slug.includes(query) ||
          categories.includes(query) ||
          description.includes(query) ||
          shortDescription.includes(query)
        );
      }
    );

  return results.slice(0, 8);
}

/* =========================================================
   GET BEST SELLING PRODUCTS
========================================================= */

export async function getWooCommerceBestSellers() {
  const credentials = getWooCommerceAuth();

  const url =
    `${WORDPRESS_URL}/wp-json/wc/v3/products` +
    `?status=publish` +
    `&per_page=8` +
    `&orderby=popularity` +
    `&order=desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      Accept: "application/json",
    },

    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "WooCommerce best sellers API error:",
      response.status,
      response.statusText,
      errorText
    );

    throw new Error(
      `WooCommerce best sellers API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/* =========================================================
   SMART PRODUCT SEARCH FOR AI
========================================================= */

export async function searchWooCommerceProductsForAI(
  search: string
) {
  const query =
    search
      .trim()
      .toLowerCase();

  if (!query) {
    return [];
  }

  const credentials =
    getWooCommerceAuth();

  const allProducts: any[] = [];

  let page = 1;

  const perPage = 100;

  /* =======================================================
     LOAD ALL PRODUCTS
  ======================================================= */

  while (true) {
    const url =
      `${WORDPRESS_URL}/wp-json/wc/v3/products` +
      `?status=publish` +
      `&per_page=${perPage}` +
      `&page=${page}` +
      `&orderby=date` +
      `&order=desc`;

    const response =
      await fetch(url, {
        headers: {
          Authorization:
            `Basic ${credentials}`,

          Accept:
            "application/json",
        },

        next: {
          revalidate: 60,
        },
      });

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "WooCommerce AI search error:",
        response.status,
        errorText
      );

      throw new Error(
        `WooCommerce AI search failed: ${response.status}`
      );
    }

    const products =
      await response.json();

    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {
      break;
    }

    allProducts.push(
      ...products
    );

    if (
      products.length <
      perPage
    ) {
      break;
    }

    page++;

    if (page > 20) {
      break;
    }
  }

  /* =======================================================
     NORMALIZE SEARCH
  ======================================================= */

  const normalizedQuery =
    query
      .replace(
        /millimeters?/g,
        "mm"
      )
      .replace(
        /\b(\d+)\s*mm\b/g,
        "$1mm"
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  /* =======================================================
     EXTRACT IMPORTANT SEARCH TERMS
  ======================================================= */

  const searchTerms =
    normalizedQuery
      .split(/\s+/)
      .map(
        (word) =>
          word
            .replace(
              /[^a-z0-9.-]/g,
              ""
            )
            .trim()
      )
      .filter(
        (word) =>
          word.length >= 2
      );

  /* =======================================================
     REMOVE COMMON QUESTION WORDS
  ======================================================= */

  const ignoredWords =
    new Set([
      "do",
      "you",
      "have",
      "any",
      "the",
      "some",
      "for",
      "me",
      "please",
      "show",
      "want",
      "looking",
      "find",
      "find",
      "is",
      "are",
      "there",
      "available",
      "currently",
      "available",
      "can",
      "i",
      "get",
      "buy",
      "purchase",
      "would",
      "like",
      "what",
      "which",
    ]);

  const usefulTerms =
    searchTerms.filter(
      (term) =>
        !ignoredWords.has(term)
    );

  /* =======================================================
     SPECIAL ATTRIBUTE TERMS
  ======================================================= */

  const sizeMatch =
    normalizedQuery.match(
      /\b(\d+)\s*mm\b/i
    );

  const requestedSize =
    sizeMatch
      ? `${sizeMatch[1]} mm`
      : "";

  const beadCountMatch =
    normalizedQuery.match(
      /\b(27|54|108)\s*(?:beads?|bead)?\b/i
    );

  const requestedBeadCount =
    beadCountMatch
      ? beadCountMatch[1]
      : "";

  /* =======================================================
     SCORE PRODUCTS
  ======================================================= */

  const scored =
    allProducts.map(
      (product: any) => {
        let score = 0;

        /* -----------------------------------------------
           Basic product data
        ------------------------------------------------ */

        const name =
          String(
            product.name ?? ""
          ).toLowerCase();

        const slug =
          String(
            product.slug ?? ""
          ).toLowerCase();

        const sku =
          String(
            product.sku ?? ""
          ).toLowerCase();

        const description =
          String(
            product.description ?? ""
          ).toLowerCase();

        const shortDescription =
          String(
            product.short_description ??
              ""
          ).toLowerCase();

        /* -----------------------------------------------
           Categories
        ------------------------------------------------ */

        const categoryText =
          Array.isArray(
            product.categories
          )
            ? product.categories
                .map(
                  (
                    category: any
                  ) =>
                    String(
                      category.name ??
                        ""
                    ).toLowerCase()
                )
                .join(" ")
            : "";

        /* -----------------------------------------------
           Attributes
        ------------------------------------------------ */

        const attributes =
          Array.isArray(
            product.attributes
          )
            ? product.attributes
            : [];

        let attributeText =
          "";

        let beadSize =
          "";

        let beadCount =
          "";

        let gemstone =
          "";

        let material =
          "";

        let categoryAttribute =
          "";

        let purpose =
          "";

        let collection =
          "";

        let chakra =
          "";

        let zodiac =
          "";

        for (
          const attribute of attributes
        ) {
          const attributeName =
            String(
              attribute.name ??
                ""
            )
              .trim()
              .toLowerCase();

          const options =
            Array.isArray(
              attribute.options
            )
              ? attribute.options
                  .map(
                    (
                      option: any
                    ) =>
                      String(
                        option
                      ).trim()
                  )
              : [];

          const value =
            options.join(
              " "
            );

          attributeText +=
            ` ${attributeName} ${value.toLowerCase()}`;

          /* ---------------------------------------------
             Recognize important attributes
          --------------------------------------------- */

          if (
            attributeName ===
            "bead size"
          ) {
            beadSize =
              value;
          }

          if (
            attributeName ===
            "bead count"
          ) {
            beadCount =
              value;
          }

          if (
            attributeName ===
            "gemstone"
          ) {
            gemstone =
              value;
          }

          if (
            attributeName ===
            "material"
          ) {
            material =
              value;
          }

          if (
            attributeName ===
            "purpose"
          ) {
            purpose =
              value;
          }

          if (
            attributeName ===
            "collection"
          ) {
            collection =
              value;
          }

          if (
            attributeName ===
            "chakra"
          ) {
            chakra =
              value;
          }

          if (
            attributeName ===
            "zodiac"
          ) {
            zodiac =
              value;
          }
        }

        /* -----------------------------------------------
           Combined searchable content
        ------------------------------------------------ */

        const searchableText =
          [
            name,
            slug,
            sku,
            categoryText,
            attributeText,
            description,
            shortDescription,
          ].join(" ");

        /* =================================================
           GENERAL TERM MATCH
        ================================================= */

        for (
          const term of usefulTerms
        ) {
          if (
            searchableText.includes(
              term
            )
          ) {
            score += 2;
          }

          if (
            name.includes(term)
          ) {
            score += 5;
          }

          if (
            categoryText.includes(
              term
            )
          ) {
            score += 4;
          }

          if (
            attributeText.includes(
              term
            )
          ) {
            score += 5;
          }
        }

        /* =================================================
           BEAD SIZE MATCH
        ================================================= */

        if (
          requestedSize
        ) {
          const normalizedProductSize =
            beadSize
              .toLowerCase()
              .replace(
                /\s+/g,
                ""
              );

          const normalizedRequestedSize =
            requestedSize
              .toLowerCase()
              .replace(
                /\s+/g,
                ""
              );

          if (
            normalizedProductSize.includes(
              normalizedRequestedSize
            )
          ) {
            score += 20;
          }
        }

        /* =================================================
           BEAD COUNT MATCH
        ================================================= */

        if (
          requestedBeadCount
        ) {
          const normalizedCount =
            beadCount
              .replace(
                /\D/g,
                ""
              );

          if (
            normalizedCount ===
            requestedBeadCount
          ) {
            score += 20;
          }
        }

        /* =================================================
           GEMSTONE MATCH
        ================================================= */

        const gemstoneTerms = [
          "amethyst",
          "tiger eye",
          "tiger-eye",
          "turquoise",
          "citrine",
          "green aventurine",
          "aventurine",
          "rose quartz",
          "carnelian",
          "hematite",
          "malachite",
          "lapis lazuli",
          "lapis",
          "jade",
          "rudraksha",
          "moonstone",
          "agate",
          "bloodstone",
          "opalite",
        ];

        for (
          const gemstoneTerm of gemstoneTerms
        ) {
          if (
            normalizedQuery.includes(
              gemstoneTerm
            )
          ) {
            const normalizedGemstone =
              gemstone
                .toLowerCase();

            const normalizedTerm =
              gemstoneTerm
                .replace(
                  "-",
                  " "
                )
                .toLowerCase();

            if (
              normalizedGemstone.includes(
                normalizedTerm
              )
            ) {
              score += 25;
            }
          }
        }

        /* =================================================
           CATEGORY MATCH
        ================================================= */

        const categoryTerms = [
          "mala",
          "malas",
          "bracelet",
          "bracelets",
          "wrist",
          "crystal",
          "gemstone",
          "rudraksha",
          "ritual",
          "singing bowl",
          "chakra",
          "zodiac",
        ];

        for (
          const categoryTerm of categoryTerms
        ) {
          if (
            normalizedQuery.includes(
              categoryTerm
            )
          ) {
            if (
              searchableText.includes(
                categoryTerm
              )
            ) {
              score += 8;
            }
          }
        }

        /* =================================================
           EXACT PHRASE
        ================================================= */

        if (
          searchableText.includes(
            normalizedQuery
          )
        ) {
          score += 10;
        }

        /* =================================================
           STOCK BONUS
        ================================================= */

        if (
          product.stock_status ===
          "instock"
        ) {
          score += 1;
        }

        return {
          product,
          score,
        };
      }
    );

  /* =======================================================
     RETURN BEST MATCHES
  ======================================================= */

  return scored
    .filter(
      (item) =>
        item.score > 0
    )
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, 8)
    .map(
      (item) =>
        item.product
    );
}