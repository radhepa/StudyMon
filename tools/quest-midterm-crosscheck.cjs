/* Independent solutions for the midterm review labs (c-lab-31 to c-lab-49).

   `pass` solutions were written separately from the references in
   tools/quest_midterm_labs.py, in a different style, and must pass every test.
   `fail` solutions are the classic mistakes each lab exists to catch, and must
   fail at least one test. Together they show the tests agree with the written
   contract and actually detect the trap. Run with tools/check-midterm-labs.cjs. */
const R = String.raw;
const H = '#include <stdio.h>\n#include <stdlib.h>\n#include <limits.h>\n#include <ctype.h>\n';

module.exports = {
  'c-lab-31': {
    pass: [H + R`
int main(void)
{
    int kb, word;
    if (scanf("%d %d", &kb, &word) != 2 || kb < 1 || kb > 4096) { printf("ERROR\n"); return 0; }
    switch (word) { case 1: case 2: case 4: case 8: break; default: printf("ERROR\n"); return 0; }
    printf("Step 1: editor\nStep 2: preprocessor\nStep 3: translator\nStep 4: linker\nStep 5: loader\n");
    long bytes = kb * 1024L;
    printf("Memory: %d KB = %ld bytes = %ld bits\n", kb, bytes, bytes * 8);
    printf("Addresses: 0 to %ld\n", bytes - 1);
    printf("Words: %ld\n", bytes / word);
    return 0;
}`],
    fail: [
      { why: 'linker before translator', src: H + R`int main(void){int k,w;if(scanf("%d%d",&k,&w)!=2||k<1||k>4096||(w!=1&&w!=2&&w!=4&&w!=8)){puts("ERROR");return 0;}puts("Step 1: editor");puts("Step 2: preprocessor");puts("Step 3: linker");puts("Step 4: translator");puts("Step 5: loader");printf("Memory: %d KB = %d bytes = %d bits\nAddresses: 0 to %d\nWords: %d\n",k,k*1024,k*8192,k*1024-1,k*1024/w);return 0;}` },
      { why: '1 KB taken as 1000 bytes', src: H + R`int main(void){int k,w;if(scanf("%d%d",&k,&w)!=2||k<1||k>4096||(w!=1&&w!=2&&w!=4&&w!=8)){puts("ERROR");return 0;}puts("Step 1: editor\nStep 2: preprocessor\nStep 3: translator\nStep 4: linker\nStep 5: loader");printf("Memory: %d KB = %d bytes = %d bits\nAddresses: 0 to %d\nWords: %d\n",k,k*1000,k*8000,k*1000-1,k*1000/w);return 0;}` }
    ]
  },
  'c-lab-32': {
    pass: [H + R`
int main(void)
{
    int whole; double real; char mark;
    if (scanf("%d", &whole) != 1 || scanf("%lf", &real) != 1 || scanf(" %c", &mark) != 1) { puts("ERROR"); return 0; }
    printf("[%*d]\n[%-*d]\n[%0*d]\n", 6, whole, 6, whole, 6, whole);
    printf("[%.2f]\n[%10.3f]\n", real, real);
    printf("[%c] code %d\n", mark, (int)mark);
    printf("%d%c\n", whole, '%');
    return 0;
}`],
    fail: [
      { why: '%c without the leading space reads the newline', src: H + R`int main(void){int n;double x;char c;if(scanf("%d%lf%c",&n,&x,&c)!=3){puts("ERROR");return 0;}printf("[%6d]\n[%-6d]\n[%06d]\n[%.2f]\n[%10.3f]\n[%c] code %d\n%d%%\n",n,n,n,x,x,c,c,n);return 0;}` },
      { why: 'precision where a width was wanted', src: H + R`int main(void){int n;double x;char c;if(scanf("%d%lf %c",&n,&x,&c)!=3){puts("ERROR");return 0;}printf("[%6d]\n[%-6d]\n[%.6d]\n[%.2f]\n[%10.3f]\n[%c] code %d\n%d%%\n",n,n,n,x,x,c,c,n);return 0;}` }
    ]
  },
  'c-lab-33': {
    pass: [H + R`
int main(void)
{
    int a, b, u, k, n;
    if (scanf("%d%d%d%d%d", &a, &b, &u, &k, &n) != 5) { puts("ERROR"); return 0; }
    if (a < 0 || b < 0 || u < 0 || u > 255 || k < 0 || k > 1000 || n < 0 || n > 100000000) { puts("ERROR"); return 0; }
    printf("sizes: char %zu short %zu int %zu long long %zu float %zu double %zu\n",
           sizeof(char), sizeof(short), sizeof(int), sizeof(long long), sizeof(float), sizeof(double));
    printf("limits: INT_MAX %d INT_MIN %d\n", INT_MAX, INT_MIN);
    long long wide = (long long)a + b;
    if (wide > INT_MAX) printf("sum: OVERFLOW\n"); else printf("sum: %d\n", (int)wide);
    printf("half: %d %.1f\n", a / 2, (double)a / 2);
    unsigned char load = (unsigned char)u;
    load = (unsigned char)(load + k);
    printf("wrap: %u\n", (unsigned)load);
    float f = n;
    int back = (int)f;
    printf("float: %d\n", back);
    return 0;
}`],
    fail: [
      { why: 'double instead of float keeps every digit', src: H + R`int main(void){int a,b,u,k,n;if(scanf("%d%d%d%d%d",&a,&b,&u,&k,&n)!=5||a<0||b<0||u<0||u>255||k<0||k>1000||n<0||n>100000000){puts("ERROR");return 0;}printf("sizes: char %zu short %zu int %zu long long %zu float %zu double %zu\n",sizeof(char),sizeof(short),sizeof(int),sizeof(long long),sizeof(float),sizeof(double));printf("limits: INT_MAX %d INT_MIN %d\n",INT_MAX,INT_MIN);if(a>INT_MAX-b)puts("sum: OVERFLOW");else printf("sum: %d\n",a+b);printf("half: %d %.1f\n",a/2,a/2.0);printf("wrap: %d\n",(u+k)%256);double f=n;printf("float: %d\n",(int)f);return 0;}` },
      { why: 'wraparound ignored (int instead of unsigned char)', src: H + R`int main(void){int a,b,u,k,n;if(scanf("%d%d%d%d%d",&a,&b,&u,&k,&n)!=5||a<0||b<0||u<0||u>255||k<0||k>1000||n<0||n>100000000){puts("ERROR");return 0;}printf("sizes: char %zu short %zu int %zu long long %zu float %zu double %zu\n",sizeof(char),sizeof(short),sizeof(int),sizeof(long long),sizeof(float),sizeof(double));printf("limits: INT_MAX %d INT_MIN %d\n",INT_MAX,INT_MIN);if(a>INT_MAX-b)puts("sum: OVERFLOW");else printf("sum: %d\n",a+b);printf("half: %d %.1f\n",a/2,a/2.0);printf("wrap: %d\n",u+k);float f=(float)n;printf("float: %d\n",(int)f);return 0;}` },
      { why: 'integer division for the half', src: H + R`int main(void){int a,b,u,k,n;if(scanf("%d%d%d%d%d",&a,&b,&u,&k,&n)!=5||a<0||b<0||u<0||u>255||k<0||k>1000||n<0||n>100000000){puts("ERROR");return 0;}printf("sizes: char %zu short %zu int %zu long long %zu float %zu double %zu\n",sizeof(char),sizeof(short),sizeof(int),sizeof(long long),sizeof(float),sizeof(double));printf("limits: INT_MAX %d INT_MIN %d\n",INT_MAX,INT_MIN);if(a>INT_MAX-b)puts("sum: OVERFLOW");else printf("sum: %d\n",a+b);printf("half: %d %.1f\n",a/2,(double)(a/2));printf("wrap: %d\n",(u+k)%256);float f=(float)n;printf("float: %d\n",(int)f);return 0;}` }
    ]
  },
  'c-lab-34': {
    pass: [H + R`
static int shift(int ch, int base, int k) { return base + (ch - base + k) % 26; }
int main(void)
{
    int k;
    if (scanf("%d", &k) != 1 || k < 0 || k > 25) { printf("ERROR\n"); return 0; }
    int ch = getchar();
    while (ch != '\n' && ch != EOF) ch = getchar();
    int counts[5] = {0}, total = 0;
    for (ch = getchar(); ch != EOF && ch != '\n'; ch = getchar()) {
        if (ch >= 'A' && ch <= 'Z') { counts[0]++; putchar(shift(ch, 'A', k)); continue; }
        if (ch >= 'a' && ch <= 'z') { counts[1]++; putchar(shift(ch, 'a', k)); continue; }
        if (ch >= '0' && ch <= '9') { counts[2]++; total += ch - '0'; }
        else if (ch == ' ') counts[3]++;
        else counts[4]++;
        putchar(ch);
    }
    printf("\nupper %d lower %d digits %d spaces %d other %d\ndigit sum: %d\n",
           counts[0], counts[1], counts[2], counts[3], counts[4], total);
    return 0;
}`],
    fail: [
      { why: 'did not clear the rest of the first line', src: H + R`int main(void){int k,c;if(scanf("%d",&k)!=1||k<0||k>25){puts("ERROR");return 0;}int up=0,lo=0,dg=0,sp=0,ot=0,sum=0;while((c=getchar())!='\n'&&c!=EOF){if(isupper(c)){up++;putchar('A'+(c-'A'+k)%26);}else if(islower(c)){lo++;putchar('a'+(c-'a'+k)%26);}else{if(isdigit(c)){dg++;sum+=c-'0';}else if(c==' ')sp++;else ot++;putchar(c);}}putchar('\n');printf("upper %d lower %d digits %d spaces %d other %d\n",up,lo,dg,sp,ot);printf("digit sum: %d\n",sum);return 0;}` },
      { why: 'no wraparound past z', src: H + R`int main(void){int k,c;if(scanf("%d",&k)!=1||k<0||k>25){puts("ERROR");return 0;}while((c=getchar())!='\n'&&c!=EOF){}int up=0,lo=0,dg=0,sp=0,ot=0,sum=0;while((c=getchar())!='\n'&&c!=EOF){if(isupper(c)){up++;putchar(c+k);}else if(islower(c)){lo++;putchar(c+k);}else{if(isdigit(c)){dg++;sum+=c-'0';}else if(c==' ')sp++;else ot++;putchar(c);}}putchar('\n');printf("upper %d lower %d digits %d spaces %d other %d\n",up,lo,dg,sp,ot);printf("digit sum: %d\n",sum);return 0;}` },
      { why: 'adds character codes instead of digit values', src: H + R`int main(void){int k,c;if(scanf("%d",&k)!=1||k<0||k>25){puts("ERROR");return 0;}while((c=getchar())!='\n'&&c!=EOF){}int up=0,lo=0,dg=0,sp=0,ot=0,sum=0;while((c=getchar())!='\n'&&c!=EOF){if(isupper(c)){up++;putchar('A'+(c-'A'+k)%26);}else if(islower(c)){lo++;putchar('a'+(c-'a'+k)%26);}else{if(isdigit(c)){dg++;sum+=c;}else if(c==' ')sp++;else ot++;putchar(c);}}putchar('\n');printf("upper %d lower %d digits %d spaces %d other %d\n",up,lo,dg,sp,ot);printf("digit sum: %d\n",sum);return 0;}` }
    ]
  },
  'c-lab-35': {
    pass: [H + R`
int main(void)
{
    int day, minutes;
    if (scanf("%d %d", &day, &minutes) != 2 || day < 1 || day > 100000 || minutes < 0 || minutes > 1000000) {
        puts("ERROR");
        return 0;
    }
    int zero = day - 1;
    printf("week %d day %d\n", zero / 7 + 1, zero % 7 + 1);
    if (day % 3 == 0) puts("water YES"); else puts("water NO");
    if (day % 5 == 0) puts("feed YES"); else puts("feed NO");
    int days = minutes / (24 * 60), rest = minutes - days * 24 * 60;
    printf("time %d days %02d:%02d\n", days, rest / 60, rest % 60);
    return 0;
}`],
    fail: [
      { why: 'week and day not counted from zero', src: H + R`int main(void){int d,m;if(scanf("%d%d",&d,&m)!=2||d<1||d>100000||m<0||m>1000000){puts("ERROR");return 0;}printf("week %d day %d\n",d/7+1,d%7);printf("water %s\n",d%3==0?"YES":"NO");printf("feed %s\n",d%5==0?"YES":"NO");printf("time %d days %02d:%02d\n",m/1440,m%1440/60,m%60);return 0;}` },
      { why: 'hours not reduced modulo a day', src: H + R`int main(void){int d,m;if(scanf("%d%d",&d,&m)!=2||d<1||d>100000||m<0||m>1000000){puts("ERROR");return 0;}printf("week %d day %d\n",(d-1)/7+1,(d-1)%7+1);printf("water %s\n",d%3==0?"YES":"NO");printf("feed %s\n",d%5==0?"YES":"NO");printf("time %d days %02d:%02d\n",m/1440,m/60,m%60);return 0;}` }
    ]
  },
  'c-lab-36': {
    pass: [H + R`
int is_odd(int n) { return n % 2 == 1 || n % 2 == -1; }
int wrap_index(int position, int size) { return (position % size + size) % size; }
int floor_div(int a, int b)
{
    int q = a / b, r = a % b;
    if (r != 0 && (r < 0) != (b < 0)) q -= 1;
    return q;
}
int floor_mod(int a, int b)
{
    int r = a % b;
    if (r != 0 && (r > 0) != (b > 0)) r = r + b;
    return r;
}`],
    fail: [
      { why: 'n % 2 == 1 misses negative odd numbers', src: H + R`int is_odd(int n){return n%2==1;}int wrap_index(int p,int s){int r=p%s;return r<0?r+s:r;}int floor_div(int a,int b){int q=a/b;if(a%b!=0&&((a<0)!=(b<0)))q--;return q;}int floor_mod(int a,int b){int r=a%b;if(r!=0&&((r<0)!=(b<0)))r+=b;return r;}` },
      { why: 'C remainder used as the ring slot', src: H + R`int is_odd(int n){return n%2!=0;}int wrap_index(int p,int s){return p%s;}int floor_div(int a,int b){int q=a/b;if(a%b!=0&&((a<0)!=(b<0)))q--;return q;}int floor_mod(int a,int b){int r=a%b;if(r!=0&&((r<0)!=(b<0)))r+=b;return r;}` },
      { why: 'floor taken as plain truncation', src: H + R`int is_odd(int n){return n%2!=0;}int wrap_index(int p,int s){int r=p%s;return r<0?r+s:r;}int floor_div(int a,int b){return a/b;}int floor_mod(int a,int b){return a%b;}` }
    ]
  },
  'c-lab-37': {
    pass: [H + R`
int main(void)
{
    int ticket, ch;
    if (scanf("%d", &ticket) != 1 || ticket < 0 || ticket > 9999) { puts("ERROR"); return 0; }
    while ((ch = getchar()) != EOF) {
        if (isspace(ch)) continue;
        if (ch == 'T') { printf("take %d\n", ticket); ++ticket; }
        else if (ch == 'S') { ticket++; printf("skip %d\n", ticket); }
        else if (ch == 'R' && ticket > 0) --ticket;
        else puts("ERROR");
    }
    printf("next: %d\n", ticket);
    return 0;
}`],
    fail: [
      { why: 'prefix used for take', src: H + R`int main(void){int t;char c;if(scanf("%d",&t)!=1||t<0||t>9999){puts("ERROR");return 0;}while(scanf(" %c",&c)==1){if(c=='T')printf("take %d\n",++t);else if(c=='S')printf("skip %d\n",++t);else if(c=='R'){if(t>0)t--;else puts("ERROR");}else puts("ERROR");}printf("next: %d\n",t);return 0;}` },
      { why: 'postfix used for skip', src: H + R`int main(void){int t;char c;if(scanf("%d",&t)!=1||t<0||t>9999){puts("ERROR");return 0;}while(scanf(" %c",&c)==1){if(c=='T')printf("take %d\n",t++);else if(c=='S')printf("skip %d\n",t++);else if(c=='R'){if(t>0)t--;else puts("ERROR");}else puts("ERROR");}printf("next: %d\n",t);return 0;}` }
    ]
  },
  'c-lab-38': {
    pass: [H + R`
int read_next(const int *stones, int *index) { int where = *index; *index = where + 1; return *(stones + where); }
int skip_read(const int *stones, int *index) { *index += 1; return stones[*index]; }
int use_then_bump(int *counter) { int old = *counter; *counter += 1; return old; }
int bump_then_use(int *counter) { *counter += 1; return *counter; }
int tally(int *a, int *b) { int before = *a; *a += 1; *b -= 1; return before + before + *b; }`],
    fail: [
      { why: '*index++ moves the pointer, not the index', src: H + R`int read_next(const int *s,int *i){return s[*i++];}int skip_read(const int *s,int *i){return s[++*i];}int use_then_bump(int *c){return (*c)++;}int bump_then_use(int *c){return ++*c;}int tally(int *a,int *b){return 2*(*a)++ + --*b;}` },
      { why: 'prefix and postfix swapped', src: H + R`int read_next(const int *s,int *i){return s[++*i];}int skip_read(const int *s,int *i){return s[(*i)++];}int use_then_bump(int *c){return ++*c;}int bump_then_use(int *c){return (*c)++;}int tally(int *a,int *b){return 2*(*a)++ + --*b;}` },
      { why: 'tally uses the new *a and the old *b', src: H + R`int read_next(const int *s,int *i){return s[(*i)++];}int skip_read(const int *s,int *i){return s[++*i];}int use_then_bump(int *c){return (*c)++;}int bump_then_use(int *c){return ++*c;}int tally(int *a,int *b){return 2*++*a + (*b)--;}` }
    ]
  },
  'c-lab-39': {
    pass: [H + R`
int main(void)
{
    int a, b, c, f;
    if (scanf("%d%d%d%d", &a, &b, &c, &f) != 4) { puts("ERROR"); return 0; }
    if (a < -10000 || a > 10000 || b < -10000 || b > 10000 || c < -10000 || c > 10000 || f < -1000 || f > 1000) { puts("ERROR"); return 0; }
    double sum = a + b + c;
    printf("average: %.2f\n", sum / 3);
    int celsius = f - 32;
    celsius *= 5;
    celsius /= 9;
    printf("celsius: %d\n", celsius);
    int total = a + b + c;
    if (total != 0) printf("percent: %d\n", (a * 100) / total); else printf("percent: none\n");
    printf("r1: %d\n", (a % 7) * 2);
    printf("r2: %d\n", (a * 2) % 7);
    return 0;
}`],
    fail: [
      { why: 'average divides only c', src: H + R`int main(void){int a,b,c,f;if(scanf("%d%d%d%d",&a,&b,&c,&f)!=4||a<-10000||a>10000||b<-10000||b>10000||c<-10000||c>10000||f<-1000||f>1000){puts("ERROR");return 0;}printf("average: %.2f\n",a+b+c/3.0);printf("celsius: %d\n",(f-32)*5/9);int t=a+b+c;if(t==0)puts("percent: none");else printf("percent: %d\n",a*100/t);printf("r1: %d\n",a%7*2);printf("r2: %d\n",a*2%7);return 0;}` },
      { why: '5 / 9 evaluated first', src: H + R`int main(void){int a,b,c,f;if(scanf("%d%d%d%d",&a,&b,&c,&f)!=4||a<-10000||a>10000||b<-10000||b>10000||c<-10000||c>10000||f<-1000||f>1000){puts("ERROR");return 0;}printf("average: %.2f\n",(a+b+c)/3.0);printf("celsius: %d\n",5/9*(f-32));int t=a+b+c;if(t==0)puts("percent: none");else printf("percent: %d\n",a*100/t);printf("r1: %d\n",a%7*2);printf("r2: %d\n",a*2%7);return 0;}` },
      { why: 'r2 grouped like r1', src: H + R`int main(void){int a,b,c,f;if(scanf("%d%d%d%d",&a,&b,&c,&f)!=4||a<-10000||a>10000||b<-10000||b>10000||c<-10000||c>10000||f<-1000||f>1000){puts("ERROR");return 0;}printf("average: %.2f\n",(a+b+c)/3.0);printf("celsius: %d\n",(f-32)*5/9);int t=a+b+c;if(t==0)puts("percent: none");else printf("percent: %d\n",a/t*100);printf("r1: %d\n",a%7*2);printf("r2: %d\n",a%7*2);return 0;}` }
    ]
  },
  'c-lab-40': {
    pass: [H + R`
int main(void)
{
    int L, P, A, D, T, s, r, h;
    if (scanf("%d %d %d %d %d %d %d %d", &L, &P, &A, &D, &T, &s, &r, &h) != 8) { puts("ERROR"); return 0; }
    if (L < 1 || L > 100 || P < 1 || P > 250 || A < 1 || A > 999 || D < 1 || D > 999) { puts("ERROR"); return 0; }
    if (T < 0 || T > 5 || (s != 0 && s != 1) || r < 0 || r > 255 || h < 1 || h > 9999) { puts("ERROR"); return 0; }
    int base = 2 * L;
    base /= 5;
    base += 2;
    base *= P;
    base *= A;
    base /= D;
    base /= 50;
    base += 2;
    int damage = base;
    if (s == 1) { damage *= 3; damage /= 2; }
    switch (T) {
    case 0: damage = 0; break;
    case 1: damage /= 4; break;
    case 2: damage /= 2; break;
    case 4: damage *= 2; break;
    case 5: damage *= 4; break;
    default: break;
    }
    int factor = 217 + r % 39;
    damage = damage * factor / 255;
    int critical = (r % 16 == 0) && (T != 0);
    if (critical) damage = damage * 2;
    if (T != 0 && damage < 1) damage = 1;
    int bigger = base;
    if (damage > bigger) bigger = damage;
    printf("base %d\ndamage %d\ncritical %s\nshare %.1f\nnext %d\n", base, damage, critical ? "YES" : "NO", (double)damage * 100 / h, bigger + 1);
    return 0;
}`],
    fail: [
      { why: 'roll factor divided before multiplying', src: H + R`int main(void){int L,P,A,D,T,s,r,h;if(scanf("%d%d%d%d%d%d%d%d",&L,&P,&A,&D,&T,&s,&r,&h)!=8||L<1||L>100||P<1||P>250||A<1||A>999||D<1||D>999||T<0||T>5||s<0||s>1||r<0||r>255||h<1||h>9999){puts("ERROR");return 0;}int base=(2*L/5+2)*P*A/D/50+2;int d=base;if(s)d=d*3/2;static const int nu[6]={0,1,1,1,2,4},de[6]={1,4,2,1,1,1};d=d*nu[T]/de[T];d=d*((217+r%39)/255);int c=r%16==0&&T!=0;if(c)d*=2;if(T!=0&&d<1)d=1;printf("base %d\ndamage %d\ncritical %s\nshare %.1f\nnext %d\n",base,d,c?"YES":"NO",d*100.0/h,(base>d?base:d)+1);return 0;}` },
      { why: 'conditional operator adds one on one side only', src: H + R`int main(void){int L,P,A,D,T,s,r,h;if(scanf("%d%d%d%d%d%d%d%d",&L,&P,&A,&D,&T,&s,&r,&h)!=8||L<1||L>100||P<1||P>250||A<1||A>999||D<1||D>999||T<0||T>5||s<0||s>1||r<0||r>255||h<1||h>9999){puts("ERROR");return 0;}int base=(2*L/5+2)*P*A/D/50+2;int d=base;if(s)d=d*3/2;static const int nu[6]={0,1,1,1,2,4},de[6]={1,4,2,1,1,1};d=d*nu[T]/de[T];d=d*(217+r%39)/255;int c=r%16==0&&T!=0;if(c)d*=2;if(T!=0&&d<1)d=1;printf("base %d\ndamage %d\ncritical %s\nshare %.1f\nnext %d\n",base,d,c?"YES":"NO",d*100.0/h,base>d?base:d+1);return 0;}` },
      { why: 'cast applied after the int division', src: H + R`int main(void){int L,P,A,D,T,s,r,h;if(scanf("%d%d%d%d%d%d%d%d",&L,&P,&A,&D,&T,&s,&r,&h)!=8||L<1||L>100||P<1||P>250||A<1||A>999||D<1||D>999||T<0||T>5||s<0||s>1||r<0||r>255||h<1||h>9999){puts("ERROR");return 0;}int base=(2*L/5+2)*P*A/D/50+2;int d=base;if(s)d=d*3/2;static const int nu[6]={0,1,1,1,2,4},de[6]={1,4,2,1,1,1};d=d*nu[T]/de[T];d=d*(217+r%39)/255;int c=r%16==0&&T!=0;if(c)d*=2;if(T!=0&&d<1)d=1;printf("base %d\ndamage %d\ncritical %s\nshare %.1f\nnext %d\n",base,d,c?"YES":"NO",(double)(d*100/h),(base>d?base:d)+1);return 0;}` },
      { why: 'P times (A / D) instead of left to right', src: H + R`int main(void){int L,P,A,D,T,s,r,h;if(scanf("%d%d%d%d%d%d%d%d",&L,&P,&A,&D,&T,&s,&r,&h)!=8||L<1||L>100||P<1||P>250||A<1||A>999||D<1||D>999||T<0||T>5||s<0||s>1||r<0||r>255||h<1||h>9999){puts("ERROR");return 0;}int base=(2*L/5+2)*P*(A/D)/50+2;int d=base;if(s)d=d*3/2;static const int nu[6]={0,1,1,1,2,4},de[6]={1,4,2,1,1,1};d=d*nu[T]/de[T];d=d*(217+r%39)/255;int c=r%16==0&&T!=0;if(c)d*=2;if(T!=0&&d<1)d=1;printf("base %d\ndamage %d\ncritical %s\nshare %.1f\nnext %d\n",base,d,c?"YES":"NO",d*100.0/h,(base>d?base:d)+1);return 0;}` }
    ]
  },
  'c-lab-41': {
    pass: [H + R`
int main(void)
{
    int b, v, p, w;
    if (scanf("%d%d%d%d", &b, &v, &p, &w) != 4 || b < 0 || b > 16 || v < 1 || v > 100) { puts("ERROR"); return 0; }
    int has_pass = p != 0, clear = w != 0;
    int ridge = has_pass || (b >= 4 && v >= 20);
    int lake = v >= 10 && (clear || has_pass);
    int ferry = (b >= 8 && !has_pass) || (b < 8 && has_pass);
    int cave = b >= 2 && v >= 15;
    printf("ridge: %s\n", ridge ? "YES" : "NO");
    printf("lake: %s\n", lake ? "YES" : "NO");
    printf("ferry: %s\n", ferry ? "YES" : "NO");
    printf("cave: %s\n", cave ? "YES" : "NO");
    printf("truth: %d %d %d\n", !p, !!w, p && w);
    return 0;
}`],
    fail: [
      { why: 'exactly-one compared against the raw pass value', src: H + R`int main(void){int b,v,p,w;if(scanf("%d%d%d%d",&b,&v,&p,&w)!=4||b<0||b>16||v<1||v>100){puts("ERROR");return 0;}int ridge=(b>=4&&v>=20)||p;int lake=!(v<10||(!w&&!p));int ferry=(b>=8)!=p;int cave=!(b<2||v<15);printf("ridge: %s\nlake: %s\nferry: %s\ncave: %s\n",ridge?"YES":"NO",lake?"YES":"NO",ferry?"YES":"NO",cave?"YES":"NO");printf("truth: %d %d %d\n",!p,!!w,p&&w);return 0;}` },
      { why: 'De Morgan applied without flipping the operator', src: H + R`int main(void){int b,v,p,w;if(scanf("%d%d%d%d",&b,&v,&p,&w)!=4||b<0||b>16||v<1||v>100){puts("ERROR");return 0;}int ridge=(b>=4&&v>=20)||p;int lake=!(v<10||(!w&&!p));int ferry=(b>=8)!=(p!=0);int cave=b>=2||v>=15;printf("ridge: %s\nlake: %s\nferry: %s\ncave: %s\n",ridge?"YES":"NO",lake?"YES":"NO",ferry?"YES":"NO",cave?"YES":"NO");printf("truth: %d %d %d\n",!p,!!w,p&&w);return 0;}` },
      { why: 'prints the raw values instead of 0 or 1', src: H + R`int main(void){int b,v,p,w;if(scanf("%d%d%d%d",&b,&v,&p,&w)!=4||b<0||b>16||v<1||v>100){puts("ERROR");return 0;}int ridge=(b>=4&&v>=20)||p;int lake=!(v<10||(!w&&!p));int ferry=(b>=8)!=(p!=0);int cave=!(b<2||v<15);printf("ridge: %s\nlake: %s\nferry: %s\ncave: %s\n",ridge?"YES":"NO",lake?"YES":"NO",ferry?"YES":"NO",cave?"YES":"NO");printf("truth: %d %d %d\n",!p,w,p&&w);return 0;}` }
    ]
  },
  'c-lab-42': {
    pass: [H + R`
int is_registered(int id);
int is_cleared(int id);
int can_enter(int badges, int id) { if (badges < 3) return 0; return is_registered(id) ? 1 : 0; }
int needs_escort(int level, int id) { if (level < 10) return 1; return is_cleared(id) ? 0 : 1; }
int fair_share(int total, int count) { if (count <= 0) return 0; return total / count >= 50; }
int open_gate(int id, int key) { if (!is_registered(id)) return 0; if (key) return 1; return is_cleared(id) != 0; }
int implies(int p, int q) { return p ? q != 0 : 1; }
int not_both(int p, int q) { return !p || !q; }`],
    fail: [
      { why: 'checks the registry before the cheap test', src: H + R`int is_registered(int id);int is_cleared(int id);int can_enter(int badges,int id){int ok=is_registered(id);return badges>=3&&ok;}int needs_escort(int level,int id){return level<10||!is_cleared(id);}int fair_share(int t,int c){return c>0&&t/c>=50;}int open_gate(int id,int key){return is_registered(id)&&(key||is_cleared(id));}int implies(int p,int q){return !p||q;}int not_both(int p,int q){return !(p&&q);}` },
      { why: 'divides before checking the count', src: H + R`int is_registered(int id);int is_cleared(int id);int can_enter(int badges,int id){return badges>=3&&is_registered(id);}int needs_escort(int level,int id){return level<10||!is_cleared(id);}int fair_share(int t,int c){return t/c>=50&&c>0;}int open_gate(int id,int key){return is_registered(id)&&(key||is_cleared(id));}int implies(int p,int q){return !p||q;}int not_both(int p,int q){return !(p&&q);}` },
      { why: 'count != 0 lets negative counts through', src: H + R`int is_registered(int id);int is_cleared(int id);int can_enter(int badges,int id){return badges>=3&&is_registered(id);}int needs_escort(int level,int id){return level<10||!is_cleared(id);}int fair_share(int t,int c){return c!=0&&t/c>=50;}int open_gate(int id,int key){return is_registered(id)&&(key||is_cleared(id));}int implies(int p,int q){return !p||q;}int not_both(int p,int q){return !(p&&q);}` },
      { why: 'bitwise | returns raw values', src: H + R`int is_registered(int id);int is_cleared(int id);int can_enter(int badges,int id){return badges>=3&&is_registered(id);}int needs_escort(int level,int id){return level<10||!is_cleared(id);}int fair_share(int t,int c){return c>0&&t/c>=50;}int open_gate(int id,int key){return is_registered(id)&&(key||is_cleared(id));}int implies(int p,int q){return !p|q;}int not_both(int p,int q){return !(p&&q);}` },
      { why: 'open_gate checks cleared even with a key', src: H + R`int is_registered(int id);int is_cleared(int id);int can_enter(int badges,int id){return badges>=3&&is_registered(id);}int needs_escort(int level,int id){return level<10||!is_cleared(id);}int fair_share(int t,int c){return c>0&&t/c>=50;}int open_gate(int id,int key){return is_registered(id)&&(is_cleared(id)||key);}int implies(int p,int q){return !p||q;}int not_both(int p,int q){return !(p&&q);}` }
    ]
  },
  'c-lab-43': {
    pass: [H + R`
int main(void)
{
    int x, y, z;
    if (scanf("%d %d %d", &x, &y, &z) < 3) { puts("ERROR"); return 0; }
    int xy = x < y;
    printf("x truthy: %d\n", x != 0);
    printf("falsy count: %d\n", (x == 0) + (y == 0) + (z == 0));
    printf("in order: %d\n", xy && y < z);
    printf("C reads x < y < z as: %d\n", xy < z);
    printf("x == y == z: %d\n", (x == y) == z);
    printf("any: %d\n", x != 0 || y != 0 || z != 0);
    printf("all: %d\n", x != 0 && y != 0 && z != 0);
    printf("x > y: %d\n", y < x);
    return 0;
}`],
    fail: [
      { why: 'x < y < z used for "in order"', src: H + R`int main(void){int x,y,z;if(scanf("%d%d%d",&x,&y,&z)!=3){puts("ERROR");return 0;}printf("x truthy: %d\n",!!x);printf("falsy count: %d\n",!x+!y+!z);printf("in order: %d\n",x<y<z);printf("C reads x < y < z as: %d\n",(x<y)<z);printf("x == y == z: %d\n",(x==y)==z);printf("any: %d\n",x||y||z);printf("all: %d\n",x&&y&&z);printf("x > y: %d\n",x>y);return 0;}` },
      { why: 'x truthy printed as x itself', src: H + R`int main(void){int x,y,z;if(scanf("%d%d%d",&x,&y,&z)!=3){puts("ERROR");return 0;}printf("x truthy: %d\n",x);printf("falsy count: %d\n",!x+!y+!z);printf("in order: %d\n",x<y&&y<z);printf("C reads x < y < z as: %d\n",(x<y)<z);printf("x == y == z: %d\n",(x==y)==z);printf("any: %d\n",x||y||z);printf("all: %d\n",x&&y&&z);printf("x > y: %d\n",x>y);return 0;}` }
    ]
  },
  'c-lab-44': {
    pass: [H + R`
int grade_points(int score) { return (score / 10 >= 6) * (score / 10 - 5) - (score == 100); }
int larger(int a, int b) { int pick[2]; pick[0] = b; pick[1] = a; return pick[a >= b]; }
int sign_of(int n) { return (n > 0) - (n < 0); }
int shipping_cents(int grams) { static const int cost[3] = {300, 700, 1500}; return cost[(grams > 500) + (grams > 2000)]; }
const char *parity_name(int n) { static const char words[2][5] = {"even", "odd"}; return words[n % 2 * (n % 2)]; }
int days_in_month(int month, int leap) { return 28 + (month + month / 8) % 2 + 2 % month + 2 * (1 / month) + (month == 2) * leap; }`],
    fail: [
      { why: 'uses an if statement', src: H + R`int grade_points(int s){if(s>=90)return 4;return (s>=60)+(s>=70)+(s>=80);}int larger(int a,int b){return a*(a>=b)+b*(a<b);}int sign_of(int n){return (n>0)-(n<0);}int shipping_cents(int g){return 300+400*(g>500)+800*(g>2000);}const char *parity_name(int n){static const char *const w[2]={"even","odd"};return w[n%2!=0];}int days_in_month(int m,int l){static const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};return d[m]+(m==2)*l;}` },
      { why: 'n % 2 == 1 used as the index misses negative odd n', src: H + R`int grade_points(int s){return (s>=60)+(s>=70)+(s>=80)+(s>=90);}int larger(int a,int b){return a*(a>=b)+b*(a<b);}int sign_of(int n){return (n>0)-(n<0);}int shipping_cents(int g){return 300+400*(g>500)+800*(g>2000);}const char *parity_name(int n){static const char *const w[2]={"even","odd"};return w[n%2==1];}int days_in_month(int m,int l){static const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};return d[m]+(m==2)*l;}` },
      { why: 'shipping thresholds off by one', src: H + R`int grade_points(int s){return (s>=60)+(s>=70)+(s>=80)+(s>=90);}int larger(int a,int b){return a*(a>=b)+b*(a<b);}int sign_of(int n){return (n>0)-(n<0);}int shipping_cents(int g){return 300+400*(g>=500)+800*(g>=2000);}const char *parity_name(int n){static const char *const w[2]={"even","odd"};return w[n%2!=0];}int days_in_month(int m,int l){static const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};return d[m]+(m==2)*l;}` }
    ]
  },
  'c-lab-45': {
    pass: [H + R`
int square(int n) { int result = n * n; return result; }
double percent_of(int part, int whole) { double p = part; return p / whole * 100; }
int nearest(double x) { int whole = (int)x; double rest = x - whole; if (rest >= 0.5) whole++; if (rest <= -0.5) whole--; return whole; }
void repeat_char(char c, int n) { while (n-- > 0) printf("%c", c); printf("\n"); }
int fourth_power(int x) { int s = square(x); return square(s); }`],
    fail: [
      { why: 'integer percent', src: H + R`int square(int n){return n*n;}double percent_of(int p,int w){return 100*p/w;}int nearest(double x){return x<0?(int)(x-0.5):(int)(x+0.5);}void repeat_char(char c,int n){for(int i=0;i<n;i++)putchar(c);putchar('\n');}int fourth_power(int x){return square(square(x));}` },
      { why: 'adds 0.5 for negatives too', src: H + R`int square(int n){return n*n;}double percent_of(int p,int w){return 100.0*p/w;}int nearest(double x){return (int)(x+0.5);}void repeat_char(char c,int n){for(int i=0;i<n;i++)putchar(c);putchar('\n');}int fourth_power(int x){return square(square(x));}` }
    ]
  },
  'c-lab-46': {
    pass: [H + R`
int is_leap(int year)
{
    if (year % 400 == 0) return 1;
    if (year % 100 == 0) return 0;
    return year % 4 == 0;
}
int days_in_month(int month, int year)
{
    switch (month) {
    case 4: case 6: case 9: case 11: return 30;
    case 2: return is_leap(year) ? 29 : 28;
    case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
    default: return 0;
    }
}
int is_valid_date(int day, int month, int year)
{
    if (year < 1 || year > 9999) return 0;
    int length = days_in_month(month, year);
    return length > 0 && day >= 1 && day <= length;
}
int day_of_year(int day, int month, int year)
{
    if (!is_valid_date(day, month, year)) return -1;
    int total = 0;
    for (int m = month - 1; m >= 1; m--) total += days_in_month(m, year);
    return total + day;
}
int days_left_in_year(int day, int month, int year)
{
    int used = day_of_year(day, month, year);
    if (used == -1) return -1;
    return day_of_year(31, 12, year) - used;
}`],
    fail: [
      { why: 'forgets the 400-year rule', src: H + R`int is_leap(int y){return y%4==0&&y%100!=0;}int days_in_month(int m,int y){static const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};if(m<1||m>12)return 0;return d[m]+(m==2&&is_leap(y));}int is_valid_date(int d,int m,int y){return y>=1&&y<=9999&&m>=1&&m<=12&&d>=1&&d<=days_in_month(m,y);}int day_of_year(int d,int m,int y){if(!is_valid_date(d,m,y))return -1;int t=d;for(int i=1;i<m;i++)t+=days_in_month(i,y);return t;}int days_left_in_year(int d,int m,int y){int n=day_of_year(d,m,y);if(n<0)return -1;return (is_leap(y)?366:365)-n;}` },
      { why: 'counts the current month too', src: H + R`int is_leap(int y){return (y%4==0&&y%100!=0)||y%400==0;}int days_in_month(int m,int y){static const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};if(m<1||m>12)return 0;return d[m]+(m==2&&is_leap(y));}int is_valid_date(int d,int m,int y){return y>=1&&y<=9999&&m>=1&&m<=12&&d>=1&&d<=days_in_month(m,y);}int day_of_year(int d,int m,int y){if(!is_valid_date(d,m,y))return -1;int t=d;for(int i=1;i<=m;i++)t+=days_in_month(i,y);return t-days_in_month(m,y);}int days_left_in_year(int d,int m,int y){int n=day_of_year(d,m,y);if(n<0)return -1;return 365-n;}` }
    ]
  },
  'c-lab-47': {
    pass: [H + R`
void swap_ints(int *a, int *b) { int keep = *b; *b = *a; *a = keep; }
void sort_three(int *a, int *b, int *c)
{
    int *small = a;
    if (*b < *small) small = b;
    if (*c < *small) small = c;
    swap_ints(a, small);
    if (*c < *b) swap_ints(b, c);
}
void split_seconds(int total, int *hours, int *minutes, int *seconds)
{
    *seconds = total % 60;
    total /= 60;
    *minutes = total % 60;
    *hours = total / 60;
}
int *pick_larger(int *a, int *b) { if (*a >= *b) return a; return b; }`],
    fail: [
      { why: 'XOR swap zeroes a self-swap', src: H + R`void swap_ints(int *a,int *b){*a^=*b;*b^=*a;*a^=*b;}void sort_three(int *a,int *b,int *c){if(*a>*b)swap_ints(a,b);if(*b>*c)swap_ints(b,c);if(*a>*b)swap_ints(a,b);}void split_seconds(int t,int *h,int *m,int *s){*h=t/3600;*m=t%3600/60;*s=t%60;}int *pick_larger(int *a,int *b){return *b>*a?b:a;}` },
      { why: 'swaps the local copies of the pointers', src: H + R`void swap_ints(int *a,int *b){int *t=a;a=b;b=t;(void)a;(void)b;}void sort_three(int *a,int *b,int *c){int t;if(*a>*b){t=*a;*a=*b;*b=t;}if(*b>*c){t=*b;*b=*c;*c=t;}if(*a>*b){t=*a;*a=*b;*b=t;}}void split_seconds(int t,int *h,int *m,int *s){*h=t/3600;*m=t%3600/60;*s=t%60;}int *pick_larger(int *a,int *b){return *b>*a?b:a;}` },
      { why: 'tie returns b', src: H + R`void swap_ints(int *a,int *b){int t=*a;*a=*b;*b=t;}void sort_three(int *a,int *b,int *c){if(*a>*b)swap_ints(a,b);if(*b>*c)swap_ints(b,c);if(*a>*b)swap_ints(a,b);}void split_seconds(int t,int *h,int *m,int *s){*h=t/3600;*m=t%3600/60;*s=t%60;}int *pick_larger(int *a,int *b){return *a>*b?a:b;}` },
      { why: 'sort_three with only two compare-and-swaps', src: H + R`void swap_ints(int *a,int *b){int t=*a;*a=*b;*b=t;}void sort_three(int *a,int *b,int *c){if(*a>*b)swap_ints(a,b);if(*b>*c)swap_ints(b,c);}void split_seconds(int t,int *h,int *m,int *s){*h=t/3600;*m=t%3600/60;*s=t%60;}int *pick_larger(int *a,int *b){return *b>*a?b:a;}` }
    ]
  },
  'c-lab-48': {
    pass: [H + R`
int *find_first(int *begin, int *end, int value)
{
    while (begin != end && *begin != value) ++begin;
    return begin;
}
int count_range(const int *begin, const int *end) { int n = 0; while (begin + n < end) n++; return n; }
void reverse_range(int *begin, int *end)
{
    if (begin == end) return;
    int *left = begin, *right = end - 1;
    for (; left < right; left++, right--) { int t = *left; *left = *right; *right = t; }
}
int *max_element(int *begin, int *end)
{
    int *best = end;
    for (int *p = begin; p != end; ++p)
        if (best == end || *p > *best) best = p;
    return best;
}
int sum_stride(const int *begin, const int *end, int step)
{
    int total = 0, n = count_range(begin, end);
    for (int i = 0; i < n; i += step) total += *(begin + i);
    return total;
}`],
    fail: [
      { why: 'max_element keeps the last of equal maxima', src: H + R`int *find_first(int *b,int *e,int v){for(int *p=b;p<e;p++)if(*p==v)return p;return e;}int count_range(const int *b,const int *e){return (int)(e-b);}void reverse_range(int *b,int *e){while(e-b>1){int t=*b;*b++=*--e;*e=t;}}int *max_element(int *b,int *e){if(b==e)return e;int *m=b;for(int *p=b+1;p<e;p++)if(*p>=*m)m=p;return m;}int sum_stride(const int *b,const int *e,int s){int t=0;long n=e-b;for(long i=0;i<n;i+=s)t+=b[i];return t;}` },
      { why: 'count_range reports bytes', src: H + R`int *find_first(int *b,int *e,int v){for(int *p=b;p<e;p++)if(*p==v)return p;return e;}int count_range(const int *b,const int *e){return (int)((const char*)e-(const char*)b);}void reverse_range(int *b,int *e){while(e-b>1){int t=*b;*b++=*--e;*e=t;}}int *max_element(int *b,int *e){if(b==e)return e;int *m=b;for(int *p=b+1;p<e;p++)if(*p>*m)m=p;return m;}int sum_stride(const int *b,const int *e,int s){int t=0;long n=e-b;for(long i=0;i<n;i+=s)t+=b[i];return t;}` },
      { why: 'reverse includes the element at end', src: H + R`int *find_first(int *b,int *e,int v){for(int *p=b;p<e;p++)if(*p==v)return p;return e;}int count_range(const int *b,const int *e){return (int)(e-b);}void reverse_range(int *b,int *e){int *l=b,*r=e;if(b==e)return;while(l<r){int t=*l;*l=*r;*r=t;l++;r--;}}int *max_element(int *b,int *e){if(b==e)return e;int *m=b;for(int *p=b+1;p<e;p++)if(*p>*m)m=p;return m;}int sum_stride(const int *b,const int *e,int s){int t=0;long n=e-b;for(long i=0;i<n;i+=s)t+=b[i];return t;}` }
    ]
  },
  'c-lab-49': {
    pass: [H + R`
void start_session(unsigned int seed) { srand(seed); }
int roll_die(int sides) { int r = rand(); return 1 + r % sides; }
int roll_range(int low, int high) { int span = high - low + 1; int r = rand(); return r % span + low; }
int coin_flip(void) { return rand() % 2 == 1; }
int count_hits(int trials, int chance) { int hits = 0; while (trials-- > 0) { int roll = rand() % 100; hits += roll < chance; } return hits; }`],
    fail: [
      { why: 'reseeds inside every roll', src: H + R`void start_session(unsigned int s){srand(s);}int roll_die(int s){srand(1);return rand()%s+1;}int roll_range(int l,int h){return l+rand()%(h-l+1);}int coin_flip(void){return rand()%2;}int count_hits(int t,int c){int n=0;for(int i=0;i<t;i++)if(rand()%100<c)n++;return n;}` },
      { why: 'off by one in the range width', src: H + R`void start_session(unsigned int s){srand(s);}int roll_die(int s){return rand()%s+1;}int roll_range(int l,int h){return l+rand()%(h-l);}int coin_flip(void){return rand()%2;}int count_hits(int t,int c){int n=0;for(int i=0;i<t;i++)if(rand()%100<c)n++;return n;}` },
      { why: 'skips rand() when the chance is 0 or 100', src: H + R`void start_session(unsigned int s){srand(s);}int roll_die(int s){return rand()%s+1;}int roll_range(int l,int h){return l+rand()%(h-l+1);}int coin_flip(void){return rand()%2;}int count_hits(int t,int c){if(c==0)return 0;if(c==100)return t;int n=0;for(int i=0;i<t;i++)if(rand()%100<c)n++;return n;}` },
      { why: 'die gives 0 to sides - 1', src: H + R`void start_session(unsigned int s){srand(s);}int roll_die(int s){return rand()%s;}int roll_range(int l,int h){return l+rand()%(h-l+1);}int coin_flip(void){return rand()%2;}int count_hits(int t,int c){int n=0;for(int i=0;i<t;i++)if(rand()%100<c)n++;return n;}` }
    ]
  }
};
