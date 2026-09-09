import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function IntroName() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);
  if (hidden) return null;
  const [first, ...rest] = site.name.split(" ");
  return (
    <div className="intro-name" aria-hidden="true">
      <div className="intro-name-inner">
        <span className="intro-kicker">Frontend developer · React · AI</span>
        <p className="intro-title"><span>{first}</span><span>{rest.join(" ")}</span></p>
        <span className="intro-rule" />
        <span className="intro-count">01 <i /> 01</span>
      </div>
    </div>
  );
}
