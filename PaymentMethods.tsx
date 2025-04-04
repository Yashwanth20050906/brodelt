
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LockIcon, AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
  checkPaymentLimitExceeded, 
  resetPaymentLimits, 
  isUpiLimitBypassActive, 
  generateUpiQrCodeUrl 
} from './UpiPaymentUtils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentMethodsProps {
  isLoading: boolean;
  userUpiId: string;
  initiateUpiPayment: (app?: string) => void;
  bypassActive?: boolean;
}

const PaymentMethods = ({ isLoading, userUpiId, initiateUpiPayment, bypassActive = false }: PaymentMethodsProps) => {
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // Check if payment limits are exceeded
    const checkLimits = () => {
      const exceeded = checkPaymentLimitExceeded();
      setLimitExceeded(exceeded);

      if (exceeded) {
        const lastAttempt = parseInt(localStorage.getItem('last_payment_attempt') || '0');
        const resetTime = lastAttempt + (30 * 60 * 1000); // 30 minutes from last attempt
        const remaining = Math.max(0, Math.floor((resetTime - Date.now()) / 1000));
        setTimeRemaining(remaining);
      }
    };

    checkLimits();
    
    // Set up interval to update timer
    const interval = setInterval(() => {
      checkLimits();
      if (timeRemaining > 0) {
        setTimeRemaining(prevTime => prevTime - 1);
      } else if (limitExceeded) {
        resetPaymentLimits();
        setLimitExceeded(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePayWithGooglePay = () => {
    if (checkPaymentLimitExceeded()) {
      setLimitExceeded(true);
      return;
    }

    toast({
      title: "Opening Google Pay",
      description: "Redirecting to secure Google Pay for payment...",
    });
    initiateUpiPayment('googlepay');
  };

  const handlePayWithPhonePe = () => {
    if (checkPaymentLimitExceeded()) {
      setLimitExceeded(true);
      return;
    }

    toast({
      title: "Opening PhonePe",
      description: "Redirecting to secure PhonePe for payment...",
    });
    initiateUpiPayment('phonepe');
  };

  const handlePayWithOtherUpi = () => {
    if (checkPaymentLimitExceeded()) {
      setLimitExceeded(true);
      return;
    }

    toast({
      title: "Opening UPI App",
      description: "Redirecting to secure UPI app for payment...",
    });
    initiateUpiPayment();
  };

  const handleShowQrCode = () => {
    // Generate QR code URL
    const qrUrl = generateUpiQrCodeUrl(
      '9955699667@ybl',
      'Brodelt Fitness',
      '25.00',
      'Fitness Consultation'
    );
    setQrCodeUrl(qrUrl);
    setShowQrCode(true);
  };

  return (
    <div className="space-y-3">
      {limitExceeded && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Limit Exceeded</AlertTitle>
          <AlertDescription>
            You've made too many payment attempts. Please wait {formatTimeRemaining()} before trying again.
          </AlertDescription>
        </Alert>
      )}
      
      {bypassActive && (
        <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Bank Limit Fix Enabled</AlertTitle>
          <AlertDescription>
            Payment will process with a reduced amount to avoid bank limits.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="apps" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="apps">UPI Apps</TabsTrigger>
          <TabsTrigger value="scan">Scan & Pay</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apps" className="space-y-3">
          <Button 
            variant="default"
            className="w-full rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
            disabled={isLoading || limitExceeded}
            onClick={handlePayWithPhonePe}
          >
            <LockIcon className="h-3 w-3 mr-2" />
            {isLoading ? "Processing..." : "Pay securely with PhonePe"}
          </Button>
          <Button 
            variant="default"
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            disabled={isLoading || limitExceeded}
            onClick={handlePayWithGooglePay}
          >
            <LockIcon className="h-3 w-3 mr-2" />
            {isLoading ? "Processing..." : "Pay securely with Google Pay"}
          </Button>
          <Button 
            variant="outline"
            className="w-full rounded-full flex items-center justify-center"
            disabled={isLoading || limitExceeded}
            onClick={handlePayWithOtherUpi}
          >
            <LockIcon className="h-3 w-3 mr-2" />
            {isLoading ? "Processing..." : `Pay securely with Other UPI Apps`}
          </Button>
        </TabsContent>
        
        <TabsContent value="scan" className="space-y-3">
          <div className="text-center p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800/30">
            <p className="mb-2 text-sm text-blue-700 dark:text-blue-300">
              Scan the QR code with any UPI app to pay securely
            </p>
            <Button
              variant="default"
              className="mt-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleShowQrCode}
              disabled={isLoading}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Show QR Code
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            If direct payment is declined, try the QR code option for better security.
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan to Pay ₹25</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center p-4">
            {qrCodeUrl && (
              <img 
                src={qrCodeUrl} 
                alt="UPI QR Code" 
                className="w-64 h-64 border rounded-lg"
              />
            )}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Open any UPI app, scan this QR code, and complete your payment
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethods;
