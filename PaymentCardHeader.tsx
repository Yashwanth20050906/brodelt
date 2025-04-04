
import { ShieldCheck, CreditCard } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';

const PaymentCardHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Secure Payment</CardTitle>
        <div className="flex items-center">
          <ShieldCheck className="h-6 w-6 text-green-500 mr-1" />
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
      </div>
      <CardDescription>
        Complete your secure payment to submit your consultation request.
      </CardDescription>
    </>
  );
};

export default PaymentCardHeader;
