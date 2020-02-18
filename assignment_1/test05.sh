#!/bin/sh
# check rm and rm --cached works
# check status works


rm -r .legit
./legit-init

echo line 1 >a
./legit-add a
echo 2 >b

./legit-commit -m 'first commit'
# a - same as repo
# b - untracked
./legit-status

#status of a becomes untracked
./legit-rm --cached a
./legit-status


#status of a becomes deleted
rm a
./legit-status


# return error -- 'a' is not in the legit repository
./legit-rm a
#same as last status
./legit-status

# remove b from current directory
rm b
# no b status 
./legit-status


touch b
./legit-add b
# b is added to index
./legit-status

#remove it from working directory, still in index
rm b
./legit-status

#remove b from the index
# return error, different to both
./legit-rm --cached b
./legit-status

# create another b
touch b
./legit-add b
./legit-commit -m "second commit"


rm b
# check status b is 'file deleted'
./legit-status



