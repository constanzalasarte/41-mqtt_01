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
static int lastButtonState = HIGH;          // previous reading from the input pin (pushbutton)

static unsigned long lastDebounceTime = 0; // the last time the output pin was toggled
static unsigned long debounceDelay = 50;   // the debounce time; increase if the output flickers

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
    int reading, result;

    result = NO_BUTTON;

    // Check the state of the first button
    reading = digitalRead(PUSH1);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } else if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) {
                return BUTTON1; // Button 1 is pressed
            }
        }
    }

    reading = digitalRead(PUSH2);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } else if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) {
                return BUTTON2; // Button 2 is pressed
            }
        }
    }

    reading = digitalRead(PUSH3);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } else if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) {
                return BUTTON3; 
            }
        }
    }

    reading = digitalRead(PUSH4);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } else if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) {
                return BUTTON4; 
            }
        }
    }

    reading = digitalRead(PUSH5);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } else if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) {
                return BUTTON5; 
            }
        }
    }

    reading = digitalRead(PUSH6);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    } else if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) {
                return BUTTON6; 
            }
        }
    }
    return NO_BUTTON;
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

    pinMode(PUSH1, INPUT);
    pinMode(PUSH2, INPUT);
    pinMode(PUSH3, INPUT);
    pinMode(PUSH4, INPUT);
    pinMode(PUSH5, INPUT);
    pinMode(PUSH6, INPUT);

    pinMode(IB0,INPUT);
    pinMode(IB1,INPUT);
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

