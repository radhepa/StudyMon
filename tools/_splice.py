import io, sys, os
target='js/data/calc/calc-questions-problems.js'
batch=sys.argv[1]
t=io.open(target,encoding='utf-8').read()
add=io.open(batch,encoding='utf-8').read().rstrip()
if add.endswith(','): add=add[:-1]
marker='\n];\nQ.forEach'
assert t.count(marker)==1, 'marker %d' % t.count(marker)
# the last existing record must gain a comma
head, tail = t.split(marker)
head = head.rstrip()
if not head.endswith(','): head += ','
io.open(target,'w',encoding='utf-8',newline='').write(head + '\n' + add + marker + tail)
print('spliced', batch)
