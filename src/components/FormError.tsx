import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FormErrorProps {
  message: string;
  onClose: () => void;
}

const FormError = ({ message, onClose }: FormErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md"
    >
      <div className="flex items-start">
        <div className="flex-grow">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default FormError;