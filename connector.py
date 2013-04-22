#! /usr/bin/python
# -*- coding: utf-8 -*-

import csv

from jasperserver.rest import Client
from jasperserver.admin import User, Role
from jasperserver.synchronization import SyncResources
from jasperserver.services import Report, Resource, Resources
from jasperserver.exceptions import *

def parseCSV( csv ):
    data = []
    lines = csv.split( "\n" )
    keys = lines [ 0 ].split(',')
    for l in lines:
        values = l.split(',')
        d = {}
        for k,v in zip(keys, values):
            d[k] = v
        data.append(d)
    del data[0]
    del data[len(data) -1]
    return data

def filterbyKey( key, data ):
    res = []
    for d in data:
        if key in d:
            res.append(d[key])
    return res

if __name__ == '__main__':
    try:
        client = Client('http://ec2-54-228-152-90.eu-west-1.compute.amazonaws.com:8080/jasperserver-pro', 'jasperadmin', 'jasperadmin')

    except JsException:
        print 'Error Authentification FAIL!'

    users = User(client).search()
    role = Role(client).search()

    report = Report(client, '/reports')
    csv_rep = report.run('Bundles', output_format='csv')
    
    data = parseCSV(csv_rep)
    res = filterbyKey('_id', data)
    print res