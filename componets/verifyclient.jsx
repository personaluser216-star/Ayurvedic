"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { clearShoppingCart } from "@/utils/shoppingcart";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("orderId");
      const success = searchParams.get("success");

      if (!orderId) {
        router.push("/");
        return;
      }

      try {
        await fetch("/api/order/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, success }),
        });

        if (success === "true") {
          clearShoppingCart(); // ✅ will work now
        }

        router.push("/"); // ✅ after cart clear
      } catch (err) {
        console.error(err);
        router.push("/");
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return <p className="text-center mt-20">Verifying payment...</p>;
}
