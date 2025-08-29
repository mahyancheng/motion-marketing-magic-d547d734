// src/hooks/useInverseDemoHeight.ts
import { useEffect, useMemo, useState } from "react";

/**
 * 计算“逆向”高度：屏幕越大，demo 越小；屏幕越小，demo 越大。
 * 最终返回像素高度（已做 clamp，避免过大/过小）。
 */
export function useInverseDemoHeight() {
  const [wh, setWh] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setWh({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const heightPx = useMemo(() => {
    const { w, h } = wh;
    if (!w || !h) return 560;

    // 线性关系：宽越大，高度比例越小；你可以按需微调参数
    // pct = 1.02 - w/2600  并夹到 [0.58, 0.96] 区间
    const pct = Math.max(0.58, Math.min(0.96, 1.02 - w / 2600));
    const px  = h * pct;

    // 最终像素再夹取，防止极端：420px ~ 980px
    return Math.max(420, Math.min(px, 980));
  }, [wh]);

  return heightPx;
}
