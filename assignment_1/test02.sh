#!/bin/sh
# check the add, commit -m, commit -a -m works 
# check the log works

rm -r .legit
./legit-init
echo line 1 >a
./legit-add a

#Committed as commit 0
./legit-commit -m 'first commit'
echo line 2 >>a
echo world >b


#return error -- legit-add: error: can not open 'non_existent_file'
./legit-add b c
# nothing to commit
./legit-commit -m 'second commit'

#if use commit -a -m, add a in current directory to index and commit
#Committed as commit 1
./legit-commit -a -m 'second commit'



#1 second commit
#0 first commit
./legit-log

#nothing to commit
./legit-commit -a -m 'third commit'

#1 second commit
#0 first commit
./legit-log

echo tree >c
./legit-add b c

#Committed as commit 2
./legit-commit -m "third commit"

#2 third commit
#1 second commit
#0 first commit
./legit-log



