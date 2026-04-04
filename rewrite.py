import re, sys

css = '''
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }

:root {
  --bg: #050c05;
  --surface: rgba(0, 255, 65, 0.015);
  --panel: rgba(0, 0, 0, 0.4);
  --card: rgba(0, 255, 65, 0.01);
  --border: rgba(0, 255, 65, 0.12);
  --border2: rgba(0, 255, 65, 0.25);
  --text: #dedede;
  --muted: rgba(222,222,222,0.4);
  --faint: rgba(0, 255, 65, 0.05);

  --pass: #00ff41;
  --fail: #ff3b3b;
  --warn: #ffaa00;
  --info: #3be8ff;
  --purple: #ea80fc;
  --skip: rgba(222,222,222,0.5);

  --pass-bg: rgba(0,255,65,0.05);
  --fail-bg: rgba(255,59,59,0.18);
  --warn-bg: rgba(255,170,0,0.15);
  --skip-bg: rgba(222,222,222,0.15);

  --font-mono: 'Share Tech Mono', monospace;
  --font-display: 'Bebas Neue', sans-serif;
  --r: 0;
}

[data-theme="pink"] { --bg: #0a0118; --surface: rgba(255, 0, 255, 0.02); --panel: rgba(0, 0, 0, 0.6); --card: rgba(255, 0, 255, 0.015); --border: rgba(255, 0, 255, 0.2); --border2: rgba(255, 0, 255, 0.4); --pass: #ff00ff; --pass-bg: rgba(255, 0, 255, 0.08); }
[data-theme="cherry"] { --bg: #1a0f14; --surface: rgba(255, 77, 109, 0.02); --panel: rgba(26, 15, 20, 0.8); --card: rgba(255, 77, 109, 0.015); --border: rgba(255, 77, 109, 0.25); --border2: rgba(255, 77, 109, 0.5); --pass: #ff4d6d; --pass-bg: rgba(255, 77, 109, 0.08); }
[data-theme="blue"] { --bg: #010a14; --surface: rgba(0, 240, 255, 0.02); --panel: rgba(0, 0, 0, 0.5); --card: rgba(0, 240, 255, 0.015); --border: rgba(0, 240, 255, 0.2); --border2: rgba(0, 240, 255, 0.4); --pass: #00f0ff; --pass-bg: rgba(0, 240, 255, 0.08); }
[data-theme="purple"] { --bg: #282a36; --surface: rgba(189, 147, 249, 0.03); --panel: rgba(40, 42, 54, 0.8); --card: rgba(189, 147, 249, 0.03); --border: rgba(189, 147, 249, 0.3); --border2: rgba(189, 147, 249, 0.6); --pass: #bd93f9; --pass-bg: rgba(189, 147, 249, 0.1); --fail: #ff5555; --fail-bg: rgba(255, 85, 85, 0.2); }
[data-theme="orange"] { --bg: #141001; --surface: rgba(255, 170, 0, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(255, 170, 0, 0.015); --border: rgba(255, 170, 0, 0.25); --border2: rgba(255, 170, 0, 0.5); --pass: #ffaa00; --pass-bg: rgba(255, 170, 0, 0.1); }
[data-theme="gold"] { --bg: #141201; --surface: rgba(255, 215, 0, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(255, 215, 0, 0.015); --border: rgba(255, 215, 0, 0.25); --border2: rgba(255, 215, 0, 0.5); --pass: #ffd700; --pass-bg: rgba(255, 215, 0, 0.1); }
[data-theme="frost"] { --bg: #011014; --surface: rgba(160, 240, 255, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(160, 240, 255, 0.015); --border: rgba(160, 240, 255, 0.25); --border2: rgba(160, 240, 255, 0.5); --pass: #a0f0ff; --pass-bg: rgba(160, 240, 255, 0.1); }
[data-theme="radioactive"] { --bg: #0a1401; --surface: rgba(191, 255, 0, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(191, 255, 0, 0.015); --border: rgba(191, 255, 0, 0.25); --border2: rgba(191, 255, 0, 0.5); --pass: #bfff00; --pass-bg: rgba(191, 255, 0, 0.1); }
[data-theme="violet"] { --bg: #0a0114; --surface: rgba(138, 43, 226, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(138, 43, 226, 0.015); --border: rgba(138, 43, 226, 0.25); --border2: rgba(138, 43, 226, 0.5); --pass: #8a2be2; --pass-bg: rgba(138, 43, 226, 0.1); }
[data-theme="blood"] { --bg: #140101; --surface: rgba(220, 20, 60, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(220, 20, 60, 0.015); --border: rgba(220, 20, 60, 0.25); --border2: rgba(220, 20, 60, 0.5); --pass: #dc143c; --pass-bg: rgba(220, 20, 60, 0.1); }
[data-theme="mono"] { --bg: #050505; --surface: rgba(255, 255, 255, 0.03); --panel: rgba(0, 0, 0, 0.6); --card: rgba(255, 255, 255, 0.015); --border: rgba(255, 255, 255, 0.25); --border2: rgba(255, 255, 255, 0.5); --pass: #ffffff; --pass-bg: rgba(255, 255, 255, 0.1); }

/* SETTINGS MODAL */
.modal-overlay { position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .3s; overflow: hidden; }
.modal-overlay.active { opacity: 1; pointer-events: all; }
.modal-lines { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
.modal-shp { position: absolute; background: var(--pass); opacity: 0.1; filter: blur(20px); border-radius: 50%; animation: floatShp 15s infinite alternate ease-in-out; }
.modal-shp:nth-child(1) { width: 300px; height: 300px; top: -100px; left: -100px; animation-duration: 20s; }
.modal-shp:nth-child(2) { width: 400px; height: 400px; bottom: -150px; right: 10%; animation-duration: 25s; animation-direction: alternate-reverse; }
.modal-shp:nth-child(3) { width: 200px; height: 200px; top: 40%; left: 30%; animation-duration: 18s; }
@keyframes floatShp { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(150px, 150px) scale(1.5); } }

.modal-box { position: relative; z-index: 2; width: 480px; max-width: 90%; background: var(--panel); border: 1px solid var(--pass); box-shadow: 0 0 20px var(--pass-bg), inset 0 0 15px var(--pass-bg); padding: 40px; display: flex; flex-direction: column; gap: 30px; transform: scale(0.95); transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.modal-overlay.active .modal-box { transform: scale(1); }
.modal-title { font-family: var(--font-display); font-size: 36px; letter-spacing: 4px; color: var(--pass); text-shadow: 0 0 10px var(--pass-bg); text-align: center; line-height: 1; margin-bottom: -10px; }
.theme-grid-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.theme-btn { background: var(--bg); border: 1px solid var(--border2); color: var(--text); padding: 14px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; cursor: none; transition: all .2s; text-transform: uppercase; }
.theme-btn:hover, .theme-btn.active { border-color: var(--pass); color: var(--pass); background: var(--pass-bg); box-shadow: inset 0 0 10px var(--pass-bg); text-shadow: 0 0 5px var(--pass-bg); }
.close-btn { align-self: center; background: transparent; border: none; border-bottom: 2px solid var(--pass); color: var(--text); font-family: var(--font-mono); padding: 8px 24px; transition: .2s; cursor: none; letter-spacing: 3px; font-size: 11px; text-transform: uppercase; }
.close-btn:hover { border-bottom-color: #fff; color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.4); }

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.65;
  cursor: none !important;
}

/* CUSTOM CURSOR */
#cur {
  position: fixed; top: 0; left: 0; width: 8px; height: 8px;
  background: var(--pass); border-radius: 50%;
  pointer-events: none; transform: translate(-50%, -50%);
  z-index: 10000; transition: width 0.2s, height 0.2s, background 0.2s;
  box-shadow: 0 0 12px rgba(0, 255, 65, 0.4);
}
#cur-ring {
  position: fixed; width: 24px; height: 24px;
  border: 1px solid rgba(0,255,65,0.4); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%);
  transition: width .18s, height .18s;
}

#bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.vig { position: fixed; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%); }
.grid { position: fixed; inset: 0; z-index: 1; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 48px 48px; }

header, nav, main, footer { position: relative; z-index: 10; }

/* CUSTOM SCROLLBARS */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--bg); border-left: 1px solid var(--border); }
::-webkit-scrollbar-thumb { background: var(--border2); }
::-webkit-scrollbar-thumb:hover { background: var(--pass); }

::selection { background: rgba(0,255,65,0.2); color: var(--pass); }

header {
  display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;
  padding: 36px 48px 28px;
  border-bottom: 2px solid var(--border);
  background: var(--surface);
  position: relative;
}
header::after {
  content:''; position:absolute; bottom:0; left:0; width:100%; height:1px;
  background: var(--pass); box-shadow: 0 0 8px var(--pass); opacity: 0.5;
}
.h-kicker { font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: var(--pass); margin-bottom: 8px; text-shadow: 0 0 5px rgba(0,255,65,0.3); }
.h-title { font-family: var(--font-display); font-size: clamp(44px, 6vw, 72px); line-height: .92; letter-spacing: 2px; color: #fff; text-shadow: 0 0 15px rgba(0,255,65,0.2); }
.h-title em { color: var(--pass); font-style: normal; }
.h-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.meta-grid { display: grid; grid-template-columns: auto auto; gap: 4px 16px; font-size: 11px; color: var(--muted); text-align: right; }
.meta-grid strong { color: #fff; font-weight: normal; letter-spacing: 1px; }

.theme-toggle { display: none; }

nav { display: flex; overflow-x: auto; background: rgba(5,12,5,0.94); border-bottom: 1px solid var(--border); padding: 0 48px; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
nav a { display: block; color: var(--muted); text-decoration: none; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; padding: 12px 16px; border-bottom: 2px solid transparent; margin-bottom: -1px; white-space: nowrap; transition: all .2s; cursor: none; }
nav a:hover { color: var(--pass); text-shadow: 0 0 8px rgba(0,255,65,0.4); background: rgba(0,255,65,0.02); }
nav a.active { color: var(--pass); border-bottom-color: var(--pass); text-shadow: 0 0 8px rgba(0,255,65,0.4); background: rgba(0,255,65,0.05); }

main { max-width: 1400px; margin: 0 auto; padding: 52px 48px; display: flex; flex-direction: column; gap: 72px; }

.sec { scroll-margin-top: 52px; }
.sh { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; position: relative; }
.sh::before { content:''; position:absolute; bottom:-1px; left:0; width:40px; height:1px; background:var(--pass); box-shadow:0 0 5px var(--pass); }
.sh-title { font-family: var(--font-display); font-size: 32px; letter-spacing: 2px; color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.1); }
.sh-meta { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--pass); text-shadow: 0 0 8px rgba(0,255,65,0.3); }

.stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 24px; box-shadow: 0 0 20px rgba(0,255,65,0.05); }
.stat-card { background: var(--panel); padding: 20px 16px 18px; position: relative; overflow: hidden; transition: background .3s; }
.stat-pass:hover { background: var(--pass-bg); }
.stat-fail:hover { background: var(--fail-bg); }
.stat-warn:hover { background: var(--warn-bg); }
.stat-skip:hover { background: var(--skip-bg); }
.stat-info:hover { background: rgba(59,232,255,0.05); }
.stat-purple:hover { background: rgba(234,128,252,0.05); }
.stat-val { font-family: var(--font-display); font-size: clamp(32px, 3.5vw, 48px); line-height: 1; letter-spacing: 1px; }
.stat-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-top: 8px; }
.stat-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
.stat-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; box-shadow: 0 0 8px currentColor; opacity: 0.8; transition: height .2s; }
.stat-card:hover .stat-bar { height: 4px; }

.stat-pass .stat-val { color: var(--pass); text-shadow: 0 0 10px rgba(0,255,65,0.3); } .stat-pass .stat-bar { background: var(--pass); color: var(--pass); }
.stat-fail .stat-val { color: var(--fail); text-shadow: 0 0 10px rgba(255,59,59,0.3); } .stat-fail .stat-bar { background: var(--fail); color: var(--fail); }
.stat-warn .stat-val { color: var(--warn); text-shadow: 0 0 10px rgba(255,170,0,0.3); } .stat-warn .stat-bar { background: var(--warn); color: var(--warn); }
.stat-info .stat-val { color: var(--info); text-shadow: 0 0 10px rgba(59,232,255,0.3); } .stat-info .stat-bar { background: var(--info); color: var(--info); }
.stat-purple .stat-val { color: var(--purple); text-shadow: 0 0 10px rgba(234,128,252,0.3); } .stat-purple .stat-bar { background: var(--purple); color: var(--purple); }

.banner { padding: 12px 16px; font-size: 11px; letter-spacing: 1.5px; border-left: 2px solid; margin-bottom: 20px; background: var(--surface); box-shadow: 0 0 10px rgba(0,0,0,0.5); text-transform: uppercase; }
.banner-ok   { border-color: var(--pass); color: var(--pass); text-shadow: 0 0 8px rgba(0,255,65,0.3); }
.banner-warn { border-color: var(--fail); color: var(--fail); text-shadow: 0 0 8px rgba(255,59,59,0.3); }

.tbl-wrap { border: 1px solid var(--border); overflow-x: auto; background: var(--surface); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
thead th { background: rgba(0,255,65,0.03); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--pass); padding: 12px 14px; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; text-shadow: 0 0 5px rgba(0,255,65,0.3); }
.th-accent { width: 3px; padding: 0 !important; }

tbody tr { border-bottom: 1px solid var(--border); transition: background .2s; }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover:not(.det-row) { background: rgba(0,255,65,0.04); }
tbody tr.row-fail { background: rgba(255,59,59,0.12); }
tbody tr.row-fail:hover:not(.det-row) { background: var(--fail-bg); }
tbody tr.row-skip { background: rgba(222,222,222,0.08); }
tbody tr.row-skip:hover:not(.det-row) { background: var(--skip-bg); }
tbody tr.row-warn:hover:not(.det-row) { background: var(--warn-bg); }
tbody td { padding: 12px 14px; vertical-align: middle; }
thead th:last-child, tbody tr:not(.det-row) td:last-child { text-align: center; }

.td-accent { width: 3px; padding: 0 !important; opacity: 0.8; }
.accent-fail { background: var(--fail); box-shadow: 0 0 8px var(--fail); }
.accent-pass { background: var(--pass); box-shadow: 0 0 8px var(--pass); }
.accent-warn { background: var(--warn); box-shadow: 0 0 8px var(--warn); }
.accent-skip { background: var(--skip); box-shadow: 0 0 8px var(--skip); }

.td-name { font-weight: normal; letter-spacing: 1px; font-size: 12px; color: #fff; text-shadow: 0 0 5px rgba(255,255,255,0.2); }
.td-cat  { font-size: 10px; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; }
.td-msg  { color: var(--muted); font-size: 11px; max-width: 280px; }

.tag { display: inline-block; font-size: 9px; font-weight: normal; letter-spacing: 2px; text-transform: uppercase; padding: 3px 8px; border: 1px solid; }
.tag-pass { background: rgba(0,255,65,0.1); color: var(--pass); border-color: rgba(0,255,65,0.4); text-shadow: 0 0 5px rgba(0,255,65,0.5); }
.tag-fail { background: rgba(255,59,59,0.1); color: var(--fail); border-color: rgba(255,59,59,0.4); text-shadow: 0 0 5px rgba(255,59,59,0.5); }
.tag-skip { background: rgba(222,222,222,0.05); color: var(--skip); border-color: rgba(222,222,222,0.2); }
.tag-warn { background: rgba(255,170,0,0.1); color: var(--warn); border-color: rgba(255,170,0,0.4); text-shadow: 0 0 5px rgba(255,170,0,0.5); }

.vbtn { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; background: transparent; border: 1px solid var(--border2); color: var(--muted); padding: 6px 12px; cursor: none; white-space: nowrap; transition: all .2s; }
.vbtn:hover           { border-color: var(--pass); color: var(--pass); background: rgba(0,255,65,0.05); text-shadow: 0 0 5px rgba(0,255,65,0.3); box-shadow: 0 0 10px rgba(0,255,65,0.1) inset; }
.vbtn.open            { border-color: var(--pass); color: var(--bg); background: var(--pass); text-shadow: none; box-shadow: 0 0 10px rgba(0,255,65,0.4); }
.vbtn-fail            { border-color: rgba(255,59,59,0.4); color: var(--fail); }
.vbtn-fail:hover      { border-color: var(--fail); color: var(--fail); background: rgba(255,59,59,0.05); text-shadow: 0 0 5px rgba(255,59,59,0.3); box-shadow: 0 0 10px rgba(255,59,59,0.1) inset; }
.vbtn-fail.open       { border-color: var(--fail); color: var(--bg); background: var(--fail); text-shadow: none; box-shadow: 0 0 10px rgba(255,59,59,0.4); }
.vbtn-skip            { border-color: rgba(222,222,222,0.3); color: var(--skip); }
.vbtn-skip:hover      { border-color: var(--skip); color: var(--skip); background: rgba(222,222,222,0.05); text-shadow: 0 0 5px rgba(222,222,222,0.3); box-shadow: 0 0 10px rgba(222,222,222,0.1) inset; }
.vbtn-skip.open       { border-color: var(--skip); color: var(--bg); background: var(--skip); text-shadow: none; box-shadow: 0 0 10px rgba(222,222,222,0.4); }


.det-row { display: none; }
.det-row.open { display: table-row; }
.det-cell { padding: 0 !important; border-left: 3px solid transparent; }
.det-cell.accent-fail { border-left-color: var(--fail); box-shadow: inset 10px 0 20px rgba(255,59,59,0.05); }
.det-cell.accent-pass { border-left-color: var(--pass); box-shadow: inset 10px 0 20px rgba(0,255,65,0.05); }
.det-cell.accent-warn { border-left-color: var(--warn); box-shadow: inset 10px 0 20px rgba(255,170,0,0.05); }
.det-cell.accent-skip { border-left-color: var(--skip); box-shadow: inset 10px 0 20px rgba(222,222,222,0.02); }

.det-pre { background: rgba(0,0,0,0.6); color: #fff; font-family: var(--font-mono); font-size: 11px; line-height: 1.8; padding: 20px 24px; overflow-x: auto; white-space: pre; border-top: 1px solid transparent; }

.ips-val   { display: block; font-size: 11px; color: var(--info); margin-bottom: 4px; text-shadow: 0 0 5px rgba(59,232,255,0.4); }
.ips-track { height: 2px; background: var(--border); width: 80px; box-shadow: inset 0 0 2px rgba(0,0,0,0.5); }
.ips-fill  { height: 100%; background: var(--info); box-shadow: 0 0 6px var(--info); }

.fn-chip { font-size: 10px; letter-spacing: 1px; padding: 4px 10px; background: rgba(255,59,59,0.1); color: var(--fail); border: 1px solid rgba(255,59,59,0.4); text-shadow: 0 0 5px rgba(255,59,59,0.3); }

footer { border-top: 1px solid var(--border); padding: 20px 48px; font-size: 10px; color: var(--muted); letter-spacing: 2px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; background: var(--surface); text-transform: uppercase; }

@media (max-width: 700px) { header, main, nav, footer { padding-left: 20px; padding-right: 20px; } .stat-grid { grid-template-columns: repeat(2, 1fr); } }

/* Back Button */
.back-btn { display: inline-block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 4px; color: var(--pass); border: 1px solid var(--border2); padding: 8px 16px; text-decoration: none; text-transform: uppercase; margin-bottom: 20px; transition: all .25s; cursor: none; background: rgba(0,255,65,0.02); }
.back-btn:hover { border-color: var(--pass); background: rgba(0,255,65,0.1); box-shadow: 0 0 10px rgba(0,255,65,0.2) inset; text-shadow: 0 0 5px rgba(0,255,65,0.4); }

'''

