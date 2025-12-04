# Knapsack Problem 01
  the 0/1 Knapsack problemet handler om at vælge genstande til en rygsæk, når der ikke er plads til alt. Hver genstand har både en vægt og en værdi, og opgaven er at finde den kombination af genstande, som giver den højeste samlede værdi uden at overskride rygsækkens kapacitet.

  der findes 2 andre verisoner af knapsack problem:
  Unbounded Knapsack og Double Knapsack.

  de er beskrevet i bunden.

## Big O-notation for 0/1 Knapsack-problemet
 Kompleksiteten for denne algoritme når man løser den rekursivet er O(2^n), fordi hvert item har to muligheder (inkludér eller udeluk), hvilket skaber 2^n kombinationer i værste tilfælde. Dette gør metoden ineffektiv for større datasæt, selvom den er intuitiv for at forstå problemet.

  #### Tidskompleksitet: O(2^n)
  - Med 5 elementer: ~32 operationer
  - Med 10 elementer: ~1.024 operationer

  #### Rumkompleksitet: O(n)
  - Hvert funktionskald bruger O(1) plads
  - Funktionen skal kaldes n gange, hvor n er dybden af stakken
  - Selvom algoritmen køres 2^n gange, gemmes der kun O(n) variabler i hukommelsen 
    på samme tid, fordi der kun er én aktiv funktionskald per dybde på call stacken

  Rekursiv løsning bruger mindre plads end iterative løsninger, men køre langsommere. Den sparede tid i den iterative tilgang opnås ved at bruge mere hukommelse til at gemme mellemresultater.

## Sceenshot af visualisering:
![alt text](image.png)

## Gruppe:
Rolf lundsgaard Josephsen
  
## Links til Repo og deployed version:
1) https://github.com/mrPrimeBeef/Knapsack-problem
2) https://mrprimebeef.github.io/Knapsack-problem/

## Miscellaneous:

### materialer:
1) https://www.geeksforgeeks.org/dsa/0-1-knapsack-problem-dp-10/
2) https://www.geeksforgeeks.org/dsadouble-knapsack-dynamic-programming/
3) https://www.geeksforgeeks.org/dsa/unbounded-knapsack-repetition-items-allowed/
4) https://www.youtube.com/watch?v=cJ21moQpofY&t=585s
5) https://compgeek.co.in/branch-and-bound-algorithm/


#### Tests
For at køre tests skal man installere Mocha test-frameworket.

1) Installer Mocha som development dependency:
```
   npm install --save-dev mocha
```
   (`--save-dev` betyder det kun bruges under udvikling, ikke i produktion)

2) Kør tests med kommandoen:
```
   npm test
```
   `-b` flagget betyder "bail" – testen stopper efter første fejl

**package.json konfiguration:**
```json
{
  "type": "module",
  "scripts": {
    "test": "mocha test.js -b"
  },
  "devDependencies": {
    "mocha": "^11.7.5"
  }
}
```

### alternativer knapsack:
**Unbounded Knapsack**: Du kan bruge hver genstand ubegrænset mange gange. Hvis du har en genstand værd 5 point og vægt 2, kan du putte den i rygsækken 10 gange hvis der er plads. Det er nyttigt når du fx skal fylde en rygsæk med mønter af forskellige værdier.

**Double Knapsack** (0/1 Knapsack med 2 genstande af hver type): Du har præcis to kopier af hver genstand. Du kan enten ikke bruge den, bruge en eller bruge begge. Dette ligger mellem det klassiske 0/1 Knapsack (hvor du kun kan bruge hver genstand én gang) og Unbounded Knapsack.

 