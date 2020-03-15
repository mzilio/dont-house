#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include "config.h"

#define DHTTYPE DHT22
#define DHTPIN 2

DHT dht(DHTPIN, DHTTYPE, 11);
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const int capacity = JSON_OBJECT_SIZE(3);
StaticJsonDocument<capacity> doc;
String body = "";

void setup() {
  // Setup communication with DHT module
  dht.begin();
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    readSensor();
    sendData();
  }
  delay(300000);
}

void readSensor() {
  // Make sure body used to send data is empty
  body = "";
  // Insert data in JSON object
  doc["sensor_id"] = "dont-1";
  doc["temperature"] = dht.readTemperature();
  doc["humidity"] = dht.readHumidity();
  // Prepare body with new data
  serializeJson(doc, body);
}

void sendData() {
  // Make object for HTTP call
  HTTPClient http;
  http.begin("http://dont-house.herokuapp.com/api/external_temp");
  http.addHeader("Content-Type", "application/json");
  // Send data
  http.POST(body);
  // Close connection
  http.end();
}
