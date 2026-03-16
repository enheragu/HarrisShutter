(() => {
  const CHANNELS = {
    RGB: ['R', 'G', 'B'],
    CYM: ['C', 'Y', 'M'],
    CUSTOM: ['K1', 'K2', 'K3']
  };

  const MODE_SAMPLE_FILES = {
    RGB: ['R.JPG', 'G.JPG', 'B.JPG'],
    CYM: ['C.png', 'Y.png', 'M.png'],
    CUSTOM: ['R.JPG', 'G.JPG', 'B.JPG']
  };

  const PRESETS = {
    autumn: ['#C65D2E', '#E0A458', '#4B7A52'],
    neon: ['#FF2E93', '#33FFD1', '#8B5CFF'],
    earth: ['#7B5E3B', '#B08E5A', '#4D7A4A']
  };

  const i18n = {
    en: {
      subtitle: 'RGB/CYM channel fusion for Harris Shutter composites',
      introTitle: 'What is Harris Shutter?',
      introText: 'Harris Shutter was originally a device that could take an image alternating three different color filters in succesion. This way the exposure time of that image was split into three subexposures that would capture a different color. With digital images, a similar effect can be obtained by getting a single channel from three different images and merging them together. When there is change between the images, the mix of colors creates a unique visual effect depending on which channels get mixed. Depending on the illumination and colors in the scene the results follow an additive pattern in which red, green and blue can be differentiated; if the scene is brighter the result follows a more subtractive pattern in which cyan, yellow and magenta can be differentiated. This web tool lets you play with three images and both RGB and CYM color representation to achieve different results. As an extra there is a custom mode that lets you choose custom colors for each sub-image. Note that if no complementary colors are selected, the image can lose information as not the whole original spectrum will be covered. Once the image is generated, it can be finetuned with some basic adjustments before downloading.',
      cfgTitle: 'Fusion setup',
      mode: 'Color mode',
      modeRGB: 'RGB',
      modeCYM: 'CYM',
      modeCustom: 'Custom',
      presets: 'Presets',
      presetAutumn: 'Autumn',
      presetNeon: 'Neon',
      presetEarth: 'Earth',
      view: 'View',
      browse: 'Browse',
      noImageSelected: 'No image selected',
      source: 'Image',
      customColor: 'Custom color',
      chooseColor: 'Choose a color',
      colorMap: 'Color map',
      hue: 'Hue',
      palette: 'Palette',
      dropHint: 'Drag & drop image here or tap to choose',
      sampleHint: 'Drag to replace',
      expand: 'Expand',
      close: 'Close',
      clear: 'Clear',
      preview: 'Image preview',
      viewOriginal: 'Original',
      viewChannel: 'Channel',
      prev: 'Previous image',
      next: 'Next image',
      outputEditTitle: 'Output edits',
      outputEditHint: 'Basic non-destructive adjustments for the generated output before download.',
      reset: 'Reset edits',
      brightness: 'Brightness',
      contrast: 'Contrast',
      temperature: 'Temperature',
      tint: 'Tint',
      saturation: 'Saturation',
      gamma: 'Gamma',
      generate: 'Generate fusion',
      download: 'Download image',
      output: 'Output',
      statusReady: 'Load three images and generate.',
      statusNeedImages: 'Please load all three images.',
      statusNeedUnique: 'Each source must be assigned to a different channel.',
      statusDone: (w, h, mode) => `Fusion generated: ${w}×${h} (${mode}).`,
      footerSource: 'HR python version:',
      footerAuthor: 'Author:'
    },
    es: {
      subtitle: 'Fusión de canales RGB/CYM para composiciones Harris Shutter',
      introTitle: '¿Qué es Harris Shutter?',
      introText: 'El obturador de Harris era, originalmente, un dispositivo capaz de capturar una imagen alternando una sucesión de tres filtros de color diferentes. De esta manera, el tiempo de exposición de la imagen se divide en tres subexposiciones, cada una registrando la escena en una tonalidad diferente. En fotografía digital, un efecto similar puede lograrse tomando un canal único de tres imágenes diferentes y combinándolos. Cuando hay movimiento o cambios entre las imágenes, la mezcla de colores produce un efecto visual característico que depende de qué canales se combinen. Según la iluminación y los colores de la escena, los resultados pueden seguir un patrón aditivo, donde se distinguen más claramente el rojo, el verde y el azul; o, si la escena es más brillante, un patrón de color sustractivo, en el que se diferencian el cian, el amarillo y el magenta. Esta herramienta permite experimentar con tres imágenes y con las representaciones de color RGB y CYM para obtener distintos resultados. Como extra tienes un modo personalizable, donde pudes elegir otros colores a extraer. Ten en cuenta que si no se eligen colores complementarios la imagen podría perder información al no cubrir por completo el espectro original de la escena. Una vez generada, la imagen resultante puede ajustarse con algunas correcciones básicas antes de descargarla.',
      cfgTitle: 'Configuración de fusión',
      mode: 'Modo de color',
      modeRGB: 'RGB',
      modeCYM: 'CYM',
      modeCustom: 'Libre',
      presets: 'Presets',
      presetAutumn: 'Otoño',
      presetNeon: 'Neón',
      presetEarth: 'Tierra',
      view: 'Vista',
      browse: 'Examinar',
      noImageSelected: 'Ninguna imagen seleccionada',
      source: 'Imagen',
      customColor: 'Color libre',
      chooseColor: 'Elegir color',
      colorMap: 'Mapa de color',
      hue: 'Tono',
      palette: 'Paleta',
      dropHint: 'Arrastra imagen aquí o toca para elegir',
      sampleHint: 'Arrastra para reemplazar',
      expand: 'Ampliar',
      close: 'Cerrar',
      clear: 'Borrar',
      preview: 'Vista ampliada',
      viewOriginal: 'Original',
      viewChannel: 'Canal',
      prev: 'Imagen anterior',
      next: 'Imagen siguiente',
      outputEditTitle: 'Edición de salida',
      outputEditHint: 'Ajustes básicos no destructivos sobre la salida generada antes de descargar.',
      reset: 'Restablecer ajustes',
      brightness: 'Brillo',
      contrast: 'Contraste',
      temperature: 'Temperatura',
      tint: 'Tinte',
      saturation: 'Saturación',
      gamma: 'Gamma',
      generate: 'Generar fusión',
      download: 'Descargar imagen',
      output: 'Salida',
      statusReady: 'Carga tres imágenes y genera.',
      statusNeedImages: 'Carga las tres imágenes.',
      statusNeedUnique: 'Cada fuente debe asignarse a un canal distinto.',
      statusDone: (w, h, mode) => `Fusión generada: ${w}×${h} (${mode}).`,
      footerSource: 'Version python de HR:',
      footerAuthor: 'Autor:'
    }
  };

  const state = {
    lang: 'en',
    theme: 'dark',
    mode: 'RGB',
    viewMode: 'original',
    slots: [
      { image: null, fileName: '', isSample: false },
      { image: null, fileName: '', isSample: false },
      { image: null, fileName: '', isSample: false }
    ],
    outputReady: false,
    outputBaseImageData: null,
    outputAdjustments: {
      brightness: 0,
      contrast: 0,
      temperature: 0,
      tint: 0,
      saturation: 0,
      gamma: 0
    },
    customColors: ['#FF4D4D', '#A66B2F', '#40B56A'],
    customPreset: null,
    activeCustomSlot: null,
    pickerHsv: { h: 0, s: 0, v: 100 },
    modalItemKey: null
  };

  const dom = {
    themeButton: document.getElementById('btn-theme'),
    btnEn: document.getElementById('btn-en'),
    btnEs: document.getElementById('btn-es'),
    subtitle: document.getElementById('subtitle'),
    introTitle: document.getElementById('intro-title'),
    introText: document.getElementById('intro-text'),
    cfgTitle: document.getElementById('cfg-title'),
    modeLabel: document.getElementById('lbl-mode'),
    modeButtons: [
      document.getElementById('btn-mode-rgb'),
      document.getElementById('btn-mode-cym'),
      document.getElementById('btn-mode-custom')
    ],
    customPresetsLabel: document.getElementById('lbl-custom-presets'),
    customPresetButtons: Array.from(document.querySelectorAll('[data-custom-preset]')),
    globalViewLabel: document.getElementById('lbl-global-view'),
    allViewButtons: Array.from(document.querySelectorAll('[data-view-mode]')),
    srcTitle: [
      document.getElementById('src1-title'),
      document.getElementById('src2-title'),
      document.getElementById('src3-title')
    ],
    srcDropHint: [
      document.getElementById('src1-drop-hint'),
      document.getElementById('src2-drop-hint'),
      document.getElementById('src3-drop-hint')
    ],
    sourceCards: Array.from(document.querySelectorAll('.source-card[data-slot]')),
    sourceGrid: document.getElementById('source-grid'),
    workflowSymbols: document.querySelector('.workflow-symbols'),
    langSwitcher: document.querySelector('.lang-switcher'),
    expandButtons: Array.from(document.querySelectorAll('.btn-preview-expand')),
    clearButtons: Array.from(document.querySelectorAll('.btn-preview-delete')),
    fileInputs: [
      document.getElementById('file-0'),
      document.getElementById('file-1'),
      document.getElementById('file-2')
    ],
    fileLabels: [
      document.getElementById('file-label-0'),
      document.getElementById('file-label-1'),
      document.getElementById('file-label-2')
    ],
    fileNameDisplays: [
      document.getElementById('file-name-0'),
      document.getElementById('file-name-1'),
      document.getElementById('file-name-2')
    ],
    assignSelects: [
      document.getElementById('assign-0'),
      document.getElementById('assign-1'),
      document.getElementById('assign-2')
    ],
    customSwatches: [
      document.getElementById('custom-swatch-0'),
      document.getElementById('custom-swatch-1'),
      document.getElementById('custom-swatch-2')
    ],
    customColorControls: Array.from(document.querySelectorAll('.custom-color-control[data-custom-slot]')),
    previewCanvases: [
      document.getElementById('preview-0'),
      document.getElementById('preview-1'),
      document.getElementById('preview-2')
    ],
    generateButton: document.getElementById('btn-generate'),
    downloadButton: document.getElementById('btn-download'),
    status: document.getElementById('status'),
    outputTitle: document.getElementById('out-title'),
    outputCanvas: document.getElementById('output-canvas'),
    imageModalOverlay: document.getElementById('image-modal-overlay'),
    imageModalCanvas: document.getElementById('image-modal-canvas'),
    imageModalTitle: document.getElementById('image-modal-title'),
    imageModalViewLabel: document.getElementById('lbl-image-modal-view'),
    imageModalViewGroup: document.getElementById('image-modal-view-group'),
    imagePrevButton: document.getElementById('btn-image-prev'),
    imageNextButton: document.getElementById('btn-image-next'),
    closeImageModalButton: document.getElementById('btn-close-image-modal'),
    outputEditTitle: document.getElementById('output-edit-title'),
    outputEditHint: document.getElementById('output-edit-hint'),
    outputResetButton: document.getElementById('btn-output-reset'),
    outputBrightnessLabel: document.getElementById('lbl-output-brightness'),
    outputContrastLabel: document.getElementById('lbl-output-contrast'),
    outputTemperatureLabel: document.getElementById('lbl-output-temperature'),
    outputTintLabel: document.getElementById('lbl-output-tint'),
    outputSaturationLabel: document.getElementById('lbl-output-saturation'),
    outputGammaLabel: document.getElementById('lbl-output-gamma'),
    outputBrightnessValue: document.getElementById('val-output-brightness'),
    outputContrastValue: document.getElementById('val-output-contrast'),
    outputTemperatureValue: document.getElementById('val-output-temperature'),
    outputTintValue: document.getElementById('val-output-tint'),
    outputSaturationValue: document.getElementById('val-output-saturation'),
    outputGammaValue: document.getElementById('val-output-gamma'),
    outputBrightness: document.getElementById('output-brightness'),
    outputContrast: document.getElementById('output-contrast'),
    outputTemperature: document.getElementById('output-temperature'),
    outputTint: document.getElementById('output-tint'),
    outputSaturation: document.getElementById('output-saturation'),
    outputGamma: document.getElementById('output-gamma'),
    footerSource: document.getElementById('footer-source'),
    footerAuthor: document.getElementById('footer-author'),
    colorPickerDialog: document.getElementById('color-picker-dialog'),
    btnColorPickerClose: document.getElementById('btn-close-color'),
    colorPickerTitle: document.getElementById('color-picker-title'),
    colorMapLabel: document.getElementById('lbl-color-map'),
    colorHueLabel: document.getElementById('lbl-modal-hue'),
    colorPaletteLabel: document.getElementById('lbl-modal-palette'),
    modalSv: document.getElementById('modal-sv'),
    modalSvThumb: document.getElementById('modal-sv-thumb'),
    modalHue: document.getElementById('modal-hue'),
    modalHex: document.getElementById('modal-hex'),
    modalR: document.getElementById('modal-r'),
    modalG: document.getElementById('modal-g'),
    modalB: document.getElementById('modal-b'),
    modalPaletteChips: Array.from(document.querySelectorAll('#color-picker-dialog .palette-chip'))
  };

  function detectLanguage() {
    const p = new URLSearchParams(window.location.search);
    const qLang = (p.get('lang') || '').toLowerCase();
    if (qLang === 'es' || qLang === 'en') return qLang;
    const browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('es') ? 'es' : 'en';
  }

  function setTheme(theme) {
    state.theme = theme === 'light' ? 'light' : 'dark';
    document.body.classList.toggle('dark', state.theme === 'dark');
    if (dom.themeButton) {
      dom.themeButton.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
      dom.themeButton.classList.remove('is-animating');
      void dom.themeButton.offsetWidth;
      dom.themeButton.classList.add('is-animating');
      window.setTimeout(() => dom.themeButton.classList.remove('is-animating'), 280);
    }
    try {
      localStorage.setItem('theme', state.theme);
    } catch (_e) {}
  }

  function initTheme() {
    let saved = 'dark';
    try {
      saved = localStorage.getItem('theme') || 'dark';
    } catch (_e) {
      saved = 'dark';
    }
    setTheme(saved === 'light' ? 'light' : 'dark');
    dom.themeButton?.addEventListener('click', () => {
      setTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  function normalizeHexColor(value, fallback = '#808080') {
    const raw = String(value || '').trim().replace(/^#/, '');
    const expanded = raw.length === 3 ? raw.split('').map((ch) => `${ch}${ch}`).join('') : raw;
    if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return fallback.toUpperCase();
    return `#${expanded.toUpperCase()}`;
  }

  function hexToRgb(hex) {
    const normalized = normalizeHexColor(hex);
    return [
      parseInt(normalized.slice(1, 3), 16),
      parseInt(normalized.slice(3, 5), 16),
      parseInt(normalized.slice(5, 7), 16)
    ];
  }

  function rgbToHex(r, g, b) {
    const clamp = (v) => Math.max(0, Math.min(255, Math.round(Number(v) || 0)));
    return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`.toUpperCase();
  }

  function rgbToHsv(r, g, b) {
    const rn = (r || 0) / 255;
    const gn = (g || 0) / 255;
    const bn = (b || 0) / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
      if (max === rn) h = ((gn - bn) / delta) % 6;
      else if (max === gn) h = (bn - rn) / delta + 2;
      else h = (rn - gn) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }

    const s = max === 0 ? 0 : (delta / max) * 100;
    const v = max * 100;
    return { h, s, v };
  }

  function hsvToRgb(h, s, v) {
    const hh = ((Number(h) % 360) + 360) % 360;
    const ss = Math.max(0, Math.min(100, Number(s))) / 100;
    const vv = Math.max(0, Math.min(100, Number(v))) / 100;
    const c = vv * ss;
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
    const m = vv - c;
    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (hh < 60) [r1, g1, b1] = [c, x, 0];
    else if (hh < 120) [r1, g1, b1] = [x, c, 0];
    else if (hh < 180) [r1, g1, b1] = [0, c, x];
    else if (hh < 240) [r1, g1, b1] = [0, x, c];
    else if (hh < 300) [r1, g1, b1] = [x, 0, c];
    else [r1, g1, b1] = [c, 0, x];

    return [
      Math.round((r1 + m) * 255),
      Math.round((g1 + m) * 255),
      Math.round((b1 + m) * 255)
    ];
  }

  function syncModalColorMapUI() {
    if (!dom.modalSv || !dom.modalSvThumb) return;
    const h = Math.max(0, Math.min(360, Number(state.pickerHsv.h) || 0));
    const s = Math.max(0, Math.min(100, Number(state.pickerHsv.s) || 0));
    const v = Math.max(0, Math.min(100, Number(state.pickerHsv.v) || 0));

    dom.modalSv.style.setProperty('--picker-hue', `${h}deg`);
    dom.modalSvThumb.style.left = `${s}%`;
    dom.modalSvThumb.style.top = `${100 - v}%`;
    dom.modalSv.setAttribute('aria-valuenow', String(Math.round(s)));
    dom.modalSv.setAttribute('aria-valuetext', `S ${Math.round(s)} V ${Math.round(v)}`);
    if (dom.modalHue && document.activeElement !== dom.modalHue) {
      dom.modalHue.value = String(Math.round(h));
    }
  }

  function applyColorFromPicker(invalidate = true) {
    if (state.activeCustomSlot === null) return;
    const [r, g, b] = hsvToRgb(state.pickerHsv.h, state.pickerHsv.s, state.pickerHsv.v);
    const hex = rgbToHex(r, g, b);
    state.customPreset = null;
    syncCustomPresetButtons();
    setCustomColor(state.activeCustomSlot, hex, { invalidate });
  }

  function clampByte(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function fillAssignOptions() {
    const channels = CHANNELS[state.mode];
    dom.assignSelects.forEach((select, idx) => {
      const current = select.value;
      select.innerHTML = '';
      channels.forEach((ch) => {
        const option = document.createElement('option');
        option.value = ch;
        option.textContent = ch;
        select.appendChild(option);
      });
      if (channels.includes(current)) {
        select.value = current;
      } else {
        select.value = channels[idx] || channels[0];
      }
    });
    applyAssignSelectStyles();
  }

  function applyAssignSelectStyles() {
    if (state.mode === 'CUSTOM') {
      dom.assignSelects.forEach((select) => {
        select.classList.remove('channel-r', 'channel-g', 'channel-b', 'channel-c', 'channel-y', 'channel-m');
      });
      return;
    }
    dom.assignSelects.forEach((select) => {
      const value = (select.value || '').toLowerCase();
      select.classList.remove('channel-r', 'channel-g', 'channel-b', 'channel-c', 'channel-y', 'channel-m');
      if (value) select.classList.add(`channel-${value}`);
    });
  }

  function syncViewButtons() {
    dom.allViewButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.viewMode === state.viewMode);
    });
  }

  function syncCustomPresetButtons() {
    dom.customPresetButtons.forEach((btn) => {
      btn.classList.toggle('active', state.mode === 'CUSTOM' && state.customPreset === btn.dataset.customPreset);
    });
  }

  function syncCustomColorControls() {
    state.customColors.forEach((color, index) => {
      const normalized = normalizeHexColor(color, '#808080');
      state.customColors[index] = normalized;
      if (dom.customSwatches[index]) {
        dom.customSwatches[index].style.setProperty('--swatch', normalized);
      }
    });

    if (state.activeCustomSlot !== null && state.activeCustomSlot >= 0) {
      const color = state.customColors[state.activeCustomSlot];
      const [r, g, b] = hexToRgb(color);
      state.pickerHsv = rgbToHsv(r, g, b);
      syncModalColorMapUI();
      if (dom.modalHex && document.activeElement !== dom.modalHex) dom.modalHex.value = color;
      if (dom.modalR && document.activeElement !== dom.modalR) dom.modalR.value = String(r);
      if (dom.modalG && document.activeElement !== dom.modalG) dom.modalG.value = String(g);
      if (dom.modalB && document.activeElement !== dom.modalB) dom.modalB.value = String(b);
    }
  }

  function syncModeButtons() {
    dom.modeButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.colorMode === state.mode);
    });
    document.body.classList.toggle('mode-custom', state.mode === 'CUSTOM');
    syncCustomPresetButtons();
    syncCustomColorControls();
  }

  function applyTranslations() {
    const t = i18n[state.lang];
    dom.subtitle.textContent = t.subtitle;
    dom.introTitle.textContent = t.introTitle;
    dom.introText.textContent = t.introText;
    dom.cfgTitle.textContent = t.cfgTitle;
    dom.modeLabel.textContent = t.mode;

    dom.modeButtons.forEach((btn) => {
      const mode = btn?.dataset.colorMode;
      if (mode === 'RGB') btn.textContent = t.modeRGB;
      if (mode === 'CYM') btn.textContent = t.modeCYM;
      if (mode === 'CUSTOM') btn.textContent = t.modeCustom;
    });

    if (dom.customPresetsLabel) dom.customPresetsLabel.textContent = t.presets;
    dom.customPresetButtons.forEach((btn) => {
      const preset = btn.dataset.customPreset;
      if (preset === 'autumn') btn.textContent = t.presetAutumn;
      if (preset === 'neon') btn.textContent = t.presetNeon;
      if (preset === 'earth') btn.textContent = t.presetEarth;
    });

    if (dom.globalViewLabel) dom.globalViewLabel.textContent = t.view;
    if (dom.imageModalViewLabel) dom.imageModalViewLabel.textContent = t.view;

    dom.fileLabels.forEach((label) => {
      if (label) label.textContent = t.browse;
    });

    dom.srcTitle.forEach((el, i) => {
      if (el) el.textContent = `${t.source} ${i + 1}`;
    });

    dom.srcDropHint.forEach((el, i) => {
      if (!el) return;
      el.textContent = state.slots[i].isSample ? t.sampleHint : t.dropHint;
    });

    dom.expandButtons.forEach((btn) => {
      btn.setAttribute('aria-label', t.expand);
      btn.setAttribute('title', t.expand);
    });

    dom.clearButtons.forEach((btn) => {
      btn.setAttribute('aria-label', t.clear);
      btn.setAttribute('title', t.clear);
    });

    if (dom.closeImageModalButton) {
      dom.closeImageModalButton.setAttribute('aria-label', t.close);
      dom.closeImageModalButton.setAttribute('title', t.close);
    }
    if (dom.imagePrevButton) {
      dom.imagePrevButton.setAttribute('aria-label', t.prev);
      dom.imagePrevButton.setAttribute('title', t.prev);
    }
    if (dom.imageNextButton) {
      dom.imageNextButton.setAttribute('aria-label', t.next);
      dom.imageNextButton.setAttribute('title', t.next);
    }
    if (dom.btnColorPickerClose) {
      dom.btnColorPickerClose.setAttribute('aria-label', t.close);
      dom.btnColorPickerClose.setAttribute('title', t.close);
    }

    if (dom.colorPickerTitle) dom.colorPickerTitle.textContent = t.chooseColor;
    if (dom.colorMapLabel) dom.colorMapLabel.textContent = t.colorMap;
    if (dom.colorHueLabel) dom.colorHueLabel.textContent = t.hue;
    if (dom.colorPaletteLabel) dom.colorPaletteLabel.textContent = t.palette;

    if (dom.outputEditTitle) dom.outputEditTitle.textContent = t.outputEditTitle;
    if (dom.outputEditHint) dom.outputEditHint.textContent = t.outputEditHint;
    if (dom.outputResetButton) dom.outputResetButton.textContent = t.reset;

    if (dom.outputBrightnessLabel) dom.outputBrightnessLabel.textContent = t.brightness;
    if (dom.outputContrastLabel) dom.outputContrastLabel.textContent = t.contrast;
    if (dom.outputTemperatureLabel) dom.outputTemperatureLabel.textContent = t.temperature;
    if (dom.outputTintLabel) dom.outputTintLabel.textContent = t.tint;
    if (dom.outputSaturationLabel) dom.outputSaturationLabel.textContent = t.saturation;
    if (dom.outputGammaLabel) dom.outputGammaLabel.textContent = t.gamma;

    if (dom.generateButton) dom.generateButton.textContent = t.generate;
    if (dom.downloadButton) dom.downloadButton.textContent = t.download;
    if (dom.outputTitle) dom.outputTitle.textContent = t.output;

    if (dom.footerSource) {
      dom.footerSource.childNodes[0].nodeValue = `${t.footerSource} `;
    }
    if (dom.footerAuthor) {
      dom.footerAuthor.childNodes[0].nodeValue = `${t.footerAuthor} `;
    }

    updateVisibleFileNames();
    if (!state.outputReady) {
      setStatus('muted', t.statusReady);
    }
  }

  function initLanguage() {
    const lang = detectLanguage();
    setLanguage(lang, false);

    dom.langSwitcher?.addEventListener('click', (event) => {
      event.preventDefault();
      setLanguage(state.lang === 'en' ? 'es' : 'en', true);
    });
  }

  function setLanguage(lang, updateUrl) {
    state.lang = lang === 'es' ? 'es' : 'en';
    dom.btnEn?.classList.toggle('active', state.lang === 'en');
    dom.btnEs?.classList.toggle('active', state.lang === 'es');
    dom.langSwitcher?.classList.toggle('lang-es', state.lang === 'es');
    applyTranslations();
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', state.lang);
      history.replaceState(null, '', url.toString());
    }
  }

  function setStatus(type, text) {
    if (!dom.status) return;
    dom.status.textContent = text;
    if (type === 'error') dom.status.dataset.type = 'error';
    else if (type === 'ok') dom.status.dataset.type = 'ok';
    else dom.status.dataset.type = '';
  }

  function updateVisibleFileNames() {
    const t = i18n[state.lang];
    state.slots.forEach((slot, index) => {
      const text = slot.fileName || t.noImageSelected;
      if (dom.fileNameDisplays[index]) dom.fileNameDisplays[index].textContent = text;
    });
  }

  function updateDropHints() {
    const t = i18n[state.lang];
    state.slots.forEach((slot, index) => {
      const card = dom.sourceCards[index];
      if (card) {
        card.classList.toggle('has-image', Boolean(slot.image));
        card.classList.toggle('has-sample', Boolean(slot.isSample));
      }
      if (dom.srcDropHint[index]) {
        dom.srcDropHint[index].textContent = slot.isSample ? t.sampleHint : t.dropHint;
      }
    });
  }

  function drawImageToCanvas(img, canvas) {
    const ctx = canvas.getContext('2d');
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    requestAnimationFrame(updateWorkflowSymbolsPosition);
  }

  function getPreviewRenderSize(img, canvas) {
    const cssWidth = Math.max(280, Math.round(canvas.clientWidth || 320));
    const targetWidth = Math.max(280, Math.min(960, Math.round(cssWidth * Math.min(window.devicePixelRatio || 1, 1.75))));
    const scale = Math.min(1, targetWidth / img.width);
    return {
      width: Math.max(1, Math.round(img.width * scale)),
      height: Math.max(1, Math.round(img.height * scale))
    };
  }

  function drawPreviewImageToCanvas(img, canvas) {
    const ctx = canvas.getContext('2d');
    const { width, height } = getPreviewRenderSize(img, canvas);
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    requestAnimationFrame(updateWorkflowSymbolsPosition);
  }

  function drawTintedChannelView(img, canvas, tint, options = {}) {
    const fullSize = Boolean(options.fullSize);
    const size = fullSize ? { width: img.width, height: img.height } : getPreviewRenderSize(img, canvas);
    const { width, height } = size;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    const tmp = document.createElement('canvas');
    tmp.width = width;
    tmp.height = height;
    const tctx = tmp.getContext('2d', { willReadFrequently: true });
    tctx.drawImage(img, 0, 0, width, height);
    const src = tctx.getImageData(0, 0, width, height);
    const out = ctx.createImageData(width, height);

    const tr = tint[0] / 255;
    const tg = tint[1] / 255;
    const tb = tint[2] / 255;

    for (let i = 0; i < src.data.length; i += 4) {
      const r = src.data[i];
      const g = src.data[i + 1];
      const b = src.data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      out.data[i] = clampByte(lum * tr);
      out.data[i + 1] = clampByte(lum * tg);
      out.data[i + 2] = clampByte(lum * tb);
      out.data[i + 3] = 255;
    }

    ctx.putImageData(out, 0, 0);
    requestAnimationFrame(updateWorkflowSymbolsPosition);
  }

  function getSlotTint(slotIndex) {
    if (state.mode === 'CUSTOM') {
      return hexToRgb(state.customColors[slotIndex]);
    }
    const assign = dom.assignSelects[slotIndex]?.value;
    if (state.mode === 'RGB') {
      if (assign === 'R') return [255, 0, 0];
      if (assign === 'G') return [0, 255, 0];
      return [0, 0, 255];
    }
    if (assign === 'C') return [0, 255, 255];
    if (assign === 'Y') return [255, 255, 0];
    return [255, 0, 255];
  }

  function renderSourcePreview(slotIndex) {
    const slot = state.slots[slotIndex];
    const canvas = dom.previewCanvases[slotIndex];
    if (!slot?.image || !canvas) return;
    if (state.viewMode === 'channel') {
      drawTintedChannelView(slot.image, canvas, getSlotTint(slotIndex));
      return;
    }
    drawPreviewImageToCanvas(slot.image, canvas);
  }

  function renderAllSourcePreviews() {
    state.slots.forEach((_slot, idx) => renderSourcePreview(idx));
  }

  function invalidateOutputForInputChange() {
    state.outputReady = false;
    state.outputBaseImageData = null;
    dom.downloadButton.disabled = true;
    setOutputEditControlsEnabled(false);
    setStatus('muted', i18n[state.lang].statusReady);
  }

  function setSlotImage(slotIndex, img, fileName, isSample) {
    state.slots[slotIndex] = {
      image: img,
      fileName: fileName || '',
      isSample: Boolean(isSample)
    };
    renderSourcePreview(slotIndex);
    updateVisibleFileNames();
    updateDropHints();
    invalidateOutputForInputChange();
  }

  function clearSlot(slotIndex) {
    state.slots[slotIndex] = { image: null, fileName: '', isSample: false };
    const canvas = dom.previewCanvases[slotIndex];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    updateVisibleFileNames();
    updateDropHints();
    invalidateOutputForInputChange();
    requestAnimationFrame(updateWorkflowSymbolsPosition);
  }

  function loadImageFromUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function loadSampleIntoSlot(slotIndex, fileName) {
    const candidates = [
      `media/raw/${fileName}`,
      `/HarrisShutter/media/raw/${fileName}`,
      `https://enheragu.github.io/HarrisShutter/media/raw/${fileName}`
    ];
    for (const url of candidates) {
      try {
        const img = await loadImageFromUrl(url);
        setSlotImage(slotIndex, img, fileName, true);
        return;
      } catch (_e) {}
    }
  }

  function preloadExampleImagesForMode(mode) {
    const files = MODE_SAMPLE_FILES[mode] || MODE_SAMPLE_FILES.RGB;
    state.slots.forEach((slot, index) => {
      if (slot.image && !slot.isSample) return;
      loadSampleIntoSlot(index, files[index]);
    });
  }

  function setViewMode(mode) {
    state.viewMode = mode === 'channel' ? 'channel' : 'original';
    syncViewButtons();
    renderAllSourcePreviews();
    if (!dom.imageModalOverlay.classList.contains('hidden')) {
      renderModalCurrentItem();
    }
  }

  function setMode(mode) {
    state.mode = ['RGB', 'CYM', 'CUSTOM'].includes(mode) ? mode : 'RGB';
    if (state.mode !== 'CUSTOM') {
      state.customPreset = null;
    }
    fillAssignOptions();
    syncModeButtons();
    renderAllSourcePreviews();
    applyAssignSelectStyles();
    preloadExampleImagesForMode(state.mode);
    invalidateOutputForInputChange();
  }

  function setCustomColor(slotIndex, hexValue, options = { invalidate: true }) {
    const normalized = normalizeHexColor(hexValue, state.customColors[slotIndex] || '#808080');
    state.customColors[slotIndex] = normalized;
    syncCustomColorControls();
    if (state.viewMode === 'channel') {
      renderSourcePreview(slotIndex);
    }
    if (options.invalidate) invalidateOutputForInputChange();
  }

  function applyCustomPreset(presetName) {
    const colors = PRESETS[presetName];
    if (!colors) return;
    state.customPreset = presetName;
    colors.forEach((color, idx) => setCustomColor(idx, color, { invalidate: false }));
    syncCustomPresetButtons();
    invalidateOutputForInputChange();
  }

  function setCustomControlOpen(slotIndex, isOpen) {
    if (!dom.colorPickerDialog) return;
    if (!isOpen) {
      state.activeCustomSlot = null;
      if (dom.colorPickerDialog.open) dom.colorPickerDialog.close();
      dom.customSwatches.forEach((btn) => btn?.setAttribute('aria-expanded', 'false'));
      return;
    }
    state.activeCustomSlot = slotIndex;
    syncCustomColorControls();
    dom.customSwatches.forEach((btn, i) => btn?.setAttribute('aria-expanded', i === slotIndex ? 'true' : 'false'));
    if (!dom.colorPickerDialog.open) dom.colorPickerDialog.showModal();
  }

  function validateBeforeGenerate() {
    if (state.slots.some((slot) => !slot.image)) {
      setStatus('error', i18n[state.lang].statusNeedImages);
      return false;
    }
    const selected = dom.assignSelects.map((select) => select.value);
    if (new Set(selected).size !== selected.length) {
      setStatus('error', i18n[state.lang].statusNeedUnique);
      return false;
    }
    return true;
  }

  function getOutputAdjustmentInputs() {
    return [dom.outputBrightness, dom.outputContrast, dom.outputTemperature, dom.outputTint, dom.outputSaturation, dom.outputGamma].filter(Boolean);
  }

  function setOutputEditControlsEnabled(enabled) {
    getOutputAdjustmentInputs().forEach((input) => {
      input.disabled = !enabled;
    });
    if (dom.outputResetButton) dom.outputResetButton.disabled = !enabled;
  }

  function updateOutputAdjustmentValueLabels() {
    if (dom.outputBrightnessValue) dom.outputBrightnessValue.textContent = String(state.outputAdjustments.brightness);
    if (dom.outputContrastValue) dom.outputContrastValue.textContent = String(state.outputAdjustments.contrast);
    if (dom.outputTemperatureValue) dom.outputTemperatureValue.textContent = String(state.outputAdjustments.temperature);
    if (dom.outputTintValue) dom.outputTintValue.textContent = String(state.outputAdjustments.tint);
    if (dom.outputSaturationValue) dom.outputSaturationValue.textContent = String(state.outputAdjustments.saturation);
    if (dom.outputGammaValue) dom.outputGammaValue.textContent = String(state.outputAdjustments.gamma);
  }

  function resetOutputAdjustments(syncInputs = true) {
    state.outputAdjustments = {
      brightness: 0,
      contrast: 0,
      temperature: 0,
      tint: 0,
      saturation: 0,
      gamma: 0
    };
    if (syncInputs) {
      if (dom.outputBrightness) dom.outputBrightness.value = '0';
      if (dom.outputContrast) dom.outputContrast.value = '0';
      if (dom.outputTemperature) dom.outputTemperature.value = '0';
      if (dom.outputTint) dom.outputTint.value = '0';
      if (dom.outputSaturation) dom.outputSaturation.value = '0';
      if (dom.outputGamma) dom.outputGamma.value = '0';
    }
    updateOutputAdjustmentValueLabels();
  }

  function renderOutputFromBase() {
    if (!state.outputBaseImageData || !dom.outputCanvas) return;
    const base = state.outputBaseImageData;
    const ctx = dom.outputCanvas.getContext('2d');
    const out = new ImageData(new Uint8ClampedArray(base.data), base.width, base.height);

    const brightness = state.outputAdjustments.brightness * 2.55;
    const contrastFactor = 1 + (state.outputAdjustments.contrast / 100);
    const temperature = state.outputAdjustments.temperature * 1.2;
    const tint = state.outputAdjustments.tint * 1.2;
    const saturationFactor = 1 + (state.outputAdjustments.saturation / 100);
    const gammaSlider = state.outputAdjustments.gamma;
    const gamma = gammaSlider >= 0 ? 1 / (1 + gammaSlider / 100) : 1 - gammaSlider / 100;

    for (let i = 0; i < out.data.length; i += 4) {
      let r = out.data[i];
      let g = out.data[i + 1];
      let b = out.data[i + 2];

      r = (r - 127.5) * contrastFactor + 127.5 + brightness;
      g = (g - 127.5) * contrastFactor + 127.5 + brightness;
      b = (b - 127.5) * contrastFactor + 127.5 + brightness;

      r += temperature;
      b -= temperature;
      g += tint;
      r -= tint * 0.5;
      b -= tint * 0.5;

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * saturationFactor;
      g = gray + (g - gray) * saturationFactor;
      b = gray + (b - gray) * saturationFactor;

      r = 255 * Math.pow(Math.max(0, Math.min(1, r / 255)), gamma);
      g = 255 * Math.pow(Math.max(0, Math.min(1, g / 255)), gamma);
      b = 255 * Math.pow(Math.max(0, Math.min(1, b / 255)), gamma);

      out.data[i] = clampByte(r);
      out.data[i + 1] = clampByte(g);
      out.data[i + 2] = clampByte(b);
    }

    dom.outputCanvas.width = base.width;
    dom.outputCanvas.height = base.height;
    ctx.putImageData(out, 0, 0);

    if (!dom.imageModalOverlay.classList.contains('hidden') && state.modalItemKey === 'out') {
      renderModalCurrentItem();
    }
  }

  function contributionFromAssign(assign, slotIndex) {
    if (state.mode === 'CUSTOM') {
      const [r, g, b] = hexToRgb(state.customColors[slotIndex]);
      return [r / 255, g / 255, b / 255];
    }

    if (state.mode === 'RGB') {
      if (assign === 'R') return [1, 0, 0];
      if (assign === 'G') return [0, 1, 0];
      return [0, 0, 1];
    }

    if (assign === 'C') return [0, 1, 1];
    if (assign === 'Y') return [1, 1, 0];
    return [1, 0, 1];
  }

  function generateFusion() {
    if (!validateBeforeGenerate()) return;

    const width = Math.max(...state.slots.map((slot) => slot.image.width));
    const height = Math.max(...state.slots.map((slot) => slot.image.height));

    const accum = new Float32Array(width * height * 3);
    const tmp = document.createElement('canvas');
    tmp.width = width;
    tmp.height = height;
    const tctx = tmp.getContext('2d', { willReadFrequently: true });

    state.slots.forEach((slot, index) => {
      tctx.clearRect(0, 0, width, height);
      tctx.drawImage(slot.image, 0, 0, width, height);
      const src = tctx.getImageData(0, 0, width, height).data;

      const assign = dom.assignSelects[index]?.value;
      const [cr, cg, cb] = contributionFromAssign(assign, index);

      for (let i = 0, p = 0; i < src.length; i += 4, p += 3) {
        const lum = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
        accum[p] += lum * cr;
        accum[p + 1] += lum * cg;
        accum[p + 2] += lum * cb;
      }
    });

    const outData = new Uint8ClampedArray(width * height * 4);
    for (let p = 0, i = 0; p < accum.length; p += 3, i += 4) {
      outData[i] = clampByte(accum[p]);
      outData[i + 1] = clampByte(accum[p + 1]);
      outData[i + 2] = clampByte(accum[p + 2]);
      outData[i + 3] = 255;
    }

    state.outputBaseImageData = new ImageData(outData, width, height);
    state.outputReady = true;
    setOutputEditControlsEnabled(true);
    dom.downloadButton.disabled = false;
    resetOutputAdjustments(true);
    renderOutputFromBase();
    setStatus('ok', i18n[state.lang].statusDone(width, height, state.mode));
  }

  function handleDownload() {
    if (!state.outputReady) return;
    const link = document.createElement('a');
    link.href = dom.outputCanvas.toDataURL('image/png');
    link.download = `harris-shutter-${state.mode.toLowerCase()}.png`;
    link.click();
  }

  function getModalItems() {
    const items = [];
    for (let i = 0; i < 3; i += 1) {
      if (state.slots[i].image) items.push(`src${i}`);
    }
    if (state.outputReady) items.push('out');
    return items;
  }

  function getModalCanvasForKey(key) {
    if (key === 'out') return dom.outputCanvas;
    if (key === 'src0') return dom.previewCanvases[0];
    if (key === 'src1') return dom.previewCanvases[1];
    if (key === 'src2') return dom.previewCanvases[2];
    return null;
  }

  function getModalTitleForKey(key) {
    const t = i18n[state.lang];
    if (key === 'out') return t.output;
    const idx = Number(key.replace('src', ''));
    return `${t.source} ${idx + 1}`;
  }

  function renderModalCurrentItem() {
    if (!state.modalItemKey) return;
    const modalCanvas = dom.imageModalCanvas;
    if (state.modalItemKey === 'out') {
      const sourceCanvas = dom.outputCanvas;
      if (!sourceCanvas) return;
      modalCanvas.width = sourceCanvas.width;
      modalCanvas.height = sourceCanvas.height;
      const ctx = modalCanvas.getContext('2d');
      ctx.clearRect(0, 0, modalCanvas.width, modalCanvas.height);
      ctx.drawImage(sourceCanvas, 0, 0);
    } else {
      const idx = Number(state.modalItemKey.replace('src', ''));
      const slot = state.slots[idx];
      if (!slot?.image) return;
      if (state.viewMode === 'channel') {
          drawTintedChannelView(slot.image, modalCanvas, getSlotTint(idx), { fullSize: true });
      } else {
        drawImageToCanvas(slot.image, modalCanvas);
      }
    }

    if (dom.imageModalTitle) dom.imageModalTitle.textContent = getModalTitleForKey(state.modalItemKey);
  }

  function openImageModalByTarget(targetId) {
    if (!targetId) return;
    let key = null;
    if (targetId === 'preview-0') key = 'src0';
    if (targetId === 'preview-1') key = 'src1';
    if (targetId === 'preview-2') key = 'src2';
    if (targetId === 'output-canvas') key = 'out';
    if (!key) return;

    const items = getModalItems();
    if (!items.includes(key)) return;

    state.modalItemKey = key;
    dom.imageModalOverlay.classList.remove('hidden');
    dom.imageModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    renderModalCurrentItem();
  }

  function closeImageModal() {
    dom.imageModalOverlay.classList.add('hidden');
    dom.imageModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function navigateImageModal(direction) {
    const items = getModalItems();
    if (!items.length || !state.modalItemKey) return;
    const idx = items.indexOf(state.modalItemKey);
    if (idx === -1) return;
    const next = (idx + direction + items.length) % items.length;
    state.modalItemKey = items[next];
    renderModalCurrentItem();
  }

  function initImageModal() {
    dom.closeImageModalButton?.addEventListener('click', closeImageModal);
    dom.imagePrevButton?.addEventListener('click', () => navigateImageModal(-1));
    dom.imageNextButton?.addEventListener('click', () => navigateImageModal(1));

    dom.imageModalOverlay?.addEventListener('click', (event) => {
      if (event.target === dom.imageModalOverlay) {
        closeImageModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (dom.imageModalOverlay.classList.contains('hidden')) return;
      if (event.key === 'Escape') closeImageModal();
      if (event.key === 'ArrowLeft') navigateImageModal(-1);
      if (event.key === 'ArrowRight') navigateImageModal(1);
    });
  }

  function initDragAndDrop() {
    dom.sourceCards.forEach((card, index) => {
      const input = dom.fileInputs[index];
      const preview = card.querySelector('.preview-wrap');

      const openPicker = () => input?.click();

      preview?.addEventListener('click', openPicker);

      ['dragenter', 'dragover'].forEach((evt) => {
        card.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          card.classList.add('is-drag-over');
        });
      });

      ['dragleave', 'drop'].forEach((evt) => {
        card.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          card.classList.remove('is-drag-over');
        });
      });

      card.addEventListener('drop', async (e) => {
        const file = e.dataTransfer?.files?.[0];
        if (!file) return;
        try {
          const img = await loadImageFromFile(file);
          setSlotImage(index, img, file.name, false);
        } catch (_e) {
          setStatus('error', i18n[state.lang].statusNeedImages);
        }
      });
    });
  }

  function updateWorkflowSymbolsPosition() {
    const symbols = dom.workflowSymbols;
    const grid = dom.sourceGrid;
    if (!symbols || !grid) return;

    const cards = Array.from(grid.querySelectorAll('.source-card[data-slot]'));
    if (cards.length < 3) return;

    const gRect = grid.getBoundingClientRect();
    const c1 = cards[0].getBoundingClientRect();
    const c2 = cards[1].getBoundingClientRect();
    const c3 = cards[2].getBoundingClientRect();
    const p1 = dom.previewCanvases[0]?.getBoundingClientRect();
    const p2 = dom.previewCanvases[1]?.getBoundingClientRect();
    const p3 = dom.previewCanvases[2]?.getBoundingClientRect();

    const plus1 = symbols.querySelector('.workflow-plus-1');
    const plus2 = symbols.querySelector('.workflow-plus-2');
    const eq = symbols.querySelector('.workflow-eq');

    if (!plus1 || !plus2 || !eq) return;

    const yRef = p1 || c1;
    const centerY = yRef.top + yRef.height / 2 - gRect.top;
    plus1.style.left = `${((c1.right + c2.left) / 2) - gRect.left}px`;
    plus2.style.left = `${((c2.right + c3.left) / 2) - gRect.left}px`;

    const outputCard = grid.querySelector('.output-card');
    if (outputCard) {
      const outRect = dom.outputCanvas?.getBoundingClientRect() || outputCard.getBoundingClientRect();
      const rightRef = p3 || c3;
      eq.style.left = `${((rightRef.right + outRect.left) / 2) - gRect.left}px`;
    }

    plus1.style.top = `${centerY}px`;
    plus2.style.top = `${centerY}px`;
    eq.style.top = `${centerY}px`;
  }

  function initRelatedWork() {
    if (typeof window.mountRelatedWork === 'function') {
      window.mountRelatedWork({
        rootId: 'related-work-root',
        toolKey: 'harris-shutter-tool',
        viewAllHref: 'https://enheragu.github.io/related-work/'
      });
    }
  }

  function initEvents() {
    dom.modeButtons.forEach((btn) => {
      btn?.addEventListener('click', () => {
        setMode(btn.dataset.colorMode);
      });
    });

    dom.customPresetButtons.forEach((btn) => {
      btn?.addEventListener('click', () => {
        applyCustomPreset(btn.dataset.customPreset);
      });
    });

    dom.assignSelects.forEach((select) => {
      select?.addEventListener('change', () => {
        applyAssignSelectStyles();
        renderAllSourcePreviews();
        invalidateOutputForInputChange();
      });
    });

    dom.customSwatches.forEach((swatch, index) => {
      swatch?.addEventListener('click', () => {
        setCustomControlOpen(index, true);
      });
    });

    dom.btnColorPickerClose?.addEventListener('click', () => {
      setCustomControlOpen(-1, false);
    });

    dom.colorPickerDialog?.addEventListener('cancel', (event) => {
      event.preventDefault();
      setCustomControlOpen(-1, false);
    });

    dom.colorPickerDialog?.addEventListener('click', (event) => {
      if (event.target === dom.colorPickerDialog) {
        setCustomControlOpen(-1, false);
      }
    });

    const updateSVFromPointer = (event) => {
      if (!dom.modalSv) return;
      const rect = dom.modalSv.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
      state.pickerHsv.s = (x / rect.width) * 100;
      state.pickerHsv.v = 100 - (y / rect.height) * 100;
      syncModalColorMapUI();
      applyColorFromPicker(true);
    };

    dom.modalSv?.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      updateSVFromPointer(event);
      const onMove = (moveEvent) => updateSVFromPointer(moveEvent);
      const onUp = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });

    dom.modalSv?.addEventListener('keydown', (event) => {
      const step = event.shiftKey ? 5 : 1;
      let changed = false;
      if (event.key === 'ArrowLeft') {
        state.pickerHsv.s = Math.max(0, state.pickerHsv.s - step);
        changed = true;
      }
      if (event.key === 'ArrowRight') {
        state.pickerHsv.s = Math.min(100, state.pickerHsv.s + step);
        changed = true;
      }
      if (event.key === 'ArrowUp') {
        state.pickerHsv.v = Math.min(100, state.pickerHsv.v + step);
        changed = true;
      }
      if (event.key === 'ArrowDown') {
        state.pickerHsv.v = Math.max(0, state.pickerHsv.v - step);
        changed = true;
      }
      if (!changed) return;
      event.preventDefault();
      syncModalColorMapUI();
      applyColorFromPicker(true);
    });

    dom.modalHue?.addEventListener('input', () => {
      state.pickerHsv.h = Number(dom.modalHue.value) || 0;
      syncModalColorMapUI();
      applyColorFromPicker(true);
    });

    [dom.modalR, dom.modalG, dom.modalB].forEach((input) => {
      input?.addEventListener('input', () => {
        input.value = String(input.value).replace(/[^0-9]/g, '').slice(0, 3);
      });
      input?.addEventListener('change', () => {
        if (state.activeCustomSlot === null) return;
        state.customPreset = null;
        syncCustomPresetButtons();
        const hex = rgbToHex(dom.modalR?.value, dom.modalG?.value, dom.modalB?.value);
        setCustomColor(state.activeCustomSlot, hex);
      });
    });

    dom.modalHex?.addEventListener('input', () => {
      const cleaned = String(dom.modalHex.value || '').trim().replace(/[^#0-9a-fA-F]/g, '').slice(0, 7);
      dom.modalHex.value = cleaned;
    });

    dom.modalHex?.addEventListener('change', () => {
      if (state.activeCustomSlot === null) return;
      state.customPreset = null;
      syncCustomPresetButtons();
      setCustomColor(state.activeCustomSlot, dom.modalHex.value || state.customColors[state.activeCustomSlot]);
    });

    dom.modalPaletteChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        if (state.activeCustomSlot === null) return;
        const hex = chip.dataset.paletteColor;
        if (!hex) return;
        state.customPreset = null;
        syncCustomPresetButtons();
        setCustomColor(state.activeCustomSlot, hex);
      });
    });

    dom.fileInputs.forEach((input, index) => {
      input?.addEventListener('change', async () => {
        const file = input.files?.[0];
        if (!file) return;
        try {
          const img = await loadImageFromFile(file);
          setSlotImage(index, img, file.name, false);
        } catch (_e) {
          setStatus('error', i18n[state.lang].statusNeedImages);
        } finally {
          input.value = '';
        }
      });
    });

    dom.clearButtons.forEach((btn) => {
      btn?.addEventListener('click', (event) => {
        event.stopPropagation();
        const slot = Number(btn.dataset.clearSlot);
        if (Number.isFinite(slot)) clearSlot(slot);
      });
    });

    dom.expandButtons.forEach((btn) => {
      btn?.addEventListener('click', (event) => {
        event.stopPropagation();
        openImageModalByTarget(btn.dataset.expandTarget);
      });
    });

    dom.allViewButtons.forEach((btn) => {
      btn?.addEventListener('click', () => {
        setViewMode(btn.dataset.viewMode);
      });
    });

    [
      ['brightness', dom.outputBrightness],
      ['contrast', dom.outputContrast],
      ['temperature', dom.outputTemperature],
      ['tint', dom.outputTint],
      ['saturation', dom.outputSaturation],
      ['gamma', dom.outputGamma]
    ].forEach(([key, input]) => {
      input?.addEventListener('input', () => {
        state.outputAdjustments[key] = Number(input.value) || 0;
        updateOutputAdjustmentValueLabels();
        renderOutputFromBase();
      });
    });

    dom.outputResetButton?.addEventListener('click', () => {
      resetOutputAdjustments(true);
      renderOutputFromBase();
    });

    dom.generateButton?.addEventListener('click', generateFusion);
    dom.downloadButton?.addEventListener('click', handleDownload);

    window.addEventListener('resize', updateWorkflowSymbolsPosition);

    initDragAndDrop();
  }

  function init() {
    initTheme();
    fillAssignOptions();
    initLanguage();
    syncModeButtons();
    syncViewButtons();
    resetOutputAdjustments(true);
    updateOutputAdjustmentValueLabels();
    setOutputEditControlsEnabled(false);
    initEvents();
    initImageModal();
    initRelatedWork();

    const ctx = dom.outputCanvas.getContext('2d');
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, dom.outputCanvas.width, dom.outputCanvas.height);

    updateDropHints();
    updateVisibleFileNames();
    preloadExampleImagesForMode(state.mode);
    requestAnimationFrame(updateWorkflowSymbolsPosition);
  }

  init();
})();
