/* Tenfold Calculus II practice.

   Every family below generates exactly ten deterministic pencil-and-paper
   variations. Questions are original and aligned to the supplied Thomas'
   Calculus 13e reference plus the Converging Isles lesson map. Each item has
   three progressive hints and a complete worked explanation. */
(function () {
'use strict';
var SIZE = 10;
var added = [];
var families = [];

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { var t = a % b; a = b; b = t; }
  return a || 1;
}
function frac(n, d) {
  if (d < 0) { n = -n; d = -d; }
  var g = gcd(n, d); n /= g; d /= g;
  return d === 1 ? String(n) : n + '/' + d;
}
function pick(correct, distractors, seed) {
  var others = [];
  (distractors || []).forEach(function (x) {
    x = String(x);
    if (x !== String(correct) && others.indexOf(x) < 0) others.push(x);
  });
  ['0', '1', 'Does not exist', 'Diverges'].forEach(function (x) {
    if (x !== String(correct) && others.indexOf(x) < 0 && others.length < 3) others.push(x);
  });
  var answer = seed % 4;
  var choices = others.slice(0, 3);
  choices.splice(answer, 0, String(correct));
  return { choices: choices, answer: answer };
}
function family(meta, build) {
  var made = [];
  for (var i = 0; i < SIZE; i++) {
    var p = build(i);
    var selected = pick(p.correct, p.wrong, i + meta.lesson);
    var id = 'k' + meta.chapter + '-ten-' + meta.lesson + '-' + meta.slug + '-' + String(i + 1).padStart(2, '0');
    var q = {
      id: id, chapter: meta.chapter, lesson: meta.lesson,
      t: p.t || (2 + (i % 3)), k: 'mcq', tag: 'Tenfold practice',
      q: p.q, c: selected.choices, a: selected.answer,
      why: p.why, hints: p.hints, code: '',
      family: 'tenfold-L' + String(meta.lesson).padStart(2, '0') + '-' + meta.slug,
      familyName: meta.name, variation: i + 1,
      source: "Thomas' Calculus: Early Transcendentals, 13e (accessible reference), Section " + meta.section + '; original parameterized variation',
      penPaper: true
    };
    CALC_QBANK[meta.chapter] = CALC_QBANK[meta.chapter] || [];
    if (CALC_QBANK[meta.chapter].some(function (old) { return old.id === id; })) throw Error('Duplicate tenfold ID: ' + id);
    CALC_QBANK[meta.chapter].push(q); added.push(q); made.push(q);
  }
  families.push({ id: made[0].family, name: meta.name, chapter: meta.chapter, lesson: meta.lesson, count: made.length });
}

/* Gym 1 - vectors. */
family({ chapter:1, lesson:1, slug:'components-magnitude', name:'Components and magnitude', section:'12.2' }, function (i) {
  var a=i+2, b=i+3, n=a*a+b*b;
  return { q:'Find the magnitude of v = ('+a+', -'+b+').', correct:'sqrt('+n+')',
    wrong:['sqrt('+(a+b)+')', String(n), 'sqrt('+Math.abs(a*a-b*b)+')'],
    why:'|v| = sqrt('+a+'^2 + (-'+b+')^2) = sqrt('+n+').',
    hints:['Square each component before adding.','The negative component becomes positive when squared.','Compute '+a+'^2 + '+b+'^2, then take the square root.'] };
});
family({ chapter:1, lesson:1, slug:'unit-scaled', name:'Unit direction and prescribed length', section:'12.2' }, function (i) {
  var L=i+6, x=frac(3*L,5), y=frac(4*L,5);
  return { q:'Find the vector of length '+L+' pointing in the direction of (3, 4).', correct:'('+x+', '+y+')',
    wrong:['('+3*L+', '+4*L+')','('+frac(L,3)+', '+frac(L,4)+')','(3/5, 4/5)'],
    why:'The direction vector has magnitude 5, so its unit vector is (3/5, 4/5). Multiplying by '+L+' gives ('+x+', '+y+').',
    hints:['Normalize the direction vector first.','The magnitude of (3, 4) is 5.','Multiply (3/5, 4/5) by '+L+'.'] };
});
family({ chapter:1, lesson:2, slug:'displacement-distance', name:'Displacement and distance in space', section:'12.1-12.2' }, function (i) {
  var a=i+1,b=i+2,c=i+3,n=a*a+b*b+c*c;
  return { q:'A point moves from P = ('+i+', -'+i+', '+(i+1)+') by displacement ('+a+', '+b+', -'+c+'). What straight-line distance does it travel?', correct:'sqrt('+n+')',
    wrong:[String(n),'sqrt('+(a+b+c)+')','sqrt('+Math.abs(a*a+b*b-c*c)+')'],
    why:'Distance is the magnitude of the displacement: sqrt('+a+'^2 + '+b+'^2 + (-'+c+')^2) = sqrt('+n+').',
    hints:['The starting point is not needed once displacement is known.','Take the magnitude of the displacement vector.','Square '+a+', '+b+', and '+c+', add, and take the square root.'] };
});
family({ chapter:1, lesson:2, slug:'sphere-equation', name:'Equations of spheres', section:'12.1' }, function (i) {
  var h=i-4,k=(i%5)-2,l=3-(i%4),r=i+2;
  var correct='(x - ('+h+'))^2 + (y - ('+k+'))^2 + (z - ('+l+'))^2 = '+r*r;
  return { q:'Write the equation of the sphere centered at ('+h+', '+k+', '+l+') with radius '+r+'.', correct:correct,
    wrong:['(x + ('+h+'))^2 + (y + ('+k+'))^2 + (z + ('+l+'))^2 = '+r*r,'(x - ('+h+'))^2 + (y - ('+k+'))^2 + (z - ('+l+'))^2 = '+r,'x^2 + y^2 + z^2 = '+r*r],
    why:'A sphere with center (h, k, l) and radius r has equation (x-h)^2 + (y-k)^2 + (z-l)^2 = r^2. Substitution gives '+correct+'.',
    hints:['Use the standard center-radius form.','Subtract each center coordinate inside its square.','The right side is radius squared: '+r+'^2 = '+r*r+'.'] };
});
family({ chapter:1, lesson:3, slug:'dot-angle', name:'Dot product and angle classification', section:'12.3' }, function (i) {
  var a=i+1,b=(i%4)-1,d=a+2*b-3;
  var kind=d>0?'acute':d<0?'obtuse':'right';
  return { q:'For u = ('+a+', 2, -1) and v = (1, '+b+', 3), compute u dot v and classify the angle.', correct:d+'; '+kind,
    wrong:[(-d)+'; '+(d>0?'obtuse':'acute'),d+'; right',(a+2+b-3)+'; acute'],
    why:'u dot v = '+a+'(1) + 2('+b+') + (-1)(3) = '+d+'. A '+(d>0?'positive':d<0?'negative':'zero')+' dot product means the angle is '+kind+'.',
    hints:['Multiply matching components and add.','The dot product is '+a+' + 2('+b+') - 3.','Use the sign of the result: positive acute, zero right, negative obtuse.'] };
});
family({ chapter:1, lesson:3, slug:'projection', name:'Scalar and vector projection', section:'12.3' }, function (i) {
  var a=i+2,b=i%5+1,d=3*a+4*b,s=frac(d,5),x=frac(3*d,25),y=frac(4*d,25);
  return { q:'Let u = ('+a+', '+b+') and v = (3, 4). Find comp_v(u) and proj_v(u).', correct:s+' and ('+x+', '+y+')',
    wrong:[frac(d,25)+' and ('+x+', '+y+')',s+' and ('+frac(3*d,5)+', '+frac(4*d,5)+')','('+x+', '+y+') and '+s],
    why:'u dot v = '+d+', |v| = 5, and |v|^2 = 25. Thus comp_v(u) = '+d+'/5 = '+s+', while proj_v(u) = ('+d+'/25)(3,4) = ('+x+', '+y+').',
    hints:['Scalar projection divides by |v|; vector projection divides by |v|^2 and then multiplies by v.','Here |v| = 5 and |v|^2 = 25.','First compute u dot v = '+d+'.'] };
});
family({ chapter:1, lesson:4, slug:'cross-product', name:'Cross products and orientation', section:'12.4' }, function (i) {
  var a=i+1,b=i+2;
  return { q:'Compute u cross v for u = ('+a+', 1, 0) and v = (0, '+b+', 1).', correct:'(1, -'+a+', '+(a*b)+')',
    wrong:['(-1, '+a+', -'+(a*b)+')','(1, '+a+', '+(a*b)+')','('+b+', -'+a+', 1)'],
    why:'The determinant gives (1*1 - 0*'+b+', -( '+a+'*1 - 0*0), '+a+'*'+b+' - 1*0) = (1, -'+a+', '+(a*b)+').',
    hints:['Expand the 3 by 3 determinant.','Keep the minus sign on the middle cofactor.','Check the result by dotting it with each original vector; both dot products should be zero.'] };
});
family({ chapter:1, lesson:4, slug:'cross-area-volume', name:'Area and volume from cross products', section:'12.4' }, function (i) {
  var a=i+2,b=i+3,area=a*b;
  return { q:'Vectors u = ('+a+', 0, 0) and v = (0, '+b+', 0) span a parallelogram. Find its area and the volume after adding w = (0, 0, '+(i+1)+').', correct:area+' and '+(area*(i+1)),
    wrong:[frac(area,2)+' and '+area*(i+1),area+' and '+area, String(area*(i+1))+' and '+area],
    why:'|u cross v| = |(0,0,'+area+')| = '+area+'. The scalar triple product with w has magnitude '+area+'*'+(i+1)+' = '+area*(i+1)+'.',
    hints:['Parallelogram area is |u cross v|.','These axis-aligned vectors make u cross v = (0,0,'+area+').','Volume is |(u cross v) dot w|.'] };
});

/* Gym 3 and the first exam route - shells, length, work, fluids, parts. */
family({ chapter:3, lesson:7, slug:'shells-standard', name:'Cylindrical shells about a coordinate axis', section:'6.2' }, function (i) {
  var h=i+2, coeff=frac(h*h*h,3);
  return { q:'Use shells to revolve the region under y = '+h+' - x on 0 <= x <= '+h+' about the y-axis. Find the volume.', correct:coeff+'pi',
    wrong:[frac(2*h*h*h,3)+'pi',h*h+'pi',frac(h*h*h,2)+'pi'],
    why:'V = 2pi integral from 0 to '+h+' of x('+h+' - x) dx = 2pi['+h+'x^2/2 - x^3/3]_0^'+h+' = '+coeff+'pi.',
    hints:['Shell radius is x and shell height is '+h+' - x.','Set up 2pi integral x('+h+' - x) dx from 0 to '+h+'.','Integrate '+h+'x - x^2, then apply the factor 2pi.'] };
});
family({ chapter:3, lesson:7, slug:'shells-shifted-axis', name:'Shells about a shifted vertical axis', section:'6.2' }, function (i) {
  var h=i+2,c=(i%4)+1, coeff=frac(h*h*h+3*c*h*h,3);
  return { q:'Revolve the region under y = '+h+' - x on 0 <= x <= '+h+' about x = -'+c+'. Use shells to find the volume.', correct:coeff+'pi',
    wrong:[frac(h*h*h,3)+'pi',frac(h*h*h+3*c*h,3)+'pi',frac(2*(h*h*h+3*c*h*h),3)+'pi'],
    why:'The shell radius is x + '+c+' and height is '+h+' - x. Thus V = 2pi integral_0^'+h+' (x + '+c+')('+h+' - x) dx = '+coeff+'pi.',
    hints:['Radius is distance to x = -'+c+', not distance to the y-axis.','Use radius x + '+c+' and height '+h+' - x.','Expand before integrating, then multiply the result by 2pi.'] };
});
family({ chapter:3, lesson:8, slug:'arc-length-perfect-square', name:'Arc length with a simplifying radical', section:'6.3' }, function (i) {
  var a=i+1, ans=frac(a*a*a+3*a,3);
  return { q:'Find the arc length of y = (1/3)(x^2 + 2)^(3/2) from x = 0 to x = '+a+'.', correct:ans,
    wrong:[frac(a*a*a,3),String(a*a+1),frac(a*a*a+6*a,3)],
    why:"y' = x sqrt(x^2 + 2), so sqrt(1 + (y')^2) = sqrt((x^2 + 1)^2) = x^2 + 1. Integrating from 0 to "+a+' gives x^3/3 + x = '+ans+'.',
    hints:["Differentiate, then form sqrt(1 + (y')^2).",'The expression under the radical becomes (x^2 + 1)^2.','Integrate x^2 + 1 from 0 to '+a+'.'] };
});
family({ chapter:3, lesson:8, slug:'surface-revolution', name:'Surface area of revolution', section:'6.4' }, function (i) {
  var r=i+2, ans=4*r*r;
  return { q:'The upper semicircle y = sqrt('+r*r+' - x^2), -'+r+' <= x <= '+r+', is revolved about the x-axis. Find the surface area.', correct:ans+'pi',
    wrong:[2*r*r+'pi',r*r+'pi',4*r+'pi'],
    why:"S = 2pi integral y sqrt(1 + (y')^2) dx. Here y' = -x/sqrt("+r*r+' - x^2), and the product y sqrt(1 + (y\')^2) simplifies to '+r+'. Therefore S = 2pi integral_-'+r+'^'+r+' '+r+' dx = '+ans+'pi.',
    hints:['Use S = 2pi integral (radius)(arc-length factor) dx.','Differentiate the semicircle and simplify before integrating.','The radius factor times the square-root factor simplifies to the constant '+r+'.'] };
});
family({ chapter:3, lesson:9, slug:'mass-density', name:'Mass from a linear density', section:'6.6' }, function (i) {
  var a=i+1,b=(i%4)+1,L=i+2, ans=frac(2*a*L+b*L*L,2);
  return { q:'A rod occupies 0 <= x <= '+L+' and has density rho(x) = '+a+' + '+b+'x. Find its mass.', correct:ans,
    wrong:[String(a+b*L),frac(a*L+b*L*L,2),String(a*L+b*L*L)],
    why:'Mass is integral_0^'+L+' ('+a+' + '+b+'x) dx = ['+a+'x + '+b+'x^2/2]_0^'+L+' = '+ans+'.',
    hints:['Mass is the integral of linear density.','Integrate the constant and x terms separately.','Evaluate '+a+'x + '+b+'x^2/2 at x = '+L+'.'] };
});
family({ chapter:3, lesson:9, slug:'spring-work', name:'Work against a spring', section:'6.5' }, function (i) {
  var k=i+2,a=(i%3)+1,b=a+i+2,ans=frac(k*(b*b-a*a),2);
  return { q:'A spring has force law F(x) = '+k+'x. Find the work required to stretch it from x = '+a+' to x = '+b+'.', correct:ans,
    wrong:[String(k*(b-a)),frac(k*(b-a)*(b-a),2),String(k*(b*b-a*a))],
    why:'W = integral_'+a+'^'+b+' '+k+'x dx = ('+k+'/2)('+b+'^2 - '+a+'^2) = '+ans+'.',
    hints:['Variable-force work is integral F(x) dx.','Use bounds '+a+' and '+b+' on integral '+k+'x dx.','Evaluate ('+k+'/2)(b^2 - a^2).'] };
});
family({ chapter:91, lesson:10, slug:'pumping-cylinder', name:'Pumping liquid from a cylindrical tank', section:'6.5' }, function (i) {
  var r=(i%3)+1,h=i+2,d=(i%4)+1,w=10*(i+1),coef=frac(w*r*r*(h*h+2*d*h),2);
  return { q:'A full vertical cylindrical tank has radius '+r+', height '+h+', and liquid weight-density '+w+'. Pump all liquid to an outlet '+d+' above the top. Find the work.', correct:coef+'pi',
    wrong:[frac(w*r*r*h*h,2)+'pi',String(w*r*r*h*(h+d))+'pi',frac(w*r*(h*h+2*d*h),2)+'pi'],
    why:'A slice at height y weighs '+w+'pi('+r+'^2)dy and rises '+h+' + '+d+' - y. Thus W = '+w+'pi('+r+'^2) integral_0^'+h+' ('+(h+d)+' - y)dy = '+coef+'pi.',
    hints:['Use horizontal slices of volume pi r^2 dy.','A slice at height y travels '+(h+d)+' - y.','Integrate weight-density times slice volume times lifting distance from 0 to '+h+'.'] };
});
family({ chapter:91, lesson:10, slug:'hydrostatic-force', name:'Hydrostatic force on a vertical plate', section:'6.5' }, function (i) {
  var width=i+2,a=(i%4)+1,h=(i%5)+2,w=10*(i+1),ans=frac(w*width*(2*a*h+h*h),2);
  return { q:'A vertical rectangular plate is '+width+' units wide, with its top '+a+' units below a liquid surface and height '+h+'. The liquid weight-density is '+w+'. Find the total fluid force.', correct:String(ans),
    wrong:[String(w*width*h),String(w*width*(a+h)),String(w*width*h*(a+h))],
    why:'At depth y, pressure is '+w+'y and strip area is '+width+' dy. Force = '+(w*width)+' integral_'+a+'^'+(a+h)+' y dy = '+ans+'.',
    hints:['Pressure equals weight-density times depth.','Use a horizontal strip of area '+width+' dy.','Integrate '+(w*width)+'y from depth '+a+' to '+(a+h)+'.'] };
});
family({ chapter:91, lesson:11, slug:'parts-polynomial-exponential', name:'Integration by parts with exponentials', section:'8.2' }, function (i) {
  var a=i+1, correct=(a===1?'1':'('+a+' - 1)e^'+a+' + 1');
  return { q:'Evaluate integral_0^'+a+' x e^x dx.', correct:correct,
    wrong:[a+'e^'+a+' - 1','e^'+a+' - 1','('+a+' + 1)e^'+a+' - 1'],
    why:'With u = x and dv = e^x dx, the antiderivative is e^x(x - 1). Evaluating from 0 to '+a+' gives '+correct+'.',
    hints:['Choose the algebraic factor as u.','Take u = x and dv = e^x dx.','Use the antiderivative e^x(x - 1), then apply both bounds.'] };
});
family({ chapter:91, lesson:11, slug:'parts-logarithm', name:'Integration by parts with logarithms', section:'8.2' }, function (i) {
  var m=i+1,n=m+1;
  return { q:'Find an antiderivative of x^'+m+' ln(x), for x > 0.', correct:'x^'+n+' ln(x)/'+n+' - x^'+n+'/'+(n*n)+' + C',
    wrong:['x^'+n+' ln(x)/'+n+' + x^'+n+'/'+(n*n)+' + C','x^'+m+'/x + C','x^'+n+' ln(x) - x^'+n+' + C'],
    why:'Let u = ln(x) and dv = x^'+m+' dx. Then v = x^'+n+'/'+n+', so integration by parts gives x^'+n+'ln(x)/'+n+' - (1/'+n+') integral x^'+m+' dx = x^'+n+'ln(x)/'+n+' - x^'+n+'/'+(n*n)+' + C.',
    hints:['Let the logarithm be u because differentiation simplifies it.','Integrating x^'+m+' gives x^'+n+'/'+n+'.','The remaining integral is (1/'+n+') integral x^'+m+' dx.'] };
});

/* Gyms 4 and 5 - trigonometric integrals, substitutions, fractions. */
family({ chapter:4, lesson:12, slug:'sine-cosine-odd', name:'Odd powers of sine or cosine', section:'8.3' }, function (i) {
  var m=i+1,p=2*m+1,ans=frac(1,p+1);
  return { q:'Evaluate integral_0^(pi/2) sin^'+p+'(x) cos(x) dx.', correct:ans,
    wrong:[frac(1,p),frac(1,p+2),frac(2,p+1)],
    why:'Let u = sin(x), du = cos(x)dx. The bounds become 0 and 1, so the integral is integral_0^1 u^'+p+' du = 1/'+(p+1)+' = '+ans+'.',
    hints:['Save the single cosine factor for du.','Use u = sin(x) and change the bounds.','Integrate u^'+p+' from 0 to 1.'] };
});
family({ chapter:4, lesson:12, slug:'sine-cosine-even', name:'Even powers and half-angle identities', section:'8.3' }, function (i) {
  var a=i+1,ans=frac(a,4)+'pi';
  return { q:'Evaluate integral_0^(pi/2) '+a+' sin^2(x) dx.', correct:ans,
    wrong:[frac(a,2)+'pi',String(a),frac(a,8)+'pi'],
    why:'Use sin^2(x) = (1 - cos(2x))/2. Over 0 to pi/2 the cosine contribution is zero, so the result is '+a+'(pi/2)/2 = '+ans+'.',
    hints:['An even power calls for a half-angle identity.','Replace sin^2(x) with (1 - cos(2x))/2.','The cosine term integrates to zero over these bounds.'] };
});
family({ chapter:4, lesson:13, slug:'tangent-secant', name:'Tangent powers with secant squared', section:'8.3' }, function (i) {
  var m=i+1,ans=frac(1,m+1);
  return { q:'Evaluate integral_0^(pi/4) tan^'+m+'(x) sec^2(x) dx.', correct:ans,
    wrong:[frac(1,m),frac(1,m+2),frac(2,m+1)],
    why:'With u = tan(x), du = sec^2(x)dx and the bounds become 0 and 1. The result is integral_0^1 u^'+m+' du = '+ans+'.',
    hints:['sec^2(x) is the derivative of tan(x).','Use u = tan(x) and convert the limits.','Evaluate integral_0^1 u^'+m+' du.'] };
});
family({ chapter:4, lesson:13, slug:'cotangent-cosecant', name:'Cotangent powers with cosecant squared', section:'8.3' }, function (i) {
  var m=i+1,ans=frac(1,m+1);
  return { q:'Evaluate integral_(pi/4)^(pi/2) cot^'+m+'(x) csc^2(x) dx.', correct:ans,
    wrong:['-'+ans,frac(1,m),frac(1,m+2)],
    why:'Let u = cot(x), so du = -csc^2(x)dx. The u-bounds are 1 to 0; the minus sign reverses them, giving integral_0^1 u^'+m+' du = '+ans+'.',
    hints:['The derivative of cot(x) carries a minus sign.','Use u = cot(x); the transformed bounds are 1 and 0.','The minus sign and reversed bounds cancel.'] };
});
family({ chapter:4, lesson:14, slug:'circle-radical', name:'Substitution for sqrt(a squared minus x squared)', section:'8.4' }, function (i) {
  var a=i+2,ans=frac(a*a,4)+'pi';
  return { q:'Evaluate integral_0^'+a+' sqrt('+(a*a)+' - x^2) dx.', correct:ans,
    wrong:[frac(a*a,2)+'pi',a+'pi',String(a*a)],
    why:'Use x = '+a+'sin(theta), or recognize a quarter-circle of radius '+a+'. Its area is pi('+a+'^2)/4 = '+ans+'.',
    hints:['The radical matches sqrt(a^2 - x^2).','Use x = a sin(theta), with theta from 0 to pi/2.','The transformed integral is a^2 integral_0^(pi/2) cos^2(theta)dtheta.'] };
});
family({ chapter:4, lesson:14, slug:'plus-radical', name:'Substitution for sqrt(a squared plus x squared)', section:'8.4' }, function (i) {
  var a=(i%4)+1,n=i+1,ans='ln('+n+' + sqrt('+(n*n+1)+'))';
  return { q:'Evaluate integral_0^'+(n*a)+' dx/sqrt(x^2 + '+(a*a)+').', correct:ans,
    wrong:['arctan('+n+')',frac(n,a),'ln('+(n*a)+' + sqrt('+(n*n*a*a+a*a)+'))'],
    why:'Let x = '+a+'tan(theta), or use the standard antiderivative ln(x + sqrt(x^2 + a^2)). The lower endpoint contributes ln('+a+'), which cancels the factor '+a+' from the upper logarithm, leaving '+ans+'.',
    hints:['This is the sqrt(x^2 + a^2) form, so tangent substitution works.','Use x = '+a+'tan(theta), or the logarithmic antiderivative.','Factor '+a+' from the upper expression and subtract ln('+a+') from the lower bound.'] };
});
family({ chapter:5, lesson:15, slug:'complete-square', name:'Completing the square before integration', section:'8.4' }, function (i) {
  var c=i-3,b=(i%4)+1,lo=c,hi=c+b,ans=frac(1,4*b)+'pi';
  return { q:'Evaluate integral_'+lo+'^'+hi+' dx/((x - ('+c+'))^2 + '+(b*b)+').', correct:ans,
    wrong:[frac(1,2*b)+'pi',frac(b,4)+'pi','pi/4'],
    why:'Set u = (x - ('+c+'))/'+b+'. Then dx = '+b+'du and the bounds are 0 to 1. The integral becomes (1/'+b+') integral_0^1 du/(1+u^2) = pi/'+(4*b)+' = '+ans+'.',
    hints:['The denominator is already a completed square plus b^2.','Scale with u = (x - center)/b.','The transformed bounds are 0 and 1, producing arctan(1) = pi/4.'] };
});
family({ chapter:5, lesson:15, slug:'definite-sec-substitution', name:'Definite secant substitution', section:'8.4' }, function (i) {
  var a=(i%4)+1,n=i+2,ans='ln('+n+' + sqrt('+(n*n-1)+'))';
  return { q:'Evaluate integral_'+a+'^'+(n*a)+' dx/sqrt(x^2 - '+(a*a)+').', correct:ans,
    wrong:['arccos(1/'+n+')','ln('+(n*a)+' + sqrt('+(n*n*a*a-a*a)+'))','sqrt('+(n*n-1)+')'],
    why:'Use x = '+a+'sec(theta). The antiderivative is ln(x + sqrt(x^2 - a^2)). Evaluating from '+a+' to '+(n*a)+' cancels ln('+a+') and leaves '+ans+'.',
    hints:['sqrt(x^2 - a^2) suggests x = a sec(theta).','The transformed integrand is sec(theta).','After evaluating, factor out a inside the upper logarithm and cancel the lower ln(a).'] };
});
family({ chapter:5, lesson:16, slug:'distinct-linear-factors', name:'Partial fractions with distinct linear factors', section:'8.5' }, function (i) {
  var a=(i%4)+1,b=a+(i%5)+2,A=(i%3)+1,B=(i%4)+2,px=A+B,pc=A*b+B*a;
  var correct=A+'/(x + '+a+') + '+B+'/(x + '+b+')';
  return { q:'Decompose ('+px+'x + '+pc+')/((x + '+a+')(x + '+b+')) into partial fractions.', correct:correct,
    wrong:[B+'/(x + '+a+') + '+A+'/(x + '+b+')',A+'/(x + '+b+') + '+B+'/(x + '+a+')',px+'/(x + '+a+') + '+pc+'/(x + '+b+')'],
    why:'Writing A/(x + '+a+') + B/(x + '+b+') gives numerator A(x + '+b+') + B(x + '+a+'). Matching the constructed numerator yields A = '+A+' and B = '+B+', so the decomposition is '+correct+'.',
    hints:['Use one constant numerator over each distinct linear factor.','Clear denominators before matching coefficients.','Substitute x = -'+a+' and x = -'+b+' to isolate the constants.'] };
});
family({ chapter:5, lesson:16, slug:'long-division', name:'Long division before partial fractions', section:'8.5' }, function (i) {
  var c=(i%5)+1,m=(i%4)+1,n=i+2,r=(i%3)+1,A=n+m*c,B=n*c+r;
  var correct=m+'x + '+n+' + '+r+'/(x + '+c+')';
  return { q:'Rewrite ('+m+'x^2 + '+A+'x + '+B+')/(x + '+c+') as a polynomial plus a proper fraction.', correct:correct,
    wrong:[m+'x + '+n,m+'x + '+c+' + '+r+'/(x + '+n+')',m+'x + '+n+' - '+r+'/(x + '+c+')'],
    why:'The numerator was formed as (x + '+c+')('+m+'x + '+n+') + '+r+'. Division therefore gives '+correct+'.',
    hints:['The numerator degree is too large for partial fractions; divide first.','Multiply (x + '+c+') by the proposed quotient '+m+'x + '+n+'.','The remainder is '+r+', so it stays over x + '+c+'.'] };
});
family({ chapter:5, lesson:17, slug:'repeated-linear-factor', name:'Partial fractions with repeated factors', section:'8.5' }, function (i) {
  var a=(i%5)+1,A=(i%4)+1,B=i+2,pc=A*a+B,correct=A+'/(x + '+a+') + '+B+'/(x + '+a+')^2';
  return { q:'Decompose ('+A+'x + '+pc+')/(x + '+a+')^2.', correct:correct,
    wrong:[A+'/(x + '+a+')^2 + '+B+'/(x + '+a+')',pc+'/(x + '+a+')^2',A+'/(x + '+a+') + '+B+'/(x + '+a+')^3'],
    why:'Use A/(x + '+a+') + B/(x + '+a+')^2. Clearing denominators gives '+A+'x + '+pc+' = A(x + '+a+') + B, so A = '+A+' and B = '+B+'.',
    hints:['A repeated factor needs one term for every power up to the multiplicity.','Write A/(x + a) + B/(x + a)^2.','Clear denominators and match the x coefficient first.'] };
});
family({ chapter:5, lesson:17, slug:'quadratic-numerator', name:'Integrals with an irreducible quadratic', section:'8.5' }, function (i) {
  var a=(i%4)+1,c=i+1,coef=frac(c,a);
  return { q:'Find an antiderivative of (2x + '+c+')/(x^2 + '+(a*a)+').', correct:'ln(x^2 + '+(a*a)+') + '+coef+' arctan(x/'+a+') + C',
    wrong:['2ln(x^2 + '+(a*a)+') + '+c+' arctan(x/'+a+') + C','ln(x^2 + '+(a*a)+') + '+c+' arctan(x) + C',coef+' ln(x^2 + '+(a*a)+') + arctan(x/'+a+') + C'],
    why:'Split the numerator. The 2x term integrates to ln(x^2 + '+(a*a)+'). The constant term uses integral dx/(x^2 + a^2) = (1/a)arctan(x/a), contributing '+coef+' arctan(x/'+a+').',
    hints:['Split into a derivative-of-denominator term and a constant term.','The 2x term produces a logarithm.','Use the arctangent formula with a = '+a+' for the remaining constant term.'] };
});

/* Gym 6 and the second exam route - improper integrals and sequences. */
family({ chapter:6, lesson:18, slug:'infinite-bound', name:'Improper integrals with an infinite bound', section:'8.8' }, function (i) {
  var p=i+2,ans=frac(1,p-1);
  return { q:'Evaluate integral_1^infinity dx/x^'+p+'.', correct:ans,
    wrong:[frac(1,p),frac(1,p+1),'Diverges'],
    why:'Replace infinity by b and integrate x^-'+p+'. The limit is [x^'+(1-p)+'/'+(1-p)+']_1^b. Since p > 1, the b-term tends to 0, leaving 1/'+(p-1)+' = '+ans+'.',
    hints:['Write the improper integral as a limit before evaluating.','Use the p-integral rule: it converges because p = '+p+' > 1.','The exact value of integral_1^infinity x^-p dx is 1/(p - 1).'] };
});
family({ chapter:6, lesson:18, slug:'infinite-discontinuity', name:'Improper integrals at a finite discontinuity', section:'8.8' }, function (i) {
  var n=i+2,exp=frac(n-1,n),ans=String(n);
  return { q:'Evaluate integral_0^1 x^(-'+exp+') dx.', correct:ans,
    wrong:[frac(1,n),'Diverges',String(n-1)],
    why:'Treat 0 as a one-sided limit. Since the exponent '+exp+' is less than 1, the integral converges. An antiderivative is '+n+'x^(1/'+n+'), whose limit at 0 is 0, so the value is '+ans+'.',
    hints:['The lower endpoint is improper, so use a limit from the right.','For integral_0^1 x^-p dx, convergence requires p < 1.','Here 1 - '+exp+' = 1/'+n+', so divide by 1/'+n+'.'] };
});
family({ chapter:6, lesson:19, slug:'sequence-rational-limit', name:'Limits of rational sequences', section:'10.1' }, function (i) {
  var a=i+2,b=i+1,c=(i%5)+1,d=i+3,ans=frac(a,c);
  return { q:'Find lim as n approaches infinity of ('+a+'n^2 + '+b+')/('+c+'n^2 + '+d+').', correct:ans,
    wrong:[frac(b,d),String(a-c),'infinity'],
    why:'Divide numerator and denominator by n^2. The lower-order constants vanish, leaving '+a+'/'+c+' = '+ans+'.',
    hints:['Compare the highest powers in numerator and denominator.','Both have degree 2, so divide through by n^2.','The limit is the ratio of leading coefficients.'] };
});
family({ chapter:6, lesson:19, slug:'partial-sums-geometric', name:'Finite geometric partial sums', section:'10.2' }, function (i) {
  var a=i+1,N=(i%5)+3,pow=Math.pow(2,N-1),ans=frac(a*(Math.pow(2,N)-1),pow);
  return { q:'Find the sum of the first '+N+' terms of the geometric sequence with first term '+a+' and ratio 1/2.', correct:ans,
    wrong:[frac(a*(Math.pow(2,N-1)-1),Math.pow(2,N-2)),String(2*a),frac(a,Math.pow(2,N))],
    why:'S_N = a(1 - r^N)/(1 - r). With r = 1/2, S_'+N+' = '+a+'(1 - 1/'+Math.pow(2,N)+')/(1/2) = '+ans+'.',
    hints:['Use the finite geometric sum, not the infinite one.','S_N = a(1 - r^N)/(1 - r).','Substitute a = '+a+', r = 1/2, and N = '+N+'.'] };
});
family({ chapter:92, lesson:20, slug:'monotone-bounded', name:'Monotonicity and bounds of sequences', section:'10.1' }, function (i) {
  var L=i+2,c=(i%4)+1,neg=i%2===1,sgn=neg?'-':'+',kind=neg?'increasing':'decreasing',bound=neg?'bounded above by '+L:'bounded below by '+L;
  return { q:'For a_n = '+L+' '+sgn+' '+c+'/2^n, classify monotonicity, give a natural bound, and find the limit.', correct:kind+'; '+bound+'; limit '+L,
    wrong:[(neg?'decreasing':'increasing')+'; unbounded; limit '+L,kind+'; '+(neg?'bounded below':'bounded above')+' by '+L+'; limit 0','constant; bounded by '+c+'; limit '+c],
    why:'The correction term '+sgn+c+'/2^n tends to 0. Its magnitude shrinks with n, so the sequence is '+kind+' toward '+L+' and is '+bound+'. Therefore its limit is '+L+'.',
    hints:['Track what happens to 1/2^n as n grows.','Its magnitude decreases to 0.','Approaching L from '+(neg?'below makes the sequence increase':'above makes the sequence decrease')+'.'] };
});
family({ chapter:92, lesson:20, slug:'recurrence-fixed-point', name:'Limits of recursively defined sequences', section:'10.1' }, function (i) {
  var c=i+2;
  return { q:'Suppose a_(n+1) = (a_n + '+c+')/2 and the sequence converges. What must its limit be?', correct:String(c),
    wrong:[frac(c,2),String(2*c),'Depends on a_1'],
    why:'If a_n approaches L, then a_(n+1) also approaches L. Passing to the limit gives L = (L + '+c+')/2, so 2L = L + '+c+' and L = '+c+'.',
    hints:['Call the limit L on both sides of the recurrence.','Write L = (L + '+c+')/2.','Solve the resulting linear equation for L.'] };
});

/* Gyms 7 and 8 - series and convergence tests. */
family({ chapter:7, lesson:21, slug:'geometric-infinite', name:'Infinite geometric series', section:'10.2' }, function (i) {
  var a=i+1,d=(i%5)+2,ans=frac(a*d,d-1);
  return { q:'Find the sum of the infinite geometric series with first term '+a+' and ratio 1/'+d+'.', correct:ans,
    wrong:[frac(a,d-1),frac(a*d,d+1),String(a*d)],
    why:'Because |r| = 1/'+d+' < 1, the series converges. Its sum is a/(1-r) = '+a+'/(1 - 1/'+d+') = '+ans+'.',
    hints:['Check |r| < 1 before using the sum formula.','Use S = a/(1 - r).','Substitute a = '+a+' and r = 1/'+d+'.'] };
});
family({ chapter:7, lesson:21, slug:'telescoping', name:'Telescoping series', section:'10.2' }, function (i) {
  var c=i+1,ans=frac(1,c+1);
  return { q:'Evaluate sum from n = 1 to infinity of 1/((n + '+c+')(n + '+(c+1)+')).', correct:ans,
    wrong:[frac(1,c),frac(1,c+2),'Diverges'],
    why:'Partial fractions give 1/(n + '+c+') - 1/(n + '+(c+1)+'). The partial sum cancels in the middle, leaving 1/'+(c+1)+' - 1/(N + '+(c+1)+'). The last term tends to 0, so the sum is '+ans+'.',
    hints:['Split the term into two simple fractions.','It equals 1/(n + '+c+') - 1/(n + '+(c+1)+').','Write several terms and cancel before taking the limit.'] };
});
family({ chapter:7, lesson:22, slug:'divergence-test', name:'The nth-term divergence test', section:'10.2' }, function (i) {
  var c=i+2;
  return { q:'Determine whether sum from n = 1 to infinity of n/(n + '+c+') converges.', correct:'Diverges because the terms approach 1, not 0',
    wrong:['Converges by comparison with 1/n','Converges to '+c,'The Divergence Test is inconclusive because the terms approach 0'],
    why:'The term limit is lim n/(n + '+c+') = 1. A necessary condition for a series to converge is a_n -> 0. Since that fails, the series diverges.',
    hints:['Before choosing any other test, find the limit of the term itself.','Divide numerator and denominator by n.','The term approaches 1, and a convergent series must have terms approaching 0.'] };
});
family({ chapter:7, lesson:22, slug:'p-series-integral', name:'p-series and the Integral Test', section:'10.3' }, function (i) {
  var p=i+1,verdict=p>1?'Converges':'Diverges';
  return { q:'Classify sum from n = 1 to infinity of 1/n^'+p+'.', correct:verdict+' because p = '+p+(p>1?' > 1':' <= 1'),
    wrong:[(p>1?'Diverges':'Converges')+' by the p-series rule','Converges because its terms approach 0','The Ratio Test gives a decisive answer'],
    why:'This is a p-series. Such a series converges exactly when p > 1. Here p = '+p+', so it '+verdict.toLowerCase()+'.',
    hints:['Recognize the standard p-series form.','The cutoff is p = 1, the harmonic series.','Compare p = '+p+' with 1.'] };
});
family({ chapter:7, lesson:23, slug:'direct-comparison', name:'Direct comparison tests', section:'10.4' }, function (i) {
  var p=(i%4)+2,c=i+1;
  return { q:'Determine whether sum from n = 1 to infinity of 1/(n^'+p+' + '+c+') converges using direct comparison.', correct:'Converges because 0 < 1/(n^'+p+' + '+c+') <= 1/n^'+p,
    wrong:['Diverges because it is larger than 1/n^'+p,'Diverges because the denominator grows','The comparison is impossible because the denominators differ'],
    why:'For n >= 1, n^'+p+' + '+c+' >= n^'+p+', so 0 < 1/(n^'+p+' + '+c+') <= 1/n^'+p+'. The comparison p-series converges because '+p+' > 1, so the given series converges.',
    hints:['A larger positive denominator makes a smaller fraction.','Compare with 1/n^'+p+'.','The comparison series is a convergent p-series because p > 1.'] };
});
family({ chapter:7, lesson:23, slug:'limit-comparison', name:'Limit comparison tests', section:'10.4' }, function (i) {
  var a=i+2,b=i+1,c=i+3;
  return { q:'Use limit comparison to classify sum of ('+a+'n + '+b+')/(n^3 + '+c+').', correct:'Converges; compare with 1/n^2 and the limit is '+a,
    wrong:['Diverges; compare with 1/n','Converges; compare with 1/n^3 and the limit is '+a,'The limit comparison is 0 and proves divergence'],
    why:'The term behaves like '+a+'n/n^3 = '+a+'/n^2. Dividing by 1/n^2 gives ('+a+'n^3 + '+b+'n^2)/(n^3 + '+c+') -> '+a+', a finite positive limit. Since sum 1/n^2 converges, so does the given series.',
    hints:['Use the leading powers to select b_n.','The numerator has degree 1 and denominator degree 3, so the net behavior is 1/n^2.','Divide by 1/n^2 and take the leading-coefficient ratio.'] };
});
family({ chapter:8, lesson:24, slug:'alternating-classification', name:'Alternating-series convergence', section:'10.6' }, function (i) {
  // Ten different exponents, five at or below 1 (conditional) and five above it
  // (absolute), so no two variations are the same problem.
  var P=[['1',1],['2',2],['1/2',1/2],['3',3],['2/3',2/3],['3/2',3/2],['3/4',3/4],['4',4],['1/3',1/3],['5/2',5/2]];
  var ps=P[i][0],pv=P[i][1],pe=ps.indexOf('/')>=0?'('+ps+')':ps,kind=pv<=1?'Conditionally convergent':'Absolutely convergent';
  return { q:'Classify sum from n = 1 to infinity of (-1)^(n+1)/n^'+pe+'.', correct:kind,
    wrong:[kind==='Conditionally convergent'?'Absolutely convergent':'Conditionally convergent','Divergent because it alternates','Divergent by the nth-term test'],
    why:'The alternating series converges because 1/n^'+pe+' decreases to 0. Its absolute-value series is a p-series with p = '+ps+', which '+(pv>1?'converges':'diverges')+'. Therefore the convergence is '+kind.toLowerCase()+'.',
    hints:['First apply the Alternating Series Test to the magnitudes.','Then test the absolute-value series separately.','The absolute-value series is a p-series with p = '+ps+'.'] };
});
family({ chapter:8, lesson:24, slug:'alternating-error', name:'Alternating-series error bounds', section:'10.6' }, function (i) {
  var p=(i%2)+1,m=i+3,N=m-1;
  return { q:'For sum (-1)^(n+1)/n^'+p+', how many terms guarantee an alternating-series error no greater than 1/'+Math.pow(m,p)+'?', correct:String(N),
    wrong:[String(m),String(N+1),String(Math.max(1,N-1))],
    why:'The error after N terms is at most the first omitted magnitude, 1/(N+1)^'+p+'. We need 1/(N+1)^'+p+' <= 1/'+Math.pow(m,p)+', so N+1 >= '+m+' and the smallest N is '+N+'.',
    hints:['Use the magnitude of the first omitted term.','Set 1/(N+1)^'+p+' <= 1/'+Math.pow(m,p)+'.','Solve N + 1 >= '+m+'.'] };
});
family({ chapter:8, lesson:25, slug:'ratio-test', name:'Ratio Test with factorials', section:'10.5' }, function (i) {
  var a=i+2;
  return { q:'Apply the Ratio Test to sum from n = 0 to infinity of '+a+'^n/n!. State L and the verdict.', correct:'L = 0; converges absolutely',
    wrong:['L = '+a+'; diverges','L = 1; inconclusive','L = 1/'+a+'; converges'],
    why:'|a_(n+1)/a_n| = '+a+'/(n+1), which tends to 0. Since L = 0 < 1, the series converges absolutely.',
    hints:['Write the (n+1)st term and divide by the nth term.','Most factorial factors cancel, leaving '+a+'/(n+1).','Take the limit and compare it with 1.'] };
});
family({ chapter:8, lesson:25, slug:'root-test', name:'Root Test with nth powers', section:'10.5' }, function (i) {
  var c=i+1,d=(i%5)+3,L=frac(c,d),kind=c<d?'converges absolutely':c>d?'diverges':'is inconclusive';
  return { q:'Apply the Root Test to sum from n = 1 to infinity of ('+c+'/'+d+')^n.', correct:'L = '+L+'; '+kind,
    wrong:['L = '+frac(d,c)+'; '+(c<d?'diverges':'converges'),'L = 0; converges absolutely','L = 1; is inconclusive'],
    why:'The nth root of |('+c+'/'+d+')^n| is '+L+', so L = '+L+'. The Root Test therefore '+kind+'.',
    hints:['Take the nth root of the entire nth power.','The nth root cancels the exponent n.','Compare '+L+' with 1.'] };
});
family({ chapter:8, lesson:26, slug:'choose-a-test', name:'Choosing an efficient convergence test', section:'10.3-10.6' }, function (i) {
  var cases=[
    ['sum n!/3^n','Ratio Test'],['sum (2n/(3n+1))^n','Root Test'],['sum 1/(n^2+1)','Direct Comparison'],
    ['sum (-1)^(n+1)/n','Alternating Series Test'],['sum 1/(n ln(n)), n >= 2','Integral Test'],
    ['sum (1/2)^n','Geometric Series'],['sum (3n+1)/(n^3+2)','Limit Comparison'],
    ['sum n/(n+1)','Divergence Test'],['sum 1/(n(n+1))','Telescoping'],['sum 1/n^3','p-series recognition']
  ],row=cases[i];
  return { q:'Which test is the most efficient first choice for '+row[0]+'?', correct:row[1],
    wrong:['Ratio Test','Integral Test','Divergence Test','Root Test'].filter(function(x){return x!==row[1];}),
    why:row[1]+' matches the visible structure of this series directly; it reaches a verdict without unnecessary algebra.',
    hints:['Look for the structural fingerprint before doing calculations.','Factorials suggest Ratio, nth powers suggest Root, signs suggest Alternating, and rational powers suggest comparison.','For this expression, the matching fingerprint points to '+row[1]+'.'] };
});
family({ chapter:8, lesson:26, slug:'mixed-verdicts', name:'Mixed convergence classification', section:'10.2-10.6' }, function (i) {
  var cases=[
    ['sum 1/n','diverges'],['sum 1/n^2','converges absolutely'],['sum (-1)^(n+1)/n','converges conditionally'],
    ['sum (3/4)^n','converges absolutely'],['sum n/(n+1)','diverges'],['sum 1/(n ln(n)), n >= 2','diverges'],
    ['sum (-1)^n/n^3','converges absolutely'],['sum 1/(n^2+5)','converges'],['sum 2^n/n!','converges absolutely'],['sum (1+1/n)^n','diverges']
  ],row=cases[i];
  return { q:'Classify '+row[0]+'.', correct:row[1],
    wrong:['diverges','converges absolutely','converges conditionally','test is inconclusive'].filter(function(x){return x!==row[1];}),
    why:'The defining test for this standard form shows that the series '+row[1]+'. Check the term limit first, then use the structural test that matches the expression.',
    hints:['First ask whether the terms approach zero.','Next identify geometric, p-series, alternating, factorial, or comparison structure.','Applying that matching test gives: '+row[1]+'.'] };
});

/* Gym 9 and the third exam route - Taylor and power series. */
family({ chapter:93, lesson:27, slug:'taylor-polynomial-exponential', name:'Taylor polynomials for exponentials', section:'10.8' }, function (i) {
  var k=i+1,quad=frac(k*k,2);
  return { q:'Find the degree-2 Maclaurin polynomial for e^('+k+'x).', correct:'1 + '+k+'x + '+quad+'x^2',
    wrong:['1 + x + x^2/2','1 + '+k+'x + '+(k*k)+'x^2','1 + '+k+'x + '+frac(k,2)+'x^2'],
    why:'Substitute '+k+'x into e^u = 1 + u + u^2/2! + ... . Keeping through degree 2 gives 1 + '+k+'x + '+k+'^2x^2/2 = 1 + '+k+'x + '+quad+'x^2.',
    hints:['Start with the Maclaurin series for e^u.','Replace every u by '+k+'x.','Keep terms only through x^2 and simplify the factorial.'] };
});
family({ chapter:93, lesson:27, slug:'taylor-polynomial-log', name:'Taylor polynomials at a nonzero center', section:'10.8' }, function (i) {
  var a=i+1;
  return { q:'Find the degree-2 Taylor polynomial for ln(x) centered at a = '+a+'.', correct:'ln('+a+') + (x - '+a+')/'+a+' - (x - '+a+')^2/'+(2*a*a),
    wrong:['ln('+a+') + (x - '+a+') - (x - '+a+')^2/2','ln('+a+') - (x - '+a+')/'+a+' + (x - '+a+')^2/'+(2*a*a),'(x - '+a+')/'+a+' - (x - '+a+')^2/'+(a*a)],
    why:'For f(x)=ln(x), f(a)=ln(a), f prime(a)=1/a, and f double-prime(a)=-1/a^2. Thus P_2 = ln(a) + (x-a)/a - (x-a)^2/(2a^2), giving the stated polynomial.',
    hints:['Use f(a) + f prime(a)(x-a) + f double-prime(a)(x-a)^2/2!.','For ln(x), the first two derivatives are 1/x and -1/x^2.','Evaluate them at a = '+a+' and include the 2! denominator.'] };
});
family({ chapter:9, lesson:28, slug:'lagrange-bound', name:'Lagrange remainder bounds', section:'10.9' }, function (i) {
  var d=i+2;
  return { q:'Use the degree-2 Maclaurin polynomial for e^x at x = 1/'+d+'. Which Lagrange bound is valid if M = e^(1/'+d+')?', correct:'e^(1/'+d+')/(6*'+Math.pow(d,3)+')',
    wrong:['e^(1/'+d+')/(2*'+Math.pow(d,2)+')','1/(6*'+Math.pow(d,3)+')','e^(1/'+d+')/'+Math.pow(d,3)],
    why:'For degree 2, |R_2(x)| <= M|x|^3/3!. With x = 1/'+d+' and M = e^(1/'+d+'), the bound is e^(1/'+d+')*(1/'+d+')^3/6 = e^(1/'+d+')/(6*'+Math.pow(d,3)+').',
    hints:['A degree-n polynomial uses the (n+1)st power and (n+1)! in the remainder.','Here n + 1 = 3 and x = 1/'+d+'.','Substitute into M|x|^3/3!.'] };
});
family({ chapter:9, lesson:28, slug:'degree-for-accuracy', name:'Choosing Taylor degree for an error tolerance', section:'10.9' }, function (i) {
  var m=i+3,N=m-1;
  return { q:'An alternating Maclaurin approximation has error at most 1/(N+1)!. What smallest N guarantees error no greater than 1/'+m+'!?', correct:String(N),
    wrong:[String(m),String(N+1),String(Math.max(0,N-1))],
    why:'We need 1/(N+1)! <= 1/'+m+'!, so (N+1)! >= '+m+'!. The smallest possibility is N+1 = '+m+', hence N = '+N+'.',
    hints:['Compare the factorial denominators.','A larger factorial denominator gives a smaller error bound.','Set N + 1 = '+m+' for the first degree that meets the tolerance.'] };
});
family({ chapter:9, lesson:29, slug:'radius-geometric', name:'Radius and interval from a geometric power series', section:'10.7' }, function (i) {
  var c=i-4,R=i+2,left=c-R,right=c+R;
  return { q:'Find the radius and interval of convergence of sum from n = 0 to infinity of ((x - ('+c+'))/'+R+')^n.', correct:'R = '+R+'; ('+left+', '+right+')',
    wrong:['R = 1/'+R+'; ('+left+', '+right+')','R = '+R+'; ['+left+', '+right+']','R = '+Math.abs(c)+'; ('+(c-Math.abs(c))+', '+(c+Math.abs(c))+')'],
    why:'This is geometric with ratio (x - ('+c+'))/'+R+'. Convergence requires |x - ('+c+')| < '+R+', giving radius '+R+' and the open interval ('+left+', '+right+'). At either endpoint the ratio is +/-1, so the terms do not approach zero.',
    hints:['Treat the expression raised to n as the geometric ratio.','Solve |(x - center)/'+R+'| < 1.','Test both endpoints: ratios 1 and -1 make the terms fail to approach zero.'] };
});
family({ chapter:9, lesson:29, slug:'interval-endpoints', name:'Endpoint testing for power series', section:'10.7' }, function (i) {
  var c=i-3,R=(i%5)+2,left=c-R,right=c+R;
  return { q:'Find the interval of convergence of sum from n = 1 to infinity of (x - ('+c+'))^n/('+R+'^n n^2).', correct:'['+left+', '+right+']',
    wrong:['('+left+', '+right+')','['+left+', '+right+')','('+left+', '+right+']'],
    why:'The Ratio Test gives |x - ('+c+')| < '+R+'. At x = '+right+', the series is sum 1/n^2; at x = '+left+', it is sum (-1)^n/n^2. Both converge absolutely, so both endpoints are included.',
    hints:['First find the open interval using the Ratio Test.','The radius is '+R+' around center '+c+'.','Substitute each endpoint separately; both reduce to absolutely convergent p-series.'] };
});
family({ chapter:9, lesson:30, slug:'geometric-transform', name:'Constructing power series from the geometric series', section:'10.7' }, function (i) {
  var a=(i%5)+2,m=(i%4)+1;
  return { q:'Write x^'+m+'/(1 - '+a+'x) as a power series and state its radius.', correct:'sum from n = 0 of '+a+'^n x^(n + '+m+'); R = 1/'+a,
    wrong:['sum from n = 0 of x^(n + '+m+')/'+a+'^n; R = '+a,'sum from n = 0 of '+a+'^n x^n; R = 1/'+a,'sum from n = 0 of '+a+'x^(n + '+m+'); R = '+a],
    why:'Use 1/(1-u)=sum u^n with u='+a+'x, then multiply by x^'+m+'. This gives sum '+a+'^n x^(n+'+m+'), valid when |'+a+'x|<1, so R=1/'+a+'.',
    hints:['Start with 1/(1-u) = sum u^n.','Set u = '+a+'x, then multiply every term by x^'+m+'.','The convergence condition is |'+a+'x| < 1.'] };
});
family({ chapter:9, lesson:30, slug:'integrate-known-series', name:'Integrating a known power series', section:'10.7' }, function (i) {
  var a=i+1;
  return { q:'Write the power series for ln(1 + '+a+'x) about x = 0.', correct:'sum from n = 1 of (-1)^(n+1) '+a+'^n x^n/n, for |x| < 1/'+a,
    wrong:['sum from n = 0 of (-1)^n '+a+'^n x^n, for |x| < 1/'+a,'sum from n = 1 of '+a+'^n x^n/n, for |x| < 1/'+a,'sum from n = 1 of (-1)^(n+1) x^n/('+a+'n), for |x| < '+a],
    why:'ln(1+u)=sum from n=1 of (-1)^(n+1)u^n/n. Substituting u='+a+'x gives the stated series, valid for |'+a+'x|<1.',
    hints:['Recall the standard series for ln(1+u).','Substitute u = '+a+'x into every power.','Translate |u| < 1 into a condition on x.'] };
});
family({ chapter:9, lesson:31, slug:'maclaurin-sine', name:'Maclaurin expansions by substitution', section:'10.8' }, function (i) {
  var k=i+1,a3=frac(k*k*k,6),a5=frac(Math.pow(k,5),120);
  return { q:'Write the first three nonzero terms of sin('+k+'x).', correct:k+'x - '+a3+'x^3 + '+a5+'x^5',
    wrong:[k+'x + '+a3+'x^3 + '+a5+'x^5','x - x^3/6 + x^5/120',k+'x - '+frac(k,6)+'x^3 + '+frac(k,120)+'x^5'],
    why:'Substitute '+k+'x into sin(u)=u-u^3/3!+u^5/5!-... . The powers produce '+k+'x - '+k+'^3x^3/6 + '+k+'^5x^5/120.',
    hints:['Start with the standard sine series.','Replace u by '+k+'x inside every power.','Cube and fifth-power the coefficient '+k+' as well as x.'] };
});
family({ chapter:9, lesson:31, slug:'coefficient-formula', name:'Coefficients of a Taylor series', section:'10.8' }, function (i) {
  var a=i+1;
  return { q:'For f(x) = 1/(1 - '+a+'x), what is the coefficient c_n in f(x) = sum c_n x^n?', correct:a+'^n',
    wrong:['1/'+a+'^n',a+'n','1/n!'],
    why:'The geometric series 1/(1-u)=sum u^n with u='+a+'x gives sum ('+a+'x)^n = sum '+a+'^n x^n. Therefore c_n='+a+'^n.',
    hints:['Recognize a geometric-series denominator.','Use u = '+a+'x in 1/(1-u).','Expand ('+a+'x)^n into coefficient times x^n.'] };
});

/* Gym 10 and the comprehensive-final route - power-series applications and polar calculus. */
family({ chapter:10, lesson:32, slug:'series-limit', name:'Limits evaluated with series', section:'10.8' }, function (i) {
  var k=i+1,answer=frac(k*k,2);
  return { q:'Evaluate lim as x approaches 0 of (e^('+k+'x) - 1 - '+k+'x)/x^2 using a series.', correct:answer,
    wrong:[String(k*k),frac(k,2),String(k)],
    why:'The expansion e^('+k+'x) = 1 + '+k+'x + ('+k+'x)^2/2! + higher powers cancels the first two numerator terms. Dividing by x^2 leaves '+k+'^2/2 plus terms that approach zero, so the limit is '+answer+'.',
    hints:['Expand the exponential through the x^2 term.','Cancel the constant and linear terms shown in the numerator.','Divide the first surviving term by x^2, then let x approach zero.'] };
});
family({ chapter:10, lesson:32, slug:'series-integral-approximation', name:'Approximating integrals with series', section:'10.8' }, function (i) {
  var k=i+2,answer=frac(3*k-1,3*k*k);
  return { q:'Use the first two nonzero terms of e^(-'+k+'x^2) to approximate the integral from 0 to 1/'+k+' of e^(-'+k+'x^2) dx.', correct:answer,
    wrong:[frac(3*k+1,3*k*k),frac(2,3*k),frac(1,3*k*k)],
    why:'Use e^(-'+k+'x^2) approximately 1 - '+k+'x^2. Integrating gives [x - '+k+'x^3/3] from 0 to 1/'+k+' = 1/'+k+' - 1/(3*'+k+'^2) = '+answer+'.',
    hints:['The first two nonzero terms of e^u are 1 + u.','Here u = -'+k+'x^2.','Integrate 1 - '+k+'x^2 term by term and substitute x = 1/'+k+'.'] };
});
family({ chapter:10, lesson:33, slug:'polar-coordinate-conversion', name:'Converting rectangular points to polar form', section:'11.3' }, function (i) {
  var s=i+1,quad=i%4,pts=[[s,s],[-s,s],[-s,-s],[s,-s]],angles=['pi/4','3pi/4','5pi/4','7pi/4'],p=pts[quad];
  return { q:'Convert the rectangular point ('+p[0]+', '+p[1]+') to polar coordinates with r > 0 and 0 <= theta < 2pi.', correct:'('+s+'sqrt(2), '+angles[quad]+')',
    wrong:['('+s+'sqrt(2), '+angles[(quad+1)%4]+')','('+2*s+', '+angles[quad]+')','('+s+', '+angles[quad]+')'],
    why:'r = sqrt(x^2+y^2) = sqrt('+s+'^2+'+s+'^2) = '+s+'sqrt(2). The signs of x and y place the point in the corresponding quadrant, where the reference angle is pi/4, giving theta = '+angles[quad]+'.',
    hints:['Compute r with r^2 = x^2 + y^2.','Because |x| = |y|, the reference angle is pi/4.','Use the signs of x and y to choose the correct quadrant.'] };
});
family({ chapter:10, lesson:33, slug:'polar-circle-equation', name:'Recognizing circles from polar equations', section:'11.3' }, function (i) {
  var a=i+2,h=frac(a,2),r2=frac(a*a,4);
  return { q:'Convert r = '+a+' cos(theta) to a rectangular equation in standard circle form.', correct:'(x - '+h+')^2 + y^2 = '+r2,
    wrong:['x^2 + (y - '+h+')^2 = '+r2,'(x + '+h+')^2 + y^2 = '+r2,'x^2 + y^2 = '+a+'^2'],
    why:'Multiply by r: r^2 = '+a+'r cos(theta), so x^2+y^2 = '+a+'x. Completing the square in x gives (x-'+h+')^2+y^2 = '+r2+'.',
    hints:['Use r^2 = x^2+y^2 and r cos(theta)=x.','Rewrite the equation as x^2 - '+a+'x + y^2 = 0.','Complete the square in x by adding ('+h+')^2.'] };
});
family({ chapter:10, lesson:34, slug:'polar-rose-petals', name:'Counting petals of polar roses', section:'11.3' }, function (i) {
  var k=i+1,petals=k%2===0?2*k:k;
  return { q:'How many petals does the polar curve r = '+(i+2)+' cos('+k+' theta) have?', correct:String(petals),
    wrong:[String(k),String(2*k),String(k+1)].filter(function(x,index,self){return x!==String(petals)&&self.indexOf(x)===index;}),
    why:'For r = a cos(k theta), an odd k produces k petals and an even k produces 2k petals. Since k = '+k+' is '+(k%2===0?'even':'odd')+', the curve has '+petals+' petals.',
    hints:['The amplitude changes petal length, not petal count.','Check whether k = '+k+' is odd or even.','Use k petals for odd k and 2k petals for even k.'] };
});
family({ chapter:10, lesson:34, slug:'polar-tangent-slope', name:'Slopes of polar curves', section:'11.3' }, function (i) {
  var a=i+2,b=i+1,answer=frac(b,a);
  return { q:'For r = '+a+' + '+b+' cos(theta), find dy/dx at theta = pi/2.', correct:answer,
    wrong:[frac(a,b),'-'+answer,'0'],
    why:'For a polar curve, dy/dx = (r prime sin(theta)+r cos(theta))/(r prime cos(theta)-r sin(theta)). At pi/2, r='+a+' and r prime=-'+b+', so the slope is (-'+b+')/(-'+a+') = '+answer+'.',
    hints:['Differentiate r to get r prime = -'+b+' sin(theta).','Use dx/dtheta = r prime cos(theta)-r sin(theta) and dy/dtheta = r prime sin(theta)+r cos(theta).','At theta=pi/2, substitute sin(theta)=1 and cos(theta)=0.'] };
});
family({ chapter:94, lesson:35, slug:'polar-area-one-petal', name:'Areas enclosed by polar curves', section:'11.4' }, function (i) {
  var a=i+1,answer=frac(a*a,8)+'pi';
  return { q:'Find the area of one petal of r = '+a+' sin(2 theta). Use the interval 0 <= theta <= pi/2.', correct:answer,
    wrong:[frac(a*a,4)+'pi',frac(a*a,2)+'pi',frac(a,8)+'pi'],
    why:'Polar area is (1/2) integral r^2 dtheta. Thus A = ('+a+'^2/2) integral from 0 to pi/2 of sin^2(2theta)dtheta. That integral is pi/4, so A = '+answer+'.',
    hints:['Use A = (1/2) integral from alpha to beta of r^2 dtheta.','Square r, including the amplitude '+a+'.','The average value of sin^2 over this interval is 1/2, so its integral is pi/4.'] };
});
family({ chapter:94, lesson:35, slug:'polar-arc-length', name:'Arc length of polar curves', section:'11.4' }, function (i) {
  var k=i+1;
  return { q:'Find the polar arc length of r = e^('+k+' theta) for 0 <= theta <= 1.', correct:'sqrt(1 + '+k+'^2)(e^'+k+' - 1)/'+k,
    wrong:['sqrt(1 + '+k+'^2)(e^'+k+' - 1)','(e^'+k+' - 1)/'+k,'sqrt(1 + '+k+')(e^'+k+' - 1)/'+k],
    why:'Polar arc length is integral sqrt(r^2+(dr/dtheta)^2)dtheta. Here dr/dtheta='+k+'e^('+k+'theta), so the integrand is sqrt(1+'+k+'^2)e^('+k+'theta). Integrating from 0 to 1 gives sqrt(1+'+k+'^2)(e^'+k+'-1)/'+k+'.',
    hints:['Use L = integral sqrt(r^2 + (dr/dtheta)^2) dtheta.','Differentiate r = e^('+k+'theta).','Factor e^('+k+'theta) from the square root, then integrate the exponential.'] };
});

window.CALC_TENFOLD = { size: SIZE, count: added.length, families: families, questions: added };
})();
