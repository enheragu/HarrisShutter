import re

with open('/home/quique/eeha/Harris-ShutterTool/js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()


# First we add new DOM elements
new_dom = """
    // Custom Color Modal
    colorPickerDialog: document.getElementById('color-picker-dialog'),
    btnColorPickerClose: document.getElementById('btn-close-color'),
    colorPickerTitle: document.getElementById('color-picker-title'),
    modalHex: document.getElementById('modal-hex'),
    modalR: document.getElementById('modal-r'),
    modalG: document.getElementById('modal-g'),
    modalB: document.getElementById('modal-b'),
    modalPaletteChips: Array.from(document.querySelectorAll('#color-picker-dialog .palette-chip')),
    """

js = re.sub(r'(customColorControls:\s*Array\.from\(document\.querySelectorAll\(\'\.custom-color-control\[data-custom-slot\]\'\)\),)', r'\1\n' + new_dom, js)

# We need to remove customNativePickers, customHexInputs, customRgbInputs, customPaletteChips
js = re.sub(r'customNativePickers: \[[\s\S]*?\],', '', js)
js = re.sub(r'customHexInputs: \[[\s\S]*?\],', '', js)
js = re.sub(r'customRgbInputs: \[[\s\S]*?\],', '', js)
js = re.sub(r'customPaletteChips:\s*Array\.from\(document\.querySelectorAll\(\'\.palette-chip\'\)\),', '', js)

# In syncCustomColorControls
new_sync_custom = """
  function syncCustomColorControls() {
    state.customColors.forEach((color, index) => {
      const normalized = normalizeHexColor(color, state.customColors[index] || '#808080');
      state.customColors[index] = normalized;
      if (dom.customSwatches[index]) dom.customSwatches[index].style.setProperty('--swatch', normalized);
    });
    
    if (state.activeCustomSlot !== undefined && state.activeCustomSlot !== null) {
        const hex = state.customColors[state.activeCustomSlot];
        if (dom.modalHex) dom.modalHex.value = hex;
        const rgb = hexToRgb(hex);
        if (dom.modalR) dom.modalR.value = String(rgb[0]);
        if (dom.modalG) dom.modalG.value = String(rgb[1]);
        if (dom.modalB) dom.modalB.value = String(rgb[2]);
    }
  }
"""

js = re.sub(r'function syncCustomColorControls\(\) \{[\s\S]*?\}\n', new_sync_custom, js)

# In setCustomColor
new_set_custom = """
  function setCustomColor(slotIndex, hexValue, options = { invalidate: true }) {
    const normalized = normalizeHexColor(hexValue, state.customColors[slotIndex] || '#808080');
    state.customColors[slotIndex] = normalized;
    if (dom.customSwatches[slotIndex]) dom.customSwatches[slotIndex].style.setProperty('--swatch', normalized);
    if (state.activeCustomSlot === slotIndex) {
        if (dom.modalHex && document.activeElement !== dom.modalHex) dom.modalHex.value = normalized;
        const rgb = hexToRgb(normalized);
        if (dom.modalR && document.activeElement !== dom.modalR) dom.modalR.value = String(rgb[0]);
        if (dom.modalG && document.activeElement !== dom.modalG) dom.modalG.value = String(rgb[1]);
        if (dom.modalB && document.activeElement !== dom.modalB) dom.modalB.value = String(rgb[2]);
    }
    if (options.invalidate) invalidateOutputForInputChange();
  }
"""

js = re.sub(r'function setCustomColor\(slotIndex, hexValue, options = \{ invalidate: true \}\) \{[\s\S]*?\}\n', new_set_custom, js)


# In translation
trans = """
    dom.btnDownload.textContent = t.download;
    if (dom.colorPickerTitle) dom.colorPickerTitle.textContent = t.chooseColor || 'Choose a color';
"""
js = re.sub(r'dom\.btnDownload\.textContent = t\.download;', trans, js)

# add chooseColor to i18n
i18n_es = """
    btnReset: 'Reiniciar',
    chooseColor: 'Elegir color'
  }
"""
js = re.sub(r'btnReset: \'Reiniciar\'\n  \}', i18n_es, js)


# SetCustomControlOpen replace
new_open = """
  function setCustomControlOpen(slotIndex, isOpen) {
    if (isOpen) {
        state.activeCustomSlot = slotIndex;
        syncCustomColorControls();
        dom.colorPickerDialog.showModal();
    } else {
        dom.colorPickerDialog.close();
        state.activeCustomSlot = null;
    }
  }
"""

js = re.sub(r'function setCustomControlOpen\(slotIndex, isOpen\) \{[\s\S]*?\}\n', new_open, js)

# close click outside
close_outside = """
    // Close modal when clicking outside
    dom.colorPickerDialog?.addEventListener('click', (e) => {
        if (e.target === dom.colorPickerDialog) {
            setCustomControlOpen(null, false);
        }
    });
    
    dom.btnColorPickerClose?.addEventListener('click', () => {
        setCustomControlOpen(null, false);
    });
    
    // Custom swatches opens modal
    dom.customSwatches.forEach((swatch, index) => {
      swatch?.addEventListener('click', () => {
        setCustomControlOpen(index, true);
      });
    });

    // Custom RGB/Hex logic
    const updateFromRgb = (invalidate = true) => {
        if (state.activeCustomSlot === undefined || state.activeCustomSlot === null) return;
        const clamp = (v) => Math.max(0, Math.min(255, Math.round(Number(v) || 0)));
        const r = clamp(dom.modalR.value);
        const g = clamp(dom.modalG.value);
        const b = clamp(dom.modalB.value);
        dom.modalR.value = r; dom.modalG.value = g; dom.modalB.value = b;
        state.customPreset = null;
        syncCustomPresetButtons();
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        setCustomColor(state.activeCustomSlot, hex, { invalidate });
    };

    [dom.modalR, dom.modalG, dom.modalB].forEach(input => {
        input?.addEventListener('change', () => updateFromRgb(true));
        input?.addEventListener('input', () => {
            const cleaned = String(input.value || '').replace(/[^0-9]/g, '').slice(0, 3);
            input.value = cleaned;
        });
    });

    dom.modalHex?.addEventListener('change', () => {
        if (state.activeCustomSlot === undefined || state.activeCustomSlot === null) return;
        state.customPreset = null;
        syncCustomPresetButtons();
        setCustomColor(state.activeCustomSlot, dom.modalHex.value);
    });
    
    dom.modalHex?.addEventListener('input', () => {
        const cleaned = String(dom.modalHex.value || '').trim().replace(/[^#0-9a-fA-F]/g, '').slice(0, 7);
        dom.modalHex.value = cleaned;
    });

    dom.modalPaletteChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (state.activeCustomSlot === undefined || state.activeCustomSlot === null) return;
            const hex = chip.dataset.paletteColor;
            if (!hex) return;
            state.customPreset = null;
            syncCustomPresetButtons();
            setCustomColor(state.activeCustomSlot, hex);
        });
    });

    // Replace the old bindEventListeners block
"""

# Let's replace the bindevents logic directly
js = re.sub(r'dom\.customSwatches\.forEach\(\(swatch, index\) => \{[\s\S]*?setCustomControlOpen\(index, willOpen\);\n      \}\);\n    \}\);', '/* REPLACED_SWATCHES */', js)
js = re.sub(r'dom\.customNativePickers\.forEach\(\(picker, index\) => \{[\s\S]*?\}\);\n    \}\);', '/* REPLACED_NATIVE */', js)
js = re.sub(r'dom\.customHexInputs\.forEach\(\(input, index\) => \{[\s\S]*?\}\);\n    \}\);', '/* REPLACED_HEX */', js)
js = re.sub(r'dom\.customRgbInputs\.forEach\(\(rgbInputs, index\) => \{[\s\S]*?\}\);\n    \}\);', '/* REPLACED_RGB */', js)
js = re.sub(r'dom\.customPaletteChips\.forEach\(\(chip\) => \{[\s\S]*?\}\);\n    \}\);', '/* REPLACED_CHIPS */', js)


# Also remove close when clicking outside logic from before
js = re.sub(r'document\.addEventListener\(\'click\', \(e\) => \{[\s\S]*?\}\);', '/* REPLACED_OUTSIDE */', js)

js = js.replace('/* REPLACED_SWATCHES */', close_outside)

# Clean up
js = re.sub(r'/\* REPLACED_(NATIVE|HEX|RGB|CHIPS|OUTSIDE) \*/\n?', '', js)


with open('/home/quique/eeha/Harris-ShutterTool/js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
