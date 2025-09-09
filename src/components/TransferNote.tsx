interface TransferNoteProps {
  from: string;
  to: string;
  duration?: string;
}

export default function TransferNote({ from, to, duration }: TransferNoteProps) {
  return (
    <div className="bg-forest/10 border-l-4 border-forest rounded-r-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-forest flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <div>
          <p className="font-semibold text-charcoal">Transfer Day</p>
          <p className="text-sm text-charcoal/70">
            {from} → {to}
            {duration && <span className="ml-2">({duration})</span>}
          </p>
        </div>
      </div>
    </div>
  );
}