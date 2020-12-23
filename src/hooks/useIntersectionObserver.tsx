import { RefObject, useEffect } from 'react';

type Params = {
  enabled?: boolean;
  root?: any;
  target: RefObject<HTMLDivElement | null>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
};

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: Params): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(el);
  }, [target.current, enabled]);
};

export default useIntersectionObserver;
