#!/bin/sh
# check the increment of commits works
# check log works and print in the correct order
rm -r .legit
./legit-init 
echo line 1 >a
./legit-add a
./legit-commit -m '1'

echo line 2 >>a
./legit-add a
./legit-commit -m '2'

echo line 3 >>a
./legit-add a
./legit-commit -m '3'

echo line 4 >>a
./legit-add a
./legit-commit -m '4'

echo line 5 >>a
./legit-add a
./legit-commit -m '5'

echo line 6 >>a
./legit-add a
./legit-commit -m '6'

echo line 7 >>a
./legit-add a
./legit-commit -m '7'



./legit-log

./legit-show 0:a
./legit-show 1:a
./legit-show 2:a
./legit-show :a

