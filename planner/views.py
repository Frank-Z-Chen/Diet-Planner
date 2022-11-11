from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from planner.models import *
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
    try:
        sql = "SELECT * FROM Food"
        qs = Food.objects.raw(sql)
        qs_json = FoodSerializer(qs, many = True).data
        if not qs_json:
            raise Food.DoesNotExist
        return Response(qs_json)
    except Food.DoesNotExist:
        return Response(status=404)


@api_view()
def show_food_detail(request, id):
    try:
        sql = "SELECT * FROM Food WHERE foodId = %s"
        qs = Food.objects.raw(sql, [id])
        qs_json = FoodSerializer(qs, many = True).data
        if not qs_json:
            raise Food.DoesNotExist
        return Response(qs_json)
    except Food.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # try:
    #     food = Food.objects.get(pk=id)
    #     serializer = FoodSerializer(food)
    #     return Response(serializer.data)
    # except Food.DoesNotExist:
    #     return Response(status=404)

    


# @api_view()
# def show_food_detail(request, id):
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM Food WHERE foodId = %s", [id])
#     r = dictfetchall(cursor)
    
#     return Response(r)
