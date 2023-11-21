/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *  hw.cpp
 *      Hardware dependent code
 */

#include <Arduino.h>

#include "hw.h"

/*
 *  Private variables
 */

static int buttonState = HIGH;                     // current reading from the input pin (pushbutton)
static int lastButtonState = 0;          // previous reading from the input pin (pushbutton)

static unsigned long lastDebounceTime = 0; // the last time the output pin was toggled
static unsigned long debounceDelay = 50;   // the debounce time; increase if the output flickers

static int pushGPIO[]=
{
    PUSH1 ,PUSH2, PUSH3 ,PUSH4 ,PUSH5 ,PUSH6
};
#define NUMPUSH (sizeof( pushGPIO)/sizeof(*pushGPIO))

/*
 *  Private functions
 */

/*
 *  verify_push:
 *      verifies if tact pushbotton has closed
 *      returns news BUTTON on closure
 */

static int
verify_push(void)
{
    int reading; 
    for (int i = 0; i<NUMPUSH; ++i){
        reading = digitalRead(pushGPIO[i]); 
        if(verify_uniquePush(digitalRead(pushGPIO[i])) != 0){
            // lastButtonState = digitalRead(pushGPIO[i]);
            return i+1;
        }  
    }
    return 0;
}

int
verify_uniquePush(int reading){

    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } 
    // else if ((millis() - lastDebounceTime) > debounceDelay) {
    //     if (reading != buttonState) {
    //         buttonState = reading;
    //         if (buttonState == LOW) {
    //             result = 1; // Button 1 is pressed
    //         }
    //     }
    // }
    else{
        return 1;
    }
    return 0;
}

/*
 *  Public functions
 */

/*
 *  get_board_num
 *      Return board number read from IB1,IB0
 */


int
get_board_num(void)
{
    return digitalRead(IB0) | (digitalRead(IB1) << 1); 
}

/*
 *  init_hw
 *      Called at power up
 */

void
init_hw(void)
{
    // for (int i = 0; i<NUMPUSH; ++i)
        // pinMode(pushGPIO[i],INPUT_PULLUP);
    #if 1    
    pinMode(PUSH1, INPUT_PULLUP);
    pinMode(PUSH2, INPUT_PULLUP);
    pinMode(PUSH3, INPUT_PULLUP);
    pinMode(PUSH4, INPUT_PULLUP);
    pinMode(PUSH5, INPUT_PULLUP);
    pinMode(PUSH6, INPUT_PULLUP);
    #endif

    pinMode(IB0,INPUT);
    pinMode(IB1,INPUT);

    #if 0
        for (;;){
            for (int i = 0; i<NUMPUSH; ++i)
                Serial.printf("[%d]: %d",i, digitalRead(pushGPIO[i]));
            Serial.printf("\n");    
            delay(500);
        
        }
    #endif
}

/*
 *  verify_hw
 *      Verifies all input hardware
 */

int
verify_hw(void)
{
    return verify_push();
}