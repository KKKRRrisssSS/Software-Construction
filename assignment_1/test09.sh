#!/bin/sh
# check rm and rm --cached --force works
# check status works
# check log works


rm -r .legit
./legit-init
touch a b c d e f

./legit-add a b c d e f

#Committed as commit 0
./legit-commit -m "first commit"

touch g

./legit-add g

echo line 1 >> a
echo line 2 >> b

#Committed as commit 1
./legit-commit -m "second commit"

echo line 3 >> c

./legit-rm f

echo line 5 >> f
./legit-rm --force e

#Committed as commit 2
./legit-commit -a -m "third commit"

rm c

./legit-rm --force --cached b

# a,d,g -- same as repo; b,f -- untracked; c -- file deleted
./legit-status

#2 third commit
#1 second commit
#0 first commit
./legit-log
