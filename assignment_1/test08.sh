#!/bin/sh
# check rm and rm --force works
# check status works


rm -r .legit
./legit-init

touch a b c d e f

./legit-add a b c d e f
#nCommited as commit 0
./legit-commit -m "first commit"
touch g
./legit-add g
echo line 1 >> a
echo line 2 >> b

#Committed as commit 1
./legit-commit -m "second commit"
echo line 4 >> c
rm d


./legit-rm f

#return error
./legit-rm --cached a e


./legit-rm --force b

#1 second commit
#0 first commit
./legit-log


#a,e -- untracked, b,d,f-- deleted, c -- file changed, g -- same as repo
./legit-status

