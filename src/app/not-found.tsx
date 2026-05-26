import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';

export default function NotFound() {
  return (
    <div className="container-pp py-32 md:py-48">
      <p className="label-mono mb-4">— Error · 404</p>
      <h1 className="display text-6xl md:text-8xl text-ice mb-6">
        Off the <span className="text-gold">field.</span>
      </h1>
      <p className="text-iceDim max-w-xl mb-10 leading-relaxed">
        The page you're looking for isn't on the depth chart. It may be coming
        soon, or it may not exist. Head back to a published surface.
      </p>
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/" variant="primary">Back to Home</CTAButton>
        <CTAButton href="/divisions/afc-west" variant="secondary">
          Open AFC West
        </CTAButton>
      </div>
    </div>
  );
}
