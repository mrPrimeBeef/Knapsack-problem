# Knapsack Problem 01
  En kort beskrivelse for “almindelige mennesker”
  ### Big O notion
  #### Time: O(2^n):
    - Med 5 elementer: ~47 operationer
    - Med 10 elementer: ~1000+ operationer
  #### Space: O(n)
  eks med 3 elementer
                    f(3)
                   /    \
              f(2)          f(2)
             /    \        /    \
         f(1)    f(1)   f(1)    f(1)
        /   \    /   \ /   \   /   \
      f(0) f(0) f(0) f(0) f(0) f(0) f(0) f(0)

  Rekursiv er bedre på space, men værre på time.

   - Screenshot af den kørende visualisering
# Sceenshot af visualisering:


## Gruppe:
Rolf lundsgaard Josephsen
  
## Repo:
Link til GitHub repository (både klikbart og læsbart)
eventuelt link til deployet udgave (både klikbart og læsbart)

- README.md må også indeholde informationer om de anvendte algoritmer og datastrukturer, og beskrivelser af hvordan man kan køre visualiseringen lokalt.


## misc:

### materiale:
https://www.geeksforgeeks.org/dsa/0-1-knapsack-problem-dp-10/
https://www.youtube.com/watch?v=cJ21moQpofY&t=585s


### Tests:
for at køre tests, skal man installere mocha
1) npm install --save-dev mocha
(//TODO udfyld ordenligt - save kun for dev prod)

kører "npm tests"
-b flag = bail dvs. den stopper efter 1 fejl.

package.json: 
{
  "type": "module",
  "scripts": {
    "test": "mocha test.js -b"
  },
  "devDependencies": {
    "mocha": "^11.7.5"
  }
}

 