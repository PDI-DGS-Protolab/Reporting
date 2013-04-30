#! /usr/bin/python
# -*- coding: utf-8 -*-

import csv
import json

URL = 'https://push.geckoboard.com/v1/send/31466-6671c6a0-8d51-0130-f0aa-22000a9e0b33'
API_KEY = '31466-6671c6a0-8d51-0130-f0aa-22000a9e0b33'

DEFAULT_COLOURS = [ "FFFF10AA", "FFAA0AAA", "FF5505AA", "FF0000AA" ]
csv_rep = '''_id,categor,currenc,data,expirat,plan,price,time,ts,type
-1,DEFAULT,EUR,0,0,Telefonica Default,1,0,null,TIME
1,PURCHASE,EUR,100,63072000,Bono_1h_100Mb_,99,3600,26/12/12 15:14,TIME
2,GIFT,EUR,100,63072000,Bono_1h_100Mb_,0,3600,26/12/12 15:14,TIME
3,PREPAID,EUR,100,63072000,Bono_1h_100Mb_,0,3600,26/12/12 15:14,TIME
4,PURCHASE,EUR,125,63072000,Bono_4h_125Mb_,179,14400,26/12/12 15:15,TIME
5,GIFT,EUR,125,63072000,Bono_4h_125Mb_,0,14400,26/12/12 15:15,TIME
6,PREPAID,EUR,125,63072000,Bono_4h_125Mb_,0,14400,26/12/12 15:15,TIME
7,PURCHASE,EUR,175,63072000,Bono_8h_175Mb_,299,28800,26/12/12 15:16,TIME
8,GIFT,EUR,175,63072000,Bono_8h_175Mb_,0,28800,26/12/12 15:16,TIME
9,PREPAID,EUR,175,63072000,Bono_8h_175Mb_,0,28800,26/12/12 15:16,TIME
10,PURCHASE,EUR,250,63072000,Bono_24h_250Mb_,399,86400,27/12/12 9:02,TIME
11,GIFT,EUR,250,63072000,Bono_24h_250Mb_,0,86400,27/12/12 9:02,TIME
12,PREPAID,EUR,250,63072000,Bono_24h_250Mb_,0,86400,27/12/12 9:02,TIME
13,PURCHASE,EUR,500,63072000,Bono_7dias_500Mb_,999,604800,27/12/12 9:03,TIME
14,GIFT,EUR,500,63072000,Bono_7dias_500Mb_,0,604800,27/12/12 9:03,TIME
15,PREPAID,EUR,500,63072000,Bono_7dias_500Mb_,0,604800,27/12/12 9:03,TIME'''


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

def pushToGecko():


if __name__ == '__main__':
    data = parseCSV( csv_rep )
    res = createPieChart( '_id', 'expirat', data )
    json = json.dumps(res)
    print json
