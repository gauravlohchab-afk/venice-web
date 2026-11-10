import { Button } from '../ui/Button'

export function ThankYou({ via, onClose }: { via: 'endpoint' | 'email'; onClose?: () => void }) {
  return (
    <div role="status" className="py-6">
      <p className="font-serif text-5xl">Thank You!</p>
      <p className="mt-4 max-w-md text-graphite">
        {via === 'endpoint'
          ? 'Your request has been received. Our team will contact you to confirm.'
          : 'Your email app has opened with your request addressed to our team. Press send there and we will get back to you to confirm.'}
      </p>
      {onClose && (
        <div className="mt-8">
          <Button onClick={onClose} variant="line" icon={false}>Close</Button>
        </div>
      )}
    </div>
  )
}
