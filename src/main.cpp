/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *      File main.cpp
 */

#include <Arduino.h>
#include <TelnetStream.h>

#include "wifi_ruts.h"
#include "mqtt.h"
#include "hw.h"

int board;

void
setup(void)
{
    Serial.begin(BAUD);

    connect_wifi();

    init_hw();
    board = get_board_num();
    printf("Board = %d\n", board);
    init_mqtt(board);
    TelnetStream.begin();
}

void loop(void) {
    int buttonPressed = verify_hw(); // Verify all input hardware

    if(buttonPressed != 7){
        printf("Button pressed = %d\n", buttonPressed);
    }

    if (buttonPressed == 1) {
        do_publish("button1", "AustralFI/inel21/1/button1"); // Publish to topic for button 1
    } else if (buttonPressed == 2) {
        do_publish("button2", "AustralFI/inel21/1/button2"); 
    } else if (buttonPressed == 3) {
        do_publish("button3", "AustralFI/inel21/1/button3"); 
    } else if (buttonPressed == 4) {
        do_publish("button4", "AustralFI/inel21/1/button4"); 
    } else if (buttonPressed == 5) {
        do_publish("button5", "AustralFI/inel21/1/button5"); 
    } else if (buttonPressed == 6) {
        do_publish("button6", "AustralFI/inel21/1/button6"); 
    }
    
    test_mqtt(); // Test news from the broker
}
