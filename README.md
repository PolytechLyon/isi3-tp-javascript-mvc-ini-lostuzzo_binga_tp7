# ISI3 - MVC design pattern - "Game of Life"

> Le rapport est à fournir dans ce document sous chacune des questions.

> Ne copiez pas le code de votre voisin, ça se voit.

Nom/Prénom : `BINGA Thomas - LOSTUZZO Tom`

Lien du codesandbox : [https://codesandbox.io/s/github/PolytechLyon/isi3-tp-javascript-mvc-ini-lostuzzo_binga_tp7](https://codesandbox.io/s/github/PolytechLyon/isi3-tp-javascript-mvc-ini-lostuzzo_binga_tp7)

> Pour générer un codesandbox associé à votre code, [suivre cette doc](https://codesandbox.io/docs/importing#import-from-github).

Vous pouvez tester le code directement sur votre navigateur, à condition de lancer un serveur local. Par exemple :

```python3 -m http.server 8000```

Votre programme sera accessible depuis l'adresse `http://localhost:8000/index.html`.



## Game of Life

Le jeu de la vie est un automate cellulaire qui répond à des règles très simple.
Il a été inventé par [John Horton Conway](https://fr.wikipedia.org/wiki/John_Horton_Conway) (1937-2020).

## Avant-propos

1. Expliquer le design pattern MVC à l'aide d'un schéma à insérer directement ici.
Utiliser un outil comme Dia pour le représenter. Je veux **votre** schéma, pas un de ceux qu'on peut trouver sur le net.

![AvantProposSchema](AvantProposSchema.png)

2. Expliquer ce pattern en complétant ce texte.

Le pattern MVC, vise à découper le `contrôleur`, de la `vue` et du `modèle` afin de rendre le code plus `structuré`.
Les responsabilités ne sont alors plus `regroupées`.
On peut ainsi changer l'aspect visuel de son application sans pour autant impacter le `fonctionnement de celle-ci`.

3. Expliquer dans quels cas on doit privilégier le pattern MVC.

Il faut privilégier le pattern MVC lorsqu'on souhaite séparer concrètement ce que l'utilisateur voit de la logique de
l'application. Cela apporte une meilleure organisation du code, ainsi qu'une possibilité de réutiliser celui-ci.
Cela devient vraiment très utile, voire indispensable, dans de gros projets. 

## À faire (obligatoire)

- Rendre le jeu fonctionel tout en respectant le design pattern MVC.
- Le bouton `start` doit lancer le jeu.
- Le bouton `stop` doit arrêter le jeu en l'état, le `start` relance le jeu.
- le bouton `reset` arrête le jeu et remet à la grille à l'état initial.

### Observer Observable

Afin de mettre à jour la vue à chaque nouvelle génération du jeu, la fonction `updated` doit notifier la view afin qu'elle se mette à jour.
Cela relève du design pattern Observer/Observable.

1. Expliquer votre implémentation:

L'usage d'un callback permet ici de `mettre à jour les observeurs` afin de dire à la _View_ de se redessiner.
L'objet _Model_ n'a pas de lien avec `l'utilisateur`. Pourtant, grâce à la `liste d'observeurs`, il peut notifier la `vue`.

2. Insérer ici un UML montrant le pattern Observer/Observable lié aux objets de ce TP.

![ObserverObservableUML](ObserverObservableUML.png)

## Optionnel

> Si vous voulez apprendre d'autres choses

- Faire en sorte de pouvoir changer les dimensions de la grille par un `<input/>` HTML.
- Faire en sorte de pouvoir modifier l'état d'une cellule en cliquant dessus.

## :warning: À rendre

- Une URL de codesandox pointant sur votre projet github afin que je puisse voir et tester le code.
- Le rapport complet.
