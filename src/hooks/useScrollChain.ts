// src/hooks/useScrollChain.ts
import { useEffect } from "react";

/**
 * 让内层滚动容器在到达顶/底时，继续滚动会把窗口也一起滚动（无缝衔接）。
 * 用法：
 * const ref = useRef<HTMLDivElement>(null);
 * useScrollChain(ref);
 */
export function useScrollChain(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startY = 0;
    let lastY = 0;
    let isTouching = false;

    const onWheel = (e: WheelEvent) => {
      const { deltaY } = e;
      const atTop    = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // 内部仍可滚时，拦截并只滚内部
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
        e.preventDefault();
        el.scrollTop += deltaY;
        return;
      }

      // 到边界了，交给 window（不阻止默认）
      if (atTop && deltaY < 0) window.scrollBy({ top: deltaY, behavior: "auto" });
      if (atBottom && deltaY > 0) window.scrollBy({ top: deltaY, behavior: "auto" });
    };

    const onTouchStart = (e: TouchEvent) => {
      isTouching = true;
      startY = lastY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const y = e.touches[0].clientY;
      const dy = lastY - y; // mimic deltaY（手指上滑为正，下滑为负）
      lastY = y;

      const atTop    = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) {
        e.preventDefault(); // 需要 passive:false
        el.scrollTop += dy;
      } else {
        window.scrollBy({ top: dy, behavior: "auto" });
      }
    };

    const onTouchEnd = () => { isTouching = false; };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("wheel", onWheel as any);
      el.removeEventListener("touchstart", onTouchStart as any);
      el.removeEventListener("touchmove", onTouchMove as any);
      el.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [ref]);
}
