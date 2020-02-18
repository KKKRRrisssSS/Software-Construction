#!/bin/sh
# check status works
# check commit -a -m works
# check rm works

rm -r .legit
./legit-init
touch a b c d e f g

# check when there no add before the ./legit create, nothing to commit
./legit-commit -m "commit 0"
./legit-commit -a -m "commit 1"

#check there is commit as commit 0
./legit-add a b c d e f g
./legit-commit -m "commit 2"
# the status of all the files is "same as repo"
./legit-status

rm a b c d e f g
# the status of all the files is "file deleted"
./legit-status

#return error -- "legit-rm: error: 'a' in repository is different to working file"
./legit-rm a b c f h
# the status of all the files is "file deleted"
./legit-status


#return error -- legit-rm: error: 'a' in repository is different to working file
./legit-rm a b c
# the status of all the files is "file deleted"
./legit-status

# return "nothing to commit"
./legit-commit -a -m "commit 2"
