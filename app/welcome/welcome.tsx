import { useRef } from "react";

const leftImages = [
  "https://picsum.photos/id/1011/1000/1000",
  "https://picsum.photos/id/1012/1000/1000",
  "https://picsum.photos/id/1015/1000/1000",
  "https://picsum.photos/id/1016/1000/1000",
  "https://picsum.photos/id/1018/1000/1000",
];

const rightImages = [
  "https://picsum.photos/id/1020/1000/1000",
  "https://picsum.photos/id/1024/1000/1000",
  "https://picsum.photos/id/1035/1000/1000",
  "https://picsum.photos/id/1041/1000/1000",
  "https://picsum.photos/id/1045/1000/1000",
];

export function Welcome() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const scrollIndexRef = useRef(0);

  const maxIndex = leftImages.length - 1;

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const direction = e.deltaY > 0 ? 1 : -1;
    scrollIndexRef.current += direction;
    scrollIndexRef.current = Math.max(0, Math.min(scrollIndexRef.current, maxIndex));

    const top = scrollIndexRef.current * window.innerHeight;
    const reverseTop = (maxIndex - scrollIndexRef.current) * window.innerHeight;

    if (leftRef.current) {
      leftRef.current.scrollTo({ top, behavior: "smooth" });
    }
    if (rightRef.current) {
      rightRef.current.scrollTo({ top: reverseTop, behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-wrapper" onWheel={handleScroll}>
      <div className="scroll-half" ref={leftRef}>
        {leftImages.map((src, i) => (
          <img key={`left-${i}`} src={src} alt={`left-${i}`} />
        ))}
      </div>
      <div className="scroll-half" ref={rightRef}>
        {rightImages.map((src, i) => (
          <img key={`right-${i}`} src={src} alt={`right-${i}`} />
        ))}
      </div>
    </div>
  );
}
