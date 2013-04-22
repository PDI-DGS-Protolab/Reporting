#! /usr/bin/python
# -*- coding: utf-8 -*-


import csv

from jasperserver.rest import Client
from jasperserver.admin import User, Role
from jasperserver.synchronization import SyncResources
from jasperserver.services import Report, Resource, Resources
from jasperserver.exceptions import *

if __name__ == '__main__':
    """
    resource = "path/to/resource/"
    put_request(resource)
    """

    try:
        client = Client('http://ec2-54-228-152-90.eu-west-1.compute.amazonaws.com:8080/jasperserver-pro', 'jasperadmin', 'jasperadmin')

    except JsException:
        print 'Error Authentification FAIL!'

    users = User(client).search()
    role = Role(client).search()

    report = Report(client, '/reports')
    csv_rep = report.run('ProbandoReport', output_format='csv')

    f = open('temp.csv', "w")
    f.write(csv_rep)
    f.close

    f = open('temp.csv', "rU")
    reader = csv.reader(f, skipinitialspace=True)
    for r in reader:
        print r

    f.close()
