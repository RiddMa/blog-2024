import Image from "next/image";
import React from "react";

export function ImageAwesome({ src, alt, className, halo = true }: {
  src: string,
  alt: string,
  className?: string,
  halo?: boolean
}) {
  return <span className={`relative ${className}`}>
    {halo && <Image aria-hidden={true} src={src} alt={alt}
                    className="card absolute blur-3xl brightness-150 contrast-[0.8] saturate-200 opacity-50 dark:opacity-30"
                    width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto", margin: 0 }} />
    }
    <Image src={src} alt={alt} className="card relative" width={0} height={0} sizes="100vw"
           style={{ width: "100%", height: "auto", margin: 0 }} />
  </span>;
}
