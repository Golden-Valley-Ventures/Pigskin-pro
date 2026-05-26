import { PageHero } from '@/components/PageHero';
import { CTAButton } from '@/components/CTAButton';

export const metadata = {
  title: 'About',
  description: 'About Pigskin Professionals — the institution behind Pigskin.pro.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        fileNumber="FILE 120 / 124"
        title={<>One company. <span className="text-gold">One product.</span> One rule.</>}
        description="Pigskin Professionals is the institution. Pigskin.pro is the product. The company gets the credibility. The product gets the spotlight."
      />

      <div className="container-pp pb-24">
        <section className="py-12 grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="label-mono mb-3">— Mission</p>
            <h2 className="display text-2xl text-ice">Built for people who actually watch the tape.</h2>
          </div>
          <div className="space-y-6 max-w-3xl text-ice/85 leading-relaxed">
            <p>
              Pigskin.pro exists for serious fantasy managers, dynasty players,
              and football obsessives who want organized, verified, actionable
              NFL analysis. We don't chase clicks. We don't run hot takes. We
              don't tell you what to think.
            </p>
            <p>
              We tell you what the research says — and we tell you when the
              research isn't ready yet. Sections marked Pending Verification
              are intentionally withheld until source material is approved.
              That discipline is the product.
            </p>
            <p>
              The site rolls out division by division. AFC West first. Same
              standard everywhere after.
            </p>
          </div>
        </section>

        <section className="py-12 border-t border-slate3 grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="label-mono mb-3">— Discipline</p>
            <h2 className="display text-2xl text-ice">Research integrity rules.</h2>
          </div>
          <ul className="space-y-4 max-w-3xl">
            {[
              'No invented stats. No fabricated player notes.',
              'No fake projections. No imaginary rankings.',
              'No tout content. No locks. No guaranteed edges.',
              'No paywall claims for products that don\u2019t exist yet.',
              'No "AI magic" language. Discipline beats hype.',
              'Pending Verification means pending. Not eventually. Not soon. Pending.',
            ].map((rule, i) => (
              <li key={i} className="flex gap-4 text-ice/90">
                <span className="font-mono text-gold text-xs pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-12 border-t border-slate3 grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="label-mono mb-3">— Naming</p>
            <h2 className="display text-2xl text-ice">Two names. One company.</h2>
          </div>
          <div className="space-y-6 max-w-3xl text-ice/85 leading-relaxed">
            <div className="border-l-2 border-gold/60 pl-6">
              <p className="label-mono mb-2">— Legal Entity</p>
              <p className="display text-3xl text-ice">
                PIGSKIN <span className="text-gold">PROFESSIONALS</span>
              </p>
            </div>
            <div className="border-l-2 border-slate3 pl-6">
              <p className="label-mono mb-2">— Public Brand</p>
              <p className="display text-3xl text-ice">
                PIGSKIN<span className="text-gold">.PRO</span>
              </p>
            </div>
            <p>
              Pigskin Professionals is the institution — what you'll see in
              legal docs and contracts. Pigskin.pro is the product — what
              users open, type into a browser, and tell their friends.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-slate3 text-center">
          <p className="label-mono mb-3">— The Line</p>
          <p className="display text-4xl md:text-6xl text-ice mb-8">
            We don't have takes.<br /><span className="text-gold">We have reads.</span>
          </p>
          <CTAButton href="/divisions/afc-west" variant="primary">
            See the work
          </CTAButton>
        </section>
      </div>
    </>
  );
}
