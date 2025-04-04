
interface OrderSummaryProps {
  paymentAmount: number;
  currencySymbol: string;
}

const OrderSummary = ({ paymentAmount, currencySymbol }: OrderSummaryProps) => {
  return (
    <div className="bg-secondary/40 rounded-lg p-4 mb-4">
      <h3 className="font-medium text-sm mb-2">Order Summary</h3>
      <div className="flex justify-between text-sm">
        <span>Fitness Consultation Fee</span>
        <span>{currencySymbol}{paymentAmount.toFixed(2)}</span>
      </div>
      <div className="border-t border-border my-2"></div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{currencySymbol}{paymentAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
