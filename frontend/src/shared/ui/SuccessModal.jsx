import { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

function SuccessModal({ isOpen, title, message, onClose, redirectDelay = 2000 }) {
  useEffect(() => {
    if (isOpen && redirectDelay) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, redirectDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, redirectDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <FiCheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {message && <p className="text-slate-400 text-sm">{message}</p>}
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;

