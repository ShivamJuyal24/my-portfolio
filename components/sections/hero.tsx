import Image from "next/image";
import { profile } from "@/data/profile";
import { TypingText } from "@/components/sections/typing-text";
import { ViewCounter } from "@/components/sections/view-counter";

const phrases = [profile.role, "Always learning", "Trying to do better"];

export function Hero() {
  return (
    <div className="relative flex items-center gap-5 p-5">
      <ViewCounter className="absolute right-5 top-5" />

      <Image
        src="/projects/profile.jpeg"
        alt={profile.name}
        width={500}
        height={500}
        className="size-24 shrink-0 rounded-2xl object-cover border border-border"
      />

      <div className="min-w-0">
        <h1 className="text-3xl font-semibold sm:text-4xl">{profile.name}</h1>
        <TypingText prefix="23" phrases={phrases} />
        <p className="mt-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {profile.status}
        </p>
      </div>
    </div>
  );
}