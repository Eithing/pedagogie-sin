# lampadaire_pieton.py - PROGRAMME DE DEPART DU TP NOTE
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# Capteur de lumiere sur la broche 34, detecteur PIR sur la broche 27, lampe (LED) sur la broche 2.
# Deja fait : conversion code -> tension, jour / nuit avec hysteresis (etats JOUR et VEILLE).
from machine import ADC, Pin, PWM
import time

capteur = ADC(Pin(34))          # capteur de lumiere (sortie AO)
capteur.atten(ADC.ATTN_11DB)    # plage d'entree du CAN : 0 a 3,3 V
pir = Pin(27, Pin.IN)           # detecteur de presence : 0 ou 1
lampe = PWM(Pin(2), freq=1000)  # lampe commandee en PWM

PLEINE_ECHELLE = 3.3   # pleine echelle du CAN (V)
NB_CODES = 4096        # CAN 12 bits

N_NUIT = 3549          # 7 lux : passage en nuit (hysteresis)
N_JOUR = 3239          # 15 lux : retour au jour (hysteresis)

VEILLE_POURCENT = 30       # TODO Q1 : ton niveau de veille, 10 + J (en %)
DUREE_PRESENCE = 10000     # TODO Q1 : ta duree d'essai a 100 % (en ms)


def regler_lampe(pourcent):
    # pourcent : 0 a 100 -> rapport cyclique de la PWM (0 a 65535)
    lampe.duty_u16(int(pourcent * 65535 / 100))


etat = "JOUR"
debut_presence = 0
regler_lampe(0)

while True:
    n = capteur.read()                       # code numerique de 0 a 4095
    v = n * PLEINE_ECHELLE / NB_CODES        # tension en V
    presence = pir.value()                   # 1 si un pieton est detecte
    maintenant = time.ticks_ms()             # instant actuel en ms

    # Transitions du diagramme d'etats
    if etat == "JOUR":
        if n > N_NUIT:
            etat = "VEILLE"
    elif etat == "VEILLE":
        if n < N_JOUR:
            etat = "JOUR"
        # TODO Q4 : passer en "PRESENCE" quand un pieton est detecte
    # TODO Q4 : traiter l'etat "PRESENCE" (elif)

    # Sortie associee a chaque etat
    if etat == "JOUR":
        regler_lampe(0)
    elif etat == "VEILLE":
        regler_lampe(VEILLE_POURCENT)
    # TODO Q4 : lampe a 100 % dans l'etat "PRESENCE"

    print("N =", n, "  V =", round(v, 3), "V   presence =", presence, "  etat =", etat)
    time.sleep(0.2)
