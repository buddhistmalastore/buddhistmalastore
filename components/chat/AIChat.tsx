"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";

import { useCurrency } from "@/context/CurrencyContext";

import {
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   PRODUCT TYPE
========================================================= */

interface ChatProduct {
  id: number;

  name: string;

  slug: string;

  price: string;

  regular_price?: string;

  sale_price?: string;

  stock_status?: string;

  stock_quantity?: number | null;

  sku?: string;

  images?: {
    src: string;
    alt?: string;
  }[];

  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];

  attributes?: {
    id: number;
    name: string;
    options: string[];
  }[];
}

/* =========================================================
   MESSAGE TYPE
========================================================= */

interface Message {
  role: "user" | "assistant";

  content: string;

  products?: ChatProduct[];
}

/* =========================================================
   INITIAL MESSAGE
========================================================= */

const initialMessage: Message = {
  role: "assistant",

  content:
    "Welcome to Buddhist Mala Store 🙏 I'm your AI assistant. How can I help you today?",
};

/* =========================================================
   AI CHAT
========================================================= */

export default function AIChat() {
  /*
   * Existing global currency system.
   *
   * IMPORTANT:
   * We do NOT create another currency system here.
   * AI Chat uses the same CurrencyContext as
   * Shop and Product Details.
   */

  const {
    formatPrice,
  } = useCurrency();

  const [open, setOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([
      initialMessage,
    ]);

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    messages,
    loading,
  ]);

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  async function sendMessage(
    event?: React.FormEvent
  ) {
    event?.preventDefault();

    const text =
      message.trim();

    if (
      !text ||
      loading
    ) {
      return;
    }

    /* -----------------------------------------------------
       USER MESSAGE
    ----------------------------------------------------- */

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    /*
     * Preserve previous conversation
     * for the AI.
     */

    const previousMessages =
      messages;

    setMessages(
      (current) => [
        ...current,
        userMessage,
      ]
    );

    setMessage("");

    setLoading(true);

    /* =====================================================
       API REQUEST
    ===================================================== */

    try {
      const response =
        await fetch(
          "/api/ai-chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message: text,

                history:
                  previousMessages,
              }),
          }
        );

      const data =
        await response.json();

      /* ---------------------------------------------------
         API ERROR
      --------------------------------------------------- */

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Unable to get AI response."
        );
      }

      /* ---------------------------------------------------
         PRODUCT DATA
      --------------------------------------------------- */

      const products: ChatProduct[] =
        Array.isArray(
          data.products
        )
          ? data.products
          : [];

      /* ---------------------------------------------------
         ASSISTANT MESSAGE
      --------------------------------------------------- */

      setMessages(
        (current) => [
          ...current,

          {
            role:
              "assistant",

            content:
              data.reply,

            products,
          },
        ]
      );
    } catch (
      error
    ) {
      console.error(
        "AI Chat Error:",
        error
      );

      setMessages(
        (current) => [
          ...current,

          {
            role:
              "assistant",

            content:
              "Sorry 🙏 I'm having trouble connecting right now. Please try again in a moment.",
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     QUICK QUESTIONS
  ======================================================= */

  const quickQuestions = [
    "Which mala is good for meditation?",
    "Tell me about 108 bead malas.",
    "Do you ship internationally?",
  ];

  function askQuickQuestion(
    question: string
  ) {
    setMessage(question);
  }

  /* =======================================================
     PRODUCT ATTRIBUTE HELPER
  ======================================================= */

  function getAttribute(
    product: ChatProduct,
    attributeName: string
  ) {
    return product.attributes?.find(
      (attribute) =>
        attribute.name
          ?.toLowerCase()
          .trim() ===
        attributeName
          .toLowerCase()
          .trim()
    )?.options?.[0];
  }

  /* =======================================================
     MARKDOWN RENDERER
  ======================================================= */

  function renderMessage(
    content: string,
    isUser: boolean
  ) {
    /*
     * User messages are displayed as
     * normal text.
     *
     * AI messages use ReactMarkdown.
     */

    if (isUser) {
      return (
        <p className="whitespace-pre-wrap">
          {content}
        </p>
      );
    }

    return (
      <ReactMarkdown
        components={{
          /* ---------------------------------------------
             Paragraph
          --------------------------------------------- */

          p: ({
            children,
          }) => (
            <p className="mb-2 last:mb-0">
              {children}
            </p>
          ),

          /* ---------------------------------------------
             Bold
          --------------------------------------------- */

          strong: ({
            children,
          }) => (
            <strong className="font-semibold text-[#8F691A]">
              {children}
            </strong>
          ),

          /* ---------------------------------------------
             Italic
          --------------------------------------------- */

          em: ({
            children,
          }) => (
            <em className="italic">
              {children}
            </em>
          ),

          /* ---------------------------------------------
             Unordered List
          --------------------------------------------- */

          ul: ({
            children,
          }) => (
            <ul
              className="
                mb-3
                list-disc
                space-y-1
                pl-5
              "
            >
              {children}
            </ul>
          ),

          /* ---------------------------------------------
             Ordered List
          --------------------------------------------- */

          ol: ({
            children,
          }) => (
            <ol
              className="
                mb-3
                list-decimal
                space-y-1
                pl-5
              "
            >
              {children}
            </ol>
          ),

          /* ---------------------------------------------
             List Item
          --------------------------------------------- */

          li: ({
            children,
          }) => (
            <li>
              {children}
            </li>
          ),

          /* ---------------------------------------------
             Links
          --------------------------------------------- */

          a: ({
            href,
            children,
          }) => (
            <a
              href={href}
              className="
                font-semibold
                text-[#B88620]
                underline
                underline-offset-2
                transition
                hover:text-[#8F691A]
              "
            >
              {children}
            </a>
          ),

          /* ---------------------------------------------
             Heading
          --------------------------------------------- */

          h1: ({
            children,
          }) => (
            <h3
              className="
                mb-2
                text-base
                font-semibold
                text-[#29251F]
              "
            >
              {children}
            </h3>
          ),

          h2: ({
            children,
          }) => (
            <h3
              className="
                mb-2
                text-base
                font-semibold
                text-[#29251F]
              "
            >
              {children}
            </h3>
          ),

          h3: ({
            children,
          }) => (
            <h3
              className="
                mb-2
                text-sm
                font-semibold
                text-[#29251F]
              "
            >
              {children}
            </h3>
          ),

          /* ---------------------------------------------
             Line Break
          --------------------------------------------- */

          br: () => (
            <br />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {open && (
        <div
          className="
            fixed
            bottom-24
            right-4
            z-[9999]
            flex
            w-[calc(100vw-32px)]
            max-w-[390px]
            flex-col
            overflow-hidden
            rounded-[28px]
            border
            border-[#E6DCCB]
            bg-[#FBF7F0]
            shadow-[0_25px_80px_rgba(45,35,20,0.22)]
            sm:right-6
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              bg-[#C89A2A]
              px-5
              py-4
              text-white
            "
          >
            {/* Decorative circle */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                border
                border-white/10
              "
            />

            {/* Header Content */}

            <div
              className="
                relative
                flex
                items-center
                justify-between
              "
            >
              {/* Store */}

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    ring-1
                    ring-white/20
                  "
                >
                  <Bot size={23} />
                </div>

                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <p className="font-semibold">
                      Buddhist Mala Store
                    </p>

                    <Sparkles
                      size={14}
                    />
                  </div>

                  <div
                    className="
                      mt-0.5
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-green-300
                      "
                    />

                    <span
                      className="
                        text-xs
                        text-white/90
                      "
                    >
                      AI Assistant
                    </span>
                  </div>
                </div>
              </div>

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close chat"
                className="
                  rounded-full
                  p-2
                  transition
                  hover:bg-white/15
                "
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div
            className="
              h-[390px]
              overflow-y-auto
              px-4
              py-4
              sm:h-[420px]
            "
          >
            {messages.map(
              (
                item,
                index
              ) => {
                const isUser =
                  item.role ===
                  "user";

                return (
                  <div
                    key={`${item.role}-${index}`}
                    className={`
                      mb-4
                      flex
                      ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className={`
                        max-w-[88%]
                        ${
                          isUser
                            ? ""
                            : "space-y-3"
                        }
                      `}
                    >
                      {/* =================================
                          MESSAGE
                      ================================= */}

                      <div
                        className={`
                          rounded-2xl
                          px-4
                          py-3
                          text-sm
                          leading-6
                          ${
                            isUser
                              ? `
                                rounded-br-md
                                bg-[#C89A2A]
                                text-white
                              `
                              : `
                                rounded-bl-md
                                border
                                border-[#E5DAC9]
                                bg-white
                                text-[#403A32]
                              `
                          }
                        `}
                      >
                        {renderMessage(
                          item.content,
                          isUser
                        )}
                      </div>

                      {/* =================================
                          PRODUCTS
                      ================================= */}

                      {!isUser &&
                        item.products &&
                        item.products.length >
                          0 && (
                          <div
                            className="
                              space-y-3
                            "
                          >
                            {item.products.map(
                              (
                                product
                              ) => {
                                /* --------------------------------
                                   IMAGE
                                -------------------------------- */

                                const image =
                                  product
                                    .images?.[0]
                                    ?.src;

                                const imageAlt =
                                  product
                                    .images?.[0]
                                    ?.alt ||
                                  product.name;

                                /* --------------------------------
                                   ATTRIBUTES
                                -------------------------------- */

                                const beadSize =
                                  getAttribute(
                                    product,
                                    "Bead Size"
                                  );

                                const beadCount =
                                  getAttribute(
                                    product,
                                    "Bead Count"
                                  );

                                const gemstone =
                                  getAttribute(
                                    product,
                                    "Gemstone"
                                  );

                                const material =
                                  getAttribute(
                                    product,
                                    "Material"
                                  );

                                const category =
                                  product
                                    .categories?.find(
                                      (
                                        category
                                      ) =>
                                        category.slug !==
                                        "uncategorized"
                                    )?.name ||
                                  product
                                    .categories?.[0]
                                    ?.name ||
                                  "Product";

                                /* --------------------------------
                                   STOCK
                                -------------------------------- */

                                const inStock =
                                  product.stock_status ===
                                  "instock";

                                /* --------------------------------
                                   PRODUCT URL
                                -------------------------------- */

                                const productUrl =
                                  `/product/${product.slug}`;

                                /* --------------------------------
                                   CONVERTED PRICES
                                -------------------------------- */

                                const currentPrice =
                                  Number(
                                    product.price
                                  );

                                const regularPrice =
                                  product
                                    .regular_price
                                    ? Number(
                                        product.regular_price
                                      )
                                    : null;

                                return (
                                  <div
                                    key={
                                      product.id
                                    }
                                    className="
                                      overflow-hidden
                                      rounded-2xl
                                      border
                                      border-[#E5DAC9]
                                      bg-white
                                      shadow-sm
                                    "
                                  >
                                    {/* =================
                                        IMAGE
                                    ================= */}

                                    {image && (
                                      <a
                                        href={
                                          productUrl
                                        }
                                        className="
                                          block
                                          overflow-hidden
                                          bg-[#F6F1E8]
                                        "
                                      >
                                        <div
                                          className="
                                            relative
                                            aspect-[4/3]
                                            overflow-hidden
                                          "
                                        >
                                          <img
                                            src={
                                              image
                                            }
                                            alt={
                                              imageAlt
                                            }
                                            loading="lazy"
                                            className="
                                              h-full
                                              w-full
                                              object-cover
                                              transition
                                              duration-500
                                              hover:scale-105
                                            "
                                          />
                                        </div>
                                      </a>
                                    )}

                                    {/* =================
                                        CONTENT
                                    ================= */}

                                    <div
                                      className="
                                        p-4
                                      "
                                    >
                                      {/* Category */}

                                      <p
                                        className="
                                          text-[10px]
                                          font-semibold
                                          uppercase
                                          tracking-[2px]
                                          text-[#B88620]
                                        "
                                      >
                                        {
                                          category
                                        }
                                      </p>

                                      {/* Product Name */}

                                      <h3
                                        className="
                                          mt-1
                                          text-sm
                                          font-semibold
                                          leading-5
                                          text-[#29251F]
                                        "
                                      >
                                        {
                                          product.name
                                        }
                                      </h3>

                                      {/* =================
                                          ATTRIBUTES
                                      ================= */}

                                      {(beadSize ||
                                        beadCount ||
                                        gemstone ||
                                        material) && (
                                        <div
                                          className="
                                            mt-3
                                            flex
                                            flex-wrap
                                            gap-2
                                          "
                                        >
                                          {beadSize && (
                                            <span
                                              className="
                                                rounded-full
                                                bg-[#FBF7F0]
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-medium
                                                text-[#6B6257]
                                              "
                                            >
                                              {
                                                beadSize
                                              }
                                            </span>
                                          )}

                                          {beadCount && (
                                            <span
                                              className="
                                                rounded-full
                                                bg-[#FBF7F0]
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-medium
                                                text-[#6B6257]
                                              "
                                            >
                                              {
                                                beadCount
                                              }{" "}
                                              beads
                                            </span>
                                          )}

                                          {gemstone && (
                                            <span
                                              className="
                                                rounded-full
                                                bg-[#FBF7F0]
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-medium
                                                text-[#6B6257]
                                              "
                                            >
                                              {
                                                gemstone
                                              }
                                            </span>
                                          )}

                                          {material &&
                                            material !==
                                              gemstone && (
                                              <span
                                                className="
                                                  rounded-full
                                                  bg-[#FBF7F0]
                                                  px-2.5
                                                  py-1
                                                  text-[10px]
                                                  font-medium
                                                  text-[#6B6257]
                                                "
                                              >
                                                {
                                                  material
                                                }
                                              </span>
                                            )}
                                        </div>
                                      )}

                                      {/* =================
                                          PRICE / STOCK
                                      ================= */}

                                      <div
                                        className="
                                          mt-4
                                          flex
                                          items-center
                                          justify-between
                                          gap-3
                                        "
                                      >
                                        <div>
                                          {/* Current Price */}

                                          <p
                                            className="
                                              text-lg
                                              font-semibold
                                              text-[#8F691A]
                                            "
                                          >
                                            {formatPrice(
                                              currentPrice
                                            )}
                                          </p>

                                          {/* Original Price */}

                                          {regularPrice !==
                                            null &&
                                            regularPrice >
                                              currentPrice && (
                                              <p
                                                className="
                                                  text-xs
                                                  text-[#9A9186]
                                                  line-through
                                                "
                                              >
                                                {formatPrice(
                                                  regularPrice
                                                )}
                                              </p>
                                            )}
                                        </div>

                                        {/* Stock */}

                                        <span
                                          className={`
                                            rounded-full
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-semibold
                                            ${
                                              inStock
                                                ? `
                                                  bg-green-50
                                                  text-green-700
                                                `
                                                : `
                                                  bg-red-50
                                                  text-red-700
                                                `
                                            }
                                          `}
                                        >
                                          {inStock
                                            ? "In Stock"
                                            : "Out of Stock"}
                                        </span>
                                      </div>

                                      {/* =================
                                          VIEW PRODUCT
                                      ================= */}

                                      <a
                                        href={
                                          productUrl
                                        }
                                        className="
                                          mt-4
                                          flex
                                          w-full
                                          items-center
                                          justify-center
                                          rounded-xl
                                          bg-[#C89A2A]
                                          px-4
                                          py-2.5
                                          text-xs
                                          font-semibold
                                          text-white
                                          transition
                                          hover:bg-[#B88620]
                                        "
                                      >
                                        View Product →
                                      </a>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                );
              }
            )}

            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (
              <div
                className="
                  mb-4
                  flex
                  justify-start
                "
              >
                <div
                  className="
                    rounded-2xl
                    rounded-bl-md
                    border
                    border-[#E5DAC9]
                    bg-white
                    px-4
                    py-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        animate-bounce
                        rounded-full
                        bg-[#C89A2A]
                      "
                    />

                    <span
                      className="
                        h-2
                        w-2
                        animate-bounce
                        rounded-full
                        bg-[#C89A2A]
                      "
                      style={{
                        animationDelay:
                          "120ms",
                      }}
                    />

                    <span
                      className="
                        h-2
                        w-2
                        animate-bounce
                        rounded-full
                        bg-[#C89A2A]
                      "
                      style={{
                        animationDelay:
                          "240ms",
                      }}
                    />

                  </div>
                </div>
              </div>
            )}

            <div
              ref={
                messagesEndRef
              }
            />
          </div>

          {/* =================================================
              QUICK QUESTIONS
          ================================================= */}

          {messages.length ===
            1 && (
            <div
              className="
                border-t
                border-[#E6DCCB]
                px-4
                py-3
              "
            >
              <p
                className="
                  mb-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-[#9A7A3A]
                "
              >
                Quick questions
              </p>

              <div
                className="
                  flex
                  gap-2
                  overflow-x-auto
                  pb-1
                "
              >
                {quickQuestions.map(
                  (
                    question
                  ) => (
                    <button
                      key={
                        question
                      }
                      type="button"
                      onClick={() =>
                        askQuickQuestion(
                          question
                        )
                      }
                      className="
                        shrink-0
                        rounded-full
                        border
                        border-[#DCCFB9]
                        bg-white
                        px-3
                        py-2
                        text-xs
                        text-[#62584C]
                        transition
                        hover:border-[#C89A2A]
                        hover:text-[#9A7018]
                      "
                    >
                      {
                        question
                      }
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* =================================================
              INPUT
          ================================================= */}

          <form
            onSubmit={
              sendMessage
            }
            className="
              border-t
              border-[#E6DCCB]
              bg-white
              p-3
            "
          >
            <div
              className="
                flex
                items-end
                gap-2
                rounded-2xl
                border
                border-[#DED3C3]
                bg-[#FBF7F0]
                p-2
                focus-within:border-[#C89A2A]
              "
            >
              <textarea
                value={
                  message
                }
                onChange={(
                  event
                ) =>
                  setMessage(
                    event.target
                      .value
                  )
                }
                onKeyDown={(
                  event
                ) => {
                  if (
                    event.key ===
                      "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();

                    sendMessage();
                  }
                }}
                rows={1}
                placeholder="Ask us anything..."
                disabled={
                  loading
                }
                className="
                  max-h-24
                  min-h-[42px]
                  flex-1
                  resize-none
                  bg-transparent
                  px-2
                  py-2.5
                  text-sm
                  text-[#29251F]
                  outline-none
                  placeholder:text-[#A69D91]
                "
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !message.trim()
                }
                aria-label="Send message"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C89A2A]
                  text-white
                  transition
                  hover:bg-[#B88620]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Send size={17} />
              </button>
            </div>

            <p
              className="
                mt-2
                text-center
                text-[10px]
                text-[#9A9186]
              "
            >
              AI Assistant • Buddhist Mala Store
            </p>
          </form>
        </div>
      )}

      {/* =====================================================
          FLOATING BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }
        aria-label={
          open
            ? "Close AI chat"
            : "Open AI chat"
        }
        className="
          fixed
          bottom-5
          right-4
          z-[10000]
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#C89A2A]
          text-white
          shadow-[0_12px_40px_rgba(80,60,20,0.25)]
          transition-all
          duration-300
          hover:scale-105
          hover:bg-[#B88620]
          sm:right-6
        "
      >
        {open ? (
          <X size={25} />
        ) : (
          <MessageCircle
            size={27}
          />
        )}

        {!open && (
          <span
            className="
              absolute
              right-0
              top-0
              h-4
              w-4
              rounded-full
              border-2
              border-[#FAF8F4]
              bg-green-500
            "
          />
        )}
      </button>
    </>
  );
}