import { ReactNode } from "react";

type Props = { explanation: string; children: ReactNode };
export function Explanation({ explanation, children }: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 justify-center max-w-[320px]">
        <div className="text-slate-500"
        >{explanation}</div>
        {children}
      </div>
    </div>
  );
}
