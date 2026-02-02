import PricingCard from "./pricing-card";
import { plans } from "@/src/const";

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted dark:bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-background dark:text-foreground sm:text-4xl">
            Precios simples y{" "}
            <span className="text-sky-500">transparentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Sin costos ocultos ni compromisos. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.planCode} plan={plan} redirectRoute="/signup" />
          ))}
        </div>
      </div>
    </section>
  );
}
