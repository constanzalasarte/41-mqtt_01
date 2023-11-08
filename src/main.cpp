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

    if(buttonPressed != 0){
        printf("Button pressed = %d\n", buttonPressed);
    }

    if (buttonPressed == 1) {
        do_publish("button1", "Presionando button 1"); // Publish to topic for button 1

    } else if (buttonPressed == 2) {
        do_publish("button2", "Presionando button 2"); 
    } else if (buttonPressed == 3) {
        do_publish("button3", "Presionando button 3"); 
    } else if (buttonPressed == 4) {
        do_publish("button4", "Presionando button 4"); 
    } else if (buttonPressed == 5) {
        do_publish("button5", "Presionando button 5"); 
    } else if (buttonPressed == 6) {
        do_publish("button6", "Presionando button 6");  
    }
    
    delay(500);
    test_mqtt(); // Test news from the broker
}
