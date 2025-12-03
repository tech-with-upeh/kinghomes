"use client";
import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.jpg";
import { XIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


function page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const params = useSearchParams();
    const router = useRouter();
    const email = params.get("email");
    async function CreateUser(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const otp1 = formData.get("otp0");
        const otp2 = formData.get("otp1");
        const otp3 = formData.get("otp2");
        const otp4 = formData.get("otp3");
        const otp5 = formData.get("otp4");
        const otp6 = formData.get("otp5");
        console.log(otp1, otp2, otp3, otp4, otp5, otp6);
        const res = await fetch("/api/auth/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otp1,
            otp2,
            otp3,
            otp4,
            otp5,
            otp6,
            email
          })
        });

        console.log(res.body);
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.error) {
          setError(true);
        }
        setMsg(data.message || data.error);
        router.push("/dashboard");
      }
      const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
      
        const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
          const input = e.currentTarget;
          input.value = input.value.replace(/[^0-9]/g, ""); // only digits
      
          if (input.value && index < 5) {
            inputsRef.current[index + 1]?.focus(); // auto jump
          }
        };
      
        const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus(); // auto go back
          }
        };
    return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={bg}
              alt="Background"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
    
          {/* Glassmorphism Card */}
          <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
              <p className="text-white/70">We sent a verification email to {email} </p>
            </div>
    
            <form className="space-y-6" onSubmit={CreateUser}>
    
              {
                msg != "" && (
                  <div className="w-full flex items-center justify-center">
  <div
    className={`
      flex items-center gap-4 px-6 py-4
      rounded-2xl shadow-xl border backdrop-blur-md
      animate-[fadeInUp_0.35s_ease]
      ${error ? "border-red-400/40 bg-red-500/20" : "border-green-400/40 bg-green-500/20"}
    `}
  >
    <div
      className={`
        w-10 h-10 flex items-center justify-center rounded-xl
        ${error ? "bg-red-600/80" : "bg-green-600/80"}
      `}
    >
      <XIcon size={22} color="white" />
    </div>

    <h1 className="text-white text-lg font-medium tracking-wide">
      {msg}
    </h1>
  </div>
</div>

                )
              }
              
              
              <div className="space-y-2">
                <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el; // <- NO return value
          }}
          name={`otp${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onInput={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-15 h-15 text-center text-2xl rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        />
      ))}
    </div>
              </div>
    

    
              
              {
                loading ? (
                  <div className="flex items-center justify-center gap-2">
        <svg
          className="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Loading...
      </div>
                )  : (<button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg mt-4"
              >
                Verify
              </button>)
              }
    
              
              
              
            </form>
    
            
          </div>
        </div>
  )
}

export default page