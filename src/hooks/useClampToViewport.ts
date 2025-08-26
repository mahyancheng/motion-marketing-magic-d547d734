// /src/hooks/useClampToViewport.ts
import { useEffect } from "react";

export function useClampToViewport({
  cardRef,
  bodyRef,
  bottomPad = 16,
}: {
  cardRef: React.RefObject<HTMLElement>;
  bodyRef: React.RefObject<HTMLElement>;
  bottomPad?: number;
}) {
  useEffect(() => {
    const scrollRoot =
      (document.querySelector("[data-demo-scroll]") as HTMLElement) || window;

    const update = () => {
      const cardEl = cardRef.current;
      const bodyEl = bodyRef.current;
      if (!cardEl || !bodyEl) return;

      const rect = cardEl.getBoundingClientRect();
      const viewportH =
        scrollRoot instanceof Window ? window.innerHeight : scrollRoot.clientHeight;

      const available = Math.max(240, viewportH - rect.top - bottomPad);
      bodyEl.style.maxHeight = `${available}px`;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);

    const onScroll = () => update();
    const onResize = () => update();

    if (scrollRoot instanceof Window) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    } else {
      scrollRoot.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    }

    return () => {
      ro.disconnect();
      if (scrollRoot instanceof Window) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      } else {
        scrollRoot.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      }
    };
  }, [cardRef, bodyRef, bottomPad]);
}
