"use client";

const StepItem = ({ step, title, subtitle, align, currentStep }) => {
  const active = step <= currentStep;

  const justifyClass =
    align === "start"
      ? "md:justify-start"
      : align === "center"
      ? "md:justify-center"
      : "md:justify-end";

  return (
    <div className={`flex gap-4 w-full md:w-1/3 justify-start ${justifyClass}`}>
      <div
        className={`text-3xl md:text-5xl font-bold ${
          active ? "text-black" : "text-gray-300"
        }`}
      >
        {step.toString().padStart(2, "0")}
      </div>

      <div>
        <p
          className={`font-semibold text-sm md:text-lg ${
            active ? "text-black" : "text-gray-400"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-xs md:text-sm ${
            active ? "text-gray-500" : "text-gray-300"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};
const CheckoutSteps = ({ currentStep }) => {
  return (
    <div className="p-4 md:p-12 bg-gray-100 border-y border-gray-300">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">

        <StepItem
          step={1}
          title="Shopping Cart"
          subtitle="Manage Your Items List"
          align="end"
          currentStep={currentStep}
        />

        <StepItem
          step={2}
          title="Checkout Details"
          subtitle="Checkout your item list"
          align="center"
          currentStep={currentStep}
        />

        <StepItem
          step={3}
          title="Order Complete"
          subtitle="Review Your Order"
          align="start"
          currentStep={currentStep}
        />

      </div>
    </div>
  );
};

export default CheckoutSteps;
