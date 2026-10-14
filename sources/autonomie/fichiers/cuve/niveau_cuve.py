# niveau_cuve.py - PROGRAMME DE DEPART
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# Le potentiometre remplace le capteur de niveau : il fournit une tension de 0 a 3,3 V.
from machine import ADC, Pin
import time, random

capteur = ADC(Pin(34))         # capteur de niveau (simule) sur la broche 34
capteur.atten(ADC.ATTN_11DB)   # plage d'entree du CAN : 0 a 3,3 V
pompe = Pin(2, Pin.OUT)        # LED bleue "Pompe" sur la broche 2

PLEINE_ECHELLE = 3.3   # pleine echelle du CAN (V)
NB_CODES = 4096        # CAN 12 bits
SENSIBILITE = 0.03     # capteur : 30 mV par cm, soit 0,03 V/cm
SEUIL = 80             # la pompe se met en marche au-dessus de 80 cm
K = 1                  # nombre de mesures moyennees (questions 6 et 7 : essayer 1, 5 et 20)

fenetre = []           # les K dernieres hauteurs mesurees
serie_brute = []       # pour mesurer la dispersion sur 20 mesures
serie_filtree = []
demarrages = 0         # nombre de mises en marche de la pompe
etat_precedent = 0


def clapotis():
    # simule les vagues a la surface de l'eau : de -250 a +250 codes au hasard
    return random.randint(-250, 250)


while True:
    n = capteur.read() + clapotis()
    n = min(NB_CODES - 1, max(0, n))

    # TODO Q4 : convertir le code n en hauteur d'eau h (en cm)
    h = 0

    # Moyenne glissante : on garde les K dernieres hauteurs
    fenetre.append(h)
    if len(fenetre) > K:
        fenetre.pop(0)
    # TODO Q5 : remplacer h par la moyenne des valeurs de la liste fenetre
    h_filtree = h

    print("brut :", round(h, 1), "cm   filtre :", round(h_filtree, 1), "cm")

    # TODO Q8 : mettre la pompe en marche si h_filtree depasse SEUIL, l'arreter sinon

    # Comptage des mises en marche de la pompe
    etat = pompe.value()
    if etat == 1 and etat_precedent == 0:
        demarrages = demarrages + 1
    etat_precedent = etat

    # Bilan toutes les 20 mesures (2 secondes)
    serie_brute.append(h)
    serie_filtree.append(h_filtree)
    if len(serie_brute) == 20:
        print("=== 20 mesures | ecart brut", round(max(serie_brute) - min(serie_brute), 1),
              "cm | ecart filtre", round(max(serie_filtree) - min(serie_filtree), 1),
              "cm | demarrages", demarrages)
        serie_brute = []
        serie_filtree = []
        demarrages = 0

    time.sleep(0.1)
