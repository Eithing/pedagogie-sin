// voyant_co2.ino - PROGRAMME DE DEPART
// A copier dans Wokwi : onglet "sketch.ino", tout remplacer par ce programme.
// Le potentiometre remplace le capteur de CO2 : il fournit une tension de 0 a 5 V sur A0.
const int PIN_CAPTEUR = A0;
const int PIN_VOYANT = 13;          // LED "L" integree a la carte
const float PLEINE_ECHELLE = 5.0;   // pleine echelle du CAN (V)
const int NB_CODES = 1024;          // CAN 10 bits
const float SENSIBILITE = 0.002;    // capteur : 2 mV par ppm, soit 0,002 V/ppm
const float SEUIL = 1500.0;         // seuil d'alerte (ppm)

void setup() {
  Serial.begin(9600);
  pinMode(PIN_VOYANT, OUTPUT);
}

void loop() {
  int n = analogRead(PIN_CAPTEUR);  // code numerique de 0 a 1023

  // TODO Q4 : calculer la tension v (en V) a partir du code n
  float v = 0;

  // TODO Q4 : calculer la concentration c (en ppm) a partir de v
  float c = 0;

  Serial.print("N = ");
  Serial.print(n);
  Serial.print("   V = ");
  Serial.print(v, 3);
  Serial.print(" V   C = ");
  Serial.print(c, 0);
  Serial.println(" ppm");

  // TODO Q5 : allumer le voyant si c depasse SEUIL, l'eteindre sinon

  delay(500);
}
