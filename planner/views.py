from django.db import connection
from django.shortcuts import get_object_or_404
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

@api_view(['GET','POST'])
def show_foods(request):
    try:
        if request.method == 'GET':
            qs = Food.objects.raw("SELECT * FROM Food")
            serializer = FoodSerializer(qs, many = True)
            if not serializer.data:
                raise Food.DoesNotExist
            return Response(serializer.data)
        elif request.method == 'POST':
            serializer = FoodSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data=serializer.validated_data
            cursor = connection.cursor()
            cursor.execute("INSERT INTO Food VALUES(%s, %s, %s, %s, %s)", [data['foodid'], data['foodname'], data['fat'], data['protein'], data['carb']]) 
            #these 3 lines can be directly replaced by serializer.save()　
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Food.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET','PATCH', 'DELETE'])
def food_detail(request, id):
    cursor = connection.cursor()
    try:
        qs = Food.objects.raw("SELECT * FROM Food WHERE foodId = %s", [id])
        if request.method == 'GET':
            qs_json = FoodSerializer(qs, many = True).data
            if not qs_json:
                raise Food.DoesNotExist
            return Response(qs_json)
        elif request.method == 'PATCH':
            #food = get_object_or_404(Food, pk=id)
            serializer = FoodSerializer(data=request.data)
            serializer.is_valid()
            #serializer.save()
            # print(serializer.data)
            data=serializer.data#validated_data
            cursor.execute("UPDATE Food SET foodName = %s, fat = %s, protein = %s, carb = %s WHERE foodId = %s", [data['foodname'], data['fat'], data['protein'], data['carb'], data['foodid']]) 
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'DELETE':
            
            cursor.execute("DELETE FROM Food WHERE foodId = %s", [id])
            return Response(status=status.HTTP_204_NO_CONTENT)
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

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Food WHERE foodId = %s", [id])
    r = cursor.fetchone()
    return Response(r)

