"""Quiz 2 only: ten distinct problems in each of 19 Field Manual families.
The original eight problems keep their IDs; new variants are appended separately.
Every numerical result has a closed-form oracle independent of symbolic integration,
and is checked again by numerical quadrature. No random duplicate parameter draws.
"""
from pathlib import Path
import json
import sympy as s
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
x,y=s.symbols('x y', real=True)
rows=[]; evidence=[]; families=[]

def f(e):
    return s.sstr(s.simplify(e)).replace('**','^').replace('sqrt(', '√(').replace('log(', 'ln(').replace('pi','π').replace('*','·').replace('-', '−')

def interval(a,b): return '['+f(a)+', '+f(b)+']'
def integ(g,v,a,b): return '∫ from '+f(a)+' to '+f(b)+' of ('+f(s.expand(g))+') d'+str(v)

def numeric_check(g,v,a,b,result,breaks=None):
    pieces=[a]+(breaks or [])+[b]
    calc=sum(s.integrate(g if not isinstance(g,list) else g[j],(v,pieces[j],pieces[j+1])) for j in range(len(pieces)-1))
    assert s.simplify(calc-result)==0,(g,calc,result)
    mp.mp.dps=35
    numeric=mp.mpf('0')
    for j in range(len(pieces)-1):
        fn=s.lambdify(v,g if not isinstance(g,list) else g[j],'mpmath')
        aa=mp.mpf(str(s.N(pieces[j],36)));bb=mp.mpf(str(s.N(pieces[j+1],36)))
        numeric+=mp.quad(fn,[aa,(aa+bb)/2,bb])
    assert abs(numeric-mp.mpf(str(s.N(result,36))))<mp.mpf('1e-24')*max(1,abs(numeric))
    return {'integrands':[s.sstr(z) for z in g] if isinstance(g,list) else [s.sstr(g)],'variable':str(v),'bounds':[s.sstr(z) for z in pieces],'expected':s.sstr(result),'numeric':str(numeric)}

def add(fam,i,lesson,name,source,q,ans,why,hints,wrong=None,proof=None,choices=None):
    # i=0 is an existing original for the first eight families.
    if i==0 and fam<=8:return
    qid=f'k2-p-{fam:03}'+('' if i==0 else 'bcdefghij'[i-1])
    if choices is None:
        bad=[]
        for value in (wrong or [])+[2*ans,ans/2,-ans,ans+1,3*ans,ans+2]:
            value=s.simplify(value)
            if s.simplify(value-ans)!=0 and all(s.simplify(value-b)!=0 for b in bad):bad.append(value)
            if len(bad)==3:break
        assert len(bad)==3
        vals=[s.simplify(ans)]+bad
        choices=[f(v) for v in vals]
        symbolic=[s.sstr(v) for v in vals]
    else:symbolic=None
    target=(fam+i)%4
    choices[0],choices[target]=choices[target],choices[0]
    if symbolic:symbolic[0],symbolic[target]=symbolic[target],symbolic[0]
    assert len(set(choices))==4,(qid,choices)
    assert len(hints)==3
    tier=2 if i<3 else 3 if i<7 else 4
    rows.append(dict(id=qid,chapter=2,lesson=lesson,t=tier,k='mcq',tag='Applied' if tier<4 else 'Exam',q=q,c=choices,a=target,why=why,hints=hints,code='',family=f'quiz2-{fam:03}',familyName=name,variation=i+1,source=f'Calculus II Field Manual, Lesson {lesson}: {source}'))
    evidence.append(dict(id=qid,family=fam,variation=i+1,proof=proof,choiceExpressions=symbolic,answerIndex=target))

