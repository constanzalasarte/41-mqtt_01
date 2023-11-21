/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *  mqtt_actions.cpp
 *      Actions called as suscribed topics are received
 *      Low level actions called from here are in 'hw_actions.cpp'
 */

#include <Arduino.h>
#include <TelnetStream.h>

#include "mqtt_actions.h"       //  Prototypes of functions whose code are here

extern int board;

void
rx_button1( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.printf("%s: msg: %s\n", __FUNCTION__, msg );
}

void
rx_button2( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.printf("%s: msg: %s\n", __FUNCTION__, msg );
}

void
rx_button3( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.printf("%s: msg: %s\n", __FUNCTION__, msg );
}

void
rx_button4( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.printf("%s: msg: %s\n", __FUNCTION__, msg );
}

void
rx_button5( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.printf("%s: msg: %s\n", __FUNCTION__, msg );
}

void
rx_button6( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.printf("%s: msg: %s\n", __FUNCTION__, msg );
}