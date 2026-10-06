const TRACE_MS = 480;
const FADE_MS = 220;
const SVG_NS = "http://www.w3.org/2000/svg";

function isVisibleColor(c: string) {
  return !!c && c !== "transparent" && !/(,|\/)\s*0\)$/.test(c.trim());
}

export function traceVisual(root: HTMLElement, onDone: () => void) {
  const anims: Animation[] = [];
  const prevPosition = root.style.position;
  if (getComputedStyle(root).position === "static") {
    root.style.position = "relative";
  }

  const rootRect = root.getBoundingClientRect();
  const all = Array.from(root.querySelectorAll<Element>("*"));

  type Kind = "path" | "line" | "box" | "fill" | "text";
  const jobs: { el: Element; kind: Kind }[] = [];

  for (const el of all) {
    const tag = el.tagName.toLowerCase();
    if (tag === "svg") continue;
    if (tag === "path") {
      jobs.push({ el, kind: "path" });
      continue;
    }
    if (!(el instanceof HTMLElement)) continue;

    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;

    const bw = [
      cs.borderTopWidth,
      cs.borderRightWidth,
      cs.borderBottomWidth,
      cs.borderLeftWidth,
    ].map((v) => parseFloat(v) || 0);
    const hasBorder = bw.some((v) => v > 0);
    const hasFill =
      isVisibleColor(cs.backgroundColor) || cs.backgroundImage !== "none";
    const hasText = Array.from(el.childNodes).some(
      (n) => n.nodeType === 3 && !!n.textContent?.trim(),
    );

    if ((r.width <= 2.5 || r.height <= 2.5) && (hasFill || hasBorder)) {
      jobs.push({ el, kind: "line" });
    } else if (hasBorder && r.width > 6 && r.height > 6) {
      jobs.push({ el, kind: "box" });
    } else if (hasFill) {
      jobs.push({ el, kind: "fill" });
    } else if (hasText) {
      jobs.push({ el, kind: "text" });
    }
  }

  const overlay = document.createElementNS(SVG_NS, "svg");
  overlay.setAttribute("width", String(rootRect.width));
  overlay.setAttribute("height", String(rootRect.height));
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.add("process-trace-overlay");
  root.appendChild(overlay);

  const step = Math.min(70, 1500 / Math.max(jobs.length, 1));
  let end = 0;

  const addStroke = (
    node: SVGElement,
    color: string,
    width: number,
    delay: number,
  ) => {
    node.setAttribute("fill", "none");
    node.setAttribute("stroke", color);
    node.setAttribute("stroke-width", String(width));
    node.setAttribute("pathLength", "1");
    node.setAttribute("opacity", "0");
    node.classList.add("process-trace-stroke");
    overlay.appendChild(node);
    const total = TRACE_MS + FADE_MS;
    const hold = TRACE_MS / total;
    anims.push(
      node.animate(
        [
          { strokeDashoffset: 1, opacity: 1 },
          { strokeDashoffset: 0, opacity: 1, offset: hold },
          { strokeDashoffset: 0, opacity: 0 },
        ],
        { delay, duration: total, fill: "backwards", easing: "linear" },
      ),
    );
  };

  jobs.forEach(({ el, kind }, i) => {
    const delay = i * step;

    if (kind === "path") {
      const p = el as SVGPathElement;
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      anims.push(
        p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          delay,
          duration: 800,
          fill: "backwards",
          easing: "cubic-bezier(.65,0,.35,1)",
        }),
      );
      end = Math.max(end, delay + 800);
      return;
    }

    const h = el as HTMLElement;
    const cs = getComputedStyle(h);
    const r = h.getBoundingClientRect();

    if (kind === "line") {
      const horizontal = r.width >= r.height;
      h.style.transformOrigin = horizontal ? "left center" : "center top";
      anims.push(
        h.animate(
          [
            { scale: horizontal ? "0 1" : "1 0" },
            { scale: "1 1" },
          ],
          {
            delay,
            duration: 420,
            fill: "backwards",
            easing: "cubic-bezier(.65,0,.35,1)",
          },
        ),
      );
      end = Math.max(end, delay + 420);
      return;
    }

    if (kind === "box") {
      const x = r.left - rootRect.left;
      const y = r.top - rootRect.top;
      const w = r.width;
      const hh = r.height;
      const bt = parseFloat(cs.borderTopWidth) || 0;
      const br = parseFloat(cs.borderRightWidth) || 0;
      const bb = parseFloat(cs.borderBottomWidth) || 0;
      const bl = parseFloat(cs.borderLeftWidth) || 0;

      if (bt > 0 && br > 0 && bb > 0 && bl > 0) {
        const sw = bt;
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", String(x + sw / 2));
        rect.setAttribute("y", String(y + sw / 2));
        rect.setAttribute("width", String(Math.max(0, w - sw)));
        rect.setAttribute("height", String(Math.max(0, hh - sw)));
        const rad = cs.borderTopLeftRadius;
        let rx = parseFloat(rad) || 0;
        if (rad.endsWith("%")) rx = (rx / 100) * Math.min(w, hh);
        rx = Math.max(0, Math.min(rx, Math.min(w, hh) / 2) - sw / 2);
        rect.setAttribute("rx", String(rx));
        addStroke(rect, cs.borderTopColor, sw, delay);
      } else {
        const mk = (x1: number, y1: number, x2: number, y2: number) => {
          const l = document.createElementNS(SVG_NS, "line");
          l.setAttribute("x1", String(x1));
          l.setAttribute("y1", String(y1));
          l.setAttribute("x2", String(x2));
          l.setAttribute("y2", String(y2));
          return l;
        };
        if (bt > 0)
          addStroke(mk(x, y + bt / 2, x + w, y + bt / 2), cs.borderTopColor, bt, delay);
        if (br > 0)
          addStroke(mk(x + w - br / 2, y, x + w - br / 2, y + hh), cs.borderRightColor, br, delay);
        if (bb > 0)
          addStroke(mk(x + w, y + hh - bb / 2, x, y + hh - bb / 2), cs.borderBottomColor, bb, delay);
        if (bl > 0)
          addStroke(mk(x + bl / 2, y + hh, x + bl / 2, y), cs.borderLeftColor, bl, delay);
      }

      const total = TRACE_MS + FADE_MS;
      const hold = TRACE_MS / total;
      anims.push(
        h.animate(
          [
            { borderColor: "transparent", backgroundColor: "transparent" },
            {
              borderColor: "transparent",
              backgroundColor: "transparent",
              offset: hold,
            },
          ],
          { delay, duration: total, fill: "backwards", easing: "linear" },
        ),
      );
      end = Math.max(end, delay + total);
      return;
    }

    if (kind === "fill") {
      const small = r.width <= 40 && r.height <= 40;
      anims.push(
        h.animate(
          small
            ? [
                { opacity: 0, scale: "0.4" },
                { opacity: 1, scale: "1" },
              ]
            : [{ opacity: 0 }, { opacity: 1 }],
          {
            delay,
            duration: 380,
            fill: "backwards",
            easing: "cubic-bezier(.2,.8,.2,1)",
          },
        ),
      );
      end = Math.max(end, delay + 380);
      return;
    }

    anims.push(
      h.animate(
        [
          { opacity: 0, translate: "0 4px" },
          { opacity: 1, translate: "0 0" },
        ],
        { delay, duration: 400, fill: "backwards", easing: "ease-out" },
      ),
    );
    end = Math.max(end, delay + 400);
  });

  const cleanup = () => {
    anims.forEach((a) => a.cancel());
    overlay.remove();
    root.style.position = prevPosition;
  };

  const timer = window.setTimeout(() => {
    overlay.remove();
    onDone();
  }, end + 60);

  return () => {
    window.clearTimeout(timer);
    cleanup();
  };
}
