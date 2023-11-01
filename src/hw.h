/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *  hw.h
 *      Hardware dependent code
 */

enum
{
    NOHW, BUTTON1, BUTTON2, BUTTON3, BUTTON4, BUTTON5, BUTTON6, NO_BUTTON,
    NUM_NEWS
};

void init_hw(void);         //  Called at power up
int get_board_num(void);    //  return board number
int verify_hw(void);        //  Verifies all input hardware
int verify_uniquePush(int reading);

