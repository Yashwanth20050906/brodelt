
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resetPaymentLimits, initiateUpiPaymentUtil } from '@/components/payment/UpiPaymentUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
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
  }, [navigate]);
  
  const handlePayment = (app?: string) => {
    setIsLoading(true);
    
    const merchantUpiId = '9955699667@ybl';
    const payeeName = 'Fitness Consultant';
    const transactionNote = 'Fitness Consultation';
    const amount = '25.00';
    
    // Initiate payment using utility function with specific app
    initiateUpiPaymentUtil(merchantUpiId, payeeName, transactionNote, amount, app);
    
    // Set a timeout to reset loading state
    setTimeout(() => {
      setIsLoading(false);
      // Only show this toast if we're still on the same page
      if (document.visibilityState === 'visible') {
        toast({
          title: app ? `${app} Not Found` : "Payment App Not Found",
          description: "If your payment app didn't open, please try again or use a different payment method.",
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/#contact" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to form
            </Link>
          </div>
          
          <div className="mb-6 flex justify-center">
            <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>Secure payment portal - All transactions encrypted</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center min-h-[300px]">
            <Card className="glass-card max-w-md w-full animate-fadeIn border-0">
              <CardHeader className="text-center">
                <CardTitle>Complete Your Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/40 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-sm mb-2">Payment Details</h3>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Consultation Fee</span>
                    <span>₹25.00</span>
                  </div>
                  <div className="border-t border-border my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹25.00</span>
                  </div>
                </div>
                
                <Tabs defaultValue="apps" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="apps">UPI Apps</TabsTrigger>
                    <TabsTrigger value="qr">QR Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="apps" className="space-y-3">
                    <Button 
                      variant="default"
                      className="w-full rounded-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                      onClick={() => handlePayment('phonepe')}
                    >
                      {isLoading ? "Processing..." : "Pay Now with PhonePe ₹25.00"}
                    </Button>
                    
                    <Button 
                      variant="default"
                      className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                      onClick={() => handlePayment('googlepay')}
                    >
                      {isLoading ? "Processing..." : "Pay Now with Google Pay ₹25.00"}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full rounded-full"
                      disabled={isLoading}
                      onClick={() => handlePayment()}
                    >
                      {isLoading ? "Processing..." : "Pay with Other UPI Apps ₹25.00"}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="qr" className="flex flex-col items-center space-y-3">
                    <div className="text-center p-3 bg-blue-50 rounded-md text-blue-700 text-sm mb-2">
                      <p>Open any UPI app and scan this QR code to pay</p>
                    </div>
                    
                    <img 
                      src={`https://upiqr.in/api/qr?pa=9955699667@ybl&pn=Fitness Consultant&am=25.00&cu=INR&tn=Fitness Consultation`} 
                      alt="UPI QR Code" 
                      className="w-52 h-52 border rounded-lg"
                    />
                  </TabsContent>
                </Tabs>
                
                <p className="text-center text-sm text-muted-foreground">
                  By clicking "Pay Now", you will be redirected to your selected UPI payment app to complete the transaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
