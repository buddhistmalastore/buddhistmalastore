import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

/* =========================================================
   FOOTER INFORMATION
========================================================= */

export const footerInfo = {
  brand: "Buddhist Mala Store",
  subtitle: "& Handicraft Center",
  tagline: "Authentic Handmade Prayer Beads Crafted in Nepal",

  email: "buddhistmalastore@gmail.com",

  phone: "+977-9860958156",

  address: "Thali-05, Kathmandu, Nepal",
};

/* =========================================================
   SHOP LINKS
========================================================= */

/*
 * IMPORTANT:
 *
 * The shop page uses:
 *
 * /shop?category=CATEGORY#products
 *
 * Therefore the footer must use the same structure.
 */

export const shopLinks = [
  {
    title: "108 Bead Malas",
    href: "/shop?category=108%20Bead%20Malas#products",
  },
  {
    title: "Bracelets",
    href: "/shop?category=Bracelets#products",
  },
  {
    title: "Gemstones",
    href: "/shop?category=Gemstone#products",
  },
  {
    title: "Rudraksha",
    href: "/shop?category=Rudraksha#products",
  },
  {
    title: "Singing Bowls",
    href: "/shop?category=Singing%20Bowls#products",
  },
  {
    title: "Ritual Items",
    href: "/shop?category=Ritual%20Items#products",
  },
];

/* =========================================================
   SUPPORT LINKS
========================================================= */

export const supportLinks = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Track Order",
    href: "/account/orders",
  },
  {
    title: "Shipping",
    href: "/shipping",
  },
  {
    title: "Returns",
    href: "/returns",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

export const socialLinks = [
  {
    title: "Facebook",
    href: "https://facebook.com/buddhistmalastore",
    icon: FaFacebookF,
  },
  {
    title: "Instagram",
    href: "https://instagram.com/buddhistmalastore",
    icon: FaInstagram,
  },
  {
    title: "YouTube",
    href: "https://youtube.com/@buddhistmalastore",
    icon: FaYoutube,
  },
  {
    title: "TikTok",
    href: "https://tiktok.com/@buddhistmalastore",
    icon: FaTiktok,
  },
];

/* =========================================================
   TRUST BADGES
========================================================= */

export const trustBadges = [
  {
    title: "Handmade in Nepal",
  },
  {
    title: "Worldwide Shipping",
  },
  {
    title: "Secure Payments",
  },
];

/* =========================================================
   PAYMENT METHODS
========================================================= */

export const paymentMethods = [
  "visa",
  "mastercard",
  "paypal",
  "stripe",
];