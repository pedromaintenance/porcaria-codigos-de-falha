from playwright.sync_api import sync_playwright
from pathlib import Path
import re
base=Path(__file__).resolve().parents[1]
html=(base/'index.html').read_text()
html=re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>','',html)
html=re.sub(r'<link[^>]+rel="stylesheet"[^>]*>','',html)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
 errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
 pg.set_content(html)
 pg.add_style_tag(content=(base/'css/style.css').read_text())
 for f in ['data.js','core.js','app.js']:pg.add_script_tag(content=(base/'js'/f).read_text())
 assert pg.locator('.chapter').count()==8
 print('home:',pg.locator('.hero h1').inner_text()[:90])
 pg.screenshot(path='/mnt/data/porcaria_fault_mobile.png',full_page=True)
 pg.locator('button[data-action=missions]').click()
 assert pg.locator('.mission').count()==72
 pg.locator('.mission:not([disabled])').first.click()
 print('game:',pg.locator('.casehero h1').inner_text())
 pg.locator('button[data-action=safety][data-value=protect]').click();pg.locator('button[data-stage=scan]').click()
 pg.locator('button[data-action=scan]').click();pg.locator('button[data-stage=tests]').click()
 pg.locator('button[data-action=test][data-id=visual]').click();pg.locator('button[data-action=test][data-id=electric]').click()
 pg.locator('button[data-stage=diagnosis]').click();pg.locator('button[data-action=hyp][data-value="0"]').click()
 pg.locator('button[data-stage=intervention]').click();pg.locator('button[data-action=action][data-value=guided]').click()
 pg.locator('button[data-action=finish]').click()
 assert pg.locator('.scorebox').count()==1
 print('result:',pg.locator('.scorebox').inner_text()[:90])
 pg.locator('.navitem[data-target=profile]').click();pg.locator('button[data-action=toggle-instructor]').click()
 assert pg.locator('.dialog button[data-action=export]').count()==1
 pg.locator('input#ack').check()
 pg.locator('button[data-action=confirm-toggle]').click()
 assert pg.locator('.notice.success').count()==1
 print('instructor on:',pg.locator('.notice.success').inner_text()[:75])
 pg.screenshot(path='/mnt/data/porcaria_fault_instructor.png',full_page=True)
 pg.locator('.navitem[data-target=library]').click()
 print('manuals:',pg.locator('.manual').count())
 pg.locator('.navitem[data-target=catalog]').click()
 print('catalog entries:',pg.locator('.codeitem').count())
 print('js errors:',errs)
 assert not errs,errs
 b.close()
