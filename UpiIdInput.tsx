
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UpiIdInputProps {
  userUpiId: string;
  setUserUpiId: (value: string) => void;
}

const UpiIdInput = ({ userUpiId, setUserUpiId }: UpiIdInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="upiId">Your UPI ID (Optional)</Label>
      <Input 
        id="upiId" 
        type="text" 
        placeholder="yourname@upi"
        value={userUpiId}
        onChange={(e) => setUserUpiId(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        This helps us identify your payment
      </p>
    </div>
  );
};

export default UpiIdInput;