def integral_problem(fam,i,lesson,name,source,q,g,v,a,b,answer,setup,wrong=None,breaks=None):
    proof=numeric_check(g,v,a,b,answer,breaks)
    if isinstance(g,list):
        pts=[a]+breaks+[b]
        calculation=' + '.join(integ(part,v,pts[j],pts[j+1]) for j,part in enumerate(g))
    else:calculation=integ(g,v,a,b)
    antiderivative='; '.join(f(s.integrate(part,v)) for part in g) if isinstance(g,list) else f(s.integrate(g,v))
    add(fam,i,lesson,name,source,q,answer,setup+' '+calculation+'. Antiderivative'+('s' if isinstance(g,list) else '')+': '+antiderivative+'. Evaluate at the bounds to get '+f(answer)+'.',[
        'Sketch the region and identify the '+('top and bottom curves, or right and left boundaries.' if lesson==5 else 'slice and its dimensions before integrating.'),
        setup,
        'Evaluate '+calculation+'. Use '+antiderivative+' as the antiderivative'+('s.' if isinstance(g,list) else '.')],wrong,proof)

for i in range(10):
    # 1. Line/parabola through origin, exact intersections and positive gap.
    a=s.Integer(1+i//5);b=s.Integer([2,3,4,5,6,3,5,7,9,11][i]);h=b/a
    integral_problem(1,i,5,'Line and parabola','worked example and practice 3',f'Find the enclosed area between y = {f(a*x*x)} and y = {f(b*x)}.',b*x-a*x*x,x,0,h,b**3/(6*a*a),f'They meet at x = 0 and {f(h)}. The line is above the parabola between them.',[b**3/(3*a*a),b**3/(6*a)])
    # 2. Opposing parabolas, symmetric endpoints.
    a=s.Integer(1+i%3);r=s.Integer(2+i);c=a*r*r
    integral_problem(2,i,5,'Opposing parabolas','top minus bottom and symmetry',f'Find the area enclosed by y = {f(a*x*x-c)} and y = {f(c-a*x*x)}.',2*(c-a*x*x),x,-r,r,8*a*r**3/3,f'The intersections are x = ±{r}. The downward-opening parabola is on top.',[4*a*r**3/3,-8*a*r**3/3])
    # 3. dy setup. Parameter has integer intersections -r and r+1.
    r=s.Integer(i+1);b=r*(r+1);lo=-r;hi=r+1;g=y+b-y*y;ans=(2*r+1)**3/6
    proof=numeric_check(g,y,lo,hi,ans)
    opts=[integ(g,y,lo,hi),integ(-g,y,lo,hi),integ(g,y,0,hi),integ(g,y,-hi,-lo)]
    add(3,i,5,'Horizontal area strips','practice 4',f'The region bounded by x = y² and x = y + {b} is integrated with respect to y. Which integral gives its area?',ans,f'The intersections are y = {lo} and {hi}. Use right minus left: the line minus the parabola. The area is {f(ans)}.',[
        'With horizontal strips, integrate right minus left using y-values as limits.',f'Solve y² = y + {b}: the roots are {lo} and {hi}.',f'The line is to the right throughout this interval. Its gap from the parabola is {f(g)}.'],proof=proof,choices=opts)
    # 4. Radical disks with distinct interval/coefficient pairs.
    a=s.Integer(1+i%3);b=s.Integer(4+i);g=s.pi*a*x
    integral_problem(4,i,6,'Radical disks','practice 1',f'Rotate the region between y = √({f(a*x)}), y = 0, x = 0 and x = {b} about the x-axis. Find the volume.',g,x,0,b,s.pi*a*b*b/2,f'The slice is a disk with R = √({f(a*x)}), so its area is π·{f(a*x)}.',[s.pi*a*b, a*b*b/2])
    # 5. Washers between two powers, amplitude variation avoids duplicates.
    a=s.Integer(1+i);n=2+i%3;R=a*x;r=a*x**n
    integral_problem(5,i,6,'Difference of squared radii','practice 3',f'Rotate the region between y = {f(R)} and y = {f(r)} on [0, 1] about the x-axis. Find the volume.',s.pi*(R*R-r*r),x,0,1,s.pi*a*a*(s.Rational(1,3)-s.Rational(1,2*n+1)),f'On (0, 1), R = {f(R)} and r = {f(r)}. Square each radius separately before subtracting.',[s.pi*a*a*(s.Rational(1,3)-s.Rational(2,n+2)+s.Rational(1,2*n+1))])
    # 6. Squares on a circular base. Whole chord is the side, not half.
    r=s.Integer(1+i)
    integral_problem(6,i,6,'Square cross-sections','practice 5',f'A solid has base x² + y² ≤ {r*r}. Cross-sections perpendicular to the x-axis are squares whose sides span the full base chord. Find its volume.',4*(r*r-x*x),x,-r,r,s.Rational(16,3)*r**3,f'The side is 2√({r*r} − x²), so A(x) = 4({r*r} − x²). This is slicing, not revolution.',[s.Rational(4,3)*r**3,s.Rational(8,3)*r**3,s.Rational(16,3)*s.pi*r**3])
    # 7. Shifted distance, explicitly connect the boundary to the axis.
    c=s.Integer(2+i);horizontal=i%2==0;var='x' if horizontal else 'y';fn='f(x)' if horizontal else 'g(y)';axis='y' if horizontal else 'x'
    opts=[f'|{fn} − {c}|',fn,f'{fn} + {c}',f'{fn}/{c}']
    add(7,i,6,'Radius measured from a shifted axis','toolkit and shifted-line discussion',f'A slice extends from the line {axis} = {c} to the boundary {axis} = {fn}. Rotate this slice about {axis} = {c}. What is the disk radius?',None,f'The radius is the distance between {fn} and {c}: |{fn} − {c}|. The slice touches the axis, so there is no inner hole.',[
        'Measure from the axis of revolution, not from zero.',f'The boundary coordinate is {fn}; the axis coordinate is {c}.','A distance is nonnegative, so take the absolute value of their difference.'],choices=opts,proof={'distance':'absolute difference','axis':int(c),'horizontal':horizontal})
    # 8. Signed integral versus total area, multiple frequencies and amplitudes.
    a=s.Integer(1+i);k=s.Integer(1+i%3);g=a*s.sin(k*x);hi=2*s.pi/k
    integral_problem(8,i,5,'Total area versus signed integral','crossing-curves trap',f'Find the total area between y = {f(g)} and the x-axis on {interval(0,hi)}.',[g,-g],x,0,hi,4*a/k,f'The sign changes at x = {f(s.pi/k)}. Each of the two humps has area {f(2*a/k)}; add their magnitudes.',[s.Integer(0),2*a/k,4*a],breaks=[s.pi/k])
    # 9. Manual practice L5.1.
    r=s.Integer(i+1);a=s.Integer(1+i%2);h=a*r*r
    integral_problem(9,i,5,'Parabola capped by a horizontal line','practice 1',f'Find the area bounded by y = {f(a*x*x)} and y = {h}.',h-a*x*x,x,-r,r,s.Rational(4,3)*a*r**3,f'The curves meet at x = ±{r}. The horizontal line is above the parabola.',[s.Rational(2,3)*a*r**3])
    # 10. Manual practice L5.2.
    a=s.Integer(i+1);n=3+i%3
    integral_problem(10,i,5,'Area between a line and a higher power','practice 2',f'Find the area between y = {f(a*x)} and y = {f(a*x**n)} on [0, 1].',a*(x-x**n),x,0,1,a*(s.Rational(1,2)-s.Rational(1,n+1)),f'For 0 < x < 1, x > x^{n}. Use the line minus the power curve.',[a*(s.Rational(1,2)+s.Rational(1,n+1))])
    # 11. Shifted line and parabola, negative and positive intersections.
    lo=s.Integer(-1-i%3);hi=s.Integer(3+i);c=s.Integer(4+i);line=(lo+hi)*x-lo*hi-c;par=x*x-c;gap=line-par
    integral_problem(11,i,5,'Shifted line and parabola intersections','practice 3',f'Find the enclosed area between y = {f(par)} and y = {f(line)}.',gap,x,lo,hi,(hi-lo)**3/6,f'The gap factors as (x − ({lo}))({hi} − x). It is positive from {lo} to {hi}, so the line is on top.',[(hi-lo)**3/12])
    # 12. Manual practice L5.5, scaled frequency and amplitude.
    a=s.Integer(1+i);k=s.Integer(1+i%3);v=a*(s.cos(k*x)-s.sin(k*x));cut=s.pi/(4*k);hi=s.pi/k
    integral_problem(12,i,5,'Sine and cosine swap order','practice 5',f'Find the area between y = {f(a*s.sin(k*x))} and y = {f(a*s.cos(k*x))} on {interval(0,hi)}.',[v,-v],x,0,hi,2*s.sqrt(2)*a/k,f'They cross once inside the interval, at x = {f(cut)}. Cosine is on top before that point; sine is on top after it.',[2*a/k,s.sqrt(2)*a/k],breaks=[cut])
    # 13. Reciprocal powers intersect at 1, no singularities in the interval.
    a=s.Integer(1+i%3);b=s.Integer(2+i)
    integral_problem(13,i,5,'Reciprocal-curve area','practice 6',f'Find the bounded area enclosed by y = {f(a/x)}, y = {f(a/x**2)}, and x = {b}, in the half-plane x > 0.',a/x-a/x**2,x,1,b,a*(s.log(b)+s.Rational(1,b)-1),f'The curves meet at x = 1. On (1, {b}), {f(a/x)} is above {f(a/x**2)}.',[a*s.log(b),a*(s.log(b)-s.Rational(1,b)+1)])
    # 14. Equal-area cut, independently solve the monotone area equation.
    a=s.Integer(1+i%2);h=s.Integer(4+i);c=h/2**s.Rational(2,3);total=4*h**s.Rational(3,2)/(3*s.sqrt(a));lower=4*c**s.Rational(3,2)/(3*s.sqrt(a));assert s.simplify(lower-total/2)==0
    add(14,i,5,'Equal-area horizontal cut','practice 7',f'Find c > 0 so that y = c divides the region between y = {f(a*x*x)} and y = {h} into two equal areas.',c,f'At height y, the width is 2√(y/{a}). The area below c is 4c^(3/2)/(3√({a})); the total is 4·{h}^(3/2)/(3√({a})). Set the first equal to half the second: c^(3/2) = {h}^(3/2)/2. Thus c = {f(c)}, which lies between 0 and {h}.',[
        'Use horizontal strips because the cutting line is horizontal.',f'The width at height y is 2√(y/{a}). Integrate from 0 to c for the lower piece.',f'Set c^(3/2) = {h}^(3/2)/2 and raise both sides to the power 2/3.'],[h/2,h/4,h/s.sqrt(2)],proof={'expected':s.sstr(c),'height':int(h),'coefficient':int(a),'lowerArea':s.sstr(lower),'totalArea':s.sstr(total)})
    # 15. L6.2 calls these disks in its stem, but geometry requires washers.
    a=s.Integer(1+i%3);b=s.Integer(2+i);hi=a*b*b
    integral_problem(15,i,6,'Washers about the y-axis','practice 2',f'Rotate the region bounded by y = {f(a*x*x)}, x = {b} and y = 0 about the y-axis. Use horizontal washers to find the volume.',s.pi*(b*b-y/a),y,0,hi,s.pi*a*b**4/2,f'For 0 ≤ y ≤ {hi}, the horizontal strip runs from x = √(y/{a}) to x = {b}. Thus R = {b} and r = √(y/{a}).',[s.pi*a*b**4,s.pi*b**4/2])
    # 16. Shifted horizontal axis below the entire cap.
    r=s.Integer(2+i%4);d=s.Integer(2+i);h=r*r
    integral_problem(16,i,6,'Shifted horizontal washers below the region','practice 4',f'Rotate the region between y = {f(h-x*x)} and y = 0 about y = −{d}. Find the volume.',s.pi*((h-x*x+d)**2-d*d),x,-r,r,s.pi*(s.Rational(16,15)*r**5+s.Rational(8,3)*d*r**3),f'The bounds are ±{r}. Measure from y = −{d}: R = {f(h+d-x*x)} and r = {d}.',[s.pi*s.Rational(16,15)*r**5])
    # 17. Exponential radius must be squared, not its exponent.
    k=s.Integer(1+i%3);b=s.Integer(1+i//3);a=s.Integer(1+i%2)
    integral_problem(17,i,6,'Exponential disk volumes','practice 6',f'Rotate the region between y = {f(a*s.exp(k*x))}, y = 0, x = 0 and x = {b} about the x-axis. Find the exact volume.',s.pi*a*a*s.exp(2*k*x),x,0,b,s.pi*a*a*(s.exp(2*k*b)-1)/(2*k),f'R = {f(a*s.exp(k*x))}, so R² = {f(a*a*s.exp(2*k*x))}. The exponent doubles when the radius is squared.',[s.pi*a*a*(s.exp(k*b)-1)/k])
    # 18. Shifted vertical axis touches region, hence disks, not hollow washers.
    b=s.Integer(4+i);hi=s.sqrt(b)
    integral_problem(18,i,6,'Disks about a shifted vertical axis','practice 7',f'Rotate the region bounded by y = √x, y = 0 and x = {b} about x = {b}. Use horizontal slices to find the volume.',s.pi*(b-y*y)**2,y,0,hi,s.Rational(8,15)*s.pi*b**s.Rational(5,2),f'For y from 0 to {f(hi)}, the strip runs from x = y² to the axis x = {b}. R = {b} − y² and r = 0.',[s.pi*b**s.Rational(5,2)/5])
    # 19. Same washer method with the axis above: outer/inner swap.
    b=s.Integer(2+i%4);c=b*b+1+i;R=c-x*x;r=c-b*x
    integral_problem(19,i,6,'Shifted horizontal washers above the region','shifted-line worked discussion',f'Rotate the enclosed region between y = x² and y = {f(b*x)} about y = {c}. Find the volume.',s.pi*(R*R-r*r),x,0,b,s.pi*(s.Rational(c,3)*b**3-s.Rational(2,15)*b**5),f'The intersections are 0 and {b}. The axis lies above both curves. The lower parabola is farther away, so R = {f(R)} and r = {f(r)}.',[s.pi*s.Rational(2,15)*b**5])

assert len(rows)==182,len(rows)
assert len({q['id'] for q in rows})==len(rows)
assert len({q['q'] for q in rows})==len(rows),'duplicate stems'
assert all('—' not in json.dumps(q,ensure_ascii=False) for q in rows)
for fam in range(1,20):
    r=next(q for q in rows if q['family']==f'quiz2-{fam:03}')
    families.append({'id':r['family'],'name':r['familyName'],'lesson':r['lesson'],'source':r['source'],'count':10})
header='/* Generated by tools/calc/build-quiz2.py. Quiz 2: Field Manual lessons 5 and 6 only. */\n'
js=header+'(function(){\nconst rows = '+json.dumps(rows,ensure_ascii=False,indent=2)+';\n'
js+='for(const q of rows){if(CALC_QBANK[2].some(old=>old.id===q.id))throw Error("Duplicate Quiz 2 ID: "+q.id);CALC_QBANK[2].push(q);}\n'
js+='const families = '+json.dumps(families,ensure_ascii=False)+';\n'
js+='for(let n=1;n<=8;n++){const q=CALC_QBANK[2].find(q=>q.id==="k2-p-"+String(n).padStart(3,"0"));if(q){q.family=families[n-1].id;q.familyName=families[n-1].name;q.variation=1;q.source=families[n-1].source;}}\n'
js+='window.CALC_QUIZ2_FAMILIES=families;\n})();\n'
(ROOT/'js/data/calc/calc-questions-quiz2.js').write_text(js,encoding='utf-8')
(ROOT/'output/calc/quiz2-verification.json').write_text(json.dumps({'families':families,'added':len(rows),'checks':evidence},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Wrote {len(rows)} additional questions: 19 families x 10 including 8 preserved originals. Symbolic and numerical checks passed.')
