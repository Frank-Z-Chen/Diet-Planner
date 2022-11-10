from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse
from planner.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

@api_view()
def show_foods(request):
    # cursor = connection.cursor()
    # cursor.execute("SELECT count(*) FROM Food")
    # r = cursor.fetchone()

    #Food.objects.raw('SELECT foodName, fat, protein, carb FROM Food')
    
    return Response('OK')


@api_view()
def show_food_detail(request, id):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Food WHERE foodId = %s", [id])
    r = dictfetchall(cursor)
    return Response(r)
