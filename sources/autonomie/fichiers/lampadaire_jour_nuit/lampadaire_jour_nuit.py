# lampadaire_jour_nuit.py - PROGRAMME DE DEPART
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# Capteur de lumiere sur la broche 34, detecteur de presence (PIR) sur la broche 27, lampe sur la broche 2.
from machine import ADC, Pin, PWM
import time

capteur = ADC(Pin(34))          # capteur de lumiere
capteur.atten(ADC.ATTN_11DB)    # plage d'entree du CAN : 0 a 3,3 V
pir = Pin(27, Pin.IN)           # detecteur de presence : 0 ou 1
lampe = PWM(Pin(2), freq=1000)  # lampe commandee en PWM

N_SEUIL = 0   # TODO etape 4 : seuil jour / nuit (le code de la tombee de la nuit)


def regler_lampe(pourcent):
    # pourcent : 0 a 100 -> la lampe eclaire de 0 a 100 %
    lampe.duty_u16(int(pourcent * 65535 / 100))


while True:
    n = capteur.read()          # code du CAN : grand quand il fait sombre
    presence = pir.value()      # 1 si quelqu'un passe, 0 sinon

    # TODO etape 4 : la nuit, lampe a 30 % ; le jour, lampe eteinte
    regler_lampe(0)

    print("N =", n, "  presence =", presence)
    time.sleep(0.5)
