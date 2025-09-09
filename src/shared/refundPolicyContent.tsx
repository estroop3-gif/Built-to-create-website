import { DEPOSIT } from '@/lib/pricing';

export const RefundPolicyContent = () => (
  <div className="text-sm text-charcoal/80 space-y-3">
    <p>• The ${DEPOSIT.toLocaleString()} deposit is non-refundable</p>
    <p>• Refunds apply to the remaining balance only</p>
    <p>• 120 or more days before travel: 75% refundable</p>
    <p>• 90 to 119 days before travel: 50% refundable</p>
    <p>• 60 to 89 days before travel: 25% refundable</p>
    <p>• Fewer than 60 days before travel: non-refundable</p>
    <p>• Taxes already paid are not refunded</p>
  </div>
);