script_inject = '''
<div id="cur-ring"></div>
<canvas id="bg"></canvas>
<div class="grid"></div>
<div class="vig"></div>
<script>
  const THEME_COLORS = {
    'classic': '0, 255, 65',
    'pink': '255, 0, 255',
    'cherry': '255, 77, 109',
    'blue': '0, 240, 255',
    'purple': '189, 147, 249',
    'orange': '255, 170, 0',
    'gold': '255, 215, 0',
    'frost': '160, 240, 255',
    'radioactive': '191, 255, 0',
    'violet': '138, 43, 226',
    'blood': '220, 20, 60',
    'mono': '255, 255, 255'
  };
  let currentRGB = '0, 255, 65';
  
  (function(){
    let s = localStorage.getItem('theme') || 'classic';
    document.documentElement.setAttribute('data-theme', s);
    currentRGB = THEME_COLORS[s] || '0, 255, 65';
  })();

  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx=-300, my=-300, rx=-300, ry=-300;
  
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if(cur){ cur.style.left = mx+'px'; cur.style.top = my+'px'; }
  });
  
  (function loop() {
    rx += (mx-rx)*0.13; ry += (my-ry)*0.13;
    if(ring){ ring.style.left = rx+'px'; ring.style.top = ry+'px'; }
    requestAnimationFrame(loop);
  })();
  
  document.querySelectorAll('a, button, .vbtn').forEach(el => {
    el.addEventListener('mouseenter', () => { if(ring){ ring.style.width=ring.style.height='42px';} });
    el.addEventListener('mouseleave', () => { if(ring){ ring.style.width=ring.style.height='24px';} });
  });

  const canvas = document.getElementById('bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    function resize() { W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
    resize(); window.addEventListener('resize', resize);
    
    const STARS = Array.from({length:180}, () => ({
      x:Math.random(), y:Math.random(),
      r:Math.random()*1+0.2,
      base:Math.random()*0.4+0.07,
      phase:Math.random()*Math.PI*2,
      spd:Math.random()*0.02+0.006,
    }));
    
    const NODES = Array.from({length:55}, () => ({
      x:Math.random()*(innerWidth||1400),
      y:Math.random()*(innerHeight||900),
      vx:(Math.random()-.5)*.4,
      vy:(Math.random()-.5)*.4,
      r:Math.random()*1.4+0.4,
    }));
    
    const CONN=150, CPULL=180, ATT=0.0012;
    
    (function draw() {
      ctx.clearRect(0,0,W,H);
      for (const s of STARS) {
        s.phase+=s.spd;
        ctx.beginPath();
        ctx.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2);
        ctx.fillStyle=`rgba(${currentRGB},${s.base*(.5+.5*Math.sin(s.phase))})`;
        ctx.fill();
      }
      for (const n of NODES) {
        const dx=mx-n.x, dy=my-n.y, d=Math.hypot(dx,dy);
        if (d<CPULL) { const f=ATT*(1-d/CPULL); n.vx+=dx*f; n.vy+=dy*f; }
        n.vx*=.974; n.vy*=.974;
        n.x+=n.vx; n.y+=n.vy;
        if(n.x<0){n.x=0;n.vx*=-1;} if(n.x>W){n.x=W;n.vx*=-1;}
        if(n.y<0){n.y=0;n.vy*=-1;} if(n.y>H){n.y=H;n.vy*=-1;}
      }
      for (let i=0;i<NODES.length;i++) {
        for (let j=i+1;j<NODES.length;j++) {
          const d=Math.hypot(NODES[i].x-NODES[j].x, NODES[i].y-NODES[j].y);
          if(d<CONN){
            ctx.beginPath(); ctx.moveTo(NODES[i].x,NODES[i].y); ctx.lineTo(NODES[j].x,NODES[j].y);
            ctx.strokeStyle=`rgba(${currentRGB},${(1-d/CONN)*.14})`; ctx.lineWidth=.5; ctx.stroke();
          }
        }
        const cd=Math.hypot(NODES[i].x-mx, NODES[i].y-my);
        if(cd<CPULL){
          const t=1-cd/CPULL;
          ctx.beginPath(); ctx.moveTo(NODES[i].x,NODES[i].y); ctx.lineTo(mx,my);
          ctx.strokeStyle=`rgba(${currentRGB},${t*.55})`; ctx.lineWidth=t*1.3; ctx.stroke();
        }
      }
      for (const n of NODES) {
        const cd=Math.hypot(n.x-mx, n.y-my), close=cd<CPULL, t=close?1-cd/CPULL:0;
        ctx.beginPath(); ctx.arc(n.x,n.y,close?n.r*2:n.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,255,65,${close?.75:.25})`; ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  }
</script>
'''

