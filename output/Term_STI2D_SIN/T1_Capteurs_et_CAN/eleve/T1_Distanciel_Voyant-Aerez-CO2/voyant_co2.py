# voyant_co2.py - PROGRAMME DE DEPART
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# Le potentiometre remplace le capteur de CO2 : il fournit une tension de 0 a 3,3 V.
from machine import ADC, Pin
import time

capteur = ADC(Pin(34))         # potentiometre (capteur simule) sur la broche 34
capteur.atten(ADC.ATTN_11DB)   # plage d'entree du CAN : 0 a 3,3 V
voyant = Pin(2, Pin.OUT)       # LED "Aerez !" sur la broche 2

PLEINE_ECHELLE = 3.3   # pleine echelle du CAN (V)
NB_CODES = 4096        # CAN 12 bits
SENSIBILITE = 0.0015   # capteur : 1,5 mV par ppm, soit 0,0015 V/ppm
SEUIL = 1500           # seuil d'alerte (ppm)

while True:
    n = capteur.read()         # code numerique de 0 a 4095

    # TODO Q4 : calculer la tension v (en V) a partir du code n
    v = 0

    # TODO Q4 : calculer la concentration c (en ppm) a partir de v
    c = 0

    print("N =", n, "  V =", round(v, 3), "V   C =", round(c), "ppm")

    # TODO Q5 : allumer le voyant si c depasse SEUIL, l'eteindre sinon

    time.sleep(0.5)
