// DemoOne.tsx
import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useContent } from '@/contexts/ContentContext';
import { leadzapTestimonials, LeadZapTestimonial } from '../leadzap-testimonials.ts';
import { cn } from '@/lib/utils';
import { Marquee } from './3d-testimonials'; // 你的现有组件

function TestimonialCard(props: LeadZapTestimonial) {
  const { img, name, username, body, country, metrics, service } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * 10;   // 倾斜幅度
    const ry = (px - 0.5) * -12;
    setTilt({ rx, ry });
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  }
  function onLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <Card
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative w-80 bg-black/60 border-white/10 hover:border-yellow-400/50 transition-all",
        "transform-gpu will-change-transform hover:-translate-y-1",
        "rounded-xl"
      )}
      style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
    >
      {/* 追随式光斑 */}
      <div className="pointer-events-none absolute inset-0 rounded-xl [mask-image:radial-gradient(300px_circle_at_var(--x,50%)_var(--y,50%),black,transparent_60%)] bg-[radial-gradient(300px_300px_at_var(--x,50%)_var(--y,50%),rgba(250,204,21,0.18),transparent_40%)]" />
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 ring-1 ring-white/10">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-yellow-400/10 text-yellow-300">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-[15px] font-semibold text-gray-100 flex items-center gap-1">
              {name} <span className="text-xs text-gray-400">{country}</span>
            </figcaption>
            <p className="text-[12px] font-medium text-gray-400">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-[15px] text-gray-100 leading-snug">“{body}”</blockquote>
        {(metrics || service) && (
          <div className="mt-3 inline-flex items-center rounded-md border border-yellow-400/40 bg-yellow-400/10 px-2 py-0.5 text-[11px] text-yellow-300">
            {metrics} {service ? `• ${service}` : ''}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DemoOne({
  testimonials,
  className,
}: {
  testimonials?: LeadZapTestimonial[];
  className?: string;
}) {
  const fromContext = useContent?.()?.testimonials as LeadZapTestimonial[] | undefined;
  const data = testimonials?.length ? testimonials : (fromContext?.length ? fromContext : leadzapTestimonials);

  return (
    <div className="relative">
      {/* Outward feather effect - blending to gray-900 */}
      <div className="absolute -inset-12 pointer-events-none">
        {/* Top outward feather */}
        <div className="absolute -top-12 left-0 right-0 h-24 bg-gradient-to-b from-gray-900 via-gray-900/70 to-transparent rounded-t-3xl" />
        {/* Bottom outward feather */}
        <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent rounded-b-3xl" />
        {/* Left outward feather */}
        <div className="absolute top-0 bottom-0 -left-12 w-24 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent rounded-l-3xl" />
        {/* Right outward feather */}
        <div className="absolute top-0 bottom-0 -right-12 w-24 bg-gradient-to-l from-gray-900 via-gray-900/70 to-transparent rounded-r-3xl" />
      </div>

      <div
        className={cn(
          "relative flex h-[32rem] w-full max-w-[1100px] flex-row items-center justify-center overflow-hidden gap-2",
          "rounded-2xl",
          "bg-gradient-to-b from-black to-gray-900/60",
          "[perspective:1000px]",
          className
        )}
      >
        {/* Inward feathered edges overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl">
          {/* Top feather */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
          {/* Bottom feather */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
          {/* Left feather */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          {/* Right feather */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/60 to-transparent z-10" />
        </div>
      <div
        className="flex flex-row items-center gap-5 will-change-transform"
        style={{
          transform:
            'translateX(-120px) translateY(0px) translateZ(-140px) rotateX(20deg) rotateY(-10deg) rotateZ(16deg)',
        }}
      >
        {/* Downwards */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:42s]">
          {data.map((review) => (
            <TestimonialCard key={review.username + '-1'} {...review} />
          ))}
        </Marquee>
        {/* Upwards */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:44s]">
          {data.map((review) => (
            <TestimonialCard key={review.username + '-2'} {...review} />
          ))}
        </Marquee>
        {/* Downwards */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:46s]">
          {data.map((review) => (
            <TestimonialCard key={review.username + '-3'} {...review} />
          ))}
        </Marquee>
        {/* Upwards */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:48s]">
          {data.map((review) => (
            <TestimonialCard key={review.username + '-4'} {...review} />
          ))}
        </Marquee>
      </div>
      </div>
    </div>
  );
}
