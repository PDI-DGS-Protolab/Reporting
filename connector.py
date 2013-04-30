#! /usr/bin/python
# -*- coding: utf-8 -*-

import csv
import json

from jasperserver.rest import Client
from jasperserver.admin import User, Role
from jasperserver.synchronization import SyncResources
from jasperserver.services import Report, Resource, Resources
from jasperserver.exceptions import *


URL = 'http://ec2-54-228-152-90.eu-west-1.compute.amazonaws.com:8080/jasperserver-pro'
USER = 'jasperadmin'
PASSWORD = 'jasperadmin'
DEFAULT_COLOURS = [ "FFFF10AA", "FFAA0AAA", "FF5505AA", "FF0000AA" ]

def connect():
    try:
        client = Client( URL, USER, PASSWORD )

    except JsException:
        print 'Error Authentification FAIL!'

    return client

def downloadReport( location, name, format ):
    report = Report(client, location )
    res = report.run( name, output_format = format )
    return res


def parseCSV( csv ):
    data = []
    lines = csv.split( "\n" )
    keys = lines [ 0 ].split( ',' )

    for l in lines:
        values = l.split( ',' )
        d = {}
        for k,v in zip( keys, values ):
            d[k] = v
        data.append( d )

    # The next two lines are dependant on the report we are using
    del data[0] # This line takes out the keys line from the data set
    del data[len(data) -1] # This line takes out a blank data line at the end
    return data

def filterbyKey( key, data ):
    res = []
    for d in data:
        if key in d:
            res.append( d[ key ] )
    return res

def createPieChart( labelKey, valueKey, data, colours = DEFAULT_COLOURS ):
    labels = filterbyKey( labelKey, data )
    values = filterbyKey( valueKey, data )

    data = []
    for i in range( 0, len( labels ) ):
        d = {}
        d['value']  = values[ i ]
        d['label']  = labels[ i ]
        d['colour'] = colours[ i % ( len( colours ) ) ]
        data.append( d )

    item = { 'item' : data }
    return item

if __name__ == '__main__':
    client = connect()
    # users = User(client).search()
    # role = Role(client).search()
    csv_rep = downloadReport( '/reports', 'Bundles', 'csv' )
    print csv_rep
    data = parseCSV( csv_rep )
    res = createPieChart( '_id', 'expirat', data )
    json = json.dumps(res)
    print json
