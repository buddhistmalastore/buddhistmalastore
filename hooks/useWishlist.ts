"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

const WISHLIST_KEY = "wishlist";
const WISHLIST_EVENT = "bms-wishlist-updated";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        WISHLIST_KEY
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setWishlist(
            parsed
              .map(Number)
              .filter((id) => Number.isFinite(id))
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
    } finally {
      setHydrated(true);
    }
  }, []);

  /* =========================================================
     SYNC BETWEEN COMPONENTS / TABS
  ========================================================= */

  useEffect(() => {
    const handleWishlistUpdate = () => {
      try {
        const saved = localStorage.getItem(
          WISHLIST_KEY
        );

        if (!saved) {
          setWishlist([]);
          return;
        }

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setWishlist(
            parsed
              .map(Number)
              .filter((id) => Number.isFinite(id))
          );
        }
      } catch (error) {
        console.error(
          "Failed to sync wishlist:",
          error
        );
      }
    };

    /*
     * Custom event:
     * Updates Header, ProductActions,
     * Wishlist page, etc. in the SAME tab.
     */
    window.addEventListener(
      WISHLIST_EVENT,
      handleWishlistUpdate
    );

    /*
     * Native storage event:
     * Updates other browser tabs/windows.
     */
    window.addEventListener(
      "storage",
      handleWishlistUpdate
    );

    return () => {
      window.removeEventListener(
        WISHLIST_EVENT,
        handleWishlistUpdate
      );

      window.removeEventListener(
        "storage",
        handleWishlistUpdate
      );
    };
  }, []);

  /* =========================================================
     SAVE WISHLIST
  ========================================================= */

  const saveWishlist = useCallback(
    (nextWishlist: number[]) => {
      try {
        localStorage.setItem(
          WISHLIST_KEY,
          JSON.stringify(nextWishlist)
        );

        /*
         * Custom event is required because
         * the native "storage" event does NOT fire
         * in the same browser tab that changed localStorage.
         */
        window.dispatchEvent(
          new Event(WISHLIST_EVENT)
        );
      } catch (error) {
        console.error(
          "Failed to save wishlist:",
          error
        );
      }
    },
    []
  );

  /* =========================================================
     TOGGLE WISHLIST
  ========================================================= */

  const toggleWishlist = useCallback(
    (id: number) => {
      setWishlist((previous) => {
        const nextWishlist = previous.includes(id)
          ? previous.filter(
              (item) => item !== id
            )
          : [...previous, id];

        saveWishlist(nextWishlist);

        return nextWishlist;
      });
    },
    [saveWishlist]
  );

  /* =========================================================
     CHECK WISHLIST
  ========================================================= */

  const isWishlisted = useCallback(
    (id: number) => {
      return wishlist.includes(id);
    },
    [wishlist]
  );

  return {
    wishlist,
    toggleWishlist,
    isWishlisted,
    hydrated,
  };
}