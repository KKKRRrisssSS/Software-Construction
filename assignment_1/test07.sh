#!/bin/sh
# test show errors


rm -r .legit
./legit-init

echo line 1 >a
echo line 2 >b
./legit-add a b

# Committed as commit 0
./legit-commit -m "first commit"

# legit.pl: error: 'c' not found in index
./legit-show :c

# legit.pl: error: 'c' not found in commit 0
./legit-show 0:c


# legit.pl: error: unknown commit '2'
./legit-show 2:a

#line 1
./legit-show 0:a


