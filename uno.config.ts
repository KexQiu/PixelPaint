// uno.config.ts
import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetUno(),
  ],
});
