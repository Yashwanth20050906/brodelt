
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminPaymentDetailsProps {
  upiId: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
}

const AdminPaymentSettings = () => {
  const { toast } = useToast();
  const [paymentConfig, setPaymentConfig] = useState({
    amount: 25,
    currency: 'INR',
  });
  const [paymentDetails, setPaymentDetails] = useState<AdminPaymentDetailsProps>({
    upiId: '9955699667@ybl',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load payment config from localStorage
    const storedConfig = localStorage.getItem('brodelt_payment_config');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        setPaymentConfig({
          amount: config.amount || 25,
          currency: config.currency || 'INR',
        });
      } catch (error) {
        console.error('Failed to parse payment config:', error);
      }
    }

    // Load payment details from localStorage
    const storedDetails = localStorage.getItem('brodelt_admin_payment_details');
    if (storedDetails) {
      try {
        setPaymentDetails(JSON.parse(storedDetails));
      } catch (error) {
        console.error('Failed to parse payment details:', error);
      }
    } else {
      // If no stored details, save the default UPI ID
      localStorage.setItem('brodelt_admin_payment_details', JSON.stringify(paymentDetails));
    }
  }, []);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        setPaymentConfig({
          ...paymentConfig,
          amount: numValue,
        });
      }
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setPaymentConfig({
      ...paymentConfig,
      currency,
    });
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const saveConfig = () => {
    setIsLoading(true);
    
    try {
      // Save payment config
      localStorage.setItem('brodelt_payment_config', JSON.stringify({
        amount: paymentConfig.amount,
        currency: paymentConfig.currency,
      }));
      
      // Save payment details
      localStorage.setItem('brodelt_admin_payment_details', JSON.stringify(paymentDetails));
      
      toast({
        title: "Settings Saved",
        description: "Your payment settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: "Error",
        description: "Failed to save payment settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
        <CardDescription>
          Configure payment amount, currency, and account details for receiving payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Payment Configuration</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="1"
                step="0.01"
                value={paymentConfig.amount}
                onChange={handleConfigChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Currency</Label>
              <Tabs 
                defaultValue={paymentConfig.currency} 
                onValueChange={handleCurrencyChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="INR">₹ INR</TabsTrigger>
                  <TabsTrigger value="USD">$ USD</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">UPI Details for Receiving Payments</h3>
          
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              name="upiId"
              placeholder="yourname@upi"
              value={paymentDetails.upiId}
              onChange={handlePaymentDetailsChange}
            />
            <p className="text-sm text-muted-foreground">UPI ID for receiving direct payments (Default: 9955699667@ybl)</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Holder Name (Optional)</Label>
            <Input
              id="accountName"
              name="accountName"
              placeholder="Account holder name"
              value={paymentDetails.accountName}
              onChange={handlePaymentDetailsChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number (Optional)</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                placeholder="Account number"
                value={paymentDetails.accountNumber}
                onChange={handlePaymentDetailsChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code (Optional)</Label>
              <Input
                id="ifscCode"
                name="ifscCode"
                placeholder="IFSC code"
                value={paymentDetails.ifscCode}
                onChange={handlePaymentDetailsChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={saveConfig} 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminPaymentSettings;
