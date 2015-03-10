#!/usr/bin/python2
import sys
from math import pow, sqrt

def obtener_recta(p1,p2):
    dy = p2['longitude'] - p1['longitude']
    dx = p2['latitude'] - p1['latitude']
    return lambda x: ((x-p1['latitude'])*dy/dx)+p1['longitude']


    #dy * (-p1['latitude']) + ( dx * -p1['longitude'])

def imprimir_posicion(latitud,longitud):
    print '<Placemark>'
    print '<name></name>'
    print '<description></description>'
    print '<Point><coordinates>'+ repr(longitud) + ',' + repr(latitud)+','+' 0.000000</coordinates></Point>'
    print '</Placemark>'

def calcular_distancia(punto_uno, punto_dos):
    """131.3231006630041 ~= 100mts utilizo 100 para simplificar"""
    cinco_metros = 1.3132310066300412 * 5
    dlong = sqrt(pow(punto_uno["longitude"], 2) + pow(punto_dos["longitude"], 2))
    dlat = sqrt(pow(punto_uno["latitude"], 2) + pow(punto_dos["latitude"], 2))
    distancia = dlong+dlat
    pasos = int(round(distancia/cinco_metros))
    distancia = punto_dos["latitude"] - punto_uno["latitude"]
    return (distancia/pasos, pasos)
    
if __name__ ==  '__main__':
    puntos = []
    if len(sys.argv) > 1:
        for index in xrange(1,len(sys.argv)):
            argumentos = sys.argv[index].split()
            for each in argumentos:
                posicion = each.split(",")
                puntos.append({'latitude' : float(posicion[0]), 'longitude' : float(posicion[1])})
    else:
        print "Debe insertar los valores con el siguiente formato:"
        print "     -34.91714,-57.95348 -34.91244,-57.94833"
        sys.exit(1)

#   p1 = {'latitude' : -34.91714, 'longitude' : -57.95348}
#   p2 = {'latitude' : -34.91244, 'longitude' : -57.94833}
#   p3 = {'latitude' : -34.91350, 'longitude' : -57.94692}
#   p4 = {'latitude' : -34.91326, 'longitude' : -57.94664}    
#   
#   puntos.append(p1)
#   puntos.append(p2)
#   puntos.append(p3)
#   puntos.append(p4)

    print '<?xml version="1.0" encoding="UTF-8"?>'
    print '<kml xmlns="http://earth.google.com/kml/2.x">'
 
    for index in xrange(0,len(puntos)-1):
        recta = obtener_recta(puntos[index],puntos[index+1])
        distancia = calcular_distancia(puntos[index],puntos[index+1])
        for each in xrange(0,distancia[1]):
            imprimir_posicion((distancia[0]*each)+puntos[index]['latitude'],recta((distancia[0]*each)+puntos[index]['latitude']))
            
    print '</kml>'