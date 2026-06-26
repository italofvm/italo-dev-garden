import { useEffect, useRef, useState } from "react";

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook para lazy loading de imagens com Intersection Observer
 * Melhora Core Web Vitals (LCP, CLS)
 */
export function useLazyImage(
  options: UseLazyImageOptions = {}
) {
  const { threshold = 0.1, rootMargin = "50px" } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imageRef.current) {
          const img = imageRef.current;
          
          // Carregar imagem
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => setIsLoaded(true);
          }

          observer.unobserve(img);
        }
      },
      { threshold, rootMargin }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { imageRef, isLoaded };
}
