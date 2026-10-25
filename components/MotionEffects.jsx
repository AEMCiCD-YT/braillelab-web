"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Movimiento de la página: aparición al hacer scroll, cifras que cuentan, barra de progreso y
// parallax del patrón del hero. Solo actúa si <html> tiene la clase «motion» (la pone un script
// en línea cuando el usuario no pidió movimiento reducido); sin ella, todo se ve completo y quieto.
const ease = (x) => 1 - Math.pow(1 - x, 3);

function countUp(scope) {
  const items = scope.matches?.("[data-count]") ? [scope] : [...scope.querySelectorAll("[data-count]")];
  for (const el of items) {
    if (el.dataset.counted) continue;
    el.dataset.counted = "1";
    const target = Number(el.dataset.count);
    const final = el.textContent;
    if (!Number.isFinite(target) || target < 2) continue;
    const from = Math.round(target * 0.5);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1100);
      el.textContent = p < 1 ? String(Math.round(from + (target - from) * ease(p))) : final;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return undefined;

    document.querySelectorAll("[data-stagger]").forEach((group) => {
      [...group.children].forEach((child, index) => child.style.setProperty("--i", index));
    });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => observer.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      root.style.setProperty("--scroll", `${Math.min(window.scrollY, 1400)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
