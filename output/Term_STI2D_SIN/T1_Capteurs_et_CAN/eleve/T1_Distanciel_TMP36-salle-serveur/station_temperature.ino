// station_temperature.ino - PROGRAMME DE DEPART
// A copier dans Tinkercad : bouton "Code", mode "Texte", tout remplacer par ce programme.
const int PIN_CAPTEUR = A0;
const int PIN_ALARME = 13;          // LED "L" integree a la carte
const float PLEINE_ECHELLE = 5.0;   // pleine echelle du CAN (V)
const int NB_CODES = 1024;          // CAN 10 bits
const float SEUIL = 27.0;           // seuil d'alerte (degC)

void setup() {
  Serial.begin(9600);
  pinMode(PIN_ALARME, OUTPUT);
}

void loop() {
  int n = analogRead(PIN_CAPTEUR);  // code numerique de 0 a 1023

  // TODO Q5 : calculer la tension v (en V) a partir de n
  float v = 0;

  // TODO Q5 : calculer la temperature t (en degC) a partir de v
  float t = 0;

  Serial.print("N = ");
  Serial.print(n);
  Serial.print("   V = ");
  Serial.print(v, 3);
  Serial.print(" V   T = ");
  Serial.print(t, 1);
  Serial.println(" degC");

  // TODO Q7 : allumer la LED d'alarme si t depasse SEUIL, l'eteindre sinon

  delay(1000);
}
