import { Suspense } from "react";
import VerifyClient from "@/componets/verifyclient";

export const dynamic = "force-dynamic";

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Verifying payment...</p>}>
      <VerifyClient />
    </Suspense>
  );
}
