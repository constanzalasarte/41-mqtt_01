# Importar los GUI widgets que se van a usar
from guizero import App, TextBox, PushButton, Text, info
import time
import paho.mqtt.client as mqtt #import the client library


broker="3.229.132.84"

prendo = 'p'
apago = 'a'
client = mqtt.Client("P1") #create new instance
client.connect(broker, 1883) #connect to broker

app = App(width=500, height=500, layout="grid")

# Definiciones de funcion para los eventos
def btn_prender_clicked():
    lbl_name.value = "Prendido"
    client.publish("AustralFI/inel21/92/ty","Prendiendo led")
    print("prendiendo")
    

def btn_apagar_clicked():
    lbl_name.value = "Apagado"
    client.publish("AustralFI/inel21/92/ty","Apagando led")
    
# GUI widgets

lbl_name = Text(app, text="Apagado", grid=[0,0])
btn_prender = PushButton(app, command=btn_prender_clicked, text="Prender", grid=[1,0])
btn_apagar = PushButton(app, command=btn_apagar_clicked, text="Apagar", grid=[1,1])

# Mostrar GUI en la pantalla

app.display()
