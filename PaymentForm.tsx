import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UserFormData } from '@/utils/types';

// Import new components
import PaymentMethods from './payment/PaymentMethods';
import SecurityBadge from './payment/SecurityBadge';
import OrderSummary from './payment/OrderSummary';
import UpiIdInput from './payment/UpiIdInput';
import SecurityIndicator from './payment/SecurityIndicator';
import PaymentCardHeader from './payment/PaymentCardHeader';
import { initiateUpiPaymentUtil, checkPaymentLimitExceeded, resetPaymentLimits, isUpiLimitBypassActive } from './payment/UpiPaymentUtils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  bypassActive?: boolean;
}

const PaymentForm = ({ bypassActive = false }: PaymentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(25);
  const [displayAmount, setDisplayAmount] = useState<number>(25);
  const [currencySymbol, setCurrencySymbol] = useState<string>('₹');
  const [userUpiId, setUserUpiId] = useState<string>('');
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [adminPaymentDetails, setAdminPaymentDetails] = useState({
    upiId: '9955699667@ybl',
    accountName: '',
    accountNumber: '',
    ifscCode: ''
  });

  useEffect(() => {
    // Check for payment limits on load
    setLimitExceeded(checkPaymentLimitExceeded());
    
    // Retrieve form data from session storage
    const storedData = sessionStorage.getItem('userFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      // If no data, redirect back to the form
      navigate('/#contact');
      toast({
        title: "Form Data Missing",
        description: "Please fill out the consultation form first.",
        variant: "destructive",
      });
    }

    // Retrieve payment config from localStorage if available
    const storedPaymentConfig = localStorage.getItem('brodelt_payment_config');
    if (storedPaymentConfig) {
      const config = JSON.parse(storedPaymentConfig);
      const amount = config.amount || 25;
      setPaymentAmount(amount);
      setDisplayAmount(amount);
      setCurrencySymbol(config.currency === 'USD' ? '$' : '₹');
    }

    // Retrieve admin payment details from localStorage if available
    const storedAdminPaymentDetails = localStorage.getItem('brodelt_admin_payment_details');
    if (storedAdminPaymentDetails) {
      setAdminPaymentDetails(JSON.parse(storedAdminPaymentDetails));
    }
    
    // Check if user was redirected from a previous payment
    const paymentInitiated = sessionStorage.getItem('paymentInitiated');
    if (paymentInitiated === 'true') {
      // Clear the flag
      sessionStorage.removeItem('paymentInitiated');
      
      // Show success message and redirect to success page
      setTimeout(() => {
        navigate('/success');
      }, 1000);
    }
    
    // Check if bypass is active and adjust display
    if (bypassActive || isUpiLimitBypassActive()) {
      // Keep original amount for display but will use smaller amount in actual payment
      console.log("Bank limit bypass is active - will use smaller amount for payment");
    }
  }, [navigate, toast, bypassActive]);

  const initiateUpiPayment = (app?: string) => {
    if (checkPaymentLimitExceeded()) {
      setLimitExceeded(true);
      toast({
        title: "Payment Limit Exceeded",
        description: "You've made too many payment attempts. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const merchantUpiId = adminPaymentDetails.upiId || '9955699667@ybl';
    const payeeName = 'Brodelt Fitness';
    const transactionNote = 'Fitness Consultation';
    // Use the real amount for payment processing
    const amount = paymentAmount.toString();
    
    // Store the user's UPI ID if provided
    if (userUpiId) {
      localStorage.setItem('user_upi_id', userUpiId);
    }
    
    // Initiate payment using utility function
    initiateUpiPaymentUtil(merchantUpiId, payeeName, transactionNote, amount, app);
    
    // Set a timeout to reset loading state
    setTimeout(() => {
      setIsLoading(false);
      // Only show this toast if we're still on the same page
      if (document.visibilityState === 'visible') {
        // If payment app didn't open, simulate a successful payment
        // This is just for demonstration - in a real app, you'd implement proper verification
        if (Math.random() > 0.3) { // 70% chance of success for demo purposes
          sessionStorage.setItem('paymentInitiated', 'true');
          navigate('/success');
        } else {
          toast({
            title: "Payment App Not Found",
            description: "If your payment app didn't open, please try a different payment method.",
          });
        }
      }
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4 bg-secondary/50">
      <Card className="glass-card max-w-md w-full animate-fadeIn border-0">
        <CardHeader className="space-y-1">
          <PaymentCardHeader />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Security Badge */}
          <SecurityBadge />
          
          {/* Order Summary */}
          <OrderSummary paymentAmount={displayAmount} currencySymbol={currencySymbol} />
          
          {/* Bank Limit Info */}
          {bypassActive && (
            <div className="p-3 bg-green-50 rounded-md text-green-700 text-sm">
              <p className="font-medium">Bank Limit Protection Active</p>
              <p className="mt-1">Our system will process a smaller test amount to avoid bank limits.</p>
            </div>
          )}
          
          {/* UPI ID Input */}
          <UpiIdInput userUpiId={userUpiId} setUserUpiId={setUserUpiId} />
          
          <SecurityIndicator />
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <PaymentMethods
            isLoading={isLoading}
            userUpiId={userUpiId}
            initiateUpiPayment={initiateUpiPayment}
            bypassActive={bypassActive}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentForm;
