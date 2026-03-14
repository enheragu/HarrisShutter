import re

with open('/home/quique/eeha/Harris-ShutterTool/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove old inline popups
html = re.sub(r'(\s*)<div class="custom-color-fields">.*?</div>\n(?=\s*</div>\n\s*</div>\n\s*<div class="preview-wrap">)', '', html, flags=re.DOTALL)

# Add custom dialog before end of body
dialog_html = """
  <dialog id="color-picker-dialog" class="panel custom-color-modal">
    <div class="panel-header subpanel-header">
      <h2 id="color-picker-title">Choose a color</h2>
      <button id="btn-close-color" class="btn-ghost" type="button" aria-label="Close">X</button>
    </div>
    <div class="color-picker-body">
      <div class="custom-rgb-row">
        <label class="custom-rgb-field"><span class="custom-rgb-label">R</span><input id="modal-r" class="custom-rgb-input" type="number" min="0" max="255" value="255" aria-label="Red"></label>
        <label class="custom-rgb-field"><span class="custom-rgb-label">G</span><input id="modal-g" class="custom-rgb-input" type="number" min="0" max="255" value="255" aria-label="Green"></label>
        <label class="custom-rgb-field"><span class="custom-rgb-label">B</span><input id="modal-b" class="custom-rgb-input" type="number" min="0" max="255" value="255" aria-label="Blue"></label>
      </div>
      <input id="modal-hex" class="custom-color-hex" type="text" value="#FFFFFF" inputmode="text" maxlength="7" spellcheck="false" aria-label="HEX">
      <div class="custom-palette-row" role="group" aria-label="Palette">
        <button class="palette-chip" type="button" data-palette-color="#58A6FF" style="--chip:#58A6FF"></button>
        <button class="palette-chip" type="button" data-palette-color="#BC8CFF" style="--chip:#BC8CFF"></button>
        <button class="palette-chip" type="button" data-palette-color="#3FB950" style="--chip:#3FB950"></button>
        <button class="palette-chip" type="button" data-palette-color="#D29922" style="--chip:#D29922"></button>
        <button class="palette-chip" type="button" data-palette-color="#F85149" style="--chip:#F85149"></button>
        <button class="palette-chip" type="button" data-palette-color="#6E7681" style="--chip:#6E7681"></button>
      </div>
    </div>
  </dialog>
"""
if '<dialog id="color-picker-dialog"' not in html:
    html = html.replace('</body>', dialog_html + '\n</body>')

with open('/home/quique/eeha/Harris-ShutterTool/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
