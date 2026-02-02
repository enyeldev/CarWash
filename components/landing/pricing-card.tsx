import { Card } from "../ui/card";
import { Check, Droplets } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { PlanType } from "@/src/types/landing";

type PricingCardProps = {
  plan: PlanType;
  redirectRoute: string;
};

const PricingCard = ({ plan, redirectRoute }: PricingCardProps) => {
  return (
    <Card
      key={plan.name}
      className={`relative flex flex-col p-6 ${
        plan.highlighted
          ? "border-sky-500 shadow-lg bg-linear-to-b from-sky-100 to-white dark:bg-linear-to-b dark:from-sky-950/50 dark:to-slate-950"
          : "border-border dark:bg-background"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-medium text-white">
            Más popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
          <Droplets className="h-5 w-5 text-sky-600" />
        </div>
        <h3 className="text-xl font-semibold text-background dark:text-foreground">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-background dark:text-foreground">
          {plan.price}
        </span>
        <span className="text-muted-foreground">{plan.period}</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-background dark:text-foreground"
          >
            <Check className="h-4 w-4 text-sky-500" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={
          plan.highlighted
            ? "bg-sky-500 text-white hover:bg-sky-600"
            : "border-sky-200 bg-transparent text-sky-600 hover:bg-sky-50"
        }
        variant={plan.highlighted ? "default" : "outline"}
      >
        <Link href={`${redirectRoute}?plan=${plan.planCode}`}>
          Comenzar ahora
        </Link>
      </Button>
    </Card>
  );
};

export default PricingCard;
