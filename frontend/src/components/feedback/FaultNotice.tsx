"use client";
import { FAULT_TEXT } from "@/constants/health";
import { useFaultDiagnosis } from "@/hooks/health";

/** On error pages: which layer failed (page, backend or database). */
export function FaultNotice() {
  const fault = useFaultDiagnosis();
  return (
    <p role="status" className="mx-auto mt-4 max-w-md rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
      {fault ? FAULT_TEXT[fault] : "Checking what went wrong…"}
    </p>
  );
}
