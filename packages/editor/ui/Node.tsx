import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as styles from './Node.css';

interface Props {
  children: ReactNode;
  x: number;
  y: number;
  id: string;
  onSizeChange: (id: string, width: number, height: number) => void;
}

const Node = ({ children, x, y, id, onSizeChange }: Props) => {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.current) {
      const setViewbox = () => {
        if (node.current) {
          onSizeChange(id, node.current.clientWidth, node.current.clientHeight);
        }
      };
      setViewbox();

      const observer = new ResizeObserver(setViewbox);

      observer.observe(node.current);

      return () => observer.disconnect();
    }
  }, [node.current?.clientWidth, node.current?.clientHeight]);

  return (
    <foreignObject className={styles.node} x={x} y={y}>
      <div ref={node} className={styles.container}>
        {children}
      </div>
    </foreignObject>
  );
};

export default Node;
