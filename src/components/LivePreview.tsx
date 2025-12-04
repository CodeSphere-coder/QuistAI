import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LivePreviewProps {
  code: string;
  isTarget?: boolean;
}

const LivePreview = ({ code, isTarget = false }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  return (
    <motion.div
      initial={isTarget ? { scale: 0.95, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className={`preview-frame h-full bg-card ${isTarget ? 'pulse-glow' : ''}`}
    >
      <iframe
        ref={iframeRef}
        title={isTarget ? 'Target Preview' : 'Live Preview'}
        className="w-full h-full border-0"
        sandbox="allow-scripts"
      />
    </motion.div>
  );
};

export default LivePreview;
