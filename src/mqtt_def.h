#ifndef __MQTT_DEF_H__
#define __MQTT_DEF_H__      //  Prototypes of functions whose code are here


/*
 *  mqtt_def.h
 *
 *      This is not a traditional header file
 *      As a matter of fact, it has all the configurations for MQTT in one file
 *      Please, modify it with caution
 */

/*
 *  type definifitions
 */

typedef struct
{
    const char *sub_topic;
    void (*action)( int origin, char *message );
} topic_t;

/*
 *  C1 -> List of topics and actions
 */

static const topic_t topics[] =
{
    {   "button1", rx_button1 },
    {   "button2", rx_button2 },
    {   "button3", rx_button3 },
    {   "button4", rx_button4 },
    {   "button5", rx_button5 },
    {   "button6", rx_button6 },

    {   NULL }
};

/*
 *  C2 -> Subscriptions lists
 *
 *  Only for testing and studying purposes, you can select
 *  between 3 constants defined in platformio.ini
 */

static const char *subs[] =
{
#if (SUB_LIST==0)
    "#",
#elif (SUB_LIST==1)
    "00/button1",
    "00/button2",
    "00/button3",
    "00/button4",
    "00/button5",
    "00/button6",

#elif (SUB_LIST==2)
    "+/clear",
#else
    #error "Bad SUB_LIST symbol, out of range"
#endif
    NULL
};

/*
 *  C3 -> Macros for id strings
 *      These are macros to define the following strings
 *
 *      id_string:      sub-string to log in broker (must be given the board number)
 *      topic_string:   sub-string to be used in topic publishing (must be given the board number)
 *      subs_string:    sub-string to be used in topic suubscription
 */

#define id_string(buf,brd)      sprintf(buf,"%s_%s_%02d",   MAIN_NAME,SUB_NAME,brd)
#define topic_string(buf,brd)   sprintf(buf,"%s/%s/%02d",   MAIN_NAME,SUB_NAME,brd)
#define subs_string(buf)        sprintf(buf,"%s/%s",        MAIN_NAME,SUB_NAME)

/*
 *  C4 -> broker selection
 */

#if (MQTT==0)                                       
    #define BROKER_NAME "54.162.154.117"         //  Mosquitto in local network
    #define BROKER_PORT 1883
    #define BROKER_USER ""
    #define BROKER_PASS ""
#elif (MQTT==1)
    #define BROKER_NAME "54.146.49.53"            //  Mosquitto outside local network
    #define BROKER_PORT 1883
    #define BROKER_USER ""
    #define BROKER_PASS ""
#elif (MQTT==2)
    #define BROKER_NAME "broker.mqtt-dashboard.com"    //  Remote broker by name
    #define BROKER_PORT 1883
    #define BROKER_USER ""
    #define BROKER_PASS ""
#else
    #error "Bad MQTT symbol, broker name out of range"
#endif

#endif      //  ends  __MQTT_DEF_H__

