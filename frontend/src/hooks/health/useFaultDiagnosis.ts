"use client";
import { useEffect, useState } from "react";
import { FAULT_TEXT } from "@/constants/health";
import { emitMascot } from "@/hooks/mascot/mascotEvents";
import type { Fault } from "@/types/health";
import { checkHealth, faultOf } from "./healthApi";

const DIAGNOSIS_TIMEOUT_MS = 15000;

/** After a page failed: which layer broke (null while checking). The mascot reacts too. */
export function useFaultDiagnosis() {
  const [fault, setFault] = useState<Fault | null>(null);
  useEffect(() => {
    checkHealth(DIAGNOSIS_TIMEOUT_MS).then((health) => {
      const found = faultOf(health);
      setFault(found);
      emitMascot(found === "backend" ? "sleepy" : "worried", FAULT_TEXT[found]);
    });
  }, []);
  return fault;
}
