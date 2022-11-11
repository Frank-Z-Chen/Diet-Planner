from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse
from planner.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FoodSerializer

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

@api_view()
def show_foods(request):
    qs = Food.objects.raw("SELECT * FROM Food")
    qs_json = FoodSerializer(qs, many = True).data
    return Response(qs_json)


@api_view()
def show_food_detail(request, id):
    qs = Food.objects.raw("SELECT * FROM Food WHERE foodId = %s", [id])
    qs_json = FoodSerializer(qs, many = True).data
    return Response(qs_json)


# @api_view()
# def show_food_detail(request, id):
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM Food WHERE foodId = %s", [id])
#     r = dictfetchall(cursor)
    
#     return Response(r)
