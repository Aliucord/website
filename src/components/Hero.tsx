

import { motion } from "framer-motion";
import { AliucordLogo } from "./AliucordLogo";
import { useEffect, useRef } from "react";
import MaterialIcon from "./MaterialIcon";


function M3EButtonWithIcon({ icon, label, href, variant = "filled", size = "medium", target, rel, trailingIcon, style, ...rest }) {


  const button = (
    <m3e-button
      variant={variant}
      size={size}
      style={style}
      {...rest}
    >
      {icon && <m3e-icon slot="icon">{icon}</m3e-icon>}
      {label}
      {trailingIcon && <m3e-icon slot="trailing-icon">{trailingIcon}</m3e-icon>}
    </m3e-button>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} style={{ display: "contents" }}>
        {button}
      </a>
    );
  }

  return button;
}

export function Hero() {
  return (
    <section className="relative pt-24 pb-24 md:pt-40 md:pb-40 overflow-hidden">
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <AliucordLogo className="w-48 h-48 md:w-64 md:h-64" animated={false} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-8 font-medium leading-snug"
        >
          <span style={{ fontSize: '1.5rem', fontWeight: 500, fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>A mod for the legacy Discord Android App</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <M3EButtonWithIcon
            icon={<MaterialIcon name="download" />}
            label="Download Manager"
            href="https://github.com/Aliucord/AliucordManager/releases/latest"
            variant="filled"
            size="medium"
            target="_blank"
            rel="noreferrer"
            shape="square"
          />
          <M3EButtonWithIcon
            icon={<MaterialIcon name="book" />}
            label="Guide"
            href="https://github.com/Aliucord/Aliucord#-installation"
            variant="tonal"
            size="medium"
            target="_blank"
            rel="noreferrer"
          />
        </motion.div>
      </div>
    </section>
  );
}
