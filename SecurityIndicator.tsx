
import { LockIcon, ShieldCheck } from 'lucide-react';

const SecurityIndicator = () => {
  return (
    <div className="flex items-center space-x-2 text-xs text-green-600 pt-2">
      <LockIcon className="h-3 w-3" />
      <span>End-to-end encrypted payment with SSL protection</span>
    </div>
  );
};

export default SecurityIndicator;
