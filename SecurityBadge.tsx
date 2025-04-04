
import { ShieldCheck, Lock } from 'lucide-react';

const SecurityBadge = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
      <ShieldCheck className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-green-700 text-sm">
          <span className="font-medium">Secure Transaction:</span> Your payment information is protected with 256-bit SSL encryption
        </p>
        <div className="flex items-center mt-1 text-xs text-green-600">
          <Lock className="h-3 w-3 mr-1" />
          <span>Verified by Payment Card Industry Data Security Standard (PCI DSS)</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;
