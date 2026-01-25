import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Testimonials({ testimonials = defaultTestimonials }) {
  return (
    <div className="px-6 py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from students using Code-A-Robot.
          </p>
          {/* Review CTA will sit below the testimonials grid */}
        </div>
        <div
          className={
            (testimonials?.length ?? 0) === 1
              ? 'grid grid-cols-1 gap-8 justify-items-center'
              : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        >
          {testimonials.map((t) => (
            <Card key={t.id} className="border-border/50 hover:shadow-lg transition-shadow max-w-md w-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {initials(t.name)}
                  </div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[t.role, t.team, t.location].filter(Boolean).join(' • ')}
                    </div>
                  </div>
                </div>

                {typeof t.rating === 'number' && (
                  <div className="flex items-center gap-1 mb-3" aria-label={`Rating ${t.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? 'text-amber-400' : 'text-muted-foreground/30'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                <p className="text-muted-foreground leading-relaxed flex-1">{t.quote}</p>

                {t.highlight && (
                  <div className="mt-4 text-xs text-muted-foreground/80">
                    {t.highlight}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="sm">
            <a
              href="https://forms.gle/qX2kMSiD2Cfwy2w4A"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leave a review for Code-A-Robot"
            >
              Leave a review
              <span className="ml-2">→</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  return String(first).toUpperCase();
}

const defaultTestimonials = [
  {
    id: 'carsten',
    name: 'Carsten',
    location: 'Michigan',
    quote:
      "I was overwhelmed when it came to learning JAVA, but Code-A-Robot gave me a great starting point and helped me get to a place where I could put code on one of my team's robots within a week. I have now completed the entire course and I now feel like I have the foundation to be a programmer. Overall, Code-A-Robot is amazing and I would recommend it to anyone who wants to be a coder.",
  },
];
