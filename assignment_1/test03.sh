#!/bin/sh
# check the add, commit -m, commit -a -m works 
# check the show works


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

#line 1
./legit-show 0:a

#return error -- legit-show: error: 'b' not found in commit 0
./legit-show 0:b

#line 1
#line 2
./legit-show 1:a

#return error -- legit-show: error: 'b' not found in commit 1
./legit-show 1:b

#return error -- legit-show: error: 'c' not found in commit 1
./legit-show 1:c

#line 1
#line 2
./legit-show :a

#return error -- legit-show: error: 'b' not found in index
./legit-show :b

echo tree >c
./legit-add b c

#Committed as commit 2
./legit-commit -m "third commit"


#line 1
#line 2
./legit-show 2:a

#world
./legit-show 2:b

#tree
./legit-show 2:c

