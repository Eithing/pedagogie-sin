# jeu_reflexes.py - PROGRAMME DE DEPART
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# LED verte sur la broche 18, LED rouge sur la broche 19, bouton sur la broche 15.
from machine import Pin
import time
import random

led_go = Pin(18, Pin.OUT)                # LED verte : "appuie !"
led_triche = Pin(19, Pin.OUT)            # LED rouge : "triche !"
bouton = Pin(15, Pin.IN, Pin.PULL_UP)    # bouton : 1 au repos, 0 quand on appuie

NB_MANCHES = 3          # nombre de manches de la partie
ATTENTE_MIN = 1000      # attente la plus courte avant la LED verte (ms)
ATTENTE_MAX = 3000      # attente la plus longue (ms)


def attendre_appui():
    # attend que le joueur appuie, puis renvoie l'instant de l'appui (ms)
    while bouton.value() == 1:
        pass
    return time.ticks_ms()


def attendre_relache():
    # attend que le joueur lache le bouton
    while bouton.value() == 0:
        pass
    time.sleep_ms(100)


def attendre_et_surveiller(duree):
    # attend duree ms ; renvoie True si le joueur appuie trop tot, False sinon
    debut = time.ticks_ms()
    while time.ticks_diff(time.ticks_ms(), debut) < duree:
        if bouton.value() == 0:
            return True
    return False


print("=== JEU DES REFLEXES ===")
led_go.value(0)
led_triche.value(0)

# TODO mission 5 : creer ici les variables meilleur et total

manche = 1
while manche <= NB_MANCHES:
    print("Manche", manche, ": attention...")
    attente = random.randint(ATTENTE_MIN, ATTENTE_MAX)

    time.sleep_ms(attente)      # TODO mission 4 : remplacer ces deux lignes
    penalite = 0                # par la surveillance de la triche

    led_go.value(1)             # GO !
    depart = time.ticks_ms()
    arrivee = attendre_appui()
    led_go.value(0)
    temps = time.ticks_diff(arrivee, depart) + penalite
    print("Temps de reaction :", temps, "ms")

    # TODO mission 3 : afficher un commentaire selon le temps

    # TODO mission 5 : mettre a jour meilleur et total

    attendre_relache()
    manche = manche + 1
    time.sleep(1)

print("=== FIN DE LA PARTIE ===")
# TODO mission 5 : afficher le meilleur temps et la moyenne
