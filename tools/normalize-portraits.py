"""SUPERSEDED by tools/reframe-portraits.py. Do not run this.

It rebuilds portraits for the seventeen hand-measured characters only, using
landmarks measured before the rest of the cast existed. Running it now would
overwrite those seventeen with the older framing and leave them inconsistent
with the other forty. Kept because the measured landmarks below are the record
of how the framing was originally established.

Build consistent transparent portraits from full artwork.
Landmarks are face center, eye line, chin measured on a 640px-high reference.
LinkedIn-style framing: square 460px canvas, head top at y=35, chin at y=285.
Face centers align at x=230; the remaining lower area shows shoulders and chest.
Add each new painted character here after measuring their face, not their hair.
"""
import sys
if '--i-know-this-is-superseded' not in sys.argv:
    raise SystemExit('Superseded by tools/reframe-portraits.py. Running this would '
                     'reframe seventeen characters inconsistently with the rest.')
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
LANDMARKS={'rowan':(108,78,126),'mira':(115,78,125),'theo':(92,80,133),'june':(254,92,137),'ellis':(204,90,140),'poppy':(140,102,147)}
LANDMARKS.update({'ada':(140,102,144),'beni':(140,101,143),'dax':(180,80,152),'mo':(187,65,117),'gus':(136,61,122),'tam':(215,91,141),'wren':(159,81,134),'opal':(147,105,155),'bell':(163,87,130),'kern':(187,66,111),'ren':(151,94,140)})
for name,(cx,eyes,chin) in LANDMARKS.items():
 im=Image.open(ROOT/f'assets/trainers/{name}-full.png').convert('RGBA')
 unit=im.height/640
 scale=(chin-5)*unit/250
 left=cx*unit-230*scale
 top=5*unit-35*scale
 out=im.transform((460,460),Image.Transform.AFFINE,(scale,0,left,0,scale,top),Image.Resampling.BICUBIC,fillcolor=(0,0,0,0))
 out.save(ROOT/f'assets/trainers/{name}-portrait.png',optimize=True)
 print(name)
