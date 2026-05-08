import { Link } from 'react-router-dom';
import { useSnacksDrinks } from '@/lib/useSnacksDrinks';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function FoodsPage() {
  const { availableItems } = useSnacksDrinks();
  const revealRef = useScrollReveal();
  const items = availableItems();

  return (
    <div ref={revealRef}>
      {/* Hero header */}
      <section className="section-dark py-32 text-center">
        <div className="container mx-auto px-6">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-2 opacity-0 animate-fade-up">
            In-Room Dining
          </p>
          <h1
            className="font-display text-5xl opacity-0 animate-fade-up"
            style={{ color: 'hsl(40, 10%, 90%)', animationDelay: '0.15s' }}
          >
            Foods &amp; Drinks
          </h1>
          <div
            className="mx-auto mt-4 h-[2px] bg-gold opacity-0 animate-draw-line"
            style={{ maxWidth: '80px', animationDelay: '0.4s' }}
          />
        </div>
      </section>

      {/* Items grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-start mb-10 scroll-reveal">
            <Link to="/" className="btn-outline-gold inline-flex items-center gap-2 magnetic-hover">
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24 scroll-reveal">
              <ShoppingBag size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">No available items at the moment.</p>
            </div>
          ) : (
            <>
              {/* Snacks */}
              {items.filter(i => i.type === 'Snack').length > 0 && (
                <div className="mb-16">
                  <h2 className="font-display text-2xl mb-8 scroll-reveal">
                    <span className="gold-text">Snacks</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.filter(i => i.type === 'Snack').map((item, idx) => (
                      <div
                        key={item.id}
                        className="card-3d overflow-hidden bg-card scroll-reveal"
                        style={{ transitionDelay: `${idx * 80}ms` }}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20">
                              Available
                            </span>
                            <span className="text-xl font-bold text-gold">₱{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drinks */}
              {items.filter(i => i.type === 'Drink').length > 0 && (
                <div>
                  <h2 className="font-display text-2xl mb-8 scroll-reveal">
                    <span className="gold-text">Drinks</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.filter(i => i.type === 'Drink').map((item, idx) => (
                      <div
                        key={item.id}
                        className="card-3d overflow-hidden bg-card scroll-reveal"
                        style={{ transitionDelay: `${idx * 80}ms` }}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20">
                              Available
                            </span>
                            <span className="text-xl font-bold text-gold">₱{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
