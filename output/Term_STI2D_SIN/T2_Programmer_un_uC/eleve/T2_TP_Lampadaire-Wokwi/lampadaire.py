# lampadaire.py - PROGRAMME DE DEPART
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# Capteur de lumiere sur la broche 34, detecteur PIR sur la broche 27, lampe (LED) sur la broche 2.
from machine import ADC, Pin, PWM
import time

capteur = ADC(Pin(34))          # capteur de lumiere (sortie AO)
capteur.atten(ADC.ATTN_11DB)    # plage d'entree du CAN : 0 a 3,3 V
pir = Pin(27, Pin.IN)           # detecteur de presence : 0 ou 1
lampe = PWM(Pin(2), freq=1000)  # lampe commandee en PWM

PLEINE_ECHELLE = 3.3   # pleine echelle du CAN (V)
NB_CODES = 4096        # CAN 12 bits

N_SEUIL = 0            # TODO Q4 : seuil jour / nuit (code)

DUREE_PRESENCE = 10000 # duree a 100 % apres une presence (ms) : 60 s en vrai, 10 s pour les essais


def regler_lampe(pourcent):
    # pourcent : 0 a 100 -> rapport cyclique de la PWM (0 a 65535)
    lampe.duty_u16(int(pourcent * 65535 / 100))


regler_lampe(0)

while True:
    n = capteur.read()          # code numerique de 0 a 4095

    # TODO Q3 : calculer la tension v (en V) a partir du code n
    v = 0

    presence = pir.value()

    print("N =", n, "  V =", round(v, 3), "V   presence =", presence)

    # TODO Q5 puis Q9 : choisir l'etat du lampadaire et regler la lampe

    time.sleep(0.2)
