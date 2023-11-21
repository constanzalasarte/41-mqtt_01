from guizero import App, TextBox, PushButton, Text, info
import time
import paho.mqtt.client as mqtt

broker = "3.229.132.84"

prendo = 'p'
apago = 'a'
client = mqtt.Client("P1")
client.connect(broker, 1883)

app = App(width=500, height=500, layout="grid")

stock = 10 

def btn_prender_clicked():
    lbl_name.value = "Prendido"
    client.publish("AustralFI/inel21/92/ty", "Prendiendo led")
    print("prendiendo")

def btn_apagar_clicked():
    lbl_name.value = "Apagado"
    client.publish("AustralFI/inel21/92/ty", "Apagando led")

def btn_quitar_producto():
    nonlocal stock
    if stock > 0:
        stock -= 1
        lbl_stock.value = f"Stock: {stock}"
        client.publish("AustralFI/inel21/92/ty", f"Producto quitado, stock restante: {stock}")

# GUI widgets
lbl_name = Text(app, text="Apagado", grid=[0, 0])
btn_prender = PushButton(app, command=btn_prender_clicked, text="Prender", grid=[1, 0])
btn_apagar = PushButton(app, command=btn_apagar_clicked, text="Apagar", grid=[1, 1])

btn_quitar = PushButton(app, command=btn_quitar_producto, text="Quitar Producto", grid=[2, 0])
lbl_stock = Text(app, text=f"Stock: {stock}", grid=[2, 1])

# lbl_stock = Text(app, text=f"Stock: {stock}", grid=[0, 0, 2, 1])
# btn_quitar = PushButton(app, command=btn_quitar_producto, text="Quitar Producto", grid=[0, 1, 2, 1])

app.display()