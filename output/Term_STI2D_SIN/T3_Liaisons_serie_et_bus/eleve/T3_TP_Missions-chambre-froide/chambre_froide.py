# chambre_froide.py - PROGRAMME DE DEPART
# A copier dans Wokwi : onglet "main.py", tout remplacer par ce programme.
# Capteur I2C : SCL sur la broche 22, SDA sur la broche 21. Voyant d'alarme sur la broche 2.
from machine import I2C, Pin
import time

i2c = I2C(0, scl=Pin(22), sda=Pin(21), freq=100000)   # bus I2C a 100 kHz, l'ESP32 est le maitre
alarme = Pin(2, Pin.OUT)                               # voyant d'alarme

ADRESSE = 0x00         # TODO Q5 : adresse I2C du capteur, trouvee par le scan
REG_PWR_MGMT_1 = 0x6B  # registre de mise en marche (0 = capteur actif)
REG_WHO_AM_I = 0x75    # registre d'identification du capteur
REG_TEMP_H = 0x41      # temperature : octet de poids fort (le poids faible suit, en 0x42)

SEUIL_ALARME = -15.0   # declenchement de l'alarme au-dessus de -15 C
SEUIL_RETOUR = -17.0   # retour a la normale en dessous de -17 C

print("Scan du bus I2C :", i2c.scan())

if ADRESSE != 0x00:
    i2c.writeto_mem(ADRESSE, REG_PWR_MGMT_1, b'\x00')   # sort le capteur du mode veille
    # TODO Q6 : lire le registre WHO_AM_I (1 octet) et l'afficher en hexadecimal


def lire_temperature():
    # TODO Q8 : lire 2 octets a partir de REG_TEMP_H, les assembler,
    # traiter le complement a 2, puis convertir en degres Celsius
    return 0.0


en_alarme = False

while True:
    t = lire_temperature()

    # TODO Q9 : alarme avec hysteresis (SEUIL_ALARME et SEUIL_RETOUR)

    alarme.value(1 if en_alarme else 0)
    print("T =", round(t, 2), "C   alarme =", en_alarme)
    time.sleep(1)
