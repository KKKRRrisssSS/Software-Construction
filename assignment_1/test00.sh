
#!/bin/sh
# check status function and commit -m works


rm -r .legit
./legit-init
touch a b c d e
./legit-add a b c d e

# check error message 'legit.pl: error: your repository does not have any commits yet'
./legit-status
./legit-commit -m "first commit"


rm a b c d e
./legit-add a b c d e
# check status "deleted"
./legit-status

./legit-commit -m "second commit"
# no files output
./legit-status

echo hello >a
# a is untracked
./legit-status

./legit-add a
./legit-commit -m "third commit"

echo world >>a
# file changed, but changed not staged to commit
./legit-status

./legit-add a
# file changed, change staged to commit
./legit-status

rm a
# check status 'file changed, different changes staged for commit'
./legit-status

echo new >a
./legit-add a
echo file >>a
# check status 'file changed, different changes staged for commit'
./legit-status

