import { Progress } from "@/components/ui/progress";

const STEPS = ["Upload Target", "Upload Compare", "Process", "Compare"] as const;

export default function Stepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  const progressValue = currentStep * 25;

  return (
    <div data-testid="stepper" className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-500 px-1">
        {STEPS.map((label, idx) => {
          const stepNumber = idx + 1;
          return (
            <span
              key={label}
              className={stepNumber === currentStep ? "text-primary font-bold" : undefined}
            >
              {stepNumber}. {label}
            </span>
          );
        })}
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
}
