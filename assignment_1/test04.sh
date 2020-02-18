#!/bin/sh
# check the add function for the incorrect input


rm -r .legit
./legit-init

# return error -- "Usage: legit-add <file>"
./legit-add


# return error -- "legit-add: error: can not open 'non_existent_file'"
./legit-add 000


echo %56 > %56

#return error -- "legit-add: error: invalid filename %56"
./legit-add %56

echo 1 > -56

#return error -- "legit-add: error: invalid filename -56"
./legit-add -56

echo 1 > 5_6

# no error
./legit-add 5_6

mkdir 56


#return error -- "legit-add: error: '56' is not an ordinary file"
./legit-add 56



