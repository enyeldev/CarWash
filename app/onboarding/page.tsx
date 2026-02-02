import OnBoardginForm from "@/components/onboarding/onBoardginForm";

const OnBoardingPage = () => {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <OnBoardginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Podrás editar esta información y agregar más sucursales desde el
          dashboard.
        </p>
      </div>
    </>
  );
};

export default OnBoardingPage;
