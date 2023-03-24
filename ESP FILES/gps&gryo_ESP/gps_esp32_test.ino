#include <TinyGPS++.h>
#include <TinyGPSPlus.h>


#include <MPU6050_tockn.h>
#include <Wire.h>


// The TinyGPSPlus object
TinyGPSPlus gps;

#define SDA 21
#define SCL 22

MPU6050 mpu6050(Wire);//Attach the IIC
int16_t ax,ay,az;//define acceleration values of 3 axes
int16_t gx,gy,gz;//define variables to save the values in 3 axes of gyroscope

long timer = 0;
void setup() {

  Serial.begin(9600);
  Serial2.begin(9600);
  
  Wire.begin(SDA, SCL);          //attach the IIC pin
  mpu6050.begin();               //initialize the MPU6050
  mpu6050.calcGyroOffsets(true); //get the offsets value
  
  
}

void loop() {

  //updateSerial();

  if (Serial2.available() > 0)

    if (gps.encode(Serial2.read()))

      displayInfo();

  if (millis() > 50000 && gps.charsProcessed() < 10)

  {

    Serial.println(F("No GPS detected: check wiring."));

    while (true);

  }
  
  if(millis() - timer > 1000){   //each second printf the data
    mpu6050.update();            //update the MPU6050
    getMotion6();                //gain the values of Acceleration and Gyroscope value
    Serial.print("\na/g:\t");
    Serial.print(ax); Serial.print("\t");
    Serial.print(ay); Serial.print("\t");
    Serial.print(az); Serial.print("\t");
    Serial.print(gx); Serial.print("\t\t");
    Serial.print(gy); Serial.print("\t\t");
    Serial.println(gz);
    Serial.print("a/g:\t");
    Serial.print((float)ax / 16384); Serial.print("g\t");
    Serial.print((float)ay / 16384); Serial.print("g\t");
    Serial.print((float)az / 16384); Serial.print("g\t");
    Serial.print((float)gx / 131); Serial.print("d/s \t");
    Serial.print((float)gy / 131); Serial.print("d/s \t");
    Serial.print((float)gz / 131); Serial.print("d/s \n");
    timer = millis();
  }
}

void displayInfo()

{

  Serial.print(F("Location: "));

  if (gps.location.isValid()){

    Serial.print("Lat: ");

    Serial.print(gps.location.lat(), 6);

    Serial.print(F(","));

    Serial.print("Lng: ");

    Serial.print(gps.location.lng(), 6);

    Serial.println();

  }  

  else

  {

    Serial.print(F("INVALID"));

  }

}

void updateSerial()

{

  

  while (Serial.available())

  {

    Serial2.write(Serial.read());//Forward what Serial received to Software Serial Port

  }

  while (Serial2.available())

  {

    Serial.write(Serial2.read());//Forward what Software Serial received to Serial Port

  }

}

void getMotion6(void){
  ax=mpu6050.getRawAccX();//gain the values of X axis acceleration raw data
  ay=mpu6050.getRawAccY();//gain the values of Y axis acceleration raw data
  az=mpu6050.getRawAccZ();//gain the values of Z axis acceleration raw data
  gx=mpu6050.getRawGyroX();//gain the values of X axis Gyroscope raw data
  gy=mpu6050.getRawGyroY();//gain the values of Y axis Gyroscope raw data
  gz=mpu6050.getRawGyroZ();//gain the values of Z axis Gyroscope raw data
}