files = ['Cosmic_Report.html', 'Madium_Report.html']
for fn in files:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <style> block
    content = re.sub(r'<style>.*?</style>', f'<style>\n{css}\n</style>', content, flags=re.DOTALL)
    
    # Replace the Google fonts link with the correct one
    content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=IBM\+Plex[^"]*" rel="stylesheet">', 
                     '<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap" rel="stylesheet">', content)
                     
    # Add back button right below <main>
    if '<a href="results.html" class="back-btn">&lt; BACK TO RESULTS</a>' not in content:
        content = content.replace('<main>', '<main>\n<a href="results.html" class="back-btn">&lt; BACK TO RESULTS</a>')

    # Add cursor injection before </body>
    # Wipe old cursor block if present
    content = re.sub(r'<div id="cur"></div>.*?</body>', '</body>', content, flags=re.DOTALL)
    content = re.sub(r'<div id="cur-ring"></div>.*?</body>', '</body>', content, flags=re.DOTALL)
    content = re.sub(r'<div id="settings-modal".*?</body>', '</body>', content, flags=re.DOTALL)

    content = content.replace('<!-- LIGHT MODE REPLACED DO NOT REMOVE -->', '')

    content = content.replace('</body>', f'<div id="cur"></div>\n{script_inject}\n<script src="lang.js"></script>\n</body>')
        
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(content)

print('Done rewriting styles.')
